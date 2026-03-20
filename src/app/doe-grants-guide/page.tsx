import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DOE Research Grants Guide for Lab Equipment Sales | Lab Leads Pro",
  description:
    "DOE Office of Science controls $8B across 6 program offices, 17 national labs, and dozens of user facilities. Learn which DOE programs fund lab equipment purchases and how to separate research from infrastructure spending.",
  keywords:
    "DOE research grants, Office of Science, BER grants, BES grants, national labs equipment, ARPA-E funding, DOE SBIR, synchrotron user facilities, neutron science, DOE Early Career, lab equipment sales, Argonne, Brookhaven, Oak Ridge, LBNL, PNNL, NREL",
  openGraph: {
    title: "DOE Research Grants Guide for Lab Equipment Sales",
    description:
      "Six program offices, 17 national labs, and dozens of user facilities that all need instruments. Know where the equipment purchases actually happen.",
    url: "https://lableadspro.com/doe-grants-guide",
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
            id="mol-grid-doe"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-doe)" />
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

/* -- key programs data ---------------------------------------------------- */

const keyPrograms: AgencySectionProps[] = [
  {
    id: "ber",
    abbr: "BER",
    name: "Biological & Environmental Research",
    budget: "~$800M annual budget",
    overview:
      "BER funds genomics, proteomics, structural biology, and environmental monitoring research. It supports both national lab work and university grants, making it one of the more accessible Office of Science programs for equipment vendors. Two major user facilities fall under BER: the Joint Genome Institute (JGI) at Lawrence Berkeley and the Environmental Molecular Sciences Laboratory (EMSL) at PNNL. Both are significant instrument buyers and also drive purchases at the home institutions of visiting researchers.",
    who: "National lab scientists, university PIs in genomics and environmental science, and researchers using JGI and EMSL facilities.",
    whyItMatters:
      "BER is where DOE overlaps most with NIH territory. Genomics labs funded by BER buy the same sequencers, mass specs, and chromatography systems as NIH-funded labs. Environmental research programs need field sensors, air quality monitors, and water quality instruments. Structural biology work at BER-funded facilities drives cryo-EM and X-ray crystallography purchases. If you sell life science or environmental instruments, BER grants are real opportunities.",
    programs: [
      { name: "Genomic Science Program", detail: "Systems biology, metabolic engineering, bioenergy crop research. Heavy on sequencers, mass spectrometry for metabolomics, and bioinformatics infrastructure." },
      { name: "Environmental System Science", detail: "Terrestrial and subsurface ecosystem research. Field sensors, environmental monitoring stations, soil and water analysis instruments." },
      { name: "Atmospheric System Research", detail: "Cloud physics, aerosol science, atmospheric chemistry. Particle counters, spectrometers, LIDAR systems, and weather instrumentation." },
      { name: "Structural Biology", detail: "Protein structure determination using X-ray crystallography and cryo-EM at national lab facilities. Drives detector upgrades and sample preparation equipment purchases." },
    ],
    dataNote:
      "BER awards are well-documented in USASpending with clear research descriptions. University grants are straightforward to identify. National lab allocations require cross-referencing with lab procurement data for full visibility.",
    stars: 3,
  },
  {
    id: "bes",
    abbr: "BES",
    name: "Basic Energy Sciences",
    budget: "~$2.3B annual budget",
    overview:
      "The biggest program office in the Office of Science. BES funds materials science, chemistry, geosciences, and the operation of DOE\u0027s synchrotron light sources and neutron scattering facilities. The synchrotrons alone represent billions in installed instrumentation. APS at Argonne, NSLS-II at Brookhaven, and ALS at Berkeley are the flagship facilities. Each one runs dozens of beamlines, and every beamline needs detectors, optics, sample stages, and supporting analytical equipment.",
    who: "National lab scientists, university materials science and chemistry researchers, and thousands of visiting users at synchrotron and neutron facilities each year.",
    whyItMatters:
      "BES is the single largest equipment driver in DOE. The user facilities need constant instrument upgrades, detector replacements, and supporting analytical equipment. Beyond the facilities themselves, BES funds university research in materials characterization, catalysis, and energy storage that buys spectroscopy, electron microscopy, X-ray diffraction, and thermal analysis instruments. If you sell materials characterization equipment of any kind, BES is your primary DOE target.",
    programs: [
      { name: "Materials Sciences and Engineering", detail: "Condensed matter physics, materials synthesis, nanoscience. Electron microscopy, X-ray diffraction, mechanical testing, and thin-film deposition systems." },
      { name: "Chemical Sciences, Geosciences, and Biosciences", detail: "Catalysis, photochemistry, separations science. Spectroscopy (UV-Vis, Raman, FTIR, XPS), chromatography, electrochemistry, and calorimetry." },
      { name: "Scientific User Facilities", detail: "Synchrotron light sources, neutron sources, and nanoscience centers. Continuous demand for detectors, optics, vacuum systems, and beamline instrumentation." },
    ],
    dataNote:
      "BES university grants appear clearly in USASpending. User facility equipment purchases are harder to track because they go through national lab procurement systems rather than showing up as individual grants.",
    stars: 4,
  },
  {
    id: "hep",
    abbr: "HEP",
    name: "High Energy Physics",
    budget: "~$1.1B annual budget",
    overview:
      "Particle physics research. Most of the budget goes to accelerator operations at Fermilab and contributions to international experiments like those at CERN. The equipment that HEP buys is highly specialized: particle detectors, superconducting magnets, cryogenic systems, and custom electronics. Very little of this overlaps with standard laboratory instrumentation.",
    who: "National lab physicists and university particle physics groups.",
    whyItMatters:
      "Unless you sell detector components, cryogenic equipment, or specialized vacuum systems, HEP is not your market. The budgets are large but the spending goes to accelerator infrastructure and one-of-a-kind detector systems. Most lab equipment vendors can safely skip this program office.",
    programs: [
      { name: "Energy Frontier", detail: "Collider experiments and accelerator R&D. Custom detector systems and magnet technology." },
      { name: "Intensity Frontier", detail: "Neutrino experiments and rare particle searches. Fermilab-based programs with specialized detector needs." },
      { name: "Cosmic Frontier", detail: "Dark matter and dark energy experiments. Sensor arrays and cryogenic detector systems." },
    ],
    dataNote:
      "HEP awards are visible in USASpending but most are for accelerator operations and large-scale detector construction. We flag these as low equipment relevance for standard lab instrument vendors.",
    stars: 1,
  },
  {
    id: "ascr",
    abbr: "ASCR",
    name: "Advanced Scientific Computing Research",
    budget: "~$1B annual budget",
    overview:
      "Supercomputing and computational science. ASCR funds the leadership computing facilities at Oak Ridge (Summit/Frontier), Argonne (Aurora), and Lawrence Berkeley (NERSC). The budget goes to high-performance computing hardware, networking infrastructure, and applied mathematics research. This is IT infrastructure, not laboratory equipment.",
    who: "National lab computing centers and university computational science groups.",
    whyItMatters:
      "This is a different market entirely. ASCR buys servers, GPUs, networking gear, and storage systems. If you sell lab instruments, ASCR has nothing for you. If you sell IT infrastructure to research institutions, it is a significant funding source, but that is outside the scope of what most lab equipment reps cover.",
    programs: [
      { name: "Leadership Computing Facilities", detail: "Exascale computing at Oak Ridge, Argonne, and NERSC. Massive hardware procurement but all IT, not lab equipment." },
      { name: "Applied Mathematics and Computer Science", detail: "Algorithm development and software engineering for scientific computing. No equipment component." },
    ],
    dataNote:
      "ASCR awards are easy to identify and we classify them as zero equipment relevance for lab instrument vendors. They are filtered out of equipment-focused reports.",
    stars: 1,
  },
  {
    id: "fes",
    abbr: "FES",
    name: "Fusion Energy Sciences",
    budget: "~$700M annual budget",
    overview:
      "Plasma physics and fusion energy research. A significant portion of the budget goes to ITER contributions (the international fusion reactor project in France) and domestic fusion experiments. The research that remains funds plasma diagnostics, materials testing for fusion reactor components, and computational plasma physics at national labs and universities.",
    who: "National lab plasma physicists, university fusion research groups, and ITER project contributors.",
    whyItMatters:
      "FES is a niche market. The plasma diagnostics equipment is specialized (interferometers, Thomson scattering systems, Langmuir probes), and the materials testing for fusion reactor walls and components requires high-temperature mechanical testing and irradiation facilities. If you sell materials testing equipment or plasma diagnostics, FES is worth watching. For most other lab equipment categories, the volume is too small to prioritize.",
    programs: [
      { name: "ITER and Tokamak Research", detail: "International fusion reactor contributions and domestic tokamak experiments. Specialized plasma containment and diagnostics." },
      { name: "Discovery Plasma Science", detail: "Fundamental plasma physics research. Laser systems, vacuum chambers, plasma diagnostics instrumentation." },
      { name: "Materials and Fusion Nuclear Science", detail: "Materials degradation under fusion conditions. High-temperature testing, ion beam irradiation, and surface analysis equipment." },
    ],
    dataNote:
      "FES awards are identifiable in USASpending. We flag materials testing and diagnostics grants as moderate equipment relevance and filter out ITER construction contributions.",
    stars: 2,
  },
  {
    id: "np",
    abbr: "NP",
    name: "Nuclear Physics",
    budget: "~$700M annual budget",
    overview:
      "Nuclear structure, heavy ion physics, and fundamental symmetry research. NP operates two major facilities: RHIC (Relativistic Heavy Ion Collider) at Brookhaven and FRIB (Facility for Rare Isotope Beams) at Michigan State. Like HEP, most of the budget goes to facility operations and large detector systems. The university grant program funds nuclear structure research and detector development.",
    who: "National lab nuclear physicists, university nuclear physics groups, and FRIB/RHIC user communities.",
    whyItMatters:
      "NP is similar to HEP in terms of equipment relevance. The detector development program funds some standard electronics and sensor purchases, but most spending is on custom detector systems and accelerator components. If you sell radiation detection equipment, specialized electronics, or vacuum systems, there are opportunities here. For general lab equipment vendors, NP is a low priority.",
    programs: [
      { name: "RHIC Operations", detail: "Heavy ion collisions at Brookhaven. Detector upgrades and supporting instrumentation." },
      { name: "FRIB Operations", detail: "Rare isotope beam production at Michigan State. New facility with ongoing instrumentation needs." },
      { name: "Nuclear Theory and Detector R&D", detail: "University grants for nuclear structure research and detector development. Some standard electronics and sensor purchases." },
    ],
    dataNote:
      "NP awards are visible in USASpending. We separate facility operations from university research grants and flag detector development awards for equipment relevance.",
    stars: 2,
  },
];

