export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 bg-[var(--color-dark)] border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[var(--color-brand)] rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18h8" />
              <path d="M3 22h18" />
              <path d="M14 22a7 7 0 1 0-1-13" />
              <path d="M9 14h2" />
              <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
              <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-400">
            Lab Leads Pro
          </span>
        </div>

        <p className="text-sm text-gray-500">
          © {year} Lab Leads Pro. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a href="mailto:hello@lableadspro.com" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
