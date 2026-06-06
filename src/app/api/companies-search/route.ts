import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabase } from "@/lib/supabase";

const VIEW_COLUMNS =
  "id,name,website,linkedin_url,company_type,is_public,ticker,employee_count_bucket,sbir_total_usd,sbir_latest_award_year,sbir_award_count,nih_grant_count,primary_state,primary_city,primary_street,total_sites,description";

const ALL_STATES_COUNT = 51; // 50 + DC; subscriptions never include territories

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      filters = {},
      page = 1,
      sort = "name",
      pageSize = 60,
    } = body;

    const offset = (page - 1) * pageSize;

    // --- Auth + subscription gate (account holders only) ---
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
        .select("subscribed_states, plan_tier, status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (!subscription) {
        return NextResponse.json({ error: "No active subscription" }, { status: 403 });
      }
      subscribedStates = subscription.subscribed_states ?? [];
    } catch {
      return NextResponse.json({ error: "Auth check failed" }, { status: 401 });
    }

    // --- Build query ---
    let q = supabase
      .from("v_companies_beta")
      .select(VIEW_COLUMNS, { count: "exact" });

    // --- State filtering: subscription enforced server-side ---
    // Mirror /api/search: intersect any UI-selected states with the subscription.
    if (subscribedStates && subscribedStates.length > 0) {
      if (filters.states?.length) {
        const allowed = filters.states.filter((s: string) => subscribedStates!.includes(s));
        if (allowed.length === 0) {
          return NextResponse.json({ results: [], total: 0, page, pageSize, totalPages: 0 });
        }
        q = q.in("primary_state", allowed);
      } else if (subscribedStates.length < ALL_STATES_COUNT) {
        q = q.in("primary_state", subscribedStates);
      }
      // Subscribed to everything -> no state restriction.
    } else {
      // Active subscription but zero states on file -> nothing to show.
      return NextResponse.json({ results: [], total: 0, page, pageSize, totalPages: 0 });
    }

    // --- Company filters ---
    if (filters.companyTypes?.length) q = q.in("company_type", filters.companyTypes);
    if (filters.sizes?.length) {
      // "unknown" is a sentinel for companies with no size on file (NULL bucket).
      // ~62% of rows are unknown until Apollo enrichment, so it must be includable.
      const wantUnknown = filters.sizes.includes("unknown");
      const buckets = filters.sizes.filter((s: string) => s !== "unknown");
      if (wantUnknown && buckets.length) {
        q = q.or(`employee_count_bucket.in.(${buckets.join(",")}),employee_count_bucket.is.null`);
      } else if (wantUnknown) {
        q = q.is("employee_count_bucket", null);
      } else {
        q = q.in("employee_count_bucket", buckets);
      }
    }
    if (filters.publicOnly) q = q.eq("is_public", true);
    if (filters.hasSbir) q = q.gt("sbir_award_count", 0);
    if (filters.hasNih) q = q.gt("nih_grant_count", 0);

    // --- Sort ---
    if (sort === "size") {
      q = q.order("employee_count_bucket", { ascending: false, nullsFirst: false });
    } else if (sort === "recent_sbir") {
      q = q.order("sbir_latest_award_year", { ascending: false, nullsFirst: false });
    } else {
      q = q.order("name", { ascending: true });
    }

    q = q.range(offset, offset + pageSize - 1);

    const { data, error, count } = await q;
    if (error) {
      console.error("Companies search query error:", error);
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }

    return NextResponse.json({
      results: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    });
  } catch (err) {
    console.error("Companies search API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
