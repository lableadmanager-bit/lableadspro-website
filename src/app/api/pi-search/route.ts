import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      query = "",
      filters = {},
      page = 1,
      sort = "grants_desc",
      pageSize = 25,
    } = body;

    const offset = (page - 1) * pageSize;

    // --- Auth + active-subscription gate ---
    let subscribedStates: string[] | null = null;

    try {
      const supabaseAuth = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return req.cookies.getAll();
            },
            setAll() {},
          },
        }
      );

      const { data: { user } } = await supabaseAuth.auth.getUser();
      if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }

      const { data: subscription } = await supabaseAdmin
        .from("subscriptions")
        .select("subscribed_states, status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (!subscription) {
        return NextResponse.json({ error: "Active subscription required" }, { status: 403 });
      }

      if (subscription.subscribed_states?.length) {
        subscribedStates = subscription.subscribed_states;
      }
    } catch {
      console.error("Auth check failed in pi-search API");
      return NextResponse.json({ error: "Auth error" }, { status: 401 });
    }

    // Resolve effective state scope (UI filter intersected with subscription).
    const allStatesCount = 51;
    let effectiveStates: string[] | null = null;
    if (subscribedStates) {
      if (filters.states?.length) {
        const intersected = filters.states.filter((s: string) => subscribedStates!.includes(s));
        if (intersected.length === 0) {
          return NextResponse.json({ results: [], total: 0, page, pageSize, totalPages: 0 });
        }
        effectiveStates = intersected;
      } else if (subscribedStates.length < allStatesCount) {
        effectiveStates = subscribedStates;
      }
    } else if (filters.states?.length) {
      effectiveStates = filters.states;
    }

    const minActive = filters.minGrants && Number(filters.minGrants) > 0
      ? Number(filters.minGrants)
      : 1;

    // All filtering+sorting+pagination happens server-side via RPC. This
    // avoids the URL length cap that bit us when passing thousands of
    // pi_ids back into a PostgREST IN clause.
    const { data, error } = await supabaseAdmin.rpc("pi_search_advanced", {
      p_states: effectiveStates,
      p_activity_codes:
        Array.isArray(filters.activityCodes) && filters.activityCodes.length > 0
          ? filters.activityCodes
          : null,
      p_institution: filters.institution || null,
      p_department: filters.department || null,
      p_name: query.trim() || null,
      p_min_grants: minActive,
      p_sort: sort,
      p_limit: pageSize,
      p_offset: offset,
    });

    if (error) {
      console.error("PI search RPC error:", error);
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }

    // RPC returns each row with total_count baked in (window function).
    const rows = (data || []) as Array<{
      total_count: number;
      filter_funding: number | null;
      filter_count: number | null;
      currently_active_funding: number | null;
      currently_active_grants_count: number | null;
      [k: string]: unknown;
    }>;
    const count = rows.length > 0 ? Number(rows[0].total_count) : 0;

    // Lifetime rollup: optional secondary stat. Single batch query against
    // grants for the page's PI ids. Active stats already come from the RPC
    // (filter-aware when activity codes set).
    const pageIds = rows.map((r) => Number(r.id)).filter(Boolean) as number[];
    const lifetimeByPi = new Map<number, { total: number; max: number }>();
    if (pageIds.length > 0) {
      const { data: grantRows } = await supabaseAdmin
        .from("grants")
        .select("pi_id,award_amount")
        .in("pi_id", pageIds);
      if (grantRows) {
        for (const g of grantRows) {
          if (!g.pi_id) continue;
          const lt = lifetimeByPi.get(g.pi_id) ?? { total: 0, max: 0 };
          if (typeof g.award_amount === "number") {
            lt.total += g.award_amount;
            if (g.award_amount > lt.max) lt.max = g.award_amount;
          }
          lifetimeByPi.set(g.pi_id, lt);
        }
      }
    }

    const activityCodesSet = Array.isArray(filters.activityCodes) && filters.activityCodes.length > 0;

    const enriched = rows.map((r) => {
      const id = Number(r.id);
      const lt = lifetimeByPi.get(id) ?? { total: 0, max: 0 };
      const activeFunding = activityCodesSet
        ? Number(r.filter_funding ?? 0)
        : Number(r.currently_active_funding ?? 0);
      const activeCount = activityCodesSet
        ? Number(r.filter_count ?? 0)
        : Number(r.currently_active_grants_count ?? 0);
      // Strip rpc-internal fields from the row before returning to the client.
      const { total_count: _tc, filter_funding: _ff, filter_count: _fc, ...rest } = r;
      void _tc;
      void _ff;
      void _fc;
      return {
        ...rest,
        total_funding: lt.total,
        largest_grant: lt.max,
        active_funding: activeFunding,
        active_grants_now: activeCount,
        is_filter_aware: activityCodesSet,
      };
    });

    return NextResponse.json({
      results: enriched,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    });
  } catch (err) {
    console.error("PI search API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
