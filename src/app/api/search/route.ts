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
      favoriteGrantIds,
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

    // Build the query — use estimated count to avoid expensive exact counts that timeout
    let q = supabase.from("grants").select("id,grant_id,source,title,abstract,pi_name,pi_email,institution,city,state,award_amount,award_date,start_date,end_date,status,agency,activity_code,fiscal_year,source_url,equipment_tags,pi_id,department,country,pis(email,phone,department,office_location,building,room,faculty_profile_url,r1_faculty(profile_url,title,rank,full_name,r1_universities(name)))", { count: "estimated" });

    // Full-text search — use prefix matching for better partial word results
    if (query.trim()) {
      // Convert user query: each word becomes a prefix search term joined with AND
      const words = query
        .trim()
        .split(/\s+/)
        .map((word: string) => word.replace(/[^\w]/g, ""))
        .filter(Boolean);
      // Add :* for prefix matching on the last word (allows partial typing)
      const tsquery = words
        .map((w: string, i: number) => i === words.length - 1 ? `${w}:*` : w)
        .join(" & ");
      q = q.textSearch("search_vector", tsquery);
    }

    // --- State filtering: subscription enforced server-side ---
    if (subscribedStates) {
      // User has a subscription - restrict to their states
      const allStatesCount = 51; // 50 states + DC
      if (filters.states?.length) {
        // User selected specific states in UI - intersect with their subscription
        const allowedStates = filters.states.filter((s: string) => subscribedStates!.includes(s));
        if (allowedStates.length === 0) {
          // They tried to filter to states they don't have access to
          return NextResponse.json({ results: [], total: 0, page, pageSize, totalPages: 0 });
        }
        q = q.in("state", allowedStates);
      } else if (subscribedStates.length < allStatesCount) {
        // Partial subscription - filter to their states
        q = q.in("state", subscribedStates);
      }
      // If subscribed to all states, skip the filter entirely (same as no filter)
    } else if (filters.states?.length) {
      // No subscription found - still apply their filter (for admin/testing)
      q = q.in("state", filters.states);
    }
    if (filters.agencies?.length) {
      const hasVa = filters.agencies.includes("va");
      const nonVaAgencies = filters.agencies.filter((a: string) => a !== "va");
      
      if (hasVa && nonVaAgencies.length > 0) {
        // VA + other agencies: source IN (others) OR institution matches VA
        q = q.or(`source.in.(${nonVaAgencies.map((a: string) => `"${a}"`).join(",")}),institution.ilike.%veteran%,institution.ilike.%VA medical%`);
      } else if (hasVa && nonVaAgencies.length === 0) {
        // VA only: filter to VA institutions
        q = q.or("institution.ilike.%veteran%,institution.ilike.%VA medical%");
      } else {
        // No VA selected: normal source filter
        q = q.in("source", filters.agencies);
      }
    }
    if (filters.nihInstitutes?.length) {
      const vaFilter = filters.nihInstitutes.includes("VA Medical Centers");
      const agencyFilters = filters.nihInstitutes.filter((n: string) => n !== "VA Medical Centers");
      
      if (vaFilter && agencyFilters.length > 0) {
        // Both VA and specific institutes selected - use OR logic
        q = q.or(`agency.in.(${agencyFilters.map((a: string) => `"${a}"`).join(",")}),institution.ilike.%veteran%,institution.ilike.%VA %medical%`);
      } else if (vaFilter) {
        // Only VA selected
        q = q.or("institution.ilike.%veteran%,institution.ilike.%VA %medical%");
      } else {
        // Only regular institutes
        q = q.in("agency", agencyFilters);
      }
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
    if (filters.activityCodes?.length) {
      q = q.in("activity_code", filters.activityCodes);
    }
    if (filters.institution) {
      q = q.ilike("institution", `%${filters.institution}%`);
    }
    // PI filter: prefer pi_id (precise, deduped) when available.
    // Fall back to pi_name + institution ilike for agencies where pi_id is null
    // (DOD/DOE/NASA/USDA/CDC). Institution scoping avoids cross-PI collisions
    // (e.g. "Miao" matching both Edward Miao and Miaofang Chi).
    if (filters.piId != null) {
      q = q.eq("pi_id", filters.piId);
    } else if (filters.piName) {
      q = q.ilike("pi_name", `%${filters.piName}%`);
      if (filters.piInstitution) {
        q = q.ilike("institution", `%${filters.piInstitution}%`);
      }
    }

    // Favorites filter: restrict to specific grant IDs
    if (favoriteGrantIds?.length) {
      q = q.in("grant_id", favoriteGrantIds);
    } else if (favoriteGrantIds && favoriteGrantIds.length === 0) {
      // User has no favorites but toggled favorites-only — return empty
      return NextResponse.json({ results: [], total: 0, page, pageSize, totalPages: 0 });
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
