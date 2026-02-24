/**
 * One-time script: create the database from DATABASE_URL if it doesn't exist.
 * Run from backend folder: node scripts/init-db.js
 */
import 'dotenv/config';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set in .env');
  process.exit(1);
}

// Parse database name from URL (path after last /, no query string)
const url = new URL(connectionString.replace('postgresql://', 'https://'));
const dbName = url.pathname.replace(/^\//, '').replace(/\/.*$/, '') || 'postgres';

if (dbName === 'postgres') {
  console.log('DATABASE_URL points to default database "postgres". No need to create.');
  process.exit(0);
}

// Connect to default "postgres" database to create the target DB
const baseUrl = connectionString.replace(/\/[^/]*(\?.*)?$/, '/postgres');
const client = new pg.Client({ connectionString: baseUrl });

async function run() {
  try {
    await client.connect();
    const r = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (r.rows.length > 0) {
      console.log(`Database "${dbName}" already exists.`);
      return;
    }
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database "${dbName}" created. Run schema.sql on it if you haven't yet.`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
