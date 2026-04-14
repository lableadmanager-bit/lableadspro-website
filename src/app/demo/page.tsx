import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Book a Demo | Lab Leads Pro",
  description: "Schedule a walkthrough of the Lab Leads Pro grant database and weekly reports. See how it works for your territory.",
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-dark)] text-white">
        <section className="pt-28 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                See Lab Leads Pro in Action
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Pick a time and we&apos;ll walk you through the grant database, weekly reports,
                and how it works for your territory. 15 minutes, no pressure.
              </p>
            </div>

            {/* What we cover */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10">
              <h2 className="text-lg font-semibold mb-4">What we&apos;ll cover:</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] mt-0.5">✓</span>
                  <span>A live search of the grant database for your territory</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] mt-0.5">✓</span>
                  <span>A walkthrough of the weekly reports that land in your inbox every Monday</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] mt-0.5">✓</span>
                  <span>Answers to any questions about coverage, pricing, or how it fits your workflow</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="text-center mb-10">
              <a
                href="https://calendar.app.google/xKb3rVrYvAfdt1Zt6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold text-lg py-4 px-10 rounded-xl transition-colors"
              >
                Pick a Time
              </a>
              <p className="text-gray-500 text-sm mt-3">
                Opens Google Calendar. Choose any available slot.
              </p>
            </div>

            {/* Prefer a call */}
            <div className="text-center">
              <p className="text-gray-400">
                Prefer a phone call? No problem. Select a time and mention it in the notes,
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
