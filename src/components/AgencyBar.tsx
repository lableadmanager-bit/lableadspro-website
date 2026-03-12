"use client";

import { useEffect, useState } from "react";

const agencies = [
  { name: "NIH", logo: "/logos/nih.png", height: "h-14" },
  { name: "NSF", logo: "/logos/nsf.png", height: "h-12" },
  { name: "DOD", logo: "/logos/dod.png", height: "h-12" },
  { name: "DOE", logo: "/logos/doe.png", height: "h-12" },
  { name: "NASA", logo: "/logos/nasa.png", height: "h-12" },
  { name: "VA", logo: "/logos/va.png", height: "h-8" },
  { name: "USDA", logo: "/logos/usda.png", height: "h-12" },
  { name: "CDC", logo: "/logos/cdc.png", height: "h-12" },
];

// Double the array for seamless loop
const doubled = [...agencies, ...agencies];

export default function AgencyBar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mt-4 mb-4 w-full max-w-2xl mx-auto overflow-hidden mask-fade">
      <div
        className={`flex items-center gap-14 ${mounted ? "animate-scroll" : ""}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((agency, i) => (
          <div
            key={`${agency.name}-${i}`}
            className="flex-shrink-0"
            title={agency.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agency.logo}
              alt={agency.name}
              className={`${agency.height} w-auto object-contain opacity-70 hover:opacity-100 transition-opacity`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
