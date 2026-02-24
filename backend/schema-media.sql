-- Media library and placements. Run after schema.sql (or add to it).

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  mime_type TEXT,
  size_bytes BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_placement (
  page_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  field_key TEXT NOT NULL,
  media_id UUID REFERENCES media(id) ON DELETE SET NULL,
  PRIMARY KEY (page_id, section_id, field_key)
);

CREATE INDEX IF NOT EXISTS idx_media_placement_media_id ON media_placement(media_id);
