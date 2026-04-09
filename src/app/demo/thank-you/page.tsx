"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackEvent } from "@/lib/analytics";

export default function DemoThankYouPage() {
  useEffect(() => {
    trackEvent("demo_booked", {});
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-dark)] text-white">
        <section className="pt-28 pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">You&apos;re All Set!</h1>
            <p className="text-xl text-gray-300 mb-6">
              Your demo is booked. Check your email for a calendar invite with the meeting details.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left">
              <p className="text-white font-semibold mb-3">What to expect:</p>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] mt-1">✓</span>
                  <span>A live walkthrough of the grant database for your territory</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] mt-1">✓</span>
                  <span>A look at the weekly reports that land in your inbox every Monday</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] mt-1">✓</span>
                  <span>Answers to any questions about coverage, pricing, or how it fits your workflow</span>
                </li>
              </ul>
            </div>
            <p className="text-gray-400 mb-10">
              If you requested a phone call instead of Google Meet, we&apos;ll call you directly at your scheduled time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sample"
                className="inline-block bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold py-3 px-8 rounded-xl transition-colors"
              >
                Get a Free Sample Report
              </a>
              <a
                href="/"
                className="inline-block border border-gray-600 hover:border-gray-400 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
