const plans = [
  {
    name: "Lab Leads Standard",
    price: "$99",
    period: "/state/month",
    description: "NIH grant intelligence + database access for your territory. The foundation every rep needs.",
    features: [
      "Weekly NIH grant reports",
      "AI equipment need anticipation",
      "Full NIH grant database access",
      "PI contact info & institution details",
      "Keyword search across all abstracts",
      "Weekly email delivery every Monday",
    ],
    cta: "Get Started",
    href: "/checkout?plan=standard",
    featured: false,
  },
  {
    name: "Lab Leads Pro",
    price: "$149",
    period: "/state/month",
    description: "The complete package. 8 agencies + new lab detection + full database. Everything you need to hit President's Club.",
    features: [
      "Everything in Standard",
      "NSF, DOD, DOE, NASA, VA, USDA & CDC grants",
      "Full database access — all 8 agencies",
      "New lab & faculty hire detection",
      "New PI alerts",
      "Priority Monday AM delivery",
    ],
    cta: "Get Started",
    href: "/checkout?plan=pro",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-[var(--color-gray-50)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            Simple, Per-State Pricing
          </h2>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
            Only pay for the states you cover. Add or remove states anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
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
                className={`text-sm min-h-[4rem] mb-6 ${
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
              <ul className="space-y-3 mb-8 flex-grow">
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
                href={plan.href}
                className={`block text-center font-semibold py-3 px-6 rounded-xl transition-colors mt-auto ${
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

        <div className="mt-8 max-w-4xl mx-auto bg-[var(--color-dark)] rounded-2xl p-6 text-center border border-white/10">
          <p className="text-white text-base font-semibold">
            🎉 Select 3+ states on Standard and get automatically upgraded to Pro — same price!
          </p>
        </div>

        <p className="text-center text-sm text-[var(--color-gray-500)] mt-8">
          No contracts. Cancel anytime. Adjust your states month to month.
        </p>
      </div>
    </section>
  );
}
