import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VA Research Grants Guide for Lab Equipment Sales Reps | Lab Leads Pro",
  description:
    "VA spends $1.9B on research across 115+ facilities, with most researchers holding dual university appointments. Learn which VA programs buy lab equipment and how to find these overlooked leads.",
  keywords:
    "VA research grants, Merit Review Awards, VA research funding, BLRD, CSR&D, RR&D, HSR&D, VA medical center research, veteran health research, lab equipment sales, VA dual appointment, prosthetics research",
  openGraph: {
    title: "VA Research Grants Guide for Lab Equipment Sales Reps",
    description:
      "115+ VA facilities doing real research, and most reps ignore all of them. Here is what you are missing.",
    url: "https://lableadspro.com/database/guides/va-grants",
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
            id="mol-grid-va"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-va)" />
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

/* -- research services data ----------------------------------------------- */

const researchServices: AgencySectionProps[] = [
  {
    id: "blrd",
    abbr: "BLRD",
    name: "Biomedical Laboratory Research & Development",
    budget: "~$600M annual budget",
    overview:
      "Basic science research in VA medical centers. Cell biology, molecular biology, animal models, biochemistry. This is the VA research service that looks most like a university lab. Investigators run bench experiments in dedicated VA research buildings, and they buy real instruments to do it.",
    who: "VA-appointed researchers, most of whom also hold faculty positions at the affiliated university.",
    whyItMatters:
      "BLRD is where the heavy equipment purchases happen in VA research. These labs need the same instruments as any academic biomedical lab. Microscopes for histology and cell imaging. Flow cytometers for immunology work. Sequencers for genomics studies on PTSD biomarkers and cancer genetics. Mass spectrometers for proteomics and metabolomics. If you sell life-science instruments, BLRD Merit Review awards are your primary VA target.",
    programs: [
      { name: "Merit Review Awards", detail: "VA's version of NIH R01s. Competitive, peer-reviewed, multi-year (typically 4 years). These fund the actual research projects and are where equipment budget line items live. A new Merit Review in BLRD almost always means instrument purchases." },
      { name: "Career Development Awards (CDA)", detail: "Multi-year awards for early-career VA investigators building independent research programs. CDA-2 awardees are setting up their first labs and buying starter equipment. Good leads for smaller instruments." },
      { name: "SPIREs", detail: "Small Projects for Innovation in Research Enhancement. Pilot grants, typically under $50K. Not big equipment money, but they signal a PI who is building toward a Merit Review application." },
    ],
    dataNote:
      "VA research awards tracked via USASpending, with institution and PI data. Cross-reference with the VA's ORD (Office of Research & Development) public databases for additional detail.",
    stars: 5,
  },
  {
    id: "csrd",
    abbr: "CSR&D",
    name: "Clinical Science Research & Development",
    budget: "~$500M annual budget",
    overview:
      "Clinical trials and translational research. Studies that involve patients directly. Drug trials, diagnostic validation, biomarker studies, outcomes research. CSR&D bridges the gap between bench science and patient care, and it happens inside VA hospitals with access to one of the largest patient populations in the country.",
    who: "VA clinician-researchers (MDs who split time between seeing patients and running studies), often with university faculty appointments.",
    whyItMatters:
      "Clinical trials need clinical analyzers, point-of-care testing devices, and biobank infrastructure. VA runs some of the largest clinical trials in the country through the Cooperative Studies Program. These multi-site trials need standardized equipment across all participating VA medical centers. Biomarker studies need sample processing equipment, freezers, and analytical instruments. If you sell clinical diagnostics or biobanking equipment, CSR&D is a strong market.",
    programs: [
      { name: "Cooperative Studies Program (CSP)", detail: "Large multi-site clinical trials run across dozens of VA medical centers simultaneously. VA has been running these since the 1940s. Each participating site needs standardized clinical analyzers, sample processing equipment, and biobanking infrastructure. Big procurement events." },
      { name: "Merit Review Awards (Clinical)", detail: "Same mechanism as BLRD Merit Reviews, but focused on clinical research. Smaller equipment budgets than bench science, but still real. Diagnostic devices, point-of-care systems, sample collection equipment." },
      { name: "Clinical Trial Infrastructure", detail: "Equipment to support the trial itself. Clinical analyzers, specimen handling systems, automated blood processing, ultra-low freezers for biorepositories." },
    ],
    dataNote:
      "CSP trials are publicly listed on clinicaltrials.gov with VA as the sponsor. Cross-reference with our award data to identify participating sites and their procurement timelines.",
    stars: 4,
  },
  {
    id: "rrd",
    abbr: "RR&D",
    name: "Rehabilitation Research & Development",
    budget: "~$350M annual budget",
    overview:
      "Prosthetics, assistive technology, rehabilitation engineering, spinal cord injury research, sensory aids (vision, hearing), and traumatic brain injury rehabilitation. This is the most engineering-heavy VA research service. Labs build and test devices, not just run biological experiments.",
    who: "Biomedical engineers, rehabilitation scientists, and clinician-researchers at VA centers and affiliated engineering departments.",
    whyItMatters:
      "RR&D labs are a completely different equipment profile from the other services. They buy 3D printers and additive manufacturing systems for prosthetic prototyping. Motion capture systems for gait analysis. Biomechanical testing machines for material strength and fatigue. Neural interface equipment for brain-computer interaction studies. Force plates, EMG systems, and custom testing rigs. If you sell engineering or biomechanics equipment, this is a market most competitors never find.",
    programs: [
      { name: "Merit Review Awards (Rehab)", detail: "Same competitive mechanism, focused on rehabilitation research. Equipment budgets tend toward engineering instruments: 3D printers, motion capture, biomechanical testing, neural recording systems." },
      { name: "Center for Neurorestoration and Neurotechnology (CaN)", detail: "Providence VA. Brain-computer interfaces, neural engineering, neuroprosthetics. Cutting-edge neural recording and stimulation equipment." },
      { name: "Prosthetics and Sensory Aids", detail: "Materials testing for prosthetic components, 3D scanning and printing, force measurement, environmental testing chambers." },
    ],
    dataNote:
      "RR&D awards often list equipment needs in abstracts when available. Cross-reference PI names with engineering department faculty pages at the affiliated university for additional context.",
    stars: 3,
  },
  {
    id: "hsrd",
    abbr: "HSR&D",
    name: "Health Services Research & Development",
    budget: "~$400M annual budget",
    overview:
      "Healthcare delivery research. How to improve quality of care, reduce costs, increase access. Surveys, data analysis, health informatics, implementation science. HSR&D studies the healthcare system itself rather than specific diseases or treatments.",
    who: "Health economists, epidemiologists, informaticists, implementation scientists. Mostly data-focused researchers.",
    whyItMatters:
      "Low equipment relevance. HSR&D is primarily surveys, electronic health record data analysis, and health policy research. The tools are computers and statistical software, not lab instruments. Some QUERI (Quality Enhancement Research Initiative) projects touch clinical settings and might involve point-of-care devices, but this is rare. If you sell lab equipment, HSR&D is generally not your market.",
    programs: [
      { name: "QUERI", detail: "Quality Enhancement Research Initiative. Implementation science. Occasional point-of-care device deployment, but mostly process improvement studies." },
      { name: "HSR&D Merit Reviews", detail: "Data analysis, surveys, health informatics. Computers and software, not lab instruments." },
    ],
    dataNote:
      "HSR&D awards are in our data but rarely score high for equipment purchasing signals. Included for completeness.",
    stars: 1,
  },
];

