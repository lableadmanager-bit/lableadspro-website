"use client";

import { useEffect, useState } from "react";

const agencies = [
  { name: "NIH", logo: "/logos/nih.svg" },
  { name: "NSF", logo: "/logos/nsf.svg" },
  { name: "DOD", logo: "/logos/dod.svg" },
  { name: "DOE", logo: "/logos/doe.svg" },
  { name: "NASA", logo: "/logos/nasa.svg" },
  { name: "VA", logo: "/logos/va.svg" },
  { name: "USDA", logo: "/logos/usda.svg" },
  { name: "CDC", logo: "/logos/cdc.svg" },
];

// Double the array for seamless loop
const doubled = [...agencies, ...agencies];

export default function AgencyBar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mt-4 mb-2 w-full max-w-2xl mx-auto overflow-hidden">
      <div
        className={`flex items-center gap-12 ${mounted ? "animate-scroll" : ""}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((agency, i) => (
          <div
            key={`${agency.name}-${i}`}
            className="flex items-center gap-2 flex-shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agency.logo}
              alt={agency.name}
              className="h-10 w-auto object-contain"
              loading="lazy"
            />
            <span className="text-sm font-semibold text-[var(--color-gray-500)]">
              {agency.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
