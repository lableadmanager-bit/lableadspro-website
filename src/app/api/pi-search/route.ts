import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase-admin";

// PI database is gated to specific accounts during prototype phase.
// Add new emails here to grant access; refactor to a feature_flags
// column on subscriptions when we're ready to roll out broadly.
const PI_DATABASE_ALLOWLIST = new Set([
  "demo@lableadspro.com",
  "lableadmanager@gmail.com",
  "george@lableadspro.com",
]);

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

    // --- Auth + demo allowlist gate ---
    let userEmail: string | null = null;
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
      userEmail = user.email ?? null;

      if (!userEmail || !PI_DATABASE_ALLOWLIST.has(userEmail.toLowerCase())) {
        return NextResponse.json({ error: "PI database access not enabled for this account" }, { status: 403 });
      }

      const { data: subscription } = await supabaseAdmin
        .from("subscriptions")
        .select("subscribed_states, status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (subscription?.subscribed_states?.length) {
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
    const rows = (data || []) as Array<{ total_count: number; [k: string]: unknown }>;
    const count = rows.length > 0 ? Number(rows[0].total_count) : 0;

    // Roll up lifetime + filter-aware funding per PI for the current result
    // page. award_amount coverage is 95%+ across all agencies.
    //
    // - lifetime totals: always computed live so the secondary "X total" is
    //   accurate regardless of pis-table backfill freshness.
    // - active filtered: when activityCodes filter is set, recompute the
    //   active funding/count restricted to those grant types so the displayed
    //   numbers reflect the filter. Otherwise use the pre-computed
    //   currently_active_* columns directly.
    const pageIds = (rows || []).map((r) => Number(r.id)).filter(Boolean) as number[];
    const today = new Date().toISOString().split("T")[0];
    const lifetimeByPi = new Map<number, { total: number; max: number }>();
    const activeFilteredByPi = new Map<number, { fund: number; count: number }>();
    const activityCodes = Array.isArray(filters.activityCodes) ? filters.activityCodes : [];

    if (pageIds.length > 0) {
      let bq = supabaseAdmin
        .from("grants")
        .select("pi_id,award_amount,end_date,activity_code")
        .in("pi_id", pageIds);
      const { data: grantRows } = await bq;
      if (grantRows) {
        for (const g of grantRows) {
          if (!g.pi_id) continue;
          // Lifetime: every grant on record
          const lt = lifetimeByPi.get(g.pi_id) ?? { total: 0, max: 0 };
          if (typeof g.award_amount === "number") {
            lt.total += g.award_amount;
            if (g.award_amount > lt.max) lt.max = g.award_amount;
          }
          lifetimeByPi.set(g.pi_id, lt);

          // Filter-aware active: recompute only when activity filter is set
          if (activityCodes.length > 0) {
            const matchesCode = g.activity_code && activityCodes.includes(g.activity_code);
            const isActive = g.end_date && g.end_date >= today;
            if (matchesCode && isActive) {
              const a = activeFilteredByPi.get(g.pi_id) ?? { fund: 0, count: 0 };
              if (typeof g.award_amount === "number") a.fund += g.award_amount;
              a.count += 1;
              activeFilteredByPi.set(g.pi_id, a);
            }
          }
        }
      }
    }

    const enriched = rows.map((r) => {
      const id = Number(r.id);
      const lt = lifetimeByPi.get(id) ?? { total: 0, max: 0 };
      const filtered = activeFilteredByPi.get(id);
      // When activity filter is set, override the active stats with the
      // filter-aware numbers so the UI tells the truth.
      const activeFunding = filtered
        ? filtered.fund
        : (Number(r.currently_active_funding) || 0);
      const activeCount = filtered
        ? filtered.count
        : (Number(r.currently_active_grants_count) || 0);
      // Strip total_count from the row before returning to the client.
      const { total_count: _tc, ...rest } = r;
      void _tc;
      return {
        ...rest,
        total_funding: lt.total,
        largest_grant: lt.max,
        active_funding: activeFunding,
        active_grants_now: activeCount,
        is_filter_aware: activityCodes.length > 0,
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
