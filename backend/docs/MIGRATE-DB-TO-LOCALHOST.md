# Migrate PostgreSQL from network to localhost

Use this guide to move your app’s database from a remote (network) PostgreSQL server to a PostgreSQL instance on your laptop.

---

## 1. Install PostgreSQL on your laptop (if needed)

- **Windows:** [PostgreSQL Windows installer](https://www.postgresql.org/download/windows/)
- **macOS:** `brew install postgresql@16` then `brew services start postgresql@16`
- **Linux:** `sudo apt install postgresql postgresql-client` (or your distro’s package)

Ensure the PostgreSQL service is running and you can open a shell: `psql -U postgres`.

---

## 2. Create a local database and user (optional)

```bash
# Open psql as postgres (or your admin user)
psql -U postgres

# In psql:
CREATE USER cachedigitech WITH PASSWORD 'your_local_password';
CREATE DATABASE cachedigitech OWNER cachedigitech;
\q
```

Or use the default `postgres` user and an existing database.

---

## 3. Export (dump) the database from the network server

**Option: use the project script (no pg_dump needed; uses Node + pg):**

```bash
cd backend
npm run db:dump
```

This creates **`backend/backend-dump.json`**. It uses `DATABASE_URL` from `.env`, so you must run it from a machine that can reach that database (e.g. on the network server if your laptop cannot connect). Copy **`backend-dump.json`** to your laptop’s `backend` folder.

**Manual commands:**

From your laptop, run **one** of the following. Replace the placeholders with your **current (network)** `DATABASE_URL` values.

**Option A – Plain SQL dump (recommended, portable):**

```bash
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
pg_dump "postgresql://USER:PASSWORD@NETWORK_HOST:5432/DATABASE_NAME" --no-owner --no-acl -f backend-dump.sql
```

**Option B – Custom format (smaller, good for restore):**

```bash
pg_dump "postgresql://USER:PASSWORD@NETWORK_HOST:5432/DATABASE_NAME" --no-owner --no-acl -Fc -f backend-dump.dump
```

**PowerShell (Windows)** – same idea, escape the connection string if needed:

```powershell
$env:PGPASSWORD = "your_network_password"
pg_dump -h NETWORK_HOST -p 5432 -U USER -d DATABASE_NAME --no-owner --no-acl -f backend-dump.sql
```

- If the network DB is not reachable from your laptop (e.g. VPN, firewall), run `pg_dump` on the **network server** and copy `backend-dump.sql` (or `backend-dump.dump`) to your laptop.

---

## 4. Import (restore) into local PostgreSQL

**Option: use the project script**

1. Put **`backend-dump.json`** (or **`backend-dump.sql`**) in the **`backend`** folder (if you copied it from elsewhere).
2. In **`backend/.env`** set your local URL (you can leave `DATABASE_URL` as the network one for now):
   ```env
   LOCAL_DATABASE_URL=postgresql://cachedigitech:your_local_password@localhost:5432/cachedigitech
   ```
3. Start the backend once so tables exist: `npm start` (then stop it), or create the DB and run the app.
4. Run:
   ```bash
   cd backend
   npm run db:restore-local
   ```
   (Uses Node for `.json` dumps — no psql required. For `.sql` dumps, psql must be in PATH.)

**Manual commands:**

**If you used Option A (plain SQL):**

```bash
psql "postgresql://cachedigitech:your_local_password@localhost:5432/cachedigitech" -f backend-dump.sql
```

**If you used Option B (custom format):**

```bash
pg_restore --no-owner --no-acl -d "postgresql://cachedigitech:your_local_password@localhost:5432/cachedigitech" backend-dump.dump
```

**PowerShell (Windows):**

```powershell
$env:PGPASSWORD = "your_local_password"
psql -h localhost -p 5432 -U cachedigitech -d cachedigitech -f backend-dump.sql
```

---

## 5. Point the app to localhost

In **`backend/.env`** set:

```env
DATABASE_URL=postgresql://cachedigitech:your_local_password@localhost:5432/cachedigitech
```

Use the same user, password, and database name you used in step 4.

---

## 6. Restart the backend and verify

```bash
cd backend
npm start
```

- Open the app and check blogs, highlights, admin panel, etc.
- If the backend fails with “relation does not exist”, run the app once so it creates tables, then restore again, or restore with `--clean` (drops objects before restore):

  ```bash
  psql "postgresql://cachedigitech:your_local_password@localhost:5432/cachedigitech" --set ON_ERROR_STOP=on -f backend-dump.sql
  ```

  For a fresh local DB, the server’s `initDb()` will create tables; then restore **data** only, or restore a full dump into an empty DB.

---

## Quick reference

| Step | From (network) | To (localhost) |
|------|-----------------|----------------|
| Dump | `pg_dump "postgresql://user:pass@NETWORK_HOST:5432/dbname" --no-owner --no-acl -f backend-dump.sql` | — |
| Restore | — | `psql "postgresql://user:pass@localhost:5432/dbname" -f backend-dump.sql` |
| App config | `DATABASE_URL=...@NETWORK_HOST:5432/...` | `DATABASE_URL=...@localhost:5432/...` |

---

## Troubleshooting

- **`pg_dump: command not found`**  
  Add the PostgreSQL `bin` directory to your PATH, or use the full path (e.g. `"C:\Program Files\PostgreSQL\16\bin\pg_dump.exe"`).

- **Connection refused to network host**  
  Run `pg_dump` from a machine that can reach the DB (e.g. on the server), then copy the dump file to your laptop and run `psql` / `pg_restore` locally.

- **SSL / certificate errors**  
  For dump/restore you can try (only for migration):  
  `pg_dump "postgresql://...?sslmode=require"` or set `PGSSLMODE=require`.

- **Tables already exist / conflict**  
  Restore into an empty database, or use `pg_restore --clean` (custom format) so existing objects are dropped before restore.
