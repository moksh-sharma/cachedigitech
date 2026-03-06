-- Cache Digitech: tables for admin panel (blogs + latest highlights)
-- Run once: psql $DATABASE_URL -f schema.sql

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  author TEXT DEFAULT '',
  date TEXT DEFAULT '',
  category TEXT DEFAULT '',
  read_time TEXT DEFAULT '',
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS highlights (
  id SERIAL PRIMARY KEY,
  image TEXT DEFAULT '',
  tag TEXT DEFAULT '',
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  type TEXT DEFAULT 'Article',
  sort_order INT DEFAULT 0,
  link TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_highlights_sort ON highlights(sort_order);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT DEFAULT '',
  role TEXT DEFAULT '',
  company TEXT DEFAULT '',
  logo TEXT DEFAULT '',
  image TEXT DEFAULT '',
  quote TEXT DEFAULT '',
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS hero_backgrounds (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL DEFAULT '',
  sort_order INT DEFAULT 0
);
