-- Queryable logs of funnel activity. Prior to this, sample requests only hit
-- Vercel console + Telegram, and demo CTA clicks were only captured in GA4.

CREATE TABLE IF NOT EXISTS sample_requests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  states TEXT[] NOT NULL,
  state_count INT NOT NULL,
  neverbounce_result TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  is_bot BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sample_requests_email ON sample_requests (email);
CREATE INDEX IF NOT EXISTS idx_sample_requests_created_at ON sample_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sample_requests_utm_source ON sample_requests (utm_source) WHERE utm_source IS NOT NULL;

CREATE TABLE IF NOT EXISTS demo_clicks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  is_bot BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_demo_clicks_created_at ON demo_clicks (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_clicks_utm_source ON demo_clicks (utm_source) WHERE utm_source IS NOT NULL;

-- Both tables are server-write only via service-role key.
-- RLS is enabled with no public policies so anon/authenticated cannot read them.
ALTER TABLE sample_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_clicks ENABLE ROW LEVEL SECURITY;

-- Extend the existing email webhook log with a bot flag. The flag is set at
-- insert time using the click/open user agent plus a <3s-since-delivery
-- heuristic for corporate link scanners (Outlook ATP, Mimecast, etc.).
ALTER TABLE email_webhook_events
  ADD COLUMN IF NOT EXISTS is_bot BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_email_webhook_events_bot_human
  ON email_webhook_events (event_type, created_at DESC)
  WHERE is_bot = FALSE;
