const features = [
  {
    icon: "🎯",
    title: "Territory-Based Filtering",
    description:
      "Pick your states. Get leads only in your territory. No noise from regions you don't cover.",
  },
  {
    icon: "🧠",
    title: "AI Equipment Tagging",
    description:
      "Our AI tags both stated and implied equipment needs from every grant abstract. You'll know what they need to buy before they do.",
  },
  {
    icon: "📞",
    title: "PI Contact Information",
    description:
      "PI name, email, institution, and department. Everything you need to start the conversation.",
  },
  {
    icon: "💰",
    title: "Grant Funding Details",
    description:
      "Award amount, funding agency, project dates, and grant type. Know their budget before you call.",
  },
  {
    icon: "🆕",
    title: "New Lab Detection",
    description:
      "First-time grants, new faculty appointments, and lab announcements. Be the first rep to reach out.",
  },
  {
    icon: "📊",
    title: "Weekly Intelligence Reports",
    description:
      "Clean, actionable reports delivered every Monday. No dashboard to learn. Just open your email and go.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            Everything You Need to Sell Smarter
          </h2>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
            Built by someone who spent many years doing this manually.
            We automated the parts that don&apos;t need a human touch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2">
                {feature.title}
              </h3>
              <p className="text-[var(--color-gray-500)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
