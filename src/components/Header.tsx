"use client";

import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-brand)] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Microscope icon */}
              <path d="M6 18h8" />
              <path d="M3 22h18" />
              <path d="M14 22a7 7 0 1 0-1-13" />
              <path d="M9 14h2" />
              <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
              <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
            </svg>
          </div>
          <span className="text-lg font-bold text-[var(--color-dark)]">
            Lab Leads <span className="text-[var(--color-brand)]">Pro</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors">
            How It Works
          </a>
          <a href="#features" className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors">
            Pricing
          </a>
          <a
            href="#cta"
            className="text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-5 py-2.5 rounded-lg transition-colors"
          >
            Get Early Access
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M3 6h18M3 12h18M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-sm text-[var(--color-gray-700)]">
            How It Works
          </a>
          <a href="#features" onClick={() => setMobileOpen(false)} className="block text-sm text-[var(--color-gray-700)]">
            Features
          </a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="block text-sm text-[var(--color-gray-700)]">
            Pricing
          </a>
          <a
            href="#cta"
            onClick={() => setMobileOpen(false)}
            className="block text-center text-sm font-semibold text-white bg-[var(--color-brand)] px-5 py-2.5 rounded-lg"
          >
            Get Early Access
          </a>
        </div>
      )}
    </header>
  );
}
