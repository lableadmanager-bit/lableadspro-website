import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET || "default-unsubscribe-secret";
const SUPPRESSION_FILE = path.join(process.cwd(), "..", "data", "email-marketing", "suppression-list.json");

function generateToken(email: string): string {
  return crypto.createHmac("sha256", UNSUBSCRIBE_SECRET).update(email.toLowerCase()).digest("hex");
}

function verifyToken(email: string, token: string): boolean {
  const expected = generateToken(email);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token));
}

function addToSuppressionList(email: string) {
  const dir = path.dirname(SUPPRESSION_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let list: { email: string; unsubscribed_at: string }[] = [];
  if (fs.existsSync(SUPPRESSION_FILE)) {
    try {
      list = JSON.parse(fs.readFileSync(SUPPRESSION_FILE, "utf-8"));
    } catch {
      list = [];
    }
  }

  const normalized = email.toLowerCase();
  if (!list.some((entry) => entry.email === normalized)) {
    list.push({ email: normalized, unsubscribed_at: new Date().toISOString() });
    fs.writeFileSync(SUPPRESSION_FILE, JSON.stringify(list, null, 2) + "\n");
  }
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

  addToSuppressionList(email);

  // Redirect to the unsubscribe confirmation page
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

    addToSuppressionList(email);

    return NextResponse.json({ success: true, message: "Successfully unsubscribed" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
