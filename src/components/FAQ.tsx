"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "What funding sources do you monitor?",
    answer:
      "We currently monitor and deliver newly awarded grants from NIH, NSF, DOD, DOE, USDA, VA, CDC, and NASA.",
  },
  {
    question: "How does AI equipment tagging work?",
    answer:
      "Our AI reads every grant abstract and identifies specific equipment needs mentioned or implied, including microscopes, centrifuges, sequencers, flow cytometers, PCR systems, and more, with nearly 100 unique tags in total. You can filter leads by the equipment categories you sell. Want to verify that your equipment is something we tag? Reach out to info@lableadspro.com.",
  },
  {
    question: "Why per-state pricing?",
    answer:
      "Because that's how territories work. You shouldn't pay for data in states you don't cover. Pick the states in your territory, and only pay for those. Add or remove states anytime.",
  },
  {
    question: "How fresh is the data?",
    answer:
      "NIH, VA, and NSF grants are typically processed the same day they are awarded. Other agencies may have a slight delay due to their release schedules, but rest assured — your Monday report includes every newly awarded grant detected during the prior week.",
  },
  {
    question: "Can I share my account with my team?",
    answer:
      "Individual subscriptions are per-rep. If your team needs access, ask us about team pricing. It's more cost-effective and includes national coverage.",
  },
  {
    question: "What if I sell equipment you don't tag yet?",
    answer:
      "Reach out to us at info@lableadspro.com. We're constantly expanding our equipment taxonomy based on what our customers sell. If you need a category we don't cover yet, we'll add it.",
  },
  {
    question: "What is the grant database?",
    answer:
      "Every subscription includes access to our live, searchable grant database. Search by keyword, filter by state, institution, funding agency, NIH institute, grant type, and more. Click any PI to see their full funding portfolio. It's like having your own research intelligence platform.",
  },
  {
    question: "How do I access the database?",
    answer:
      "After subscribing, you'll receive a welcome email with a link to set your password. Log in at lableadspro.com/database anytime. Your database access is filtered to the states in your subscription.",
  },
  {
    question: "Can I search by PI name or institution?",
    answer:
      "Yes. You can search by keyword across all grant abstracts, filter by specific institutions (e.g., Duke, UNC Chapel Hill), and click any PI name to see all of their grants in the database.",
  },
  {
    question: "How is the database different from the weekly reports?",
    answer:
      "The weekly reports are curated intelligence pushed to your inbox every Monday, with AI-powered equipment tagging that anticipates what each lab might need. The database is your self-service search tool for when you want to research a specific PI, institution, or topic on your own schedule. Both are included in every plan.",
  },
  {
    question: "How often is the database updated?",
    answer:
      "New grants are added weekly as they're awarded by federal agencies.",
  },
  {
    question: "How big is the database?",
    answer:
      "The database currently contains over 340,000 grants and 150,000 PI records across 8 federal agencies, covering all currently active funded grants, and then some.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="border border-[var(--color-gray-100)] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[var(--color-gray-50)] transition-colors"
      >
        <span className="font-semibold text-[var(--color-dark)] pr-4">
          {faq.question}
        </span>
        <span
          className="text-[var(--color-gray-500)] flex-shrink-0 text-xl transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? `${height}px` : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 pb-5 text-[var(--color-gray-500)] leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndices.has(index)}
              onToggle={() => toggleIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
