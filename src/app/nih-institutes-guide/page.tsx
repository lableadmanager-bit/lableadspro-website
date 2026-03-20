import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideSchema from "@/components/GuideSchema";

export const metadata: Metadata = {
  title: "NIH Institutes & Centers Guide for Equipment Sales | Lab Leads Pro",
  description:
    "The 27 NIH Institutes and Centers, decoded for equipment sales reps. Which institutes have the biggest budgets, what equipment they buy, and where your best leads are hiding.",
  keywords:
    "NIH institutes, NCI, NIAID, NHLBI, NIGMS, NINDS, NIH centers, lab equipment sales, NIH funding, research grants, life science sales",
  openGraph: {
    title: "NIH Institutes & Centers Guide for Equipment Sales",
    description:
      "27 NIH Institutes, ranked by equipment purchasing potential. A practical guide for life-science sales reps.",
    url: "https://lableadspro.com/nih-institutes-guide",
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
            id="mol-grid-ni"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-ni)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/* ── institute card component ────────────────────────────── */

interface InstituteCardProps {
  abbr: string;
  name: string;
  budget: string;
  what: string;
  equipment: string;
  stars: number;
}

function InstituteCard({
  abbr,
  name,
  budget,
  what,
  equipment,
  stars: starCount,
}: InstituteCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-gray-100)] bg-white overflow-hidden hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all">
      {/* Header */}
      <div className="bg-[var(--color-gray-50)] px-6 py-4 border-b border-[var(--color-gray-100)]">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className="text-sm font-bold bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full">
            {abbr}
          </span>
          <Stars count={starCount} />
        </div>
        <h3 className="text-xl font-bold text-[var(--color-gray-900)]">
          {name}
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <span className="text-xs font-semibold bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full">
            {budget}
          </span>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">
            What They Fund
          </h4>
          <p className="text-sm text-[var(--color-gray-700)]">{what}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">
            Equipment You&apos;ll Find
          </h4>
          <p className="text-sm text-[var(--color-gray-700)]">{equipment}</p>
        </div>
      </div>
    </div>
  );
}

/* ── institute data ──────────────────────────────────────── */

const tier1: InstituteCardProps[] = [
  {
    abbr: "NCI",
    name: "National Cancer Institute",
    budget: "~$7B/year",
    what: "Largest NIH institute by far. Funds everything from basic cancer biology to clinical trials. If it touches cancer research, NCI probably funded it.",
    equipment: "Imaging systems, flow cytometers, sequencers, cell sorters, mass specs, plate readers. NCI labs buy everything.",
    stars: 5,
  },
  {
    abbr: "NIAID",
    name: "National Institute of Allergy & Infectious Diseases",
    budget: "~$6B/year",
    what: "Infectious disease, immunology, allergy. Got a big bump post-COVID but was massive even before that.",
    equipment: "BSL-3/BSL-4 lab equipment, sequencers, imaging systems, flow cytometers, biosafety cabinets.",
    stars: 5,
  },
  {
    abbr: "NHLBI",
    name: "National Heart, Lung, and Blood Institute",
    budget: "~$4B/year",
    what: "Cardiovascular, pulmonary, hematology research plus the massive sleep disorders program.",
    equipment: "Physiological monitoring, imaging (echo, MRI), animal surgery equipment, flow cytometry, sequencing.",
    stars: 4,
  },
  {
    abbr: "NIA",
    name: "National Institute on Aging",
    budget: "~$4B/year",
    what: "Grew fast thanks to Alzheimer\u0027s funding. Now one of the biggest. Aging biology, neurodegeneration, geriatrics.",
    equipment: "Genomics platforms, brain imaging, biomarker assay systems, automated liquid handling, microscopy.",
    stars: 4,
  },
  {
    abbr: "NIGMS",
    name: "National Institute of General Medical Sciences",
    budget: "~$3B/year",
    what: "Basic research across the board. Cell biology, genetics, biochemistry, biophysics. No disease focus, just fundamental science.",
    equipment: "Microscopy (confocal, super-res, cryo-EM), structural biology instruments, mass specs, plate readers.",
    stars: 4,
  },
];

