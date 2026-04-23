import { createHash } from "crypto";
import type { NextRequest } from "next/server";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];

// Patterns for known email-scanner and crawler UAs that pre-fetch links.
// Keep this list tight — false positives here mean dropping real traffic.
const BOT_UA_PATTERNS: RegExp[] = [
  /bot\b/i,
  /crawler/i,
  /spider/i,
  /headless/i,
  /slurp/i,
  /mimecast/i,
  /barracuda/i,
  /proofpoint/i,
  /googleimageproxy/i,
  /google-safety/i,
  /microsoft office protection/i,
  /outlook/i,
  /facebookexternalhit/i,
  /slackbot/i,
  /twitterbot/i,
  /linkedinbot/i,
  /telegrambot/i,
  /whatsapp/i,
  /skypeuripreview/i,
  /discordbot/i,
  /curl\//i,
  /wget\//i,
  /python-requests/i,
];

export function isLikelyBotUA(ua: string | null | undefined): boolean {
  if (!ua) return true;
  return BOT_UA_PATTERNS.some((p) => p.test(ua));
}

export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || "llp-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export function extractClientIp(req: NextRequest): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}

export function sanitizeUtms(input: unknown): Record<UtmKey, string | null> {
  const out = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  } as Record<UtmKey, string | null>;
  if (!input || typeof input !== "object") return out;
  const o = input as Record<string, unknown>;
  for (const k of UTM_KEYS) {
    const v = o[k];
    if (typeof v === "string" && v.length > 0 && v.length <= 200) {
      out[k] = v;
    }
  }
  return out;
}

export function truncate(v: string | null | undefined, max: number): string | null {
  if (!v) return null;
  return v.length > max ? v.slice(0, max) : v;
}
