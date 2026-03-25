"use client";

import { useState, useEffect, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLANS, AUTO_UPGRADE_THRESHOLD, getEffectivePlan } from "@/lib/plans";
import type { PlanTier } from "@/lib/plans";
import { ArrowLeft, ExternalLink, Mail, Plus, ArrowUpRight } from "lucide-react";

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

interface SubscriptionData {
  planTier: PlanTier;
  subscribedStates: string[];
  status: string;
  stripeSubscriptionId: string;
  currentPeriodEnd: string | null;
  monthlyTotal: number | null;
}

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState<SubscriptionData | null>(null);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Add states
  const [selectedNewStates, setSelectedNewStates] = useState<string[]>([]);
  const [stateSearch, setStateSearch] = useState("");
  const [addingStates, setAddingStates] = useState(false);
  const [addSuccess, setAddSuccess] = useState("");

  // Upgrade
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState("");

  // Billing portal
  const [portalLoading, setPortalLoading] = useState(false);

  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/database/login";
        return;
      }
      setUserEmail(user.email ?? null);

      try {
        const res = await fetch("/api/subscription");
        if (res.status === 401) {
          window.location.href = "/database/login";
          return;
        }
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Failed to load subscription");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setSub(data);
      } catch {
        setError("Failed to load subscription");
      }
      setLoading(false);
    }
    load();
  }, []);

  const currentStates = sub?.subscribedStates ?? [];
  const currentTier = sub?.planTier ?? "standard";

  // States available to add (not already subscribed)
  const availableStates = US_STATES.filter(
    (s) => !currentStates.includes(s.code)
  );
  const filteredAvailable = availableStates.filter(
    (s) =>
      s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.code.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Price preview for adding states
  const mergedCount = currentStates.length + selectedNewStates.length;
  const currentEffective = getEffectivePlan(currentTier, currentStates.length);
  const newEffective = getEffectivePlan(currentTier, mergedCount);
  const priceDiff = newEffective.monthlyTotal - currentEffective.monthlyTotal;

  // Upgrade preview
  const upgradeEffective = getEffectivePlan("pro", currentStates.length);

  function toggleNewState(code: string) {
    setSelectedNewStates((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
    setAddSuccess("");
  }

  function showSuccess(setter: (v: string) => void, msg: string) {
    setter(msg);
    if (successTimer.current) clearTimeout(successTimer.current);
    successTimer.current = setTimeout(() => setter(""), 5000);
  }

  async function handleAddStates() {
    if (selectedNewStates.length === 0) return;
    setAddingStates(true);
    setError("");
    setAddSuccess("");
    try {
      const res = await fetch("/api/subscription", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_states", newStates: selectedNewStates }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add states");
      setSub((prev) =>
        prev
          ? { ...prev, subscribedStates: data.subscribedStates, planTier: data.planTier, monthlyTotal: data.monthlyTotal }
          : prev
      );
      setSelectedNewStates([]);
      showSuccess(setAddSuccess, `Added ${selectedNewStates.join(", ")} to your plan!`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
    setAddingStates(false);
  }

  async function handleUpgrade() {
    setUpgrading(true);
    setError("");
    setUpgradeSuccess("");
    try {
      const res = await fetch("/api/subscription", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upgrade_tier", newTier: "pro" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upgrade");
      setSub((prev) =>
        prev
          ? { ...prev, planTier: data.planTier, monthlyTotal: data.monthlyTotal }
          : prev
      );
      showSuccess(setUpgradeSuccess, "Upgraded to Pro!");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
    setUpgrading(false);
  }

  async function handleBillingPortal() {
    setPortalLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/database/login";
        return;
      }
      const res = await fetch("/api/billing-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to open billing portal");
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setPortalLoading(false);
    }
  }

  // Determine if user is on auto-upgraded plan (Standard selection, but 3+ states = Pro features)
  const isAutoUpgraded = currentEffective.autoUpgraded;
  const displayTierName = isAutoUpgraded
    ? "Lab Leads Pro (Auto-Upgraded)"
    : PLANS[currentEffective.tier].name;

  // Show upgrade section only for Standard users who aren't auto-upgraded
  const showUpgradeSection = currentTier === "standard" && !isAutoUpgraded;

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-gray-50)] text-[var(--color-dark)]">
        <Header />
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-10 text-center">
          <div className="animate-pulse text-[var(--color-gray-500)]">Loading account...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!sub) {
    return (
      <div className="min-h-screen bg-[var(--color-gray-50)] text-[var(--color-dark)]">
        <Header />
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-10">
          <div className="bg-white rounded-2xl p-8 border border-[var(--color-gray-200)] text-center">
            <h1 className="text-2xl font-bold mb-3">No Active Subscription</h1>
            <p className="text-[var(--color-gray-500)] mb-6">
              {error || "You don't have an active subscription."}
            </p>
            <a
              href="/checkout"
              className="inline-flex items-center gap-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)] text-[var(--color-dark)]">
      <Header />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-10">
        {/* Back to search */}
        <a
          href="/database/search"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Search
        </a>

        <h1 className="text-3xl font-bold mb-2">Account</h1>
        {userEmail && (
          <p className="text-[var(--color-gray-500)] mb-8">{userEmail}</p>
        )}

        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3 border border-red-200">
            {error}
          </div>
        )}

        {/* Current Plan Card */}
        <div className="bg-white rounded-2xl p-6 border border-[var(--color-gray-200)] mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Plan</h2>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full capitalize">
              {sub.status}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-gray-500)]">Plan</span>
              <span className="font-medium flex items-center gap-2">
                {displayTierName}
                {isAutoUpgraded && (
                  <span className="text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-2 py-0.5 rounded-full font-medium">
                    Auto-Upgraded
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-gray-500)]">States</span>
              <span className="font-medium">
                {currentStates.join(", ")} ({currentStates.length} state{currentStates.length !== 1 ? "s" : ""})
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-gray-500)]">Monthly total</span>
              <span className="font-bold text-base">${(sub.monthlyTotal ?? currentEffective.monthlyTotal).toLocaleString()}/mo</span>
            </div>
            {sub.currentPeriodEnd && (
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-gray-500)]">Next billing</span>
                <span className="font-medium">
                  {new Date(sub.currentPeriodEnd).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            {/* Pricing detail badges */}
            {currentEffective.proBundle && (
              <p className="text-xs text-[var(--color-brand)] font-medium bg-[var(--color-brand)]/10 px-3 py-1.5 rounded-lg">
                2-state Pro bundle — $50 off!
              </p>
            )}
            {currentEffective.proFreeState && (
              <p className="text-xs text-[var(--color-brand)] font-medium bg-[var(--color-brand)]/10 px-3 py-1.5 rounded-lg">
                {currentEffective.freeStates} free state{(currentEffective.freeStates ?? 0) > 1 ? "s" : ""} — paying for {currentEffective.billedStates} of {currentStates.length}
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-5 pt-5 border-t border-[var(--color-gray-100)]">
            <button
              onClick={handleBillingPortal}
              disabled={portalLoading}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--color-gray-300)] hover:border-[var(--color-gray-500)] disabled:opacity-50"
            >
              <ExternalLink size={14} />
              {portalLoading ? "Opening..." : "Update Payment Method"}
            </button>
            <button
              onClick={handleBillingPortal}
              disabled={portalLoading}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--color-gray-300)] hover:border-[var(--color-gray-500)] disabled:opacity-50"
            >
              <ExternalLink size={14} />
              {portalLoading ? "Opening..." : "Cancel Plan"}
            </button>
          </div>
        </div>

        {/* Add States Section */}
        <div className="bg-white rounded-2xl p-6 border border-[var(--color-gray-200)] mb-6">
          <h2 className="text-lg font-semibold mb-1">Add States to Your Plan</h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-4">
            Current: {currentStates.join(", ")} ({currentStates.length} state{currentStates.length !== 1 ? "s" : ""})
          </p>

          {availableStates.length === 0 ? (
            <p className="text-sm text-[var(--color-gray-500)]">
              You&apos;re subscribed to all available states.
            </p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Search states..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full bg-[var(--color-gray-50)] border border-[var(--color-gray-200)] rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-[var(--color-brand)] placeholder-[var(--color-gray-400)] text-[var(--color-dark)]"
              />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-52 overflow-y-auto pr-1 mb-4">
                {filteredAvailable.map((s) => {
                  const selected = selectedNewStates.includes(s.code);
                  return (
                    <button
                      key={s.code}
                      onClick={() => toggleNewState(s.code)}
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

              {/* Price preview */}
              {selectedNewStates.length > 0 && (
                <div className="bg-[var(--color-gray-50)] rounded-xl p-4 mb-4 border border-[var(--color-gray-200)]">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-gray-500)]">Adding</span>
                      <span className="font-medium">
                        {selectedNewStates.length} state{selectedNewStates.length !== 1 ? "s" : ""}: {selectedNewStates.join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-gray-500)]">Price change</span>
                      <span className="font-medium text-[var(--color-brand)]">+${priceDiff.toLocaleString()}/mo</span>
                    </div>
                    {/* Show savings vs regular pricing when bundle kicks in */}
                    {newEffective.proBundle && !currentEffective.proBundle && (
                      <div className="flex justify-between">
                        <span className="text-[var(--color-gray-500)]">Regular price</span>
                        <span className="text-[var(--color-gray-400)] line-through text-xs">${(PLANS.pro.pricePerState * mergedCount).toLocaleString()}/mo</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-1.5 border-t border-[var(--color-gray-200)]">
                      <span>New monthly total</span>
                      <span>${newEffective.monthlyTotal.toLocaleString()}/mo</span>
                    </div>
                    {/* Pro 2-state bundle notice */}
                    {newEffective.proBundle && !currentEffective.proBundle && (
                      <p className="text-xs text-[var(--color-brand)] font-medium mt-1">
                        🎉 2-state Pro bundle — you&apos;re saving $50/mo vs individual pricing!
                      </p>
                    )}
                    {/* Auto-upgrade notice */}
                    {newEffective.autoUpgraded && !currentEffective.autoUpgraded && (
                      <p className="text-xs text-[var(--color-accent)] font-medium mt-1">
                        With {mergedCount} states you&apos;ll be auto-upgraded to Pro at Standard pricing!
                      </p>
                    )}
                    {/* Free states notice */}
                    {newEffective.proFreeState && (newEffective.freeStates ?? 0) > (currentEffective.freeStates ?? 0) && (
                      <p className="text-xs text-[var(--color-brand)] font-medium mt-1">
                        {newEffective.freeStates} free state{(newEffective.freeStates ?? 0) > 1 ? "s" : ""} — paying for {newEffective.billedStates} of {mergedCount}!
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-gray-500)] mt-3">
                    Change takes effect immediately. You&apos;ll be charged a prorated amount for the remainder of this cycle.
                  </p>
                </div>
              )}

              {addSuccess && (
                <div className="mb-4 text-sm text-green-700 bg-green-50 rounded-lg px-4 py-3 border border-green-200">
                  {addSuccess}
                </div>
              )}

              <button
                onClick={handleAddStates}
                disabled={addingStates || selectedNewStates.length === 0}
                className="inline-flex items-center gap-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm"
              >
                {addingStates ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add States & Pay
                  </>
                )}
              </button>
            </>
          )}

          <p className="text-xs text-[var(--color-gray-500)] mt-4">
            Need to remove or swap a state? Email{" "}
            <a href="mailto:support@lableadspro.com" className="text-[var(--color-brand)] hover:underline">
              support@lableadspro.com
            </a>{" "}
            and we&apos;ll take care of it within 24 hours.
          </p>
        </div>

        {/* Upgrade Tier Section — only for Standard users */}
        {showUpgradeSection && (
          <div className="bg-white rounded-2xl p-6 border border-[var(--color-gray-200)] mb-6">
            <h2 className="text-lg font-semibold mb-1">Upgrade to Pro</h2>
            <p className="text-sm text-[var(--color-gray-500)] mb-4">
              Get 8 agencies + new lab detection — ${PLANS.pro.pricePerState}/state/mo (vs ${PLANS.standard.pricePerState} Standard)
            </p>

            <ul className="space-y-1.5 mb-4">
              {PLANS.pro.features.filter((f) => f !== "Everything in Standard").map((f) => (
                <li key={f} className="flex gap-2 text-sm text-[var(--color-gray-600)]">
                  <span className="text-[var(--color-accent)] mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>

            <div className="bg-[var(--color-gray-50)] rounded-xl p-4 mb-4 border border-[var(--color-gray-200)]">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-gray-500)]">Current monthly</span>
                <span className="font-medium">${currentEffective.monthlyTotal.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-[var(--color-gray-500)]">Pro monthly</span>
                <span className="font-bold">${upgradeEffective.monthlyTotal.toLocaleString()}/mo</span>
              </div>
              {upgradeEffective.proBundle && (
                <p className="text-xs text-[var(--color-brand)] font-medium mt-2">
                  2-state Pro bundle — $50 off!
                </p>
              )}
              <p className="text-xs text-[var(--color-gray-500)] mt-2">
                Change takes effect immediately with prorated billing.
              </p>
            </div>

            {upgradeSuccess && (
              <div className="mb-4 text-sm text-green-700 bg-green-50 rounded-lg px-4 py-3 border border-green-200">
                {upgradeSuccess}
              </div>
            )}

            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="inline-flex items-center gap-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm"
            >
              {upgrading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Upgrading...
                </>
              ) : (
                <>
                  <ArrowUpRight size={16} />
                  Upgrade to Pro
                </>
              )}
            </button>

            {currentStates.length < AUTO_UPGRADE_THRESHOLD && (
              <p className="text-xs text-[var(--color-gray-500)] mt-4">
                Tip: With {AUTO_UPGRADE_THRESHOLD}+ states on Standard, you automatically get Pro features at Standard price.
              </p>
            )}

            <p className="text-xs text-[var(--color-gray-500)] mt-2">
              Need to downgrade? Email{" "}
              <a href="mailto:support@lableadspro.com" className="text-[var(--color-brand)] hover:underline">
                support@lableadspro.com
              </a>.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
