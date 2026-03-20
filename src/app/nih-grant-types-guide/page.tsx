import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideSchema from "@/components/GuideSchema";

export const metadata: Metadata = {
  title:
    "NIH Grant Types Guide for Equipment Sales Reps | Lab Leads Pro",
  description:
    "Understand every NIH grant type (activity code) and what each means for lab equipment sales. Learn which grants signal purchases: R01, R21, R35, S10, SBIR, and more.",
  keywords:
    "NIH grant types, R01 grant, R21 grant, S10 grant, SBIR grant, lab equipment sales, NIH activity codes, research grants, equipment purchasing signals, life science sales",
  openGraph: {
    title: "NIH Grant Types Guide for Equipment Sales Reps",
    description:
      "Which NIH grants signal equipment purchases? A practical guide for life-science sales reps.",
    url: "https://lableadspro.com/nih-grant-types-guide",
    siteName: "Lab Leads Pro",
    type: "article",
  },
};

/* ── star helpers ─────────────────────────────────────────── */

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < count
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-gray-300)]"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </span>
  );
}

/* ── grant card ───────────────────────────────────────────── */

interface GrantCardProps {
  code: string;
  name: string;
  what: string;
  why: string;
  budget: string;
  duration?: string;
  stars: number;
}

function GrantCard({
  code,
  name,
  what,
  why,
  budget,
  duration,
  stars,
}: GrantCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-sm font-bold bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full">
          {code}
        </span>
        <Stars count={stars} />
      </div>
      <h3 className="text-lg font-bold text-[var(--color-gray-900)] mb-2">
        {name}
      </h3>
      <p className="text-sm text-[var(--color-gray-700)] mb-3">{what}</p>
      <p className="text-sm text-[var(--color-gray-500)] mb-4">{why}</p>
      <div className="flex flex-wrap gap-4 text-xs text-[var(--color-gray-500)]">
        <span className="bg-[var(--color-gray-50)] px-3 py-1 rounded-full">
          {budget}
        </span>
        {duration && (
          <span className="bg-[var(--color-gray-50)] px-3 py-1 rounded-full">
            {duration}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── molecular background (subtle) ───────────────────────── */

function MolecularBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] to-white">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="mol-grid-gt"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="60" cy="60" r="3" fill="#0066FF" />
            <circle cx="0" cy="0" r="2" fill="#0066FF" />
            <circle cx="120" cy="0" r="2" fill="#0066FF" />
            <circle cx="0" cy="120" r="2" fill="#0066FF" />
            <circle cx="120" cy="120" r="2" fill="#0066FF" />
            <line
              x1="60"
              y1="60"
              x2="0"
              y2="0"
              stroke="#0066FF"
              strokeWidth="0.8"
            />
            <line
              x1="60"
              y1="60"
              x2="120"
              y2="0"
              stroke="#0066FF"
              strokeWidth="0.8"
            />
            <line
              x1="60"
              y1="60"
              x2="120"
              y2="120"
              stroke="#0066FF"
              strokeWidth="0.8"
            />
            <line
              x1="60"
              y1="60"
              x2="0"
              y2="120"
              stroke="#0066FF"
              strokeWidth="0.8"
            />
            <circle cx="30" cy="90" r="1.5" fill="#00C48C" />
            <circle cx="90" cy="30" r="1.5" fill="#00C48C" />
            <line
              x1="0"
              y1="120"
              x2="30"
              y2="90"
              stroke="#00C48C"
              strokeWidth="0.5"
            />
            <line
              x1="120"
              y1="0"
              x2="90"
              y2="30"
              stroke="#00C48C"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mol-grid-gt)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/* ── reference table data ─────────────────────────────────── */

const tableRows = [
  { type: "R01", budget: "$250–500K/yr", stars: 4, signal: "High", priority: "Primary" },
  { type: "R21", budget: "$275K total", stars: 2, signal: "Moderate", priority: "Watch list" },
  { type: "R35 (MIRA)", budget: "$750K/yr", stars: 5, signal: "Very High", priority: "Primary" },
  { type: "R15 (AREA)", budget: "$300K total", stars: 3, signal: "Good", priority: "Primary" },
  { type: "R43/R44 (SBIR)", budget: "$150K–$1M", stars: 4, signal: "High (startups)", priority: "Primary" },
  { type: "P01", budget: "$1M+/yr", stars: 4, signal: "High (cores)", priority: "Primary" },
  { type: "P30", budget: "Varies", stars: 5, signal: "Very High (cores)", priority: "Primary" },
  { type: "S10/S10OD", budget: "$50K–$2M+", stars: 5, signal: "Guaranteed", priority: "Immediate" },
  { type: "U01", budget: "Varies", stars: 3, signal: "Good", priority: "Secondary" },
  { type: "T32/F31/F32", budget: "N/A", stars: 1, signal: "Low", priority: "Skip" },
  { type: "K Awards", budget: "Small", stars: 1, signal: "Low", priority: "Skip" },
];

/* ── page component ───────────────────────────────────────── */

export default function GrantTypesGuide() {
  const sections = [
    { id: "research-grants", label: "Research Grants" },
    { id: "sbir-sttr", label: "SBIR / STTR" },
    { id: "program-center", label: "Program & Center Grants" },
    { id: "cooperative", label: "Cooperative Agreements" },
    { id: "training", label: "Training & Fellowships" },
    { id: "equipment", label: "Equipment-Specific Grants" },
    { id: "reference-table", label: "Quick Reference Table" },
  ];

  return (
    <>
      <GuideSchema
        title="NIH Grant Types Guide for Equipment Sales Reps"
        description="Understand every NIH grant type (activity code) and what each means for lab equipment sales. Learn which grants signal purchases: R01, R21, R35, S10, SBIR, and more."
        url="https://lableadspro.com/nih-grant-types-guide"
        faqs={[
          { question: "What is an R01 grant?", answer: "An R01 is the NIH's standard research project grant, typically funding $250K-$500K per year for 3-5 years. R01s are the most common NIH grant type and frequently involve equipment purchases for new or expanding research projects." },
          { question: "What NIH grants signal equipment purchases?", answer: "S10 Shared Instrumentation Grants are the strongest signal - they exist solely to buy equipment ($50K-$600K+). R01 and R35 grants often include equipment budgets. New R01 awards to early-career PIs are especially strong signals since they're setting up new labs." },
          { question: "What is the difference between R01 and R21 grants?", answer: "R01 grants are full research projects ($250K-$500K/year, 3-5 years) while R21 grants are exploratory/developmental awards ($275K total over 2 years). R01s are much more likely to involve equipment purchases due to their larger budgets." },
          { question: "What is an SBIR grant?", answer: "SBIR (Small Business Innovation Research) grants fund small businesses developing commercial products. Phase I awards are ~$275K for feasibility, Phase II are ~$1M for development. SBIR recipients often need specialized lab equipment for R&D." },
        ]}
      />
      <Header />

      {/* ── Hero ────────────────────────────────────────────── */}
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
              Grant Types Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            NIH Grant Types:{" "}
            <span className="text-[var(--color-brand)]">
              What They Mean for Equipment Sales
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            Not all grants are created equal. A $3M R01 renewal is a very
            different sales opportunity than a $150K R21 exploratory grant. This
            guide breaks down the grant types you&apos;ll see in Lab Leads Pro
            and explains what each one means for your territory.
          </p>
        </div>
      </section>

      {/* ── Jump Links ──────────────────────────────────────── */}
      <div className="bg-[var(--color-gray-50)] border-y border-[var(--color-gray-100)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <p className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">
            Jump to
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
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

      {/* ── Content ─────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* Section 1 – Research Grants */}
        <section id="research-grants">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Research Grants
          </h2>
          <p className="text-[var(--color-gray-500)] mb-8">
            The bread and butter of NIH funding, and the core of your
            prospecting pipeline.
          </p>
          <div className="grid gap-6">
            <GrantCard
              code="R01"
              name="Research Project Grant"
              what="The workhorse grant. Multi-year (3-5 years), typically $250K-$500K/year in direct costs. Funds a specific research project."
              why="This is where most major equipment purchases happen. Watch for Year 1 awards (startup buying) and renewals (upgrading aging gear). A new R01 in your territory is a warm lead."
              budget="$250K–$500K/yr"
              duration="3–5 years"
              stars={4}
            />
            <GrantCard
              code="R21"
              name="Exploratory / Developmental Research Grant"
              what="Smaller, shorter grants for pilot studies. Basically testing a new idea before going for the R01."
              why="Don't expect a big equipment purchase here, but pay attention to what they're working on. An R21 in single-cell sequencing today often turns into an R01 with a sequencer purchase 18 months later."
              budget="Up to $275K total"
              duration="Up to 2 years"
              stars={2}
            />
            <GrantCard
              code="R03"
              name="Small Research Grant"
              what="Very small grants for narrow, well-defined projects. Often just data analysis, no wet lab work."
              why="Skip these unless the PI also holds bigger grants. Almost never leads to equipment purchases."
              budget="Up to $50K/yr"
              duration="Up to 2 years"
              stars={1}
            />
            <GrantCard
              code="R35"
              name="Outstanding Investigator Award (MIRA)"
              what="Big, flexible, long-term funding for established investigators. Replaces multiple R01s with one larger award."
              why="Big budgets, long timelines, and the PI has flexibility to buy equipment without tying it to a specific aim. These are well-funded labs that are actively making purchasing decisions."
              budget="$750K/yr"
              duration="7 years"
              stars={5}
            />
            <GrantCard
              code="R15"
              name="Academic Research Enhancement Award (AREA)"
              what="For smaller schools that don't get much NIH funding. The whole point is to boost their research capacity."
              why="These schools are usually underequipped, which is good news for you. R15 grants frequently include equipment line items because the institution doesn't already own what's needed."
              budget="Up to $300K total"
              duration="Up to 3 years"
              stars={3}
            />
          </div>
        </section>

        {/* Section 2 – SBIR / STTR */}
        <section id="sbir-sttr">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            SBIR / STTR
          </h2>
          <p className="text-[var(--color-gray-500)] mb-8">
            Industry and startup grants. These are fast-moving buyers building
            out their first labs.
          </p>
          <div className="grid gap-6">
            <GrantCard
              code="R43 / R44"
              name="SBIR (Small Business Innovation Research)"
              what="R43 is Phase I (feasibility, ~$150K over 6-12 months). R44 is Phase II (full development, up to $1M over 2 years)."
              why="Biotech startups building out their first labs. Phase II companies are often buying their first major instruments. Great leads because startups buy fast and don't have legacy vendor relationships."
              budget="$150K–$1M"
              duration="6 months – 2 years"
              stars={4}
            />
            <GrantCard
              code="R41 / R42"
              name="STTR (Small Business Technology Transfer)"
              what="Same idea as SBIR but requires a university partner."
              why="Same equipment signals as SBIR. Just figure out whether the equipment is going to the academic lab or the company, because that changes who you're selling to."
              budget="$150K–$1M"
              duration="6 months – 2 years"
              stars={4}
            />
          </div>
        </section>

        {/* Section 3 – Program & Center Grants */}
        <section id="program-center">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Program &amp; Center Grants
          </h2>
          <p className="text-[var(--color-gray-500)] mb-8">
            Big money. Multi-project grants that fund core facilities and
            shared equipment.
          </p>
          <div className="grid gap-6">
            <GrantCard
              code="P01"
              name="Research Program Project Grant"
              what="Multi-project grants with shared cores. Big collaborative efforts, often $1M+/year."
              why="P01s fund core facilities and shared equipment. If a P01 includes a microscopy core, you could be looking at a multi-instrument deal."
              budget="$1M+/yr"
              stars={4}
            />
            <GrantCard
              code="P30"
              name="Center Core Grant"
              what="Supports shared resources and core facilities at an institution."
              why="Directly funds core labs. These are the grants behind the $500K confocal or the $2M cryo-EM purchase."
              budget="Varies"
              stars={5}
            />
            <GrantCard
              code="P20"
              name="Exploratory Grants (COBRE / IDeA)"
              what="NIH program to build research capacity at institutions in states that historically get less NIH funding (IDeA states)."
              why="These grants exist to equip labs in underserved states. If you cover an IDeA state (WV, KY, NE, NM, etc.), P20s are gold. They're literally buying equipment to get these labs off the ground."
              budget="Varies"
              stars={4}
            />
          </div>
        </section>

        {/* Section 4 – Cooperative Agreements */}
        <section id="cooperative">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Cooperative Agreements
          </h2>
          <p className="text-[var(--color-gray-500)] mb-8">
            Like research grants but with substantial NIH involvement. Budgets
            tend to be bigger.
          </p>
          <div className="grid gap-6">
            <GrantCard
              code="U01"
              name="Research Project Cooperative Agreement"
              what="Like an R01 but NIH is more hands-on with the research direction."
              why="Similar equipment purchasing patterns to R01s. Budgets are often bigger because of the collaborative setup."
              budget="Varies"
              stars={3}
            />
            <GrantCard
              code="U54"
              name="Specialized Center Cooperative Agreement"
              what="Big center-scale cooperative agreements, often spanning multiple institutions."
              why="Big budgets, core facilities, shared equipment purchases. Think of these as P30s with even more NIH oversight."
              budget="Varies"
              stars={4}
            />
          </div>
        </section>

        {/* Section 5 – Training & Fellowships */}
        <section id="training">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Training &amp; Fellowship Grants
          </h2>
          <p className="text-[var(--color-gray-500)] mb-8">
            Lower priority for equipment sales. These fund people, not labs.
          </p>
          <div className="grid gap-6">
            <GrantCard
              code="T32"
              name="Institutional Training Grant"
              what="Funds training programs for grad students and postdocs at an institution."
              why="These fund training, not equipment. Low priority for prospecting."
              budget="Varies"
              stars={1}
            />
            <GrantCard
              code="F31 / F32"
              name="Individual Fellowships"
              what="Predoctoral (F31) and postdoctoral (F32) fellowships for individual researchers."
              why="These fund people, not labs. Almost never involve equipment purchases. Skip them."
              budget="Varies"
              stars={1}
            />
            <GrantCard
              code="K Awards"
              name="Career Development Awards (K01, K08, K23, K99/R00)"
              what="Career development awards that give junior faculty protected research time and a small budget."
              why="Small budgets, mostly for salary support. Once in a while they'll buy a small piece of equipment, but don't build your pipeline around these."
              budget="Small"
              stars={1}
            />
          </div>
        </section>

        {/* Section 6 – Equipment-Specific Grants */}
        <section id="equipment">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Equipment-Specific Grants
          </h2>
          <p className="text-[var(--color-gray-500)] mb-8">
            Your favorite grants. These exist specifically to buy instruments.
          </p>
          <div className="grid gap-6">
            <GrantCard
              code="S10"
              name="Shared Instrumentation Grant"
              what="THE equipment grant. Explicitly funds one piece of shared equipment costing $50K-$600K."
              why="This is basically a purchase order with NIH funding attached. If an S10 gets awarded in your territory, someone is buying exactly one major instrument. The abstract usually names what it is."
              budget="$50K–$600K"
              stars={5}
            />
            <GrantCard
              code="S10OD"
              name="High-End Instrumentation (HEI) Grant"
              what="The bigger version of S10. For instruments costing $600K+."
              why="Cryo-EMs, high-end mass specs, advanced imaging systems. These are the whale deals. If you see one, drop everything and call."
              budget="$600K–$2M+"
              stars={5}
            />
            <GrantCard
              code="C06"
              name="Construction Grant"
              what="Funds facility construction and renovation at research institutions."
              why="New building going up? Every lab in it will need equipment. Get in early."
              budget="Varies"
              stars={3}
            />
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="reference-table">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            Quick Reference Table
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--color-gray-100)]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-[var(--color-gray-50)] text-[var(--color-gray-700)]">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Grant Type
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Typical Budget
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Equipment Signal
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.type}
                    className={
                      i % 2 === 0 ? "bg-white" : "bg-[var(--color-gray-50)]"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-[var(--color-gray-900)] whitespace-nowrap">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-gray-700)] whitespace-nowrap">
                      {row.budget}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Stars count={row.stars} />
                        <span className="text-[var(--color-gray-500)]">
                          {row.signal}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          row.priority === "Immediate"
                            ? "bg-[var(--color-accent)]/15 text-[var(--color-accent-dark)]"
                            : row.priority === "Primary"
                              ? "bg-[var(--color-brand-light)] text-[var(--color-brand)]"
                              : row.priority === "Secondary"
                                ? "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]"
                                : row.priority === "Watch list"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-[var(--color-gray-100)] text-[var(--color-gray-500)]"
                        }`}
                      >
                        {row.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-b from-[var(--color-dark)] to-[#0D1F3C] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Want to see which grants were just awarded in your state?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Lab Leads Pro tracks new awards every week from NIH and 7 other
            federal agencies, filtered to your territory and scored for
            equipment purchasing signals.
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
