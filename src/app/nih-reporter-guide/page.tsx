import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideSchema from "@/components/GuideSchema";

export const metadata: Metadata = {
  title:
    "How to Use NIH Reporter to Find Research Grants | Lab Leads Pro",
  description:
    "A complete guide to using NIH Reporter for finding funded research grants. Learn how to search, filter, and use NIH's free database — and when you might want something faster.",
  keywords:
    "NIH Reporter, how to use NIH Reporter, NIH grants search, find NIH grants, NIH Reporter tutorial, research grants database, NIH funded projects, NIH grant search tool",
  openGraph: {
    title: "How to Use NIH Reporter to Find Research Grants",
    description:
      "Free step-by-step guide to NIH Reporter. Find funded labs, search by state, and export grant data.",
    url: "https://lableadspro.com/nih-reporter-guide",
    siteName: "Lab Leads Pro",
    type: "article",
  },
};

export default function NIHReporterGuide() {
  return (
    <>
      <GuideSchema
        title="How to Use NIH Reporter to Find Research Grants"
        description="A complete guide to using NIH Reporter for finding funded research grants. Free step-by-step tutorial for life-science sales reps."
        url="https://lableadspro.com/nih-reporter-guide"
        faqs={[
          {
            question: "What is NIH Reporter?",
            answer:
              "NIH Reporter is a free, publicly available database maintained by the National Institutes of Health that allows anyone to search for NIH-funded research projects. It contains information about grants, contracts, and intramural research, including PI names, institutions, award amounts, and project abstracts.",
          },
          {
            question: "How do I search for grants on NIH Reporter?",
            answer:
              "Go to reporter.nih.gov, click 'Advanced Search' for the best filtering options. You can search by keyword, PI name, institution, state, NIH institute, activity code (R01, R21, S10, etc.), fiscal year, and more. Use the 'Newly Awarded' checkbox to find recently funded projects.",
          },
          {
            question: "Can I find PI contact information on NIH Reporter?",
            answer:
              "NIH Reporter shows PI names and institutions, but does NOT display email addresses or phone numbers. To get contact info, you'd need to manually look up each PI through their university directory, publications, or lab website.",
          },
          {
            question: "Is NIH Reporter free?",
            answer:
              "Yes. NIH Reporter is completely free and publicly available at reporter.nih.gov. It's maintained by the NIH as a transparency tool for taxpayer-funded research.",
          },
          {
            question: "What's the difference between NIH Reporter and Lab Leads Pro?",
            answer:
              "NIH Reporter is NIH-only and shows grants without PI contact info. Lab Leads Pro aggregates grants from 8 federal agencies (NIH, NSF, DOD, DOE, NASA, USDA, CDC, VA) with verified PI email addresses, keyword search, equipment purchase signals, and weekly new grant alerts delivered to your inbox.",
          },
        ]}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-[#f0f7ff] to-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-sm font-semibold text-[var(--color-brand)] uppercase tracking-wider mb-3">
              Free Guide
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-dark)] leading-tight mb-6">
              How to Use NIH Reporter
            </h1>
            <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
              NIH Reporter is a free tool that lets anyone search NIH-funded
              research grants. Here&apos;s how to use it effectively — whether
              you&apos;re a sales rep prospecting new leads or just exploring
              the research landscape.
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 prose prose-lg prose-gray">
            {/* What is NIH Reporter */}
            <h2 id="what-is-nih-reporter" className="text-2xl font-bold text-[var(--color-dark)] mt-0">
              What is NIH Reporter?
            </h2>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              <a
                href="https://reporter.nih.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-brand)] hover:underline font-medium"
              >
                NIH Reporter
              </a>{" "}
              (Research Portfolio Online Reporting Tools) is a free, publicly
              available database maintained by the National Institutes of Health.
              It contains detailed information about every NIH-funded research
              project — over 300,000 active grants at any given time.
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              For each grant, you can see:
            </p>
            <ul className="text-[var(--color-gray-600)] space-y-2">
              <li>
                <strong>The Principal Investigator (PI)</strong> — the lead
                researcher running the project
              </li>
              <li>
                <strong>The institution</strong> — which university, hospital,
                or research institute
              </li>
              <li>
                <strong>Award amount</strong> — how much funding they received
              </li>
              <li>
                <strong>Project abstract</strong> — what the research is about
              </li>
              <li>
                <strong>Activity code</strong> — the grant type (R01, R21, S10,
                etc.)
              </li>
              <li>
                <strong>NIH institute</strong> — which of the 27 NIH institutes
                funded it
              </li>
              <li>
                <strong>Project dates</strong> — when funding started and when
                it ends
              </li>
            </ul>

            {/* Getting Started */}
            <h2 id="getting-started" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              Getting Started: The Search Interface
            </h2>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              Head to{" "}
              <a
                href="https://reporter.nih.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-brand)] hover:underline font-medium"
              >
                reporter.nih.gov
              </a>
              . You&apos;ll see a simple search bar on the homepage. You can type
              a keyword here, but for serious prospecting, click{" "}
              <strong>&quot;Advanced Search&quot;</strong> — that&apos;s where the real
              power is.
            </p>

            <h3 className="text-xl font-semibold text-[var(--color-dark)] mt-8">
              Key Filters for Sales Reps
            </h3>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              The advanced search gives you dozens of filters. Here are the ones
              that matter most for prospecting:
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-6 space-y-4">
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  🔍 Keywords / Text Search
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Search project abstracts for equipment-related terms. Try
                  &quot;mass spectrometry,&quot; &quot;confocal microscopy,&quot;
                  &quot;flow cytometry,&quot; or whatever you sell. This searches
                  the full abstract, not just the title.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  📍 State / Institution
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Filter by state to see grants in your territory. You can also
                  search by specific institution if you&apos;re targeting a
                  particular university or medical center.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  📋 Activity Code
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  This is the grant type. The magic codes for equipment sales:
                  <strong> S10</strong> (shared instrumentation — literally
                  buying equipment), <strong>R01</strong> (standard research
                  grants, often include equipment budgets),{" "}
                  <strong>R35</strong> (large MIRA awards), and{" "}
                  <strong>U01/U54</strong> (cooperative agreements with big
                  budgets). See our{" "}
                  <Link
                    href="/nih-grant-types-guide"
                    className="text-[var(--color-brand)] hover:underline"
                  >
                    NIH Grant Types Guide
                  </Link>{" "}
                  for the full breakdown.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  ✅ Newly Awarded
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Check the &quot;Newly Awarded&quot; filter to see only
                  first-time grants (not renewals). These are PIs who just got
                  funded — they&apos;re setting up or expanding their labs right
                  now. This is the highest-intent signal.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  📅 Fiscal Year
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Filter by the current fiscal year to see the most recent
                  awards. NIH&apos;s fiscal year runs October through September
                  (so FY2026 started October 2025).
                </p>
              </div>
            </div>

            {/* Pro Tips */}
            <h2 id="pro-tips" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              Pro Tips for Sales Reps
            </h2>

            <div className="space-y-6 my-6">
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  Search for S10 grants first
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  S10 Shared Instrumentation Grants are the strongest buy
                  signal in all of federal funding. These PIs have money
                  earmarked specifically for equipment. Filter by Activity Code =
                  S10 and your state. That&apos;s your hottest lead list.
                </p>
              </div>
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  Look at the abstract, not just the title
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  A grant titled &quot;Mechanisms of neuronal plasticity&quot;
                  might sound irrelevant, but the abstract could describe
                  two-photon imaging experiments that need a $500K microscope.
                  Always click through and read the abstract.
                </p>
              </div>
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  New Type 1 awards = new labs being built
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  When a PI gets their first R01 (a &quot;Type 1&quot; or new
                  award), they&apos;re often a new assistant professor setting up
                  from scratch. They need everything — instruments, consumables,
                  service contracts. These are golden leads.
                </p>
              </div>
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  Export is limited
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  NIH Reporter lets you export search results to CSV, but
                  it&apos;s capped and doesn&apos;t include PI email addresses.
                  You&apos;ll need to manually look up each PI through their
                  university website, Google Scholar, or recent publications to
                  find contact info.
                </p>
              </div>
            </div>

            {/* Limitations */}
            <h2 id="limitations" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              What NIH Reporter Can&apos;t Do
            </h2>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              NIH Reporter is a great free tool, but it has real limitations for
              sales prospecting:
            </p>
            <ul className="text-[var(--color-gray-600)] space-y-3">
              <li>
                <strong>No PI email addresses or phone numbers.</strong> You get
                names and institutions, but you&apos;ll need to manually find
                contact info for every single lead.
              </li>
              <li>
                <strong>NIH only.</strong> It doesn&apos;t cover NSF, DOD, DOE,
                NASA, USDA, CDC, or VA grants — which collectively fund billions
                in lab equipment.
              </li>
              <li>
                <strong>No equipment tagging.</strong> You can search keywords in
                abstracts, but there&apos;s no way to filter grants by what
                equipment they&apos;re likely to purchase.
              </li>
              <li>
                <strong>No alerts.</strong> You can&apos;t set up automatic
                notifications when new grants are awarded in your territory.
                You&apos;d need to run your search manually every week.
              </li>
              <li>
                <strong>Data freshness varies.</strong> New awards can take days
                or weeks to appear in the system. There&apos;s no published
                schedule for when data updates.
              </li>
              <li>
                <strong>Manual, time-consuming process.</strong> To build a
                proper lead list, you&apos;re looking at hours of searching,
                clicking through individual grants, and manually researching
                each PI.
              </li>
            </ul>

            {/* When to use what */}
            <h2 id="nih-reporter-vs-lab-leads-pro" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              NIH Reporter vs. Lab Leads Pro
            </h2>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              Full transparency: you can absolutely do this work yourself using
              NIH Reporter. It&apos;s free, it&apos;s comprehensive for NIH
              data, and every field rep should know how to use it.
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              The question is whether your time is better spent manually
              searching a government website or actually selling.
            </p>

            <div className="bg-gray-50 rounded-xl overflow-hidden my-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100">
                    <th className="text-left p-4 font-semibold text-[var(--color-dark)]">
                      Feature
                    </th>
                    <th className="text-center p-4 font-semibold text-[var(--color-dark)]">
                      NIH Reporter
                    </th>
                    <th className="text-center p-4 font-semibold text-[var(--color-brand)]">
                      Lab Leads Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-gray-600)]">
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Price</td>
                    <td className="p-4 text-center">Free</td>
                    <td className="p-4 text-center">$99–149/mo</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Agencies covered</td>
                    <td className="p-4 text-center">NIH only</td>
                    <td className="p-4 text-center">8 agencies</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Grants in database</td>
                    <td className="p-4 text-center">~330K (NIH)</td>
                    <td className="p-4 text-center">450K+</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">PI email addresses</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅ 80% coverage</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Weekly new grant alerts</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Equipment purchase signals</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">State + keyword search</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4">Time to build a lead list</td>
                    <td className="p-4 text-center">Hours</td>
                    <td className="p-4 text-center">Minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[var(--color-gray-600)] leading-relaxed">
              If you&apos;re covering a small territory and have time to spare,
              NIH Reporter is a solid free option. If you want all 8 agencies,
              PI contact info, and your leads delivered weekly so you can focus
              on selling —{" "}
              <Link
                href="/sample"
                className="text-[var(--color-brand)] hover:underline font-medium"
              >
                grab a free sample report
              </Link>{" "}
              and see the difference.
            </p>
          </div>
        </article>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-dark)] mb-4">
              See what you&apos;re missing
            </h2>
            <p className="text-[var(--color-gray-500)] mb-8">
              Get a free sample report for your state — real grants, real PI
              contact info, across all 8 agencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sample"
                className="inline-block text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-8 py-3 rounded-lg transition-colors"
              >
                Get a Free Sample Report
              </Link>
              <a
                href="https://reporter.nih.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold text-[var(--color-gray-600)] border-2 border-gray-300 hover:border-gray-400 px-8 py-3 rounded-lg transition-colors"
              >
                Go to NIH Reporter →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
