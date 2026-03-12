"use client";

import { useEffect, useRef } from "react";

const agencies = [
  { name: "VA", logo: "/logos/va.png" },
  { name: "USDA", logo: "/logos/usda.png" },
  { name: "CDC", logo: "/logos/cdc.png" },
  { name: "NIH", logo: "/logos/nih.png" },
  { name: "NSF", logo: "/logos/nsf.png" },
  { name: "DOD", logo: "/logos/dod.png" },
  { name: "DOE", logo: "/logos/doe.png" },
  { name: "NASA", logo: "/logos/nasa.png" },
];

export default function AgencyBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const innerEl = innerRef.current;
    if (!scrollEl || !innerEl) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame

    // Get width of one set of logos
    const singleSetWidth = innerEl.scrollWidth / 3;

    const animate = () => {
      position += speed;
      // Reset seamlessly when we've scrolled one full set
      if (position >= singleSetWidth) {
        position -= singleSetWidth;
      }
      innerEl.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { animationId = requestAnimationFrame(animate); };
    scrollEl.addEventListener("mouseenter", pause);
    scrollEl.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      scrollEl.removeEventListener("mouseenter", pause);
      scrollEl.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Triple the logos for seamless wrap
  const tripled = [...agencies, ...agencies, ...agencies];

  return (
    <div
      ref={scrollRef}
      className="mt-4 mb-4 w-full max-w-2xl mx-auto overflow-hidden mask-fade"
    >
      <div
        ref={innerRef}
        className="flex items-center gap-14"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {tripled.map((agency, i) => (
          <div
            key={`${agency.name}-${i}`}
            className="flex-shrink-0"
            title={agency.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agency.logo}
              alt={agency.name}
              className="h-10 w-auto max-w-[120px] object-contain opacity-70"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
