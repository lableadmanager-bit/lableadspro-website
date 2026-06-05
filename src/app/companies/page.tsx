import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STATES, TOTAL_COMPANIES } from "@/lib/companies";

export const metadata: Metadata = {
  title: "US Biotech & Pharma Company Directory | Lab Leads Pro",
  description:
    "Browse every active US biotech, pharma, CRO, and diagnostics company by state. Company profiles built for life-science equipment sales reps.",
  openGraph: {
    title: "US Biotech & Pharma Company Directory | Lab Leads Pro",
    description:
      "Every active US life-science company, state by state. Built for equipment sales reps.",
    url: "https://lableadspro.com/companies",
    siteName: "Lab Leads Pro",
    type: "website",
  },
};

export default function CompaniesLandingPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-12 px-6 bg-gradient-to-b from-[#f0f7ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-gray-300)] text-sm text-[var(--color-gray-700)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            New: the company directory beta
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-dark)] mb-4 tracking-tight">
            Every Lab-Buying Company,
            <br />
            <span className="text-[var(--color-brand)]">State by State</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-gray-500)] max-w-2xl mx-auto">
            {TOTAL_COMPANIES.toLocaleString()} active biotech, pharma, CRO, and diagnostics companies across the US.
            Pick your territory and start working the private sector, not just funded faculty.
          </p>
        </div>
      </section>

      {/* State picker */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-gray-500)] mb-4">
            Browse by state
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {STATES.map((s) => (
              <Link
                key={s.code}
                href={`/companies/${s.code}`}
                className="group flex items-center justify-between rounded-xl border border-[var(--color-gray-100)] bg-white px-4 py-3 hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <span className="font-semibold text-[var(--color-dark)] group-hover:text-[var(--color-brand)] transition-colors">
                  {s.name}
                </span>
                <span className="text-sm text-[var(--color-gray-500)] tabular-nums">
                  {s.count.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
