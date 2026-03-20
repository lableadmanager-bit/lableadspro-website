import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "USDA Grants Guide for Lab Equipment Sales Reps | Lab Leads Pro",
  description:
    "USDA spends $3.5B on research, but most of their $200B budget is farm subsidies and SNAP benefits. Learn which USDA programs actually buy lab equipment and which ones to skip entirely.",
  keywords:
    "USDA grants, NIFA grants, AFRI grants, ARS research, USDA research funding, agricultural research equipment, lab equipment sales, USDA SBIR, land-grant university research, food safety equipment",
  openGraph: {
    title: "USDA Grants Guide for Lab Equipment Sales Reps",
    description:
      "Most USDA spending will never touch a lab. Here's how to find the research grants that actually buy equipment.",
    url: "https://lableadspro.com/database/guides/usda-grants",
    siteName: "Lab Leads Pro",
    type: "article",
  },
};

/* -- star helpers --------------------------------------------------------- */

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

/* -- molecular background (subtle) ---------------------------------------- */

function MolecularBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] to-white">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="mol-grid-usda"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-usda)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/* -- agency section component --------------------------------------------- */

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
        </div>
      </div>
    </section>
  );
}

/* -- noise item component ------------------------------------------------- */

interface NoiseItemProps {
  name: string;
  description: string;
  verdict: string;
}

function NoiseItem({ name, description, verdict }: NoiseItemProps) {
  return (
    <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className="text-sm font-bold bg-red-50 text-red-600 px-3 py-1 rounded-full">
          Skip
        </span>
        <h3 className="text-lg font-bold text-[var(--color-gray-900)]">
          {name}
        </h3>
      </div>
      <p className="text-sm text-[var(--color-gray-700)] mb-2">{description}</p>
      <p className="text-sm font-medium text-red-600">{verdict}</p>
    </div>
  );
}

/* -- research agencies data ----------------------------------------------- */

const researchAgencies: AgencySectionProps[] = [
  {
    id: "nifa",
    abbr: "NIFA",
    name: "National Institute of Food & Agriculture",
    budget: "~$1.7B annual budget",
    overview:
      "USDA's main competitive grants agency. Think of it as USDA's version of NIH, funding extramural research at universities. NIFA runs the biggest competitive grant programs in agriculture.",
    who: "Land-grant universities, other research universities, some private institutions and nonprofits.",
    whyItMatters:
      "NIFA's competitive grants are where the real equipment purchases happen. A new AFRI grant in plant genomics or food safety means somebody is setting up a lab and buying instruments. The capacity grants (Hatch, Evans-Allen) provide steady baseline funding that keeps university ag labs equipped year after year.",
    programs: [
      { name: "AFRI (Agriculture & Food Research Initiative)", detail: "The big one. ~$700M/year in competitive, peer-reviewed grants. Plant genomics, animal health, food safety, bioenergy, water quality. Closest thing to NIH R01s in agriculture. This is where equipment purchases happen." },
      { name: "SBIR/STTR", detail: "Small business innovation grants, same concept as NIH SBIR but for ag-tech startups. Phase I ~$100K, Phase II up to $600K. Startups building out first labs." },
      { name: "Hatch Act Capacity Grants", detail: "Formula funding to land-grant university experiment stations. Not competitive, but provides steady equipment budgets. Every state gets a share." },
      { name: "McIntire-Stennis Forestry Research", detail: "Formula funding for forestry research at land-grant universities. Smaller budgets but consistent." },
      { name: "Evans-Allen Program", detail: "Capacity funding specifically for 1890 land-grant institutions (historically Black universities). Equipment line items are common because these schools are building capacity." },
    ],
    dataNote:
      "Full award details via USASpending API, PI and institution info, equipment need classification. We filter NIFA awards to surface the competitive research grants and flag capacity grants with equipment signals.",
    stars: 4,
  },
  {
    id: "ars",
    abbr: "ARS",
    name: "Agricultural Research Service",
    budget: "~$1.8B annual budget",
    overview:
      "USDA's own in-house research labs. About 100 locations across the country staffed by federal scientists. This is intramural research, not grants to universities.",
    who: "USDA employees at ARS lab facilities. Not grants in the traditional sense.",
    whyItMatters:
      "ARS labs are significant equipment buyers, but the sales process is different. These are federal facilities, so procurement goes through GSA schedules, set-aside contracts, and federal purchasing rules. Longer sales cycles but predictable budgets. If you sell through federal channels, ARS is a solid customer base.",
    programs: [
      { name: "Food Safety Research", detail: "Pathogen detection, contamination testing. Mass spec, PCR systems, biosafety equipment." },
      { name: "Crop Improvement", detail: "Plant genomics, breeding technology. Sequencers, growth chambers, imaging systems." },
      { name: "Animal Disease Research", detail: "Plum Island, Ames (NADC), and other BSL-3 facilities. Significant biosafety and diagnostic equipment." },
      { name: "Natural Resources & Sustainable Ag", detail: "Soil science, water quality, environmental monitoring equipment." },
    ],
    dataNote:
      "ARS procurement data captured via federal spending records. We track facility-level spending patterns and flag locations with active equipment procurement.",
    stars: 3,
  },
  {
    id: "forest-service",
    abbr: "FS R&D",
    name: "Forest Service Research & Development",
    budget: "~$300M annual budget",
    overview:
      "The research arm of the Forest Service. Five research stations and the Forest Products Laboratory studying forestry, ecology, watershed science, and wood products.",
    who: "Forest Service scientists at research stations, plus cooperative agreements with universities.",
    whyItMatters:
      "Smaller equipment budgets than NIFA or ARS, but these are real analytical labs doing environmental chemistry, GIS/remote sensing, ecological monitoring, and materials science (wood products). If you sell environmental monitoring or analytical chemistry instruments, Forest Service R&D is worth knowing about.",
    programs: [
      { name: "Forest Inventory & Analysis", detail: "Nationwide forest monitoring. Remote sensing, GIS, field sampling equipment." },
      { name: "Forest Products Lab (Madison, WI)", detail: "Materials testing, wood chemistry, analytical instruments." },
      { name: "Watershed & Air Quality Research", detail: "Water quality analyzers, atmospheric monitoring, soil analysis equipment." },
    ],
    dataNote:
      "Award data via USASpending for cooperative agreements. Intramural procurement tracked through federal spending records.",
    stars: 2,
  },
];

