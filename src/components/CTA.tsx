"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbybP6SsgfZ7L2nIuPTNPzoT9VY4D9UZqZ4HL2BmECStfsHq2fz7ECPbsaCuLcs-ICaTjQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="py-20 px-6 bg-gradient-to-b from-[var(--color-dark)] to-[#0D1F3C]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stop Letting Leads Slip Through the Cracks
        </h2>
        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
          Join the early access list and be the first to get AI-powered lead
          intelligence for your territory. We&apos;re launching soon.
        </p>

        {submitted ? (
          <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-2xl p-8">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-gray-400">
              We&apos;ll reach out soon with early access details. Keep an eye on your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20 whitespace-nowrap disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Get Early Access"}
            </button>
          </form>
          {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
        )}

        <p className="mt-6 text-sm text-gray-500">
          No spam. No nonsense. Just early access to better leads.
        </p>
      </div>
    </section>
  );
}
