"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  attachHumanPageViewTracking,
  attachScrollDepthTracking,
  captureUtmsFromUrl,
  markVisitorAndTrack,
  trackCtaClick,
  trackOutboundClick,
} from "@/lib/analytics";

export default function AnalyticsBootstrap() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtmsFromUrl();
    markVisitorAndTrack();
  }, []);

  useEffect(() => {
    const page = pathname || "/";
    const detachScroll = attachScrollDepthTracking(page);
    const detachHuman = attachHumanPageViewTracking(page);
    return () => {
      detachScroll();
      detachHuman();
    };
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const cta = anchor.dataset.cta;
      if (cta) {
        trackCtaClick(cta, anchor.getAttribute("href") || "", anchor.dataset.ctaLabel);
      }

      const href = anchor.getAttribute("href") || "";
      if (/^https?:\/\//i.test(href)) {
        try {
          const url = new URL(href);
          if (url.host && url.host !== window.location.host) {
            trackOutboundClick(href, cta || anchor.dataset.ctaLocation);
          }
        } catch {
          // malformed URL — ignore
        }
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
