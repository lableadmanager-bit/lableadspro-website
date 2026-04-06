import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import crypto from "crypto";
import Stripe from "stripe";
import { getSiteUrl } from "@/lib/site-url";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const FROM_EMAIL = "Lab Leads Pro <freshleads@lableadspro.com>";
const SITE_URL = getSiteUrl();

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

function buildWelcomeEmail(params: {
  planTier: string;
  planName: string;
  states: string[];
  resetLink: string;
}): string {
  const { planTier, planName, states, resetLink } = params;
  const stateList = states.map(s => STATE_NAMES[s.toUpperCase()] || s).join(", ");
  const tierLabel = planTier.charAt(0).toUpperCase() + planTier.slice(1);

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <!-- Header -->
        <tr><td style="background-color:#0f172a;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Lab Leads Pro</h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 16px;color:#0f172a;font-size:22px;">Welcome aboard! 🔬</h2>
          <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
            Thank you for subscribing to Lab Leads Pro. Your account is ready and your grant database is waiting for you.
          </p>

          <!-- Plan details -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;border-radius:8px;margin:24px 0;">
            <tr><td style="padding:20px;">
              <p style="margin:0 0 8px;color:#15803d;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Your Plan</p>
              <p style="margin:0 0 4px;color:#0f172a;font-size:18px;font-weight:600;">${planName} (${tierLabel})</p>
              <p style="margin:0;color:#374151;font-size:14px;">${states.length} state${states.length > 1 ? "s" : ""}: ${stateList}</p>
            </td></tr>
          </table>

          <!-- Stats -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
            <tr>
              <td width="50%" style="padding:16px;background-color:#f8fafc;border-radius:8px 0 0 8px;">
                <p style="margin:0 0 4px;color:#16a34a;font-size:24px;font-weight:700;">525,000+</p>
                <p style="margin:0;color:#64748b;font-size:13px;">grants from 8 federal agencies</p>
              </td>
              <td width="50%" style="padding:16px;background-color:#f8fafc;border-radius:0 8px 8px 0;">
                <p style="margin:0 0 4px;color:#16a34a;font-size:24px;font-weight:700;">160,000+</p>
                <p style="margin:0;color:#64748b;font-size:13px;">PIs with verified contact info</p>
              </td>
            </tr>
          </table>

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
            <tr><td align="center">
              <a href="${resetLink}" style="display:inline-block;background-color:#16a34a;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
                Set Your Password &amp; Access Your Database
              </a>
            </td></tr>
          </table>

          <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.5;text-align:center;">
            This link expires in 24 hours. If it expires, use the forgot password option on the <a href="${SITE_URL}/database/login" style="color:#16a34a;text-decoration:none;font-weight:500;">login page</a>.
          </p>

          <p style="margin:16px 0 8px;color:#374151;font-size:14px;line-height:1.6;">
            Once you set your password, you can log in at <a href="${SITE_URL}/database" style="color:#16a34a;text-decoration:none;font-weight:500;">${SITE_URL}/database</a> anytime.
          </p>

          <!-- Weekly report note -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;margin-top:24px;">
            <tr><td style="padding-top:20px;">
              <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
                📬 <strong>Your first weekly report arrives Monday morning</strong> - fresh grants and PI contacts delivered straight to your inbox.
              </p>
            </td></tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background-color:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0;color:#9ca3af;font-size:13px;">Lab Leads Pro - Grant intelligence for lab suppliers</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendWelcomeEmail(email: string, params: {
  planTier: string;
  planName: string;
  states: string[];
  resetLink: string;
}) {
  const html = buildWelcomeEmail(params);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [email],
      subject: "Welcome to Lab Leads Pro - Your Database is Ready 🔬",
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to send welcome email:", text);
  }

  return res.ok;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email;
  if (!email) {
    console.error("No customer email found on checkout session");
    return;
  }

  // Extract first/last name from Stripe custom_fields
  const customFields = (session as any).custom_fields as Array<{
    key: string;
    text?: { value: string };
  }> | undefined;
  const firstName = customFields?.find((f) => f.key === "first_name")?.text?.value || null;
  const lastName = customFields?.find((f) => f.key === "last_name")?.text?.value || null;

  const metadata = session.metadata || {};
  const states = metadata.states ? metadata.states.split(",") : [];
  const planTier = metadata.plan_tier || "standard";
  const autoUpgraded = metadata.autoUpgraded === "true";
  const planName = planTier === "pro"
    ? (autoUpgraded ? "Lab Leads Pro (Auto-Upgraded)" : "Lab Leads Pro")
    : "Lab Leads Standard";

  // Create Supabase Auth user
  const tempPassword = crypto.randomBytes(24).toString("base64url");
  const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });

  if (createError) {
    // User may already exist (e.g. duplicate webhook)
    console.error("Error creating user:", createError.message);
    if (!createError.message.includes("already been registered")) {
      return;
    }
  }

  const userId = userData?.user?.id;

  // Get Stripe customer/subscription IDs
  const stripeCustomerId = typeof session.customer === "string"
    ? session.customer
    : session.customer?.id || null;
  const stripeSubscriptionId = typeof session.subscription === "string"
    ? session.subscription
    : session.subscription?.id || null;

  // Insert subscription record (gracefully handle missing table)
  if (userId) {
    try {
      const { error: insertError } = await supabaseAdmin.from("subscriptions").insert({
        user_id: userId,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        plan_tier: planTier,
        subscribed_states: states,
        status: "active",
        first_name: firstName,
        last_name: lastName,
        email,
      });
      if (insertError) {
        console.error("Error inserting subscription:", insertError.message);
      }
    } catch (err) {
      console.error("Subscriptions table may not exist yet:", err);
    }
  }

  // Generate password reset link
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: `${SITE_URL}/auth/callback?type=recovery` },
  });

  if (linkError) {
    console.error("Error generating reset link:", linkError.message);
    return;
  }

  // Use the action_link directly - it goes through Supabase's /auth/v1/verify endpoint
  // which validates the token, creates a session, then redirects to our set-password page
  const resetLink = linkData?.properties?.action_link || `${SITE_URL}/database/login`;

  // Send welcome email
  await sendWelcomeEmail(email, {
    planTier,
    planName,
    states,
    resetLink,
  });

  const nameStr = [firstName, lastName].filter(Boolean).join(" ") || "unknown";
  console.log(`[SUBSCRIPTION] ${nameStr} <${email}> | plan: ${planTier} | states: ${states.join(",")}`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const stripeSubscriptionId = subscription.id;
  const status = subscription.status;

  try {
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .update({ status })
      .eq("stripe_subscription_id", stripeSubscriptionId);
    if (error) {
      console.error("Error updating subscription:", error.message);
    }
  } catch (err) {
    console.error("Subscriptions table may not exist yet:", err);
  }

  console.log(`[SUBSCRIPTION_UPDATED] ${stripeSubscriptionId} → ${status}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const stripeSubscriptionId = subscription.id;

  try {
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("stripe_subscription_id", stripeSubscriptionId);
    if (error) {
      console.error("Error canceling subscription:", error.message);
    }
  } catch (err) {
    console.error("Subscriptions table may not exist yet:", err);
  }

  console.log(`[SUBSCRIPTION_CANCELED] ${stripeSubscriptionId}`);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
