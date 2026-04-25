"use client";

import Link from "next/link";
import { Search, Users } from "lucide-react";

type Mode = "grants" | "pis";

interface Props {
  active: Mode;
}

export default function SearchModeToggle({ active }: Props) {
  return (
    <div className="inline-flex items-center bg-[var(--color-gray-100)] rounded-xl p-1 border border-[var(--color-gray-200)]">
      <Link
        href="/database/search"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
          active === "grants"
            ? "bg-white text-[var(--color-brand)] shadow-sm"
            : "text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)]"
        }`}
        aria-current={active === "grants" ? "page" : undefined}
      >
        <Search size={15} />
        Search Grants
      </Link>
      <Link
        href="/database/pis"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
          active === "pis"
            ? "bg-white text-[var(--color-brand)] shadow-sm"
            : "text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)]"
        }`}
        aria-current={active === "pis" ? "page" : undefined}
      >
        <Users size={15} />
        Search PIs
      </Link>
    </div>
  );
}
