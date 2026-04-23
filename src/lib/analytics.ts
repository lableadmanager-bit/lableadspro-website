/**
 * Analytics & Conversion Tracking — Lab Leads Pro
 * 
 * GA4: G-DVCRLHGJWV (already live)
 * Google Ads: AW-XXXXXXXXXX (add when account created)
 * 
 * Usage:
 *   import { trackEvent, trackConversion } from '@/lib/analytics';
 *   trackEvent('sample_report_downloaded', { state: 'NC' });
 *   trackConversion('SAMPLE_DOWNLOAD');
 */

// Google Ads conversion IDs — fill these in when Google Ads account is created
// Go to: Google Ads → Tools → Conversions → New conversion action → Website
// Copy the conversion ID and label for each action
export const GOOGLE_ADS_CONVERSIONS = {
  SAMPLE_DOWNLOAD: {
    id: '', // e.g., 'AW-1234567890/abcdef'
    label: 'sample_download',
    value: 5,
  },
  SIGNUP: {
    id: '', // e.g., 'AW-1234567890/ghijkl' 
    label: 'signup',
    value: 25,
  },
  SUBSCRIPTION: {
    id: '', // e.g., 'AW-1234567890/mnopqr'
    label: 'subscription',
    value: 99,
  },
  PRICING_VIEW: {
    id: '', // e.g., 'AW-1234567890/stuvwx'
    label: 'pricing_view',
    value: 1,
  },
} as const;

type ConversionKey = keyof typeof GOOGLE_ADS_CONVERSIONS;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a custom GA4 event
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/**
 * Track a Google Ads conversion
 * Only fires if the conversion ID is configured
 */
export function trackConversion(
  conversionKey: ConversionKey,
  extraParams?: Record<string, string | number>
) {
  const conversion = GOOGLE_ADS_CONVERSIONS[conversionKey];
  
  // Always track as GA4 event
  trackEvent(conversion.label, {
    value: conversion.value,
    currency: 'USD',
    ...extraParams,
  });

  // Track as Google Ads conversion if ID is configured
  if (conversion.id && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversion.id,
      value: conversion.value,
      currency: 'USD',
      ...extraParams,
    });
  }
}

/**
 * Track a page view (useful for SPA navigation)
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: url,
      page_title: title,
    });
  }
}

const RETURN_VISITOR_KEY = 'llp_visitor_first_seen';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const UTM_STORAGE_KEY = 'llp_utm_first_touch';

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtmsFromUrl() {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: UtmParams = {};
    for (const key of UTM_KEYS) {
      const v = params.get(key);
      if (v) found[key] = v;
    }
    if (Object.keys(found).length === 0) return;
    // First-touch attribution: only set if not already stored.
    if (!sessionStorage.getItem(UTM_STORAGE_KEY)) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // sessionStorage may be disabled; silently skip
  }
}

export function getStoredUtms(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

export function markVisitorAndTrack() {
  if (typeof window === 'undefined') return;
  try {
    const first = localStorage.getItem(RETURN_VISITOR_KEY);
    if (first) {
      const days = Math.floor((Date.now() - Number(first)) / 86_400_000);
      trackEvent('return_visitor', { days_since_first: days });
    } else {
      localStorage.setItem(RETURN_VISITOR_KEY, String(Date.now()));
    }
  } catch {
    // localStorage may be disabled; silently skip
  }
}

export function trackCtaClick(
  location: string,
  destination: string,
  label?: string,
) {
  trackEvent('cta_click', {
    location,
    destination,
    ...(label ? { label } : {}),
  });
}

export function trackOutboundClick(url: string, location?: string) {
  trackEvent('outbound_click', {
    url,
    ...(location ? { location } : {}),
  });
}

export function attachScrollDepthTracking(pageId: string) {
  if (typeof window === 'undefined') return () => {};
  const thresholds = [25, 50, 75, 100];
  const fired = new Set<number>();

  const handler = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = (window.scrollY / scrollable) * 100;
    for (const t of thresholds) {
      if (pct >= t && !fired.has(t)) {
        fired.add(t);
        trackEvent('scroll_depth', { page: pageId, depth: t });
      }
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler();
  return () => window.removeEventListener('scroll', handler);
}

const focusStart = new Map<string, number>();

export function trackFieldFocus(form: string, field: string) {
  focusStart.set(`${form}:${field}`, Date.now());
  trackEvent('form_field_focus', { form, field });
}

export function trackFieldBlur(form: string, field: string, hasValue: boolean) {
  const key = `${form}:${field}`;
  const startedAt = focusStart.get(key);
  const dwellMs = startedAt ? Date.now() - startedAt : 0;
  focusStart.delete(key);
  trackEvent('form_field_blur', {
    form,
    field,
    has_value: hasValue,
    dwell_ms: dwellMs,
  });
}
