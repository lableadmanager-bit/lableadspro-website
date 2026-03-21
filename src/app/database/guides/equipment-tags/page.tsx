import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Equipment Tags We Detect | Lab Leads Pro",
  description:
    "Every piece of lab equipment our AI identifies in federal grant abstracts. 90+ high-value instrument tags across 14 categories, from microscopy to clinical diagnostics.",
  keywords:
    "lab equipment tags, grant equipment detection, microscopy, mass spectrometry, flow cytometry, sequencing, chromatography, spectroscopy, lab instrument classification, federal grant analysis",
  openGraph: {
    title: "Equipment Tags We Detect | Lab Leads Pro",
    description:
      "90+ instrument tags across 14 categories. See exactly what our AI looks for in 450,000+ federal grant abstracts.",
    url: "https://lableadspro.com/database/guides/equipment-tags",
    siteName: "Lab Leads Pro",
    type: "article",
  },
};

/* -- molecular background ------------------------------------------------- */

function MolecularBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] to-white">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="mol-grid-eqtags"
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
        <rect width="100%" height="100%" fill="url(#mol-grid-eqtags)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/* -- types ---------------------------------------------------------------- */

interface EquipmentTag {
  name: string;
  description: string;
  price?: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  brands: string;
  tags: EquipmentTag[];
}

/* -- category data -------------------------------------------------------- */

