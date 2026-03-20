import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideSchema from "@/components/GuideSchema";

export const metadata: Metadata = {
  title: "NASA Grants Guide for Lab Equipment Sales Reps | Lab Leads Pro",
  description:
    "NASA spends $7B on research including space biology, astronaut health, earth science, and astrobiology. Real bench science with real equipment needs. Here's what lab equipment reps need to know.",
  keywords:
    "NASA grants, NASA research funding, space biology equipment, ROSES solicitation, Human Research Program, Earth Science Division, astrobiology, NASA centers, lab equipment sales, cell culture, mass spectrometry",
  openGraph: {
    title: "NASA Grants Guide for Lab Equipment Sales Reps",
    description:
      "NASA spends $7B on research including space biology, astronaut health, earth science, and astrobiology. Real bench science with real equipment needs.",
    url: "https://lableadspro.com/nasa-grants-guide",
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
            id="mol-grid-nasa"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-nasa)" />
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

/* -- programs data -------------------------------------------------------- */

const nasaPrograms: AgencySectionProps[] = [
  {
    id: "space-bio",
    abbr: "SPACE BIO",
    name: "Space Biology Program",
    budget: "~$50M annual budget",
    overview:
      "This is real bench science, not rocket engineering. Space Biology studies how cells, plants, and organisms behave in microgravity. Researchers grow cells in culture, run plant experiments in growth chambers, and study bone loss, muscle atrophy, and radiation effects. The labs doing this work look exactly like any other molecular biology or cell biology lab. They just happen to send some experiments to the International Space Station.",
    who: "University biology departments, medical schools. PIs who are cell biologists and plant biologists, not aerospace engineers.",
    whyItMatters:
      "Space Biology labs buy cell culture equipment, incubators, microscopes, growth chambers, environmental chambers, and analytical instruments. The ground-based research (which is the majority of the work) uses standard lab equipment. Flight experiments require specialized hardware, but the sample prep and analysis happens in regular labs with regular instruments. These PIs are accessible and they buy the same gear as any life science lab.",
    programs: [
      { name: "Cell and Molecular Biology in Space", detail: "Cell culture, gene expression, protein analysis. Standard molecular biology instruments plus specialized flight hardware." },
      { name: "Plant Biology in Space", detail: "Growth chambers, environmental controls, imaging. Arabidopsis, wheat, lettuce experiments." },
      { name: "Microbial Research", detail: "How microorganisms behave in microgravity. Microbiology instruments, culture systems, analytical chemistry." },
      { name: "Animal/Organism Studies", detail: "Bone loss, muscle wasting, radiation effects. Histology, imaging, biomarker analysis instruments." },
    ],
    dataNote:
      "Space Biology awards through ROSES are well-described. Our AI classification catches the cell biology and plant biology keywords accurately. These look like standard life science grants in the data.",
    stars: 4,
  },
  {
    id: "hrp",
    abbr: "HRP",
    name: "Human Research Program",
    budget: "~$150M annual budget",
    overview:
      "HRP studies how spaceflight affects human health. Radiation biology, cardiovascular deconditioning, vision changes, behavioral health. This is medical research with a space twist. The labs involved are often at medical schools and use the same instruments as any clinical or translational research lab.",
    who: "University medical schools, hospitals, some NASA center researchers.",
    whyItMatters:
      "HRP-funded labs buy radiation biology equipment (dosimeters, irradiators, biological assay instruments), imaging systems, clinical analyzers, and biomarker analysis tools. The radiation biology component is especially equipment-intensive. If you sell to radiation oncology or radiation biology departments, HRP-funded PIs are potential customers you might not know about.",
    programs: [
      { name: "Space Radiation Research", detail: "Radiation biology, DNA damage, cancer risk modeling. Irradiators, dosimetry, flow cytometry, sequencing." },
      { name: "Cardiovascular Research", detail: "Deconditioning, fluid shifts, cardiac monitoring. Clinical instruments, physiological monitors." },
      { name: "Behavioral Health", detail: "Sleep, cognition, crew dynamics. Monitoring equipment, wearable sensors. Less equipment-intensive." },
      { name: "Exploration Medical Capability", detail: "Point-of-care diagnostics, medical devices for deep space. Diagnostic instruments, compact analyzers." },
    ],
    dataNote:
      "HRP awards are well-documented through NASA\u0027s NSPIRES system. Medical research keywords translate well to equipment classification.",
    stars: 3,
  },
  {
    id: "earth-science",
    abbr: "ESD",
    name: "Earth Science Division",
    budget: "~$2B annual budget",
    overview:
      "NASA\u0027s Earth Science Division is the largest research program at NASA by budget. It funds remote sensing, atmospheric science, oceanography, and terrestrial ecology. Most of this work involves satellite data analysis (not lab equipment), but a significant fraction involves ground-truth measurements, calibration labs, and environmental monitoring instruments.",
    who: "University earth science departments, environmental research centers, some national labs.",
    whyItMatters:
      "The equipment angle here is environmental monitoring and analytical chemistry. Ground-truth researchers need field instruments, water quality analyzers, gas analyzers, and spectroscopic instruments for calibrating satellite data. Atmospheric chemistry labs run GC-MS and other analytical instruments. The volume is not huge, but if you sell environmental monitoring or analytical chemistry instruments, Earth Science PIs are steady buyers.",
    programs: [
      { name: "Terrestrial Ecology", detail: "Field measurements, vegetation analysis, soil science. Environmental sensors, spectroradiometers, gas analyzers." },
      { name: "Atmospheric Composition", detail: "Atmospheric chemistry, aerosol science. GC-MS, particle analyzers, optical instruments." },
      { name: "Physical Oceanography", detail: "Ocean measurements, buoys, sensors. Mostly large-scale infrastructure, some lab instruments for sample analysis." },
      { name: "Applied Sciences", detail: "Using satellite data for health, agriculture, disasters. Mostly computational, minimal lab equipment." },
    ],
    dataNote:
      "Earth Science awards vary widely in equipment relevance. Our classification distinguishes between computational/modeling awards (low equipment signal) and field/lab measurement awards (higher signal).",
    stars: 3,
  },
  {
    id: "astrobiology",
    abbr: "ASTRO",
    name: "Astrobiology Program",
    budget: "~$60M annual budget",
    overview:
      "Origin of life research, extremophile biology, the search for biosignatures. Astrobiology is a small program by budget, but the labs involved are heavily instrument-dependent. Studying extremophiles and prebiotic chemistry requires serious analytical chemistry capabilities. Mass spectrometry, spectroscopy, and microscopy are core tools.",
    who: "University chemistry, biology, and earth science departments. Interdisciplinary researchers.",
    whyItMatters:
      "Astrobiology labs punch above their weight in equipment spending. Analyzing rock samples for organic molecules, characterizing extremophile metabolisms, and developing life-detection instruments all require analytical instruments. Mass spec (especially GC-MS and LC-MS), Raman spectroscopy, and microscopy are the big categories. Small community, but they buy good equipment and are enthusiastic about new technology.",
    programs: [
      { name: "Exobiology", detail: "Origin of life, prebiotic chemistry. GC-MS, LC-MS, spectroscopy, microscopy." },
      { name: "Habitable Worlds", detail: "Planetary environments, biosignatures. Analytical chemistry, sample analysis instruments." },
      { name: "Astrobiology Analytical Lab", detail: "NASA Goddard\u0027s in-house analytical facility. Mass spec, chromatography, spectroscopy." },
    ],
    dataNote:
      "Astrobiology awards through ROSES include detailed abstracts. The analytical chemistry focus makes equipment classification reliable. Small volume but high hit rate.",
    stars: 4,
  },
];

/* -- noise programs data -------------------------------------------------- */

const noisePrograms: NoiseItemProps[] = [
  {
    name: "Spacecraft and Launch Vehicle Contracts",
    description: "The majority of NASA\u0027s budget goes to building and launching spacecraft, satellites, rockets, and ground systems. Companies like SpaceX, Boeing, Northrop Grumman, and Lockheed Martin receive billions. This is aerospace engineering and manufacturing, not research lab activity.",
    verdict: "Rockets are not lab equipment. Skip.",
  },
  {
    name: "Mission Operations and Ground Systems",
    description: "Operating the International Space Station, Deep Space Network, mission control, satellite communications. These are operational budgets for keeping existing systems running, not research grants.",
    verdict: "Operations, not research. No equipment purchase signals.",
  },
  {
    name: "Aeronautics Research (mostly)",
    description: "NASA\u0027s aeronautics division works on aircraft design, air traffic management, and aviation safety. Most of this is wind tunnel testing and computational modeling at NASA centers. Some materials testing overlap, but it is a niche within a niche.",
    verdict: "Mostly wind tunnels and simulations. Occasional materials testing, but low priority for most reps.",
  },
  {
    name: "Space Technology (mostly)",
    description: "Developing technologies for future missions: solar sails, in-space propulsion, advanced materials for spacecraft. Some of this involves lab work, but most is engineering development and testing at NASA centers or defense contractors.",
    verdict: "More engineering than science. Rare lab equipment overlap. Low priority.",
  },
  {
    name: "STEM Education and Public Outreach",
    description: "Programs to inspire students, train teachers, and communicate NASA science to the public. Museum exhibits, summer camps, curriculum development. Education budgets, not research budgets.",
    verdict: "Teaching and outreach. Zero lab equipment relevance.",
  },
];

/* -- equipment signals data ----------------------------------------------- */

const equipmentSignals = [
  { category: "Cell Culture", examples: "Incubators, bioreactors, cell culture systems, laminar flow hoods", where: "Space Bio, HRP" },
  { category: "Environmental Chambers", examples: "Growth chambers, climate chambers, altitude simulation", where: "Space Bio, Earth Science" },
  { category: "Microscopy", examples: "Fluorescence, confocal, electron microscopy for biology and materials", where: "Space Bio, Astrobiology" },
  { category: "Mass Spectrometry", examples: "GC-MS, LC-MS for organic analysis, metabolomics, geochemistry", where: "Astrobiology, Earth Science" },
  { category: "Spectroscopy", examples: "Raman, FTIR, UV-Vis for mineral and organic analysis", where: "Astrobiology, Earth Science" },
  { category: "Environmental Monitoring", examples: "Weather stations, soil sensors, water quality, gas analyzers", where: "Earth Science" },
  { category: "Radiation Biology Equipment", examples: "Dosimeters, irradiators, flow cytometry for damage assays", where: "HRP" },
  { category: "Analytical Chemistry", examples: "Chromatography, elemental analyzers, sample prep instruments", where: "Astrobiology, Earth Science" },
];

/* -- comparison table data ------------------------------------------------ */

const tableRows = [
  { program: "Space Biology", budget: "~$50M", stars: 4, signal: "Primary", notes: "Real bench biology. Cell culture, plant growth." },
  { program: "Human Research Program", budget: "~$150M", stars: 3, signal: "Strong", notes: "Medical/radiation research. Clinical instruments." },
  { program: "Earth Science", budget: "~$2B", stars: 3, signal: "Moderate", notes: "Environmental monitoring, analytical chemistry." },
  { program: "Astrobiology", budget: "~$60M", stars: 4, signal: "Strong", notes: "Analytical chemistry-intensive. Small but high hit rate." },
  { program: "NASA Centers (federal)", budget: "Varies", stars: 2, signal: "Moderate", notes: "Federal procurement. Accessible via university collaborators." },
  { program: "Spacecraft/Launch", budget: "~$10B+", stars: 0, signal: "None", notes: "Aerospace engineering. Skip." },
  { program: "Mission Operations", budget: "~$4B+", stars: 0, signal: "None", notes: "Running existing systems. Skip." },
  { program: "STEM Education", budget: "~$150M", stars: 0, signal: "None", notes: "Outreach and teaching. Skip." },
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "why-nasa", label: "Why NASA Matters" },
  { id: "cool-factor", label: "The Cool Factor" },
  { id: "programs", label: "Key Programs" },
  { id: "nasa-centers", label: "NASA Centers" },
  { id: "the-noise", label: "What to Skip" },
  { id: "equipment-signals", label: "Equipment Signals" },
  { id: "data-quality", label: "Data Quality" },
  { id: "comparison-table", label: "Quick Reference" },
];

