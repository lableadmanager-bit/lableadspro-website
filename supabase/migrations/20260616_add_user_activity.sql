-- User activity log: records what authenticated users actually DO in the
-- database (searches), not logins. Persistent Supabase sessions mean
-- last_sign_in_at goes stale for active users, so login timestamps are a poor
-- engagement signal; this captures real usage and is the foundation for
-- per-seat activity once team accounts exist.
CREATE TABLE IF NOT EXISTS user_activity (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event TEXT NOT NULL,              -- e.g. grant_search, pi_search, company_search
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- "what has this user done lately" + "who was active in the last N days"
CREATE INDEX IF NOT EXISTS idx_user_activity_user_time ON user_activity (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activity_time ON user_activity (created_at DESC);

-- Written and read only by the service role (server APIs / admin). Lock it down:
-- RLS on with no policies = no anon/authenticated access at all. Also revoke
-- the default table grants Supabase auto-assigns to anon/authenticated.
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON user_activity FROM anon, authenticated;
