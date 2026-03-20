import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CDC Grants Guide for Lab Equipment Sales Reps | Lab Leads Pro",
  description:
    "CDC spends $1B+ on extramural research and runs major labs in Atlanta. Learn which CDC programs buy lab equipment, from AMD sequencing to state public health lab modernization.",
  keywords:
    "CDC grants, CDC research funding, Advanced Molecular Detection, ELC grants, NIOSH grants, state public health labs, CDC cooperative agreements, pathogen surveillance, lab equipment sales, CDC sequencing",
  openGraph: {
    title: "CDC Grants Guide for Lab Equipment Sales Reps",
    description:
      "CDC funds equipment at state labs nationwide, not just universities. Here is what most reps miss about public health lab spending.",
    url: "https://lableadspro.com/database/guides/cdc-grants",
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
            id="mol-grid-cdc"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-cdc)" />
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

/* -- research programs data ----------------------------------------------- */

const researchPrograms: AgencySectionProps[] = [
  {
    id: "cdc-labs",
    abbr: "CDC Labs",
    name: "CDC Internal Laboratories (Atlanta and Beyond)",
    budget: "Hundreds of millions in lab operations",
    overview:
      "CDC runs some of the most advanced public health laboratories in the world. The main campus in Atlanta houses the Division of Laboratory Sciences, infectious disease reference labs, environmental health labs, and one of the few BSL-4 facilities in the country. These labs handle everything from Ebola characterization to environmental toxicology to newborn screening research. CDC also operates labs at the National Center for Environmental Health, the Arctic Investigations Program in Alaska, and NIOSH facilities in several states.",
    who: "CDC scientists (federal employees). Equipment purchased through federal procurement.",
    whyItMatters:
      "CDC's own labs are major equipment buyers. The Division of Laboratory Sciences alone runs mass spectrometers, chromatography systems, and immunoassay platforms at serious scale for biomonitoring (measuring chemical exposures in the US population). The infectious disease labs need BSL-3/4 equipment: biosafety cabinets, autoclaves, containment systems, plus the sequencers and PCR systems for pathogen characterization. Environmental health labs run analytical chemistry instruments for toxicology. These are institutional buyers with dedicated procurement staff and steady budgets.",
    programs: [
      { name: "Division of Laboratory Sciences (DLS)", detail: "Biomonitoring, nutritional biochemistry, tobacco exposure analysis. Heavy mass spec and chromatography operations. LC-MS/MS, GC-MS/MS, ICP-MS. This single division runs one of the largest analytical chemistry operations in the federal government." },
      { name: "Infectious Disease Labs", detail: "Reference labs for flu, HIV, TB, emerging pathogens. BSL-3 and BSL-4 capability. Sequencers (Illumina, PacBio, Oxford Nanopore), real-time PCR, culture systems, electron microscopy." },
      { name: "Environmental Health Labs", detail: "Air quality, water contamination, radiation exposure. Analytical chemistry, environmental monitoring instruments, dosimetry." },
    ],
    dataNote:
      "CDC internal procurement is tracked through federal spending data. Longer procurement cycles than academic grants, but consistent budgets year over year.",
    stars: 4,
  },
  {
    id: "amd",
    abbr: "AMD",
    name: "Advanced Molecular Detection Program",
    budget: "~$40M+ annual program budget",
    overview:
      "The AMD program is CDC's initiative to modernize pathogen surveillance with genomic sequencing and bioinformatics. Launched in 2014, AMD is the reason state public health labs across the country are buying next-generation sequencers. The program funds both CDC's own sequencing capacity and provides sequencing technology, training, and support to state and local public health laboratories. AMD is driving a fundamental shift from culture-based pathogen identification to whole-genome sequencing for outbreak detection.",
    who: "State public health labs, CDC internal labs, some university partners.",
    whyItMatters:
      "If you sell sequencing platforms, AMD is one of the single most important programs in the federal government for your pipeline. AMD has directly funded the purchase of Illumina MiSeq and NextSeq instruments at state labs nationwide. It also drives purchases of library prep equipment, bioinformatics computing infrastructure, and the consumables pipeline that follows every instrument placement. This is not a one-time purchase; it is an ongoing modernization wave that is still expanding as whole-genome sequencing becomes the standard for foodborne illness investigation, antimicrobial resistance tracking, and respiratory pathogen surveillance.",
    programs: [
      { name: "State Lab Sequencing Capacity", detail: "Funding and technology transfer to get sequencers into all 50 state public health labs. Illumina platforms dominate, but Oxford Nanopore gaining ground for rapid field-deployable sequencing." },
      { name: "PulseNet / Whole Genome Sequencing", detail: "The national molecular subtyping network for foodborne disease surveillance. Transitioned from PFGE to WGS. Every participating lab needs sequencing capability." },
      { name: "Bioinformatics Infrastructure", detail: "Computing hardware, cloud analysis platforms, and data storage to handle the sequencing output. Servers, high-performance computing clusters." },
    ],
    dataNote:
      "AMD-related awards are identifiable in CDC funding data. We flag grants mentioning molecular detection, whole genome sequencing, and pathogen genomics. Cross-reference with state public health lab directories to identify specific facilities receiving equipment.",
    stars: 5,
  },
  {
    id: "elc",
    abbr: "ELC",
    name: "Epidemiology and Laboratory Capacity Grants",
    budget: "~$200M+ annual budget (variable, surged during COVID)",
    overview:
      "ELC is CDC's primary mechanism for funding state and local public health laboratory capacity. These grants go to state health departments and fund lab infrastructure, equipment, testing capability, and workforce. ELC surged massively during COVID-19 with billions in supplemental funding for testing capacity, and that investment is now being sustained and redirected toward broader lab modernization. ELC grants fund everything from molecular diagnostics platforms to lab information management systems (LIMS) to automated sample processing.",
    who: "State and local health departments, specifically their public health laboratories.",
    whyItMatters:
      "ELC grants are the main funding mechanism for equipment at state public health labs. When a state lab buys a new molecular diagnostics platform, automated extraction system, or BSL-3 upgrade, ELC funding is often paying for it. The post-COVID modernization wave is real and ongoing. State labs that received surge funding for COVID testing are now using remaining balances and new ELC allocations to upgrade their broader lab capabilities. PCR systems, automated liquid handling, sequencers, and LIMS implementations are all happening right now.",
    programs: [
      { name: "Core ELC Grants", detail: "Baseline laboratory capacity. Equipment for routine public health testing: clinical analyzers, automated extraction, PCR, basic microbiology." },
      { name: "ELC COVID Supplements (Ongoing)", detail: "Billions allocated during COVID, with spending still ongoing. Molecular diagnostics platforms, automated sample processing, high-throughput testing systems." },
      { name: "Lab Modernization Initiatives", detail: "Automation, digital pathology, LIMS modernization, data integration. Equipment and IT infrastructure for 21st-century public health labs." },
    ],
    dataNote:
      "ELC awards are clearly identifiable in CDC funding data. We track awards to state health departments and flag those with laboratory capacity and equipment keywords.",
    stars: 4,
  },
  {
    id: "eip",
    abbr: "EIP",
    name: "Emerging Infections Programs",
    budget: "~$50M+ annual program",
    overview:
      "A network of 10 state health departments (California, Colorado, Connecticut, Georgia, Maryland, Minnesota, New Mexico, New York, Oregon, Tennessee) partnered with CDC, local health departments, and university labs. EIP sites conduct active, population-based surveillance for emerging infectious diseases. The lab component involves pathogen characterization, antimicrobial resistance testing, and molecular epidemiology.",
    who: "10 state health departments, affiliated university labs, CDC.",
    whyItMatters:
      "EIP sites are heavy users of microbiology and molecular biology equipment. Each site does pathogen isolation, antimicrobial susceptibility testing, and increasingly whole-genome sequencing for molecular epidemiology. University lab partners at EIP sites often receive sub-awards that fund equipment purchases. If you cover any of the 10 EIP states, these labs are active buyers of microbiology automation, PCR systems, and sequencing equipment.",
    programs: [
      { name: "FoodNet", detail: "Foodborne disease surveillance. Pathogen isolation, characterization, WGS. Microbiology equipment at 10 state labs." },
      { name: "ABCs (Active Bacterial Core surveillance)", detail: "Invasive bacterial diseases. Culture, serotyping, antimicrobial susceptibility testing. Clinical microbiology instruments." },
      { name: "HAIC (Healthcare-Associated Infections)", detail: "HAI surveillance. Molecular typing, resistance gene detection. PCR, sequencing." },
    ],
    dataNote:
      "EIP awards are trackable through CDC funding to the 10 participating state health departments and their university partners. We identify the specific lab components.",
    stars: 3,
  },
  {
    id: "niosh",
    abbr: "NIOSH",
    name: "National Institute for Occupational Safety and Health",
    budget: "~$350M annual budget",
    overview:
      "NIOSH is CDC's research arm for workplace health and safety. Most people think of NIOSH as the agency that sets exposure limits and publishes safety guidelines. That is true, but NIOSH also runs real research laboratories and funds extramural research at universities. Their labs study chemical exposure, noise-induced hearing loss, respiratory hazards, mining safety, nanotechnology risks, and ergonomics. NIOSH operates facilities in Cincinnati, Morgantown (WV), Pittsburgh, Spokane, and Anchorage.",
    who: "NIOSH scientists (federal employees) plus extramural grants to universities through Education and Research Centers (ERCs).",
    whyItMatters:
      "NIOSH is often overlooked entirely by equipment reps. Their labs use environmental monitoring instruments, analytical chemistry systems, exposure assessment equipment, aerosol characterization instruments, and particle counters. The university grants through ERCs (Education and Research Centers) fund industrial hygiene, occupational medicine, and safety engineering research that requires real instrumentation. If you sell environmental monitoring, analytical chemistry, or aerosol measurement equipment, NIOSH is a market segment worth knowing.",
    programs: [
      { name: "NIOSH Internal Labs", detail: "Exposure assessment, analytical chemistry (silica, metals, organic compounds), aerosol science, noise measurement. GC-MS, ICP-MS, particle sizers, sound level meters, real-time exposure monitors." },
      { name: "Education and Research Centers (ERCs)", detail: "University-based training and research programs in occupational health. ~20 funded centers. Extramural research with equipment components." },
      { name: "Mining Safety and Health Research", detail: "Pittsburgh and Spokane labs. Dust monitoring, ventilation testing, ground control research. Specialized environmental monitoring equipment." },
      { name: "Nanotechnology Research Center", detail: "Nanoparticle exposure, characterization, toxicology. Electron microscopy, particle characterization instruments, cell culture systems." },
    ],
    dataNote:
      "NIOSH awards tracked through CDC/HHS funding data. University ERC grants are identifiable. Internal lab procurement follows federal spending patterns.",
    stars: 3,
  },
];

