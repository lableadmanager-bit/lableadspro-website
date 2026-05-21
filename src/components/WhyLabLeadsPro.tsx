import { Mail, Database, Tag, Sparkles, Search, Users } from "lucide-react";
import { ReactNode } from "react";

const reasons: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <Mail className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "Weekly Lead Reports",
    description:
      "Every newly funded grant in your territory, delivered to your inbox every Monday.",
  },
  {
    icon: <Database className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "Full Grant Database",
    description:
      "Every actively funded federal grant. Accessible from desktop or mobile, anywhere.",
  },
  {
    icon: <Tag className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "AI Equipment Tagging",
    description:
      "Every abstract tagged for equipment needs. No keyword lists to build or maintain.",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "New Lab Detection",
    description:
      "Find newly formed labs before they place their first order. Proprietary to Lab Leads Pro.",
  },
  {
    icon: <Search className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "Search by Grant or by PI",
    description:
      "Drill into a grant, or pull up a PI's full funding portfolio. Pivot however you sell.",
  },
  {
    icon: <Users className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "Plans for Every Rep",
    description:
      "Solo territory or full enterprise team. Pricing flexes to your reality.",
  },
];

export default function WhyLabLeadsPro() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            Why Lab Leads Pro
          </h2>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
            What sets us apart from every other lead tool on the market.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-[var(--color-gray-50)] rounded-2xl p-6 border border-[var(--color-gray-100)]"
            >
              <div className="mb-3">{reason.icon}</div>
              <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2">
                {reason.title}
              </h3>
              <p className="text-[var(--color-gray-500)] leading-relaxed text-sm">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
