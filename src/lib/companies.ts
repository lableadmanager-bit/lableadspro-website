// Shared data + helpers for the Companies directory beta.
// Reads from the v_companies_beta Supabase view (12,696 active companies with a state).

export interface CompanyBeta {
  id: number;
  name: string;
  website: string | null;
  domain: string | null;
  linkedin_url: string | null;
  company_type: string | null;
  is_public: boolean | null;
  ticker: string | null;
  is_foreign_parent_us_sub: boolean | null;
  parent_company_name: string | null;
  employee_count: number | null;
  employee_count_bucket: string | null;
  sbir_award_count: number | null;
  sbir_total_usd: number | null;
  sbir_latest_award_year: number | null;
  nih_grant_count: number | null;
  nih_grant_total_usd: number | null;
  description: string | null;
  primary_state: string | null;
  primary_city: string | null;
  primary_street: string | null;
  primary_zip: string | null;
  total_sites: number | null;
}

// US states + DC + PR present in the beta cohort, with current company counts (snapshot 2026-06-05).
// Counts seed the picker; the detail page always shows the live count.
export const STATES: { code: string; name: string; count: number }[] = [
  { code: "CA", name: "California", count: 3153 },
  { code: "MA", name: "Massachusetts", count: 1612 },
  { code: "NY", name: "New York", count: 674 },
  { code: "TX", name: "Texas", count: 594 },
  { code: "PA", name: "Pennsylvania", count: 551 },
  { code: "NC", name: "North Carolina", count: 512 },
  { code: "MD", name: "Maryland", count: 501 },
  { code: "NJ", name: "New Jersey", count: 484 },
  { code: "FL", name: "Florida", count: 440 },
  { code: "IL", name: "Illinois", count: 308 },
  { code: "WA", name: "Washington", count: 308 },
  { code: "MN", name: "Minnesota", count: 286 },
  { code: "CO", name: "Colorado", count: 244 },
  { code: "OH", name: "Ohio", count: 235 },
  { code: "VA", name: "Virginia", count: 222 },
  { code: "MI", name: "Michigan", count: 203 },
  { code: "GA", name: "Georgia", count: 202 },
  { code: "CT", name: "Connecticut", count: 198 },
  { code: "AZ", name: "Arizona", count: 165 },
  { code: "IN", name: "Indiana", count: 147 },
  { code: "WI", name: "Wisconsin", count: 145 },
  { code: "UT", name: "Utah", count: 140 },
  { code: "MO", name: "Missouri", count: 137 },
  { code: "OR", name: "Oregon", count: 131 },
  { code: "TN", name: "Tennessee", count: 102 },
  { code: "DE", name: "Delaware", count: 100 },
  { code: "SC", name: "South Carolina", count: 81 },
  { code: "KY", name: "Kentucky", count: 77 },
  { code: "AL", name: "Alabama", count: 72 },
  { code: "NH", name: "New Hampshire", count: 65 },
  { code: "IA", name: "Iowa", count: 58 },
  { code: "DC", name: "District of Columbia", count: 50 },
  { code: "NV", name: "Nevada", count: 49 },
  { code: "RI", name: "Rhode Island", count: 47 },
  { code: "KS", name: "Kansas", count: 46 },
  { code: "NM", name: "New Mexico", count: 46 },
  { code: "LA", name: "Louisiana", count: 36 },
  { code: "MT", name: "Montana", count: 35 },
  { code: "OK", name: "Oklahoma", count: 35 },
  { code: "AR", name: "Arkansas", count: 30 },
  { code: "NE", name: "Nebraska", count: 25 },
  { code: "ME", name: "Maine", count: 23 },
  { code: "VT", name: "Vermont", count: 19 },
  { code: "HI", name: "Hawaii", count: 17 },
  { code: "SD", name: "South Dakota", count: 17 },
  { code: "WV", name: "West Virginia", count: 15 },
  { code: "WY", name: "Wyoming", count: 15 },
  { code: "MS", name: "Mississippi", count: 12 },
  { code: "PR", name: "Puerto Rico", count: 12 },
  { code: "ID", name: "Idaho", count: 9 },
  { code: "ND", name: "North Dakota", count: 8 },
  { code: "AK", name: "Alaska", count: 3 },
];

export const STATE_BY_CODE: Record<string, { code: string; name: string; count: number }> =
  Object.fromEntries(STATES.map((s) => [s.code, s]));

export const TOTAL_COMPANIES = STATES.reduce((sum, s) => sum + s.count, 0);

// company_type enum -> display label. Only the populated values matter for the beta.
export const COMPANY_TYPE_LABELS: Record<string, string> = {
  biotech_private: "Biotech",
  biotech_public: "Biotech (Public)",
  diagnostics: "Diagnostics",
  cro: "CRO",
  gene_cell_therapy: "Gene & Cell Therapy",
  tools_reagents: "Tools & Reagents",
  medtech: "Medtech",
  cdmo: "CDMO",
  foreign_subsidiary_us: "US Subsidiary",
  big_pharma: "Pharma",
  agtech_bio: "AgTech Bio",
  unknown: "Life Sciences",
};

// Multi-select filter options, ordered by how common they are in the data.
export const COMPANY_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "biotech_private", label: "Biotech" },
  { value: "biotech_public", label: "Biotech (Public)" },
  { value: "diagnostics", label: "Diagnostics" },
  { value: "cro", label: "CRO" },
  { value: "gene_cell_therapy", label: "Gene & Cell Therapy" },
  { value: "tools_reagents", label: "Tools & Reagents" },
  { value: "medtech", label: "Medtech" },
  { value: "cdmo", label: "CDMO" },
  { value: "foreign_subsidiary_us", label: "US Subsidiary" },
];

// employee_count_bucket enum -> display label, ascending.
export const SIZE_BUCKET_LABELS: Record<string, string> = {
  "1_10": "1-10",
  "11_50": "11-50",
  "51_200": "51-200",
  "201_1000": "201-1,000",
  "1001_5000": "1,001-5,000",
  "5001_plus": "5,001+",
};

export const SIZE_BUCKET_ORDER = ["1_10", "11_50", "51_200", "201_1000", "1001_5000", "5001_plus"];

export function companyTypeLabel(type: string | null): string {
  if (!type) return "Life Sciences";
  return COMPANY_TYPE_LABELS[type] ?? "Life Sciences";
}

export function sizeBucketLabel(bucket: string | null): string | null {
  if (!bucket) return null;
  const label = SIZE_BUCKET_LABELS[bucket];
  return label ? `${label} employees` : null;
}

// Source data has trailing whitespace and inconsistent casing on city. Clean for display.
export function cleanCity(city: string | null): string {
  if (!city) return "";
  const trimmed = city.trim();
  if (!trimmed) return "";
  // Title-case ALLCAPS or lowercase entries; leave mixed-case as-is.
  if (trimmed === trimmed.toUpperCase() || trimmed === trimmed.toLowerCase()) {
    return trimmed
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return trimmed;
}

export function formatUsd(n: number | null): string | null {
  if (!n || n <= 0) return null;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

// Best available size signal for a card, in priority order.
export function sizeSignal(c: {
  employee_count_bucket: string | null;
  is_public: boolean | null;
  ticker: string | null;
  sbir_total_usd: number | null;
}): string | null {
  const bucket = sizeBucketLabel(c.employee_count_bucket);
  if (bucket) return bucket;
  if (c.is_public) return c.ticker ? `Public (${c.ticker})` : "Public";
  const sbir = formatUsd(c.sbir_total_usd);
  if (sbir) return `${sbir} lifetime SBIR`;
  return null;
}
