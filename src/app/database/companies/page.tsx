"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModeToggle from "@/components/SearchModeToggle";
import {
  ExternalLink,
  Linkedin,
  MapPin,
  ChevronDown,
  Building2,
} from "lucide-react";
import {
  CompanyBeta,
  COMPANY_TYPE_OPTIONS,
  SIZE_BUCKET_ORDER,
  SIZE_BUCKET_LABELS,
  companyTypeLabel,
  cleanCity,
  sizeSignal,
} from "@/lib/companies";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VT","VA","WA","WV","WI","WY",
];

type SortKey = "name" | "size" | "recent_sbir";

interface Filters {
  states: string[];
  companyTypes: string[];
  sizes: string[];
  publicOnly: boolean;
  hasSbir: boolean;
  hasNih: boolean;
}

const PAGE_SIZE = 60;

export default function CompaniesDatabasePage() {
  const supabaseBrowser = createSupabaseBrowserClient();
  const [authState, setAuthState] = useState<"loading" | "anon" | "denied" | "ok">("loading");
  const [subscribedStates, setSubscribedStates] = useState<string[]>([]);

  const [filters, setFilters] = useState<Filters>({
    states: [],
    companyTypes: [],
    sizes: [],
    publicOnly: false,
    hasSbir: false,
    hasNih: false,
  });
  const [sort, setSort] = useState<SortKey>("name");
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  const [results, setResults] = useState<CompanyBeta[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auth bootstrap + subscription state load
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabaseBrowser.auth.getSession();
      if (!session) {
        setAuthState("anon");
        return;
      }
      try {
        const res = await fetch("/api/subscription");
        if (!res.ok) {
          setAuthState("denied");
          return;
        }
        const sub = await res.json();
        setSubscribedStates(sub.subscribedStates || []);
        setAuthState("ok");
      } catch {
        setAuthState("denied");
      }
    })();
  }, [supabaseBrowser]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(e.target as Node)) {
        setStateDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const doSearch = useCallback(
    async (p: number = 1) => {
      setLoading(true);
      setHasSearched(true);
      try {
        const res = await fetch("/api/companies-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filters: {
              states: filters.states.length ? filters.states : undefined,
              companyTypes: filters.companyTypes.length ? filters.companyTypes : undefined,
              sizes: filters.sizes.length ? filters.sizes : undefined,
              publicOnly: filters.publicOnly || undefined,
              hasSbir: filters.hasSbir || undefined,
              hasNih: filters.hasNih || undefined,
            },
            page: p,
            sort,
            pageSize: PAGE_SIZE,
          }),
        });
        if (res.status === 401 || res.status === 403) {
          setAuthState("denied");
          return;
        }
        const data = await res.json();
        setResults(data.results || []);
        setTotal(data.total || 0);
        setPage(data.page || 1);
        setTotalPages(data.totalPages || 0);
      } catch {
        console.error("Companies search failed");
      } finally {
        setLoading(false);
      }
    },
    [filters, sort]
  );

  // Debounced auto-search
  useEffect(() => {
    if (authState !== "ok") return;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => doSearch(1), 100);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, authState]);

  const toggleIn = (key: "states" | "companyTypes" | "sizes", value: string) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value],
    }));
  };

  const clearFilters = () =>
    setFilters({ states: [], companyTypes: [], sizes: [], publicOnly: false, hasSbir: false, hasNih: false });

  const visibleStates =
    subscribedStates.length > 0 && subscribedStates.length < 51
      ? US_STATES.filter((s) => subscribedStates.includes(s))
      : US_STATES;

  if (authState === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-gray-500)]">Loading…</p>
      </main>
    );
  }

  if (authState === "anon") {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in required</h1>
          <p className="text-[var(--color-gray-500)] mb-6">
            Sign in to access the company directory.
          </p>
          <a
            href="/database/login"
            className="inline-block px-6 py-3 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold rounded-lg"
          >
            Sign in
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  if (authState === "denied") {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Active subscription required</h1>
          <p className="text-[var(--color-gray-500)] mb-6">
            The company directory is included with every Lab Leads Pro subscription. Subscribe to
            browse biotech and pharma companies in your territory.
          </p>
          <a
            href="/#pricing"
            className="inline-block px-6 py-3 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold rounded-lg"
          >
            See pricing
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-gray-50)]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12">
        {/* Mode toggle */}
        <div className="mb-4">
          <SearchModeToggle active="companies" />
        </div>

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)] mb-1">
            Company Directory
          </h1>
          <p className="text-sm text-[var(--color-gray-500)]">
            Biotech, pharma, CRO, and diagnostics companies in your territory. The private-sector
            side of your pipeline.
          </p>
        </div>

        {/* Filter row */}
        <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* State multi-select (limited to subscription) */}
            <div ref={stateDropdownRef} className="relative">
              <label className="block text-xs font-semibold text-[var(--color-gray-500)] mb-1">States</label>
              <button
                type="button"
                onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                className="w-full px-3 py-2 text-sm text-left rounded-lg border border-[var(--color-gray-200)] bg-white flex items-center justify-between"
              >
                <span className="truncate">
                  {filters.states.length === 0 ? "All my states" : filters.states.join(", ")}
                </span>
                <ChevronDown className="w-4 h-4 flex-shrink-0 text-[var(--color-gray-400)]" />
              </button>
              {stateDropdownOpen && (
                <div className="absolute z-30 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-[var(--color-gray-200)] rounded-lg shadow-lg">
                  {visibleStates.map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-[var(--color-gray-50)] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.states.includes(s)}
                        onChange={() => toggleIn("states", s)}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Sort */}
            <div>
              <label className="block text-xs font-semibold text-[var(--color-gray-500)] mb-1">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-gray-200)] bg-white"
              >
                <option value="name">Name (A-Z)</option>
                <option value="size">Size (largest first)</option>
                <option value="recent_sbir">Most recent SBIR award</option>
              </select>
            </div>

            {/* Clear */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-brand)] py-2"
              >
                Clear filters
              </button>
            </div>
          </div>

          {/* Company type chips */}
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-gray-500)] mb-2">
              Company type
            </p>
            <div className="flex flex-wrap gap-2">
              {COMPANY_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => toggleIn("companyTypes", opt.value)}
                  className={`text-sm rounded-full px-3 py-1.5 border transition-colors ${
                    filters.companyTypes.includes(opt.value)
                      ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                      : "bg-white text-[var(--color-gray-700)] border-[var(--color-gray-300)] hover:border-[var(--color-brand)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size + signal toggles */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {SIZE_BUCKET_ORDER.map((b) => (
              <button
                key={b}
                onClick={() => toggleIn("sizes", b)}
                className={`text-sm rounded-full px-3 py-1.5 border transition-colors ${
                  filters.sizes.includes(b)
                    ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                    : "bg-white text-[var(--color-gray-700)] border-[var(--color-gray-300)] hover:border-[var(--color-brand)]"
                }`}
              >
                {SIZE_BUCKET_LABELS[b]}
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-[var(--color-gray-200)]" />
            {[
              { key: "publicOnly" as const, label: "Public" },
              { key: "hasSbir" as const, label: "Has SBIR" },
              { key: "hasNih" as const, label: "Has NIH" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setFilters((f) => ({ ...f, [t.key]: !f[t.key] }))}
                className={`text-sm rounded-full px-3 py-1.5 border transition-colors ${
                  filters[t.key]
                    ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                    : "bg-white text-[var(--color-gray-700)] border-[var(--color-gray-300)] hover:border-[var(--color-brand)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {hasSearched && !loading && (
          <div className="mb-4 text-sm text-[var(--color-gray-500)]">
            {total.toLocaleString()} {total === 1 ? "company" : "companies"} matched
            {filters.states.length > 0 && ` in ${filters.states.join(", ")}`}
          </div>
        )}

        {/* Results */}
        {loading && results.length === 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--color-gray-100)] p-5 h-40 animate-pulse bg-white"
              />
            ))}
          </div>
        ) : results.length === 0 && hasSearched ? (
          <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] p-12 text-center">
            <p className="text-[var(--color-gray-500)] mb-2">No companies match those filters.</p>
            <button onClick={clearFilters} className="text-sm text-[var(--color-brand)] hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((c) => (
              <CompanyCard key={c.id} c={c} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2 text-sm">
            <button
              disabled={page === 1 || loading}
              onClick={() => doSearch(page - 1)}
              className="px-3 py-2 rounded-lg border border-[var(--color-gray-200)] bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--color-brand)]"
            >
              Previous
            </button>
            <span className="text-[var(--color-gray-500)] px-2 tabular-nums">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages || loading}
              onClick={() => doSearch(page + 1)}
              className="px-3 py-2 rounded-lg border border-[var(--color-gray-200)] bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--color-brand)]"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

function CompanyCard({ c }: { c: CompanyBeta }) {
  const city = cleanCity(c.primary_city);
  const size = sizeSignal(c);
  const location = [c.primary_street?.trim(), city, c.primary_state].filter(Boolean).join(", ");

  return (
    <div className="group rounded-2xl border border-[var(--color-gray-100)] bg-white p-5 hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-[var(--color-dark)] leading-snug flex items-start gap-1.5">
          <Building2 className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gray-400)]" />
          {c.name}
        </h3>
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