/* -- noise programs data -------------------------------------------------- */

const noisePrograms: NoiseItemProps[] = [
  {
    name: "Nuclear Weapons Maintenance (NNSA)",
    description: "DOE\u0027s National Nuclear Security Administration manages the nuclear weapons stockpile, naval reactors, and nuclear nonproliferation programs. NNSA\u0027s budget is roughly $20B, which is larger than the entire Office of Science. Warhead life extension programs, plutonium pit production, and weapons complex infrastructure. This is manufacturing and maintenance, not research. The labs involved (Los Alamos, Sandia, Lawrence Livermore) do have research programs, but the NNSA weapons budget is a completely different world.",
    verdict: "Massive budget, zero lab equipment relevance for most vendors. Skip entirely.",
  },
  {
    name: "Power Grid Infrastructure",
    description: "Electricity transmission and distribution, grid modernization, utility regulation, and power marketing administrations. DOE manages the Bonneville Power Administration, Western Area Power Administration, and other entities that sell wholesale electricity. Grid spending is infrastructure, not research. Transformer purchases, transmission line construction, and smart grid IT systems.",
    verdict: "Infrastructure spending. Not research, not lab equipment. Skip.",
  },
  {
    name: "Strategic Petroleum Reserve",
    description: "DOE operates the Strategic Petroleum Reserve, storing hundreds of millions of barrels of crude oil in underground salt caverns along the Gulf Coast. Operations include facility maintenance, oil quality monitoring, and cavern integrity testing. This is industrial operations management.",
    verdict: "Oil storage operations. No connection to research equipment. Skip.",
  },
  {
    name: "Environmental Cleanup (EM)",
    description: "DOE\u0027s Office of Environmental Management handles legacy nuclear site remediation. Billions in annual spending on radioactive waste treatment, contaminated soil removal, groundwater cleanup, and decommissioning former weapons production facilities. Hanford, Savannah River, and Idaho sites are the biggest. This is waste management and construction, not scientific research.",
    verdict: "Waste cleanup and decontamination. Not research equipment. Skip.",
  },
  {
    name: "Fossil Energy and Carbon Management",
    description: "Coal, oil, and natural gas research. Declining budgets and a shift toward carbon capture and storage. Most of the remaining work is industrial-scale pilot projects, not laboratory research. Carbon capture demonstration plants, enhanced oil recovery field tests, and coal gasification facilities operate at a scale far beyond what lab equipment vendors serve.",
    verdict: "Industrial scale, not lab scale. Declining relevance. Skip.",
  },
];

