/**
 * Create the app database locally if it doesn't exist.
 * Uses DATABASE_URL from .env: connects to the "postgres" maintenance DB and creates the target database.
 * Run from backend folder: node scripts/create-local-db.js
 */
import 'dotenv/config';
import pg from 'pg';

const url = process.env.DATABASE_URL;
if (!url || !url.startsWith('postgres')) {
  console.error('DATABASE_URL is required in backend/.env');
  process.exit(1);
}

let parsed;
try {
  parsed = new URL(url);
} catch {
  console.error('Invalid DATABASE_URL');
  process.exit(1);
}

const dbName = (parsed.pathname || '/').replace(/^\//, '').split('?')[0] || 'postgres';
if (dbName === 'postgres') {
  console.error('DATABASE_URL should point to the app database (e.g. cachedigitech), not the postgres maintenance DB.');
  process.exit(1);
}

// Connect to the default "postgres" database to create the app database
parsed.pathname = '/postgres';
const maintenanceUrl = parsed.toString();
const client = new pg.Client({ connectionString: maintenanceUrl });

async function main() {
  try {
    await client.connect();
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );
    if (res.rows.length > 0) {
      console.log('Database', dbName, 'already exists.');
      return;
    }
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log('Created database:', dbName);
  } catch (e) {
    if (e.code === '42P04') {
      console.log('Database', dbName, 'already exists.');
    } else {
      console.error('Failed to create database:', e.message);
      if (e.code === '28P01') {
        console.error('Tip: Check that the password in DATABASE_URL matches your PostgreSQL postgres user (e.g. in pgAdmin).');
      }
      process.exit(1);
    }
  } finally {
    await client.end();
  }
}

main();
