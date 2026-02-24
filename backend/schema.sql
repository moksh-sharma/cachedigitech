-- CacheDigitech backend: initial schema for PostgreSQL
-- Run once on your database (e.g. psql or pgAdmin) on the cachewebsite database.

-- Config: single row
CREATE TABLE IF NOT EXISTS config (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_config CHECK (id = 1)
);

-- Stats: single row
CREATE TABLE IF NOT EXISTS stats (
  id INT PRIMARY KEY DEFAULT 1,
  total_page_views BIGINT DEFAULT 0,
  unique_visitors BIGINT DEFAULT 0,
  page_views_by_path JSONB DEFAULT '{}',
  last_updated TIMESTAMPTZ,
  CONSTRAINT single_stats CHECK (id = 1)
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content: one row per (page_id, section_id)
CREATE TABLE IF NOT EXISTS content (
  page_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (page_id, section_id)
);

-- Index for user lookup by email (case-insensitive)
CREATE INDEX IF NOT EXISTS idx_users_email ON users (LOWER(email));

-- Media library and placements
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

-- RAG knowledge base documents (metadata only; vectors live in Pinecone)
CREATE TABLE IF NOT EXISTS rag_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  chunk_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
