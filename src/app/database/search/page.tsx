"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ChevronDown, ChevronUp, ExternalLink, SlidersHorizontal, X, LogOut, Mail, Star, LayoutGrid, Table, Download } from "lucide-react";

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

const NIH_INSTITUTES = [
  { abbr: "NCI", fullName: "National Cancer Institute" },
  { abbr: "NIGMS", fullName: "National Institute of General Medical Sciences" },
  { abbr: "NIAID", fullName: "National Institute of Allergy and Infectious Diseases" },
  { abbr: "NHLBI", fullName: "National Heart Lung and Blood Institute" },
  { abbr: "NIA", fullName: "National Institute on Aging" },
  { abbr: "NINDS", fullName: "National Institute of Neurological Disorders and Stroke" },
  { abbr: "NIDDK", fullName: "National Institute of Diabetes and Digestive and Kidney Diseases" },
  { abbr: "NIMH", fullName: "National Institute of Mental Health" },
  { abbr: "NICHD", fullName: "Eunice Kennedy Shriver National Institute of Child Health and Human Development" },
  { abbr: "NIDA", fullName: "National Institute on Drug Abuse" },
  { abbr: "NEI", fullName: "National Eye Institute" },
  { abbr: "NIAMS", fullName: "National Institute of Arthritis and Musculoskeletal and Skin Diseases" },
  { abbr: "NIAAA", fullName: "National Institute on Alcohol Abuse and Alcoholism" },
  { abbr: "NIDCD", fullName: "National Institute on Deafness and Other Communication Disorders" },
  { abbr: "NIEHS", fullName: "National Institute of Environmental Health Sciences" },
  { abbr: "NIDCR", fullName: "National Institute of Dental and Craniofacial Research" },
  { abbr: "NIBIB", fullName: "National Institute of Biomedical Imaging and Bioengineering" },
  { abbr: "NHGRI", fullName: "National Human Genome Research Institute" },
  { abbr: "NIMHD", fullName: "National Institute on Minority Health and Health Disparities" },
  { abbr: "NCATS", fullName: "National Center for Advancing Translational Sciences" },
  { abbr: "NLM", fullName: "National Library of Medicine" },
  { abbr: "OD", fullName: "NIH Office of the Director" },
  { abbr: "VA", fullName: "VA Medical Centers" },
];

const ACTIVITY_CODES = [
  "R00","R01","R21","R03","R15","R35","R43","R44",
  "U01","U19","U54",
  "P01","P30","P50",
  "K01","K08","K23","K99",
  "DP2",
  "F31","F32","T32",
  "UG3","UH3",
];