/* -- noise programs data -------------------------------------------------- */

const noisePrograms: NoiseItemProps[] = [
  {
    name: "Surveillance and Epidemiology Programs (Non-Lab)",
    description: "The majority of CDC's extramural funding goes to disease surveillance that is data collection, not lab work. Counting cases, tracking trends, conducting phone surveys, analyzing electronic health records. These programs employ epidemiologists and data analysts, not bench scientists.",
    verdict: "Massive volume of CDC awards. Zero lab equipment. Filter for keywords like 'laboratory,' 'sequencing,' or 'molecular' to find the signal.",
  },
  {
    name: "Education and Prevention Campaigns",
    description: "Anti-smoking campaigns, vaccination promotion, HIV prevention outreach, opioid awareness programs, health communication. CDC spends heavily on public education. These are marketing and outreach programs.",
    verdict: "Important public health work, but nobody is buying a mass spectrometer with a smoking cessation grant. Skip.",
  },
  {
    name: "State and Local Health Department Operations",
    description: "CDC funds state and local health departments for general operations: disease reporting, contact tracing, vital statistics, immunization programs, emergency preparedness. Most of this is administrative and clinical, not laboratory.",
    verdict: "Only a small fraction of health department funding goes to labs. Filter carefully or you will drown in operational grants.",
  },
  {
    name: "Prevention Research Centers",
    description: "36 university-based centers studying chronic disease prevention, nutrition, physical activity, and community health interventions. Primarily behavioral science, surveys, and community-based studies.",
    verdict: "Behavioral and epidemiological research. Computers and surveys, not lab instruments.",
  },
  {
    name: "Global Health Programs",
    description: "CDC supports public health capacity in dozens of countries. Malaria, HIV/AIDS (PEPFAR), tuberculosis, polio eradication, global health security. Equipment purchases happen overseas and go through very different procurement channels.",
    verdict: "Real lab work, but the equipment goes to labs in other countries. Not your territory unless you sell internationally.",
  },
];

