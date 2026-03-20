import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthActions from "./AuthActions";

export const metadata: Metadata = {
  title: "Federal Research Grants Database | Lab Leads Pro",
  description:
    "Explore 450,527 actively funded federal research grants across 8 agencies. Guides, grant types, and search tools built for life-science equipment sales reps.",
  keywords:
    "federal grants database, NIH grants, NSF grants, DOD research grants, lab equipment sales, research funding database, grant search, life science sales",
  openGraph: {
    title: "Federal Research Grants Database | Lab Leads Pro",
    description:
      "450,527 grants across 8 agencies. The research funding database built for equipment sales.",
    url: "https://lableadspro.com/database",
    siteName: "Lab Leads Pro",
    type: "website",
  },
};

/* ── guide card data ─────────────────────────────────────── */

const guides = [
  {
    emoji: "📋",
    title: "NIH Grant Types Guide",
    description: "R01, R21, S10, SBIR and more. What each grant type means for equipment sales.",
    href: "/nih-grant-types-guide",
  },
  {
    emoji: "🏛️",
    title: "Federal Agencies Overview",
    description: "8 agencies that fund lab research. Budgets, priorities, and what reps need to know.",
    href: "/funding-agencies-guide",
  },
  {
    emoji: "🔬",
    title: "NIH Institutes Guide",
    description: "27 institutes and centers. Which ones buy equipment and where the money flows.",
    href: "/nih-institutes-guide",
  },
  {
    emoji: "🧬",
    title: "NSF Grants Guide",
    description: "How NSF funds research differently from NIH and what it means for your pipeline.",
    href: "/nsf-grants-guide",
  },
  {
    emoji: "🎖️",
    title: "DOD Research Guide",
    description: "Defense research labs, DARPA, and the military research funding landscape.",
    href: "/dod-grants-guide",
  },
  {
    emoji: "⚡",
    title: "DOE Research Guide",
    description: "National labs, energy research, and the DOE equipment procurement cycle.",
    href: "/doe-grants-guide",
  },
  {
    emoji: "🚀",
    title: "NASA Research Guide",
    description: "Space science grants, planetary research, and NASA lab equipment needs.",
    href: "/nasa-grants-guide",
  },
  {
    emoji: "🏥",
    title: "VA Research Guide",
    description: "Veterans health research. A smaller agency with consistent equipment budgets.",
    href: "/va-grants-guide",
  },
  {
    emoji: "🌾",
    title: "USDA Grants Guide",
    description: "Agricultural research funding, NIFA grants, and opportunities in food science.",
    href: "/usda-grants-guide",
  },
  {
    emoji: "🦠",
    title: "CDC Research Guide",
    description: "Public health research grants and CDC lab equipment purchasing patterns.",
    href: "/cdc-grants-guide",
  },
];

/* ── molecular background ────────────────────────────────── */

function MolecularBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] to-white">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="mol-grid-hub"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="60" cy="60" r="3" fill="#0066FF" />
            <circle cx="0" cy="0" r="2" fill="#0066FF" />
            <circle cx="120" cy="0" r="2" fill="#0066FF" />
            <circle cx="0" cy="120" r="2" fill="#0066FF" />
            <circle cx="120" cy="120" r="2" fill="#0066FF" />
            <line x1="60" y1="60" x2="0" y2="0" stroke="#0066FF" strokeWidth="0.8" />
            <line x1="60" y1="60" x2="120" y2="0" stroke="#0066FF" strokeWidth="0.8" />
            <line x1="60" y1="60" x2="120" y2="120" stroke="#0066FF" strokeWidth="0.8" />
            <line x1="60" y1="60" x2="0" y2="120" stroke="#0066FF" strokeWidth="0.8" />
            <circle cx="30" cy="90" r="1.5" fill="#00C48C" />
            <circle cx="90" cy="30" r="1.5" fill="#00C48C" />
            <line x1="0" y1="120" x2="30" y2="90" stroke="#00C48C" strokeWidth="0.5" />
            <line x1="120" y1="0" x2="90" y2="30" stroke="#00C48C" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mol-grid-hub)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────── */

export default function DatabaseHubPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <MolecularBg />
        <div className="relative max-w-4xl mx-auto text-center">
          <AuthActions />
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4 tracking-tight">
            Explore the Lab Leads Pro Database
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-gray-600)] max-w-2xl mx-auto">
            450,527 actively funded research grants across 8 federal agencies.
            Guides, insights, and tools built for life-science equipment sales reps.
          </p>
        </div>
      </section>

      {/* How to Use - Featured */}
      <section className="px-8 -mt-4 mb-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/database/guides/how-to-use"
            className="group flex items-center gap-4 rounded-xl border border-[var(--color-brand)] bg-white px-6 py-5 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
          >
            <span className="text-3xl shrink-0">💻</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--color-gray-900)] group-hover:text-[var(--color-brand)] transition-colors">
                How to Use the Database
              </h3>
              <p className="text-sm text-[var(--color-gray-500)]">
                A visual walkthrough of every feature, filter, and search tool at your fingertips.
              </p>
            </div>
            <svg
              className="w-5 h-5 text-[var(--color-brand)] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Guide Cards Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Research Guides
          </h2>
          <p className="text-[var(--color-gray-500)] mb-10">
            Deep dives into every agency, grant type, and funding program in the database.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-xl border border-[var(--color-gray-100)] bg-white p-6 hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <span className="text-2xl mb-3 block">{guide.emoji}</span>
                <h3 className="text-lg font-bold text-[var(--color-gray-900)] mb-1 group-hover:text-[var(--color-brand)] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-[var(--color-gray-500)] mb-4">
                  {guide.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-[var(--color-brand)] group-hover:gap-2 gap-1 transition-all">
                  Read guide
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#f0f7ff]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[var(--color-gray-900)] mb-4">
            Ready to find leads in your territory?
          </h2>
          <p className="text-[var(--color-gray-500)] mb-8">
            Search by state, agency, grant type, and keywords. Built for reps who sell into funded labs.
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
          >
            Get Started
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
