const steps = [
  {
    number: "01",
    icon: "🔬",
    title: "We Monitor the Funding",
    description:
      "Our AI continuously scans NIH Reporter, NSF awards, university announcements, and public research databases for newly funded grants in your territory.",
  },
  {
    number: "02",
    icon: "🤖",
    title: "AI Identifies Equipment Needs",
    description:
      "Every grant abstract is analyzed by our AI to identify specific equipment categories — microscopes, centrifuges, sequencers, flow cytometers, and more.",
  },
  {
    number: "03",
    icon: "📋",
    title: "We Find the Decision Maker",
    description:
      "Each lead comes with the PI's name, email, phone number, institution, and department. No more digging through faculty directories.",
  },
  {
    number: "04",
    icon: "📧",
    title: "Delivered to Your Inbox",
    description:
      "Every Monday morning, you get a curated list of qualified leads in your territory. Open your email, start making calls. That simple.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-[var(--color-gray-50)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[var(--color-gray-500)]">
            From grant award to your inbox in four steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-8 border border-[var(--color-gray-100)] hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-sm font-bold text-[var(--color-brand)] bg-[var(--color-brand-light)] px-3 py-1 rounded-full">
                  STEP {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-dark)] mb-2">
                {step.title}
              </h3>
              <p className="text-[var(--color-gray-500)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
