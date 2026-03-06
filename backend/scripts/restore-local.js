/**
 * Restore from backend-dump.json (or backend-dump.sql) into the DB from LOCAL_DATABASE_URL or DATABASE_URL.
 * Run from backend folder: node scripts/restore-local.js
 *
 * For JSON dump (no psql needed):
 * 1. Set LOCAL_DATABASE_URL=postgresql://user:pass@localhost:5432/cachedigitech in .env
 * 2. Start the backend once so tables exist, or create them manually
 * 3. Run: node scripts/restore-local.js
 *
 * For .sql dump: psql must be in PATH; same .env, then run this script.
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, '..', 'backend-dump.json');
const sqlPath = path.join(__dirname, '..', 'backend-dump.sql');

const url = process.env.LOCAL_DATABASE_URL || process.env.DATABASE_URL;
if (!url || !url.startsWith('postgres')) {
  console.error('Set LOCAL_DATABASE_URL or DATABASE_URL in backend/.env (e.g. postgresql://user:pass@localhost:5432/dbname)');
  process.exit(1);
}

const CREATE_TABLES_SQL = `
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
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    phone TEXT DEFAULT '',
    subject TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
`;

async function restoreFromJson() {
  const pool = (await import('../db.js')).default;
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(raw);
  const client = await pool.connect();
  try {
    console.log('Creating tables if not exist...');
    await client.query(CREATE_TABLES_SQL);
    if (data.blogs?.length) {
      await client.query('TRUNCATE blogs RESTART IDENTITY CASCADE');
      for (const row of data.blogs) {
        await client.query(
          `INSERT INTO blogs (title, excerpt, author, date, category, read_time, image)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [row.title ?? '', row.excerpt ?? '', row.author ?? '', row.date ?? '', row.category ?? '', row.read_time ?? '', row.image ?? '']
        );
      }
      console.log('blogs:', data.blogs.length);
    }
    if (data.highlights?.length) {
      await client.query('TRUNCATE highlights RESTART IDENTITY CASCADE');
      for (let i = 0; i < data.highlights.length; i++) {
        const row = data.highlights[i];
        await client.query(
          `INSERT INTO highlights (image, tag, title, description, type, sort_order, link) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [row.image ?? '', row.tag ?? '', row.title ?? '', row.description ?? '', row.type ?? 'Article', row.sort_order ?? i, row.link ?? '']
        );
      }
      console.log('highlights:', data.highlights.length);
    }
    if (data.testimonials?.length) {
      await client.query('TRUNCATE testimonials RESTART IDENTITY CASCADE');
      for (let i = 0; i < data.testimonials.length; i++) {
        const row = data.testimonials[i];
        await client.query(
          `INSERT INTO testimonials (name, role, company, logo, image, quote, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [row.name ?? '', row.role ?? '', row.company ?? '', row.logo ?? '', row.image ?? '', row.quote ?? '', row.sort_order ?? i]
        );
      }
      console.log('testimonials:', data.testimonials.length);
    }
    if (data.hero_backgrounds?.length) {
      await client.query('TRUNCATE hero_backgrounds RESTART IDENTITY CASCADE');
      for (let i = 0; i < data.hero_backgrounds.length; i++) {
        const row = data.hero_backgrounds[i];
        await client.query(
          'INSERT INTO hero_backgrounds (image_url, sort_order) VALUES ($1, $2)',
          [row.image_url ?? '', row.sort_order ?? i]
        );
      }
      console.log('hero_backgrounds:', data.hero_backgrounds.length);
    }
    if (data.contact_submissions?.length) {
      await client.query('TRUNCATE contact_submissions RESTART IDENTITY CASCADE');
      for (const row of data.contact_submissions) {
        await client.query(
          `INSERT INTO contact_submissions (name, email, phone, subject, message, created_at)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            row.name ?? '',
            row.email ?? '',
            row.phone ?? '',
            row.subject ?? '',
            row.message ?? '',
            row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
          ]
        );
      }
      console.log('contact_submissions:', data.contact_submissions.length);
    }
    console.log('Restore done. Set DATABASE_URL to this local URL and restart the backend.');
  } finally {
    client.release();
    await pool.end();
  }
}

function restoreFromSql() {
  console.log('Restoring from backend-dump.sql via psql...');
  const child = spawn('psql', [url, '-f', sqlPath, '-v', 'ON_ERROR_STOP=1'], {
    stdio: 'inherit',
    shell: true,
  });
  child.on('close', (code) => {
    process.exit(code === 0 ? 0 : 1);
  });
}

async function main() {
  if (fs.existsSync(jsonPath)) {
    console.log('Restoring from backend-dump.json into', url.replace(/:[^:@]+@/, ':****@'), '...');
    process.env.DATABASE_URL = url;
    await restoreFromJson();
  } else if (fs.existsSync(sqlPath)) {
    restoreFromSql();
  } else {
    console.error('backend-dump.json or backend-dump.sql not found. Run npm run db:dump first.');
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
