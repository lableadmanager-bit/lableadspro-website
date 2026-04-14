"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Institution {
  institution: string;
  grant_count: number;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  states?: string[];
}

export default function InstitutionAutocomplete({ value, onChange, placeholder = "Filter by institution...", states }: Props) {
  const [suggestions, setSuggestions] = useState<Institution[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    try {
      const statesParam = states?.length ? `&states=${states.join(",")}` : "";
      const res = await fetch(`/api/institutions?q=${encodeURIComponent(query)}&limit=8${statesParam}`);
      const data: Institution[] = await res.json();
      setSuggestions(data);
      setIsOpen(data.length > 0);
      setHighlightIndex(-1);
    } catch {
      setSuggestions([]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(() => fetchSuggestions(val), 250);
  };

  const selectSuggestion = (inst: string) => {
    onChange(inst);
    setIsOpen(false);
    setSuggestions([]);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[highlightIndex].institution);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (suggestions.length > 0) setIsOpen(true); }}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-gray-200)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent bg-white"
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-[var(--color-gray-200)] rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={s.institution}
              onClick={() => selectSuggestion(s.institution)}
              onMouseEnter={() => setHighlightIndex(i)}
              className={`px-3 py-2 cursor-pointer text-sm flex justify-between items-center ${
                i === highlightIndex
                  ? "bg-[var(--color-brand-light)] text-[var(--color-brand)]"
                  : "hover:bg-[var(--color-gray-50)] text-[var(--color-gray-900)]"
              }`}
            >
              <span className="truncate">{s.institution}</span>
              <span className="text-xs text-[var(--color-gray-400)] ml-2 shrink-0">
                {s.grant_count.toLocaleString()} grants
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
