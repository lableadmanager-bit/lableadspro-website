"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AuthActions() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      setAuthed(!!data.user);
    });
  }, []);

  if (authed === null) return null;

  return (
    <div className="flex justify-center gap-3 mb-8">
      {authed ? (
        <a
          href="/database/search"
          className="inline-flex items-center gap-2 text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          Go to Database
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      ) : (
        <>
          <a
            href="/database/login"
            className="inline-flex items-center gap-2 text-[var(--color-brand)] border border-[var(--color-brand)] hover:bg-[var(--color-brand-light)] font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Sign In
          </a>
          <a
            href="/checkout"
            className="inline-flex items-center gap-2 text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Get Started
          </a>
        </>
      )}
    </div>
  );
}
