# Use a new pgAdmin server in the project

After you create a **new server** in pgAdmin, create the app database and point the project at it.

---

## 1. Create the database

**Option A – Script (recommended)**

1. In **`backend/.env`** set `DATABASE_URL` to your **new server**, with the database name you want (e.g. `cachedigitech`). Use the **same username and password** that work in pgAdmin for that server:
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/cachedigitech
   ```
2. From the backend folder run:
   ```bash
   npm run db:create-local
   ```
   This connects to the default `postgres` database and creates `cachedigitech` (or the name in your URL). If you get "password authentication failed", the password in `.env` does not match the server; set the correct one and try again.

**Option B – pgAdmin**

- Connect to your new server in pgAdmin.
- Right‑click **Databases** → **Create** → **Database**.
- Name it (e.g. `cachedigitech`) and save.

---

## 2. Get the connection details

In pgAdmin, from your **new server** or **database**:

- **Host** and **Port**: in the server’s connection settings (e.g. `localhost`, `5432`).
- **Username**: the login/role (e.g. `postgres` or a user you created).
- **Password**: the one you set for that user.
- **Database**: the name you gave in step 1 (e.g. `cachedigitech`).

Build the URL:

```text
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

Example (localhost):

```text
postgresql://postgres:yourpassword@localhost:5432/cachedigitech
```

---

## 3. Point the project at the new server

In **`backend/.env`** set:

```env
DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

Use the same values as in step 2. This makes the app use the new server.

---

## 4. Load schema and data

**Option A – You have a dump file (`backend-dump.json`)**

1. Put **`backend-dump.json`** in the **`backend`** folder (from `npm run db:dump` on the old DB).
2. In **`backend/.env`** set the **new** server URL (so restore runs against it):
   ```env
   LOCAL_DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
   ```
   (Or set `DATABASE_URL` to this and leave `LOCAL_DATABASE_URL` unset.)
3. From the backend folder run:
   ```bash
   npm run db:restore-local
   ```
   This creates the tables (if missing) and restores data from the dump.
4. In **`backend/.env`** set **`DATABASE_URL`** to the same new server URL (if you used `LOCAL_DATABASE_URL` in step 2, copy that value into `DATABASE_URL`).

**Option B – No dump (fresh database)**

1. In **`backend/.env`** set **`DATABASE_URL`** to the new server URL (as in step 3).
2. Start the backend once:
   ```bash
   cd backend
   npm start
   ```
   The app will create the tables and seed default data (blogs, testimonials, etc.). You can stop it after it has started.

---

## 5. Run the project

Keep **`DATABASE_URL`** in **`backend/.env`** pointing at the new server, then:

```bash
cd backend
npm start
```

The project is now using your new pgAdmin server.
