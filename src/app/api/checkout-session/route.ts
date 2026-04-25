import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Returns the minimal fields the client-side success page needs to fire a
// proper GA4 purchase event. Authenticated only by knowledge of the session_id
// (which Stripe just sent the buyer); we don't expose anything more sensitive
// than what's already on the receipt.
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price"],
    });

    if (session.status !== "complete") {
      return NextResponse.json({ error: "session incomplete" }, { status: 400 });
    }

    const items = (session.line_items?.data ?? []).map((li) => {
      const price = typeof li.price === "object" && li.price !== null ? li.price : null;
      return {
        item_id: price?.id ?? li.id,
        item_name: (li.description || price?.nickname || price?.id || "subscription") as string,
        price: (price?.unit_amount ?? 0) / 100,
        quantity: li.quantity ?? 1,
      };
    });

    return NextResponse.json({
      transaction_id: session.id,
      value: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? "usd").toUpperCase(),
      items,
      tier: session.metadata?.plan_tier ?? null,
      states: session.metadata?.states ?? null,
      state_count: Number(session.metadata?.stateCount ?? 0) || null,
    });
  } catch (err) {
    console.error("[checkout-session] retrieve failed:", err);
    return NextResponse.json({ error: "lookup failed" }, { status: 500 });
  }
}
