import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Research Grants Guides | Lab Leads Pro",
  description:
    "Free guides to federal research grants for life-science equipment sales reps. Understand NIH, NSF, DOD, DOE, NASA, USDA, CDC, and VA funding programs.",
  keywords:
    "NIH grants guide, NSF grants guide, DOD grants guide, federal research funding, lab equipment sales, research grants for sales reps, grant types explained",
  openGraph: {
    title: "Research Grants Guides | Lab Leads Pro",
    description:
      "Free guides to federal research grants. Built for life-science equipment sales reps.",
    url: "https://lableadspro.com/guides",
    siteName: "Lab Leads Pro",
    type: "website",
  },
};

const agencyGuides = [
  {
    emoji: "🔬",
    title: "NIH Institutes Guide",
    description:
      "27 institutes and centers. Which ones buy equipment, where the money flows, and how to identify your best targets.",
    href: "/nih-institutes-guide",
    tag: "Largest funder",
  },
  {
    emoji: "🧬",
    title: "NSF Grants Guide",
    description:
      "How NSF funds research differently from NIH. MRI grants, CAREER awards, and what they mean for your pipeline.",
    href: "/nsf-grants-guide",
    tag: null,
  },
  {
    emoji: "🎖️",
    title: "DOD Research Guide",
    description:
      "Defense research labs, DARPA funding, and the military research landscape. A growing opportunity for equipment sales.",
    href: "/dod-grants-guide",
    tag: null,
  },
  {
    emoji: "⚡",
    title: "DOE Research Guide",
    description:
      "National labs, energy research, and the DOE equipment procurement cycle. 17 national laboratories with massive budgets.",
    href: "/doe-grants-guide",
    tag: null,
  },
  {
    emoji: "🚀",
    title: "NASA Research Guide",
    description:
      "Space science grants, planetary research, and NASA lab equipment needs across research centers nationwide.",
    href: "/nasa-grants-guide",
    tag: null,
  },
  {
    emoji: "🏥",
    title: "VA Research Guide",
    description:
      "Veterans health research. A smaller agency with consistent equipment budgets and less competition for reps.",
    href: "/va-grants-guide",
    tag: "Hidden gem",
  },
  {
    emoji: "🌾",
    title: "USDA Grants Guide",
    description:
      "Agricultural research funding, NIFA grants, and equipment opportunities in food science and crop research.",
    href: "/usda-grants-guide",
    tag: null,
  },
  {
    emoji: "🦠",
    title: "CDC Research Guide",
    description:
      "Public health research grants and CDC lab equipment purchasing patterns across state and federal programs.",
    href: "/cdc-grants-guide",
    tag: null,
  },
];

const topicGuides = [
  {
    emoji: "📋",
    title: "NIH Grant Types Guide",
    description:
      "R01, R21, S10, SBIR, and more. What each NIH activity code means for equipment sales and which ones signal active purchasing.",
    href: "/nih-grant-types-guide",
  },
  {
    emoji: "🏛️",
    title: "Federal Agencies Overview",
    description:
      "All 8 agencies side by side. Budgets, priorities, and a quick comparison of where the equipment money flows.",
    href: "/funding-agencies-guide",
  },
  {
    emoji: "🖥️",
    title: "How to Use NIH Reporter",
    description:
      "Free step-by-step guide to NIH's grant search tool. How to search, filter, and find funded labs — and when you might want something faster.",
    href: "/nih-reporter-guide",
  },
];

export default function GuidesPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-[#f0f7ff] to-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-[var(--color-brand)] uppercase tracking-wider mb-3">
              Free Resources
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-dark)] leading-tight mb-6">
              Research Grants Guides
            </h1>
            <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
              Everything a life-science equipment sales rep needs to understand
              federal research funding. Written by reps, for reps.
            </p>
          </div>
        </section>

        {/* Topic Guides — first, these link to agency guides for deeper engagement */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[var(--color-dark)] mb-2">
              Start Here
            </h2>
            <p className="text-[var(--color-gray-500)] mb-10">
              Cross-agency overviews to help you understand the full funding
              landscape — then dive into individual agencies below.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {topicGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group block p-6 rounded-xl border border-gray-200 hover:border-[var(--color-brand)] hover:shadow-lg transition-all"
                >
                  <span className="text-3xl mb-3 block">{guide.emoji}</span>
                  <h3 className="text-lg font-bold text-[var(--color-dark)] group-hover:text-[var(--color-brand)] transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-500)] leading-relaxed">
                    {guide.description}
                  </p>
                  <span className="inline-block mt-4 text-sm font-semibold text-[var(--color-brand)] group-hover:translate-x-1 transition-transform">
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Agency Guides */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[var(--color-dark)] mb-2">
              Agency Guides
            </h2>
            <p className="text-[var(--color-gray-500)] mb-10">
              Deep dives into each federal funding agency — how they work, what
              they fund, and what it means for equipment sales.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {agencyGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group relative block p-6 rounded-xl border border-gray-200 bg-white hover:border-[var(--color-brand)] hover:shadow-lg transition-all"
                >
                  {guide.tag && (
                    <span className="absolute top-4 right-4 text-xs font-semibold text-[var(--color-brand)] bg-blue-50 px-2.5 py-1 rounded-full">
                      {guide.tag}
                    </span>
                  )}
                  <span className="text-3xl mb-3 block">{guide.emoji}</span>
                  <h3 className="text-lg font-bold text-[var(--color-dark)] group-hover:text-[var(--color-brand)] transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-500)] leading-relaxed">
                    {guide.description}
                  </p>
                  <span className="inline-block mt-4 text-sm font-semibold text-[var(--color-brand)] group-hover:translate-x-1 transition-transform">
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-dark)] mb-4">
              Ready to put this knowledge to work?
            </h2>
            <p className="text-[var(--color-gray-500)] mb-8">
              Our database has 450,000+ federal research grants across all 8
              agencies — searchable by state, keyword, and agency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sample"
                className="inline-block text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-8 py-3 rounded-lg transition-colors"
              >
                Get a Free Sample Report
              </Link>
              <Link
                href="/database"
                className="inline-block text-sm font-semibold text-[var(--color-brand)] border-2 border-[var(--color-brand)] hover:bg-blue-50 px-8 py-3 rounded-lg transition-colors"
              >
                Explore the Database
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
