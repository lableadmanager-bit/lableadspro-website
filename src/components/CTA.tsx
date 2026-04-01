export default function CTA() {
  return (
    <section id="cta" className="py-20 px-6 bg-gradient-to-b from-[var(--color-dark)] to-[#0D1F3C]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stop Letting Leads Slip Through the Cracks
        </h2>
        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
          Book your demo today.
        </p>

        <a
          href="https://calendar.app.google/xKb3rVrYvAfdt1Zt6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold rounded-xl text-lg transition-colors shadow-lg shadow-blue-500/20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Request a Demo
        </a>
      </div>
    </section>
  );
}
