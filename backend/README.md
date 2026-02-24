# CacheDigitech Backend

Backend for the CacheDigitech website. Serves the **admin portal** at `/admin` with **login** and a dashboard for stats, configuration, and user management.

## Run locally

1. Set **`.env`** in the backend folder with:
   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/cachewebsite
   SESSION_SECRET=change-me-in-production

   # Hero section chatbot (optional)
   OPENAI_API_KEY=sk-your-openai-api-key
   # OPENAI_CHAT_MODEL=gpt-4o-mini
   ```
   If `OPENAI_API_KEY` is not set, the hero chatbot will return "Chat is not configured".

2. If the database doesn't exist yet:
   ```bash
   cd backend
   node scripts/init-db.js    # creates the database
   node scripts/run-schema.js # creates tables
   ```

3. Start the server:
   ```bash
   npm install
   npm run dev
   ```

- Backend: http://localhost:3000  
- Admin portal: http://localhost:3000/admin  
- **Login page:** http://localhost:3000/admin (redirects to `/admin/login` if not logged in)

## Default login

On first run, a default admin user is created:

- **Email:** `admin@cachedigitech.com`  
- **Password:** `admin123`  

Change this password in production (add a new admin user, then remove the default one via Admin → Manage users if desired).

## Admin portal

- **Admins and users** can sign in at `/admin/login` to manage the website.
- **Admins** can view stats, change configuration, and **manage users** (add/remove).
- **Users** (non-admin) can view stats and change configuration only.

## Scripts

- `npm run dev` – start with auto-reload (`--watch`)
- `npm start` – start production server

## Routes

| Route | Description | Auth |
|-------|-------------|------|
| `GET /admin` | Admin dashboard (redirects to login if not authenticated) | — |
| `GET /admin/login` | Login page | Public |
| `POST /api/auth/login` | Sign in (body: `{ email, password }`) | Public |
| `POST /api/auth/logout` | Sign out | Public |
| `GET /api/auth/me` | Current user | Session |
| `GET /api/stats` | Website stats | Logged in |
| `POST /api/stats/view` | Record a page view | Public |
| `GET /api/config` | Get configuration | Logged in |
| `PUT /api/config` | Update configuration | Logged in |
| `GET /api/users` | List users | Admin only |
| `POST /api/users` | Add user (body: `email`, `password`, `name?`, `role?`) | Admin only |
| `DELETE /api/users/:id` | Remove user | Admin only |
| `POST /api/chat` | Hero chatbot (body: `{ messages: [{ role, content }] }`) | Public (uses `OPENAI_API_KEY`) |

## Data (PostgreSQL)

Config, stats, users, and CMS content are stored in PostgreSQL. Tables: `config`, `stats`, `users`, `content`. Schema is in **`schema.sql`** (run once via `node scripts/run-schema.js` or psql/pgAdmin).

- **data/content-schema.json** – CMS section definitions (read at runtime)  
- **data/content-seed.json** – default content for “Load website defaults” in admin  

Set `SESSION_SECRET` and `DATABASE_URL` in production.

## Deploying so "website(url)/admin" works

1. Deploy the backend (Node on your host or a separate service).
2. Configure your web server so `/admin` and `/api` are proxied to the backend.

Example (Nginx):

```nginx
location /admin { proxy_pass http://localhost:3000; }
location /api/   { proxy_pass http://localhost:3000; }
```

Then **yourdomain.com/admin** shows the login page, and **yourdomain.com/admin** (after login) is the dashboard.
