import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideSchema from "@/components/GuideSchema";

export const metadata: Metadata = {
  title: "DOD Research Grants Guide for Lab Equipment Sales Reps | Lab Leads Pro",
  description:
    "DOD spends $17B on research, including billions at universities through CDMRP biomedical programs, DARPA biotech, and service lab grants. Learn which DOD programs buy lab equipment.",
  keywords:
    "DOD grants, CDMRP, defense research grants, DARPA BTO, Army Research Office, ONR grants, AFOSR, military research funding, lab equipment sales, DOD biomedical research",
  openGraph: {
    title: "DOD Research Grants Guide for Lab Equipment Sales Reps",
    description:
      "Billions in DOD research flows through universities buying the same equipment as NIH-funded labs. Here is what every equipment rep needs to know.",
    url: "https://lableadspro.com/dod-grants-guide",
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
            id="mol-grid-dod"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-dod)" />
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
  level?: "skip" | "caution";
}

function NoiseItem({ name, description, verdict, level = "skip" }: NoiseItemProps) {
  const isSkip = level === "skip";
  return (
    <div className={`rounded-xl border border-[var(--color-gray-100)] bg-white p-6 transition-all ${isSkip ? "hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5" : "hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/5"}`}>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${isSkip ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-700"}`}>
          {isSkip ? "Skip" : "Mostly Skip"}
        </span>
        <h3 className="text-lg font-bold text-[var(--color-gray-900)]">
          {name}
        </h3>
      </div>
      <p className="text-sm text-[var(--color-gray-700)] mb-2">{description}</p>
      <p className={`text-sm font-medium ${isSkip ? "text-red-600" : "text-yellow-700"}`}>{verdict}</p>
    </div>
  );
}

/* -- sections data -------------------------------------------------------- */

const sections: AgencySectionProps[] = [
  {
    id: "cdmrp",
    abbr: "CDMRP",
    name: "Congressionally Directed Medical Research Programs",
    budget: "~$3B+ annual budget",
    overview:
      "This is the one most equipment reps miss entirely. CDMRP funds billions in biomedical research at universities, running parallel to NIH. Congress earmarks money for specific diseases: breast cancer, prostate cancer, neurotrauma (TBI/PTSD), tick-borne disease, kidney cancer, lung cancer, and more. The research happens in university labs, not on military bases. The PIs are the same professors who hold NIH grants.",
    who: "University medical schools, cancer research centers, neuroscience departments. Same institutions as NIH.",
    whyItMatters:
      "CDMRP-funded labs buy the exact same equipment as NIH-funded labs. Flow cytometers, microscopes, sequencers, cell culture systems, mass spec. The difference is the funding source shows up as DOD instead of NIH, so most reps never see it. If you cover oncology or neuroscience equipment, CDMRP is free money you are probably ignoring.",
    programs: [
      { name: "Breast Cancer Research Program (BCRP)", detail: "One of the largest. Funds molecular biology, genomics, immunology research at major cancer centers." },
      { name: "Peer Reviewed Cancer Research Program (PRCRP)", detail: "Covers 15+ cancer types. Kidney, lung, melanoma, ovarian, and more. University-based research." },
      { name: "Traumatic Brain Injury/PTSD Research", detail: "Neurotrauma is a DOD priority. Imaging, electrophysiology, biomarker discovery. Real neuroscience labs." },
      { name: "Tick-Borne Disease Research Program", detail: "Lyme disease, diagnostics, microbiology. Growing program with increasing budgets." },
    ],
    dataNote:
      "CDMRP awards show up as DOD grants in USASpending. Descriptions are short one-liners, but our AI classification catches the biomedical keywords. Cross-reference with CDMRP\u0027s public award database for full abstracts.",
    stars: 5,
  },
  {
    id: "darpa-bto",
    abbr: "DARPA BTO",
    name: "DARPA Biological Technologies Office",
    budget: "~$500M+ annual budget",
    overview:
      "DARPA\u0027s biology arm funds cutting-edge biotech that is 5 to 10 years ahead of mainstream research. Synthetic biology, engineered organisms, biosensors, rapid diagnostics. These programs often start at universities and then move to defense contractors. The university-phase grants involve real wet labs doing real bench science.",
    who: "Top-tier research universities, biotech startups, some national labs.",
    whyItMatters:
      "Smaller volume than CDMRP, but the labs involved tend to be well-funded and buying premium equipment. Synthetic biology programs need bioreactors, fermenters, sequencers, and analytical instruments. Biosensor programs buy optical equipment and microfluidics. These are labs pushing boundaries, and they buy the latest gear.",
    programs: [
      { name: "Synthetic Biology Programs", detail: "Engineered organisms, gene editing, metabolic engineering. Bioreactors, fermenters, sequencers, analytical chemistry." },
      { name: "Biosensor Development", detail: "Point-of-care diagnostics, environmental detection. Optical instruments, microfluidics, assay development equipment." },
      { name: "Pandemic Preparedness", detail: "Rapid vaccine and therapeutic development platforms. Cell culture, bioprocessing, analytical instruments." },
    ],
    dataNote:
      "DARPA awards are harder to find in USASpending because descriptions are vague for security reasons. Our system flags DARPA-related grants when university performers are identifiable.",
    stars: 3,
  },
  {
    id: "service-labs",
    abbr: "SRL",
    name: "Army, Navy, and Air Force Research Labs",
    budget: "~$5B+ combined budget",
    overview:
      "The Army Research Lab (ARL), Naval Research Lab (NRL), and Air Force Research Lab (AFRL) are massive federal research facilities. They do materials science, optics, electronics, propulsion, and some biological/chemical defense research. They also fund university grants through programs like ARO (Army Research Office), ONR (Office of Naval Research), and AFOSR (Air Force Office of Scientific Research).",
    who: "Federal lab researchers (government employees) plus university grants through ARO, ONR, and AFOSR.",
    whyItMatters:
      "Two separate markets here. The federal labs themselves buy equipment through GSA and longer procurement cycles. But the university grants from ARO, ONR, and AFOSR work like normal academic grants. Materials science, optics, and electronics are the big categories. If you sell materials testing equipment, thermal analyzers, or optical instruments, these labs and their university grantees are buying.",
    programs: [
      { name: "ARO (Army Research Office)", detail: "University grants for materials science, physics, mathematical sciences. Materials testing, spectroscopy, imaging." },
      { name: "ONR (Office of Naval Research)", detail: "University grants for ocean science, materials, electronics. Sensors, materials characterization, environmental instruments." },
      { name: "AFOSR (Air Force Office of Scientific Research)", detail: "University grants for aerospace materials, optics, energy. Lasers, optical instruments, materials testing." },
      { name: "In-house Lab Research", detail: "Federal employees doing R&D at government facilities. Longer procurement cycles, GSA schedules, but big budgets." },
    ],
    dataNote:
      "University grants from ARO/ONR/AFOSR show up clearly in our data. In-house federal lab procurement is harder to track and follows different purchasing rules.",
    stars: 3,
  },
  {
    id: "dtra",
    abbr: "DTRA",
    name: "Defense Threat Reduction Agency",
    budget: "~$500M research budget",
    overview:
      "DTRA handles chemical, biological, radiological, and nuclear (CBRN) defense research. Think decontamination, detection, biosafety, and threat characterization. Some of this lands at universities, especially for biological detection and medical countermeasures.",
    who: "Defense contractors, some universities (especially BSL-3/4 labs), national labs.",
    whyItMatters:
      "Niche market, but consistent. Labs working on CBRN detection and biosafety buy specialized analytical instruments, biosafety equipment, and environmental monitoring systems. If you sell to BSL-3 or BSL-4 facilities, DTRA-funded work is a steady source of leads.",
    programs: [
      { name: "Chemical/Biological Defense", detail: "Detection systems, decontamination research. Analytical chemistry, mass spec, biosafety equipment." },
      { name: "Medical Countermeasures", detail: "Therapeutics and vaccines against biological threats. Cell culture, bioprocessing, analytical instruments." },
    ],
    dataNote:
      "DTRA awards in USASpending are often vague. Our classification catches biological and chemical keywords when they appear, but some awards lack enough detail for confident classification.",
    stars: 2,
  },
];

/* -- noise programs data -------------------------------------------------- */

const noisePrograms: NoiseItemProps[] = [
  {
    name: "Procurement Contracts for Non-Research Items",
    description: "DOD is the largest federal buyer of everything. Most DOD spending in USASpending is procurement: vehicles, weapons systems, IT infrastructure, facilities maintenance, uniforms, food service. This has zero connection to research labs.",
    verdict: "This is the biggest source of noise in DOD data. Our system filters it, but if you are searching raw USASpending data yourself, expect 90%+ of DOD records to be irrelevant.",
  },
  {
    name: "Facilities Maintenance and Construction",
    description: "Base construction, building maintenance, HVAC repairs, road work. Shows up constantly in DOD spending data.",
    verdict: "General construction is noise, but keep an eye out for lab renovations. Those often come with capital budget for new equipment.",
    level: "caution" as const,
  },
  {
    name: "IT and Cybersecurity Contracts",
    description: "Software licenses, network infrastructure, cybersecurity services, cloud computing contracts. DOD spends billions on IT. None of it involves lab instruments.",
    verdict: "Zero equipment relevance. Massive volume of noise.",
  },
  {
    name: "Classified/Restricted Programs",
    description: "Some DOD research is classified. These awards show up with minimal descriptions or generic titles. You cannot identify equipment needs, contact the PI, or even determine what the research is about.",
    verdict: "No actionable information. Skip and focus on the open programs like CDMRP.",
  },
];

/* -- equipment signals data ----------------------------------------------- */

const equipmentSignals = [
  { category: "Flow Cytometry", examples: "Cell sorting, immunophenotyping, cancer biomarkers", where: "CDMRP" },
  { category: "Microscopy", examples: "Confocal, fluorescence, electron microscopy for tissue analysis", where: "CDMRP, DARPA BTO" },
  { category: "Sequencing/Genomics", examples: "Cancer genomics, pathogen sequencing, synthetic biology", where: "CDMRP, DARPA BTO" },
  { category: "Materials Testing", examples: "Tensile testing, hardness, thermal analysis (DSC, TGA), fatigue testing", where: "Service Labs (ARL, AFRL)" },
  { category: "Spectroscopy/Optics", examples: "Raman, FTIR, laser systems, optical characterization", where: "Service Labs (AFRL, NRL)" },
  { category: "Mass Spectrometry", examples: "Proteomics, metabolomics, chemical detection, threat agent ID", where: "CDMRP, DTRA" },
  { category: "Biosafety Equipment", examples: "BSL cabinets, containment systems, decontamination", where: "DTRA" },
  { category: "Cell Culture/Bioprocessing", examples: "Bioreactors, fermenters, incubators, cell culture systems", where: "CDMRP, DARPA BTO" },
];

/* -- comparison table data ------------------------------------------------ */

const tableRows = [
  { program: "CDMRP", budget: "~$3B+", stars: 5, signal: "Primary", notes: "University biomedical research. Same as NIH." },
  { program: "DARPA BTO", budget: "~$500M+", stars: 3, signal: "Strong", notes: "Cutting-edge biotech. Premium equipment." },
  { program: "ARO/ONR/AFOSR (University)", budget: "~$2B+", stars: 3, signal: "Strong", notes: "Materials, optics, electronics at universities." },
  { program: "Service Labs (In-house)", budget: "~$5B+", stars: 2, signal: "Moderate", notes: "Federal procurement. GSA, longer cycles." },
  { program: "DTRA", budget: "~$500M", stars: 2, signal: "Moderate", notes: "CBRN defense. Niche but consistent." },
  { program: "Procurement Contracts", budget: "Hundreds of $B", stars: 0, signal: "None", notes: "Vehicles, IT, facilities. Skip." },
  { program: "Classified Programs", budget: "Unknown", stars: 0, signal: "None", notes: "No actionable data. Skip." },
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "why-dod", label: "Why DOD Matters" },
  { id: "key-programs", label: "Key Programs" },
  { id: "the-noise", label: "What to Skip" },
  { id: "equipment-signals", label: "Equipment Signals" },
  { id: "data-quality", label: "Data Quality" },
  { id: "comparison-table", label: "Quick Reference" },
];

