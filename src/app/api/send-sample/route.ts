import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
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

async function logLead(email: string, states: string[]) {
  // Append to a leads log file for the marketing pipeline
  const logDir = path.join(process.cwd(), "..", "data", "sample-leads");
  try {
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    const entry = {
      email,
      states,
      timestamp: new Date().toISOString(),
      source: "sample-report-funnel",
    };
    const logFile = path.join(logDir, "leads.jsonl");
    fs.appendFileSync(logFile, JSON.stringify(entry) + "\n");
  } catch {
    // Non-critical — don't fail the request if logging fails
    console.error("Failed to log lead");
  }
}

function enrollInWarmSequence(email: string, states: string[]) {
  const contactsDir = path.join(process.cwd(), "..", "data", "email-marketing");
  const contactsFile = path.join(contactsDir, "contacts.json");
  const suppressionFile = path.join(contactsDir, "suppression-list.json");

  try {
    if (!fs.existsSync(contactsDir)) fs.mkdirSync(contactsDir, { recursive: true });

    // Check suppression list
    let suppressed: string[] = [];
    if (fs.existsSync(suppressionFile)) {
      try {
        const list = JSON.parse(fs.readFileSync(suppressionFile, "utf-8"));
        suppressed = list.map((entry: { email: string }) => entry.email.toLowerCase());
      } catch { /* ignore parse errors */ }
    }
    if (suppressed.includes(email)) return;

    // Load existing contacts
    let contacts: Array<Record<string, unknown>> = [];
    if (fs.existsSync(contactsFile)) {
      try {
        contacts = JSON.parse(fs.readFileSync(contactsFile, "utf-8"));
      } catch { contacts = []; }
    }

    // Check for duplicate
    if (contacts.some((c) => (c.email as string)?.toLowerCase() === email)) return;

    // Extract first name from email (best effort)
    const localPart = email.split("@")[0];
    const firstName = localPart.split(/[._-]/)[0];
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    contacts.push({
      email,
      first_name: capitalizedName,
      company: "",
      state: states[0] || "",
      sequence: "warm-sample",
      step: 1, // Step 0 (sample delivery) is handled by existing send-sample code
      enrolled_at: new Date().toISOString(),
      last_sent_at: new Date().toISOString(), // Mark as just sent (the sample email)
      status: "active",
      source: "sample-funnel",
      ab_variant: null,
      states_of_interest: states,
    });

    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2) + "\n");
  } catch {
    console.error("Failed to enroll contact in warm sequence");
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

    // Log the lead (console for Vercel function logs + filesystem attempt)
    console.log(`[LEAD] ${new Date().toISOString()} | ${email.toLowerCase()} | states: ${validStates.join(",")} | source: sample-funnel`);
    await logLead(email.toLowerCase(), validStates);

    // Enroll in warm-sample email sequence
    enrollInWarmSequence(email.toLowerCase(), validStates);

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
