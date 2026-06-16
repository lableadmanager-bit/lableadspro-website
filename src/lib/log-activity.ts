import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Record an authenticated user's in-app activity (search, etc.).
 *
 * Engagement signal that survives persistent sessions: users stay auto-logged-in
 * for weeks, so last_sign_in_at goes stale — this fires on every real use.
 *
 * Fire-and-forget by design: never block or break the API call it's attached to.
 * Pass the already-resolved user id (null/undefined = skip).
 */
export async function logUserActivity(
  userId: string | null | undefined,
  event: string
): Promise<void> {
  if (!userId) return;
  try {
    await supabaseAdmin.from("user_activity").insert({ user_id: userId, event });
  } catch {
    // Activity logging must never affect the user-facing request.
  }
}
