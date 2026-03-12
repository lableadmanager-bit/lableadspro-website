const plans = [
  {
    name: "LabLeads Basic",
    price: "$69",
    period: "/state/month",
    description: "NIH grant intelligence for your territory. The foundation every rep needs.",
    features: [
      "All newly awarded NIH grants",
      "AI equipment need anticipation",
      "PI name, contact info & institution",
      "Full funding details & grant amounts",
      "Weekly email delivery every Monday",
      "Pick as many states as you need",
    ],
    cta: "Get Early Access",
    featured: false,
  },
  {
    name: "LabLeads Plus",
    price: "$79",
    period: "/state/month",
    description: "All 8 federal agencies. The grants your competition doesn't even know exist.",
    features: [
      "Everything in LabLeads Basic",
      "NSF, DOD, DOE, USDA, VA, CDC & NASA grants",
      "7 additional funding agencies for +$10/mo",
      "Full funding details & grant amounts",
      "Weekly email delivery every Monday",
      "Pick as many states as you need",
    ],
    cta: "Get Early Access",
    featured: false,
  },
  {
    name: "LabLeads Pro",
    price: "$99",
    period: "/state/month",
    description: "Grants from 8 federal research agencies and early intel on new labs — everything you need to hit President's Club this year.",
    features: [
      "Everything in LabLeads Plus",
      "New lab & faculty hire detection",
      "First-time grant recipient alerts",
      "New lab setup signals & announcements",
      "Be the first rep to reach out",
      "Priority Monday AM delivery",
    ],
    cta: "Get Early Access",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-[var(--color-gray-50)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            Simple, Per-State Pricing
          </h2>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
            Only pay for the states you cover. Add or remove states anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.featured
                  ? "bg-[var(--color-dark)] text-white ring-2 ring-[var(--color-brand)] shadow-2xl shadow-blue-500/10 relative"
                  : "bg-white border border-[var(--color-gray-100)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-brand)] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3
                className={`text-xl font-bold mb-2 ${
                  plan.featured ? "text-white" : "text-[var(--color-dark)]"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  plan.featured ? "text-gray-400" : "text-[var(--color-gray-500)]"
                }`}
              >
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span
                  className={`text-sm ${
                    plan.featured ? "text-gray-400" : "text-[var(--color-gray-500)]"
                  }`}
                >
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <span className={plan.featured ? "text-[var(--color-accent)]" : "text-[var(--color-brand)]"}>
                      ✓
                    </span>
                    <span className={plan.featured ? "text-gray-300" : "text-[var(--color-gray-700)]"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`block text-center font-semibold py-3 px-6 rounded-xl transition-colors ${
                  plan.featured
                    ? "bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white"
                    : "bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-300)] text-[var(--color-dark)]"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[var(--color-gray-500)] mt-8">
          No contracts. Cancel anytime. Adjust your states month to month.
        </p>
      </div>
    </section>
  );
}