const categories: Category[] = [
  {
    id: "microscopy",
    title: "Microscopy & Imaging",
    description:
      "Instruments that let researchers see cells, tissues, molecules, and whole organisms. The largest equipment category in life-science research.",
    brands: "Zeiss, Leica, Nikon, Olympus/Evident, Thermo Fisher",
    tags: [
      { name: "Light Microscope", description: "Basic optical microscope for viewing cells and tissues. Found in virtually every biology lab." },
      { name: "Fluorescence Microscope", description: "Uses fluorescent dyes or proteins to visualize specific molecules inside cells. Workhorse for cell biology and immunology." },
      { name: "Confocal Microscope", description: "Laser-scanning microscope that captures sharp optical sections of thick samples. The standard for high-quality cell imaging.", price: "$200K-$800K" },
      { name: "Super-Resolution Microscope", description: "Breaks the diffraction limit to image individual molecules. Includes STORM, PALM, SIM, and STED systems.", price: "$500K-$1.5M" },
      { name: "Light-Sheet Microscope", description: "Images entire organisms or large tissue volumes with minimal photodamage. Growing fast in developmental biology and neuroscience." },
      { name: "Stereo Microscope", description: "Low-magnification 3D viewing for dissection, sample prep, and quality inspection." },
      { name: "Transmission Electron Microscope (TEM)", description: "Nanometer-scale imaging of ultra-thin sections. Structural biology, materials science, virology.", price: "$500K-$3M" },
      { name: "Scanning Electron Microscope (SEM)", description: "Surface imaging at nanometer resolution. Materials characterization, forensics, semiconductor inspection.", price: "$200K-$1M" },
      { name: "Cryo-EM", description: "Cryogenic electron microscopy. Images frozen biological molecules at near-atomic resolution. The hottest instrument in structural biology right now.", price: "$2M-$7M" },
      { name: "Inverted Microscope", description: "Views samples from below through the culture vessel. The standard platform for cell culture imaging." },
      { name: "Live-Cell Imaging System", description: "Time-lapse imaging of living cells with built-in environmental control (CO2, temperature, humidity)." },
      { name: "High-Content Screening System", description: "Automated microscope plus analysis software for screening thousands of samples. Drug discovery and phenotypic screening.", price: "$200K-$500K" },
      { name: "Slide Scanner", description: "Digitizes glass slides for pathology and histology. Whole-slide imaging for remote review and AI analysis." },
      { name: "Calcium Imaging System", description: "Specialized fluorescence imaging for tracking neuronal activity via calcium indicators." },
      { name: "Animal Imaging System", description: "In vivo imaging of live animals using bioluminescence, fluorescence, or X-ray. Preclinical drug development." },
    ],
  },
  {
    id: "spectroscopy",
    title: "Spectroscopy & Plate Readers",
    description:
      "Instruments that measure how samples interact with light. Used to quantify concentrations, identify compounds, and run high-throughput assays.",
    brands: "Thermo Fisher, Agilent, Shimadzu, BioTek, Tecan, PerkinElmer, Molecular Devices",
    tags: [
      { name: "UV-Vis Spectrophotometer", description: "Measures light absorption to quantify DNA, protein, or chemical concentrations. A staple in every wet lab." },
      { name: "NanoDrop", description: "Micro-volume UV-Vis spectrophotometer. Uses just 1-2 microliters. Standard in every molecular biology lab for quick concentration checks." },
      { name: "Fluorometer", description: "Measures fluorescence intensity for nucleic acid quantification, protein assays, and reporter gene studies." },
      { name: "FTIR Spectrometer", description: "Fourier-transform infrared spectroscopy. Identifies chemical bonds and molecular structures. Materials science, polymers, pharmaceuticals." },
      { name: "Raman Spectrometer", description: "Identifies materials by their molecular vibrations. Non-destructive, minimal sample prep. Forensics, pharmaceuticals, geology." },
      { name: "Microplate Reader", description: "Reads 96- or 384-well plates for absorbance, fluorescence, or luminescence. Core instrument for any assay-based research.", price: "$30K-$150K" },
      { name: "Luminometer", description: "Measures light output from bioluminescent or chemiluminescent reactions. Reporter gene assays, ATP detection." },
    ],
  },
  {
    id: "chromatography",
    title: "Chromatography & Separation",
    description:
      "Instruments that separate complex mixtures into individual components for identification and quantification. Foundational in chemistry, pharma, and environmental science.",
    brands: "Agilent, Waters, Thermo Fisher, Shimadzu, Cytiva, Phenomenex",
    tags: [
      { name: "HPLC", description: "High-performance liquid chromatography. Separates, identifies, and quantifies compounds in mixtures. Pharma, food science, environmental testing." },
      { name: "UHPLC", description: "Ultra-high performance LC. Faster runs and higher resolution than standard HPLC.", price: "$100K-$300K" },
      { name: "FPLC / AKTA System", description: "Fast protein liquid chromatography for protein purification. The AKTA platform from Cytiva is the industry standard.", price: "$50K-$150K" },
      { name: "LC-MS", description: "Liquid chromatography coupled to mass spectrometry. Identifies and quantifies compounds with extreme sensitivity. Proteomics, metabolomics, clinical." },
      { name: "Gas Chromatograph (GC)", description: "Separates volatile compounds. Environmental monitoring, petrochemistry, forensic toxicology." },
      { name: "GC-MS", description: "Gas chromatography paired with mass spectrometry. Gold standard for volatile compound identification." },
      { name: "Ion Chromatograph", description: "Separates and quantifies ions in solution. Water quality testing, environmental analysis, semiconductor manufacturing." },
      { name: "TLC (Thin-Layer Chromatography)", description: "Simple, inexpensive separation technique. Used for quick screening in organic chemistry and teaching labs." },
      { name: "Flash Chromatography System", description: "Rapid purification of synthetic compounds. Standard in organic and medicinal chemistry labs." },
    ],
  },
  {
    id: "mass-spec",
    title: "Mass Spectrometry",
    description:
      "Instruments that measure molecular mass with extreme precision. The backbone of proteomics, metabolomics, and analytical chemistry.",
    brands: "Thermo Fisher, Bruker, Sciex, Waters, Agilent",
    tags: [
      { name: "Mass Spectrometer (General)", description: "Measures molecular mass to identify and quantify compounds. Used across proteomics, metabolomics, clinical chemistry, and environmental analysis." },
      { name: "Orbitrap", description: "Thermo Fisher's high-resolution mass analyzer. Dominates proteomics and is expanding into clinical and environmental applications.", price: "$500K-$1.5M" },
      { name: "Q-TOF", description: "Quadrupole time-of-flight. High resolution and accurate mass measurement. Metabolomics, lipidomics, food safety.", price: "$400K-$800K" },
      { name: "Triple Quadrupole MS", description: "Best-in-class for targeted quantification. Clinical labs, pharmacokinetics, pesticide residue testing." },
      { name: "MALDI", description: "Matrix-assisted laser desorption/ionization. Fast protein identification, tissue imaging (MALDI imaging), microbial ID.", price: "$200K-$500K" },
      { name: "ICP-MS", description: "Inductively coupled plasma mass spectrometry. Trace element analysis at parts-per-trillion levels. Environmental, geochemistry, semiconductor." },
    ],
  },
  {
    id: "molecular-biology",
    title: "Molecular Biology",
    description:
      "Core instruments for working with DNA, RNA, and proteins. Found in virtually every life-science lab.",
    brands: "Bio-Rad, Thermo Fisher, Eppendorf, Roche, Lonza",
    tags: [
      { name: "qPCR (Real-Time PCR)", description: "Quantitative PCR. Measures gene expression and detects specific DNA sequences in real time. Every molecular biology lab has one." },
      { name: "Digital PCR", description: "Absolute quantification of nucleic acids without a standard curve. More precise than qPCR for rare targets like liquid biopsy.", price: "$50K-$150K" },
      { name: "Capillary Electrophoresis", description: "Separates DNA, RNA, or proteins by size in a capillary. Used for Sanger sequencing readout and fragment analysis." },
      { name: "Western Blot Imaging System", description: "Detects and quantifies specific proteins in a sample. Chemiluminescent and fluorescent imaging systems.", price: "$20K-$80K" },
      { name: "Electroporator", description: "Delivers electrical pulses to open cell membranes for transfection. Essential for gene editing (CRISPR) workflows." },
    ],
  },
  {
    id: "genomics",
    title: "Genomics & Sequencing",
    description:
      "Instruments for reading, analyzing, and quality-checking DNA and RNA. The fastest-growing equipment category in research.",
    brands: "Illumina, Thermo Fisher, Oxford Nanopore, PacBio, Agilent, Element Biosciences",
    tags: [
      { name: "Next-Generation Sequencer (NGS)", description: "Reads millions of DNA fragments in parallel. Illumina dominates the market. Whole-genome, exome, RNA-seq, and more.", price: "$200K-$1M+" },
      { name: "Sanger Sequencer", description: "Classic DNA sequencing. Lower throughput but still the gold standard for validation and short-read confirmation." },
      { name: "Long-Read Sequencer", description: "Oxford Nanopore or PacBio platforms. Reads long DNA fragments for structural variant detection and de novo genome assembly." },
      { name: "Microarray Scanner", description: "Reads DNA or RNA microarrays for gene expression profiling, genotyping, and epigenetics studies." },
      { name: "Fragment Analyzer", description: "Automated capillary electrophoresis system for DNA/RNA quality control before sequencing library prep." },
      { name: "Bioanalyzer", description: "Agilent's chip-based system for nucleic acid and protein quality assessment. Standard QC step before any sequencing run." },
    ],
  },
  {
    id: "cell-culture",
    title: "Cell Culture & Bioprocessing",
    description:
      "Instruments for growing and maintaining cells at bench or production scale. Essential for biologics, gene therapy, and basic research.",
    brands: "Thermo Fisher, Eppendorf, NuAire, Esco, Beckman Coulter, Sartorius",
    tags: [
      { name: "Automated Cell Counter", description: "Replaces manual hemocytometer counting with image-based or impedance-based automated counts. Faster and more reproducible." },
      { name: "Bioreactor", description: "Controlled environment for growing mammalian or insect cells at scale. Upstream bioprocessing for antibodies, vaccines, cell therapies." },
      { name: "Fermenter", description: "Microbial growth at scale. Biofuel research, enzyme production, industrial biotech, and recombinant protein manufacturing." },
    ],
  },
  {
    id: "flow-cytometry",
    title: "Flow Cytometry & Cell Sorting",
    description:
      "Instruments that analyze and sort individual cells at thousands per second. Central to immunology, hematology, and cancer research.",
    brands: "BD Biosciences, Beckman Coulter, Sony, Cytek",
    tags: [
      { name: "Flow Cytometer", description: "Measures physical and fluorescent characteristics of cells in a fluid stream. Immunophenotyping, cell cycle analysis, apoptosis assays." },
      { name: "FACS Sorter", description: "Fluorescence-activated cell sorting. Physically separates cell populations based on marker expression. Core facility instrument.", price: "$200K-$700K" },
      { name: "Spectral Cytometer", description: "Next-generation flow cytometry using full emission spectra instead of optical filters. Supports more parameters per cell." },
      { name: "Cell Analyzer", description: "Benchtop flow cytometer for routine analysis without physical sorting capability. Lower cost entry point for flow work." },
    ],
  },
  {
    id: "centrifugation",
    title: "Centrifugation",
    description:
      "High-speed separation of particles by density. We tag only ultracentrifuges as high-value instruments.",
    brands: "Eppendorf, Beckman Coulter, Thermo Fisher",
    tags: [
      { name: "Ultracentrifuge", description: "Spins at 100,000+ RPM to separate subcellular components, viruses, exosomes, and nanoparticles.", price: "$50K-$150K" },
    ],
  },
  {
    id: "liquid-handling",
    title: "Liquid Handling & Automation",
    description:
      "Robotic systems that automate repetitive pipetting for high-throughput experiments.",
    brands: "Eppendorf, Gilson, Thermo Fisher, Rainin, Tecan, Hamilton, Beckman Coulter",
    tags: [
      { name: "Automated Liquid Handler", description: "Robotic pipetting systems for plate setup, serial dilutions, library prep, and high-throughput screening. Complexity and price vary widely.", price: "$50K-$500K" },
    ],
  },
  {
    id: "sample-prep",
    title: "Sample Preparation",
    description:
      "Instruments for breaking down, concentrating, sectioning, and preserving samples before analysis.",
    brands: "Qsonica, MP Biomedicals, Qiagen, Thermo Fisher, Leica, Eppendorf",
    tags: [
      { name: "Sonicator", description: "Uses ultrasound waves to disrupt cells, shear DNA, or clean surfaces. Essential for ChIP-seq and protein extraction workflows." },
      { name: "Vacuum Concentrator", description: "Evaporates solvents under vacuum to concentrate samples without heat damage. SpeedVac is the common brand name." },
      { name: "Freeze Dryer (Lyophilizer)", description: "Removes water from frozen samples by sublimation. Preserves biological materials, pharmaceuticals, and food samples." },
      { name: "Microtome", description: "Cuts extremely thin tissue sections (as thin as 1 micron) for microscopy. Histology and pathology standard." },
      { name: "Cryostat", description: "A microtome mounted inside a freezer chamber. Cuts frozen tissue sections for rapid histological analysis.", price: "$30K-$80K" },
      { name: "Vibratome", description: "Cuts tissue sections without freezing or paraffin embedding. Preserves native tissue architecture for electrophysiology and imaging." },
    ],
  },
  {
    id: "electrophysiology",
    title: "Electrophysiology & Neuroscience",
    description:
      "Instruments for recording and manipulating electrical activity in neurons, muscles, and the brain.",
    brands: "Molecular Devices, Nikon, Bruker, Tucker-Davis, MED Associates",
    tags: [
      { name: "Patch Clamp Rig", description: "Records electrical activity from individual ion channels or single cells. The fundamental technique in cellular neuroscience and cardiac research." },
      { name: "Electrophysiology Rig", description: "Complete recording setup: microscope, micromanipulators, amplifier, digitizer, and acquisition software. Often custom-configured." },
      { name: "EEG System", description: "Electroencephalography. Records brain electrical activity through scalp electrodes. Neuroscience, sleep studies, epilepsy research." },
      { name: "EMG System", description: "Electromyography. Records muscle electrical activity. Neuromuscular disease research, rehabilitation, sports science." },
      { name: "Multi-Electrode Array (MEA)", description: "Records from dozens to thousands of neurons simultaneously on a chip. In vitro neural network studies, drug screening.", price: "$50K-$200K" },
      { name: "Optogenetics Equipment", description: "Uses light to control genetically modified neurons. Requires lasers, optical fibers, and specialized light delivery hardware." },
      { name: "Behavioral Testing System", description: "Automated systems for measuring animal behavior: mazes, fear conditioning chambers, locomotion tracking, operant conditioning." },
      { name: "Stereotaxic Frame", description: "Precisely positions surgical tools in the brain using 3D coordinates. Essential for in vivo neuroscience, injections, and implants." },
      { name: "Two-Photon Microscope", description: "Images deep into living brain tissue with minimal photodamage. The primary tool for in vivo neural imaging in awake, behaving animals.", price: "$300K-$800K" },
    ],
  },
  {
    id: "animal-research",
    title: "Animal Research & Vivarium",
    description:
      "Equipment for housing, imaging, and performing procedures on research animals. Preclinical drug development and basic biomedical research.",
    brands: "Allentown, Tecniplast, Kent Scientific, Bruker, PerkinElmer, MR Solutions",
    tags: [
      { name: "IVC Caging", description: "Individually ventilated caging systems. Provide filtered air to each cage independently. Required for immunocompromised or infectious disease models." },
      { name: "Cage Washer", description: "Industrial-scale cage and rack washers for vivarium operations. High-throughput cleaning and decontamination." },
      { name: "Anesthesia System", description: "Isoflurane vaporizers, gas scavenging, and physiological monitoring for animal surgical procedures." },
      { name: "Animal Transfer Station", description: "Laminar flow hood designed for transferring animals between cages in a clean, HEPA-filtered environment." },
      { name: "Small Animal Imaging System", description: "In vivo imaging of mice and rats: bioluminescence, fluorescence, micro-CT, and PET. Preclinical drug efficacy studies." },
      { name: "MRI System", description: "Magnetic resonance imaging for non-invasive soft tissue imaging. Research MRI systems for preclinical and clinical studies.", price: "$1M-$5M+" },
      { name: "PET Scanner", description: "Positron emission tomography. Metabolic and molecular imaging. Often paired with CT for anatomical co-registration.", price: "$500K-$2M" },
      { name: "CT Scanner", description: "Computed tomography. 3D X-ray imaging for bone, vasculature, and organ structure. Preclinical and clinical research." },
      { name: "Ultrasound System", description: "High-frequency imaging of soft tissues in real time. Non-invasive, no radiation. Cardiovascular, developmental biology, tumor monitoring." },
      { name: "X-Ray Irradiator", description: "Delivers controlled radiation doses for cancer research, bone marrow transplant conditioning, and radiation biology studies." },
      { name: "Rodent Treadmill", description: "Motorized treadmills for exercise physiology research in mice and rats. Metabolic studies, cardiac function, endurance testing." },
      { name: "Telemetry System", description: "Wireless implants that monitor heart rate, blood pressure, temperature, and activity in freely moving animals." },
    ],
  },
  {
    id: "clinical",
    title: "Clinical & Diagnostic",
    description:
      "Instruments used in clinical research labs, hospital research programs, and translational medicine.",
    brands: "Beckman Coulter, Roche Diagnostics, Abbott, Siemens Healthineers, Bio-Rad",
    tags: [
      { name: "Clinical Chemistry Analyzer", description: "Automated analyzer for blood chemistry panels, immunoassays, and biomarker quantification. Hospital labs and clinical research." },
      { name: "Blood Gas Analyzer", description: "Measures blood pH, CO2, O2, and electrolytes. Point-of-care instrument in ICUs, emergency departments, and pulmonary research." },
      { name: "Hematology Analyzer", description: "Automated complete blood count (CBC) and white cell differential. High-throughput cell counting and classification." },
      { name: "ELISA System", description: "Automated enzyme-linked immunosorbent assay platform. Measures antibodies, hormones, cytokines, and other proteins in biological samples." },
      { name: "Lateral Flow Reader", description: "Quantitative reader for rapid diagnostic test strips. Turns qualitative yes/no tests into measurable results." },
      { name: "Point-of-Care Device", description: "Portable diagnostic instruments used at the bedside, in the field, or in resource-limited settings. Growing market in global health research." },
    ],
  },
];