/* -- noise programs data -------------------------------------------------- */

const noisePrograms: NoiseItemProps[] = [
  {
    name: "Extension Services",
    description: "Teaching programs, 4-H youth development, agricultural outreach, master gardener programs. Extension agents teach farmers best practices. They run workshops, not experiments.",
    verdict: "Zero lab equipment. Skip entirely.",
  },
  {
    name: "Rural Development",
    description: "Housing loans, broadband infrastructure grants, water and sewer projects, business development loans for rural communities. The Rural Development budget is billions, and none of it touches a laboratory.",
    verdict: "Not even remotely research-related. Skip.",
  },
  {
    name: "Farm Service Agency (FSA)",
    description: "Crop loans, disaster payments, conservation reserve programs, commodity price supports. FSA is basically a bank and insurance company for farmers.",
    verdict: "Nobody is buying a microscope with a crop loan. Skip.",
  },
  {
    name: "Food & Nutrition Service (FNS)",
    description: "SNAP (food stamps), school lunch programs, WIC, senior nutrition. This is the single biggest chunk of USDA's budget at ~$120B/year. It feeds people.",
    verdict: "Massive budget, zero equipment relevance. Not one dollar goes to research.",
  },
  {
    name: "APHIS (Animal & Plant Health Inspection Service)",
    description: "Regulatory inspection, quarantine enforcement, wildlife damage management, import/export certification. Mostly field inspectors, not lab scientists.",
    verdict: "Occasional diagnostic lab work (veterinary diagnostics), but 95% of APHIS is regulatory and inspection. Low priority.",
  },
  {
    name: "Marketing & Regulatory Programs",
    description: "Grading beef, inspecting grain elevators, organic certification, cotton classing. Quality assurance and standards enforcement.",
    verdict: "Inspection equipment, not research equipment. Different buyer, different market.",
  },
  {
    name: "Natural Resources Conservation Service (NRCS)",
    description: "Soil conservation planning, land management assistance, technical help for farmers on erosion control, water management, and habitat restoration.",
    verdict: "Field work and technical assistance. No lab component worth pursuing.",
  },
];

/* -- equipment signals data ----------------------------------------------- */