/* -- noise programs data -------------------------------------------------- */

const noisePrograms: NoiseItemProps[] = [
  {
    name: "VA Healthcare Operations",
    description: "The VA's primary mission is healthcare delivery. The vast majority of VA spending goes to running 170+ medical centers and 1,100+ outpatient clinics. Staffing, pharmaceuticals, medical supplies, facility maintenance. This is clinical operations, not research.",
    verdict: "Massive budget, zero research equipment relevance. Don't confuse VA healthcare spending with VA research spending.",
  },
  {
    name: "VA Benefits Administration",
    description: "Disability compensation, education benefits (GI Bill), home loans, vocational rehabilitation. Billions in spending that has nothing to do with scientific research.",
    verdict: "Administrative spending. Skip entirely.",
  },
  {
    name: "Facilities and Construction",
    description: "Building new VA hospitals, renovating existing ones, maintaining infrastructure. Sometimes keywords like 'laboratory' appear because they are building or renovating a research wing. The construction contract is not the same as the research equipment purchase.",
    verdict: "Building a lab is not equipping one. Skip the construction contracts.",
  },
  {
    name: "IT and EHR Modernization",
    description: "VA is in the middle of a massive electronic health record migration. Billions in IT contracts for Cerner/Oracle implementation, cybersecurity, and network infrastructure.",
    verdict: "IT infrastructure, not research instruments. Zero lab equipment relevance.",
  },
];

