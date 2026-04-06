/**
 * GuidesCrossLinks — "Explore Other Agency Guides" section
 * Add at the bottom of every agency guide page, before the CTA section.
 * Pass the current guide's slug to exclude it from the list.
 */

interface Guide {
  slug: string;
  name: string;
  abbr: string;
  emoji: string;
}

const ALL_GUIDES: Guide[] = [
  { slug: "nih-institutes-guide", name: "NIH", abbr: "National Institutes of Health", emoji: "🧬" },
  { slug: "nsf-grants-guide", name: "NSF", abbr: "National Science Foundation", emoji: "🔬" },
  { slug: "dod-grants-guide", name: "DOD", abbr: "Dept. of Defense", emoji: "🛡️" },
  { slug: "doe-grants-guide", name: "DOE", abbr: "Dept. of Energy", emoji: "⚡" },
  { slug: "nasa-grants-guide", name: "NASA", abbr: "NASA", emoji: "🚀" },
  { slug: "usda-grants-guide", name: "USDA", abbr: "Dept. of Agriculture", emoji: "🌱" },
  { slug: "va-grants-guide", name: "VA", abbr: "Veterans Affairs", emoji: "🎖️" },
  { slug: "cdc-grants-guide", name: "CDC", abbr: "Centers for Disease Control", emoji: "🏥" },
  { slug: "funding-agencies-guide", name: "All Agencies", abbr: "Overview of all 8 agencies", emoji: "📋" },
];

interface Props {
  currentSlug: string;
}

export default function GuidesCrossLinks({ currentSlug }: Props) {
  const others = ALL_GUIDES.filter((g) => g.slug !== currentSlug);

  return (
    <section className="mt-16 mb-12">
      <h2 className="text-xl font-bold text-[var(--color-dark)] mb-2">
        Explore Other Agency Guides
      </h2>
      <p className="text-[var(--color-gray-500)] mb-6 text-sm">
        Lab Leads Pro monitors all 8 federal research agencies. Learn how each one funds life-science equipment purchases.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {others.map((guide) => (
          <a
            key={guide.slug}
            href={`/${guide.slug}`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--color-gray-200)] bg-white hover:border-[var(--color-brand)] hover:shadow-sm transition-all group"
          >
            <span className="text-xl">{guide.emoji}</span>
            <div>
              <div className="text-sm font-semibold text-[var(--color-dark)] group-hover:text-[var(--color-brand)] transition-colors">
                {guide.name}
              </div>
              <div className="text-xs text-[var(--color-gray-400)] leading-tight">
                {guide.abbr}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
