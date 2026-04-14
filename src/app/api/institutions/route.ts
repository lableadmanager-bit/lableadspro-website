import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/institutions?q=duke&limit=10
 * Returns distinct institution names matching the query, sorted by grant count.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit")) || 10, 20);

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  // Use RPC for a fast fuzzy search with grant counts
  const { data, error } = await supabase.rpc("search_institutions", {
    search_term: q,
    result_limit: limit,
  });

  if (error) {
    console.error("Institution search error:", error);
    // Fallback to simple ilike
    const { data: fallback } = await supabase
      .from("grants")
      .select("institution")
      .ilike("institution", `%${q}%`)
      .not("institution", "is", null)
      .limit(limit * 5);

    if (fallback) {
      // Dedupe and count manually
      const counts = new Map<string, number>();
      for (const row of fallback) {
        counts.set(row.institution, (counts.get(row.institution) || 0) + 1);
      }
      const results = [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ institution: name, grant_count: count }));
      return NextResponse.json(results);
    }
    return NextResponse.json([]);
  }

  return NextResponse.json(data || []);
}
