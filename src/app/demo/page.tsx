"use client";

import { useEffect } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DemoPage() {
  // Calendly's inline embed renders in an iframe, so its built-in redirect
  // navigates the iframe instead of the parent page. We listen for the
  // calendly.event_scheduled postMessage and navigate the parent ourselves.
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: string } | undefined;
      if (data?.event === "calendly.event_scheduled") {
        window.location.href = "/demo/thank-you";
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900">
        <section className="pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                See Lab Leads Pro in Action
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Pick a time and we&apos;ll walk you through the grant database,
                weekly reports, and how it works for your territory.
                15 minutes, no pressure.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="font-semibold mb-2 text-gray-900">Live Database Tour</h3>
                <p className="text-gray-500 text-sm">
                  Search 525,000+ grants by equipment type, PI name, state, or keyword. We&apos;ll show you your territory live.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold mb-2 text-gray-900">Weekly Report Walkthrough</h3>
                <p className="text-gray-500 text-sm">
                  See exactly what lands in your inbox every Monday: new grants, PI contact info, and equipment tags.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold mb-2 text-gray-900">Your Questions Answered</h3>
                <p className="text-gray-500 text-sm">
                  Coverage, pricing, how it fits your workflow. Ask anything. We built this for reps like you.
                </p>
              </div>
            </div>

            {/* Calendly inline embed */}
            <div
              className="calendly-inline-widget mb-10"
              data-url="https://calendly.com/george-lableadspro/30min"
              style={{ minWidth: 320, height: 700 }}
            />

            {/* Sample-report fallback */}
            <p className="text-gray-500 text-sm text-center mb-6">
              Not ready to book?{" "}
              <a
                href="/sample"
                className="text-[var(--color-brand)] hover:underline font-medium"
              >
                Grab a free sample report
              </a>{" "}
              first.
            </p>

            {/* Phone call note */}
            <div className="text-center">
              <p className="text-gray-500">
                Prefer a phone call? No problem. Select a time and mention it in the notes
                and we&apos;ll call you directly instead of using Google Meet.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
