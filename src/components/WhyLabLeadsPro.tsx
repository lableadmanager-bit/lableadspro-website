import { Mail, Database, Search } from "lucide-react";
import { ReactNode } from "react";

const reasons: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <Mail className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "Weekly Lead Reports",
    description:
      "Every Monday morning, a curated list of the latest grant-funded labs in your territory. No dashboard to learn. Open and go.",
  },
  {
    icon: <Database className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "Searchable Grant Database",
    description:
      "525,000+ actively funded grants. Search by keyword, agency, institution, or state. Pull up any PI's full funding portfolio in seconds.",
  },
  {
    icon: <Search className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "Search by Grant or by PI",
    description:
      "Drill down by grant, agency, or topic. Or pivot to PI view and see every project a researcher has been funded for.",
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
            Two tools, one mission: get you in front of funded labs before the competition does.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-[var(--color-gray-50)] rounded-2xl p-6 border border-[var(--color-gray-100)]"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2">
                {reason.title}
              </h3>
              <p className="text-[var(--color-gray-500)] leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
