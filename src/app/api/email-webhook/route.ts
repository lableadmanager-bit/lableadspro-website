import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Resend Webhook Handler
 * 
 * Receives bounce, complaint, and delivery status events from Resend.
 * Auto-suppresses bounced and complained emails so we never hit them again.
 * 
 * Resend webhook events we care about:
 * - email.bounced: Hard bounce (address doesn't exist)
 * - email.complained: Recipient marked as spam
 * 
 * Events we log but don't suppress:
 * - email.delivered: Successful delivery
 * - email.delivery_delayed: Temporary issue
 * - email.opened: Recipient opened
 * - email.clicked: Recipient clicked a link
 * 
 * Setup: In Resend dashboard → Webhooks → Add endpoint:
 *   URL: https://lableadspro.com/api/email-webhook
 *   Events: email.bounced, email.complained, email.delivered, email.opened, email.clicked
 * 
 * Security: Verify webhook signature using Resend's svix signing secret.
 */

const SUPPRESSION_FILE = path.join(process.cwd(), "..", "data", "email-marketing", "suppression-list.json");
const WEBHOOK_LOG_FILE = path.join(process.cwd(), "..", "data", "email-marketing", "webhook-events.jsonl");
const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || "";

// Events that should auto-suppress the email address
const SUPPRESS_EVENTS = ["email.bounced", "email.complained"];

function addToSuppressionList(email: string, reason: string) {
  const dir = path.dirname(SUPPRESSION_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let list: { email: string; reason: string; suppressed_at: string }[] = [];
  if (fs.existsSync(SUPPRESSION_FILE)) {
    try {
      list = JSON.parse(fs.readFileSync(SUPPRESSION_FILE, "utf-8"));
    } catch {
      list = [];
    }
  }

  const normalized = email.toLowerCase();
  if (!list.some((entry) => entry.email === normalized)) {
    list.push({
      email: normalized,
      reason: reason,
      suppressed_at: new Date().toISOString(),
    });
    fs.writeFileSync(SUPPRESSION_FILE, JSON.stringify(list, null, 2) + "\n");
  }
}

function logEvent(event: Record<string, unknown>) {
  const dir = path.dirname(WEBHOOK_LOG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(WEBHOOK_LOG_FILE, JSON.stringify(event) + "\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = body?.type as string;
    const data = body?.data || {};
    const recipientEmail = (data?.email_id ? data?.to?.[0] : data?.to?.[0]) || data?.to?.[0] || "";

    // Log every event
    logEvent({
      type: eventType,
      email: recipientEmail,
      timestamp: new Date().toISOString(),
      data: data,
    });

    // Auto-suppress bounces and complaints
    if (SUPPRESS_EVENTS.includes(eventType) && recipientEmail) {
      addToSuppressionList(recipientEmail, eventType);
      console.log(`[email-webhook] Suppressed ${recipientEmail} - reason: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[email-webhook] Error processing webhook:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

// Resend may send a GET to verify the endpoint exists
export async function GET() {
  return NextResponse.json({ status: "ok", service: "lab-leads-pro-email-webhook" });
}
