"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ChevronDown, ChevronUp, ExternalLink, SlidersHorizontal, X, LogOut } from "lucide-react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VT","VA","WA","WV","WI","WY",
];

const AGENCIES = [
  { value: "nih", label: "NIH" },
  { value: "nsf", label: "NSF" },
  { value: "dod", label: "DOD" },
  { value: "doe", label: "DOE" },
  { value: "nasa", label: "NASA" },
  { value: "va", label: "VA" },
  { value: "usda", label: "USDA" },
  { value: "cdc", label: "CDC" },
];

interface Grant {
  id: number;
  grant_id: string;
  source: string;
  title: string;
  abstract: string | null;
  pi_name: string | null;
  institution: string | null;
  city: string | null;
  state: string | null;
  award_amount: number | null;
  award_date: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string | null;
  agency: string | null;
  activity_code: string | null;
  fiscal_year: number | null;
  source_url: string | null;
  equipment_tags: string[] | null;
}

interface SearchResponse {
  results: Grant[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface Filters {
  states: string[];
  agencies: string[];
  dateFrom: string;
  dateTo: string;
  status: string;
  equipmentTags: string[];
  amountMin: string;
  amountMax: string;
  fiscalYear: string;
}

const defaultFilters: Filters = {
  states: [],
  agencies: [],
  dateFrom: "",
  dateTo: "",
  status: "all",
  equipmentTags: [],
  amountMin: "",
  amountMax: "",
  fiscalYear: "",
};

function formatCurrency(amount: number | null): string {
  if (!amount) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isActive(endDate: string | null): boolean {
  if (!endDate) return false;
  return new Date(endDate) >= new Date();
}

export default function DatabasePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [planTier, setPlanTier] = useState<string | null>(null);
  const [subscribedStates, setSubscribedStates] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [results, setResults] = useState<Grant[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  // Get user session and subscription
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });

    // Fetch subscription details
    fetch("/api/subscription")
      .then((res) => res.json())
      .then((data) => {
        if (data.subscribedStates) {
          setSubscribedStates(data.subscribedStates);
          setPlanTier(data.planTier);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/database/login";
  };

  // Close state dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(e.target as Node)) {
        setStateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Load initial results on page load
  const initialLoadDone = useRef(false);
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      doSearch(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced auto-search on query/filter/sort changes
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!initialLoadDone.current) return;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      doSearch(1);
    }, 400);
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, sort]);

  const doSearch = useCallback(
    async (p: number = 1) => {
      setLoading(true);
      setHasSearched(true);
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            filters: {
              ...filters,
              amountMin: filters.amountMin ? Number(filters.amountMin) : undefined,
              amountMax: filters.amountMax ? Number(filters.amountMax) : undefined,
              fiscalYear: filters.fiscalYear ? Number(filters.fiscalYear) : undefined,
              status: filters.status === "all" ? undefined : filters.status,
            },
            page: p,
            sort,
          }),
        });
        const data: SearchResponse = await res.json();
        setResults(data.results);
        setTotal(data.total);
        setPage(data.page);
        setTotalPages(data.totalPages);
      } catch {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    },
    [query, filters, sort]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(1);
  };

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleState = (st: string) => {
    setFilters((prev) => ({
      ...prev,
      states: prev.states.includes(st)
        ? prev.states.filter((s) => s !== st)
        : [...prev.states, st],
    }));
  };

  const toggleAgency = (ag: string) => {
    setFilters((prev) => ({
      ...prev,
      agencies: prev.agencies.includes(ag)
        ? prev.agencies.filter((a) => a !== ag)
        : [...prev.agencies, ag],
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const hasActiveFilters =
    filters.states.length > 0 ||
    filters.agencies.length > 0 ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.status !== "all" ||
    filters.amountMin ||
    filters.amountMax ||
    filters.fiscalYear;

  // Only show states the user is subscribed to
  const availableStates = subscribedStates.length > 0 ? subscribedStates : US_STATES;
  const filteredStates = stateSearch
    ? availableStates.filter((s) => s.toLowerCase().includes(stateSearch.toLowerCase()))
    : availableStates;

  const currentYear = new Date().getFullYear();
  const fiscalYears = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-gray-900)] uppercase tracking-wide">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-[var(--color-brand)] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* State filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          State
        </label>
        <div ref={stateDropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg bg-white hover:border-[var(--color-gray-500)] transition-colors"
          >
            <span className="text-[var(--color-gray-500)]">
              {filters.states.length
                ? `${filters.states.length} selected`
                : "All states"}
            </span>
            <ChevronDown size={16} />
          </button>
          {stateDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-[var(--color-gray-300)] rounded-lg shadow-lg max-h-60 overflow-hidden">
              <div className="p-2 border-b border-[var(--color-gray-100)]">
                <input
                  type="text"
                  placeholder="Search states..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-[var(--color-gray-300)] rounded"
                />
              </div>
              <div className="overflow-y-auto max-h-48 p-2 grid grid-cols-3 gap-1">
                {filteredStates.map((st) => (
                  <label
                    key={st}
                    className="flex items-center gap-1.5 px-1.5 py-1 text-sm rounded hover:bg-[var(--color-gray-50)] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.states.includes(st)}
                      onChange={() => toggleState(st)}
                      className="accent-[var(--color-brand)]"
                    />
                    {st}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        {filters.states.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.states.map((st) => (
              <span
                key={st}
                className="inline-flex items-center gap-1 text-xs bg-[var(--color-brand-light)] text-[var(--color-brand)] px-2 py-0.5 rounded-full"
              >
                {st}
                <button onClick={() => toggleState(st)} className="hover:text-[var(--color-brand-dark)]">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Agency filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          Agency
        </label>
        <div className="space-y-1.5">
          {AGENCIES.map((ag) => (
            <label
              key={ag.value}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.agencies.includes(ag.value)}
                onChange={() => toggleAgency(ag.value)}
                className="accent-[var(--color-brand)]"
              />
              <span className="text-[var(--color-gray-700)]">{ag.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date range */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          Award Date
        </label>
        <div className="space-y-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
            }
            className="w-full px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg"
            placeholder="From"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
            }
            className="w-full px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg"
            placeholder="To"
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
          className="w-full px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg bg-white"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Award Amount */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          Award Amount
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.amountMin}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, amountMin: e.target.value }))
            }
            className="w-full px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.amountMax}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, amountMax: e.target.value }))
            }
            className="w-full px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg"
          />
        </div>
      </div>

      {/* Fiscal Year */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          Fiscal Year
        </label>
        <select
          value={filters.fiscalYear}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, fiscalYear: e.target.value }))
          }
          className="w-full px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg bg-white"
        >
          <option value="">All years</option>
          {fiscalYears.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Apply button (mobile) */}
      <button
        onClick={() => {
          setMobileFiltersOpen(false);
          doSearch(1);
        }}
        className="w-full md:hidden text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-5 py-2.5 rounded-lg transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-gray-50)] pt-16">
        {/* Hero / Search Bar */}
        <section className="bg-white border-b border-[var(--color-gray-100)]">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-gray-900)]">
                  Grant Database
                </h1>
                <p className="text-[var(--color-gray-500)] mt-1">
                  Search {total > 0 ? total.toLocaleString() : "74,000+"} federally funded research grants
                </p>
              </div>
              {userEmail && (
                <div className="flex items-center gap-3 shrink-0">
                  {planTier && (
                    <span className="text-xs font-medium bg-[var(--color-brand-light)] text-[var(--color-brand)] px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
                      {planTier.charAt(0).toUpperCase() + planTier.slice(1)} · {subscribedStates.join(", ")}
                    </span>
                  )}
                  <span className="text-sm text-[var(--color-gray-500)] hidden md:inline">
                    {userEmail}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--color-gray-300)] hover:border-[var(--color-gray-500)]"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
            <form onSubmit={handleSearch} className="flex gap-3 mt-6">
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gray-500)]"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search grants by title, PI name, institution, or keyword..."
                  className="w-full pl-12 pr-4 py-3.5 text-base border border-[var(--color-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-shadow"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 text-base font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] rounded-xl transition-colors disabled:opacity-50 shrink-0"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-[var(--color-gray-100)] p-5">
                <FilterSidebar />
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[var(--color-brand)] text-white rounded-full shadow-lg hover:bg-[var(--color-brand-dark)] transition-colors"
            >
              <SlidersHorizontal size={18} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-white rounded-full" />
              )}
            </button>

            {/* Mobile Filter Drawer */}
            {mobileFiltersOpen && (
              <div className="md:hidden fixed inset-0 z-50">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-1"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            )}

            {/* Results */}
            <div className="flex-1 min-w-0">
              {hasSearched && (
                <>
                  {/* Results header */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-[var(--color-gray-500)]">
                      {loading
                        ? "Searching..."
                        : `${total.toLocaleString()} result${total !== 1 ? "s" : ""} found`}
                    </p>
                    <select
                      value={sort}
                      onChange={(e) => {
                        setSort(e.target.value);
                      }}
                      className="text-sm border border-[var(--color-gray-300)] rounded-lg px-3 py-1.5 bg-white"
                    >
                      <option value="relevance">Sort: Relevance</option>
                      <option value="date">Sort: Newest</option>
                      <option value="amount">Sort: Highest Award</option>
                    </select>
                  </div>

                  {/* Result cards */}
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-xl border border-[var(--color-gray-100)] p-6 animate-pulse"
                        >
                          <div className="h-5 bg-[var(--color-gray-100)] rounded w-3/4 mb-3" />
                          <div className="h-4 bg-[var(--color-gray-100)] rounded w-1/2 mb-2" />
                          <div className="h-4 bg-[var(--color-gray-100)] rounded w-1/3" />
                        </div>
                      ))}
                    </div>
                  ) : results.length === 0 ? (
                    <div className="bg-white rounded-xl border border-[var(--color-gray-100)] p-12 text-center">
                      <p className="text-[var(--color-gray-500)] text-lg">
                        No grants found. Try broadening your search.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {results.map((grant) => {
                        const expanded = expandedIds.has(grant.id);
                        const active = isActive(grant.end_date);
                        return (
                          <div
                            key={grant.id}
                            className="bg-white rounded-xl border border-[var(--color-gray-100)] p-6 hover:shadow-md transition-shadow"
                          >
                            {/* Title */}
                            <button
                              onClick={() => toggleExpanded(grant.id)}
                              className="text-left w-full group"
                            >
                              <h3 className="text-base font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">
                                {grant.title}
                              </h3>
                            </button>

                            {/* PI & Institution */}
                            <p className="text-sm text-[var(--color-gray-500)] mt-2">
                              {[grant.pi_name, grant.institution, [grant.city, grant.state].filter(Boolean).join(", ")].filter(Boolean).join(" | ")}
                            </p>

                            {/* Badges row */}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              {grant.source && (
                                <span className="inline-flex items-center text-xs font-medium bg-[var(--color-brand-light)] text-[var(--color-brand)] px-2.5 py-1 rounded-full uppercase">
                                  {grant.source}
                                </span>
                              )}
                              {grant.activity_code && (
                                <span className="inline-flex items-center text-xs font-medium bg-[var(--color-gray-100)] text-[var(--color-gray-700)] px-2.5 py-1 rounded-full">
                                  {grant.activity_code}
                                </span>
                              )}
                              {grant.award_amount && (
                                <span className="text-sm font-medium text-[var(--color-gray-900)]">
                                  {formatCurrency(grant.award_amount)}
                                </span>
                              )}
                              <span className="text-xs text-[var(--color-gray-500)]">
                                {formatDate(grant.award_date)}
                              </span>
                              {grant.end_date && (
                                <span
                                  className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
                                    active
                                      ? "bg-green-50 text-green-700"
                                      : "bg-[var(--color-gray-100)] text-[var(--color-gray-500)]"
                                  }`}
                                >
                                  {active ? "Active" : "Completed"}
                                </span>
                              )}
                            </div>

                            {/* Equipment tags */}
                            {grant.equipment_tags && grant.equipment_tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {grant.equipment_tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Abstract */}
                            {grant.abstract && (
                              <div className="mt-3">
                                <p className="text-sm text-[var(--color-gray-500)] leading-relaxed">
                                  {expanded
                                    ? grant.abstract
                                    : grant.abstract.slice(0, 200) +
                                      (grant.abstract.length > 200 ? "..." : "")}
                                </p>
                                {grant.abstract.length > 200 && (
                                  <button
                                    onClick={() => toggleExpanded(grant.id)}
                                    className="text-sm text-[var(--color-brand)] hover:underline mt-1 inline-flex items-center gap-1"
                                  >
                                    {expanded ? (
                                      <>
                                        Show less <ChevronUp size={14} />
                                      </>
                                    ) : (
                                      <>
                                        Read more <ChevronDown size={14} />
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Source link */}
                            {grant.source_url && (
                              <a
                                href={grant.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-[var(--color-brand)] hover:underline mt-3"
                              >
                                View source <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => doSearch(page - 1)}
                        disabled={page <= 1 || loading}
                        className="px-4 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg hover:bg-[var(--color-gray-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-[var(--color-gray-500)] px-4">
                        Page {page} of {totalPages.toLocaleString()}
                      </span>
                      <button
                        onClick={() => doSearch(page + 1)}
                        disabled={page >= totalPages || loading}
                        className="px-4 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg hover:bg-[var(--color-gray-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Initial state */}
              {!hasSearched && (
                <div className="bg-white rounded-xl border border-[var(--color-gray-100)] p-12 text-center">
                  <Search size={48} className="mx-auto text-[var(--color-gray-300)] mb-4" />
                  <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-2">
                    Search federally funded grants
                  </h2>
                  <p className="text-[var(--color-gray-500)] max-w-md mx-auto">
                    Enter a keyword, PI name, institution, or research topic above to explore our database of 74,000+ grants from NIH, NSF, DOD, and more.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