/* -- equipment signals data ----------------------------------------------- */

const equipmentSignals = [
  { category: "Next-Gen Sequencers", examples: "Illumina MiSeq/NextSeq, Oxford Nanopore MinION/GridION, PacBio. Whole-genome sequencing for pathogen surveillance, outbreak investigation, antimicrobial resistance tracking", where: "AMD Program, ELC, EIP" },
  { category: "PCR and Molecular Diagnostics", examples: "Real-time PCR, digital PCR, multiplex molecular panels. Pathogen detection, respiratory virus testing, tuberculosis diagnostics", where: "ELC, CDC Labs, EIP" },
  { category: "Mass Spectrometry", examples: "LC-MS/MS, GC-MS/MS, ICP-MS. Environmental toxicology, biomonitoring, occupational exposure assessment, food safety", where: "CDC DLS, NIOSH, State Labs" },
  { category: "Chromatography (HPLC, GC)", examples: "Pesticide analysis, drug metabolites, environmental contaminants, nutritional biochemistry", where: "CDC DLS, NIOSH, State Labs" },
  { category: "BSL Equipment", examples: "Biosafety cabinets (Class II/III), autoclaves, containment ventilation, pass-through chambers, decontamination systems", where: "CDC Infectious Disease Labs, State Labs" },
  { category: "Automated Sample Processing", examples: "Liquid handling robots, automated extraction systems, high-throughput sample prep for molecular testing", where: "ELC, AMD, State Labs" },
  { category: "Clinical Microbiology", examples: "Automated culture systems, antimicrobial susceptibility testing, MALDI-TOF for pathogen ID", where: "EIP, State Labs, CDC Labs" },
  { category: "Environmental Monitoring", examples: "Air quality monitors, particle counters, noise dosimeters, real-time exposure monitors", where: "NIOSH" },
  { category: "Lab Information Systems (LIMS)", examples: "Sample tracking, data management, electronic lab reporting, interoperability platforms", where: "ELC (Modernization)" },
];

