import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideSchema from "@/components/GuideSchema";
import GuidesCrossLinks from "@/components/GuidesCrossLinks";

export const metadata: Metadata = {
  title: "CDC Research Grants Guide for Lab Equipment Sales Reps | Lab Leads Pro",
  description:
    "CDC funds $1B+ in extramural research plus massive internal labs in Atlanta. Learn which CDC programs drive sequencer, PCR, mass spec, and BSL equipment purchases at universities and state public health labs nationwide.",
  keywords:
    "CDC grants, CDC research funding, cooperative agreements, ELC grants, AMD program, Advanced Molecular Detection, Emerging Infections Programs, NIOSH grants, state public health labs, CDC laboratory, pathogen surveillance, lab equipment sales, sequencer purchases, BSL equipment",
  openGraph: {
    title: "CDC Research Grants Guide for Lab Equipment Sales Reps",
    description:
      "CDC quietly funds lab equipment at universities and all 50 state public health labs. Here is what most reps miss.",
    url: "https://lableadspro.com/cdc-grants-guide",
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

/* -- grant mechanisms data ------------------------------------------------ */

const grantMechanisms: AgencySectionProps[] = [
  {
    id: "cooperative-agreements",
    abbr: "U-Series",
    name: "Cooperative Agreements",
    budget: "Primary CDC funding mechanism",
    overview:
      "Cooperative agreements are how CDC funds most extramural research. This is important because they work differently than NIH grants. With an NIH R01, the PI designs the study and runs it independently. With a CDC cooperative agreement, CDC scientists actively participate in the study design, data collection, and analysis. CDC is a partner, not just a funder. This changes the equipment purchasing dynamic because CDC program staff often have input on which instruments get purchased to ensure data compatibility across the surveillance network.",
    who: "Universities, state and local health departments, research institutions. Heavily weighted toward schools of public health and state lab systems.",
    whyItMatters:
      "Cooperative agreements fund the bulk of CDC's extramural laboratory work. When CDC awards a cooperative agreement for pathogen surveillance or environmental health monitoring, the recipient institution needs instruments to do the work. Sequencers for genomic surveillance. PCR systems for diagnostic testing. Mass spectrometers for environmental toxicology. The key difference from NIH: CDC cooperative agreements often specify equipment requirements in the funding opportunity announcement (FOA), because they need standardized data across participating sites. This makes the equipment purchasing signal stronger and more predictable than a typical research grant.",
    programs: [
      { name: "ELC (Epidemiology and Laboratory Capacity)", detail: "The single biggest CDC program for state and local public health lab funding. ELC grants go to all 50 state health departments and fund laboratory infrastructure for infectious disease testing, environmental monitoring, and outbreak response. This is where state labs get money to buy sequencers, PCR systems, and automated sample processing equipment. ELC surged during COVID and the modernization spending continues." },
      { name: "AMD (Advanced Molecular Detection)", detail: "Genomic sequencing for pathogen surveillance. AMD has single-handedly put next-gen sequencers in state public health labs across the country. If you sell sequencing platforms, AMD is one of the most important federal programs for your pipeline. The program funds instrument purchases, library prep infrastructure, bioinformatics computing, and the training to use all of it." },
      { name: "EIP (Emerging Infections Programs)", detail: "A 10-site surveillance network (California, Colorado, Connecticut, Georgia, Maryland, Minnesota, New Mexico, New York, Oregon, Tennessee). Each site runs active laboratory surveillance for emerging pathogens: culture, molecular testing, and whole-genome sequencing. Equipment purchases happen at each of the 10 participating state health departments." },
    ],
    dataNote:
      "Cooperative agreement awards tracked via USASpending with recipient institution data. Cross-reference with CDC's published FOAs for specific equipment requirements listed in the program description.",
    stars: 5,
  },
  {
    id: "cdc-internal-labs",
    abbr: "CDC Labs",
    name: "CDC Internal Laboratories (Atlanta Campus and Field Stations)",
    budget: "Federal procurement (billions in total CDC ops budget)",
    overview:
      "CDC's own laboratories in Atlanta are some of the most advanced public health labs on the planet. The Division of Laboratory Sciences runs reference testing for the entire US population through the National Health and Nutrition Examination Survey (NHANES) biomonitoring program. The Infectious Disease labs handle everything from routine surveillance cultures to BSL-4 maximum containment work with Ebola, Marburg, and other high-consequence pathogens. The Environmental Health labs do analytical chemistry and toxicology testing at a scale that most university labs cannot match. CDC also operates labs at field stations including the Arctic Investigations Program in Anchorage.",
    who: "CDC procurement (federal acquisition). Equipment purchased through GSA schedules and federal contracting.",
    whyItMatters:
      "CDC Atlanta buys instruments at institutional scale. When the Division of Laboratory Sciences upgrades its mass spec fleet for NHANES biomonitoring, that is a multi-million dollar procurement event. When the Infectious Disease labs expand sequencing capacity, they are buying multiple high-throughput platforms at once. The BSL-4 facility needs specialized biosafety cabinets, autoclaves, containment centrifuges, and HEPA filtration systems that command premium pricing. The challenge: CDC procurement is federal, which means SAM.gov registration, GSA schedules, and longer sales cycles. The reward: large purchase orders with predictable replacement cycles and a customer that does not haggle on price the way universities do.",
    programs: [
      { name: "Division of Laboratory Sciences (DLS)", detail: "Reference testing for clinical chemistry, nutritional biomarkers, environmental exposures (PFAS, heavy metals, pesticides), and tobacco/nicotine. Heavy users of LC-MS/MS, GC-MS/MS, ICP-MS, clinical analyzers, and automated sample handling. One of the largest analytical chemistry operations in the federal government. Runs thousands of biomonitoring samples per year." },
      { name: "Infectious Disease Laboratories", detail: "BSL-2 through BSL-4 capable. Culture, molecular diagnostics, whole-genome sequencing, serology, electron microscopy. Equipment includes biosafety cabinets (Class II and Class III), pass-through autoclaves, PCR thermal cyclers, Illumina and Oxford Nanopore sequencing platforms, automated liquid handlers, and containment-rated centrifuges." },
      { name: "Environmental Health Labs", detail: "Analytical chemistry for environmental exposures. GC-MS and LC-MS for organic contaminants, ICP-MS for metals, automated sample prep systems. Testing covers pesticides, heavy metals, volatile organics, and PFAS. These labs support the National Report on Human Exposure to Environmental Chemicals." },
      { name: "NCEZID (Emerging and Zoonotic Infectious Diseases)", detail: "Outbreak response laboratories. When there is a new pathogen or an unusual outbreak, NCEZID labs do the initial characterization. Rapid diagnostics, sequencing for pathogen identification, antimicrobial susceptibility testing. Equipment needs spike during outbreak responses." },
    ],
    dataNote:
      "CDC internal procurement tracked through FPDS (Federal Procurement Data System) and SAM.gov. Look for solicitations referencing specific instrument categories. GSA Advantage listings show current contract vehicles for lab equipment.",
    stars: 4,
  },
  {
    id: "niosh",
    abbr: "NIOSH",
    name: "National Institute for Occupational Safety and Health",
    budget: "~$350M annual budget",
    overview:
      "NIOSH is technically part of CDC, but it operates as its own research institute focused entirely on workplace health and safety. Most reps have never heard of it. NIOSH runs its own laboratories in Pittsburgh, Morgantown (WV), Cincinnati, Spokane, and Anchorage, and funds extramural research at universities. The research covers everything from coal mine dust exposure to healthcare worker needlestick injuries to firefighter cancer risk to nanoparticle inhalation toxicology. It is a completely separate research ecosystem from the rest of CDC.",
    who: "NIOSH intramural labs (federal employees), universities with occupational health programs through Education and Research Centers (ERCs), and state-based occupational safety programs.",
    whyItMatters:
      "NIOSH labs are heavy users of analytical instruments for exposure assessment. Air sampling equipment, particle counters and sizers, personal monitoring devices, and the analytical instruments that process those samples back in the lab. Industrial hygiene labs need GC-MS and LC-MS for chemical exposure quantification. ICP-MS for metals analysis in biological samples. Toxicology studies need cell culture equipment, biological assay instruments, and microscopy. The extramural grants fund university occupational health programs that buy the same types of instruments. If you sell environmental monitoring equipment, analytical chemistry instruments, or aerosol characterization systems, NIOSH is a real market that your competitors are not calling on.",
    programs: [
      { name: "Intramural Research Labs", detail: "NIOSH facilities in Pittsburgh, Morgantown, Cincinnati, Spokane, and Anchorage. Analytical chemistry for exposure assessment (silica, metals, organic compounds), aerosol science, toxicology, and engineering controls testing. Regular equipment replacement cycles on federal procurement timelines." },
      { name: "Education and Research Centers (ERCs)", detail: "17 university-based training centers for occupational health professionals. Each ERC has research labs that need analytical instruments, exposure monitoring equipment, and biological assay tools. Funded through cooperative agreements." },
      { name: "Extramural Research Grants (R01, R21)", detail: "Competitive research grants for occupational health studies at universities. Equipment budgets vary, but analytical chemistry, toxicology instruments, and environmental monitoring equipment are common purchases." },
      { name: "Agricultural Safety and Health Centers", detail: "12 centers focused on farming, forestry, and fishing safety. Environmental monitoring for pesticide exposure, dust analysis, noise assessment, and biological sample analysis for exposure biomarkers." },
    ],
    dataNote:
      "NIOSH awards tracked via USASpending under CDC/HHS. Cross-reference with NIOSH's published research portfolio for specific lab capabilities at each site. ERC directories list university programs and their research focus areas.",
    stars: 3,
  },
];

/* -- noise programs data -------------------------------------------------- */

const noisePrograms: NoiseItemProps[] = [
  {
    name: "Surveillance and Epidemiology Programs (Non-Lab)",
    description: "The majority of CDC's extramural funding goes to disease surveillance that is data collection, not lab work. Case counting, trend tracking, phone surveys (BRFSS), electronic health record analysis, vital statistics compilation. These programs employ epidemiologists and data analysts working with spreadsheets and statistical software, not bench scientists working with instruments.",
    verdict: "Massive volume of CDC awards. Zero lab equipment. When you see 'surveillance' in a CDC award, check whether it includes a laboratory component. Most do not.",
  },
  {
    name: "Education and Prevention Campaigns",
    description: "Anti-smoking campaigns, vaccination promotion, HIV prevention outreach, opioid awareness programs, health literacy initiatives. CDC spends billions on public education and behavior change interventions. Creative agencies and communications firms get this money, not laboratories.",
    verdict: "Nobody is buying a mass spectrometer with a smoking cessation grant. Skip entirely.",
  },
  {
    name: "State and Local Health Department Operations",
    description: "CDC funds state and local health departments for general operations: disease reporting systems, contact tracing staff, vital statistics, immunization registries, emergency preparedness coordination. Most of this is administrative and clinical, not laboratory. Only a small fraction of overall health department funding touches the lab.",
    verdict: "Filter carefully. ELC and AMD awards to health departments include lab equipment. General operations awards do not. The program name matters.",
  },
  {
    name: "Prevention Research Centers",
    description: "36 university-based centers studying chronic disease prevention, nutrition, physical activity, and community health interventions. This is primarily behavioral science: surveys, focus groups, community-based studies, intervention trials that measure outcomes through questionnaires, not instruments.",
    verdict: "Behavioral and epidemiological research. Computers and surveys, not lab instruments. Low equipment relevance.",
  },
  {
    name: "Academic Centers of Excellence",
    description: "Training-focused awards to universities for building public health workforce capacity. Curriculum development, student support, field placements, continuing education. The money goes to faculty salaries, student stipends, and program administration.",
    verdict: "Training programs. The 'center' in the name makes them sound like research operations. They are not. Skip.",
  },
  {
    name: "Global Health Programs",
    description: "CDC operates in 60+ countries. Global disease surveillance, HIV/AIDS treatment (PEPFAR), malaria programs, polio eradication, Ebola response. These programs fund real lab work, but the equipment gets purchased and shipped overseas through international procurement channels.",
    verdict: "Real lab equipment needs, but international distribution and procurement. Unless you sell through international channels, the complexity is not worth the pursuit.",
  },
];

/* -- equipment signals data ----------------------------------------------- */

const equipmentSignals = [
  { category: "Next-Gen Sequencers", examples: "Illumina MiSeq and NextSeq at state labs, NovaSeq at CDC reference labs, Oxford Nanopore for rapid field-deployable sequencing. Whole-genome sequencing for pathogen surveillance, outbreak investigation, antimicrobial resistance tracking.", where: "AMD Program, ELC grants, EIP sites, CDC Infectious Disease labs" },
  { category: "PCR and Molecular Diagnostics", examples: "Real-time PCR thermal cyclers, digital PCR systems, multiplex molecular panels for respiratory and GI pathogens, automated nucleic acid extraction platforms.", where: "ELC grants (all 50 state labs), CDC Infectious Disease labs, LRN" },
  { category: "Mass Spectrometry (LC-MS/MS, ICP-MS)", examples: "Environmental toxicology (PFAS, pesticides, heavy metals), NHANES biomonitoring, newborn screening (tandem MS), MALDI-TOF for pathogen identification, occupational exposure assessment.", where: "CDC DLS (largest user), state environmental labs, newborn screening labs, NIOSH" },
  { category: "BSL Equipment", examples: "Class II and Class III biosafety cabinets, pass-through autoclaves rated for BSL-3 and BSL-4, containment centrifuges, HEPA filtration systems, chemical shower systems for BSL-4 suit labs, fumigation chambers.", where: "CDC Atlanta BSL-4, state public health labs (BSL-3), EIP sites" },
  { category: "Chromatography (GC/LC)", examples: "GC-MS for volatile organic compounds and pesticide analysis, LC-MS for drug and metabolite quantification, ion chromatography for water quality anion analysis.", where: "CDC Environmental Health labs, NIOSH exposure assessment, state environmental testing" },
  { category: "Clinical Analyzers", examples: "Automated chemistry, hematology, and immunoassay analyzers for reference testing. Newborn screening instruments (immunoassay for congenital hypothyroidism, cystic fibrosis).", where: "CDC DLS reference testing, state clinical reference labs, newborn screening" },
  { category: "Automated Liquid Handling", examples: "High-throughput sample processing for surveillance testing, plate prep for PCR, specimen aliquoting for biobanking. Automation is a major focus of post-COVID lab modernization.", where: "CDC internal labs, high-volume state labs, ELC-funded modernization" },
  { category: "Environmental Monitoring", examples: "Air sampling pumps, particle counters and sizers, personal exposure monitors, real-time aerosol analyzers, noise dosimeters. Used for both occupational health research and environmental health studies.", where: "NIOSH intramural labs, NIOSH-funded university ERCs, CDC Environmental Health" },
  { category: "LIMS and Lab Informatics", examples: "Laboratory information management systems for tracking specimens, results, and workflows. Electronic lab reporting interfaces. CDC's Data Modernization Initiative is pushing LIMS upgrades at state labs nationwide.", where: "ELC grants (state labs), CDC Data Modernization Initiative" },
];

/* -- comparison table data ------------------------------------------------ */

const tableRows = [
  { program: "ELC Grants (State Labs)", budget: "~$200M+ (variable)", stars: 5, signal: "Primary", notes: "Direct lab infrastructure funding at all 50 state health departments." },
  { program: "AMD Program (Sequencing)", budget: "~$40M+", stars: 5, signal: "Primary", notes: "Sequencer purchases at state labs. Single biggest driver." },
  { program: "CDC Internal Labs (DLS)", budget: "Hundreds of $M", stars: 4, signal: "Strong", notes: "Analytical chemistry, mass spec, chromatography at institutional scale." },
  { program: "CDC Infectious Disease Labs", budget: "Included above", stars: 4, signal: "Strong", notes: "BSL-3/4, sequencing, PCR, electron microscopy." },
  { program: "Cooperative Agreements (Research)", budget: "Variable", stars: 4, signal: "Strong", notes: "University and state lab equipment. CDC-involved study design." },
  { program: "EIP (10-Site Network)", budget: "~$50M+", stars: 3, signal: "Good", notes: "Active surveillance with lab components at each site." },
  { program: "NIOSH (Intramural + Extramural)", budget: "~$350M", stars: 3, signal: "Good", notes: "Analytical chemistry, exposure assessment. Often overlooked." },
  { program: "Prevention Research Centers", budget: "~$60M", stars: 1, signal: "Low", notes: "Behavioral science. Surveys, not instruments." },
  { program: "Academic Centers of Excellence", budget: "Varies", stars: 1, signal: "Low", notes: "Training focused. Minimal equipment budgets." },
  { program: "Surveillance (Non-Lab)", budget: "Billions", stars: 0, signal: "None", notes: "Data collection, not lab work. Skip." },
  { program: "Education/Outreach Campaigns", budget: "Billions", stars: 0, signal: "None", notes: "Public communications. Skip." },
  { program: "Global Health (PEPFAR, etc.)", budget: "Billions", stars: 0, signal: "None (domestic)", notes: "Equipment goes overseas. Skip unless international." },
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "why-cdc", label: "Why CDC Matters" },
  { id: "grant-mechanisms", label: "Grant Mechanisms" },
  { id: "cdc-internal-labs", label: "CDC Labs (Atlanta)" },
  { id: "niosh", label: "NIOSH" },
  { id: "state-labs", label: "State Public Health Labs" },
  { id: "post-covid", label: "Post-COVID Modernization" },
  { id: "the-noise", label: "What to Skip" },
  { id: "equipment-signals", label: "Equipment Signals" },
  { id: "comparison-table", label: "Quick Reference" },
];

/* -- page component ------------------------------------------------------- */

export default function CDCGrantsGuide() {
  return (
    <>
      <GuideSchema
        title="CDC Research Grants Guide for Equipment Sales"
        description="Public health research grants and CDC lab equipment purchasing patterns."
        url="https://lableadspro.com/cdc-grants-guide"
        faqs={[
          { question: "Does the CDC fund lab equipment purchases?", answer: "CDC funds laboratory capacity through cooperative agreements with state and local health departments. Their Epidemiology and Laboratory Capacity program supports diagnostic equipment for infectious disease testing and surveillance." },
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
            federal research money goes to universities. CDC funding goes to
            state public health labs, CDC&apos;s own massive labs in Atlanta,
            and a network of surveillance sites that span the country. The
            buyer profile is different. The procurement is different. And
            right now, there is a multi-year wave of lab modernization driven
            by post-COVID investment that is putting new instruments into
            state labs in all 50 states. If you sell sequencers, PCR systems,
            mass spectrometers, or BSL equipment, CDC money is buying your
            products right now. You just might not know where.
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
            Three distinct buyer pools, all funded by the same agency.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              CDC is not a single buyer. It is three separate equipment
              markets wrapped inside one agency. First, CDC&apos;s own
              internal laboratories in Atlanta and at field stations around
              the country. These are federal facilities that buy instruments
              through federal procurement at institutional scale. Second,
              university researchers funded through CDC cooperative
              agreements. They buy through standard academic procurement,
              just like NIH-funded PIs. Third, state and local public health
              laboratories funded by CDC grants like ELC and AMD. These are
              state government facilities with their own procurement
              processes, their own contracting officers, and their own
              purchasing timelines.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The total extramural research budget is over $1B, and that does
              not include CDC&apos;s own laboratory operations, which consume
              a significant portion of the agency&apos;s $12B+ annual budget.
              CDC&apos;s Atlanta campus alone houses thousands of scientists
              working in laboratories ranging from BSL-2 clinical
              microbiology all the way up to BSL-4 maximum containment for
              Ebola, Marburg, and other high-consequence pathogens. The
              Division of Laboratory Sciences runs one of the largest
              analytical chemistry operations in the federal government,
              processing thousands of biomonitoring samples per year through
              batteries of mass spectrometers and chromatography systems.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The competitive landscape is surprisingly thin. NIH-focused
              grant intelligence tools often skip CDC data entirely. Most
              reps have never called on a state public health lab. And
              federal procurement for CDC internal purchases intimidates
              people who are used to calling on university purchasing
              departments. All of this means less competition for reps who
              learn the space. You will not be fighting five other reps for
              the same deal. In most cases, you will be the only person who
              called.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The bottom line:
                </span>{" "}
                CDC funds lab equipment purchases at universities, state
                health departments, and its own massive internal labs. Three
                buyer pools, three procurement paths, and almost nobody in
                equipment sales is systematically covering all three.
              </p>
            </div>
          </div>
        </section>

        {/* Grant Mechanisms */}
        <section id="grant-mechanisms" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            CDC Grant Mechanisms and Internal Labs
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Cooperative agreements are CDC&apos;s primary extramural tool,
            and they work differently than NIH grants. Plus the internal lab
            complex and NIOSH.
          </p>
          <div className="space-y-8">
            {grantMechanisms.map((a) => (
              <AgencySection key={a.id} {...a} />
            ))}
          </div>
        </section>

        {/* State Public Health Labs */}
        <section id="state-labs" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The State Public Health Lab Angle
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            CDC grants fund equipment at all 50 state labs. Different buyer
            than universities, but real instruments at real volumes.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              This is the angle that separates CDC from every other federal
              research agency. When NIH funds a grant, the equipment goes to
              a university lab. When CDC funds an ELC or AMD grant, the
              equipment often goes to a state public health laboratory. These
              are completely different institutions with different
              procurement processes, different decision-makers, and different
              buying cycles. Most life-science sales organizations have no
              coverage model for state public health labs, which means this
              is genuinely uncontested territory.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              All 50 states operate public health laboratories. Some states
              have a single central lab. Others have regional networks.
              These labs do pathogen surveillance, newborn screening,
              environmental testing, clinical reference testing, and
              bioterrorism preparedness. The instruments they use overlap
              heavily with what you are already selling to university and
              hospital labs: sequencers, mass spectrometers, PCR systems,
              automated extraction platforms, clinical analyzers, and
              chromatography systems.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The procurement process is state government purchasing. This
              varies by state, but typically involves state contract
              vehicles, competitive bidding above threshold amounts, and
              procurement officers who manage the purchasing process. It is
              not university purchasing, and it is not federal acquisition.
              It is its own thing. Learning the basics of state procurement
              in your territory states gives you access to a buyer that your
              competitors are completely ignoring.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              CDC WONDER and the Association of Public Health Laboratories
              (APHL) directory can help you identify which state labs do
              which types of testing. If your state lab runs a high-volume
              newborn screening program, they are running tandem mass
              spectrometry around the clock. If they participate in PulseNet
              for foodborne illness surveillance, they are doing whole-genome
              sequencing. The testing programs tell you what equipment they
              have and when they will need to replace it.
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[
              { area: "Pathogen Surveillance", detail: "Every state public health lab runs molecular testing for reportable diseases. PCR systems, sequencers (increasingly whole-genome), automated extraction platforms, culture equipment. CDC's PulseNet and AMD programs fund much of this infrastructure." },
              { area: "Newborn Screening", detail: "All 50 states screen every newborn for dozens of genetic and metabolic conditions. Tandem mass spectrometry (MS/MS) is the core technology. These instruments run around the clock and get replaced on regular cycles. Molecular methods (PCR, sequencing) for confirmatory testing." },
              { area: "Environmental Testing", detail: "Water quality, food safety, chemical exposure monitoring. ICP-MS for metals, GC-MS and LC-MS for organic contaminants, microbiological testing equipment. PFAS testing has driven a recent wave of LC-MS/MS purchases at state labs nationwide." },
              { area: "Clinical Reference Testing", detail: "Confirmatory testing that local hospital labs cannot do. Specialized assays for rare pathogens, antimicrobial resistance profiling, strain typing and subtyping. Advanced molecular platforms and automated susceptibility testing systems." },
              { area: "Bioterrorism Preparedness (LRN)", detail: "The Laboratory Response Network connects state and local labs for bioterrorism and chemical terrorism response. LRN labs maintain specialized equipment for rapid identification of threat agents. CDC funds the equipment and training." },
              { area: "Radiological Testing", detail: "Some state labs maintain capability for radiological emergency response. Gamma spectroscopy, liquid scintillation counting, alpha spectroscopy. Specialized but steady equipment market." },
            ].map((item) => (
              <div
                key={item.area}
                className="rounded-xl border border-[var(--color-gray-100)] bg-white p-5 hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <h3 className="text-base font-bold text-[var(--color-gray-900)] mb-2">
                  {item.area}
                </h3>
                <p className="text-sm text-[var(--color-gray-700)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Post-COVID Modernization */}
        <section id="post-covid" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Post-COVID Lab Modernization
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            The biggest investment in public health lab capacity in a
            generation. And the spending wave is still rolling.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              COVID-19 exposed massive gaps in the nation&apos;s public
              health laboratory infrastructure. States that could not run
              PCR tests at scale. Labs that had zero sequencing capability.
              Manual processes that could not handle surge volumes.
              Paper-based reporting systems that took days to deliver
              results. Congress responded with historic funding levels for
              public health lab modernization, and that money is still being
              spent.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The investment covers four major areas. First, molecular
              diagnostics capacity: state labs are buying PCR platforms,
              automated extraction systems, and multiplex testing instruments
              to handle future surge scenarios. Second, genomic sequencing:
              the AMD program has been dramatically expanded, and state labs
              that had zero sequencing capability before 2020 now have
              dedicated sequencing operations with trained staff. Third,
              automation: manual bench processes are being replaced with
              liquid handlers, automated plate prep, and robotic sample
              management to increase throughput and reduce turnaround times.
              Fourth, laboratory informatics: LIMS implementations,
              electronic lab reporting, and data integration systems to
              replace the paper-based and outdated electronic systems that
              failed during the pandemic.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              This is not a one-year spending spike. The modernization effort
              is playing out over multiple years as state labs work through
              procurement cycles, facility renovations, and workforce
              training. Many state labs received multi-year ELC supplements
              specifically for infrastructure and equipment. Labs that bought
              basic PCR systems in 2020 and 2021 are now upgrading to fully
              automated platforms. Labs that got their first sequencer in
              2022 are now adding bioinformatics computing infrastructure.
              The wave is still building, not receding.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Sales intelligence tip:
                </span>{" "}
                Check your state health department&apos;s ELC supplement
                spending. Many states received tens of millions specifically
                for laboratory capacity upgrades. The procurement timelines
                vary by state, but the money has been appropriated and it is
                being spent. If your state lab has not upgraded their
                sequencing, automation, or LIMS infrastructure yet, they
                probably will in the next 12 to 24 months.
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
            CDC&apos;s total budget is over $12B. Most of it has nothing to
            do with laboratory equipment. Here is what to filter out.
          </p>
          <div className="grid gap-4">
            {noisePrograms.map((p) => (
              <NoiseItem key={p.name} {...p} />
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-[var(--color-gray-100)] bg-white p-6">
            <h3 className="text-base font-bold text-[var(--color-gray-900)] mb-3">
              How to Filter for Lab-Relevant CDC Awards
            </h3>
            <p className="text-sm text-[var(--color-gray-700)] mb-3">
              When scanning CDC awards, look for these keywords in the
              descriptions and program names. They reliably indicate
              laboratory components with equipment budgets:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "laboratory",
                "sequencing",
                "molecular detection",
                "analytical",
                "genomic",
                "BSL",
                "biosafety",
                "mass spectrometry",
                "chromatography",
                "PCR",
                "diagnostics",
                "newborn screening",
                "environmental testing",
                "specimen processing",
                "pathogen surveillance",
                "antimicrobial resistance",
              ].map((kw) => (
                <span
                  key={kw}
                  className="text-xs font-medium bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
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
        <GuidesCrossLinks currentSlug="cdc-grants-guide" />


        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-b from-[var(--color-dark)] to-[#0D1F3C] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Lab Leads Pro tracks CDC-funded awards at universities, state labs, and federal facilities
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with CDC-funded research in your territory,
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
