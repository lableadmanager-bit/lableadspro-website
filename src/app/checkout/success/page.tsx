"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const FIRED_KEY_PREFIX = "llp_purchase_fired:";
// Google Ads conversion ID for completed subscriptions. Set this once in
// Google Ads → Tools → Conversions → New conversion → Website, then paste the
// "AW-…/…" pair here. Until populated, GA4 still receives the purchase event.
const GOOGLE_ADS_PURCHASE_ID = "";

type SessionSummary = {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{ item_id: string; item_name: string; price: number; quantity: number }>;
  tier?: string | null;
  state_count?: number | null;
};

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (!sessionId) return;

    // Guard against StrictMode double-mount + accidental refresh after firing.
    const guardKey = FIRED_KEY_PREFIX + sessionId;
    try {
      if (sessionStorage.getItem(guardKey)) return;
    } catch {
      // sessionStorage disabled — best effort, dedupe via ref only
    }
    fired.current = true;

    fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SessionSummary | null) => {
        if (!data) return;

        // GA4 standard ecommerce event — populates the Transactions report.
        trackEvent("purchase", {
          transaction_id: data.transaction_id,
          value: data.value,
          currency: data.currency,
          tier: data.tier ?? "",
          state_count: data.state_count ?? 0,
        });

        // Mirror to Google Ads as a conversion if a conversion ID is wired in.
        if (
          GOOGLE_ADS_PURCHASE_ID &&
          typeof window !== "undefined" &&
          typeof window.gtag === "function"
        ) {
          window.gtag("event", "conversion", {
            send_to: GOOGLE_ADS_PURCHASE_ID,
            transaction_id: data.transaction_id,
            value: data.value,
            currency: data.currency,
          });
        }

        try {
          sessionStorage.setItem(guardKey, "1");
        } catch {
          // ignore
        }
      })
      .catch((err) => console.error("[checkout/success] purchase event failed", err));
  }, [sessionId]);

  return (
    <div className="max-w-lg text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-4xl font-bold mb-4">Welcome to Lab Leads Pro!</h1>
      <p className="text-xl text-gray-300 mb-3">
        Check your email for your database login.
      </p>
      <p className="text-base text-gray-400 mb-3">
        We just sent you an email with a link to the database and a temporary password so you can log in right away.
      </p>
      <p className="text-lg text-[var(--color-accent)] font-medium mb-10">
        Your first weekly report arrives Monday morning.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/"
          className="inline-block bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          Back to Homepage
        </a>
        <a
          href="/database"
          className="inline-block border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          Already set up? Go to Database →
        </a>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex items-center justify-center px-6">
      <Suspense fallback={null}>
        <SuccessInner />
      </Suspense>
    </div>
  );
}
