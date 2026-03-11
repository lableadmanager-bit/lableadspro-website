export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[var(--color-brand-light)] to-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-gray-300)] text-sm text-[var(--color-gray-700)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          Now tracking 6,000+ active grants
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up-delay-1 text-4xl md:text-6xl font-extrabold text-[var(--color-dark)] leading-tight tracking-tight mb-6">
          Know Who&apos;s Buying
          <br />
          <span className="text-[var(--color-brand)]">Before They Start Shopping</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up-delay-2 text-lg md:text-xl text-[var(--color-gray-500)] max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered lead intelligence for life-science equipment sales.
          We monitor NIH &amp; NSF grants, identify equipment needs, and deliver
          qualified leads to your inbox every week.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#cta"
            className="w-full sm:w-auto px-8 py-4 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold rounded-xl text-lg transition-colors shadow-lg shadow-blue-500/20"
          >
            Get Early Access →
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[var(--color-gray-50)] text-[var(--color-gray-700)] font-semibold rounded-xl text-lg transition-colors border border-[var(--color-gray-300)]"
          >
            See How It Works
          </a>
        </div>

        {/* Social proof hint */}
        <p className="mt-10 text-sm text-[var(--color-gray-500)]">
          Built by a 7-year life-science sales veteran. Made for reps who want to sell smarter.
        </p>
      </div>
    </section>
  );
}
