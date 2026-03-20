import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "How to Use the Lab Leads Pro Database | Lab Leads Pro",
  description:
    "A visual walkthrough of the Lab Leads Pro grant database. Learn how to search, filter, and find equipment leads using every feature in the platform.",
  keywords:
    "lab leads pro tutorial, grant database guide, how to search grants, grant database filters, lab equipment leads, NIH grant search, NSF grant search",
  openGraph: {
    title: "How to Use the Lab Leads Pro Database",
    description:
      "A walkthrough of every feature, filter, and search tool at your fingertips.",
    url: "https://lableadspro.com/database/guides/how-to-use",
    siteName: "Lab Leads Pro",
    type: "article",
  },
};

/* -- molecular background (subtle) ---------------------------------------- */

function MolecularBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] to-white">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="mol-grid-howto"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="3" fill="#0066FF" />
            <circle cx="0" cy="0" r="2" fill="#0066FF" />
            <circle cx="100" cy="0" r="2" fill="#0066FF" />
            <circle cx="0" cy="100" r="2" fill="#0066FF" />
            <circle cx="100" cy="100" r="2" fill="#0066FF" />
            <line x1="50" y1="50" x2="0" y2="0" stroke="#0066FF" strokeWidth="0.8" />
            <line x1="50" y1="50" x2="100" y2="0" stroke="#0066FF" strokeWidth="0.8" />
            <line x1="50" y1="50" x2="100" y2="100" stroke="#0066FF" strokeWidth="0.8" />
            <line x1="50" y1="50" x2="0" y2="100" stroke="#0066FF" strokeWidth="0.8" />
            <circle cx="25" cy="75" r="1.5" fill="#00C48C" />
            <circle cx="75" cy="25" r="1.5" fill="#00C48C" />
            <line x1="0" y1="100" x2="25" y2="75" stroke="#00C48C" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="75" y2="25" stroke="#00C48C" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mol-grid-howto)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/* -- screenshot component ------------------------------------------------- */

function Screenshot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-8">
      <div className="rounded-xl border border-[var(--color-gray-200)] shadow-lg overflow-hidden bg-white">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={750}
          className="w-full h-auto"
          quality={90}
        />
      </div>
      <figcaption className="mt-3 text-center text-sm text-[var(--color-gray-500)]">
        {caption}
      </figcaption>
    </figure>
  );
}

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "dashboard", label: "Dashboard Overview" },
  { id: "searching", label: "Searching" },
  { id: "state-filter", label: "State Filter" },
  { id: "agency-filter", label: "Agency Filter" },
  { id: "grant-type-filter", label: "Grant Type Filter" },
  { id: "grant-card", label: "Reading a Grant Card" },
  { id: "pro-tips", label: "Pro Tips" },
];

/* -- page component ------------------------------------------------------- */