/* -- equipment signals data ----------------------------------------------- */

const equipmentSignals = [
  { category: "Microscopy & Imaging", examples: "Confocal, fluorescence, electron microscopy, histology imaging for PTSD brain tissue and cancer pathology", where: "BLRD" },
  { category: "Flow Cytometry", examples: "Immunophenotyping, cancer biomarkers, immune response studies in veteran populations", where: "BLRD" },
  { category: "Sequencing & Genomics", examples: "PTSD biomarker discovery, cancer genomics, Gulf War illness genetics, pharmacogenomics", where: "BLRD" },
  { category: "Mass Spectrometry", examples: "Proteomics, metabolomics, Agent Orange exposure biomarkers, toxicology", where: "BLRD" },
  { category: "Clinical Analyzers", examples: "Chemistry, hematology, immunoassay platforms for clinical trials", where: "CSR&D (CSP trials)" },
  { category: "Biobanking & Cold Storage", examples: "Ultra-low freezers, automated sample handling, specimen tracking systems for VA biorepositories", where: "CSR&D" },
  { category: "3D Printing & Additive Manufacturing", examples: "Prosthetic prototyping, custom assistive device fabrication, surgical planning models", where: "RR&D" },
  { category: "Motion Capture & Biomechanics", examples: "Gait analysis, prosthetic performance testing, force plates, EMG systems", where: "RR&D" },
  { category: "Neural Interface Equipment", examples: "Brain-computer interfaces, EEG/ECoG systems, neural stimulation devices, neuroprosthetics", where: "RR&D" },
];

/* -- comparison table data ------------------------------------------------ */

const tableRows = [
  { program: "BLRD (Merit Review)", budget: "~$600M", stars: 5, signal: "Primary", notes: "Bench science. Same equipment as academic labs." },
  { program: "BLRD (CDA)", budget: "Included above", stars: 3, signal: "Good", notes: "Early-career PIs setting up labs." },
  { program: "CSR&D (CSP Trials)", budget: "~$500M", stars: 4, signal: "Strong", notes: "Multi-site clinical trials. Standardized equipment." },
  { program: "CSR&D (Merit Review)", budget: "Included above", stars: 3, signal: "Good", notes: "Clinical research instruments." },
  { program: "RR&D", budget: "~$350M", stars: 3, signal: "Good", notes: "Engineering, prosthetics, biomechanics." },
  { program: "HSR&D", budget: "~$400M", stars: 1, signal: "Low", notes: "Data analysis, surveys. Mostly computers." },
  { program: "SPIREs (Pilot Grants)", budget: "Small", stars: 1, signal: "Low", notes: "Pilot funding. Signals future larger awards." },
  { program: "Healthcare Operations", budget: "~$100B+", stars: 0, signal: "None", notes: "Clinical care, not research. Skip." },
  { program: "Benefits Administration", budget: "~$150B+", stars: 0, signal: "None", notes: "Disability, education, loans. Skip." },
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  { id: "why-va", label: "Why VA Matters" },
  { id: "dual-appointment", label: "The Dual Appointment Angle" },
  { id: "research-services", label: "Four Research Services" },
  { id: "grant-mechanisms", label: "Grant Mechanisms" },
  { id: "the-noise", label: "What to Skip" },
  { id: "equipment-signals", label: "Equipment Signals" },
  { id: "procurement", label: "Procurement Reality" },
  { id: "comparison-table", label: "Quick Reference" },
];

/* -- page component ------------------------------------------------------- */

