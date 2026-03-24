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

// GET /api/favorites — list all favorite grant_ids for current user
export async function GET(req: NextRequest) {
  try {
    const supabase = getAuthClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from("favorites")
      .select("grant_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching favorites:", error.message);
      return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
    }

    return NextResponse.json({ favorites: data || [] });
  } catch (err) {
    console.error("Favorites GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/favorites — add a favorite
export async function POST(req: NextRequest) {
  try {
    const supabase = getAuthClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { grantId } = await req.json();
    if (!grantId) {
      return NextResponse.json({ error: "grantId required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("favorites")
      .upsert(
        { user_id: user.id, grant_id: grantId },
        { onConflict: "user_id,grant_id" }
      );

    if (error) {
      console.error("Error adding favorite:", error.message);
      return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Favorites POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/favorites — remove a favorite
export async function DELETE(req: NextRequest) {
  try {
    const supabase = getAuthClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { grantId } = await req.json();
    if (!grantId) {
      return NextResponse.json({ error: "grantId required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("grant_id", grantId);

    if (error) {
      console.error("Error removing favorite:", error.message);
      return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Favorites DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
