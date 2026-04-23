import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isLikelyBotUA } from "@/lib/request-context";

const BOT_TIMING_WINDOW_MS = 3000;

/**
 * Resend Webhook Handler
 * 
 * Receives bounce, complaint, and delivery status events from Resend.
 * Auto-suppresses bounced and complained emails in Supabase.
 * Logs all events to Supabase for analytics.
 * 
 * Events:
 * - email.bounced → auto-suppress
 * - email.complained → auto-suppress
 * - email.delivered → log only
 * - email.opened → log only
 * - email.clicked → log only
 */

const SUPPRESS_EVENTS = ["email.bounced", "email.complained"];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

type ResendData = Record<string, unknown>;

function extractEventUserAgent(eventType: string, data: ResendData): string | null {
  const bucketKey = eventType === "email.opened" ? "open" : eventType === "email.clicked" ? "click" : null;
  if (bucketKey) {
    const bucket = data[bucketKey];
    if (bucket && typeof bucket === "object") {
      const ua = (bucket as Record<string, unknown>).userAgent ?? (bucket as Record<string, unknown>).user_agent;
      if (typeof ua === "string") return ua;
    }
  }
  const topUa = data.user_agent ?? data.userAgent;
  return typeof topUa === "string" ? topUa : null;
}

function extractEventTimestamp(eventType: string, data: ResendData, fallbackIso: string): number {
  const bucketKey = eventType === "email.opened" ? "open" : eventType === "email.clicked" ? "click" : null;
  if (bucketKey) {
    const bucket = data[bucketKey];
    if (bucket && typeof bucket === "object") {
      const ts = (bucket as Record<string, unknown>).timestamp;
      if (typeof ts === "string") {
        const parsed = Date.parse(ts);
        if (!Number.isNaN(parsed)) return parsed;
      }
    }
  }
  const parsed = Date.parse(fallbackIso);
  return Number.isNaN(parsed) ? Date.now() : parsed;
}

async function isFastScannerClick(
  supabase: SupabaseClient,
  eventType: string,
  emailId: string,
  eventMs: number,
): Promise<boolean> {
  if (!emailId) return false;
  if (eventType !== "email.opened" && eventType !== "email.clicked") return false;

  const { data: deliveries } = await supabase
    .from("email_webhook_events")
    .select("created_at")
    .eq("email_id", emailId)
    .eq("event_type", "email.delivered")
    .order("created_at", { ascending: false })
    .limit(1);

  const deliveredAt = deliveries?.[0]?.created_at;
  if (!deliveredAt) return false;
  const deliveredMs = Date.parse(deliveredAt);
  if (Number.isNaN(deliveredMs)) return false;
  return eventMs - deliveredMs < BOT_TIMING_WINDOW_MS;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = body?.type as string;
    const data = body?.data || {};
    const recipientEmail = data?.to?.[0] || data?.email || "";
    const emailId = data?.email_id || "";

    if (!eventType) {
      return NextResponse.json({ error: "Missing event type" }, { status: 400 });
    }

    const supabase = getSupabase();
    const insertedAtIso = new Date().toISOString();

    // Bot filter: UA blocklist + <3s-since-delivery timing on open/click events.
    // Corporate link scanners (Outlook ATP, Mimecast, Proofpoint, Barracuda) and
    // webhooks from messaging apps pre-fetch every link seconds after delivery.
    // Skipping auto-suppress on these events avoids bouncing legit recipients
    // when a scanner triggers a false positive.
    const eventUa = extractEventUserAgent(eventType, data);
    let isBot = isLikelyBotUA(eventUa);
    if (!isBot && supabase) {
      try {
        const eventMs = extractEventTimestamp(eventType, data, insertedAtIso);
        isBot = await isFastScannerClick(supabase, eventType, emailId, eventMs);
      } catch (err) {
        console.error("[email-webhook] bot-timing check failed:", err);
      }
    }

    // Log the event to Supabase
    if (supabase) {
      try {
        await supabase.from("email_webhook_events").insert({
          event_type: eventType,
          email: recipientEmail,
          email_id: emailId,
          payload: body,
          is_bot: isBot,
          created_at: insertedAtIso,
        });
      } catch {
        // Don't fail if logging fails — the suppression is what matters
      }
    }

    // Auto-suppress bounces and complaints — but never based on a bot event.
    if (!isBot && SUPPRESS_EVENTS.includes(eventType) && recipientEmail && supabase) {
      const normalizedEmail = recipientEmail.toLowerCase();
      const bounceType = data?.bounce?.type || "";
      const isHardBounce = bounceType === "Permanent";
      const isComplaint = eventType === "email.complained";

      if (isHardBounce || isComplaint) {
        // Permanent bounce or complaint — suppress forever
        await supabase.from("email_suppressions").upsert(
          {
            email: normalizedEmail,
            reason: eventType,
            suppressed_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        );

        await supabase
          .from("drip_contacts")
          .update({ status: "bounced" })
          .eq("email", normalizedEmail);

        console.log(`[email-webhook] Hard suppressed ${recipientEmail} - ${bounceType} ${eventType}`);
      } else {
        // Transient/soft bounce — log it but don't suppress
        // These often resolve as domain reputation builds
        console.log(`[email-webhook] Soft bounce ${recipientEmail} - ${bounceType} ${eventType} (not suppressed)`);
      }
    }

    return NextResponse.json({ received: true, event: eventType });
  } catch (err) {
    console.error("[email-webhook] Error:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

// Resend may send a GET to verify the endpoint exists
export async function GET() {
  return NextResponse.json({ status: "ok", service: "lab-leads-pro-email-webhook" });
}
