import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NSF Grants Guide for Lab Equipment Sales Reps | Lab Leads Pro",
  description:
    "NSF funds $9B in research across ALL sciences, not just biomedical. The MRI program gives $100K-$4M specifically for equipment. Learn which NSF directorates buy lab instruments.",
  keywords:
    "NSF grants, NSF MRI program, Major Research Instrumentation, NSF BIO directorate, NSF CAREER awards, lab equipment sales, NSF research funding, plant biology equipment, materials science instruments",
  openGraph: {
    title: "NSF Grants Guide for Lab Equipment Sales Reps",
    description:
      "NSF's MRI program is basically a purchase order for instruments. Here's what every equipment rep needs to know about NSF funding.",
    url: "https://lableadspro.com/nsf-grants-guide",
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
            id="mol-grid-nsf"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-nsf)" />
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

/* -- directorates data ---------------------------------------------------- */

const directorates: AgencySectionProps[] = [
  {
    id: "bio",
    abbr: "BIO",
    name: "Directorate for Biological Sciences",
    budget: "~$900M annual budget",
    overview:
      "Plant biology, ecology, evolutionary biology, molecular biology, and neuroscience. BIO covers the life sciences that NIH doesn't touch, especially plant and environmental biology. If it's alive and it's not a human disease model, BIO probably funds it.",
    who: "University biology departments, ecology programs, botanical gardens, field stations, marine labs.",
    whyItMatters:
      "This is the directorate most life-science equipment reps should care about. BIO-funded labs buy microscopy systems, sequencers, environmental chambers, growth chambers, and imaging systems. Plant biology and ecology departments at land-grant universities are heavy BIO recipients, and they need the same core instruments as any molecular biology lab.",
    programs: [
      { name: "Molecular & Cellular Biosciences (MCB)", detail: "Molecular biology, cell biology, genetics. Sequencers, microscopes, cell culture equipment." },
      { name: "Integrative Organismal Systems (IOS)", detail: "Plant biology, animal physiology, neuroscience. Growth chambers, imaging systems, electrophysiology rigs." },
      { name: "Environmental Biology (DEB)", detail: "Ecology, evolution, systematics. Field equipment, environmental monitoring, analytical instruments for sample processing." },
      { name: "Biological Infrastructure (DBI)", detail: "Supports shared research resources and infrastructure. This is where BIO's equipment-heavy awards often land." },
    ],
    dataNote:
      "Full abstracts from NSF award data. Our AI classification accurately identifies equipment needs from BIO project descriptions, especially microscopy, sequencing, and environmental instrumentation.",
    stars: 4,
  },
  {
    id: "mps",
    abbr: "MPS",
    name: "Directorate for Mathematical & Physical Sciences",
    budget: "~$1.6B annual budget",
    overview:
      "Chemistry, physics, materials research, and astronomy. MPS is the largest NSF directorate by budget and covers the physical sciences that NIH rarely funds. If you sell analytical instruments, this is your territory.",
    who: "University chemistry departments, physics departments, materials science programs, national labs (some cooperative agreements).",
    whyItMatters:
      "If you sell NMR, mass spec, spectroscopy (UV-Vis, Raman, FTIR), X-ray diffraction, or any analytical instrument, MPS is a goldmine. Chemistry and materials science departments run through instruments constantly, and MPS is their primary federal funder. These departments often consolidate instrument purchases through shared facilities, which means bigger orders.",
    programs: [
      { name: "Chemistry (CHE)", detail: "Synthetic chemistry, analytical chemistry, physical chemistry. NMR, mass spec, chromatography, spectroscopy." },
      { name: "Materials Research (DMR)", detail: "Materials science, condensed matter physics. X-ray diffraction, electron microscopy, thermal analysis, mechanical testing." },
      { name: "Physics (PHY)", detail: "Experimental physics, optics, quantum science. Lasers, cryogenics, vacuum systems, detectors." },
      { name: "Astronomical Sciences (AST)", detail: "Telescopes and detector systems. Niche unless you sell optical/detector equipment." },
    ],
    dataNote:
      "Full abstracts with detailed methodology descriptions. Chemistry and materials awards frequently name specific analytical techniques, making equipment need classification highly accurate.",
    stars: 3,
  },
  {
    id: "eng",
    abbr: "ENG",
    name: "Directorate for Engineering",
    budget: "~$1B annual budget",
    overview:
      "Biomedical engineering, chemical engineering, materials engineering, electrical engineering, and civil engineering. ENG bridges the gap between fundamental science and practical applications. There's significant overlap with biomedical research at engineering schools.",
    who: "University engineering departments, interdisciplinary research centers, some industry partnerships.",
    whyItMatters:
      "Engineering labs buy materials testing equipment, bioprocessing systems, analytical instruments, and fabrication equipment. Biomedical engineering is a growing slice of ENG funding, so you'll see familiar life-science instruments (flow cytometers, bioreactors, imaging systems) showing up in engineering departments. Chemical engineering and materials engineering programs are consistent instrument buyers.",
    programs: [
      { name: "Chemical, Bioengineering, Environmental & Transport Systems (CBET)", detail: "Bioprocessing, environmental engineering, chemical reactors. Bioreactors, analytical instruments, environmental testing." },
      { name: "Civil, Mechanical & Manufacturing Innovation (CMMI)", detail: "Materials testing, manufacturing processes, structural testing. Tensile testers, rheometers, fabrication equipment." },
      { name: "Electrical, Communications & Cyber Systems (ECCS)", detail: "Semiconductor fabrication, photonics, sensors. Cleanroom equipment, measurement instruments." },
      { name: "Engineering Education & Centers (EEC)", detail: "Multi-institution research centers. Large shared equipment budgets when new centers are established." },
    ],
    dataNote:
      "Full abstracts available. Engineering awards often describe specific experimental setups and measurement capabilities needed, giving strong equipment signals.",
    stars: 3,
  },
  {
    id: "geo",
    abbr: "GEO",
    name: "Directorate for Geosciences",
    budget: "~$1.4B annual budget",
    overview:
      "Atmospheric science, ocean science, earth science, and polar programs. GEO funds research about the planet itself. It's a niche market for equipment sales, but a consistent one if you sell environmental monitoring, analytical chemistry, or mass spectrometry for geochemistry applications.",
    who: "University earth science departments, oceanographic institutions, atmospheric research centers, field stations.",
    whyItMatters:
      "GEO is a smaller market for most equipment reps, but it's reliable. Geochemistry labs need ICP-MS, XRF, and isotope ratio mass spectrometers. Ocean science programs buy water quality instruments and analytical equipment. Atmospheric science labs need monitoring stations and gas analyzers. If you sell in these niches, GEO-funded PIs are steady buyers.",
    programs: [
      { name: "Earth Sciences (EAR)", detail: "Geology, geochemistry, geophysics. Mass spec (ICP-MS, TIMS), XRF, electron microprobe, seismic instruments." },
      { name: "Ocean Sciences (OCE)", detail: "Chemical oceanography, biological oceanography. Water samplers, CTDs, analytical chemistry for seawater." },
      { name: "Atmospheric & Geospace Sciences (AGS)", detail: "Weather, climate, atmospheric chemistry. Monitoring stations, lidar, gas analyzers, particle counters." },
      { name: "Polar Programs (OPP)", detail: "Arctic and Antarctic research. Field-deployable instruments, cold-weather analytical equipment." },
    ],
    dataNote:
      "Full abstracts with detailed field and lab methodology. Geochemistry and analytical technique keywords are reliably captured in our classification.",
    stars: 2,
  },
];

