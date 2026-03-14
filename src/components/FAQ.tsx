"use client";

import { useState } from "react";

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