export default function VAGrantsGuide() {
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
              VA Research Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            VA Research:{" "}
            <span className="text-[var(--color-brand)]">
              $1.9B Across 115+ Facilities That Most Reps Never Touch
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            The Department of Veterans Affairs runs one of the largest
            biomedical research programs in the country, and almost nobody
            in lab equipment sales is paying attention to it. Over 115 VA
            medical centers conduct research. The investigators are real
            scientists doing real bench work. And here is the part that
            changes everything: most of them also hold faculty appointments
            at the university next door.
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
        {/* Why VA Matters */}
        <section id="why-va" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Why VA Matters for Equipment Sales
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            $1.9B in research funding, 115+ facilities, and almost zero competition from other reps.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              VA research is one of the best-kept secrets in lab equipment
              sales. The numbers are real: roughly $1.9B in annual research
              funding spread across more than 115 VA medical centers that
              have active research programs. These facilities employ thousands
              of investigators running studies on PTSD, traumatic brain
              injury, cancer, infectious disease, prosthetics, and dozens of
              other areas.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The reason most reps ignore VA is simple: they think of VA as
              a healthcare system, not a research enterprise. And they
              assume federal procurement is too complicated to bother with.
              Both assumptions are wrong. VA research labs buy the same
              instruments as university labs, and in many cases the same
              PI buys through both channels.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              The competitive landscape is thin. Most grant intelligence
              tools skip VA data entirely. Most sales organizations do not
              train their reps on VA research programs. If you learn this
              space, you are working leads that nobody else is calling on.
              Lower volume than NIH, absolutely. But functionally uncontested.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  The bottom line:
                </span>{" "}
                VA research is a $1.9B market with real equipment purchases
                and almost no competition from other reps. If you can
                navigate the dual-appointment structure and federal
                procurement basics, this is found money.
              </p>
            </div>
          </div>
        </section>

        {/* The Dual Appointment Angle */}
        <section id="dual-appointment" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            The Dual Appointment Angle
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            This is the single most important thing to understand about VA research.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <p className="text-sm text-[var(--color-gray-700)]">
              Every VA medical center is co-located with (or very close to)
              an academic medical center. This is by design. VA research has
              always been integrated with university medical education. The
              result is that most VA researchers hold dual appointments. They
              are a VA investigator AND a faculty member at the affiliated
              university.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              Why does this matter for sales? Because the same PI might have
              an NIH R01 through their university appointment AND a VA Merit
              Review through their VA appointment. They might have lab space
              in both buildings. They might buy equipment through either
              mechanism depending on which grant is funding the work. One
              researcher, two funding streams, two potential purchase orders.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              If you are only tracking NIH grants, you see half the picture.
              You see Dr. Smith&apos;s R01 at State University but miss her
              Merit Review at the VA medical center across the street. With
              both data points, you know she has twice the funding you
              thought, and you can approach the conversation with a complete
              understanding of her research program.
            </p>
            <p className="text-sm text-[var(--color-gray-700)]">
              This works the other direction too. If you find a VA Merit
              Review holder and look them up on the university faculty page,
              you will often find NIH and NSF grants listed there. Knowing
              the full picture before you pick up the phone is what separates
              a good rep from a great one.
            </p>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Sales intelligence tip:
                </span>{" "}
                When you find a VA-funded PI, always check the affiliated
                university for additional grants. When you find a
                university PI near a VA medical center, check VA ORD for a
                possible Merit Review. The overlap is massive, and knowing
                both connections puts you ahead of every other rep calling
                on that researcher.
              </p>
            </div>
          </div>
        </section>

        {/* Four Research Services */}
        <section id="research-services" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            VA&apos;s Four Research Services
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            VA organizes research into four distinct services. Each one has a
            different equipment profile. Know which ones matter for what you sell.
          </p>
          <div className="space-y-8">
            {researchServices.map((a) => (
              <AgencySection key={a.id} {...a} />
            ))}
          </div>
        </section>

        {/* Grant Mechanisms */}
        <section id="grant-mechanisms" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            VA Grant Mechanisms
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            How VA funds research. Different mechanisms, different equipment implications.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-gray-900)] mb-1">
                  Merit Review Awards
                </h3>
                <p className="text-sm text-[var(--color-gray-700)]">
                  The workhorse of VA research funding. Think of these as
                  VA&apos;s version of NIH R01 grants. Competitive,
                  peer-reviewed, typically 4-year awards. Available across all
                  four research services. This is where the real equipment
                  budgets live. A BLRD Merit Review in cancer biology or PTSD
                  neuroscience is going to include line items for instruments
                  just like any NIH-funded project.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-gray-900)] mb-1">
                  Career Development Awards (CDA)
                </h3>
                <p className="text-sm text-[var(--color-gray-700)]">
                  CDA-1 provides research training for clinicians making the
                  transition to investigator. CDA-2 supports early-career
                  researchers developing independent programs. CDA-2 is the
                  more interesting one for equipment sales because these PIs
                  are actively building out their research capabilities and
                  often purchasing starter instruments.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-gray-900)] mb-1">
                  SPIREs (Small Projects for Innovation in Research Enhancement)
                </h3>
                <p className="text-sm text-[var(--color-gray-700)]">
                  Pilot grants, usually under $50K. Not enough for major
                  equipment. But SPIREs are a leading indicator. A PI with a
                  SPIRE is generating preliminary data for a Merit Review
                  application. If they get the Merit Review, that is when the
                  equipment budget shows up. Track SPIREs to get ahead of the
                  curve.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-gray-900)] mb-1">
                  Cooperative Studies Program (CSP)
                </h3>
                <p className="text-sm text-[var(--color-gray-700)]">
                  Large multi-site clinical trials coordinated centrally.
                  VA has been running cooperative studies since the 1940s.
                  These are big: dozens of participating VA sites, thousands
                  of patients, years of follow-up. Each participating site
                  needs standardized clinical equipment. When a new CSP trial
                  launches, it is a coordinated equipment procurement event
                  across multiple facilities at once.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VA Research Priorities */}
        <section className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            VA Research Priorities
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            These are the areas where VA concentrates funding. If you sell
            equipment used in any of these fields, VA is a market for you.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { area: "PTSD & Mental Health", detail: "Neuroimaging, biomarker discovery, psychophysiology. Brain imaging, EEG, and biosensor equipment." },
              { area: "Traumatic Brain Injury", detail: "Neuroimaging, cognitive assessment tools, rehabilitation technology, neural recording systems." },
              { area: "Gulf War Illness", detail: "Exposure biomarkers, chronic multi-symptom illness. Analytical chemistry, toxicology instruments." },
              { area: "Agent Orange Effects", detail: "Long-term health effects, epigenetics, cancer risk. Genomics, mass spec for biomarker panels." },
              { area: "Military Sexual Trauma", detail: "Mental health outcomes, biomarker research, clinical interventions." },
              { area: "Suicide Prevention", detail: "Biomarker discovery, neuroimaging, predictive analytics. Imaging and analytical instruments." },
              { area: "Opioid Alternatives", detail: "Pain management research, non-opioid therapeutics, neuromodulation devices." },
              { area: "Prosthetics & Orthotics", detail: "Advanced materials, 3D printing, neural interfaces, biomechanical testing, motion analysis." },
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

        {/* The Noise */}
        <section id="the-noise" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            What to Skip
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            VA&apos;s total budget is over $300B. The research portion is a
            tiny slice. These categories dominate VA spending data but have
            nothing to do with lab equipment.
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
            Equipment Signals in VA Research
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            What VA-funded labs actually buy, and which research service
            to watch for each category.
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

        {/* Procurement Reality */}
        <section id="procurement" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Procurement Reality
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            How VA researchers actually buy equipment. Two paths, and you need to know both.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--color-gray-900)] mb-1">
                Path 1: Federal Acquisition (VA Purchase)
              </h3>
              <p className="text-sm text-[var(--color-gray-700)]">
                When equipment is purchased through the VA directly, it goes
                through federal acquisition regulations (FAR) and the VA
                Acquisition Regulation (VAAR). This means SAM.gov
                registration is required for vendors. Purchases above the
                micro-purchase threshold go through contracting officers.
                There may be veteran-owned small business (VOSB) or
                service-disabled veteran-owned small business (SDVOSB)
                set-aside requirements. The process is slower than academic
                purchasing, but the budgets are predictable and the
                purchasing cycles are consistent.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-gray-900)] mb-1">
                Path 2: University Purchase (Dual Appointment)
              </h3>
              <p className="text-sm text-[var(--color-gray-700)]">
                Because most VA researchers hold university faculty
                appointments, they can also purchase equipment through their
                university grants using standard academic procurement. An NIH
                R01 at the university follows normal university purchasing
                rules, even if the PI uses the equipment for VA-related
                research. This means the same researcher might buy one
                instrument through VA federal procurement and another through
                the university purchasing department. Both paths are real
                sales opportunities.
              </p>
            </div>
            <div className="bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Practical tip:
                </span>{" "}
                If federal procurement feels too complex for your current
                deal, remember that the same PI can often buy through their
                university appointment instead. The key is knowing the PI has
                VA funding at all, because that tells you about their
                research scope and total available budget, even if the
                purchase order ultimately comes from the university.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="comparison-table" className="pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            VA Programs: Quick Reference
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
            Lab Leads Pro surfaces VA research grants that other tools miss
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            See a sample report with VA-funded research in your state,
            cross-referenced with university affiliations and scored for
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
