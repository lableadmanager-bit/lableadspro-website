/**
 * Structured data (JSON-LD) for guide pages.
 * Invisible to users - helps search engines and LLMs parse our content.
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface GuideSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  faqs?: FAQItem[];
}

export default function GuideSchema({
  title,
  description,
  url,
  datePublished = "2026-03-20",
  dateModified = "2026-03-20",
  faqs = [],
}: GuideSchemaProps) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: title,
      description,
      url,
      datePublished,
      dateModified,
      author: {
        "@type": "Organization",
        name: "Lab Leads Pro",
        url: "https://lableadspro.com",
      },
      publisher: {
        "@id": "https://lableadspro.com/#organization",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
