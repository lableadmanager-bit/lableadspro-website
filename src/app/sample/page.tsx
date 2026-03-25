"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackConversion, trackEvent } from "@/lib/analytics";

const STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }, { code: "DC", name: "District of Columbia" },
];

export default function SampleReport() {
  const [email, setEmail] = useState("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleState = (code: string) => {
    setSelectedStates((prev) =>
      prev.includes(code)
        ? prev.filter((s) => s !== code)
        : prev.length < 5
        ? [...prev, code]
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || selectedStates.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/send-sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, states: selectedStates }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send sample report");
      }
      setSubmitted(true);
      // Track conversion — sample report downloaded
      trackConversion('SAMPLE_DOWNLOAD', { 
        state: selectedStates.join(','),
      });
      trackEvent('sample_report_submitted', {
        states: selectedStates.join(','),
        state_count: selectedStates.length,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-[var(--color-dark)] mb-4">
                Check your inbox!
              </h1>
              <p className="text-[var(--color-gray-500)] text-lg mb-2">
                We just sent {selectedStates.length === 1 ? "a sample report" : `${selectedStates.length} sample reports`} to <strong className="text-[var(--color-dark)]">{email}</strong>
              </p>
              <p className="text-[var(--color-gray-500)]">
                This is real NIH grant data from September 2025. Imagine getting this for your territory every Monday - with fresh data.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/#pricing"
                  className="inline-block px-8 py-3 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold rounded-xl transition-colors"
                >
                  See Pricing
                </a>
                <a
                  href="/"
                  className="inline-block px-8 py-3 bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-300)] text-[var(--color-dark)] font-semibold rounded-xl transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
                  See What You&apos;re Missing
                </h1>
                <p className="text-lg text-[var(--color-gray-500)] max-w-xl mx-auto">
                  Get a free sample report with real NIH grant data for your territory. See exactly what our subscribers receive every Monday.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-dark)] mb-2">
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-gray-300)] text-[var(--color-dark)] placeholder-[var(--color-gray-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                  />
                </div>

                {/* State Selection */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-dark)] mb-2">
                    Select Your States <span className="font-normal text-[var(--color-gray-500)]">(up to 5)</span>
                  </label>
                  <p className="text-sm text-[var(--color-gray-500)] mb-4">
                    Pick the states in your territory. We&apos;ll send you a sample report for each one.
                  </p>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {STATES.map((state) => {
                      const selected = selectedStates.includes(state.code);
                      const disabled = !selected && selectedStates.length >= 5;
                      return (
                        <button
                          key={state.code}
                          type="button"
                          onClick={() => toggleState(state.code)}
                          disabled={disabled}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                            selected
                              ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)] shadow-sm"
                              : disabled
                              ? "bg-[var(--color-gray-50)] text-[var(--color-gray-300)] border-[var(--color-gray-100)] cursor-not-allowed"
                              : "bg-white text-[var(--color-gray-700)] border-[var(--color-gray-300)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                          }`}
                        >
                          {state.code}
                        </button>
                      );
                    })}
                  </div>

                  {selectedStates.length > 0 && (
                    <p className="mt-3 text-sm text-[var(--color-brand)] font-medium">
                      Selected: {selectedStates.join(", ")} ({selectedStates.length}/5)
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !email || selectedStates.length === 0}
                  className="w-full py-4 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? "Sending..." : "Send Me the Sample Report"}
                </button>

                <p className="text-center text-sm text-[var(--color-gray-500)]">
                  No spam. No credit card. Just real grant data for your territory.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
