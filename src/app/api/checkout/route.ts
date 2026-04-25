import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PLANS, VALID_PRICE_IDS, getEffectivePlan, PRO_TWO_STATE_BUNDLE_PRICE_ID } from "@/lib/plans";
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
    
    let priceId: string;
    let quantity: number;
    
    if (effective.proBundle) {
      // Pro 2-state bundle: flat $249 price, quantity 1
      priceId = PRO_TWO_STATE_BUNDLE_PRICE_ID;
      quantity = 1;
    } else if (effective.autoUpgraded) {
      // Standard auto-upgrade: use Standard price × number of states
      priceId = PLANS.standard.priceId;
      quantity = stateCount;
    } else if (effective.proFreeState && effective.billedStates) {
      // Pro 3+ states: bill for billedStates only (every 3rd free)
      priceId = PLANS.pro.priceId;
      quantity = effective.billedStates;
    } else {
      // Normal pricing
      priceId = PLANS[selectedTier].priceId;
      quantity = stateCount;
    }

    const metadata = {
      plan_tier: effective.tier,
      selected_tier: selectedTier,
      states: states.join(","),
      stateCount: String(stateCount),
      autoUpgraded: String(effective.autoUpgraded),
      proBundle: String(effective.proBundle),
      monthlyTotal: String(effective.monthlyTotal),
    };

    const lineItems: { price: string; quantity: number }[] = [
      { price: priceId, quantity },
    ];

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      metadata,
      subscription_data: { metadata },
      allow_promotion_codes: true,
      custom_fields: [
        {
          key: "first_name",
          label: { type: "custom", custom: "First Name" },
          type: "text",
        },
        {
          key: "last_name",
          label: { type: "custom", custom: "Last Name" },
          type: "text",
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
