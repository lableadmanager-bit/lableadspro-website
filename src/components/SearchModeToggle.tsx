"use client";

import Link from "next/link";
import { Search, Users, Building2 } from "lucide-react";

type Mode = "grants" | "pis" | "companies";

interface Props {
  active: Mode;
}

const TABS: { mode: Mode; href: string; label: string; Icon: typeof Search }[] = [
  { mode: "grants", href: "/database/search", label: "Search Grants", Icon: Search },
  { mode: "pis", href: "/database/pis", label: "Search PIs", Icon: Users },
  { mode: "companies", href: "/database/companies", label: "Search Companies", Icon: Building2 },
];

export default function SearchModeToggle({ active }: Props) {
  return (
    <div className="inline-flex items-center bg-[var(--color-gray-100)] rounded-xl p-1 border border-[var(--color-gray-200)]">
      {TABS.map(({ mode, href, label, Icon }) => (
        <Link
          key={mode}
          href={href}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            active === mode
              ? "bg-white text-[var(--color-brand)] shadow-sm"
              : "text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)]"
          }`}
          aria-current={active === mode ? "page" : undefined}
        >
          <Icon size={15} />
          {label}
        </Link>
      ))}
    </div>
  );
}
