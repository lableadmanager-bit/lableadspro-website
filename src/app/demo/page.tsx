import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Book a Demo | Lab Leads Pro",
  description: "Schedule a walkthrough of the Lab Leads Pro grant database and weekly reports. See exactly how it works for your territory.",
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-dark)] text-white">
        <section className="pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                See Lab Leads Pro in Action
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Pick a time and we&apos;ll walk you through the grant database, 
                weekly reports, and how it all works for your territory. 
                15 minutes — no pressure, no pitch.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="font-semibold mb-2">Live Database Tour</h3>
                <p className="text-gray-400 text-sm">
                  Search 525,000+ grants by equipment type, PI name, state, or keyword — we&apos;ll show you your territory live.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">Weekly Report Walkthrough</h3>
                <p className="text-gray-400 text-sm">
                  See exactly what lands in your inbox every Monday — new grants, PI contact info, equipment tags, and more.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold mb-2">Your Questions Answered</h3>
                <p className="text-gray-400 text-sm">
                  Coverage, pricing, how it fits your workflow — ask anything. We built this for reps like you.
                </p>
              </div>
            </div>

            {/* Booking Embed */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2 md:p-4">
              <iframe
                src="https://calendar.app.google/xKb3rVrYvAfdt1Zt6"
                style={{ border: 0 }}
                width="100%"
                height="800"
                frameBorder="0"
                title="Book a Demo with Lab Leads Pro"
                className="rounded-xl"
              />
            </div>

            {/* Prefer a call? */}
            <div className="text-center mt-10">
              <p className="text-gray-400">
                Prefer a quick phone call instead? No problem — select a time above and mention it in the notes, 
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
