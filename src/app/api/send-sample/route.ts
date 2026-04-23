import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  extractClientIp,
  hashIp,
  isLikelyBotUA,
  sanitizeUtms,
  truncate,
} from "@/lib/request-context";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NEVERBOUNCE_API_KEY = process.env.NEVERBOUNCE_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_TOPIC_ID = process.env.TELEGRAM_TOPIC_ID;
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

// NeverBounce email verification — blocks invalid/disposable emails before sending
async function verifyEmail(email: string): Promise<{ valid: boolean; result: string }> {
  if (!NEVERBOUNCE_API_KEY) return { valid: true, result: "skipped" }; // fail-open if no key

  try {
    const res = await fetch(
      `https://api.neverbounce.com/v4.2/single/check?key=${NEVERBOUNCE_API_KEY}&email=${encodeURIComponent(email)}&timeout=10`,
      { signal: AbortSignal.timeout(15000) }
    );
    if (!res.ok) return { valid: true, result: "api_error" }; // fail-open on API errors

    const data = await res.json();
    // result: 0=valid, 1=invalid, 2=disposable, 3=catchall, 4=unknown
    const result = ["valid", "invalid", "disposable", "catchall", "unknown"][data.result] || "unknown";
    // Block invalid and disposable — allow valid, catchall, and unknown
    const valid = data.result !== 1 && data.result !== 2;
    return { valid, result };
  } catch {
    return { valid: true, result: "timeout" }; // fail-open on network errors
  }
}

// Simple rate limiting - in-memory, per-email, 3 requests per hour
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
    const payload: Record<string, unknown> = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    };
    if (TELEGRAM_TOPIC_ID) {
      payload.message_thread_id = parseInt(TELEGRAM_TOPIC_ID, 10);
    }
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
    const { email, states, utm, referrer: clientReferrer } = body;

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

    const userAgent = request.headers.get("user-agent");
    const referrer = truncate(
      typeof clientReferrer === "string" ? clientReferrer : request.headers.get("referer"),
      500,
    );
    const ipHash = hashIp(extractClientIp(request));
    const utms = sanitizeUtms(utm);
    const isBot = isLikelyBotUA(userAgent);

    // Verify email with NeverBounce before sending
    const verification = await verifyEmail(email.toLowerCase());

    // Log the request — bot, blocked, or real — so we have a queryable audit trail
    try {
      await supabaseAdmin.from("sample_requests").insert({
        email: email.toLowerCase(),
        states: validStates,
        state_count: validStates.length,
        neverbounce_result: verification.result,
        utm_source: utms.utm_source,
        utm_medium: utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        utm_term: utms.utm_term,
        utm_content: utms.utm_content,
        referrer,
        user_agent: truncate(userAgent, 500),
        ip_hash: ipHash,
        is_bot: isBot,
      });
    } catch (err) {
      console.error("[send-sample] Supabase log failed:", err);
    }

    if (!verification.valid) {
      console.log(`[BLOCKED] ${new Date().toISOString()} | ${email.toLowerCase()} | reason: ${verification.result} | states: ${validStates.join(",")}`);
      // Return generic success to not reveal we blocked them (don't help attackers)
      return NextResponse.json({
        success: true,
        sent: validStates.length,
        failed: 0,
        message: `Sent ${validStates.length} sample report${validStates.length > 1 ? "s" : ""} to ${email}`,
      });
    }

    // Log to Vercel function logs
    console.log(`[LEAD] ${new Date().toISOString()} | ${email.toLowerCase()} | states: ${validStates.join(",")} | nb: ${verification.result} | source: sample-funnel${isBot ? " | bot_ua" : ""}`);

    // Notify George via Telegram (skip for likely bots to reduce noise)
    if (!isBot) {
      await notifyTelegram(email.toLowerCase(), validStates);
    }

    // Send sample reports - one email per state
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
