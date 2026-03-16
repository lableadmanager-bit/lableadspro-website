import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const FROM_EMAIL = "Lab Leads Pro <freshleads@lableadspro.com>";

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
};

// Simple rate limiting — in-memory, per-email, 3 requests per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(email);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(email, { count: 1, resetAt: now + 3600000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

async function notifyTelegram(email: string, states: string[]) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const stateList = states.map(s => STATE_NAMES[s] || s).join(", ");
  const message = `🔬 *New Sample Report Request*\n\n📧 ${email}\n🗺️ ${stateList}\n🕐 ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  } catch {
    console.error("Failed to send Telegram notification");
  }
}

async function sendSampleEmail(email: string, state: string): Promise<boolean> {
  const stateName = STATE_NAMES[state] || state;
  const stateLC = state.toLowerCase();
  const filePath = path.join(process.cwd(), "public", "samples", `${stateLC}.html`);
  const xlsxPath = path.join(process.cwd(), "public", "samples", `${stateLC}.xlsx`);

  if (!fs.existsSync(filePath)) return false;

  const html = fs.readFileSync(filePath, "utf-8");

  // Build payload with optional Excel attachment
  const payload: Record<string, unknown> = {
    from: FROM_EMAIL,
    to: [email],
    subject: `Your Sample Report: NIH Grants in ${stateName}`,
    html,
  };

  if (fs.existsSync(xlsxPath)) {
    const xlsxBuffer = fs.readFileSync(xlsxPath);
    const xlsxBase64 = xlsxBuffer.toString("base64");
    payload.attachments = [
      {
        filename: `LabLeadsPro-${state.toUpperCase()}-Sample-Report.xlsx`,
        content: xlsxBase64,
      },
    ];
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.ok;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, states } = body;

    // Validate
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!states || !Array.isArray(states) || states.length === 0 || states.length > 5) {
      return NextResponse.json({ error: "Select 1-5 states" }, { status: 400 });
    }

    const validStates = states.filter((s: string) => STATE_NAMES[s.toUpperCase()]);
    if (validStates.length === 0) {
      return NextResponse.json({ error: "No valid states selected" }, { status: 400 });
    }

    // Rate limit
    if (isRateLimited(email.toLowerCase())) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    // Log to Vercel function logs
    console.log(`[LEAD] ${new Date().toISOString()} | ${email.toLowerCase()} | states: ${validStates.join(",")} | source: sample-funnel`);

    // Notify George via Telegram
    await notifyTelegram(email.toLowerCase(), validStates);

    // Send sample reports — one email per state
    const results = await Promise.all(
      validStates.map((state: string) => sendSampleEmail(email, state.toUpperCase()))
    );

    const sent = results.filter(Boolean).length;
    const failed = results.length - sent;

    if (sent === 0) {
      return NextResponse.json({ error: "Failed to send sample reports. Please try again." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      sent,
      failed,
      message: `Sent ${sent} sample report${sent > 1 ? "s" : ""} to ${email}`,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
