import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      query = "",
      filters = {},
      page = 1,
      sort = "relevance",
      pageSize = 20,
    } = body;

    const offset = (page - 1) * pageSize;

    // --- Subscription-based state filtering ---
    // Get the user's session from cookies to find their subscription
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
            setAll() {
              // Read-only in API routes
            },
          },
        }
      );

      const { data: { user } } = await supabaseAuth.auth.getUser();

      if (user) {
        // Look up their subscription using admin client (bypasses RLS)
        const { data: subscription } = await supabaseAdmin
          .from("subscriptions")
          .select("subscribed_states, plan_tier, status")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        if (subscription?.subscribed_states?.length) {
          subscribedStates = subscription.subscribed_states;
        }
      }
    } catch {
      // If auth fails, continue without state restriction (will show nothing useful)
      console.error("Auth check failed in search API");
    }

    // Build the query
    let q = supabase.from("grants").select("id,grant_id,source,title,abstract,pi_name,pi_email,institution,city,state,award_amount,award_date,start_date,end_date,status,agency,activity_code,fiscal_year,source_url,equipment_tags,pi_id,department,country", { count: "exact" });

    // Full-text search
    if (query.trim()) {
      // Convert user query to tsquery format
      const tsquery = query
        .trim()
        .split(/\s+/)
        .map((word: string) => word.replace(/[^\w]/g, ""))
        .filter(Boolean)
        .join(" & ");
      q = q.textSearch("search_vector", tsquery);
    }

    // --- State filtering: subscription enforced server-side ---
    if (subscribedStates) {
      // User has a subscription — restrict to their states
      if (filters.states?.length) {
        // User selected specific states in UI — intersect with their subscription
        const allowedStates = filters.states.filter((s: string) => subscribedStates!.includes(s));
        if (allowedStates.length === 0) {
          // They tried to filter to states they don't have access to
          return NextResponse.json({ results: [], total: 0, page, pageSize, totalPages: 0 });
        }
        q = q.in("state", allowedStates);
      } else {
        // No state filter selected — show all their subscribed states
        q = q.in("state", subscribedStates);
      }
    } else if (filters.states?.length) {
      // No subscription found — still apply their filter (for admin/testing)
      q = q.in("state", filters.states);
    }
    if (filters.agencies?.length) {
      q = q.in("source", filters.agencies);
    }
    if (filters.dateFrom) {
      q = q.gte("award_date", filters.dateFrom);
    }
    if (filters.dateTo) {
      q = q.lte("award_date", filters.dateTo);
    }
    if (filters.status === "active") {
      q = q.gte("end_date", new Date().toISOString().split("T")[0]);
    } else if (filters.status === "completed") {
      q = q.lt("end_date", new Date().toISOString().split("T")[0]);
    }
    if (filters.equipmentTags?.length) {
      q = q.overlaps("equipment_tags", filters.equipmentTags);
    }
    if (filters.amountMin) {
      q = q.gte("award_amount", filters.amountMin);
    }
    if (filters.amountMax) {
      q = q.lte("award_amount", filters.amountMax);
    }
    if (filters.fiscalYear) {
      q = q.eq("fiscal_year", filters.fiscalYear);
    }

    // Sort
    if (sort === "date") {
      q = q.order("award_date", { ascending: false, nullsFirst: false });
    } else if (sort === "amount") {
      q = q.order("award_amount", { ascending: false, nullsFirst: false });
    } else {
      // Default: newest first (relevance ranking is handled by FTS)
      q = q.order("award_date", { ascending: false, nullsFirst: false });
    }

    // Pagination
    q = q.range(offset, offset + pageSize - 1);

    const { data, error, count } = await q;

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Search failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      results: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    });
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
