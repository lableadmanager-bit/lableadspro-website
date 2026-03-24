-- Favorites table: links users to grants they've saved
-- One table for all users; each row scoped by user_id
CREATE TABLE IF NOT EXISTS favorites (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  grant_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique constraint: a user can only favorite a grant once
CREATE UNIQUE INDEX IF NOT EXISTS idx_favorites_user_grant ON favorites (user_id, grant_id);

-- Fast lookup: "show me all my favorites"
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites (user_id);

-- Enable RLS so users can only see/modify their own favorites
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);
