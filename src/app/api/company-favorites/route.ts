import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase-admin";

function getAuthClient(req: NextRequest) {
  return createServerClient(
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
}

// GET /api/company-favorites — list all favorited company_ids for current user
export async function GET(req: NextRequest) {
  try {
    const supabase = getAuthClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from("company_favorites")
      .select("company_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching company favorites:", error.message);
      return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
    }

    return NextResponse.json({ favorites: data || [] });
  } catch (err) {
    console.error("Company favorites GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/company-favorites — add a favorite
export async function POST(req: NextRequest) {
  try {
    const supabase = getAuthClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { companyId } = await req.json();
    if (companyId == null) {
      return NextResponse.json({ error: "companyId required" }, { status: 400 });
    }

    // Cap favorites at 500 per user (matches grant favorites)
    const { count } = await supabaseAdmin
      .from("company_favorites")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if ((count ?? 0) >= 500) {
      return NextResponse.json(
        { error: "Favorites limit reached (500 max). Remove some to add new ones." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("company_favorites")
      .upsert(
        { user_id: user.id, company_id: companyId },
        { onConflict: "user_id,company_id" }
      );

    if (error) {
      console.error("Error adding company favorite:", error.message);
      return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Company favorites POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/company-favorites — remove a favorite
export async function DELETE(req: NextRequest) {
  try {
    const supabase = getAuthClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { companyId } = await req.json();
    if (companyId == null) {
      return NextResponse.json({ error: "companyId required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("company_favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("company_id", companyId);

    if (error) {
      console.error("Error removing company favorite:", error.message);
      return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Company favorites DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
