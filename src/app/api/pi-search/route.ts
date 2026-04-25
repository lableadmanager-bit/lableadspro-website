import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabase } from "@/lib/supabase";

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

    let q = supabase
      .from("pis")
      .select(
        "id,name,institution,state,city,department,email,phone,active_grants_count,faculty_profile_url,office_location,building,room,last_seen,lab_page",
        { count: "estimated" }
      );

    // Name search (ilike on the indexed name column)
    if (query.trim()) {
      q = q.ilike("name", `%${query.trim()}%`);
    }

    // Subscription state scope
    const allStatesCount = 51;
    if (subscribedStates) {
      if (filters.states?.length) {
        const allowed = filters.states.filter((s: string) => subscribedStates!.includes(s));
        if (allowed.length === 0) {
          return NextResponse.json({ results: [], total: 0, page, pageSize, totalPages: 0 });
        }
        q = q.in("state", allowed);
      } else if (subscribedStates.length < allStatesCount) {
        q = q.in("state", subscribedStates);
      }
    } else if (filters.states?.length) {
      q = q.in("state", filters.states);
    }

    if (filters.institution) {
      q = q.ilike("institution", `%${filters.institution}%`);
    }
    if (filters.department) {
      q = q.ilike("department", `%${filters.department}%`);
    }
    if (filters.minGrants && Number(filters.minGrants) > 0) {
      q = q.gte("active_grants_count", Number(filters.minGrants));
    } else {
      // Default: only include PIs with at least one grant on record.
      q = q.gte("active_grants_count", 1);
    }

    // Sort
    if (sort === "name_asc") {
      q = q.order("name", { ascending: true, nullsFirst: false });
    } else if (sort === "last_seen_desc") {
      q = q.order("last_seen", { ascending: false, nullsFirst: false });
    } else {
      // Default: most funded grants
      q = q.order("active_grants_count", { ascending: false, nullsFirst: false });
    }

    q = q.range(offset, offset + pageSize - 1);

    const { data, error, count } = await q;

    if (error) {
      console.error("PI search query error:", error);
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }

    // Roll up total funding per PI for the current result page. Single
    // batched query against grants — ~150ms for 25 PIs in practice.
    // award_amount coverage is 95%+ across all agencies.
    const pageIds = (data || []).map((r) => r.id).filter(Boolean) as number[];
    const fundingByPi = new Map<number, { total: number; max: number; count: number }>();
    if (pageIds.length > 0) {
      const { data: grantRows, error: grantErr } = await supabaseAdmin
        .from("grants")
        .select("pi_id,award_amount,end_date")
        .in("pi_id", pageIds);
      if (!grantErr && grantRows) {
        const today = new Date().toISOString().split("T")[0];
        for (const g of grantRows) {
          if (!g.pi_id) continue;
          const slot = fundingByPi.get(g.pi_id) ?? { total: 0, max: 0, count: 0 };
          if (typeof g.award_amount === "number") {
            slot.total += g.award_amount;
            if (g.award_amount > slot.max) slot.max = g.award_amount;
          }
          if (g.end_date && g.end_date >= today) slot.count += 1;
          fundingByPi.set(g.pi_id, slot);
        }
      }
    }

    const enriched = (data || []).map((r) => {
      const f = fundingByPi.get(r.id) ?? { total: 0, max: 0, count: 0 };
      return {
        ...r,
        total_funding: f.total,
        largest_grant: f.max,
        active_grants_now: f.count,
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
