/**
 * Run schema.sql on the database from DATABASE_URL.
 * Run from backend folder: node scripts/run-schema.js
 */
import 'dotenv/config';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set in .env');
  process.exit(1);
}

const schemaPath = path.join(__dirname, '..', 'schema.sql');
const sql = fs.readFileSync(schemaPath, 'utf8').replace(/--.*$/gm, '').trim();

const client = new pg.Client({ connectionString });

async function run() {
  try {
    await client.connect();
    await client.query(sql);
    console.log('Schema applied successfully.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
