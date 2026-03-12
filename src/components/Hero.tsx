import AgencyBar from "./AgencyBar";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Science-y background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] to-white">
        {/* Molecular pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mol-grid" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="3" fill="#0066FF" />
              <circle cx="0" cy="0" r="2" fill="#0066FF" />
              <circle cx="120" cy="0" r="2" fill="#0066FF" />
              <circle cx="0" cy="120" r="2" fill="#0066FF" />
              <circle cx="120" cy="120" r="2" fill="#0066FF" />
              <line x1="60" y1="60" x2="0" y2="0" stroke="#0066FF" strokeWidth="0.8" />
              <line x1="60" y1="60" x2="120" y2="0" stroke="#0066FF" strokeWidth="0.8" />
              <line x1="60" y1="60" x2="0" y2="120" stroke="#0066FF" strokeWidth="0.8" />
              <line x1="60" y1="60" x2="120" y2="120" stroke="#0066FF" strokeWidth="0.8" />
              <circle cx="30" cy="90" r="1.5" fill="#00C48C" />
              <circle cx="90" cy="30" r="1.5" fill="#00C48C" />
              <line x1="60" y1="60" x2="30" y2="90" stroke="#00C48C" strokeWidth="0.5" />
              <line x1="60" y1="60" x2="90" y2="30" stroke="#00C48C" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mol-grid)" />
        </svg>
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-gray-300)] text-sm text-[var(--color-gray-700)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-blink" />
          Currently monitoring $602.8 billion in active research funding from
        </div>

        {/* Scrolling agency logo bar */}
        <AgencyBar />

        {/* Headline */}
        <h1 className="animate-fade-in-up-delay-1 text-4xl md:text-6xl font-extrabold text-[var(--color-dark)] leading-tight tracking-tight mb-6">
          Know Who&apos;s Buying
          <br />
          <span className="text-[var(--color-brand)]">Before They Start Shopping</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up-delay-2 text-lg md:text-xl text-[var(--color-gray-500)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Lab Leads Pro is the AI-powered lead intelligence solution
          for <span className="whitespace-nowrap">life-science equipment sales.</span> We help you find new labs before the competition does.
          We monitor NIH &amp; NSF grants to anticipate equipment needs, and we
          deliver these qualified leads to your inbox every Monday morning.
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
          Built by a life-science sales veteran. Made for reps who want to sell smarter.
        </p>


      </div>
    </section>
  );
}