/* -- tier 2 items --------------------------------------------------------- */

const tier2Items = [
  "CO2 incubator", "LN2 storage", "Milli-Q water system", "PCR thermocycler",
  "-80\u00B0C freezer", "UV crosslinker", "Analytical balance", "Autoclave",
  "Bead beater", "Benchtop centrifuge", "Biosafety cabinet", "Cell culture hood",
  "Chiller/circulator", "Cold room", "Controlled-rate freezer", "Cryo freezer",
  "Decontamination system", "Deionizer", "Dry bath", "Electronic pipette",
  "Floor centrifuge", "Fume hood", "Gel electrophoresis", "Gel imager",
  "Homogenizer", "Hot plate stirrer", "Laminar flow hood", "Manual pipette",
  "Microcentrifuge", "Microplate dispenser", "Orbital shaker", "Osmometer",
  "pH meter", "Refractometer", "Refrigerated centrifuge", "-20\u00B0C refrigerator",
  "Repeat pipetter", "Shaking incubator", "Thermal cycler", "Thermomixer",
  "Tissue grinder", "Viscometer", "Vortexer", "Water bath",
  "Water purification system",
];

/* -- jump links ----------------------------------------------------------- */

const jumpLinks = [
  ...categories.map((c) => ({ id: c.id, label: c.title })),
  { id: "tier-2", label: "Common Lab Equipment" },
];

