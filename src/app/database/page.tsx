import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthActions from "./AuthActions";

export const metadata: Metadata = {
  title: "Federal Research Grants Database | Lab Leads Pro",
  description:
    "Explore 350,000+ actively funded federal research grants across 8 agencies. Guides, grant types, and search tools built for life-science equipment sales reps.",
  keywords:
    "federal grants database, NIH grants, NSF grants, DOD research grants, lab equipment sales, research funding database, grant search, life science sales",
  openGraph: {
    title: "Federal Research Grants Database | Lab Leads Pro",
    description:
      "350,000+ grants across 8 agencies. The research funding database built for equipment sales.",
    url: "https://lableadspro.com/database",
    siteName: "Lab Leads Pro",
    type: "website",
  },
};

/* ── shared SVG props ────────────────────────────────────── */

const svgProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── guide card data ─────────────────────────────────────── */

const guides = [
  {
    icon: (
      <svg {...svgProps}>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    title: "Grant Types Guide",
    description: "R01, R21, S10, SBIR and more. What each grant type means for equipment sales.",
    href: "/database/guides/grant-types",
  },
  {
    icon: (
      <svg {...svgProps}>
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-4h6v4" />
        <path d="M10 10h4" />
        <path d="M12 10v4" />
      </svg>
    ),
    title: "Federal Agencies Overview",
    description: "8 agencies that fund lab research. Budgets, priorities, and what reps need to know.",
    href: "/database/guides/agencies",
  },
  {
    icon: (
      <svg {...svgProps}>
        <path d="M6 18h8" />
        <path d="M3 22h18" />
        <path d="M14 22a7 7 0 0 0 3-6" />
        <path d="M9 14h2" />
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
        <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      </svg>
    ),
    title: "NIH Institutes Guide",
    description: "27 institutes and centers. Which ones buy equipment and where the money flows.",
    href: "/database/guides/nih-institutes",
  },
  {
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "NSF Grants Guide",
    description: "How NSF funds research differently from NIH and what it means for your pipeline.",
    href: "/database/guides/nsf-grants",
  },
  {
    icon: (
      <svg {...svgProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "DOD Research Guide",
    description: "Defense research labs, DARPA, and the military research funding landscape.",
    href: "/database/guides/dod-grants",
  },
  {
    icon: (
      <svg {...svgProps}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "DOE Research Guide",
    description: "National labs, energy research, and the DOE equipment procurement cycle.",
    href: "/database/guides/doe-grants",
  },
  {
    icon: (
      <svg {...svgProps}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    title: "NASA Research Guide",
    description: "Space science grants, planetary research, and NASA lab equipment needs.",
    href: "/database/guides/nasa-grants",
  },
  {
    icon: (
      <svg {...svgProps}>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
    ),
    title: "VA Research Guide",
    description: "Veterans health research. A smaller agency with consistent equipment budgets.",
    href: "/database/guides/va-grants",
  },
  {
    icon: (
      <svg {...svgProps}>
        <path d="M12 2a7 7 0 0 0-3 13.32V17h6v-1.68A7 7 0 0 0 12 2z" />
        <path d="M10 21h4" />
        <path d="M12 17v4" />
        <path d="M7 8H3" />
        <path d="M21 8h-4" />
        <path d="M5.64 4.64l2.12 2.12" />
        <path d="M16.24 6.76l2.12-2.12" />
      </svg>
    ),
    title: "USDA Grants Guide",
    description: "Agricultural research funding, NIFA grants, and opportunities in food science.",
    href: "/database/guides/usda-grants",
  },
  {
    icon: (
      <svg {...svgProps}>
        <path d="M10 2v7.31" />
        <path d="M14 9.3V2" />
        <path d="M8.5 2h7" />
        <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
        <path d="M5.52 16h12.96" />
      </svg>
    ),
    title: "CDC Research Guide",
    description: "Public health research grants and CDC lab equipment purchasing patterns.",
    href: "/database/guides/cdc-grants",
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
            350,000+ actively funded research grants across 8 federal agencies.
            Guides, insights, and tools built for life-science equipment sales reps.
          </p>
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
                <div className="w-11 h-11 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)] flex items-center justify-center mb-3">
                  {guide.icon}
                </div>
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
