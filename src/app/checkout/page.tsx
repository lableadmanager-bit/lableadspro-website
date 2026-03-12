"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PLANS, CATCH_UP_PRICE, ADD_ON_PRICES, getAddOnPlanName } from "@/lib/plans";

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

function CheckIcon() {
  return (
    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "basic";
  const isPro = planParam === "pro";

  const [addAgencies, setAddAgencies] = useState(planParam === "plus" || planParam === "pro");
  const [addNewLab, setAddNewLab] = useState(planParam === "pro");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [stateSearch, setStateSearch] = useState("");
  const [addCatchUp, setAddCatchUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showNewLabTooltip, setShowNewLabTooltip] = useState(false);
  const [priceFlash, setPriceFlash] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pricePerState = isPro
    ? PLANS.pro.pricePerState
    : PLANS.basic.pricePerState +
      (addAgencies ? ADD_ON_PRICES.agencies : 0) +
      (addNewLab ? ADD_ON_PRICES.newLab : 0);

  const planName = isPro
    ? "LabLeads Pro"
    : getAddOnPlanName(addAgencies, addNewLab);

  const stateCount = selectedStates.length;
  const monthlyTotal = stateCount * pricePerState;
  const catchUpTotal = addCatchUp ? stateCount * CATCH_UP_PRICE : 0;

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

  function handleToggleAgencies(checked: boolean) {
    setAddAgencies(checked);
    if (!checked) setAddNewLab(false);
    triggerFlash();
  }

  function handleToggleNewLab(checked: boolean) {
    if (checked && !addAgencies) {
      setAddAgencies(true);
      setShowNewLabTooltip(true);
      setTimeout(() => setShowNewLabTooltip(false), 3000);
    }
    setAddNewLab(checked);
    triggerFlash();
  }

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
          addons: {
            agencies: isPro || addAgencies,
            newLab: isPro || addNewLab,
          },
          states: selectedStates,
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

  const planDescriptions: Record<string, string> = {
    basic: "Start with NIH grant intelligence for your territory.",
    plus: "Grants from 8 federal agencies — your territory, fully covered.",
    pro: "The complete package. Grants + New Lab Detection.",
  };
  const headingDescription = planDescriptions[planParam] ?? planDescriptions.basic;

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <a href="/" className="text-lg font-bold text-white hover:text-[var(--color-brand)] transition-colors">
          Lab Leads Pro
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">
          {isPro ? "Select Your States" : "Customize Your Plan"}
        </h1>
        <p className="text-gray-400 mb-10">{headingDescription}</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Add-ons — hidden for Pro entry */}
            {!isPro && (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h2 className="text-lg font-semibold mb-1">Optional Add-Ons</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Base plan: LabLeads Basic — ${PLANS.basic.pricePerState}/state/mo
                </p>
                <div className="space-y-3">

                  {/* Agencies add-on */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      addAgencies
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/8"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addAgencies}
                      onChange={(e) => handleToggleAgencies(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all duration-200 ${
                        addAgencies
                          ? "bg-[var(--color-brand)] border-[var(--color-brand)]"
                          : "border-white/30 bg-transparent"
                      }`}
                    >
                      {addAgencies && <CheckIcon />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">Add 7 More Federal Agencies</p>
                      <p className="text-xs text-gray-400 mt-0.5">NSF, DOD, DOE, NASA, VA, USDA, CDC</p>
                    </div>
                    <div className="text-sm font-medium whitespace-nowrap">
                      {addAgencies ? (
                        <span className="text-[var(--color-brand)]">Included</span>
                      ) : (
                        <span className="text-gray-300">+${ADD_ON_PRICES.agencies}/state/mo</span>
                      )}
                    </div>
                  </label>

                  {/* New Lab add-on */}
                  <div className="relative">
                    <label
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        addNewLab
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/8"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={addNewLab}
                        onChange={(e) => handleToggleNewLab(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all duration-200 ${
                          addNewLab
                            ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {addNewLab && <CheckIcon />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">Add New Lab Detection</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          New lab &amp; faculty hire alerts, first-time grant recipients, new lab signals
                        </p>
                      </div>
                      <div className="text-sm font-medium whitespace-nowrap">
                        {addNewLab ? (
                          <span className="text-[var(--color-accent)]">Included</span>
                        ) : (
                          <span className="text-gray-300">+${ADD_ON_PRICES.newLab}/state/mo</span>
                        )}
                      </div>
                    </label>

                    {showNewLabTooltip && (
                      <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-gray-800 border border-white/20 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none">
                        New Lab Detection includes all 8 federal agency grants
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Pro clean summary */}
            {isPro && (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold">LabLeads Pro</span>
                  <span className="text-sm bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-2 py-0.5 rounded-full font-medium">
                    Full Package
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">Everything included. No add-ons needed.</p>
                <ul className="space-y-2">
                  {PLANS.pro.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-[var(--color-accent)] mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* State selector */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Select States</h2>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    priceFlash ? "text-[var(--color-brand)]" : "text-[var(--color-brand)]"
                  }`}
                >
                  {stateCount} state{stateCount !== 1 ? "s" : ""} selected
                  {stateCount > 0 &&
                    ` — ${stateCount} × $${pricePerState}/mo = $${monthlyTotal.toLocaleString()}/mo`}
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
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 lg:sticky lg:top-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan</span>
                  <span className="font-medium text-right max-w-[60%]">{planName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price/state</span>
                  <span
                    className={`font-medium tabular-nums transition-colors duration-300 ${
                      priceFlash ? "text-[var(--color-brand)]" : "text-white"
                    }`}
                  >
                    ${pricePerState}/mo
                  </span>
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

                <div
                  className={`pt-3 border-t border-white/10 flex justify-between font-bold text-base tabular-nums transition-colors duration-300 ${
                    priceFlash ? "text-[var(--color-brand)]" : "text-white"
                  }`}
                >
                  <span>Monthly total</span>
                  <span>${monthlyTotal.toLocaleString()}/mo</span>
                </div>

                {/* Catch-up add-on */}
                <div className="pt-2 border-t border-white/10">
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      addCatchUp
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addCatchUp}
                      onChange={(e) => setAddCatchUp(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
                    />
                    <div>
                      <p className="font-medium text-xs">3-Month Catch-Up Report</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        +${CATCH_UP_PRICE}/state, one-time
                      </p>
                    </div>
                  </label>

                  {addCatchUp && stateCount > 0 && (
                    <div className="flex justify-between text-[var(--color-accent)] text-sm mt-2 font-medium">
                      <span>Catch-Up Report</span>
                      <span>+${catchUpTotal.toLocaleString()} one-time</span>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-dark)] flex items-center justify-center">
          <div className="text-white text-lg">Loading…</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
