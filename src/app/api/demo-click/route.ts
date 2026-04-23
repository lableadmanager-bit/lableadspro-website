import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  extractClientIp,
  hashIp,
  isLikelyBotUA,
  sanitizeUtms,
  truncate,
} from "@/lib/request-context";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { utm, referrer: clientReferrer } = body as {
      utm?: unknown;
      referrer?: unknown;
    };

    const userAgent = request.headers.get("user-agent");
    const referrer = truncate(
      typeof clientReferrer === "string" ? clientReferrer : request.headers.get("referer"),
      500,
    );
    const utms = sanitizeUtms(utm);
    const ipHash = hashIp(extractClientIp(request));
    const isBot = isLikelyBotUA(userAgent);

    await supabaseAdmin.from("demo_clicks").insert({
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      utm_term: utms.utm_term,
      utm_content: utms.utm_content,
      referrer,
      user_agent: truncate(userAgent, 500),
      ip_hash: ipHash,
      is_bot: isBot,
    });

    return NextResponse.json({ logged: true });
  } catch (err) {
    console.error("[demo-click] insert failed:", err);
    return NextResponse.json({ logged: false }, { status: 200 });
  }
}