export default function HowToUseGuide() {
  return (
    <>
      <Header />

      {/* -- Hero ---------------------------------------------------------- */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <MolecularBg />
        <div className="relative max-w-4xl mx-auto">
          {/* breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--color-gray-500)] mb-6">
            <Link
              href="/"
              className="hover:text-[var(--color-brand)] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/database"
              className="hover:text-[var(--color-brand)] transition-colors"
            >
              Database
            </Link>
            <span>/</span>
            <span className="text-[var(--color-gray-700)]">
              How to Use the Database
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            How to Use the{" "}
            <span className="text-[var(--color-brand)]">
              Lab Leads Pro Database
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            A walkthrough of every feature, filter, and search tool at your
            fingertips. This guide covers everything you need to turn grant data
            into qualified equipment leads.
          </p>
        </div>
      </section>

      {/* -- Jump Links ---------------------------------------------------- */}
      <div className="bg-[var(--color-gray-50)] border-y border-[var(--color-gray-100)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <p className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">
            Jump to
          </p>
          <div className="flex flex-wrap gap-2">
            {jumpLinks.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm px-3 py-1 rounded-full border border-[var(--color-gray-300)] text-[var(--color-gray-700)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* -- Content ------------------------------------------------------- */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Section 1: Dashboard Overview */}
        <section id="dashboard" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The Dashboard Overview
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Everything you see when you log in. Here is how the layout works.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              When you open the database, you get a single-page interface
              designed for fast prospecting. No clicking through multiple pages
              or tabs. Everything is right in front of you.
            </p>

            <Screenshot
              src="/guide-screenshots/database-full-view.png"
              alt="The full Lab Leads Pro database interface showing search bar, filters, and grant results"
              caption="The full database interface. Search bar at top, filters on the left, grant cards in the center."
            />

            <ul className="space-y-3 text-sm text-[var(--color-gray-700)]">
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  Search bar at the top
                </span>{" "}
                for keyword, PI name, institution, or topic searches.
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  Filter sidebar on the left
                </span>{" "}
                with state, institution, agency, grant type, date range, and
                award amount filters.
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  Results area
                </span>{" "}
                showing grant cards with key info at a glance: PI name,
                institution, agency, award amount, and equipment tags.
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  Sort options
                </span>{" "}
                (relevance, newest, highest award) to organize results the way
                you work.
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  Your subscription badge
                </span>{" "}
                in the top right showing your plan and which states you have
                access to.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Searching for Grants */}
        <section id="searching" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Searching for Grants
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Full-text search across titles, abstracts, PI names, and
            institutions.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              The search bar is the fastest way to find leads. It searches
              across grant titles, full abstracts, PI names, and institution
              names. Type what you sell and see who is buying it.
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-gray-700)]">
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  Equipment types:
                </span>{" "}
                &quot;confocal microscope,&quot; &quot;mass spectrometer,&quot;
                &quot;sequencer,&quot; &quot;flow cytometer&quot;
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  Research topics:
                </span>{" "}
                &quot;CRISPR,&quot; &quot;Alzheimer,&quot;
                &quot;proteomics,&quot; &quot;single-cell RNA&quot;
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  People and places:
                </span>{" "}
                Search for a specific PI name or institution to see all their
                funded grants.
              </li>
            </ul>

            <Screenshot
              src="/guide-screenshots/database-search-results.png"
              alt="Search results for 'confocal microscope' showing grants that mention confocal microscope purchases"
              caption="Search results for &quot;confocal microscope.&quot; The highlighted result literally shows a PI requesting funds to buy a new confocal. That is a lead."
            />

            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The point:
                </span>{" "}
                When a PI writes in their grant abstract that they need a new
                confocal microscope, and their grant just got funded, that is not
                a cold call. That is someone with budget approval to buy exactly
                what you sell.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Filtering by State */}
        <section id="state-filter" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Filtering by State
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Narrow results to your territory.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              Click the state dropdown in the filter sidebar to limit results to
              specific states. Select one or multiple states to match your
              territory.
            </p>

            <Screenshot
              src="/guide-screenshots/database-state-filter.png"
              alt="State filter dropdown showing a list of US states to select"
              caption="The state filter dropdown. Select one or more states to focus on your territory."
            />

            <ul className="space-y-2 text-sm text-[var(--color-gray-700)]">
              <li>
                Your subscription determines which states you can access. You
                will only see data for states included in your plan.
              </li>
              <li>
                Select multiple states if your territory spans a region.
              </li>
            </ul>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Pro tip:
                </span>{" "}
                Use the state filter first to focus on your territory, then
                layer on other filters. Find leads in your backyard before
                casting a wider net.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Filtering by Agency */}
        <section id="agency-filter" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Filtering by Agency
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Focus on the funding sources that matter for what you sell.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              The agency filter lets you drill into specific funding sources.
              Select or deselect agencies to focus your search on the programs
              most likely to buy your equipment.
            </p>

            <Screenshot
              src="/guide-screenshots/database-agency-filter.png"
              alt="Agency filter dropdown showing NIH, NSF, DOD, DOE, NASA, VA, USDA, CDC options"
              caption="The agency filter. Select one or more agencies to focus on specific funding sources."
            />

            <ul className="space-y-2 text-sm text-[var(--color-gray-700)]">
              <li>
                Filter by NIH, NSF, DOD, DOE, NASA, VA, USDA, or CDC.
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  NIH sub-filter:
                </span>{" "}
                Drill into specific NIH institutes like NCI, NIGMS, NIAID, and
                others to get even more targeted.
              </li>
            </ul>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Pro tip:
                </span>{" "}
                If you sell into defense labs, filter to DOD. If your territory
                has land-grant universities, check USDA. Match the agency to
                your market and you will cut through noise fast.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Filtering by Grant Type */}
        <section id="grant-type-filter" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Filtering by Grant Type
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Activity codes tell you what kind of grant it is and how likely it
            is to include equipment purchases.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              The grant type filter lets you select specific activity codes.
              Some grant types are far more likely to involve equipment purchases
              than others.
            </p>

            <Screenshot
              src="/guide-screenshots/database-grant-type-filter.png"
              alt="Grant type filter showing activity codes like R01, R21, R35, S10"
              caption="The grant type filter. Select activity codes to find the grants most likely to buy equipment."
            />

            <ul className="space-y-2 text-sm text-[var(--color-gray-700)]">
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  S10 grants
                </span>{" "}
                are literal equipment purchase orders. These exist specifically
                to buy shared instrumentation. If you see an S10, someone is
                buying something.
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  R01s in year 1
                </span>{" "}
                often have equipment line items as PIs set up or expand their
                research programs.
              </li>
              <li>
                <span className="font-semibold text-[var(--color-gray-900)]">
                  New investigator awards (R35, K awards)
                </span>{" "}
                mean someone is building a lab from scratch. They need
                everything.
              </li>
            </ul>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Want the full breakdown?
                </span>{" "}
                Check out our{" "}
                <Link
                  href="/database/guides/grant-types"
                  className="text-[var(--color-brand)] hover:underline font-semibold"
                >
                  Grant Types Guide
                </Link>{" "}
                for a detailed explanation of what each activity code means and
                which ones to prioritize.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Reading a Grant Card */}
        <section id="grant-card" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Reading a Grant Card
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Every piece of information on the card, and what it means for you.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              Each grant in the results is a card you can expand to see full
              details. Here is what every element on the card tells you.
            </p>

            <Screenshot
              src="/guide-screenshots/database-expanded-grant.png"
              alt="An expanded grant card showing title, PI info, institution, abstract, equipment tags, and contact details"
              caption="An expanded grant card. Every piece of data you need to qualify a lead is right here."
            />

            <div className="grid gap-3">
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Grant title
                </span>
                <span className="text-[var(--color-gray-700)]">
                  Click to expand or collapse the full abstract. The title alone
                  often tells you what equipment is involved.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  PI name
                </span>
                <span className="text-[var(--color-gray-700)]">
                  The principal investigator. Click to see all grants by this PI,
                  not just the one you found.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Institution &amp; location
                </span>
                <span className="text-[var(--color-gray-700)]">
                  University, city, and state. Tells you if this lead is in your
                  territory.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  PI email
                </span>
                <span className="text-[var(--color-gray-700)]">
                  The contact you need. This is the person who decides what
                  equipment to buy.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Agency badge
                </span>
                <span className="text-[var(--color-gray-700)]">
                  NIH, NSF, DOD, or other funding agency. Tells you the funding
                  source.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Grant type badge
                </span>
                <span className="text-[var(--color-gray-700)]">
                  R01, R21, S10, etc. The activity code tells you what kind of
                  grant it is.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Award amount
                </span>
                <span className="text-[var(--color-gray-700)]">
                  How much funding the grant received. Bigger awards mean bigger
                  equipment budgets.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Award date
                </span>
                <span className="text-[var(--color-gray-700)]">
                  When the grant was funded. Recent awards mean the money is
                  fresh and ready to spend.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Status
                </span>
                <span className="text-[var(--color-gray-700)]">
                  Active or completed. Active grants have budget to spend.
                  Completed grants may be renewing.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Equipment tags
                </span>
                <span className="text-[var(--color-gray-700)]">
                  Purple badges showing what equipment our AI detected in the
                  grant abstract. These are your strongest buy signals.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  Full abstract
                </span>
                <span className="text-[var(--color-gray-700)]">
                  The full description of what the PI is researching, in their
                  own words. Read this to understand what they need.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-[var(--color-gray-900)] shrink-0 w-36">
                  View source link
                </span>
                <span className="text-[var(--color-gray-700)]">
                  Links to the original grant record at NIH Reporter,
                  NSF Awards, or USASpending for verification.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Pro Tips */}
        <section id="pro-tips" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Pro Tips
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Power-user moves that will save you time and surface better leads.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6">
            <ul className="space-y-4 text-sm text-[var(--color-gray-700)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand)] font-bold shrink-0">1.</span>
                <span>
                  <span className="font-semibold text-[var(--color-gray-900)]">
                    Click a PI name to see ALL their grants,
                  </span>{" "}
                  not just the one you found. A PI with five active grants has
                  five times the budget.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand)] font-bold shrink-0">2.</span>
                <span>
                  <span className="font-semibold text-[var(--color-gray-900)]">
                    Sort by &quot;Newest&quot;
                  </span>{" "}
                  to see what was just funded this week. Fresh awards mean fresh
                  budgets and PIs who are ready to buy.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand)] font-bold shrink-0">3.</span>
                <span>
                  <span className="font-semibold text-[var(--color-gray-900)]">
                    Search for your competitor&apos;s products
                  </span>{" "}
                  to find labs that already use similar equipment. If they have a
                  competitor&apos;s system and just got new funding, that is a
                  replacement or upgrade opportunity.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand)] font-bold shrink-0">4.</span>
                <span>
                  <span className="font-semibold text-[var(--color-gray-900)]">
                    Combine filters
                  </span>{" "}
                  for laser-focused prospecting. State + agency + grant type
                  narrows thousands of grants down to the handful that matter
                  most for your territory.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand)] font-bold shrink-0">5.</span>
                <span>
                  <span className="font-semibold text-[var(--color-gray-900)]">
                    S10 and S10OD grants are guaranteed equipment purchases.
                  </span>{" "}
                  These grants exist specifically to buy shared instrumentation.
                  Search for them first.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand)] font-bold shrink-0">6.</span>
                <span>
                  <span className="font-semibold text-[var(--color-gray-900)]">
                    New R01s (check award date) often mean new equipment budgets
                  </span>{" "}
                  in year 1. A PI who just landed a 5-year R01 is setting up
                  their lab and needs instruments.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-b from-[var(--color-dark)] to-[#0D1F3C] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to find equipment leads?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with real grant data from your state, scored for
            equipment buying signals. Or jump straight in and start prospecting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sample"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--color-brand)] text-white font-semibold hover:bg-[var(--color-brand-dark)] transition-colors shadow-lg shadow-blue-500/20"
            >
              View a Sample Report
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
