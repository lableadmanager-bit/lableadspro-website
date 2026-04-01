import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET || "default-unsubscribe-secret";

function generateToken(email: string): string {
  return crypto.createHmac("sha256", UNSUBSCRIBE_SECRET).update(email.toLowerCase()).digest("hex");
}

function verifyToken(email: string, token: string): boolean {
  const expected = generateToken(email);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token));
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function addToSuppressionList(email: string) {
  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase not configured — cannot suppress email");
    return;
  }

  const normalized = email.toLowerCase();

  // Add to email_suppressions
  await supabase.from("email_suppressions").upsert(
    { email: normalized, reason: "unsubscribed", suppressed_at: new Date().toISOString() },
    { onConflict: "email" }
  );

  // Also mark as unsubscribed in drip_contacts if they exist
  await supabase
    .from("drip_contacts")
    .update({ status: "unsubscribed" })
    .eq("email", normalized);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return NextResponse.json({ error: "Missing email or token" }, { status: 400 });
  }

  try {
    if (!verifyToken(email, token)) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  await addToSuppressionList(email);

  return NextResponse.redirect(new URL("/unsubscribe", request.url));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token } = body;

    if (!email || !token) {
      return NextResponse.json({ error: "Missing email or token" }, { status: 400 });
    }

    try {
      if (!verifyToken(email, token)) {
        return NextResponse.json({ error: "Invalid token" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    await addToSuppressionList(email);

    return NextResponse.json({ success: true, message: "Successfully unsubscribed" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