const equipmentSignals = [
  { category: "Genomics & Sequencing", examples: "Crop genomics, animal genetics, pathogen identification, microbiome studies", where: "NIFA (AFRI), ARS" },
  { category: "Mass Spectrometry", examples: "Food safety testing, pesticide residue analysis, mycotoxin detection, metabolomics", where: "ARS, NIFA" },
  { category: "Microscopy", examples: "Plant pathology, entomology, cellular biology, materials science (wood products)", where: "NIFA, ARS, FS R&D" },
  { category: "Chromatography (HPLC, GC-MS)", examples: "Food chemistry, environmental contaminant analysis, nutritional analysis", where: "ARS, NIFA" },
  { category: "Environmental Monitoring", examples: "Soil analyzers, weather stations, water quality sensors, atmospheric monitoring", where: "FS R&D, NIFA, ARS" },
  { category: "Fermentation & Bioprocessing", examples: "Bioenergy research, biofuel development, fermentation scale-up", where: "NIFA (AFRI)" },
  { category: "BSL-2/3 Equipment", examples: "Animal disease research, zoonotic pathogen work, food pathogen labs", where: "ARS (Plum Island, Ames)" },
];

/* -- comparison table data ------------------------------------------------ */

const tableRows = [
  { program: "NIFA - AFRI", budget: "~$700M", stars: 4, signal: "Primary", notes: "Competitive grants. Best equipment signal in USDA." },
  { program: "NIFA - SBIR/STTR", budget: "~$25M", stars: 3, signal: "Good", notes: "Ag-tech startups building first labs." },
  { program: "NIFA - Capacity (Hatch)", budget: "~$250M", stars: 2, signal: "Moderate", notes: "Steady but smaller equipment line items." },
  { program: "ARS (intramural)", budget: "~$1.8B", stars: 3, signal: "Good", notes: "Federal procurement. GSA schedules." },
  { program: "Forest Service R&D", budget: "~$300M", stars: 2, signal: "Niche", notes: "Analytical chemistry, environmental monitoring." },
  { program: "Extension Services", budget: "~$500M", stars: 0, signal: "None", notes: "Teaching, not research. Skip." },
  { program: "Rural Development", budget: "~$40B", stars: 0, signal: "None", notes: "Housing and infrastructure loans. Skip." },
  { program: "Farm Service Agency", budget: "~$30B", stars: 0, signal: "None", notes: "Crop loans, disaster payments. Skip." },
  { program: "Food & Nutrition (SNAP)", budget: "~$120B", stars: 0, signal: "None", notes: "Feeds people, not labs. Skip." },
  { program: "APHIS", budget: "~$1.1B", stars: 1, signal: "Rare", notes: "Mostly regulatory. Rare diagnostic lab." },
  { program: "NRCS", budget: "~$4B", stars: 0, signal: "None", notes: "Field conservation work. Skip." },
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "the-problem", label: "The USDA Problem" },
  { id: "real-research", label: "Where the Research Is" },
  { id: "the-noise", label: "The Noise" },
  { id: "equipment-signals", label: "Equipment Signals" },
  { id: "how-we-filter", label: "How We Filter" },
  { id: "comparison-table", label: "Quick Reference" },
];

/* -- page component ------------------------------------------------------- */

