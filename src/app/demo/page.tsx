"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function DemoPage() {
  const [iframeError, setIframeError] = useState(false);
  const BOOKING_URL = "https://calendar.app.google/xKb3rVrYvAfdt1Zt6";

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

            {/* Booking - iframe with fallback button */}
            {!iframeError ? (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-2 md:p-4 mb-8">
                <iframe
                  src={BOOKING_URL}
                  style={{ border: 0 }}
                  width="100%"
                  height="800"
                  frameBorder="0"
                  title="Book a Demo with Lab Leads Pro"
                  className="rounded-xl"
                  onError={() => setIframeError(true)}
                />
              </div>
            ) : (
              <div className="text-center mb-8">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold text-lg py-4 px-10 rounded-xl transition-colors"
                >
                  Pick a Time
                </a>
                <p className="text-gray-400 text-sm mt-3">
                  Opens Google Calendar. Choose any available slot.
                </p>
              </div>
            )}

            {/* Also show the button always so people have both options */}
            {!iframeError && (
              <div className="text-center mb-8">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                >
                  Open Booking Page
                </a>
              </div>
            )}

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
    </>
  );
}