/* -- equipment signals data ----------------------------------------------- */

const equipmentSignals = [
  { category: "Spectroscopy", examples: "UV-Vis, Raman, FTIR, XPS, XRF. Core analytical technique across BES materials research, catalysis studies, and energy materials characterization.", where: "BES, BER, National Labs" },
  { category: "X-ray Diffraction", examples: "Single crystal and powder XRD for materials phase identification and crystal structure determination. A staple of every materials characterization lab.", where: "BES, National Labs" },
  { category: "Electron Microscopy", examples: "SEM, TEM, cryo-EM. Materials microstructure analysis, biological specimen imaging, and nanoscale characterization.", where: "BES, BER, National Labs" },
  { category: "Mass Spectrometry", examples: "LC-MS, ICP-MS, GC-MS for environmental analysis, metabolomics, proteomics, and chemical characterization across DOE programs.", where: "BER, BES, EMSL" },
  { category: "Genomics Instruments", examples: "DNA and RNA sequencers, microarrays, PCR thermal cyclers, and library prep automation. BER genomic science research and JGI user community.", where: "BER, JGI" },
  { category: "Environmental Sensors", examples: "Air quality monitors, water quality analyzers, soil moisture probes, weather stations. BER atmospheric and environmental system science programs.", where: "BER, PNNL, ARM Facilities" },
  { category: "Electrochemistry", examples: "Potentiostats, battery cyclers, fuel cell test stations, impedance analyzers. Energy storage and conversion research at BES and ARPA-E.", where: "BES, ARPA-E, NREL" },
  { category: "Calorimetry", examples: "DSC, TGA, bomb calorimetry. Thermal analysis for materials characterization, phase transitions, and energy content measurement.", where: "BES, National Labs" },
  { category: "Chromatography", examples: "HPLC, GC, ion chromatography. Chemical separations and analysis across environmental, biological, and chemical research programs.", where: "BER, BES, EMSL" },
  { category: "Neutron Instruments", examples: "Detectors, neutron guides, choppers, and sample environment equipment. Specialized for SNS at Oak Ridge and HFIR neutron scattering facilities.", where: "BES, Oak Ridge, NIST" },
];