/* -- page component ------------------------------------------------------- */

export default function DODGrantsGuide() {
  return (
    <>
      <GuideSchema
        title="DOD Research Grants Guide for Equipment Sales"
        description="Defense research labs, DARPA, and the military research funding landscape."
        url="https://lableadspro.com/dod-grants-guide"
        faqs={[
          { question: "Does the Department of Defense fund scientific research?", answer: "Yes. DOD spends approximately 18 billion dollars annually on research through agencies like DARPA, Army Research Lab, Naval Research Lab, and Air Force Research Lab. Many projects require advanced lab equipment." },
        ]}
      />
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
              href="/guides"
              className="hover:text-[var(--color-brand)] transition-colors"
            >
              Guides
            </Link>
            <span>/</span>
            <span className="text-[var(--color-gray-700)]">
              DOD Research Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            DOD Research Grants:{" "}
            <span className="text-[var(--color-brand)]">
              $17B in Defense Research, Including Billions at Universities
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            The Department of Defense spends roughly $17B a year on research.
            Most reps think that means classified weapons programs at military
            bases. Wrong. Billions flow through CDMRP to university biomedical
            labs doing cancer research, neurotrauma studies, and infectious
            disease work. It looks exactly like NIH research because it
            basically is. Then there are DARPA programs pushing the edge of
            synthetic biology and biotech. Plus three service research labs
            (Army, Navy, Air Force) that buy serious materials science and
            optics equipment.
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
        {/* Why DOD Matters */}
        <section id="why-dod" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Why DOD Matters for Equipment Sales
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            $17B in research funding, and billions of it lands at universities buying lab equipment.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              Most equipment reps see &quot;Department of Defense&quot; and
              immediately think classified military programs. That&apos;s a
              mistake. DOD is one of the largest funders of university research
              in the country, and a huge chunk of that money goes to biomedical
              labs that look exactly like NIH-funded labs.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              CDMRP alone puts over $3B a year into cancer research,
              neurotrauma, and infectious disease studies at university medical
              schools. The PIs are the same professors you already call on.
              They&apos;re buying the same flow cytometers, microscopes, and
              sequencers. The only difference is the check comes from DOD
              instead of NIH.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              Beyond biomedical, the service research offices (ARO, ONR, AFOSR)
              fund billions in materials science, optics, and electronics
              research at universities. If you sell analytical instruments,
              materials testing equipment, or optical systems, these programs
              are a significant part of your addressable market that you are
              probably not tracking.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The bottom line:
                </span>{" "}
                DOD is the noisiest agency in federal spending, but once you
                filter out the procurement contracts, the research grants are
                real lab-equipment leads. CDMRP in particular is basically a
                second NIH that most reps never check.
              </p>
            </div>
          </div>
        </section>

        {/* Key Programs */}
        <section id="key-programs" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Key DOD Research Programs
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Four program areas within DOD that actually fund lab research and
            buy equipment.
          </p>
          <div className="space-y-8">
            {sections.map((a) => (
              <AgencySection key={a.id} {...a} />
            ))}
          </div>
        </section>

        {/* The Noise */}
        <section id="the-noise" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            What to Skip
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            DOD spending data is 90%+ noise. These categories dominate the
            records but won&apos;t lead to equipment sales.
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
            Equipment Signals in DOD Research
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            What DOD-funded labs actually buy, and which programs to watch
            for each category.
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

        {/* Data Quality */}
        <section id="data-quality" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            DOD Data Quality
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            The noisiest agency in federal spending, but the research signal is there.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              DOD is by far the noisiest agency in USASpending. The Department
              of Defense is the largest single buyer in the federal government,
              and the vast majority of its spending is procurement contracts
              for non-research items. Vehicles, ammunition, IT services, base
              construction. For every research grant, there are hundreds of
              procurement records that have nothing to do with labs.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The good news is that the research programs are identifiable.
              CDMRP awards, university grants from ARO/ONR/AFOSR, and DARPA
              programs have distinct characteristics that our classification
              system can detect. When you see a DOD award going to a university
              medical school with keywords like &quot;breast cancer&quot; or
              &quot;traumatic brain injury,&quot; that is a real research grant.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              USASpending descriptions for DOD awards are typically short
              one-liners. You will not get the detailed abstracts that NSF
              provides. But between the performing institution, the funding
              program, and the description keywords, there is enough signal to
              classify most awards accurately.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Result:
                </span>{" "}
                DOD awards require more filtering than any other agency, but
                the research grants we surface are genuine lab-equipment leads.
                CDMRP awards in particular are some of the most reliable
                biomedical leads outside of NIH.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="comparison-table" className="pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            DOD Programs: Quick Reference
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
            Lab Leads Pro cuts through DOD noise to find research grants
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with DOD-funded research grants in your state,
            including CDMRP biomedical awards and service lab university grants,
            scored for equipment buying signals.
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
