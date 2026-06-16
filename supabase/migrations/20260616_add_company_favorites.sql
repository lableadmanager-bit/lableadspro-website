-- Company favorites: links users to companies they've saved.
-- Separate from the grant `favorites` table (per George): a rep's saved
-- companies are a distinct list from their saved grants.
CREATE TABLE IF NOT EXISTS company_favorites (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- A user can only favorite a company once
CREATE UNIQUE INDEX IF NOT EXISTS idx_company_favorites_user_company ON company_favorites (user_id, company_id);

-- Fast "show me all my favorites"
CREATE INDEX IF NOT EXISTS idx_company_favorites_user ON company_favorites (user_id);

-- RLS: users only see/modify their own favorites
ALTER TABLE company_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own company favorites"
  ON company_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own company favorites"
  ON company_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own company favorites"
  ON company_favorites FOR DELETE
  USING (auth.uid() = user_id);
