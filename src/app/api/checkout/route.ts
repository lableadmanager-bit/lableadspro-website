import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PLANS, VALID_PRICE_IDS, getEffectivePlan } from "@/lib/plans";
import type { PlanTier } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, states } = body as {
      tier: string;
      states: string[];
    };

    // Validate tier
    if (tier !== "standard" && tier !== "pro") {
      return NextResponse.json({ error: "Invalid plan tier" }, { status: 400 });
    }

    if (!states || states.length === 0) {
      return NextResponse.json({ error: "At least one state required" }, { status: 400 });
    }

    const selectedTier = tier as PlanTier;
    const stateCount = states.length;

    // Apply auto-upgrade logic server-side
    const effective = getEffectivePlan(selectedTier, stateCount);
    const priceId = effective.autoUpgraded
      ? PLANS.standard.priceId // Use Standard price for auto-upgrades
      : PLANS[selectedTier].priceId;

    if (!VALID_PRICE_IDS.has(priceId)) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    const metadata = {
      plan_tier: effective.tier,
      selected_tier: selectedTier,
      states: states.join(","),
      stateCount: String(stateCount),
      billedStates: String(effective.billedStates),
      freeStates: String(effective.freeStates),
      autoUpgraded: String(effective.autoUpgraded),
      pricePerState: String(effective.pricePerState),
    };

    // Bill for billedStates, not total states (free state promo)
    const lineItems: { price: string; quantity: number }[] = [
      { price: priceId, quantity: effective.billedStates },
    ];

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      metadata,
      subscription_data: { metadata },
      allow_promotion_codes: true,
      customer_email: undefined,
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
