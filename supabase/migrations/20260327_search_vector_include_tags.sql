-- Add equipment tags to the search_vector so keyword searches also match tags.
-- Tags like "confocal-microscope" become searchable as "confocal microscope".

-- 1. Create or replace the trigger function to include equipment_tags in search_vector
CREATE OR REPLACE FUNCTION grants_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.pi_name, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.institution, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.abstract, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(replace(array_to_string(NEW.equipment_tags, ' '), '-', ' '), '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Create the trigger if it doesn't exist (drop first to be safe)
DROP TRIGGER IF EXISTS grants_search_vector_trigger ON grants;
CREATE TRIGGER grants_search_vector_trigger
  BEFORE INSERT OR UPDATE ON grants
  FOR EACH ROW
  EXECUTE FUNCTION grants_search_vector_update();

-- 3. Backfill: update search_vector for all existing grants that have equipment_tags
-- This will fire the trigger for each row
UPDATE grants SET search_vector =
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(pi_name, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(institution, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(abstract, '')), 'C') ||
  setweight(to_tsvector('english', coalesce(replace(array_to_string(equipment_tags, ' '), '-', ' '), '')), 'B')
WHERE equipment_tags IS NOT NULL AND array_length(equipment_tags, 1) > 0;
