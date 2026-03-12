"use client";

import { useEffect, useState } from "react";

const agencies = [
  { name: "NIH", logo: "/logos/nih.png" },
  { name: "NSF", logo: "/logos/nsf.png" },
  { name: "DOD", logo: "/logos/dod.png" },
  { name: "DOE", logo: "/logos/doe.png" },
  { name: "NASA", logo: "/logos/nasa.png" },
  { name: "VA", logo: "/logos/va.png" },
  { name: "USDA", logo: "/logos/usda.png" },
  { name: "CDC", logo: "/logos/cdc.png" },
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
              className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
