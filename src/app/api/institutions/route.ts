import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/institutions?q=duke&limit=10&states=CA,NC
 * Returns distinct institution names matching the query, filtered by states, sorted by grant count.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit")) || 10, 20);
  const statesParam = req.nextUrl.searchParams.get("states");
  const states = statesParam ? statesParam.split(",").filter(Boolean) : [];

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  if (states.length > 0) {
    // Filter institutions to only those in the user's subscribed states.
    // Cap the row scan so per-keystroke latency stays sub-second — on a
    // 530K-row grants table an unbounded ilike pulled tens of thousands of
    // rows per keystroke. The top-matched institutions still surface because
    // the trigram index returns the best matches first; the grant_count is
    // approximate within the scan window.
    const { data, error } = await supabase
      .from("grants")
      .select("institution")
      .ilike("institution", `%${q}%`)
      .in("state", states)
      .not("institution", "is", null)
      .limit(limit * 50);

    if (error) {
      console.error("Institution search error:", error);
      return NextResponse.json([]);
    }

    // Dedupe and count
    const counts = new Map<string, number>();
    for (const row of data || []) {
      if (row.institution) {
        counts.set(row.institution, (counts.get(row.institution) || 0) + 1);
      }
    }
    const results = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => ({ institution: name, grant_count: count }));
    return NextResponse.json(results);
  }

  // No state filter — use the fast materialized view
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
      .limit(limit * 10);

    if (fallback) {
      const counts = new Map<string, number>();
      for (const row of fallback) {
        if (row.institution) counts.set(row.institution, (counts.get(row.institution) || 0) + 1);
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