/* -- noise programs data -------------------------------------------------- */

const noisePrograms: NoiseItemProps[] = [
  {
    name: "REU Supplements (Research Experiences for Undergraduates)",
    description: "Summer programs that bring undergrads into existing labs. These are small supplements ($5K to $15K) added to existing grants, mostly covering student stipends and housing. The money goes to the student, not to equipment.",
    verdict: "Not equipment money. The parent grant might be worth watching, but the REU supplement itself is noise.",
  },
  {
    name: "Curriculum Development / Education Grants (EHR Directorate)",
    description: "The Education & Human Resources directorate funds teaching improvement, STEM education research, and curriculum design. These grants buy textbooks, software licenses, and classroom technology. They do not fund research labs.",
    verdict: "Teaching grants, not research grants. Skip the entire EHR directorate.",
  },
  {
    name: "Conference & Workshop Grants",
    description: "Small grants ($10K to $50K) to organize scientific meetings, workshops, and symposia. The money covers venue rental, travel support, and catering. No lab component whatsoever.",
    verdict: "Zero equipment relevance. Skip.",
  },
  {
    name: "SBIR/STTR (mostly)",
    description: "NSF runs its own SBIR program, but most NSF SBIR awardees are software companies, AI startups, and tech firms. Unlike NIH SBIR where you'll find biotech companies building wet labs, NSF SBIR skews heavily toward computational and engineering startups.",
    verdict: "Low hit rate compared to NIH SBIR. Occasional biotech startup, but you'll dig through a lot of software companies to find one.",
  },
  {
    name: "Social, Behavioral & Economic Sciences (SBE Directorate)",
    description: "Psychology surveys, economics research, linguistics, political science, sociology. SBE-funded researchers primarily collect survey data, run behavioral experiments on computers, and analyze existing datasets. The rare exception is cognitive neuroscience, which sometimes lands in SBE and does involve brain imaging equipment.",
    verdict: "Rarely involves lab equipment. The neuroscience exception is real but uncommon. Low priority.",
  },
];