const tier2: InstituteCardProps[] = [
  {
    abbr: "NINDS",
    name: "National Institute of Neurological Disorders and Stroke",
    budget: "~$2.5B/year",
    what: "Brain and nervous system. Stroke, epilepsy, Parkinson\u0027s, ALS.",
    equipment: "Electrophysiology rigs, two-photon microscopes, optogenetics systems, MRI, behavioral testing.",
    stars: 4,
  },
  {
    abbr: "NIMH",
    name: "National Institute of Mental Health",
    budget: "~$2.3B/year",
    what: "Psychiatry and behavioral neuroscience. Depression, schizophrenia, anxiety, autism.",
    equipment: "Neuroimaging (fMRI, PET), electrophysiology, behavioral testing equipment, computational hardware.",
    stars: 3,
  },
  {
    abbr: "NIDDK",
    name: "National Institute of Diabetes and Digestive and Kidney Diseases",
    budget: "~$2.3B/year",
    what: "Metabolism, endocrinology, GI, kidney. Lots of basic science happening here.",
    equipment: "Mass spectrometry, metabolomics platforms, imaging, cell biology instruments, animal physiology.",
    stars: 4,
  },
  {
    abbr: "NICHD",
    name: "Eunice Kennedy Shriver National Institute of Child Health and Human Development",
    budget: "~$1.6B/year",
    what: "Broader than the name suggests. Fertility, pregnancy, child development, rehabilitation.",
    equipment: "Microscopy (lots of it), imaging, genomics, behavioral assessment tools.",
    stars: 3,
  },
  {
    abbr: "NIDA",
    name: "National Institute on Drug Abuse",
    budget: "~$1.6B/year",
    what: "Addiction neuroscience, substance use disorders. Heavy on brain research.",
    equipment: "Brain imaging (PET, fMRI), electrophysiology, behavioral equipment, optogenetics.",
    stars: 3,
  },
  {
    abbr: "NCATS",
    name: "National Center for Advancing Translational Sciences",
    budget: "~$900M/year",
    what: "The newest center. Focuses on speeding up the bench-to-bedside pipeline.",
    equipment: "High-throughput screening, robotics, automated liquid handlers, plate readers, compound libraries.",
    stars: 3,
  },
  {
    abbr: "NIEHS",
    name: "National Institute of Environmental Health Sciences",
    budget: "~$900M/year",
    what: "How the environment affects health. Toxicology, environmental exposures, gene-environment interactions.",
    equipment: "Analytical chemistry (LC-MS, GC-MS), mass spec, cell-based assay systems, genomics.",
    stars: 3,
  },
];

const tier3: InstituteCardProps[] = [
  {
    abbr: "NEI",
    name: "National Eye Institute",
    budget: "~$850M/year",
    what: "Vision research. Retina, cornea, glaucoma, age-related macular degeneration.",
    equipment: "Microscopy-heavy (confocal, OCT, adaptive optics), electrophysiology, imaging systems.",
    stars: 3,
  },
  {
    abbr: "NIAMS",
    name: "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
    budget: "~$650M/year",
    what: "Bones, joints, muscles, skin. Significant autoimmune overlap.",
    equipment: "Imaging, biomechanical testing, microscopy, flow cytometry.",
    stars: 2,
  },
  {
    abbr: "NHGRI",
    name: "National Human Genome Research Institute",
    budget: "~$600M/year",
    what: "Genomics, sequencing technology, genetic disease. Small budget but extremely equipment-dense. Don\u0027t sleep on this one.",
    equipment: "Sequencers (they basically exist to buy these), genomics instruments, computational infrastructure.",
    stars: 4,
  },
  {
    abbr: "NIAAA",
    name: "National Institute on Alcohol Abuse and Alcoholism",
    budget: "~$550M/year",
    what: "Alcohol\u0027s effects on the brain and body. Overlaps heavily with NIDA\u0027s research areas.",
    equipment: "Brain imaging, electrophysiology, behavioral testing, metabolomics. Similar setup to NIDA labs.",
    stars: 2,
  },
  {
    abbr: "NIDCR",
    name: "National Institute of Dental and Craniofacial Research",
    budget: "~$500M/year",
    what: "Not just teeth. Craniofacial development, oral cancers, salivary gland biology, pain research.",
    equipment: "Microscopy, materials testing, micro-CT, biomechanical testing.",
    stars: 2,
  },
  {
    abbr: "NIDCD",
    name: "National Institute on Deafness and Other Communication Disorders",
    budget: "~$500M/year",
    what: "Hearing, balance, taste, smell, voice, speech, language.",
    equipment: "Electrophysiology, audiology equipment, microscopy, imaging.",
    stars: 2,
  },
  {
    abbr: "NIBIB",
    name: "National Institute of Biomedical Imaging and Bioengineering",
    budget: "~$400M/year",
    what: "Small budget but the name says it all. They fund the development of imaging and engineering tools.",
    equipment: "Literally all imaging and engineering equipment. If someone\u0027s building a new type of microscope, NIBIB probably funded it.",
    stars: 3,
  },
];

/* ── comparison table data ────────────────────────────────── */

