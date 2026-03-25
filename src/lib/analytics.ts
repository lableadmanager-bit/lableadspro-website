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
