"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PLANS, AUTO_UPGRADE_THRESHOLD, getEffectivePlan } from "@/lib/plans";
import type { PlanTier } from "@/lib/plans";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const US_STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "standard";
  const initialTier: PlanTier = planParam === "pro" ? "pro" : "standard";

  const [selectedTier, setSelectedTier] = useState<PlanTier>(initialTier);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [stateSearch, setStateSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [priceFlash, setPriceFlash] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stateCount = selectedStates.length;
  const effective = getEffectivePlan(selectedTier, stateCount);
  const displayPlan = PLANS[effective.tier];
  const monthlyTotal = effective.monthlyTotal;
  const fullPrice = stateCount * effective.pricePerState; // without any discounts

  const filteredStates = US_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.code.toLowerCase().includes(stateSearch.toLowerCase())
  );

  function triggerFlash() {
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setPriceFlash(true);
    flashTimer.current = setTimeout(() => setPriceFlash(false), 700);
  }

  useEffect(() => {
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  function toggleState(code: string) {
    setSelectedStates((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
  }

  function handleTierChange(tier: PlanTier) {
    setSelectedTier(tier);
    triggerFlash();
  }

  async function handleSubscribe() {
    if (stateCount === 0) {
      setError("Please select at least one state.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: selectedTier,
          states: selectedStates,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)] text-[var(--color-dark)]">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Build Your Plan</h1>
        <p className="text-[var(--color-gray-500)] mb-10">Choose your plan, then pick your states.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Plan selector — FIRST */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--color-gray-200)]">
              <h2 className="text-lg font-semibold mb-4">Select Plan</h2>
              <div className="grid grid-cols-2 gap-3">
                {(["standard", "pro"] as PlanTier[]).map((tier) => {
                  const plan = PLANS[tier];
                  const isSelected = selectedTier === tier;
                  return (
                    <button
                      key={tier}
                      onClick={() => handleTierChange(tier)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10"
                          : "border-[var(--color-gray-200)] bg-[var(--color-gray-50)] hover:border-[var(--color-gray-400)]"
                      }`}
                    >
                      <p className="font-semibold text-sm">{plan.name}</p>
                      <p className="text-2xl font-bold mt-1">${plan.pricePerState}<span className="text-sm font-normal text-[var(--color-gray-500)]">/state/mo</span></p>
                      <p className="text-xs text-[var(--color-gray-500)] mt-2">{plan.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Plan features */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--color-gray-200)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg font-bold">{displayPlan.name}</span>
                {effective.autoUpgraded && (
                  <span className="text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-2 py-0.5 rounded-full font-medium">
                    Auto-Upgraded
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {displayPlan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-[var(--color-gray-600)]">
                    <span className="text-[var(--color-accent)] mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Promo message — changes based on selected plan */}
            <div className="bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/30 rounded-2xl p-5">
              {selectedTier === "standard" ? (
                <>
                  <p className="text-[var(--color-brand)] font-semibold text-sm">
                    Pick 3 or more states and get upgraded to Pro automatically!
                  </p>
                  <p className="text-[var(--color-gray-600)] text-xs mt-1">
                    All Pro features (8 agencies, new lab detection, full database) at the Standard price.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[var(--color-brand)] font-semibold text-sm">
                    Get 2 states for just $249/mo (save $49!)
                  </p>
                  <p className="text-[var(--color-gray-600)] text-xs mt-1">
                    Select 2 states and get the Pro bundle discount. Add a 3rd for only $49 more.
                  </p>
                </>
              )}
            </div>

            {/* Auto-upgrade banner — shows when triggered */}
            {effective.autoUpgraded && (
              <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-2xl p-5">
                <p className="text-[var(--color-accent)] font-semibold text-sm">
                  Congratulations! You&apos;re being upgraded to Pro automatically!
                </p>
                <p className="text-[var(--color-gray-600)] text-xs mt-1">
                  {stateCount} states selected. You&apos;re getting all Pro features at ${PLANS.standard.pricePerState}/state.
                </p>
              </div>
            )}

            {/* State selector */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--color-gray-200)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Select Your States</h2>
                <span className="text-sm font-medium text-[var(--color-brand)]">
                  {stateCount} state{stateCount !== 1 ? "s" : ""} selected
                  {stateCount > 0 &&
                    ` · ${stateCount} × $${effective.pricePerState}/mo = $${monthlyTotal.toLocaleString()}/mo`}
                </span>
              </div>
              <input
                type="text"
                placeholder="Search states…"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full bg-[var(--color-gray-50)] border border-[var(--color-gray-200)] rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-[var(--color-brand)] placeholder-[var(--color-gray-400)] text-[var(--color-dark)]"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
                {filteredStates.map((s) => {
                  const selected = selectedStates.includes(s.code);
                  return (
                    <button
                      key={s.code}
                      onClick={() => toggleState(s.code)}
                      className={`text-left text-sm px-3 py-2 rounded-lg border transition-all ${
                        selected
                          ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-white"
                          : "bg-[var(--color-gray-50)] border-[var(--color-gray-200)] hover:border-[var(--color-gray-400)] text-[var(--color-gray-700)]"
                      }`}
                    >
                      <span className="font-mono font-bold text-xs">{s.code}</span>
                      <span className="ml-1 hidden sm:inline text-xs opacity-75">{s.name}</span>
                    </button>
                  );
                })}
              </div>
              {selectedStates.length > 0 && (
                <button
                  onClick={() => setSelectedStates([])}
                  className="mt-3 text-xs text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)] transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[var(--color-gray-200)] lg:sticky lg:top-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-500)]">Plan</span>
                  <span className="font-medium text-right max-w-[60%]">{displayPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-gray-500)]">Price/state</span>
                  <span
                    className={`font-medium tabular-nums transition-colors duration-300 ${
                      priceFlash ? "text-[var(--color-brand)]" : "text-[var(--color-dark)]"
                    }`}
                  >
                    ${effective.pricePerState}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-500)]">States</span>
                  <span className="font-medium">{stateCount || "—"}</span>
                </div>

                {selectedStates.length > 0 && (
                  <div className="pt-2 border-t border-[var(--color-gray-100)]">
                    <p className="text-[var(--color-gray-500)] text-xs mb-1.5">Selected:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedStates.map((s) => (
                        <span
                          key={s}
                          className="bg-[var(--color-brand)]/20 text-[var(--color-brand)] text-xs px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Auto-upgrade crossed-out pricing */}
                {effective.autoUpgraded && stateCount > 0 && (
                  <div className="pt-2 border-t border-[var(--color-gray-100)]">
                    <div className="flex justify-between text-[var(--color-gray-400)]">
                      <span>Pro price</span>
                      <span className="line-through">${(stateCount * PLANS.pro.pricePerState).toLocaleString()}/mo</span>
                    </div>
                    <p className="text-[var(--color-brand)] text-xs mt-1 font-medium">
                      Auto-upgraded to Pro. {stateCount} states at Standard pricing!
                    </p>
                  </div>
                )}

                {/* Pro 2-state bundle discount */}
                {effective.proBundle && (
                  <div className="pt-2 border-t border-[var(--color-gray-100)]">
                    <div className="flex justify-between text-[var(--color-gray-400)]">
                      <span>Regular price</span>
                      <span className="line-through">${fullPrice.toLocaleString()}/mo</span>
                    </div>
                    <p className="text-[var(--color-brand)] text-xs mt-1 font-medium">
                      Pro 2-state bundle. You save ${fullPrice - monthlyTotal}/mo!
                    </p>
                  </div>
                )}

                <div
                  className={`pt-3 border-t border-[var(--color-gray-200)] flex justify-between font-bold text-base tabular-nums transition-colors duration-300 ${
                    priceFlash ? "text-[var(--color-brand)]" : "text-[var(--color-dark)]"
                  }`}
                >
                  <span>Monthly total</span>
                  <span>${monthlyTotal.toLocaleString()}/mo</span>
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                onClick={handleSubscribe}
                disabled={loading || stateCount === 0}
                className="mt-6 w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Redirecting to Stripe…
                  </>
                ) : (
                  "Continue to Payment →"
                )}
              </button>

              <p className="text-center text-xs text-[var(--color-gray-500)] mt-3">
                Secure checkout powered by Stripe. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-gray-50)] flex items-center justify-center">
          <div className="text-[var(--color-dark)] text-lg">Loading…</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