/* -- page component ------------------------------------------------------- */

export default function NASAGrantsGuide() {
  return (
    <>
      <GuideSchema
        title="NASA Research Grants Guide for Equipment Sales"
        description="Space science grants, planetary research, and NASA lab equipment needs."
        url="https://lableadspro.com/nasa-grants-guide"
        faqs={[
          { question: "Does NASA buy lab equipment?", answer: "Yes. NASA funds research at universities and its own centers including JPL, Goddard, Ames, and Langley. Research in astrobiology, planetary science, materials, and Earth observation all require specialized lab equipment." },
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
              href="/database"
              className="hover:text-[var(--color-brand)] transition-colors"
            >
              Database
            </Link>
            <span>/</span>
            <span className="text-[var(--color-gray-700)]">
              NASA Research Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            NASA Research Grants:{" "}
            <span className="text-[var(--color-brand)]">
              $7B in Space and Earth Science With Real Lab Equipment
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            Most reps hear &quot;NASA&quot; and think rockets. But NASA runs real
            research labs doing cell biology, radiation studies, environmental
            monitoring, and analytical chemistry. The Space Biology program grows
            cells and plants in microgravity. The Human Research Program studies
            astronaut health with the same instruments you would find in any
            medical research lab. Earth Science has thousands of PIs using
            environmental sensors and analytical instruments. Smaller volume than
            NIH, but real labs buying real equipment.
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
        {/* Why NASA Matters */}
        <section id="why-nasa" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Why NASA Matters for Equipment Sales
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            $7B in research funding with a surprisingly large ground-based lab component.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              When equipment reps think of NASA, they think of rockets and
              satellites. That is understandable, but it is wrong for our
              purposes. NASA funds real laboratory research. Cell biologists
              growing cells in microgravity. Radiation biologists studying how
              cosmic rays damage DNA. Astrobiologists analyzing meteorites for
              organic molecules with GC-MS. Plant biologists running growth
              chamber experiments. This is bench science.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The volume is smaller than NIH or NSF. NASA funds a few hundred
              research grants a year through ROSES, compared to tens of
              thousands at NIH. But the grants that do exist are often
              equipment-intensive because the research requires specialized
              instruments. An astrobiology lab analyzing Mars-analog samples
              needs mass spectrometers and spectroscopy just like any analytical
              chemistry lab.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              University PIs funded by NASA buy equipment through normal academic
              procurement. No federal contracting hurdles. No GSA schedules.
              Just a researcher with a grant and a purchase order. Same process
              as any NIH or NSF-funded PI.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The bottom line:
                </span>{" "}
                NASA is a niche source, not a primary pipeline. But the leads
                are real, the PIs are accessible, and the cool factor makes
                outreach easier than any other agency.
              </p>
            </div>
          </div>
        </section>

        {/* The Cool Factor */}
        <section id="cool-factor" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The Cool Factor Is Real
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            NASA research gets attention. Use it.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              Here is something no other agency gives you: conversation
              starters. When you email a PI and mention their NASA-funded space
              biology experiment, they respond. When you bring up a grant
              studying how plants grow on the International Space Station,
              people at the university want to talk about it. NASA research has
              a cool factor that NIH grant number R01-GM-whatever simply does
              not have. Use this. It makes cold outreach easier, demos more
              interesting, and relationships stickier. A PI whose work involves
              sending experiments to the ISS loves talking about it. Let them.
            </p>
          </div>
        </section>

        {/* Key Programs */}
        <section id="programs" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Key NASA Programs
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Space Bio, Human Research, Earth Science, and Astrobiology. These
            are the programs that buy lab equipment.
          </p>
          <div className="space-y-8">
            {nasaPrograms.map((a) => (
              <AgencySection key={a.id} {...a} />
            ))}
          </div>
        </section>

        {/* NASA Centers */}
        <section id="nasa-centers" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            NASA Centers: Research Labs Behind the Rockets
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            JPL, Goddard, Ames, Glenn, and Kennedy all have active research laboratories.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              NASA operates about a dozen centers across the country, and
              several have active research labs. The Jet Propulsion Laboratory
              (JPL) in Pasadena has analytical chemistry labs that develop
              instruments for planetary missions. Goddard Space Flight Center
              has the Astrobiology Analytical Lab. Ames Research Center runs
              the Space Biosciences Division with cell culture and biology
              labs. Glenn Research Center does materials testing and combustion
              research. Kennedy Space Center has life support and plant growth
              research.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              These center labs are federal facilities, so they buy through
              federal procurement. Longer cycles, government contracting
              officers, GSA schedules. But the equipment they buy is the same
              stuff university labs use: mass spectrometers, microscopes,
              environmental chambers, analytical instruments.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The more accessible angle for most reps is university PIs who
              collaborate with NASA centers. A professor who partners with
              Ames on space biology still buys their own lab equipment through
              normal university procurement. They are funded by NASA but
              purchase like any academic researcher.
            </p>
            <div className="bg-[var(--color-brand-light)] rounded-lg px-4 py-3 border border-[var(--color-brand)]/20">
              <p className="text-sm text-[var(--color-brand)] font-medium">
                NASA centers are worth knowing about for context, but university
                PIs funded through ROSES are your most accessible leads. Center
                researchers are behind federal procurement walls. University
                collaborators are a phone call away.
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
            Not everything at NASA is relevant. These programs show up in the
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
            Equipment Signals in NASA Research
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            What NASA-funded labs actually buy, and which programs to watch
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
            NASA Data Quality
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Good abstracts through ROSES, but lower volume than NIH or NSF.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              NASA research grants awarded through the ROSES solicitation come
              with detailed abstracts. When a PI gets a Space Biology or
              Astrobiology grant, the project description usually includes
              specific enough methodology to identify equipment needs. These
              are reliable leads.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The challenge with NASA is volume. Compared to NIH (tens of
              thousands of awards per year) or NSF (thousands), NASA funds a
              few hundred research grants annually. You will not build your
              entire pipeline on NASA leads. But the leads you do find are
              often high-quality because the research is genuinely
              equipment-dependent.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              NASA center spending follows federal procurement and is harder
              to parse from USASpending data. Center-level equipment purchases
              are real but not easily visible in grant databases. Our
              classification focuses on the university-facing grants where
              equipment signals are clearest.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Result:
                </span>{" "}
                NASA grants are low volume but high quality. Space Biology and
                Astrobiology awards are especially reliable for equipment
                classification. Think of NASA as a complement to your NIH and
                NSF coverage, not a replacement.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="comparison-table" className="pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            NASA Programs: Quick Reference
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
            Lab Leads Pro finds NASA research grants that actually buy lab equipment
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with NASA-funded research in your state,
            including Space Biology, Astrobiology, and Earth Science awards,
            scored for instrument buying signals.
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
