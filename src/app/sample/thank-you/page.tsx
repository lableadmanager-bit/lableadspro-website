import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sample Report Sent | Lab Leads Pro",
  description: "Your free sample report is on its way.",
};

export default function SampleThankYouPage() {
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
            <h1 className="text-3xl font-bold mb-4">Check Your Inbox!</h1>
            <p className="text-xl text-gray-300 mb-6">
              Your free sample report is on its way. You should receive it within the next few minutes.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left">
              <p className="text-white font-semibold mb-3">📬 Look for an email from:</p>
              <p className="text-[var(--color-accent)] font-mono text-lg mb-4">reports@lableadspro.com</p>
              <p className="text-gray-400 text-sm mb-2">
                <strong className="text-gray-300">Using a work email?</strong> Your company&apos;s email filters may delay or block messages with spreadsheet attachments. If you don&apos;t see it within 5 minutes:
              </p>
              <ul className="text-gray-400 text-sm space-y-1 ml-4 list-disc">
                <li>Check your <strong className="text-gray-300">spam or junk folder</strong></li>
                <li>Check your <strong className="text-gray-300">quarantine or filtered messages</strong></li>
                <li>Add <strong className="text-gray-300">reports@lableadspro.com</strong> to your safe senders list</li>
              </ul>
            </div>
            <p className="text-gray-400 mb-10">
              Want to see more? Explore the full grant database — search 525,000+ grants by keyword, equipment type, state, or PI name.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/database"
                className="inline-block bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold py-3 px-8 rounded-xl transition-colors"
              >
                Explore the Database
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