/* -- equipment signals data ----------------------------------------------- */

const equipmentSignals = [
  { category: "Microscopy", examples: "Confocal, electron microscopy (SEM, TEM), fluorescence imaging", where: "BIO, ENG" },
  { category: "Sequencing", examples: "Genomics, metagenomics, plant DNA, environmental DNA", where: "BIO, GEO" },
  { category: "Spectroscopy", examples: "NMR, Raman, FTIR, UV-Vis, XRF", where: "MPS, GEO" },
  { category: "Mass Spectrometry", examples: "Proteomics, metabolomics, geochemistry (ICP-MS, TIMS)", where: "MPS, BIO, GEO" },
  { category: "Analytical Instruments", examples: "Chromatography (HPLC, GC), elemental analyzers", where: "MPS, GEO, ENG" },
  { category: "Environmental Monitoring", examples: "Weather stations, field sensors, water quality instruments", where: "GEO, BIO" },
  { category: "Materials Testing", examples: "Tensile testing, thermal analysis (DSC, TGA), rheology", where: "ENG, MPS" },
];

/* -- comparison table data ------------------------------------------------ */

const tableRows = [
  { program: "BIO Directorate", budget: "~$900M", stars: 4, signal: "Primary", notes: "Plant bio, ecology, molecular biology. Core life-science." },
  { program: "MPS Directorate", budget: "~$1.6B", stars: 3, signal: "Strong", notes: "Chemistry, physics. Analytical instruments." },
  { program: "ENG Directorate", budget: "~$1B", stars: 3, signal: "Strong", notes: "Biomedical + materials engineering." },
  { program: "GEO Directorate", budget: "~$1.4B", stars: 2, signal: "Moderate", notes: "Environmental monitoring, geochemistry." },
  { program: "MRI Program", budget: "~$80M", stars: 5, signal: "Direct", notes: "Equipment purchase grants. Best signal in federal funding." },
  { program: "CAREER Awards", budget: "~$250M", stars: 4, signal: "Strong", notes: "New PIs building first labs." },
  { program: "EHR (Education)", budget: "~$1.1B", stars: 0, signal: "None", notes: "Teaching grants. Skip." },
  { program: "REU Supplements", budget: "~$80M", stars: 0, signal: "None", notes: "Student stipends. Skip." },
  { program: "SBE (Social/Behavioral)", budget: "~$300M", stars: 0, signal: "Rare", notes: "Surveys, not labs. Rare exception for neuro." },
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "why-nsf", label: "Why NSF Matters" },
  { id: "directorates", label: "Key Directorates" },
  { id: "mri-program", label: "The MRI Program" },
  { id: "career-awards", label: "CAREER Awards" },
  { id: "the-noise", label: "What to Skip" },
  { id: "equipment-signals", label: "Equipment Signals" },
  { id: "data-quality", label: "Data Quality" },
  { id: "comparison-table", label: "Quick Reference" },
];

/* -- page component ------------------------------------------------------- */

