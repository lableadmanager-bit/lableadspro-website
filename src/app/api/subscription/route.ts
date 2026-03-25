import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { stripe } from "@/lib/stripe";
import { PLANS, getEffectivePlan, PRO_TWO_STATE_BUNDLE_PRICE_ID } from "@/lib/plans";
import type { PlanTier } from "@/lib/plans";

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

export async function GET(req: NextRequest) {
  try {
    const supabaseAuth = getAuthClient(req);
    const { data: { user } } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("plan_tier, subscribed_states, status, stripe_subscription_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (!subscription) {
      return NextResponse.json({ error: "No active subscription" }, { status: 403 });
    }

    // Fetch billing details from Stripe
    let currentPeriodEnd: string | null = null;
    let monthlyTotal: number | null = null;
    if (subscription.stripe_subscription_id) {
      try {
        const stripeSub = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
        // current_period_end exists at runtime but was removed from v20+ types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const periodEnd = (stripeSub as any).current_period_end as number | undefined;
        if (periodEnd) {
          currentPeriodEnd = new Date(periodEnd * 1000).toISOString();
        }
        // Calculate monthly total from our pricing logic
        const states = subscription.subscribed_states || [];
        const tier = subscription.plan_tier as PlanTier;
        const effective = getEffectivePlan(tier, states.length);
        monthlyTotal = effective.monthlyTotal;
      } catch (e) {
        console.error("Error fetching Stripe subscription:", e);
      }
    }

    return NextResponse.json({
      planTier: subscription.plan_tier,
      subscribedStates: subscription.subscribed_states,
      status: subscription.status,
      stripeSubscriptionId: subscription.stripe_subscription_id,
      currentPeriodEnd,
      monthlyTotal,
    });
  } catch (err) {
    console.error("Subscription API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabaseAuth = getAuthClient(req);
    const { data: { user } } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { action } = body as { action: string };

    // Fetch current subscription
    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("id, plan_tier, subscribed_states, status, stripe_subscription_id, stripe_customer_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (!subscription) {
      return NextResponse.json({ error: "No active subscription" }, { status: 403 });
    }

    if (!subscription.stripe_subscription_id) {
      return NextResponse.json({ error: "No Stripe subscription found" }, { status: 400 });
    }

    const currentStates: string[] = subscription.subscribed_states || [];
    const currentTier = subscription.plan_tier as PlanTier;

    if (action === "add_states") {
      const { newStates } = body as { newStates: string[] };

      if (!newStates || newStates.length === 0) {
        return NextResponse.json({ error: "No states provided" }, { status: 400 });
      }

      // Validate: new states must not already be subscribed
      const duplicates = newStates.filter((s: string) => currentStates.includes(s));
      if (duplicates.length > 0) {
        return NextResponse.json({ error: `Already subscribed to: ${duplicates.join(", ")}` }, { status: 400 });
      }

      const mergedStates = [...currentStates, ...newStates];
      const effective = getEffectivePlan(currentTier, mergedStates.length);

      // Determine Stripe price + quantity
      const { priceId, quantity } = getStripePricing(effective, currentTier, mergedStates.length);

      // Retrieve current Stripe subscription to get the item ID
      const stripeSub = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
      const existingItem = stripeSub.items.data[0];

      // Update Stripe subscription
      await stripe.subscriptions.update(subscription.stripe_subscription_id, {
        items: [
          {
            id: existingItem.id,
            price: priceId,
            quantity,
          },
        ],
        proration_behavior: "create_prorations",
        metadata: {
          plan_tier: effective.tier,
          selected_tier: currentTier,
          states: mergedStates.join(","),
          stateCount: String(mergedStates.length),
          autoUpgraded: String(effective.autoUpgraded),
          proBundle: String(effective.proBundle),
          monthlyTotal: String(effective.monthlyTotal),
        },
      });

      // Update Supabase
      await supabaseAdmin
        .from("subscriptions")
        .update({
          subscribed_states: mergedStates,
          plan_tier: effective.tier,
        })
        .eq("id", subscription.id);

      return NextResponse.json({
        planTier: effective.tier,
        subscribedStates: mergedStates,
        status: "active",
        monthlyTotal: effective.monthlyTotal,
      });
    }

    if (action === "upgrade_tier") {
      const { newTier } = body as { newTier: string };

      if (newTier !== "pro") {
        return NextResponse.json({ error: "Can only upgrade to Pro" }, { status: 400 });
      }

      if (currentTier === "pro") {
        return NextResponse.json({ error: "Already on Pro" }, { status: 400 });
      }

      const effective = getEffectivePlan("pro" as PlanTier, currentStates.length);
      const { priceId, quantity } = getStripePricing(effective, "pro", currentStates.length);

      const stripeSub = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
      const existingItem = stripeSub.items.data[0];

      await stripe.subscriptions.update(subscription.stripe_subscription_id, {
        items: [
          {
            id: existingItem.id,
            price: priceId,
            quantity,
          },
        ],
        proration_behavior: "create_prorations",
        metadata: {
          plan_tier: effective.tier,
          selected_tier: "pro",
          states: currentStates.join(","),
          stateCount: String(currentStates.length),
          autoUpgraded: String(effective.autoUpgraded),
          proBundle: String(effective.proBundle),
          monthlyTotal: String(effective.monthlyTotal),
        },
      });

      await supabaseAdmin
        .from("subscriptions")
        .update({ plan_tier: "pro" })
        .eq("id", subscription.id);

      return NextResponse.json({
        planTier: effective.tier,
        subscribedStates: currentStates,
        status: "active",
        monthlyTotal: effective.monthlyTotal,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("Subscription PATCH error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function getStripePricing(
  effective: ReturnType<typeof getEffectivePlan>,
  selectedTier: PlanTier | string,
  stateCount: number
): { priceId: string; quantity: number } {
  if (effective.proBundle) {
    return { priceId: PRO_TWO_STATE_BUNDLE_PRICE_ID, quantity: 1 };
  }
  if (effective.autoUpgraded) {
    return { priceId: PLANS.standard.priceId, quantity: stateCount };
  }
  if (effective.proFreeState && effective.billedStates) {
    return { priceId: PLANS.pro.priceId, quantity: effective.billedStates };
  }
  return { priceId: PLANS[selectedTier as PlanTier].priceId, quantity: stateCount };
}
