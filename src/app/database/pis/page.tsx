"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstitutionAutocomplete from "@/components/InstitutionAutocomplete";
import { Search, ExternalLink, Mail, Phone, ChevronDown, FlaskConical, Building2, MapPin, ArrowRight } from "lucide-react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VT","VA","WA","WV","WI","WY",
];

interface PI {
  id: number;
  name: string;
  institution: string | null;
  state: string | null;
  city: string | null;
  department: string | null;
  email: string | null;
  phone: string | null;
  active_grants_count: number | null;
  faculty_profile_url: string | null;
  office_location: string | null;
  building: string | null;
  room: string | null;
  last_seen: string | null;
}

interface PiSearchResponse {
  results: PI[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface Filters {
  states: string[];
  institution: string;
  department: string;
  minGrants: string;
}

export default function PisPage() {
  const supabaseBrowser = createSupabaseBrowserClient();
  const [authState, setAuthState] = useState<"loading" | "anon" | "denied" | "ok">("loading");
  const [subscribedStates, setSubscribedStates] = useState<string[]>([]);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    states: [],
    institution: "",
    department: "",
    minGrants: "1",
  });
  const [sort, setSort] = useState<"grants_desc" | "name_asc" | "last_seen_desc">("grants_desc");
  const [results, setResults] = useState<PI[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const stateDropdownRef = useRef<HTMLDivElement>(null);
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

  // Close state dropdown on outside click
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
        const res = await fetch("/api/pi-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            filters: {
              states: filters.states.length ? filters.states : undefined,
              institution: filters.institution || undefined,
              department: filters.department || undefined,
              minGrants: filters.minGrants ? Number(filters.minGrants) : undefined,
            },
            page: p,
            sort,
            pageSize: 25,
          }),
        });
        if (res.status === 403) {
          setAuthState("denied");
          return;
        }
        const data: PiSearchResponse = await res.json();
        setResults(data.results || []);
        setTotal(data.total || 0);
        setPage(data.page || 1);
        setTotalPages(data.totalPages || 0);
      } catch {
        console.error("PI search failed");
      } finally {
        setLoading(false);
      }
    },
    [query, filters, sort]
  );

  // Debounced auto-search when filters/query/sort change
  useEffect(() => {
    if (authState !== "ok") return;
    const delay = query ? 350 : 100;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => doSearch(1), delay);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, sort, authState]);

  const goToGrants = (pi: PI) => {
    const params = new URLSearchParams({
      piId: String(pi.id),
      piName: pi.name,
      ...(pi.institution ? { piInstitution: pi.institution } : {}),
    });
    window.location.href = `/database/search?${params.toString()}`;
  };

  const toggleState = (s: string) => {
    setFilters((f) => ({
      ...f,
      states: f.states.includes(s) ? f.states.filter((x) => x !== s) : [...f.states, s],
    }));
  };

  const clearFilters = () => {
    setQuery("");
    setFilters({ states: [], institution: "", department: "", minGrants: "1" });
  };

  const visibleStates = subscribedStates.length > 0 && subscribedStates.length < 51
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
            The PI database is currently in early access for select accounts. Sign in to continue.
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
          <FlaskConical className="w-12 h-12 text-[var(--color-brand)] mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">PI Database — Early Access</h1>
          <p className="text-[var(--color-gray-500)] mb-6">
            The PI database lets you flip the question: instead of searching for grants, search for the researchers behind them.
            Filter by institution, department, and total funded grant count. We&apos;re piloting it with a small group of customers right now.
          </p>
          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            Want in? Email{" "}
            <a href="mailto:info@lableadspro.com" className="text-[var(--color-brand)] hover:underline">
              info@lableadspro.com
            </a>
            .
          </p>
          <a
            href="/database/search"
            className="inline-block px-6 py-3 bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-300)] text-[var(--color-dark)] font-semibold rounded-lg"
          >
            Back to grant search
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
        {/* Page heading */}
        <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)]">PI Database</h1>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wide">Early Access</span>
            </div>
            <p className="text-sm text-[var(--color-gray-500)]">
              Search the researchers behind the grants. Click any PI to drill into their funded grants.
            </p>
          </div>
          <a
            href="/database/search"
            className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-brand)] flex items-center gap-1"
          >
            ← Search grants instead
          </a>
        </div>

        {/* Filter row */}
        <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] p-4 mb-6">
          {/* Search input */}
          <div className="relative mb-4">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by PI name (e.g. Miao, Stewart)"
              className="w-full pl-11 pr-4 py-3 text-base rounded-xl border border-[var(--color-gray-200)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* State multi-select */}
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
                        onChange={() => toggleState(s)}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Institution */}
            <div>
              <label className="block text-xs font-semibold text-[var(--color-gray-500)] mb-1">Institution</label>
              <InstitutionAutocomplete
                value={filters.institution}
                onChange={(v) => setFilters((f) => ({ ...f, institution: v }))}
                placeholder="e.g. Duke"
                states={subscribedStates.length && subscribedStates.length < 51 ? subscribedStates : undefined}
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-[var(--color-gray-500)] mb-1">
                Department <span className="text-[var(--color-gray-400)] font-normal">(partial coverage)</span>
              </label>
              <input
                type="text"
                value={filters.department}
                onChange={(e) => setFilters((f) => ({ ...f, department: e.target.value }))}
                placeholder="e.g. Radiology"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-gray-200)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
              />
            </div>

            {/* Min grants */}
            <div>
              <label className="block text-xs font-semibold text-[var(--color-gray-500)] mb-1">Min funded grants</label>
              <input
                type="number"
                min="1"
                value={filters.minGrants}
                onChange={(e) => setFilters((f) => ({ ...f, minGrants: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-gray-200)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Sort + clear */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-gray-500)]">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="px-2 py-1 rounded border border-[var(--color-gray-200)] bg-white text-sm"
              >
                <option value="grants_desc">Most funded grants</option>
                <option value="last_seen_desc">Recently seen</option>
                <option value="name_asc">Name A–Z</option>
              </select>
            </div>
            <button
              onClick={clearFilters}
              className="text-[var(--color-gray-500)] hover:text-[var(--color-brand)]"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Results count */}
        {hasSearched && !loading && (
          <div className="mb-4 text-sm text-[var(--color-gray-500)]">
            {total.toLocaleString()} {total === 1 ? "PI" : "PIs"} matched
            {filters.states.length > 0 && ` in ${filters.states.join(", ")}`}
          </div>
        )}

        {/* Results list */}
        {loading && results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] p-12 text-center text-[var(--color-gray-500)]">
            Searching…
          </div>
        ) : results.length === 0 && hasSearched ? (
          <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] p-12 text-center">
            <p className="text-[var(--color-gray-500)] mb-2">No PIs match those filters.</p>
            <button onClick={clearFilters} className="text-sm text-[var(--color-brand)] hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((pi) => (
              <div
                key={pi.id}
                className="bg-white rounded-xl border border-[var(--color-gray-100)] p-4 md:p-5 hover:border-[var(--color-brand)] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg font-semibold text-[var(--color-dark)]">{pi.name}</h3>
                      {pi.faculty_profile_url && (
                        <a
                          href={pi.faculty_profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-green-700 hover:underline"
                          title="Faculty profile"
                        >
                          <ExternalLink size={12} /> Profile
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap text-sm text-[var(--color-gray-500)] mb-2">
                      {pi.institution && (
                        <span className="inline-flex items-center gap-1">
                          <Building2 size={14} className="text-[var(--color-gray-400)]" />
                          {pi.institution}
                        </span>
                      )}
                      {pi.department && (
                        <span className="text-[var(--color-gray-700)]">{pi.department}</span>
                      )}
                      {(pi.city || pi.state) && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={14} className="text-[var(--color-gray-400)]" />
                          {[pi.city, pi.state].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 flex-wrap text-xs text-[var(--color-gray-500)]">
                      {pi.email && (
                        <a
                          href={`mailto:${pi.email}`}
                          className="inline-flex items-center gap-1 text-[var(--color-brand)] hover:underline"
                        >
                          <Mail size={12} />
                          {pi.email}
                        </a>
                      )}
                      {pi.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone size={12} className="text-[var(--color-gray-400)]" />
                          {pi.phone}
                        </span>
                      )}
                      {pi.office_location && (
                        <span>{pi.office_location}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex md:flex-col md:items-end items-center gap-3 md:gap-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[var(--color-brand)] leading-none">
                        {pi.active_grants_count ?? 0}
                      </div>
                      <div className="text-xs text-[var(--color-gray-500)]">funded grants</div>
                    </div>
                    <button
                      onClick={() => goToGrants(pi)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white whitespace-nowrap"
                    >
                      View grants <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <button
              disabled={page === 1 || loading}
              onClick={() => doSearch(page - 1)}
              className="px-3 py-2 rounded-lg border border-[var(--color-gray-200)] bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--color-brand)]"
            >
              Previous
            </button>
            <span className="text-[var(--color-gray-500)] px-2">
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
