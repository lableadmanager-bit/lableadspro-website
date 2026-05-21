import { Search, Bot, ClipboardList, Mail } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const steps: { number: string; icon: ReactNode; title: string }[] = [
  {
    number: "01",
    icon: <Search className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "We Monitor the Funding",
  },
  {
    number: "02",
    icon: <Bot className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "AI Anticipates Equipment Needs",
  },
  {
    number: "03",
    icon: <ClipboardList className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "We Find the Decision Maker",
  },
  {
    number: "04",
    icon: <Mail className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "Delivered to Your Inbox",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-[var(--color-gray-50)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[var(--color-gray-500)]">
            From grant award to your inbox in four steps.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-[var(--color-gray-100)] text-center"
            >
              <div className="flex justify-center mb-3">{step.icon}</div>
              <span className="text-xs font-bold text-[var(--color-brand)] bg-[var(--color-brand-light)] px-2 py-0.5 rounded-full">
                STEP {step.number}
              </span>
              <h3 className="mt-3 text-base md:text-lg font-bold text-[var(--color-dark)]">
                {step.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Book a Demo CTA */}
        <div id="demo" className="mt-12 bg-white rounded-2xl p-8 md:p-10 border border-[var(--color-gray-100)] text-center">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-dark)] mb-3">
            See it live
          </h3>
          <p className="text-[var(--color-gray-500)] max-w-2xl mx-auto mb-6 leading-relaxed">
            A 15-minute walkthrough of the database, the weekly reports, and how reps are using it in your territory.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/sample"
              className="inline-block text-sm font-semibold text-[var(--color-gray-700)] bg-white hover:bg-[var(--color-gray-50)] border border-[var(--color-gray-300)] px-8 py-3 rounded-lg transition-colors"
            >
              Free Sample Report
            </Link>
            <Link
              href="/demo"
              className="inline-block text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-8 py-3 rounded-lg transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
