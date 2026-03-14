"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What funding sources do you monitor?",
    answer:
      "We track grants from NIH, NSF, DOD, DOE, USDA, VA, CDC, and NASA — covering the major federal research funding agencies.",
  },
  {
    question: "How does AI equipment tagging work?",
    answer:
      "Our AI reads every grant abstract and identifies specific equipment categories mentioned or implied, including microscopes, centrifuges, sequencers, flow cytometers, PCR systems, and dozens more. You can filter leads by the equipment categories you sell.",
  },
  {
    question: "Why per-state pricing?",
    answer:
      "Because that's how territories work. You shouldn't pay for data in states you don't cover. Pick exactly the states in your territory, and only pay for those. Add or remove states anytime.",
  },
  {
    question: "How fresh is the data?",
    answer:
      "Grants are processed within days of being awarded. Your Monday report includes everything from the previous week. You'll know about new funding before most reps even think to check.",
  },
  {
    question: "Can I share my account with my team?",
    answer:
      "Individual subscriptions are per-rep. If your team needs access, ask us about team pricing. It's more cost-effective and includes national coverage.",
  },
  {
    question: "What if I sell equipment you don't tag yet?",
    answer:
      "Tell us. We're constantly expanding our equipment taxonomy based on what our customers sell. If you need a category we don't cover yet, we'll add it.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <div
              key={index}
              className="border border-[var(--color-gray-100)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[var(--color-gray-50)] transition-colors"
              >
                <span className="font-semibold text-[var(--color-dark)] pr-4">
                  {faq.question}
                </span>
                <span className="text-[var(--color-gray-500)] flex-shrink-0 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-[var(--color-gray-500)] leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
