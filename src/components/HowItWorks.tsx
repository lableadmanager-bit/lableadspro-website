import { Search, Bot, ClipboardList, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const steps: { number: string; icon: ReactNode; title: string; description: string }[] = [
  {
    number: "01",
    icon: <Search className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "We Monitor the Funding",
    description:
      "Our system continuously scans NIH, NSF, DOD, DOE, USDA, VA, CDC, NASA, and other public research databases for newly funded grants in your territory.",
  },
  {
    number: "02",
    icon: <Bot className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "AI Anticipates Equipment Needs",
    description:
      "Every grant abstract is analyzed by our AI. Not just for keywords, but for context. If a lab is doing cell culture, they'll need incubators. Doing imaging? They'll need microscopes. We connect the dots so you don't have to.",
  },
  {
    number: "03",
    icon: <ClipboardList className="w-7 h-7 text-[var(--color-brand)]" />,
    title: "We Find the Decision Maker",
    description:
      "Each lead comes with the PI's name, contact information, institution, and department. No more digging through faculty directories.",
  },
  {
    number: "04",
    icon: <Mail className="w-7 h-7 text-[var(--color-brand)]" />,
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
                {step.icon}
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

        {/* Sample report CTA */}
        <div className="mt-10 text-center">
          <p className="text-[var(--color-gray-500)] mb-4">
            See for yourself what a weekly lead report looks like.
          </p>
          <Link
            href="/sample"
            className="inline-block text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-8 py-3 rounded-lg transition-colors"
          >
            Get a Free Sample Report
          </Link>
        </div>

        {/* Book a Demo CTA */}
        <div id="demo" className="mt-12 bg-white rounded-2xl p-8 md:p-10 border border-[var(--color-gray-100)] text-center">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-dark)] mb-3">
            See it live
          </h3>
          <p className="text-[var(--color-gray-500)] max-w-2xl mx-auto mb-6 leading-relaxed">
            A 15-minute walkthrough of the database, the weekly reports, and how reps are using it in your territory.
          </p>
          <Link
            href="/demo"
            className="inline-block text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-8 py-3 rounded-lg transition-colors"
          >
            Book a Demo
          </Link>
        </div>

        {/* New Lab Detection Teaser */}
        <div className="mt-12 bg-gradient-to-r from-[var(--color-dark)] to-[#1a2d4a] rounded-2xl p-8 md:p-10 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[var(--color-brand)]" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            New Lab Detection
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-4">
            After years in the life-science industry, one thing became clear: new labs are the
            hottest commodity in equipment sales. Think about it. A completely empty lab
            has to be filled up with something. Why not your equipment?
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every rep in the space tries to think up clever ways to find new labs
            before the competition. Our New Lab Detection is a proprietary system
            built to do exactly that, so you can be the first rep to walk through the door.
          </p>
        </div>
      </div>
    </section>
  );
}
