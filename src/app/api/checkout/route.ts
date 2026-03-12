import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CATCH_UP_PRICE_ID, VALID_PRICE_IDS, getAddOnPriceId, getAddOnPlanName } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { addons, states, addCatchUp } = body as {
      addons: { agencies: boolean; newLab: boolean };
      states: string[];
      addCatchUp: boolean;
    };

    const agencies = Boolean(addons?.agencies);
    const newLab = Boolean(addons?.newLab);
    const priceId = getAddOnPriceId(agencies, newLab);
    const planName = getAddOnPlanName(agencies, newLab);

    if (!VALID_PRICE_IDS.has(priceId)) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    if (!states || states.length === 0) {
      return NextResponse.json({ error: "At least one state required" }, { status: 400 });
    }

    const stateCount = states.length;
    const metadata = {
      plan: planName,
      states: states.join(","),
      stateCount: String(stateCount),
      addAgencies: String(agencies),
      addNewLab: String(newLab),
    };

    const lineItems: { price: string; quantity: number }[] = [
      { price: priceId, quantity: stateCount },
    ];

    if (addCatchUp) {
      lineItems.push({ price: CATCH_UP_PRICE_ID, quantity: stateCount });
    }

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