const tableRows = [
  { institute: "NCI", budget: "~$7B", stars: 5, signal: "Very High", bestFor: "Everything (imaging, flow, sequencing, mass spec)" },
  { institute: "NIAID", budget: "~$6B", stars: 5, signal: "Very High", bestFor: "BSL equipment, sequencing, flow cytometry" },
  { institute: "NHLBI", budget: "~$4B", stars: 4, signal: "High", bestFor: "Physiological monitoring, imaging, flow" },
  { institute: "NIA", budget: "~$4B", stars: 4, signal: "High", bestFor: "Genomics, brain imaging, liquid handling" },
  { institute: "NIGMS", budget: "~$3B", stars: 4, signal: "High", bestFor: "Microscopy, structural biology, mass spec" },
  { institute: "NINDS", budget: "~$2.5B", stars: 4, signal: "High", bestFor: "Electrophysiology, two-photon, optogenetics" },
  { institute: "NIMH", budget: "~$2.3B", stars: 3, signal: "Moderate", bestFor: "Neuroimaging, behavioral testing" },
  { institute: "NIDDK", budget: "~$2.3B", stars: 4, signal: "High", bestFor: "Mass spec, metabolomics, cell biology" },
  { institute: "NICHD", budget: "~$1.6B", stars: 3, signal: "Moderate", bestFor: "Microscopy, imaging, genomics" },
  { institute: "NIDA", budget: "~$1.6B", stars: 3, signal: "Moderate", bestFor: "Brain imaging, electrophysiology" },
  { institute: "NCATS", budget: "~$900M", stars: 3, signal: "Moderate", bestFor: "HTS, robotics, liquid handling" },
  { institute: "NIEHS", budget: "~$900M", stars: 3, signal: "Moderate", bestFor: "Analytical chemistry, mass spec" },
  { institute: "NEI", budget: "~$850M", stars: 3, signal: "Moderate", bestFor: "Microscopy, OCT, electrophysiology" },
  { institute: "NIAMS", budget: "~$650M", stars: 2, signal: "Niche", bestFor: "Imaging, biomechanical testing" },
  { institute: "NHGRI", budget: "~$600M", stars: 4, signal: "High", bestFor: "Sequencers, genomics instruments" },
  { institute: "NIAAA", budget: "~$550M", stars: 2, signal: "Niche", bestFor: "Brain imaging, behavioral testing" },
  { institute: "NIDCR", budget: "~$500M", stars: 2, signal: "Niche", bestFor: "Microscopy, micro-CT, materials testing" },
  { institute: "NIDCD", budget: "~$500M", stars: 2, signal: "Niche", bestFor: "Electrophysiology, audiology" },
  { institute: "NIBIB", budget: "~$400M", stars: 3, signal: "Moderate", bestFor: "Imaging and engineering equipment" },
];

/* ── jump link data ──────────────────────────────────────── */

const jumpLinks = [
  { id: "tier-1", label: "Tier 1: Big Five" },
  { id: "tier-2", label: "Tier 2: Strong Prospects" },
  { id: "tier-3", label: "Tier 3: Niche" },
  { id: "comparison-table", label: "Comparison Table" },
];

/* ── page component ───────────────────────────────────────── */

export default function NIHInstitutesGuide() {
  return (
    <>
      <GuideSchema
        title="NIH Institutes Guide for Equipment Sales"
        description="27 NIH institutes and centers. Which ones buy equipment and where the money flows."
        url="https://lableadspro.com/nih-institutes-guide"
        faqs={[
          { question: "How many institutes does the NIH have?", answer: "NIH has 27 institutes and centers, each focused on different areas of biomedical research. The largest funders of lab equipment include NIGMS, NCI, NIAID, and NHLBI." },
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
              NIH Institutes Guide
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            NIH Institutes &amp; Centers:{" "}
            <span className="text-[var(--color-brand)]">
              Your Field Guide to 27 Funding Sources
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl">
            Most reps treat NIH as one thing. It&apos;s actually 27 different
            institutes, each funding different research with different equipment
            needs. Knowing which institute funded a grant tells you exactly what
            kind of lab you&apos;re walking into.
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
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Tier 1 */}
        <section id="tier-1" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Tier 1: The Big Five
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            The institutes with the biggest budgets and most equipment spend.
            These are your bread and butter.
          </p>
          <div className="space-y-6">
            {tier1.map((inst) => (
              <InstituteCard key={inst.abbr} {...inst} />
            ))}
          </div>
        </section>

        {/* Tier 2 */}
        <section id="tier-2" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Tier 2: Strong Prospects
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Meaningful budgets and clear equipment needs. Worth tracking closely.
          </p>
          <div className="space-y-6">
            {tier2.map((inst) => (
              <InstituteCard key={inst.abbr} {...inst} />
            ))}
          </div>
        </section>

        {/* Tier 3 */}
        <section id="tier-3" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Tier 3: Niche but Worth Knowing
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Smaller budgets, specialized equipment. Not your bread and butter,
            but don&apos;t ignore them.
          </p>
          <div className="space-y-6">
            {tier3.map((inst) => (
              <InstituteCard key={inst.abbr} {...inst} />
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
            Institute Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--color-gray-100)]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-[var(--color-gray-50)] text-[var(--color-gray-700)]">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Institute
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Annual Budget
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Equipment Signal
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.institute}
                    className={
                      i % 2 === 0 ? "bg-white" : "bg-[var(--color-gray-50)]"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-[var(--color-gray-900)] whitespace-nowrap">
                      {row.institute}
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
                      {row.bestFor}
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
            Find grants from any NIH institute in your territory
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Lab Leads Pro breaks down every new award by institute, so you know
            exactly what kind of lab is getting funded and what equipment
            they&apos;ll need.
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
