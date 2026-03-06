/**
 * Dump the current database (from DATABASE_URL in .env) to backend-dump.json.
 * Uses the app's pg connection — no pg_dump required.
 * Run from backend folder: node scripts/dump-db.js
 */
import 'dotenv/config';
import pool from '../db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dumpPath = path.join(__dirname, '..', 'backend-dump.json');

const url = process.env.DATABASE_URL;
if (!url || !url.startsWith('postgres')) {
  console.error('DATABASE_URL is required. Set it in backend/.env');
  process.exit(1);
}

const TABLES = [
  { name: 'blogs', orderBy: 'id' },
  { name: 'highlights', orderBy: 'sort_order, id' },
  { name: 'testimonials', orderBy: 'sort_order, id' },
  { name: 'hero_backgrounds', orderBy: 'sort_order, id' },
  { name: 'contact_submissions', orderBy: 'created_at DESC' },
];

async function main() {
  const client = await pool.connect();
  const out = {};
  try {
    for (const { name, orderBy } of TABLES) {
      const res = await client.query(`SELECT * FROM ${name} ORDER BY ${orderBy}`);
      out[name] = res.rows;
      console.log(name + ':', res.rows.length, 'rows');
    }
    fs.writeFileSync(dumpPath, JSON.stringify(out, null, 2), 'utf8');
    console.log('Written to', dumpPath);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