/* -- comparison table data ------------------------------------------------ */

const tableRows = [
  { program: "CDC Internal Labs (DLS)", budget: "Hundreds of $M", stars: 4, signal: "Strong", notes: "Analytical chemistry, mass spec, chromatography at scale." },
  { program: "CDC Infectious Disease Labs", budget: "Included above", stars: 4, signal: "Strong", notes: "BSL-3/4, sequencing, PCR, electron microscopy." },
  { program: "AMD Program", budget: "~$40M+", stars: 5, signal: "Primary", notes: "Driving sequencer purchases at state labs nationwide." },
  { program: "ELC Grants", budget: "~$200M+ (variable)", stars: 4, signal: "Strong", notes: "State lab equipment. Post-COVID modernization wave." },
  { program: "EIP (10 sites)", budget: "~$50M+", stars: 3, signal: "Good", notes: "Microbiology and molecular biology at 10 state labs." },
  { program: "NIOSH", budget: "~$350M", stars: 3, signal: "Good", notes: "Environmental monitoring, analytical chemistry. Overlooked." },
  { program: "Cooperative Agreements (Research)", budget: "Variable", stars: 2, signal: "Moderate", notes: "University research with CDC involvement." },
  { program: "Surveillance (Non-Lab)", budget: "Billions", stars: 0, signal: "None", notes: "Data collection, not lab work. Skip." },
  { program: "Prevention Campaigns", budget: "Hundreds of $M", stars: 0, signal: "None", notes: "Public education, not research. Skip." },
  { program: "Global Health (PEPFAR, etc.)", budget: "Billions", stars: 0, signal: "None (domestic)", notes: "Equipment goes overseas. Skip unless international." },
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "why-cdc", label: "Why CDC Matters" },
  { id: "state-labs", label: "State Lab Angle" },
  { id: "key-programs", label: "Key Programs" },
  { id: "the-noise", label: "What to Skip" },
  { id: "equipment-signals", label: "Equipment Signals" },
  { id: "post-covid", label: "Post-COVID Wave" },
  { id: "comparison-table", label: "Quick Reference" },
];

/* -- page component ------------------------------------------------------- */

