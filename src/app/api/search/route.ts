import { NextRequest, NextResponse } from "next/server";
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

    // Build the query
    let q = supabase.from("grants").select("*", { count: "exact" });

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

    // Filters
    if (filters.states?.length) {
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