export default function USDAGrantsGuide() {
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
              USDA Grants Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            USDA Grants:{" "}
            <span className="text-[var(--color-brand)]">
              Finding Lab Equipment Leads in a $200B Haystack
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            USDA spends about $3.5B on research, but their total budget is over
            $200B. Most of that is food stamps, farm subsidies, and rural housing
            loans. For a sales rep trying to find labs that actually buy equipment,
            USDA data is 95% noise. Here&apos;s how to cut through it.
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
        {/* The USDA Problem */}
        <section id="the-problem" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The USDA Problem
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Why USDA data is uniquely painful for equipment sales reps.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              USDA&apos;s total budget is over $200B per year. That sounds huge, but
              here&apos;s where it actually goes: roughly $120B is SNAP benefits
              (food stamps). Another $30B+ is crop insurance and farm commodity
              programs. Billions more go to rural housing loans, broadband
              infrastructure, and conservation payments to farmers. The actual
              research budget? About $3.5B spread across a handful of agencies.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              It gets worse. Even within that $3.5B &quot;research&quot; number, a
              significant chunk goes to extension services (teaching farmers best
              practices, running 4-H programs, hosting workshops). Extension is
              valuable work, but nobody at a county extension office is buying a
              mass spectrometer.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              If you pull USDA data from USASpending and try to prospect from it
              raw, you&apos;ll spend hours scrolling past rural water system grants,
              school lunch reimbursements, and crop disaster payments before you
              find a single PI doing bench science. It&apos;s the worst
              signal-to-noise ratio of any federal agency.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The bottom line:
                </span>{" "}
                About 1.5% of USDA&apos;s total budget funds research that
                involves lab equipment. The other 98.5% is completely irrelevant
                to your pipeline. You need a filter.
              </p>
            </div>
          </div>
        </section>

        {/* Where the Real Research Lives */}
        <section id="real-research" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Where the Real Research Lives
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Three USDA programs actually fund labs that buy equipment. Focus here.
          </p>
          <div className="space-y-8">
            {researchAgencies.map((a) => (
              <AgencySection key={a.id} {...a} />
            ))}
          </div>
        </section>

        {/* The Noise */}
        <section id="the-noise" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The Noise: What We Filter Out
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            These programs show up in USDA spending data. None of them are
            lab equipment opportunities. We remove all of this so you don&apos;t
            have to.
          </p>
          <div className="grid gap-4">
            {noisePrograms.map((p) => (
              <NoiseItem key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* Equipment Signals */}
        <section id="equipment-signals" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Equipment Signals in USDA Research
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            What USDA-funded labs actually buy. If you sell any of these
            categories, USDA research is relevant to your pipeline.
          </p>
          <div className="grid gap-4">
            {equipmentSignals.map((sig) => (
              <div
                key={sig.category}
                className="rounded-xl border border-[var(--color-gray-100)] bg-white p-5 hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-base font-bold text-[var(--color-gray-900)]">
                    {sig.category}
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-gray-700)] mb-2">
                  {sig.examples}
                </p>
                <p className="text-xs text-[var(--color-gray-500)]">
                  <span className="font-semibold">Where to look:</span>{" "}
                  {sig.where}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How Lab Leads Pro Filters */}
        <section id="how-we-filter" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            How Lab Leads Pro Filters USDA Data
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            We do the painful work so you don&apos;t have to.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <p className="text-sm text-[var(--color-gray-700)]">
                  <span className="font-semibold text-[var(--color-gray-900)]">Pull from USASpending API</span>{" "}
                  which captures all USDA grant awards, contracts, and cooperative agreements across every sub-agency.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <p className="text-sm text-[var(--color-gray-700)]">
                  <span className="font-semibold text-[var(--color-gray-900)]">AI classification identifies research awards</span>{" "}
                  that mention lab work, scientific equipment needs, or research methodologies requiring instruments.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <p className="text-sm text-[var(--color-gray-700)]">
                  <span className="font-semibold text-[var(--color-gray-900)]">Filter out extension, education, and community development</span>{" "}
                  programs that have zero lab equipment relevance, along with all FSA, FNS, Rural Development, and NRCS spending.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <p className="text-sm text-[var(--color-gray-700)]">
                  <span className="font-semibold text-[var(--color-gray-900)]">What&apos;s left are actual research grants</span>{" "}
                  where PIs are doing bench science, field research with analytical instruments, or building out lab capacity at land-grant universities.
                </p>
              </li>
            </ul>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Result:
                </span>{" "}
                You get USDA leads without spending hours filtering through farm
                subsidies and school lunch reimbursements. Just the grants where
                someone is actually buying equipment.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="comparison-table" className="pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            USDA Programs: Quick Reference
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--color-gray-100)]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-[var(--color-gray-50)] text-[var(--color-gray-700)]">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Program
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Annual Budget
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Equipment Signal
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.program}
                    className={
                      i % 2 === 0 ? "bg-white" : "bg-[var(--color-gray-50)]"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-[var(--color-gray-900)] whitespace-nowrap">
                      {row.program}
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
                    <td className="px-4 py-3 text-[var(--color-gray-700)]">
                      {row.notes}
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
            Lab Leads Pro filters USDA data so you don&apos;t have to
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with USDA research grants in your state,
            pre-filtered to remove the noise and scored for equipment
            purchasing signals.
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
