import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideSchema from "@/components/GuideSchema";

export const metadata: Metadata = {
  title:
    "Federal Research Agencies Guide for Equipment Sales | Lab Leads Pro",
  description:
    "Beyond NIH: 8 federal agencies that fund lab equipment purchases. Learn what each agency funds, their budgets, and why they matter for life-science equipment sales.",
  keywords:
    "federal research agencies, NIH funding, NSF grants, DOD research, DOE science, NASA research, USDA research, VA research, CDC funding, lab equipment sales, research grant agencies",
  openGraph: {
    title: "Federal Research Agencies Guide for Equipment Sales",
    description:
      "8 federal agencies fund lab equipment purchases. Here's what every life-science sales rep needs to know.",
    url: "https://lableadspro.com/funding-agencies-guide",
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

/* ── molecular background (subtle) ───────────────────────── */

function MolecularBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] to-white">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="mol-grid-ag"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-ag)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/* ── agency section component ─────────────────────────────── */

interface KeyProgram {
  name: string;
  detail: string;
}

interface AgencySectionProps {
  id: string;
  abbr: string;
  name: string;
  budget: string;
  overview: string;
  who?: string;
  whyItMatters: string;
  programs: KeyProgram[];
  dataNote: string;
  stars: number;
  guideLink?: string;
}

function AgencySection({
  id,
  abbr,
  name,
  budget,
  overview,
  who,
  whyItMatters,
  programs,
  dataNote,
  stars,
  guideLink,
}: AgencySectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="rounded-xl border border-[var(--color-gray-100)] bg-white overflow-hidden hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all">
        {/* Header */}
        <div className="bg-[var(--color-gray-50)] px-6 py-4 border-b border-[var(--color-gray-100)]">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-sm font-bold bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full">
              {abbr}
            </span>
            <Stars count={stars} />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-gray-900)]">
            {name}
          </h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">
              Overview
            </h3>
            <div className="flex flex-wrap gap-3 mb-3">
              <span className="text-xs font-semibold bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full">
                {budget}
              </span>
            </div>
            <p className="text-sm text-[var(--color-gray-700)]">{overview}</p>
            {who && (
              <p className="text-sm text-[var(--color-gray-500)] mt-1">
                <span className="font-medium">Who gets the money:</span> {who}
              </p>
            )}
          </div>

          {/* Why it matters */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">
              Why It Matters for Equipment Sales
            </h3>
            <p className="text-sm text-[var(--color-gray-700)]">
              {whyItMatters}
            </p>
          </div>

          {/* Key programs */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">
              Key Programs
            </h3>
            <ul className="space-y-2">
              {programs.map((p) => (
                <li key={p.name} className="text-sm text-[var(--color-gray-700)]">
                  <span className="font-semibold text-[var(--color-gray-900)]">
                    {p.name}
                  </span>{" "}
                  - {p.detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Data note */}
          <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
            <p className="text-xs text-[var(--color-gray-500)]">
              <span className="font-semibold text-[var(--color-gray-700)]">
                Data in Lab Leads Pro:
              </span>{" "}
              {dataNote}
            </p>
          </div>

          {/* Deep-dive guide link */}
          {guideLink && (
            <Link
              href={guideLink}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline"
            >
              Read the full {abbr} deep-dive guide
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── comparison table data ────────────────────────────────── */

const tableRows = [
  { agency: "NIH", budget: "~$48B", stars: 5, relevance: "Core", signal: "All categories" },
  { agency: "NSF", budget: "~$9B", stars: 4, relevance: "Strong", signal: "Broad + MRI grants" },
  { agency: "DOD", budget: "~$17B", stars: 3, relevance: "Significant", signal: "Biomedical + materials" },
  { agency: "DOE", budget: "~$8B", stars: 3, relevance: "Significant", signal: "Genomics, spectroscopy" },
  { agency: "NASA", budget: "~$7B", stars: 2, relevance: "Moderate", signal: "Biology, analytical" },
  { agency: "VA", budget: "~$1.9B", stars: 3, relevance: "Good", signal: "Same as academic" },
  { agency: "USDA", budget: "~$3.5B", stars: 3, relevance: "Good", signal: "Genomics, analytical" },
  { agency: "CDC", budget: "~$1B+", stars: 2, relevance: "Moderate", signal: "Sequencing, BSL" },
];

/* ── agencies data ────────────────────────────────────────── */

const agencies: AgencySectionProps[] = [
  {
    id: "nih",
    abbr: "NIH",
    name: "National Institutes of Health",
    budget: "~$48B annual budget",
    overview:
      "The biggest biomedical research funder in the world. 27 institutes and centers funding basic and clinical research across every disease area you can think of.",
    who: "Universities, medical schools, research hospitals, some biotech companies.",
    whyItMatters:
      "NIH is the foundation of the lab equipment market. Most academic research labs in the US run on NIH funding. Every institute funds research that needs equipment, from microscopes to sequencers to mass specs. If you're in life-science sales, NIH is your bread and butter.",
    programs: [
      { name: "NCI", detail: "National Cancer Institute, largest NIH institute at ~$7B/year. These labs buy imaging, sequencing, flow cytometry, everything." },
      { name: "NIAID", detail: "Allergy & Infectious Diseases, ~$6B. BSL-3/4 labs, advanced imaging, sequencing." },
      { name: "NIGMS", detail: "General Medical Sciences, ~$3B. Broad basic research. Microscopy, structural biology, biochemistry." },
      { name: "NHLBI", detail: "Heart, Lung, Blood, ~$4B. Imaging, physiology equipment, animal facility instrumentation." },
      { name: "NINDS", detail: "Neurological Disorders, ~$2.5B. Electrophysiology, two-photon microscopy, optogenetics rigs." },
    ],
    dataNote:
      "Full grant details, PI contact info, equipment need classification, weekly updates.",
    stars: 5,
    guideLink: "/nih-institutes-guide",
  },
  {
    id: "nsf",
    abbr: "NSF",
    name: "National Science Foundation",
    budget: "~$9B annual budget",
    overview:
      "Funds fundamental research across ALL sciences, not just biomedical. Physics, chemistry, engineering, computer science, earth science, and biology.",
    who: "Primarily universities. Very academic-focused.",
    whyItMatters:
      "NSF's biological sciences directorate (BIO) funds plant biology, ecology, evolutionary biology, and molecular biology labs that NIH-focused reps often miss. The big one to know about: NSF's Major Research Instrumentation (MRI) program directly funds equipment purchases, $100K-$4M. Basically their version of NIH's S10.",
    programs: [
      { name: "BIO", detail: "Biological Sciences. Microscopy, sequencing, environmental chambers." },
      { name: "MPS", detail: "Math & Physical Sciences. Spectroscopy, mass spec, analytical instruments." },
      { name: "ENG", detail: "Engineering. Biomedical engineering, materials testing, fabrication equipment." },
      { name: "MRI Program", detail: "Dedicated equipment grants, $100K-$4M. These are basically purchase orders." },
    ],
    dataNote:
      "Full grant details with abstracts (NSF API provides complete data), PI info, equipment classification.",
    stars: 4,
    guideLink: "/nsf-grants-guide",
  },
  {
    id: "dod",
    abbr: "DOD",
    name: "Department of Defense",
    budget: "~$17B research budget",
    overview:
      "Defense-relevant research, but this includes a LOT of biomedical and materials science work. Traumatic brain injury, infectious disease, cancer (CDMRP), prosthetics, advanced materials.",
    whyItMatters:
      "DOD research labs are some of the best-funded in the country. CDMRP (Congressionally Directed Medical Research Programs) funds billions in biomedical research at universities, basically parallel to NIH but focused on military-relevant health. Labs doing DOD-funded work buy the same microscopes, sequencers, and mass specs as NIH-funded labs.",
    programs: [
      { name: "CDMRP", detail: "Breast Cancer, Prostate Cancer, Neurotrauma, Tick-Borne Disease programs." },
      { name: "DARPA", detail: "Biological Technologies Office. Funds advanced biotech and bio-related engineering." },
      { name: "Army/Naval Research Labs", detail: "Materials science, optics, chemistry." },
    ],
    dataNote:
      "Award data via USASpending (shorter descriptions than NIH), PI/institution info, state filtering.",
    stars: 3,
    guideLink: "/dod-grants-guide",
  },
  {
    id: "doe",
    abbr: "DOE",
    name: "Department of Energy",
    budget: "~$8B science budget",
    overview:
      "Energy research, but also major investments in structural biology, genomics, materials science, and environmental science.",
    whyItMatters:
      "DOE runs the national labs (Argonne, Brookhaven, Oak Ridge, Lawrence Berkeley, etc.), which are massive research facilities with huge equipment budgets. DOE also funds university research in bioenergy, environmental genomics, and structural biology. Their BER program is a direct overlap with life-science equipment needs.",
    programs: [
      { name: "BER", detail: "Biological & Environmental Research. Genomics, proteomics, imaging." },
      { name: "BES", detail: "Basic Energy Sciences. Spectroscopy, X-ray, materials characterization." },
      { name: "National Labs", detail: "Institutional buyers with dedicated procurement." },
    ],
    dataNote:
      "Award data via USASpending, institution/PI info, state filtering.",
    stars: 3,
    guideLink: "/doe-grants-guide",
  },
  {
    id: "nasa",
    abbr: "NASA",
    name: "National Aeronautics and Space Administration",
    budget: "~$7B research budget",
    overview:
      "Space biology, astrobiology, earth science, human health in space, materials science.",
    whyItMatters:
      "NASA-funded labs study microgravity effects on cells, grow plants in controlled environments, do advanced imaging, and run analytical chemistry on everything from Martian soil analogs to astronaut biospecimens. These are real labs with real equipment budgets. Just with cooler mission statements.",
    programs: [
      { name: "Space Biology", detail: "Cell culture, microscopy, environmental chambers." },
      { name: "Human Research Program", detail: "Clinical and translational equipment." },
      { name: "Earth Science", detail: "Remote sensing, analytical instruments." },
    ],
    dataNote:
      "Award data via USASpending, institution/PI info, state filtering.",
    stars: 2,
    guideLink: "/nasa-grants-guide",
  },
  {
    id: "va",
    abbr: "VA",
    name: "Department of Veterans Affairs",
    budget: "~$1.9B research budget",
    overview:
      "Research directly tied to veteran health. PTSD, traumatic brain injury, prosthetics, cancer, infectious disease, aging.",
    whyItMatters:
      "VA medical centers have research wings that work just like university labs. They buy the same equipment, but procurement is federal, which means longer sales cycles but more predictable budgets. VA researchers often hold joint appointments at nearby universities, so you might already know them.",
    programs: [
      { name: "Biomedical Laboratory R&D", detail: "Basic science, same equipment as academic labs." },
      { name: "Clinical Science R&D", detail: "Clinical trials infrastructure." },
      { name: "Rehabilitation R&D", detail: "Prosthetics, assistive tech, engineering equipment." },
    ],
    dataNote:
      "Award data via USASpending, institution info, state filtering.",
    stars: 3,
    guideLink: "/va-grants-guide",
  },
  {
    id: "usda",
    abbr: "USDA",
    name: "Department of Agriculture",
    budget: "~$3.5B research budget",
    overview:
      "Agricultural research, food safety, animal health, plant biology, environmental science.",
    whyItMatters:
      "USDA-funded labs do serious molecular biology: genomics, proteomics, microscopy, analytical chemistry. Land-grant universities (every state has one) are major USDA research recipients. These labs need the same sequencers, microscopes, and mass specs as any biomedical lab. They're just studying crops, livestock, and food pathogens instead of human disease.",
    programs: [
      { name: "NIFA", detail: "National Institute of Food & Agriculture. Competitive grants to universities." },
      { name: "ARS", detail: "Agricultural Research Service. USDA's own research labs (100+ locations)." },
      { name: "AFRI", detail: "Agriculture & Food Research Initiative. NIFA's largest competitive grant program." },
    ],
    dataNote:
      "Award data via USASpending, institution info, state filtering.",
    stars: 3,
    guideLink: "/usda-grants-guide",
  },
  {
    id: "cdc",
    abbr: "CDC",
    name: "Centers for Disease Control and Prevention",
    budget: "~$1B+ extramural research",
    overview:
      "Public health research, epidemiology, infectious disease surveillance, environmental health, laboratory science.",
    whyItMatters:
      "CDC funds university and state public health labs working on pathogen surveillance, antimicrobial resistance, environmental monitoring, and diagnostic development. These labs use biosafety equipment, sequencers, PCR systems, mass specs, and microscopes. CDC's own labs in Atlanta are major equipment buyers.",
    programs: [
      { name: "Emerging Infections Programs", detail: "Surveillance networks with lab components." },
      { name: "Advanced Molecular Detection (AMD)", detail: "Genomic sequencing for public health." },
      { name: "Environmental Health Lab", detail: "Analytical chemistry, toxicology." },
    ],
    dataNote:
      "Award data via USASpending, institution info, state filtering.",
    stars: 2,
    guideLink: "/cdc-grants-guide",
  },
];

/* ── page component ───────────────────────────────────────── */

export default function AgenciesGuide() {
  const jumpLinks = agencies.map((a) => ({ id: a.id, label: a.abbr }));

  return (
    <>
      <GuideSchema
        title="Federal Research Agencies Guide for Equipment Sales"
        description="Beyond NIH: 8 federal agencies that fund lab equipment purchases. Learn what each agency funds, their budgets, and why they matter for life-science equipment sales."
        url="https://lableadspro.com/funding-agencies-guide"
        faqs={[
          { question: "What federal agencies fund research lab equipment?", answer: "Eight major agencies fund lab equipment: NIH (largest, ~$48B/year), NSF (~$11B), DOD (~$18B for research), DOE (~$8B), NASA (~$8B), VA (~$1.9B), USDA (~$3.8B), and CDC (~$7.5B). NIH alone funds over 70% of academic biomedical research equipment purchases." },
          { question: "Which agency spends the most on lab equipment?", answer: "NIH is by far the largest funder of lab equipment in the life sciences, with over $48 billion in annual research funding. Their S10 grant program is specifically designed for shared instrumentation purchases." },
          { question: "How can sales reps find grants from these agencies?", answer: "Lab Leads Pro aggregates grants from all 8 federal agencies into a searchable database with over 450,000 grants, PI contact information, and keyword search. NIH Reporter is also a free option for NIH-only grants." },
          { question: "What is an S10 grant?", answer: "S10 grants are NIH Shared Instrumentation Grants specifically for purchasing major equipment ($50K-$600K+). They are the strongest equipment purchase signal in federal funding." },
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
              href="/guides"
              className="hover:text-[var(--color-brand)] transition-colors"
            >
              Guides
            </Link>
            <span>/</span>
            <span className="text-[var(--color-gray-700)]">
              Agencies Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            Federal Agencies:{" "}
            <span className="text-[var(--color-brand)]">
              Who Funds Lab Equipment Purchases
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            NIH gets all the attention, but it&apos;s not the only agency
            funding labs. Federal research spending is spread across 8 major
            agencies, each with different missions, different research, and
            different buying patterns. If you&apos;re only watching NIH,
            you&apos;re leaving 30-40% of federal research funding on the table.
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
            {jumpLinks.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm px-3 py-1 rounded-full border border-[var(--color-gray-300)] text-[var(--color-gray-700)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
              >
                {s.label}
              </a>
            ))}
            <a
              href="#comparison-table"
              className="text-sm px-3 py-1 rounded-full border border-[var(--color-gray-300)] text-[var(--color-gray-700)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
            >
              Comparison Table
            </a>
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        {agencies.map((a) => (
          <AgencySection key={a.id} {...a} />
        ))}

        {/* Comparison Table */}
        <section id="comparison-table" className="pt-10">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            Agency Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--color-gray-100)]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-[var(--color-gray-50)] text-[var(--color-gray-700)]">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Agency
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Annual Research Budget
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Life-Science Relevance
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Equipment Signal
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.agency}
                    className={
                      i % 2 === 0 ? "bg-white" : "bg-[var(--color-gray-50)]"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-[var(--color-gray-900)] whitespace-nowrap">
                      {row.agency}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-gray-700)] whitespace-nowrap">
                      {row.budget}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Stars count={row.stars} />
                        <span className="text-[var(--color-gray-500)]">
                          {row.relevance}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-gray-700)]">
                      {row.signal}
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
            Lab Leads Pro tracks new awards from all 8 agencies every week
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report for your state, filtered to your territory and
            scored for equipment purchasing signals.
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
