"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PLANS, CATCH_UP_PRICE, type PlanTier } from "@/lib/plans";

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
  const router = useRouter();
  const planParam = (searchParams.get("plan") as PlanTier) || "basic";

  const [activeTier, setActiveTier] = useState<PlanTier>(
    planParam in PLANS ? planParam : "basic"
  );
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [stateSearch, setStateSearch] = useState("");
  const [addCatchUp, setAddCatchUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tier = searchParams.get("plan") as PlanTier;
    if (tier && tier in PLANS) setActiveTier(tier);
  }, [searchParams]);

  const plan = PLANS[activeTier];
  const stateCount = selectedStates.length;
  const monthlyTotal = stateCount * plan.pricePerState;
  const catchUpTotal = addCatchUp ? stateCount * CATCH_UP_PRICE : 0;

  const filteredStates = US_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.code.toLowerCase().includes(stateSearch.toLowerCase())
  );

  function toggleState(code: string) {
    setSelectedStates((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
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
          priceId: plan.priceId,
          states: selectedStates,
          plan: activeTier,
          addCatchUp,
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
    <div className="min-h-screen bg-[var(--color-dark)] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <a href="/" className="text-lg font-bold text-white hover:text-[var(--color-brand)] transition-colors">
          Lab Leads Pro
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
        <p className="text-gray-400 mb-10">Pick your plan, select your states, and get started.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Plan + States */}
          <div className="lg:col-span-2 space-y-8">
            {/* Plan selector */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold mb-4">Select Plan</h2>
              <div className="grid grid-cols-3 gap-3">
                {(["basic", "plus", "pro"] as PlanTier[]).map((tier) => {
                  const p = PLANS[tier];
                  const active = activeTier === tier;
                  return (
                    <button
                      key={tier}
                      onClick={() => setActiveTier(tier)}
                      className={`rounded-xl p-4 text-left transition-all border ${
                        active
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10"
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      }`}
                    >
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div className="text-2xl font-bold mt-1">${p.pricePerState}</div>
                      <div className="text-xs text-gray-400">/state/mo</div>
                    </button>
                  );
                })}
              </div>

              <ul className="mt-4 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-gray-300">
                    <span className="text-[var(--color-accent)]">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Upsell banner */}
            {activeTier === "basic" && (
              <div className="bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/40 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[var(--color-brand)]">Upgrade to LabLeads Plus — just $10 more/state</p>
                    <p className="text-sm text-gray-300 mt-1">
                      Get grants from 7 additional federal agencies: NSF, DOD, DOE, NASA, VA, USDA, CDC
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTier("plus")}
                    className="shrink-0 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            )}

            {activeTier === "plus" && (
              <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/40 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[var(--color-accent)]">Go Pro — just $20 more/state</p>
                    <p className="text-sm text-gray-300 mt-1">
                      Add New Lab Detection and be the first rep to reach new PIs
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTier("pro")}
                    className="shrink-0 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            )}

            {/* State selector */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Select States</h2>
                <span className="text-sm text-[var(--color-brand)] font-medium">
                  {stateCount} state{stateCount !== 1 ? "s" : ""} selected
                  {stateCount > 0 && ` — ${stateCount} × $${plan.pricePerState}/mo = $${monthlyTotal.toLocaleString()}/mo`}
                </span>
              </div>
              <input
                type="text"
                placeholder="Search states…"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-[var(--color-brand)] placeholder-gray-500"
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
                          : "bg-white/5 border-white/10 hover:border-white/30 text-gray-300"
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
                  className="mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Catch-up add-on */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addCatchUp}
                  onChange={(e) => setAddCatchUp(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--color-brand)]"
                />
                <div>
                  <p className="font-semibold">
                    Add 3-Month Catch-Up Report{" "}
                    <span className="text-[var(--color-accent)]">+${CATCH_UP_PRICE}/state, one-time</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Get up to speed instantly with 3 months of historical grant data
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan</span>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price/state</span>
                  <span className="font-medium">${plan.pricePerState}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">States</span>
                  <span className="font-medium">{stateCount || "—"}</span>
                </div>

                {selectedStates.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-gray-400 text-xs mb-1.5">Selected:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedStates.map((s) => (
                        <span key={s} className="bg-[var(--color-brand)]/20 text-[var(--color-brand)] text-xs px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex justify-between font-semibold">
                  <span>Monthly total</span>
                  <span>${monthlyTotal.toLocaleString()}/mo</span>
                </div>

                {addCatchUp && stateCount > 0 && (
                  <div className="flex justify-between text-[var(--color-accent)]">
                    <span>Catch-Up Report</span>
                    <span>+${catchUpTotal.toLocaleString()} one-time</span>
                  </div>
                )}
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                onClick={handleSubscribe}
                disabled={loading || stateCount === 0}
                className="mt-6 w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                {loading ? "Redirecting to Stripe…" : "Subscribe →"}
              </button>

              <p className="text-center text-xs text-gray-500 mt-3">
                Secure checkout powered by Stripe. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-dark)] flex items-center justify-center">
        <div className="text-white text-lg">Loading…</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
