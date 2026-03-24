-- Add first_name, last_name, and email to subscriptions table
-- These are captured from Stripe Checkout custom fields + customer_details
-- Email is stored here directly for easy marketing list suppression

ALTER TABLE subscriptions
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT;

-- Index on email for quick lookups when suppressing marketing lists
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions (email);

-- Backfill email for any existing subscribers from Supabase Auth
UPDATE subscriptions s
SET email = u.email
FROM auth.users u
WHERE s.user_id = u.id
  AND s.email IS NULL;