/* -- comparison table data ------------------------------------------------ */

const tableRows = [
  { program: "BES", budget: "~$2.3B", stars: 4, signal: "Primary", notes: "Materials and chemistry. User facilities drive equipment." },
  { program: "BER", budget: "~$800M", stars: 3, signal: "Strong", notes: "Genomics, environmental. University grants + lab facilities." },
  { program: "ARPA-E", budget: "~$400M", stars: 3, signal: "Strong", notes: "Startups building labs. First-time equipment buyers." },
  { program: "FES", budget: "~$700M", stars: 2, signal: "Moderate", notes: "Specialized plasma and materials diagnostics." },
  { program: "NP", budget: "~$700M", stars: 2, signal: "Moderate", notes: "Detector and instrument development." },
  { program: "HEP", budget: "~$1.1B", stars: 1, signal: "Low", notes: "Mostly accelerator operations. Limited lab equipment." },
  { program: "ASCR", budget: "~$1B", stars: 0, signal: "None", notes: "Computing infrastructure. Not lab equipment." },
  { program: "NNSA/Grid/SPR", budget: "~$20B+", stars: 0, signal: "None", notes: "Not research. Skip entirely." },
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "why-doe", label: "Why DOE Matters" },
  { id: "program-offices", label: "The 6 Program Offices" },
  { id: "national-labs", label: "National Labs" },
  { id: "user-facilities", label: "User Facilities" },
  { id: "arpa-e-sbir", label: "ARPA-E & SBIR" },
  { id: "the-noise", label: "What to Skip" },
  { id: "equipment-signals", label: "Equipment Signals" },
  { id: "data-notes", label: "Data Notes" },
  { id: "comparison-table", label: "Quick Reference" },
];

/* -- page component ------------------------------------------------------- */

