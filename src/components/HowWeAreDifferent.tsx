import { Zap, User, Smartphone, Package } from "lucide-react";
import { ReactNode } from "react";

const differences: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <Zap className="w-7 h-7 text-[var(--color-accent)]" />,
    title: "Reports sent, not built",
    description:
      "Other tools hand you a search bar and walk away. We do the work and ship a clean weekly report straight to your inbox.",
  },
  {
    icon: <Package className="w-7 h-7 text-[var(--color-accent)]" />,
    title: "Ready out of the box",
    description:
      "No keyword lists to build. No filters to maintain. We have already mapped equipment to grants, so your first report is ready on day one.",
  },
  {
    icon: <User className="w-7 h-7 text-[var(--color-accent)]" />,
    title: "Built for the individual rep",
    description:
      "Enterprise pricing locks out the reps who need this most. Our plans flex around a single territory and a single rep.",
  },
  {
    icon: <Smartphone className="w-7 h-7 text-[var(--color-accent)]" />,
    title: "Works anywhere, on any device",
    description:
      "Search and read leads on your phone between meetings. No clunky desktop-only dashboard. The database goes where you go.",
  },
];

export default function HowWeAreDifferent() {
  return (
    <section className="py-20 px-6 bg-[var(--color-gray-50)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            How We&apos;re Different
          </h2>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
            Other tools sell you raw data. We deliver leads.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {differences.map((diff) => (
            <div
              key={diff.title}
              className="bg-white rounded-2xl p-6 border border-[var(--color-gray-100)] flex gap-4"
            >
              <div className="flex-shrink-0">{diff.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2">
                  {diff.title}
                </h3>
                <p className="text-[var(--color-gray-500)] leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