export default function CDCGrantsGuide() {
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
              CDC Research Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            CDC Research:{" "}
            <span className="text-[var(--color-brand)]">
              State Labs, Sequencing, and a Post-COVID Equipment Wave
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            CDC is different from every other agency on this list. Most
            federal research money goes to universities. CDC funding goes
            to state public health labs, CDC&apos;s own labs in Atlanta,
            and a network of surveillance sites that span the country.
            The buyer profile is different. The procurement is different.
            And right now, there is a multi-year wave of lab modernization
            driven by post-COVID investment that is putting new instruments
            into state labs in all 50 states.
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
        {/* Why CDC Matters */}
        <section id="why-cdc" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Why CDC Matters for Equipment Sales
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            A different kind of buyer, and a different kind of opportunity.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              Most grant intelligence tools focus on university PIs. CDC
              funding goes to a completely different set of customers. State
              public health labs in all 50 states. CDC&apos;s own reference
              labs in Atlanta. NIOSH research facilities in Cincinnati,
              Morgantown, Pittsburgh, and Spokane. Emerging Infections
              Program sites at 10 state health departments.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The equipment needs are real. State labs run mass spectrometers
              for environmental toxicology. They operate sequencers for
              pathogen surveillance. They maintain BSL-3 facilities with
              biosafety cabinets and containment systems. CDC&apos;s own
              Division of Laboratory Sciences operates one of the largest
              analytical chemistry platforms in the federal government,
              running thousands of biomonitoring samples through LC-MS/MS
              and ICP-MS systems every year.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The challenge is noise. CDC&apos;s total budget is massive, and
              most of it funds surveillance programs, education campaigns, and
              public health interventions that involve zero lab equipment. You
              need to filter hard for the programs that actually touch
              laboratories. That is what this guide is for.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The bottom line:
                </span>{" "}
                CDC is not going to be your highest-volume agency. But the
                leads are real, the equipment needs are specific, and the
                post-COVID modernization wave means there is more money
                flowing to state labs right now than at any point in the
                last two decades.
              </p>
            </div>
          </div>
        </section>

        {/* State Lab Angle */}
        <section id="state-labs" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The State Public Health Lab Angle
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            50 states, 50 labs, and they all need equipment. This is a buyer profile most reps never think about.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              Every state has a public health laboratory. These are not
              university labs and they are not hospitals. They are
              state-operated facilities that handle pathogen surveillance
              (identifying disease outbreaks), environmental testing (water
              quality, food safety, toxic exposure), newborn screening
              (every baby born in the US gets screened for metabolic
              disorders), and emergency response testing (bioterrorism,
              chemical spills, radiological events).
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              State labs have different procurement rules than universities.
              They buy through state government purchasing, which means RFPs,
              state contracts, and sometimes group purchasing organizations.
              CDC grants (especially ELC) provide the federal funding, but
              the purchase goes through the state procurement office. If you
              sell through state government channels, this is your market.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The equipment profile at state labs is distinctive. Heavy on
              molecular diagnostics (PCR, sequencing), clinical microbiology
              (culture, susceptibility testing, MALDI-TOF), analytical
              chemistry (mass spec for toxicology and environmental testing),
              and newborn screening instruments (tandem mass spec, immunoassay
              platforms). Some state labs are small operations with a handful
              of staff. Others, like the California, New York, and Texas
              state labs, are major facilities rivaling university core labs
              in capability.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Finding the right contacts:
                </span>{" "}
                The Association of Public Health Laboratories (APHL)
                maintains a directory of state labs. CDC WONDER and other
                public databases can identify which state labs are doing
                what types of testing, helping you target the right
                facilities for your specific instruments.
              </p>
            </div>
          </div>
        </section>

        {/* Key Programs */}
        <section id="key-programs" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Key CDC Research Programs
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            The programs within CDC that actually fund lab equipment purchases.
            Sorted by relevance to equipment sales.
          </p>
          <div className="space-y-8">
            {researchPrograms.map((a) => (
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
            Most CDC funding goes to programs that do not involve lab
            equipment. Here is what to filter out.
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
            Equipment Signals in CDC-Funded Labs
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            What CDC-funded labs actually buy, and which programs to watch
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

        {/* Post-COVID Modernization */}
        <section id="post-covid" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The Post-COVID Lab Modernization Wave
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            This is a multi-year spending event still in progress. Pay attention.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              COVID-19 exposed how underfunded and understaffed state public
              health labs were. Congress responded with billions in
              supplemental funding through ELC and other mechanisms. That
              money is still being spent. State labs are not just replacing
              what they had before. They are modernizing.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The spending categories are clear: molecular diagnostics
              platforms (the testing infrastructure built during COVID is now
              being expanded for broader pathogen surveillance), next-gen
              sequencing (every state lab is building or expanding WGS
              capability), laboratory automation (liquid handling robots,
              automated extraction, high-throughput processing), and LIMS
              systems (replacing paper-based and outdated electronic systems
              with modern lab information management).
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              This is not a one-year event. State labs received multi-year
              funding, and the modernization plans are phased over 3 to 5
              years. Labs that bought basic PCR systems in 2020 and 2021
              are now upgrading to automated platforms. Labs that got their
              first sequencer in 2022 are now adding bioinformatics
              infrastructure. The wave is still building.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  What this means for you:
                </span>{" "}
                If you sell molecular diagnostics, sequencing, automation,
                or LIMS to state government customers, the next 2 to 3 years
                represent a historically unusual buying window. The funding
                is there. The mandate to modernize is there. And state labs
                are actively issuing RFPs for this equipment right now.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="comparison-table" className="pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            CDC Programs: Quick Reference
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
            Lab Leads Pro tracks CDC-funded lab equipment purchases
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with CDC-funded grants in your state,
            including state public health lab awards and AMD-related
            sequencing investments, scored for equipment purchasing signals.
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