export default function NSFGrantsGuide() {
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
              NSF Grants Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            NSF Grants:{" "}
            <span className="text-[var(--color-brand)]">
              $9B in Research That NIH-Focused Reps Miss
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            NSF funds fundamental research across every science, not just
            biomedical. Physics, chemistry, engineering, earth science, and
            biology. If you only watch NIH, you&apos;re missing entire
            departments at every university. And NSF&apos;s MRI program hands out
            $100K to $4M grants specifically to buy instruments.
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
        {/* Why NSF Matters */}
        <section id="why-nsf" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Why NSF Matters for Equipment Sales
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            $9B in research funding that most reps completely overlook.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              NSF has roughly a $9B annual budget, and nearly all of it funds
              research. Unlike USDA (where 98% of the budget is farm subsidies
              and food stamps), NSF is a pure research agency. Every dollar is
              going to scientists doing actual science.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The problem is that most equipment sales reps only watch NIH. That
              makes sense if you exclusively sell to biomedical labs, but NIH
              doesn&apos;t fund physics departments, chemistry departments
              (mostly), materials science programs, ecology labs, plant biology,
              earth science, or engineering. NSF does. If you sell analytical
              instruments, microscopy, or environmental monitoring equipment,
              NSF-funded labs are a huge part of your addressable market.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              Every research university in the country has NSF-funded labs.
              Land-grant universities are especially heavy NSF recipients because
              of their agricultural science, environmental science, and
              engineering programs. State flagship universities with strong
              physics and chemistry departments pull in tens of millions from NSF
              every year.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The bottom line:
                </span>{" "}
                If you only track NIH, you&apos;re invisible to entire science
                departments at every university. NSF fills in the rest of the
                picture.
              </p>
            </div>
          </div>
        </section>

        {/* Key Directorates */}
        <section id="directorates" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Key NSF Directorates
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            NSF is organized into directorates by discipline. These four are the
            ones that buy lab equipment.
          </p>
          <div className="space-y-8">
            {directorates.map((a) => (
              <AgencySection key={a.id} {...a} />
            ))}
          </div>
        </section>

        {/* The MRI Program */}
        <section id="mri-program" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The MRI Program: NSF&apos;s Equipment Purchase Grants
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            The most direct equipment purchase signal in all of federal funding.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              NSF&apos;s Major Research Instrumentation (MRI) program gives $100K
              to $4M grants specifically to purchase instruments. That&apos;s it.
              The entire grant is an equipment purchase. There&apos;s no PI
              salary, no postdoc funding, no travel budget. Just money to buy a
              specific instrument for a shared university facility.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              Think of it as NSF&apos;s version of NIH&apos;s S10 program, but
              covering all sciences instead of just biomedical. MRI proposals
              literally name the instrument they want to buy in the abstract.
              You&apos;ll see awards titled things like &quot;Acquisition of a
              500 MHz NMR Spectrometer&quot; or &quot;Development of a
              High-Resolution Mass Spectrometry Facility.&quot;
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              If you&apos;re not watching MRI awards, you&apos;re missing the
              easiest leads in federal funding. These grants tell you exactly
              what instrument someone is buying, at which university, and how
              much they have to spend. There&apos;s no interpretation needed.
            </p>
            <div className="bg-[var(--color-brand-light)] rounded-lg px-4 py-3 border border-[var(--color-brand)]/20">
              <p className="text-sm text-[var(--color-brand)] font-medium">
                MRI abstracts often name the exact make and model of the
                instrument, making them the easiest leads in the entire database.
                An MRI award is basically a purchase order with a federal tracking
                number.
              </p>
            </div>
          </div>
        </section>

        {/* CAREER Awards */}
        <section id="career-awards" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            CAREER Awards: New PIs Building First Labs
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Early-career faculty with $500K to $700K and a lab to set up from
            scratch.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              The Faculty Early Career Development (CAREER) program gives $500K
              to $700K over five years to junior faculty members. These are
              assistant professors who just started their independent labs.
              They&apos;re setting up from scratch, buying their first major
              instruments, and building out capabilities they need to establish a
              research program.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              CAREER awardees are also making purchasing decisions for the first
              time. Many of them spent years as postdocs using someone else&apos;s
              equipment and are now choosing vendors for their own lab. They&apos;re
              more open to conversations with reps, more receptive to demos, and
              more likely to take meetings. They don&apos;t have established vendor
              relationships yet.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              These are excellent long-term relationship targets. A CAREER
              awardee who likes your equipment today will keep buying from you
              for the next 20 to 30 years of their faculty career. They&apos;ll
              also recommend you to their graduate students who go on to start
              their own labs.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Sales tip:
                </span>{" "}
                CAREER awards are announced annually. Watch for new awardees in
                your territory and reach out early, before they&apos;ve committed
                to a vendor. The first year of a CAREER award is when most
                equipment purchases happen.
              </p>
            </div>
          </div>
        </section>

        {/* The Noise */}
        <section id="the-noise" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            What to Skip
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Not everything at NSF is relevant. These programs show up in the
            data but won&apos;t lead to equipment sales.
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
            Equipment Signals in NSF Research
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            What NSF-funded labs actually buy, and which directorates to watch
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
            NSF Data Quality
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Why NSF awards produce some of our best leads.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              NSF abstracts are full text. Unlike USASpending one-liners from
              other agencies, NSF provides complete project abstracts through
              their public API. Every funded award includes a detailed
              description of the research objectives, methods, and expected
              outcomes.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              This means our AI classification is significantly more accurate
              for NSF grants. We can identify specific equipment needs, research
              methodologies, and lab capabilities directly from the abstract
              text. When a PI writes &quot;we will acquire a confocal microscope
              to image fluorescently labeled cell populations,&quot; our system
              picks that up and flags it as a microscopy lead.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              NSF data is some of the cleanest in our entire database. The
              combination of full-text abstracts, consistent formatting, and
              clear program categorization makes NSF awards highly reliable
              leads. If our system flags an NSF award as equipment-relevant,
              it almost always is.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Result:
                </span>{" "}
                NSF awards in Lab Leads Pro have higher classification
                confidence scores than most other federal sources. Full
                abstracts make the difference.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="comparison-table" className="pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            NSF Programs: Quick Reference
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
            Lab Leads Pro surfaces NSF equipment grants automatically
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with NSF research awards in your state,
            including MRI equipment purchases, scored for instrument buying
            signals.
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