/* -- page component ------------------------------------------------------- */

export default function EquipmentTagsGuide() {
  return (
    <>
      <Header />

      {/* Hero */}
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
              Equipment Tags
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            Equipment Tags{" "}
            <span className="text-[var(--color-brand)]">
              We Detect
            </span>
          </h1>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mb-4">
            Every piece of lab equipment our AI identifies across 450,000+
            federal grant abstracts.
          </p>
          <div className="space-y-3 text-sm text-[var(--color-gray-700)] max-w-2xl">
            <p>
              Our AI reads every new federal grant abstract and identifies
              mentions of specific lab equipment, instrument purchases, and
              infrastructure needs. When a PI writes &quot;we will acquire a
              confocal microscope&quot; or &quot;this project requires
              next-generation sequencing,&quot; we catch it and tag it.
            </p>
            <p>
              We organize these signals into 14 equipment categories covering
              90+ high-value instruments (typically $20K+) plus 45 common lab
              equipment items. Each tag maps directly to the kinds of instruments
              that sales reps sell.
            </p>
            <p>
              This page walks through every tag we detect, what it means, and
              why it matters for your pipeline. We update this list as customers
              request new tags.
            </p>
          </div>
        </div>
      </section>

      {/* Jump Links */}
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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
              {cat.title}
            </h2>
            <p className="text-sm text-[var(--color-gray-500)] mb-6">
              {cat.description}
            </p>

            <div className="space-y-3">
              {cat.tags.map((tag) => (
                <div
                  key={tag.name}
                  className="rounded-xl border border-[var(--color-gray-100)] bg-white px-5 py-4 hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-base font-bold text-[var(--color-gray-900)]">
                      {tag.name}
                    </h3>
                    {tag.price && (
                      <span className="text-xs font-semibold bg-[var(--color-brand-light)] text-[var(--color-brand)] px-2.5 py-0.5 rounded-full">
                        {tag.price}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-gray-700)]">
                    {tag.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-[var(--color-gray-50)] rounded-lg px-4 py-3">
              <p className="text-xs text-[var(--color-gray-500)]">
                <span className="font-semibold text-[var(--color-gray-700)]">
                  Key brands:
                </span>{" "}
                {cat.brands}
              </p>
            </div>
          </section>
        ))}

        {/* Tier 2 */}
        <section id="tier-2" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            Common Lab Equipment (Tier 2)
          </h2>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            These are standard lab items typically under $20K. We track them
            because they show up in grant abstracts, but they are lower priority
            for most sales reps. If you sell consumables or general lab
            infrastructure, these tags still surface relevant grants for you.
          </p>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6">
            <div className="flex flex-wrap gap-2">
              {tier2Items.map((item) => (
                <span
                  key={item}
                  className="text-sm px-3 py-1.5 rounded-full border border-[var(--color-gray-200)] text-[var(--color-gray-700)] bg-[var(--color-gray-50)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-b from-[var(--color-dark)] to-[#0D1F3C] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Want to see these tags in action?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Our weekly reports highlight grants that mention the equipment you
            sell, scored by buying signals and matched to your territory.
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
