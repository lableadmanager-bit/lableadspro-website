import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideSchema from "@/components/GuideSchema";
import GuidesCrossLinks from "@/components/GuidesCrossLinks";

export const metadata: Metadata = {
  title:
    "How to Use NIH Reporter to Find Research Grants | Lab Leads Pro",
  description:
    "A complete guide to using NIH Reporter for finding funded research grants. Learn how to search, filter, and use NIH's free database - and when you might want something faster.",
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
              research grants. Here&apos;s how to use it effectively - whether
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
              available database run by the National Institutes of Health. It
              gives you detailed information about every NIH-funded research
              project - over 300,000 active grants at any given time.
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              It&apos;s genuinely one of the best free resources available for
              anyone in life-science sales. If you sell equipment to research
              labs and you&apos;re not using NIH Reporter, you should be. Here&apos;s
              how to get started.
            </p>

            <h3 className="text-xl font-semibold text-[var(--color-dark)] mt-8">
              What You&apos;ll Find
            </h3>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              For each funded grant, NIH Reporter shows:
            </p>
            <ul className="text-[var(--color-gray-600)] space-y-2">
              <li>
                <strong>The Principal Investigator (PI)</strong> - the lead
                researcher running the project
              </li>
              <li>
                <strong>The institution</strong> - which university, hospital,
                or research institute
              </li>
              <li>
                <strong>Award amount</strong> - how much funding they received
              </li>
              <li>
                <strong>Project abstract</strong> - a detailed description of
                the research
              </li>
              <li>
                <strong>Activity code</strong> - the{" "}
                <Link
                  href="/nih-grant-types-guide"
                  className="text-[var(--color-brand)] hover:underline"
                >
                  grant type
                </Link>{" "}
                (R01, R21, S10, etc.)
              </li>
              <li>
                <strong>NIH institute</strong> - which of the{" "}
                <Link
                  href="/nih-institutes-guide"
                  className="text-[var(--color-brand)] hover:underline"
                >
                  27 NIH institutes
                </Link>{" "}
                funded it
              </li>
              <li>
                <strong>Project dates</strong> - when funding started and when
                it ends
              </li>
            </ul>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              All of this is public information, funded by taxpayer dollars.
              Anyone can access it.
            </p>

            {/* Getting Started */}
            <h2 id="getting-started" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              Getting Started
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
              . You&apos;ll see a simple search bar on the homepage. You can
              type a keyword here to do a quick search, but the real power is in{" "}
              <strong>&quot;Advanced Search&quot;</strong> - click that to get
              access to all the filters.
            </p>

            <h3 className="text-xl font-semibold text-[var(--color-dark)] mt-8">
              The Filters That Matter
            </h3>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              Advanced search gives you dozens of filters. Here are the ones
              that are most useful for prospecting:
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
                  the full abstract, not just the title - so you&apos;ll catch
                  grants that mention your equipment type even if the title
                  sounds unrelated.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  📍 State / Institution
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Filter by state to see grants in your territory. You can also
                  search by specific institution - useful if you&apos;re trying
                  to map out all the funded research at a particular university
                  or medical center.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  📋 Activity Code
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  This is the grant type, and it&apos;s worth learning the key
                  ones. <strong>S10</strong> grants are shared instrumentation
                  grants - the PI literally has money earmarked to buy
                  equipment. <strong>R01</strong> is the standard research grant
                  (most common, often includes equipment budgets).{" "}
                  <strong>R35</strong> are large MIRA awards. See our{" "}
                  <Link
                    href="/nih-grant-types-guide"
                    className="text-[var(--color-brand)] hover:underline"
                  >
                    NIH Grant Types Guide
                  </Link>{" "}
                  for the full breakdown of what each code means.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  ✅ Newly Awarded
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  This is a great filter. Check &quot;Newly Awarded&quot; to see
                  only first-time grants (not renewals). These PIs just got
                  funded - they&apos;re setting up or expanding their labs. If
                  someone just got their first R01, they probably need
                  everything.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-dark)] mb-1">
                  📅 Fiscal Year
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Filter by the current fiscal year to focus on recent awards.
                  NIH&apos;s fiscal year runs October through September (FY2026
                  started October 2025).
                </p>
              </div>
            </div>

            {/* Pro Tips */}
            <h2 id="pro-tips" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              Tips From the Field
            </h2>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              A few things we&apos;ve learned from years of using grant data for
              prospecting:
            </p>

            <div className="space-y-6 my-6">
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  Start with S10 grants
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  <Link href="/nih-grant-types-guide" className="text-[var(--color-brand)] hover:underline">S10 Shared Instrumentation Grants</Link>{" "}
                  exist solely to purchase
                  equipment. Filter by Activity Code = S10 and your state, and
                  you&apos;ll have a list of PIs who have money set aside
                  specifically for instruments. It doesn&apos;t get more
                  qualified than that.
                </p>
              </div>
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  Read the abstract, not just the title
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  A grant titled &quot;Mechanisms of neuronal plasticity&quot;
                  might sound irrelevant if you sell microscopes. But the
                  abstract could describe two-photon imaging experiments that
                  require a $500K system. The science sounds complex, but
                  you&apos;re just looking for mentions of techniques and
                  instruments you recognize.
                </p>
              </div>
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  New Type 1 awards are gold
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  When a PI gets their first R01 (called a &quot;Type 1&quot; or
                  new award), they&apos;re often a new assistant professor
                  setting up a lab from scratch. They need instruments,
                  consumables, service contracts - everything. These are some of
                  the best leads you&apos;ll find anywhere.
                </p>
              </div>
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  Use the &quot;Similar Projects&quot; feature
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  When you find a grant that&apos;s a perfect match, click into
                  the project details. NIH Reporter shows &quot;Similar
                  Projects&quot; - other funded research doing related work. It&apos;s
                  a quick way to find more leads in the same research area without
                  running a new search.
                </p>
              </div>
              <div className="border-l-4 border-[var(--color-brand)] pl-4">
                <p className="font-semibold text-[var(--color-dark)]">
                  Bookmark your search
                </p>
                <p className="text-sm text-[var(--color-gray-600)]">
                  After you set up a search with all your filters, bookmark the
                  URL. NIH Reporter encodes search parameters in the URL, so
                  you can re-run the same search next week without setting
                  everything up again.
                </p>
              </div>
            </div>

            {/* Understanding abstracts */}
            <h2 id="reading-abstracts" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              Making Sense of the Abstracts
            </h2>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              NIH grant abstracts are written by scientists for review
              committees. They&apos;re dense, full of jargon, and can be
              intimidating if you don&apos;t have a research background. But you
              don&apos;t need to understand the science - you just need to spot
              the signals.
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              Look for:
            </p>
            <ul className="text-[var(--color-gray-600)] space-y-2">
              <li>
                <strong>Technique names</strong> you recognize - &quot;confocal
                imaging,&quot; &quot;mass spectrometry,&quot; &quot;next-gen
                sequencing,&quot; &quot;flow cytometry&quot;
              </li>
              <li>
                <strong>Instrument mentions</strong> - brand names or specific
                instrument types
              </li>
              <li>
                <strong>&quot;We will acquire&quot; or &quot;we will
                purchase&quot;</strong> - direct equipment buying language
              </li>
              <li>
                <strong>&quot;Establish&quot; or &quot;build&quot;</strong> a new
                facility, core, or lab - signals from-scratch setup
              </li>
              <li>
                <strong>Specific Aims</strong> - many abstracts list numbered
                aims. If an aim mentions your instrument type, that&apos;s a
                strong signal.
              </li>
            </ul>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              It takes a little practice, but after scanning a few dozen
              abstracts, you&apos;ll get fast at spotting what&apos;s relevant.
            </p>

            {/* Exporting data */}
            <h2 id="exporting" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              Exporting Your Results
            </h2>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              NIH Reporter lets you export search results to CSV - look for the
              download button above your results. The export includes PI names,
              institutions, award amounts, and project details. You can open it
              in Excel or Google Sheets and start building a lead list.
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              One thing to know: the export doesn&apos;t include PI email
              addresses or phone numbers. You&apos;ll need to look those up
              separately - usually through the university directory, their lab
              website, or Google Scholar.
            </p>

            {/* The real challenge */}
            <h2 id="the-challenge" className="text-2xl font-bold text-[var(--color-dark)] mt-12">
              Where It Gets Hard
            </h2>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              NIH Reporter is a genuinely powerful tool, and if you put the time
              in, you can build a solid prospecting list from it. But
              there&apos;s a reason most reps don&apos;t do it consistently.
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              The challenge isn&apos;t finding the grants - it&apos;s keeping up.
              NIH awards new grants every week, and the only way to catch them
              is to re-run your searches regularly. There&apos;s no alert system
              or notification when new awards drop in your territory.
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              Then there&apos;s the contact info problem. You find a great lead
              - newly funded PI at a university in your state, abstract
              mentions your exact instrument type - but the grant record
              doesn&apos;t have their email. So you&apos;re Googling their name,
              hunting through university directories, checking recent papers for
              a corresponding author address. Multiply that by 20 leads and
              you&apos;ve spent your afternoon on data entry instead of
              selling.
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              And NIH Reporter only covers NIH. There are seven other federal
              agencies that fund research labs - NSF, DOD, DOE, NASA, VA, USDA,
              CDC - and each one has its own separate system (or no public
              search tool at all).
            </p>
            <p className="text-[var(--color-gray-600)] leading-relaxed">
              None of this makes NIH Reporter less useful. It&apos;s still the
              best free source of research funding data available. But if you
              find yourself wishing someone would just pull all the grants
              together, add the contact info, and send you the new ones every
              week -{" "}
              <Link
                href="/sample"
                className="text-[var(--color-brand)] hover:underline font-medium"
              >
                that&apos;s what we built
              </Link>
              .
            </p>
          </div>
        </article>
        <GuidesCrossLinks currentSlug="nih-reporter-guide" />


        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://reporter.nih.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-8 py-3 rounded-lg transition-colors"
              >
                Go to NIH Reporter →
              </a>
              <Link
                href="/sample"
                className="inline-block text-sm font-semibold text-[var(--color-brand)] border-2 border-[var(--color-brand)] hover:bg-blue-50 px-8 py-3 rounded-lg transition-colors"
              >
                Get a Free Sample Report
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
