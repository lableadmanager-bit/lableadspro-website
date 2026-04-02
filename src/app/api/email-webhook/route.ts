import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    // Log the event to Supabase
    if (supabase) {
      try {
        await supabase.from("email_webhook_events").insert({
          event_type: eventType,
          email: recipientEmail,
          email_id: emailId,
          payload: body,
          created_at: new Date().toISOString(),
        });
      } catch {
        // Don't fail if logging fails — the suppression is what matters
      }
    }

    // Auto-suppress bounces and complaints
    if (SUPPRESS_EVENTS.includes(eventType) && recipientEmail && supabase) {
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
