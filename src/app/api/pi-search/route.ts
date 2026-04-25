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
        "id,name,institution,state,city,department,email,phone,active_grants_count,currently_active_grants_count,currently_active_funding,faculty_profile_url,office_location,building,room,last_seen,lab_page",
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
    // Default: PIs with at least one currently-active grant. minGrants
    // applies to the active count, not lifetime, since reps care about
    // currently-funded labs.
    const minActive = filters.minGrants && Number(filters.minGrants) > 0
      ? Number(filters.minGrants)
      : 1;
    q = q.gte("currently_active_grants_count", minActive);

    // Activity code filter (R01, R21, K99, etc.). OR semantics: a PI is
    // included if they have at least ONE currently-active grant whose
    // activity_code is in the selected list. Postgres `IN` is OR by design.
    //
    // We scope the subquery to the user's subscribed states when possible
    // to keep row count manageable. The 200K limit is a safety net for
    // all-states subscriptions; nationwide active R01s alone are ~30K.
    if (Array.isArray(filters.activityCodes) && filters.activityCodes.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      let aq = supabaseAdmin
        .from("grants")
        .select("pi_id")
        .in("activity_code", filters.activityCodes)
        .gte("end_date", today)
        .not("pi_id", "is", null);
      if (subscribedStates && subscribedStates.length < 51) {
        aq = aq.in("state", subscribedStates);
      }
      const { data: matchingPis } = await aq.limit(200000);
      const piIds = Array.from(
        new Set((matchingPis || []).map((r) => r.pi_id).filter((x): x is number => x !== null))
      );
      if (piIds.length === 0) {
        return NextResponse.json({ results: [], total: 0, page, pageSize, totalPages: 0 });
      }
      q = q.in("id", piIds);
    }

    // Sort
    if (sort === "name_asc") {
      q = q.order("name", { ascending: true, nullsFirst: false });
    } else if (sort === "last_seen_desc") {
      q = q.order("last_seen", { ascending: false, nullsFirst: false });
    } else if (sort === "active_grants_desc") {
      q = q.order("currently_active_grants_count", { ascending: false, nullsFirst: false });
    } else if (sort === "grants_desc") {
      // Legacy sort by lifetime grant count (still exposed in UI for honesty).
      q = q.order("active_grants_count", { ascending: false, nullsFirst: false });
    } else {
      // Default: most active funding $$
      q = q.order("currently_active_funding", { ascending: false, nullsFirst: false });
    }

    q = q.range(offset, offset + pageSize - 1);

    const { data, error, count } = await q;

    if (error) {
      console.error("PI search query error:", error);
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }

    // Roll up lifetime + filter-aware funding per PI for the current result
    // page. award_amount coverage is 95%+ across all agencies.
    //
    // - lifetime totals: always computed live so the secondary "X total" is
    //   accurate regardless of pis-table backfill freshness.
    // - active filtered: when activityCodes filter is set, recompute the
    //   active funding/count restricted to those grant types so the displayed
    //   numbers reflect the filter. Otherwise use the pre-computed
    //   currently_active_* columns directly.
    const pageIds = (data || []).map((r) => r.id).filter(Boolean) as number[];
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

    const enriched = (data || []).map((r) => {
      const lt = lifetimeByPi.get(r.id) ?? { total: 0, max: 0 };
      const filtered = activeFilteredByPi.get(r.id);
      // When activity filter is set, override the active stats with the
      // filter-aware numbers so the UI tells the truth.
      const activeFunding = filtered ? filtered.fund : (r.currently_active_funding ?? 0);
      const activeCount = filtered ? filtered.count : (r.currently_active_grants_count ?? 0);
      return {
        ...r,
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
