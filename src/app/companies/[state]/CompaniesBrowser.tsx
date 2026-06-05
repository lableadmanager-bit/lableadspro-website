"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { ExternalLink, Linkedin, MapPin, ChevronLeft, SlidersHorizontal, X } from "lucide-react";
import {
  CompanyBeta,
  COMPANY_TYPE_OPTIONS,
  SIZE_BUCKET_ORDER,
  SIZE_BUCKET_LABELS,
  companyTypeLabel,
  cleanCity,
  sizeSignal,
} from "@/lib/companies";

type SortKey = "name" | "size" | "recent_sbir";

const PAGE_SIZE = 60;

const VIEW_COLUMNS =
  "id,name,website,linkedin_url,company_type,is_public,ticker,employee_count_bucket,sbir_total_usd,sbir_latest_award_year,sbir_award_count,nih_grant_count,primary_city,primary_street,total_sites,description";

export default function CompaniesBrowser({
  stateCode,
  stateName,
  seedCount,
}: {
  stateCode: string;
  stateName: string;
  seedCount: number;
}) {
  const [companies, setCompanies] = useState<CompanyBeta[]>([]);
  const [total, setTotal] = useState<number>(seedCount);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [types, setTypes] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [publicOnly, setPublicOnly] = useState(false);
  const [hasSbir, setHasSbir] = useState(false);
  const [hasNih, setHasNih] = useState(false);
  const [sort, setSort] = useState<SortKey>("name");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const activeFilterCount =
    types.length + sizes.length + (publicOnly ? 1 : 0) + (hasSbir ? 1 : 0) + (hasNih ? 1 : 0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    let q = supabase
      .from("v_companies_beta")
      .select(VIEW_COLUMNS, { count: "exact" })
      .eq("primary_state", stateCode);

    if (types.length) q = q.in("company_type", types);
    if (sizes.length) q = q.in("employee_count_bucket", sizes);
    if (publicOnly) q = q.eq("is_public", true);
    if (hasSbir) q = q.gt("sbir_award_count", 0);
    if (hasNih) q = q.gt("nih_grant_count", 0);

    if (sort === "name") q = q.order("name", { ascending: true });
    else if (sort === "size")
      q = q.order("employee_count_bucket", { ascending: false, nullsFirst: false });
    else if (sort === "recent_sbir")
      q = q.order("sbir_latest_award_year", { ascending: false, nullsFirst: false });

    q = q.range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    const { data, error, count } = await q;
    if (error) {
      setError("Could not load companies. Please try again.");
      setCompanies([]);
    } else {
      setCompanies((data as CompanyBeta[]) ?? []);
      if (typeof count === "number") setTotal(count);
    }
    setLoading(false);
  }, [supabase, stateCode, types, sizes, publicOnly, hasSbir, hasNih, sort, page]);

  useEffect(() => {
    load();
  }, [load]);

  // Reset to first page whenever a filter or sort changes.
  useEffect(() => {
    setPage(0);
  }, [types, sizes, publicOnly, hasSbir, hasNih, sort]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearAll = () => {
    setTypes([]);
    setSizes([]);
    setPublicOnly(false);
    setHasSbir(false);
    setHasNih(false);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="min-h-screen bg-white">
      {/* Header band */}
      <section className="pt-24 pb-6 px-6 bg-gradient-to-b from-[#f0f7ff] to-white">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/companies"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand)] hover:underline mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            All states
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)] tracking-tight">
            {stateName} Companies
          </h1>
          <p className="text-[var(--color-gray-500)] mt-2">
            {loading ? "Loading…" : `${total.toLocaleString()} active life-science companies`}
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="px-6 sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-[var(--color-gray-100)]">
        <div className="max-w-5xl mx-auto py-3 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gray-700)] border border-[var(--color-gray-300)] rounded-lg px-3 py-2 hover:border-[var(--color-brand)] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 text-xs font-bold text-white bg-[var(--color-brand)] rounded-full px-1.5 py-0.5">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-sm text-[var(--color-gray-700)] border border-[var(--color-gray-300)] rounded-lg px-3 py-2 bg-white focus:border-[var(--color-brand)] outline-none"
          >
            <option value="name">Sort: Name (A-Z)</option>
            <option value="size">Sort: Size (largest first)</option>
            <option value="recent_sbir">Sort: Most recent SBIR award</option>
          </select>

          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-sm text-[var(--color-gray-500)] hover:text-[var(--color-dark)]"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="max-w-5xl mx-auto pb-5 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)] mb-2">
                Company type
              </p>
              <div className="flex flex-wrap gap-2">
                {COMPANY_TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggle(types, setTypes, opt.value)}
                    className={`text-sm rounded-full px-3 py-1.5 border transition-colors ${
                      types.includes(opt.value)
                        ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                        : "bg-white text-[var(--color-gray-700)] border-[var(--color-gray-300)] hover:border-[var(--color-brand)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)] mb-2">
                Company size
              </p>
              <div className="flex flex-wrap gap-2">
                {SIZE_BUCKET_ORDER.map((b) => (
                  <button
                    key={b}
                    onClick={() => toggle(sizes, setSizes, b)}
                    className={`text-sm rounded-full px-3 py-1.5 border transition-colors ${
                      sizes.includes(b)
                        ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                        : "bg-white text-[var(--color-gray-700)] border-[var(--color-gray-300)] hover:border-[var(--color-brand)]"
                    }`}
                  >
                    {SIZE_BUCKET_LABELS[b]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { on: publicOnly, set: () => setPublicOnly((v) => !v), label: "Public companies" },
                { on: hasSbir, set: () => setHasSbir((v) => !v), label: "Has SBIR funding" },
                { on: hasNih, set: () => setHasNih((v) => !v), label: "Has NIH grants" },
              ].map((t) => (
                <button
                  key={t.label}
                  onClick={t.set}
                  className={`text-sm rounded-full px-3 py-1.5 border transition-colors ${
                    t.on
                      ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                      : "bg-white text-[var(--color-gray-700)] border-[var(--color-gray-300)] hover:border-[var(--color-brand)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Results */}
      <section className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {error && (
            <div className="text-center py-16 text-[var(--color-gray-500)]">{error}</div>
          )}

          {!error && loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--color-gray-100)] p-5 h-40 animate-pulse bg-[var(--color-gray-50)]"
                />
              ))}
            </div>
          )}

          {!error && !loading && companies.length === 0 && (
            <div className="text-center py-16 text-[var(--color-gray-500)]">
              No companies match these filters. Try clearing a few.
            </div>
          )}

          {!error && !loading && companies.length > 0 && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map((c) => (
                  <CompanyCard key={c.id} c={c} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className="text-sm font-medium px-4 py-2 rounded-lg border border-[var(--color-gray-300)] disabled:opacity-40 hover:border-[var(--color-brand)] transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-[var(--color-gray-500)] tabular-nums">
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="text-sm font-medium px-4 py-2 rounded-lg border border-[var(--color-gray-300)] disabled:opacity-40 hover:border-[var(--color-brand)] transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function CompanyCard({ c }: { c: CompanyBeta }) {
  const city = cleanCity(c.primary_city);
  const size = sizeSignal(c);
  const locationParts = [c.primary_street?.trim(), city].filter(Boolean);
  const location = locationParts.join(", ");

  return (
    <div className="group rounded-2xl border border-[var(--color-gray-100)] bg-white p-5 hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-[var(--color-dark)] leading-snug">{c.name}</h3>
        {c.is_public && c.ticker && (
          <span className="shrink-0 text-xs font-semibold text-[var(--color-brand)] bg-[var(--color-brand-light)] rounded px-1.5 py-0.5">
            {c.ticker}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-xs font-medium text-[var(--color-gray-700)] bg-[var(--color-gray-50)] border border-[var(--color-gray-100)] rounded-full px-2 py-0.5">
          {companyTypeLabel(c.company_type)}
        </span>
        {size && (
          <span className="text-xs font-medium text-[var(--color-gray-700)] bg-[var(--color-gray-50)] border border-[var(--color-gray-100)] rounded-full px-2 py-0.5">
            {size}
          </span>
        )}
      </div>

      {location && (
        <p className="flex items-start gap-1.5 text-sm text-[var(--color-gray-500)] mb-2">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{location}</span>
        </p>
      )}

      {c.description && (
        <p className="text-sm text-[var(--color-gray-500)] line-clamp-2 mb-3">{c.description}</p>
      )}

      <div className="mt-auto flex items-center gap-3 pt-2">
        {c.website && (
          <a
            href={c.website.startsWith("http") ? c.website : `https://${c.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand)] hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Website
          </a>
        )}
        {c.linkedin_url && (
          <a
            href={c.linkedin_url.startsWith("http") ? c.linkedin_url : `https://${c.linkedin_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand)] hover:underline"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