export default function DOEGrantsGuide() {
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
              DOE Research Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            DOE Office of Science:{" "}
            <span className="text-[var(--color-brand)]">
              $8B in Research That Runs Through National Labs
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            DOE&apos;s Office of Science is the single largest funder of
            physical science research in the country. Six program offices, 17
            national labs, and dozens of user facilities that all need
            instruments. The trick is knowing where the equipment purchases
            actually happen and filtering out the noise from DOE&apos;s other
            missions.
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
        {/* Why DOE Matters */}
        <section id="why-doe" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Why DOE Matters for Equipment Sales
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            The largest funder of physical science research in the U.S., and most reps ignore it.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              DOE&apos;s Office of Science controls roughly $8B in annual
              research funding. That makes it the single largest supporter of
              physical science research in the United States, ahead of NSF in
              total dollars for physics, chemistry, materials science, and
              energy research. Six program offices divide the budget across
              different scientific disciplines, and 17 national laboratories
              execute the majority of the work.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              Here is the problem for equipment sales reps: DOE&apos;s total
              budget is roughly $50B, and most of that has nothing to do with
              research. Nuclear weapons maintenance, power grid operations, the
              Strategic Petroleum Reserve, and environmental cleanup consume
              the majority. If you look at DOE spending without knowing which
              programs are research and which are operations, you will waste
              enormous amounts of time chasing leads that will never buy a
              single instrument.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The Office of Science is where lab equipment gets purchased.
              Within it, BES (Basic Energy Sciences) and BER (Biological and
              Environmental Research) are the two program offices that drive
              the most instrument purchases. BES alone controls $2.3B and
              funds the synchrotron light sources, neutron scattering
              facilities, and materials research programs that buy
              spectroscopy, electron microscopy, and X-ray instrumentation
              every year.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The bottom line:
                </span>{" "}
                DOE&apos;s $8B Office of Science is a major equipment market,
                but it is buried inside a $50B agency where most spending is
                operations, not research. Knowing which programs matter and
                which to skip is the difference between a productive pipeline
                and wasted effort.
              </p>
            </div>
          </div>
        </section>

        {/* The 6 Program Offices */}
        <section id="program-offices" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The 6 Program Offices
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Each Office of Science program office funds different types of
            research with very different equipment needs.
          </p>
          <div className="space-y-8">
            {keyPrograms.map((a) => (
              <AgencySection key={a.id} {...a} />
            ))}
          </div>
        </section>

        {/* National Labs */}
        <section id="national-labs" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            National Labs
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            DOE&apos;s 17 national labs are institutional buyers with dedicated
            procurement offices. Different sales cycle than universities.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              National labs are not universities. They have centralized
              procurement offices, established vendor relationships, and
              purchasing processes that run through contracts rather than
              individual PO requests. The sales cycle is longer, the paperwork
              is heavier, but the orders are larger and the repeat business is
              more predictable. Once you are an approved vendor at a national
              lab, you have a customer for years.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Argonne National Laboratory (ANL):</span>{" "}
              Materials science, chemistry, and biology research. Home of the
              Advanced Photon Source (APS), one of the most powerful X-ray
              light sources in the Western Hemisphere. APS just completed a
              $815M upgrade. Argonne is a major buyer of spectroscopy,
              microscopy, and materials characterization instruments.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Brookhaven National Laboratory (BNL):</span>{" "}
              Nuclear and particle physics, photon sciences, and computational
              science. Home of NSLS-II, the newest and brightest synchrotron
              light source in the U.S. Also operates RHIC for nuclear physics.
              Consistent demand for detectors, beamline optics, and analytical
              instruments.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Oak Ridge National Laboratory (ORNL):</span>{" "}
              Neutron science, materials, and high-performance computing. Home
              of the Spallation Neutron Source (SNS) and High Flux Isotope
              Reactor (HFIR). These neutron facilities drive purchases of
              detectors, sample environment equipment, and supporting
              analytical instruments. Also home to the Frontier exascale
              supercomputer.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Lawrence Berkeley National Laboratory (LBNL):</span>{" "}
              Energy research, biosciences, and computing. Home of the
              Advanced Light Source (ALS) synchrotron and NERSC computing
              center. Strong in genomics through the Joint Genome Institute.
              Buys across life science, materials, and environmental
              instrument categories.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Sandia National Laboratories:</span>{" "}
              Engineering, materials testing, and national security research.
              Operates the Z Machine (pulsed power facility) and extensive
              materials testing capabilities. Buys mechanical testing
              equipment, thermal analysis instruments, and diagnostics systems.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Los Alamos National Laboratory (LANL):</span>{" "}
              Primarily a weapons lab, but also runs significant materials
              science, biology, and chemistry research programs. The Chemistry
              Division and Bioscience Division are real equipment buyers.
              Neutron science at the LANSCE facility drives detector and
              instrument purchases.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Pacific Northwest National Laboratory (PNNL):</span>{" "}
              Environmental science, chemistry, and biological sciences. Home
              of EMSL (Environmental Molecular Sciences Laboratory), a major
              user facility with NMR, mass spectrometry, and microscopy
              capabilities. PNNL is a strong buyer in environmental monitoring,
              analytical chemistry, and proteomics instruments.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">National Renewable Energy Laboratory (NREL):</span>{" "}
              Renewable energy research across solar, wind, batteries, and
              biofuels. Buys electrochemistry instruments (potentiostats,
              battery cyclers), materials characterization tools, and
              environmental testing chambers. Growing budget as clean energy
              investment increases.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Idaho National Laboratory (INL):</span>{" "}
              Nuclear energy research. Reactor materials testing, fuel
              characterization, and post-irradiation examination. Buys
              hot-cell equipment, materials testing instruments, and radiation
              measurement systems. Specialized market but consistent demand.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Key takeaway:
                </span>{" "}
                National labs are institutional buyers with dedicated
                procurement offices. Longer timelines and more paperwork than
                universities, but larger orders and repeat business. Getting
                approved as a vendor at a major national lab is an investment
                that pays off for years.
              </p>
            </div>
          </div>
        </section>

        {/* User Facilities */}
        <section id="user-facilities" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            User Facilities
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            DOE&apos;s user facility model creates a dual sales opportunity
            that most reps miss entirely.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              DOE operates dozens of &quot;user facilities&quot; where
              scientists from universities and other institutions apply for
              beam time or instrument access. The researcher brings their
              samples, the facility provides the instrument. Synchrotron
              beamlines, neutron scattering instruments, genomic sequencing
              centers, and electron microscopy suites all work this way.
              Thousands of researchers from hundreds of institutions visit
              these facilities every year.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              Here is the equipment opportunity most reps miss: user
              facilities create demand in two places. First, the facility
              itself needs instruments. If a beamline upgrades its detector,
              that is a purchase. If EMSL adds a new mass spec, that is a
              purchase. These facilities have dedicated equipment budgets and
              regular upgrade cycles.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              Second, and often more valuable, the visiting researcher&apos;s
              home institution buys equipment. A chemistry professor uses
              beam time at NSLS-II, publishes results, and then needs
              complementary analytical capabilities in their own lab back at
              the university. That drives a purchase at the university, funded
              by their DOE or NSF grant. The user facility experience
              generates demand at the researcher&apos;s home institution.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              <span className="font-semibold text-[var(--color-gray-900)]">Key user facilities to know:</span>{" "}
              APS (Argonne, X-ray synchrotron), NSLS-II (Brookhaven, X-ray
              synchrotron), ALS (Berkeley, X-ray synchrotron), SNS and HFIR
              (Oak Ridge, neutron sources), JGI (Berkeley, genomic
              sequencing), EMSL (PNNL, environmental and molecular sciences),
              NERSC (Berkeley, supercomputing), and the five Nanoscale Science
              Research Centers spread across Argonne, Brookhaven, Oak Ridge,
              Sandia/Los Alamos, and Lawrence Berkeley.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Key takeaway:
                </span>{" "}
                User facilities are both direct customers (facility equipment
                budgets) and lead generators (visiting researchers who go home
                and buy complementary instruments). Track both the facility
                procurement and the grants of researchers who use these
                facilities.
              </p>
            </div>
          </div>
        </section>

        {/* ARPA-E & SBIR */}
        <section id="arpa-e-sbir" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            ARPA-E, SBIR, and Other Programs
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Smaller programs with outsized equipment relevance. Startups and
            early-career researchers building labs from scratch.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-[var(--color-gray-900)] mb-2">
                ARPA-E (Advanced Research Projects Agency, Energy)
              </h3>
              <p className="text-sm text-[var(--color-gray-700)]">
                High-risk, high-reward energy technology research. Roughly
                $400M annual budget funding projects in bioenergy, advanced
                batteries, carbon capture, grid-scale energy storage, and
                novel power generation. ARPA-E awards go to startups, small
                companies, universities, and national labs working on
                technologies that are too risky for private investment but too
                important to ignore.
              </p>
              <p className="text-sm text-[var(--color-gray-700)] mt-2">
                The equipment angle is strong. Many ARPA-E recipients are
                startups building out laboratories from scratch. They need
                everything: benchtop instruments, analytical equipment,
                testing systems, and characterization tools. These are
                first-time equipment buyers with federal money to spend and
                tight project timelines. They need instruments delivered fast
                and they often do not have established vendor relationships.
                That is an opportunity for any rep who can move quickly.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--color-gray-900)] mb-2">
                EPSCoR (Established Program to Stimulate Competitive Research)
              </h3>
              <p className="text-sm text-[var(--color-gray-700)]">
                DOE&apos;s EPSCoR program builds research capacity in states
                that historically receive less federal research funding.
                Awards often include explicit equipment line items because the
                whole point is building up research infrastructure where it
                does not currently exist. If you sell into smaller state
                universities in EPSCoR-eligible states, these grants can fund
                major instrument purchases.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--color-gray-900)] mb-2">
                SBIR/STTR Through DOE
              </h3>
              <p className="text-sm text-[var(--color-gray-700)]">
                DOE&apos;s SBIR/STTR program funds cleantech and energy
                startups. Phase I awards are small ($200K), but Phase II
                awards ($1M+) often include equipment purchases for prototype
                development and testing. These companies are building
                capabilities in batteries, solar, biofuels, hydrogen, and
                carbon capture. They need analytical instruments, testing
                equipment, and characterization tools.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--color-gray-900)] mb-2">
                Early Career Research Program
              </h3>
              <p className="text-sm text-[var(--color-gray-700)]">
                DOE&apos;s version of the NSF CAREER award. Funds young PIs at
                national labs and universities for five years with $150K/year
                (university) or $500K/year (national lab). These researchers
                are building new labs and establishing their research programs.
                Equipment is a primary budget item in the early years of these
                awards. If you track Early Career awardees, you are finding
                researchers at the exact moment they need to buy instruments.
              </p>
            </div>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Key takeaway:
                </span>{" "}
                ARPA-E startups, SBIR recipients, and Early Career awardees
                are all building labs. They represent some of the highest
                equipment-purchase-probability leads in the DOE portfolio
                because they are starting from zero and need instruments
                immediately.
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
            Most of DOE&apos;s $50B budget has nothing to do with lab
            equipment. Here is what to ignore.
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
            Equipment Signals in DOE Research
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            What DOE-funded labs actually buy. If you sell any of these
            categories, DOE research belongs in your pipeline.
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

        {/* Data Notes */}
        <section id="data-notes" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Data Notes
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            What to expect from DOE award data and how we handle it.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              DOE Office of Science grants have good descriptions in
              USASpending. Award abstracts typically include enough detail
              about the research methodology to determine equipment relevance.
              BER and BES awards are particularly well-documented, with clear
              descriptions of the scientific techniques being used.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              National lab procurement is harder to track. Internal lab
              purchases often do not show up in grant databases because the
              money flows from DOE to the lab as a management and operating
              contract, and the lab makes its own purchasing decisions within
              that budget. The grants you see in USASpending represent
              university awards and inter-lab transfers, not the full picture
              of lab equipment spending.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              ARPA-E awards are well-documented with clear project
              descriptions, technology areas, and performing organization
              details. These are some of the easiest DOE awards to classify
              for equipment relevance because the project descriptions
              explicitly state what technology is being developed.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  How we handle it:
                </span>{" "}
                We classify DOE awards by program office to separate research
                from non-research spending. Office of Science and ARPA-E
                awards get full equipment relevance scoring. NNSA, grid
                operations, environmental cleanup, and other non-research
                programs are filtered out so you only see grants with real
                equipment purchasing potential.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="comparison-table" className="pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            DOE Research Programs: Quick Reference
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
            Lab Leads Pro tracks DOE research grants and national lab activity
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with DOE-funded research grants scored for
            equipment purchasing signals, covering Office of Science programs
            alongside NIH, NSF, and all other agencies.
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