interface Grant {
  id: number;
  grant_id: string;
  source: string;
  title: string;
  abstract: string | null;
  pi_name: string | null;
  pi_email: string | null;
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
  department: string | null;
  pis: { email: string | null; phone: string | null; department: string | null; office_location: string | null; building: string | null; room: string | null; faculty_profile_url: string | null; r1_faculty: Array<{ profile_url: string | null; title: string | null; rank: string | null; full_name: string | null; r1_universities: { name: string } | null }> | null } | null;
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
  nihInstitutes: string[];
  activityCodes: string[];
  institution: string;
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
  agencies: ["nih", "nsf", "dod", "doe", "nasa", "va", "usda", "cdc"],
  nihInstitutes: [],
  activityCodes: [],
  institution: "",
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
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false);
  const [agencySearch, setAgencySearch] = useState("");
  const [nihExpanded, setNihExpanded] = useState(false);
  const agencyDropdownRef = useRef<HTMLDivElement>(null);
  const [activityDropdownOpen, setActivityDropdownOpen] = useState(false);
  const [activitySearch, setActivitySearch] = useState("");
  const activityDropdownRef = useRef<HTMLDivElement>(null);
  const [activePiFilter, setActivePiFilter] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [togglingFav, setTogglingFav] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Get user session and subscription
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });

    // Fetch subscription details and pre-select subscribed states
    fetch("/api/subscription")
      .then((res) => res.json())
      .then((data) => {
        if (data.subscribedStates) {
          setSubscribedStates(data.subscribedStates);
          setPlanTier(data.planTier);
          // Auto-select the user's subscribed states so they see their territory by default
          if (data.subscribedStates.length > 0 && data.subscribedStates.length < 51) {
            setFilters((prev) => ({
              ...prev,
              states: prev.states.length === 0 ? data.subscribedStates : prev.states,
            }));
          }
        }
      })
      .catch(() => {});

    // Fetch user's favorites
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (data.favorites) {
          setFavoriteIds(new Set(data.favorites.map((f: { grant_id: string }) => f.grant_id)));
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/database/login";
  };

  const handleManageSubscription = async () => {
    try {
      const supabase = createSupabaseBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/database/login";
        return;
      }
      const res = await fetch("/api/billing-portal", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
        },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to open billing portal. Please contact support@lableadspro.com");
      }
    } catch {
      alert("Unable to open billing portal. Please contact support@lableadspro.com");
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(e.target as Node)) {
        setStateDropdownOpen(false);
      }
      if (agencyDropdownRef.current && !agencyDropdownRef.current.contains(e.target as Node)) {
        setAgencyDropdownOpen(false);
      }
      if (activityDropdownRef.current && !activityDropdownRef.current.contains(e.target as Node)) {
        setActivityDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Track whether user has interacted (don't auto-search on mount)
  const userHasInteracted = useRef(false);
  const initialLoadDone = useRef(false);
  useEffect(() => {
    initialLoadDone.current = true;
  }, []);

  // Debounced auto-search on query/filter/sort changes (only after user interaction)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!userHasInteracted.current) return;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    // Longer debounce for typed fields (query, institution), shorter for toggles
    const hasTypedInput = query.trim().length > 0 || filters.institution.length > 0;
    const delay = hasTypedInput ? 1200 : 400;
    searchTimeoutRef.current = setTimeout(() => {
      doSearch(1);
    }, delay);
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, sort, activePiFilter, favoritesOnly]);

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
              activityCodes: filters.activityCodes.length ? filters.activityCodes : undefined,
              nihInstitutes: filters.nihInstitutes.length ? filters.nihInstitutes : undefined,
              institution: filters.institution || undefined,
              piName: activePiFilter || undefined,
            },
            page: p,
            sort,
            favoriteGrantIds: favoritesOnly ? Array.from(favoriteIds) : undefined,
          }),
        });
        const data: SearchResponse = await res.json();
        setResults(data.results || []);
        setTotal(data.total || 0);
        setPage(data.page || 1);
        setTotalPages(data.totalPages || 0);
      } catch {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    },
    [query, filters, sort, activePiFilter, favoritesOnly, favoriteIds]
  );

  const exportFavoritesCSV = () => {
    if (results.length === 0) return;
    // Export up to 500 (matches favorites cap)
    const maxExport = 500;
    const headers = ["PI Name", "Email", "Phone", "Department", "Building", "Room", "Institution", "State", "Grant Title", "Agency", "Award Amount", "Award Date", "Equipment Tags", "Grant ID"];
    const exportResults = results.slice(0, maxExport);
    const csvQuote = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const rows = exportResults.map((g) => [
      csvQuote(g.pi_name || ""),
      csvQuote(g.pis?.email || g.pi_email || ""),
      csvQuote(g.pis?.phone || ""),
      csvQuote(g.pis?.department || ""),
      csvQuote(g.pis?.building || ""),
      csvQuote(g.pis?.room || ""),
      csvQuote(g.institution || ""),
      csvQuote(g.state || ""),
      csvQuote(g.title || ""),
      csvQuote((g.source || "").toUpperCase()),
      csvQuote(g.award_amount ? formatCurrency(g.award_amount) : ""),
      csvQuote(g.award_date || ""),
      csvQuote((g.equipment_tags || []).join("; ")),
      csvQuote(g.grant_id || ""),
    ]);
    const csv = [headers.map(csvQuote).join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lab-leads-pro-favorites-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleFavorite = async (grantId: string) => {
    setTogglingFav((prev) => new Set(prev).add(grantId));
    const isFav = favoriteIds.has(grantId);
    try {
      const res = await fetch("/api/favorites", {
        method: isFav ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grantId }),
      });
      if (res.ok) {
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          if (isFav) next.delete(grantId);
          else next.add(grantId);
          return next;
        });
      }
    } catch {
      console.error("Failed to toggle favorite");
    } finally {
      setTogglingFav((prev) => {
        const next = new Set(prev);
        next.delete(grantId);
        return next;
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    userHasInteracted.current = true;
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
    userHasInteracted.current = true;
    setFilters((prev) => ({
      ...prev,
      states: prev.states.includes(st)
        ? prev.states.filter((s) => s !== st)
        : [...prev.states, st],
    }));
  };

  const toggleAgency = (ag: string) => {
    userHasInteracted.current = true;
    setFilters((prev) => {
      const removing = prev.agencies.includes(ag);
      let nihInstitutes = prev.nihInstitutes;
      
      // Clear NIH institutes when NIH is unchecked
      if (ag === "nih" && removing) {
        nihInstitutes = [];
      }
      // Sync VA agency checkbox with VA Medical Centers NIH sub-institute
      if (ag === "va") {
        if (removing) {
          nihInstitutes = nihInstitutes.filter((n) => n !== "VA Medical Centers");
        } else {
          if (!nihInstitutes.includes("VA Medical Centers")) {
            nihInstitutes = [...nihInstitutes, "VA Medical Centers"];
          }
        }
      }
      
      return {
        ...prev,
        agencies: removing
          ? prev.agencies.filter((a) => a !== ag)
          : [...prev.agencies, ag],
        nihInstitutes,
      };
    });
  };

  const toggleNihInstitute = (fullName: string) => {
    setFilters((prev) => ({
      ...prev,
      nihInstitutes: prev.nihInstitutes.includes(fullName)
        ? prev.nihInstitutes.filter((n) => n !== fullName)
        : [...prev.nihInstitutes, fullName],
    }));
  };

  const toggleActivityCode = (code: string) => {
    userHasInteracted.current = true;
    setFilters((prev) => ({
      ...prev,
      activityCodes: prev.activityCodes.includes(code)
        ? prev.activityCodes.filter((c) => c !== code)
        : [...prev.activityCodes, code],
    }));
  };

  const clearFilters = () => {
    setFilters({
      ...defaultFilters,
      // Keep subscribed states pre-selected after clearing
      states: subscribedStates.length > 0 && subscribedStates.length < 51 ? subscribedStates : [],
    });
    setActivePiFilter(null);
  };

  const hasActiveFilters =
    filters.states.length > 0 ||
    filters.agencies.length > 0 ||
    filters.nihInstitutes.length > 0 ||
    filters.activityCodes.length > 0 ||
    filters.institution ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.status !== "all" ||
    filters.amountMin ||
    filters.amountMax ||
    filters.fiscalYear ||
    filters.equipmentTags.length > 0;

  // Only show states the user is subscribed to
  const availableStates = subscribedStates.length > 0 ? subscribedStates : US_STATES;
  const filteredStates = stateSearch
    ? availableStates.filter((s) => s.toLowerCase().includes(stateSearch.toLowerCase()))
    : availableStates;

  const filteredAgencies = agencySearch
    ? AGENCIES.filter((a) => a.label.toLowerCase().includes(agencySearch.toLowerCase()))
    : AGENCIES;

  const filteredActivityCodes = activitySearch
    ? ACTIVITY_CODES.filter((c) => c.toLowerCase().includes(activitySearch.toLowerCase()))
    : ACTIVITY_CODES;

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

      {/* Institution filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          Institution
        </label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)]" />
          <input
            type="text"
            placeholder="Filter by institution..."
            defaultValue={filters.institution}
            key={filters.institution === "" ? "inst-cleared" : undefined}
            onBlur={(e) => {
              userHasInteracted.current = true;
              setFilters((prev) => ({ ...prev, institution: e.target.value }));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                userHasInteracted.current = true;
                setFilters((prev) => ({ ...prev, institution: (e.target as HTMLInputElement).value }));
              }
            }}
            className="w-full pl-8 pr-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg"
          />
        </div>
      </div>

      {/* Agency filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          Agency
        </label>
        <div ref={agencyDropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setAgencyDropdownOpen(!agencyDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg bg-white hover:border-[var(--color-gray-500)] transition-colors"
          >
            <span className="text-[var(--color-gray-500)]">
              {filters.agencies.length === AGENCIES.length
                ? "All agencies"
                : filters.agencies.length
                  ? filters.agencies.includes("nih") && filters.nihInstitutes.length > 0
                    ? `${filters.agencies.length} selected · NIH (${filters.nihInstitutes.length} institute${filters.nihInstitutes.length !== 1 ? "s" : ""})`
                    : `${filters.agencies.length} selected`
                  : "No agencies"}
            </span>
            <ChevronDown size={16} />
          </button>
          {agencyDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-[var(--color-gray-300)] rounded-lg shadow-lg max-h-96 overflow-hidden">
              <div className="p-2 border-b border-[var(--color-gray-100)]">
                <input
                  type="text"
                  placeholder="Search agencies..."
                  value={agencySearch}
                  onChange={(e) => setAgencySearch(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-[var(--color-gray-300)] rounded"
                />
                <div className="flex gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, agencies: AGENCIES.map((a) => a.value) }))}
                    className="text-xs text-[var(--color-brand)] hover:underline"
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, agencies: [], nihInstitutes: [] }))}
                    className="text-xs text-[var(--color-brand)] hover:underline"
                  >
                    Uncheck all
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto max-h-80 p-2 space-y-1">
                {filteredAgencies.map((ag) => (
                  <div key={ag.value}>
                    <label
                      className="flex items-center gap-2 px-1.5 py-1 text-sm rounded hover:bg-[var(--color-gray-50)] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.agencies.includes(ag.value)}
                        onChange={() => toggleAgency(ag.value)}
                        className="accent-[var(--color-brand)]"
                      />
                      {ag.label}
                    </label>
                    {/* Nested NIH institute sub-list - collapsible */}
                    {ag.value === "nih" && filters.agencies.includes("nih") && (
                      <div className="ml-4 mt-0.5 mb-1">
                        <button
                          type="button"
                          onClick={() => setNihExpanded(!nihExpanded)}
                          className="flex items-center gap-1 text-xs text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)] px-1.5 py-0.5"
                        >
                          <span className="text-[10px]">{nihExpanded ? "▼" : "▶"}</span>
                          Filter by institute
                          {filters.nihInstitutes.length > 0 && (
                            <span className="text-[var(--color-brand)] font-medium">({filters.nihInstitutes.length})</span>
                          )}
                        </button>
                        {nihExpanded && (
                          <div className="border-l-2 border-[var(--color-gray-200)] pl-2 mt-1">
                            <div className="flex gap-2 mb-1 px-1.5">
                              <button
                                type="button"
                                onClick={() => setFilters((prev) => ({ ...prev, nihInstitutes: NIH_INSTITUTES.map((i) => i.fullName) }))}
                                className="text-xs text-[var(--color-brand)] hover:underline"
                              >
                                Select all
                              </button>
                              <button
                                type="button"
                                onClick={() => setFilters((prev) => ({ ...prev, nihInstitutes: [] }))}
                                className="text-xs text-[var(--color-brand)] hover:underline"
                              >
                                Uncheck all
                              </button>
                            </div>
                            <div className="max-h-40 overflow-y-auto space-y-0.5">
                              {NIH_INSTITUTES.map((inst) => (
                                <label
                                  key={inst.abbr}
                                  className="flex items-center gap-1.5 px-1.5 py-0.5 text-xs rounded hover:bg-[var(--color-gray-50)] cursor-pointer"
                                  title={inst.fullName}
                                >
                                  <input
                                    type="checkbox"
                                    checked={filters.nihInstitutes.includes(inst.fullName)}
                                    onChange={() => toggleNihInstitute(inst.fullName)}
                                    className="accent-[var(--color-brand)]"
                                  />
                                  {inst.abbr}
                                </label>
                              ))}
                            </div>
                            {filters.nihInstitutes.length === 0 && (
                              <p className="text-xs text-[var(--color-gray-400)] italic px-1.5 mt-1">
                                None selected = all NIH institutes
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity Code (Grant Type) filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
          Grant Type
        </label>
        <div ref={activityDropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setActivityDropdownOpen(!activityDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm border border-[var(--color-gray-300)] rounded-lg bg-white hover:border-[var(--color-gray-500)] transition-colors"
          >
            <span className="text-[var(--color-gray-500)]">
              {filters.activityCodes.length
                ? `${filters.activityCodes.length} selected`
                : "All grant types"}
            </span>
            <ChevronDown size={16} />
          </button>
          {activityDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-[var(--color-gray-300)] rounded-lg shadow-lg max-h-60 overflow-hidden">
              <div className="p-2 border-b border-[var(--color-gray-100)]">
                <input
                  type="text"
                  placeholder="Search codes..."
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-[var(--color-gray-300)] rounded"
                />
              </div>
              <div className="overflow-y-auto max-h-48 p-2 grid grid-cols-3 gap-1">
                {filteredActivityCodes.map((code) => (
                  <label
                    key={code}
                    className="flex items-center gap-1.5 px-1.5 py-1 text-sm rounded hover:bg-[var(--color-gray-50)] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.activityCodes.includes(code)}
                      onChange={() => toggleActivityCode(code)}
                      className="accent-[var(--color-brand)]"
                    />
                    {code}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        {filters.activityCodes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.activityCodes.map((code) => (
              <span
                key={code}
                className="inline-flex items-center gap-1 text-xs bg-[var(--color-brand-light)] text-[var(--color-brand)] px-2 py-0.5 rounded-full"
              >
                {code}
                <button onClick={() => toggleActivityCode(code)} className="hover:text-[var(--color-brand-dark)]">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
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
                  Search {total > 0 ? total.toLocaleString() : "525,600"} federally funded research grants
                </p>
              </div>
              {userEmail && (
                <div className="flex items-center gap-3 shrink-0">
                  {planTier && (
                    <span className="text-xs font-medium bg-[var(--color-brand-light)] text-[var(--color-brand)] px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
                      {planTier.charAt(0).toUpperCase() + planTier.slice(1)}{subscribedStates.length <= 5 ? ` · ${subscribedStates.join(", ")}` : " · All States"}
                    </span>
                  )}
                  <span className="text-sm text-[var(--color-gray-500)] hidden md:inline">
                    {userEmail}
                  </span>
                  <a
                    href="/database/account"
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--color-gray-300)] hover:border-[var(--color-gray-500)]"
                  >
                    <SlidersHorizontal size={14} />
                    Account
                  </a>
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
                        : favoritesOnly
                          ? `${total.toLocaleString()} result${total !== 1 ? "s" : ""} · showing favorites only`
                          : `${total.toLocaleString()} result${total !== 1 ? "s" : ""} found`}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const newVal = !favoritesOnly;
                          setFavoritesOnly(newVal);
                          userHasInteracted.current = true;
                          if (newVal) setHasSearched(true);
                        }}
                        className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                          favoritesOnly
                            ? "bg-amber-50 border-amber-300 text-amber-700"
                            : "border-[var(--color-gray-300)] text-[var(--color-gray-500)] hover:border-[var(--color-gray-500)]"
                        }`}
                      >
                        <Star size={14} className={favoritesOnly ? "fill-amber-400 text-amber-400" : ""} />
                        Favorites{favoriteIds.size > 0 ? ` (${favoriteIds.size})` : ""}
                      </button>

                      {/* View mode toggle */}
                      <div className="flex items-center border border-[var(--color-gray-300)] rounded-lg overflow-hidden">
                        <button
                          onClick={() => setViewMode("cards")}
                          className={`p-1.5 transition-colors ${
                            viewMode === "cards"
                              ? "bg-[var(--color-brand)] text-white"
                              : "text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]"
                          }`}
                          title="Card view"
                        >
                          <LayoutGrid size={16} />
                        </button>
                        <button
                          onClick={() => setViewMode("table")}
                          className={`p-1.5 transition-colors ${
                            viewMode === "table"
                              ? "bg-[var(--color-brand)] text-white"
                              : "text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]"
                          }`}
                          title="Table view"
                        >
                          <Table size={16} />
                        </button>
                      </div>

                      {/* Export CSV - Pro subscribers only, favorites mode */}
                      {favoritesOnly && results.length > 0 && (
                        planTier === "pro" ? (
                          <button
                            onClick={exportFavoritesCSV}
                            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--color-gray-300)] text-[var(--color-gray-500)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
                            title="Export favorites as CSV"
                          >
                            <Download size={14} />
                            Export CSV
                          </button>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--color-gray-200)] text-[var(--color-gray-400)] cursor-default"
                            title="Upgrade to Pro to export your favorites"
                          >
                            <Download size={14} />
                            Export CSV
                            <span className="text-xs bg-[var(--color-brand-light)] text-[var(--color-brand)] px-1.5 py-0.5 rounded-full font-medium">Pro</span>
                          </span>
                        )
                      )}

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
                  </div>

                  {/* Active PI filter pill */}
                  {activePiFilter && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-sm bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1.5 rounded-full font-medium">
                        PI: {activePiFilter}
                        <button
                          onClick={() => setActivePiFilter(null)}
                          className="hover:text-[var(--color-brand-dark)] ml-0.5"
                          title="Clear PI filter"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    </div>
                  )}

                  {/* Active equipment tag filter pill */}
                  {filters.equipmentTags.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      {filters.equipmentTags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 text-sm bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full font-medium">
                          🏷️ {tag.replace(/-/g, " ")}
                          <button
                            onClick={() => setFilters((prev) => ({
                              ...prev,
                              equipmentTags: prev.equipmentTags.filter((t) => t !== tag),
                            }))}
                            className="hover:text-purple-900 ml-0.5"
                            title="Clear tag filter"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

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
                  ) : viewMode === "table" ? (
                    /* ===== TABLE VIEW ===== */
                    <div className="bg-white rounded-xl border border-[var(--color-gray-100)] overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-[var(--color-gray-100)] bg-[var(--color-gray-50)]">
                              <th className="w-8 px-3 py-3"></th>
                              <th className="text-left px-3 py-3 font-semibold text-[var(--color-gray-700)]">PI Name</th>
                              <th className="text-left px-3 py-3 font-semibold text-[var(--color-gray-700)]">Contact</th>
                              <th className="text-left px-3 py-3 font-semibold text-[var(--color-gray-700)]">Institution</th>
                              <th className="text-left px-3 py-3 font-semibold text-[var(--color-gray-700)] hidden lg:table-cell">State</th>
                              <th className="text-left px-3 py-3 font-semibold text-[var(--color-gray-700)]">Grant Title</th>
                              <th className="text-left px-3 py-3 font-semibold text-[var(--color-gray-700)] hidden md:table-cell">Agency</th>
                              <th className="text-right px-3 py-3 font-semibold text-[var(--color-gray-700)] hidden md:table-cell">Amount</th>
                              <th className="text-left px-3 py-3 font-semibold text-[var(--color-gray-700)] hidden xl:table-cell">Equipment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.map((grant) => {
                              const email = grant.pis?.email || grant.pi_email;
                              return (
                                <tr
                                  key={grant.id}
                                  className="border-b border-[var(--color-gray-50)] hover:bg-[var(--color-gray-50)] transition-colors"
                                >
                                  <td className="px-3 py-2.5">
                                    <button
                                      onClick={() => toggleFavorite(grant.grant_id)}
                                      disabled={togglingFav.has(grant.grant_id)}
                                      className={`p-0.5 transition-colors ${
                                        favoriteIds.has(grant.grant_id)
                                          ? "text-amber-400 hover:text-amber-500"
                                          : "text-[var(--color-gray-300)] hover:text-amber-400"
                                      } disabled:opacity-50`}
                                    >
                                      <Star size={14} className={favoriteIds.has(grant.grant_id) ? "fill-amber-400" : ""} />
                                    </button>
                                  </td>
                                  <td className="px-3 py-2.5 font-medium text-[var(--color-gray-900)] whitespace-nowrap">
                                    {grant.pi_name ? (
                                      <button
                                        type="button"
                                        onClick={() => setActivePiFilter(grant.pi_name)}
                                        className="hover:text-[var(--color-brand)] hover:underline"
                                      >
                                        {grant.pi_name}
                                      </button>
                                    ) : (
                                      <span className="text-[var(--color-gray-400)]">—</span>
                                    )}
                                  </td>
                                  <td className="px-3 py-2.5">
                                    <div className="space-y-0.5">
                                      {email ? (
                                        <a href={`mailto:${email}`} className="text-[var(--color-brand)] hover:underline truncate block max-w-[200px] text-xs">
                                          {email}
                                        </a>
                                      ) : (
                                        <span className="text-[var(--color-gray-400)] text-xs">No email</span>
                                      )}
                                      {grant.pis?.phone && (
                                        <span className="text-xs text-[var(--color-gray-500)] block">📞 {grant.pis.phone}</span>
                                      )}
                                      {(grant.pis?.building || grant.pis?.room) && (
                                        <span className="text-xs text-[var(--color-gray-500)] block">📍 {[grant.pis.building, grant.pis.room ? `Rm ${grant.pis.room}` : null].filter(Boolean).join(", ")}</span>
                                      )}
                                      {(grant.pis?.r1_faculty?.[0]?.profile_url || grant.pis?.faculty_profile_url) && (
                                        <a
                                          href={(grant.pis?.r1_faculty?.[0]?.profile_url || grant.pis?.faculty_profile_url)!}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-[var(--color-brand)] hover:underline inline-flex items-center gap-0.5"
                                        >
                                          Profile <ExternalLink size={10} />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-3 py-2.5 text-[var(--color-gray-600)] max-w-[180px] truncate">
                                    {grant.institution || "—"}
                                  </td>
                                  <td className="px-3 py-2.5 text-[var(--color-gray-600)] hidden lg:table-cell">
                                    {grant.state || "—"}
                                  </td>
                                  <td className="px-3 py-2.5 max-w-[250px]">
                                    <button
                                      onClick={() => toggleExpanded(grant.id)}
                                      className="text-left text-[var(--color-gray-900)] hover:text-[var(--color-brand)] transition-colors truncate block w-full"
                                      title={grant.title}
                                    >
                                      {grant.title}
                                    </button>
                                  </td>
                                  <td className="px-3 py-2.5 hidden md:table-cell">
                                    <span className="text-xs font-medium bg-[var(--color-brand-light)] text-[var(--color-brand)] px-2 py-0.5 rounded-full uppercase">
                                      {grant.source}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2.5 text-right text-[var(--color-gray-900)] font-medium tabular-nums hidden md:table-cell whitespace-nowrap">
                                    {formatCurrency(grant.award_amount)}
                                  </td>
                                  <td className="px-3 py-2.5 hidden xl:table-cell">
                                    {grant.equipment_tags && grant.equipment_tags.length > 0 ? (
                                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                                        {["R00", "DP2"].includes(grant.activity_code || "") && (
                                          <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">New Lab</span>
                                        )}
                                        {grant.activity_code === "K99" && (
                                          <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">Future Lab</span>
                                        )}
                                        {grant.equipment_tags.slice(0, 3).map((tag, i) => (
                                          <span key={i} className="text-xs bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full truncate max-w-[100px]">
                                            {tag}
                                          </span>
                                        ))}
                                        {grant.equipment_tags.length > 3 && (
                                          <span className="text-xs text-[var(--color-gray-400)]">+{grant.equipment_tags.length - 3}</span>
                                        )}
                                      </div>
                                    ) : ["R00", "DP2"].includes(grant.activity_code || "") ? (
                                      <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full ring-1 ring-green-200">New Investigator</span>
                                    ) : grant.activity_code === "K99" ? (
                                      <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full ring-1 ring-green-200">Future New Lab</span>
                                    ) : (
                                      <span className="text-[var(--color-gray-400)]">—</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
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
                            {/* Title + Favorite */}
                            {(() => {
                              // For USASpending grants (USDA, DOD, etc.) the "title" is often the full description.
                              // Truncate long titles and show full text in the expandable abstract area.
                              const MAX_TITLE = 150;
                              const titleIsLong = grant.title && grant.title.length > MAX_TITLE;
                              const displayTitle = titleIsLong
                                ? grant.title.slice(0, MAX_TITLE).replace(/\s+\S*$/, "") + "…"
                                : grant.title;
                              // If the title is long and there's no separate abstract, use title as abstract
                              const effectiveAbstract = grant.abstract && grant.abstract !== grant.title
                                ? grant.abstract
                                : titleIsLong
                                  ? grant.title
                                  : grant.abstract;
                              // Stash for use in abstract section below
                              (grant as any)._displayTitle = displayTitle;
                              (grant as any)._effectiveAbstract = effectiveAbstract;
                              return null;
                            })()}
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => toggleExpanded(grant.id)}
                                className="text-left flex-1 group"
                              >
                                <h3 className="text-base font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">
                                  {(grant as any)._displayTitle || grant.title}
                                </h3>
                              </button>
                              <button
                                onClick={() => toggleFavorite(grant.grant_id)}
                                disabled={togglingFav.has(grant.grant_id)}
                                className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                                  favoriteIds.has(grant.grant_id)
                                    ? "text-amber-400 hover:text-amber-500"
                                    : "text-[var(--color-gray-300)] hover:text-amber-400"
                                } disabled:opacity-50`}
                                title={favoriteIds.has(grant.grant_id) ? "Remove from favorites" : "Add to favorites"}
                              >
                                <Star
                                  size={18}
                                  className={favoriteIds.has(grant.grant_id) ? "fill-amber-400" : ""}
                                />
                              </button>
                            </div>

                            {/* PI & Institution */}
                            <p className="text-sm text-[var(--color-gray-500)] mt-2">
                              {grant.pi_name && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActivePiFilter(grant.pi_name);
                                  }}
                                  className="font-semibold text-[var(--color-gray-900)] hover:text-[var(--color-brand)] hover:underline cursor-pointer"
                                  title={`Show all grants by ${grant.pi_name}`}
                                >
                                  {grant.pi_name}
                                </button>
                              )}
                              {grant.pi_name && (grant.institution || grant.city || grant.state) && " · "}
                              {[grant.institution, [grant.city, grant.state].filter(Boolean).join(", ")].filter(Boolean).join(", ")}
                            </p>

                            {/* PI Email - always visible on collapsed card */}
                            {(() => {
                              const email = grant.pis?.email || grant.pi_email;
                              if (email) {
                                return (
                                  <div className="flex items-center gap-1.5 mt-1.5 text-sm">
                                    <Mail size={14} className="text-[var(--color-gray-400)] shrink-0" />
                                    <a
                                      href={`mailto:${email}`}
                                      className="text-[var(--color-brand)] font-medium hover:underline"
                                    >
                                      {email}
                                    </a>
                                  </div>
                                );
                              }
                              if (grant.source === "nih" && grant.source_url) {
                                return (
                                  <div className="flex items-center gap-1.5 mt-1.5 text-sm">
                                    <Mail size={14} className="text-[var(--color-gray-400)] shrink-0" />
                                    <span className="text-[var(--color-gray-400)] italic">Email available through source</span>
                                  </div>
                                );
                              }
                              return null;
                            })()}

                            {/* Extra contact info: phone, department, office */}
                            {(() => {
                              const phone = grant.pis?.phone;
                              const dept = grant.pis?.department;
                              const building = grant.pis?.building;
                              const room = grant.pis?.room;
                              const office = grant.pis?.office_location;
                              const location = [building, room ? `Room ${room}` : null].filter(Boolean).join(", ") || office;
                              const hasExtra = phone || dept || location;
                              if (!hasExtra) return null;
                              return (
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-[var(--color-gray-500)]">
                                  {phone && (
                                    <span className="inline-flex items-center gap-1">
                                      📞 <a href={`tel:${phone}`} className="hover:text-[var(--color-brand)]">{phone}</a>
                                    </span>
                                  )}
                                  {location && (
                                    <span className="inline-flex items-center gap-1">
                                      📍 {location}
                                    </span>
                                  )}
                                  {dept && (
                                    <span className="inline-flex items-center gap-1">
                                      🏛️ {dept}
                                    </span>
                                  )}
                                </div>
                              );
                            })()}

                            {/* Badges row */}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              {grant.source && (
                                <span className="inline-flex items-center text-xs font-medium bg-[var(--color-brand-light)] text-[var(--color-brand)] px-2.5 py-1 rounded-full uppercase">
                                  {grant.source}
                                </span>
                              )}
                              {grant.activity_code && (
                                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
                                  ["R00", "DP2", "K99"].includes(grant.activity_code)
                                    ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                                    : "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]"
                                }`}>
                                  {grant.activity_code}
                                  {grant.activity_code === "R00" && " · New Investigator"}
                                  {grant.activity_code === "K99" && " · Future New Lab"}
                                  {grant.activity_code === "DP2" && " · New Innovator"}
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

                            {/* Equipment tags - clickable to filter */}
                            {grant.equipment_tags && grant.equipment_tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {grant.equipment_tags.map((tag, i) => (
                                  <button
                                    key={i}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      userHasInteracted.current = true;
                                      setFilters((prev) => ({
                                        ...prev,
                                        equipmentTags: prev.equipmentTags.includes(tag)
                                          ? prev.equipmentTags
                                          : [tag],
                                      }));
                                    }}
                                    className={`text-xs px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                                      filters.equipmentTags.includes(tag)
                                        ? "bg-purple-200 text-purple-900 ring-1 ring-purple-400"
                                        : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                                    }`}
                                    title={`Show all grants tagged "${tag.replace(/-/g, " ")}"`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Abstract */}
                            {(() => {
                              const absText = (grant as any)._effectiveAbstract || grant.abstract;
                              if (!absText) return null;
                              return (
                                <div className="mt-3">
                                  <p className="text-sm text-[var(--color-gray-500)] leading-relaxed">
                                    {expanded
                                      ? absText
                                      : absText.slice(0, 200) +
                                        (absText.length > 200 ? "..." : "")}
                                  </p>
                                  {absText.length > 200 && (
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
                              );
                            })()}

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
                            {/* Faculty Profile link */}
                            {(() => {
                              const profileUrl = grant.pis?.r1_faculty?.[0]?.profile_url || grant.pis?.faculty_profile_url;
                              if (profileUrl) {
                                return (
                                  <a
                                    href={profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-[var(--color-brand)] hover:underline mt-3 ml-4"
                                  >
                                    Faculty profile <ExternalLink size={14} />
                                  </a>
                                );
                              }
                              return null;
                            })()}
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
                    Enter a keyword, PI name, institution, or research topic above to explore our database of 525,600 grants from NIH, NSF, DOD, and more.
                  </p>
                  {favoriteIds.size > 0 && (
                    <button
                      onClick={() => {
                        setFavoritesOnly(true);
                        setHasSearched(true);
                        userHasInteracted.current = true;
                      }}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
                    >
                      <Star size={16} className="fill-amber-400 text-amber-400" />
                      View My Favorites ({favoriteIds.size})
                    </button>
                  )}
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
