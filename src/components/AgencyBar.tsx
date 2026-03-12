"use client";

import { useEffect, useRef } from "react";

const agencies = [
  { name: "VA", logo: "/logos/va.png", className: "h-10 w-auto max-w-[120px]" },
  { name: "USDA", logo: "/logos/usda.png", className: "h-10 w-auto max-w-[120px]" },
  { name: "CDC", logo: "/logos/cdc.png", className: "h-10 w-auto max-w-[120px]" },
  { name: "NIH", logo: "/logos/nih.png", className: "h-14 w-auto max-w-[120px]" },
  { name: "NSF", logo: "/logos/nsf.png", className: "h-10 w-auto max-w-[120px]" },
  { name: "DOD", logo: "/logos/dod.png", className: "h-10 w-auto max-w-[120px]" },
  { name: "DOE", logo: "/logos/doe.png", className: "h-10 w-auto max-w-[120px]" },
  { name: "NASA", logo: "/logos/nasa.png", className: "h-10 w-auto max-w-[120px]" },
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
      className="mt-4 mb-4 w-full max-w-2xl mx-auto overflow-hidden mask-fade rounded-xl bg-white py-4"
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
              className={`${agency.className} object-contain opacity-70`}
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
