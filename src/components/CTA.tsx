"use client";

import { useState, useRef } from "react";
import { PartyPopper } from "lucide-react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbybP6SsgfZ7L2nIuPTNPzoT9VY4D9UZqZ4HL2BmECStfsHq2fz7ECPbsaCuLcs-ICaTjQ/exec";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Create a real form and submit it into a hidden iframe
    // This bypasses all CORS issues completely
    const form = document.createElement("form");
    form.method = "POST";
    form.action = SCRIPT_URL;
    form.target = "hidden-iframe";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "email";
    input.value = email;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Show success after a short delay (form submitted into iframe)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 2000);
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
            <div className="flex justify-center mb-3"><PartyPopper className="w-10 h-10 text-[var(--color-accent)]" /></div>
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
        )}

        <p className="mt-6 text-sm text-gray-500">
          No spam. No nonsense. Just early access to better leads.
        </p>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-400 mb-3">Prefer a live walkthrough?</p>
          <a
            href="https://calendar.app.google/xKb3rVrYvAfdt1Zt6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Request a Demo
          </a>
        </div>
        <iframe
          ref={iframeRef}
          name="hidden-iframe"
          style={{ display: "none" }}
          title="form-target"
        />
      </div>
    </section>
  );
}
