# CacheDigitech Backend

Backend for the CacheDigitech website. Provides **chat API**, **blog CMS**, and **Latest Highlights** (file-based JSON storage). No database required.

## Run locally

1. Copy **`.env.example`** to **`.env`** in the backend folder and set:
   ```env
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   OPENAI_API_KEY=sk-your-openai-api-key
   ```
   **`DATABASE_URL`** is required for the admin panel (blogs + latest highlights). Tables are created automatically on startup. Optionally run `psql $DATABASE_URL -f schema.sql` once to ensure schema exists.
   If **`OPENAI_API_KEY`** is not set, the chatbot will return "Chat is not configured".

2. Install dependencies and start the server:
   ```bash
   npm install
   npm run dev
   ```

- Backend: http://localhost:3000

## Optional env (chat defaults)

| Variable | Default | Description |
|---------|---------|-------------|
| `CHATBOT_ENABLED` | `true` | Set to `false` to disable chat |
| `CHATBOT_SYSTEM_PROMPT` | (Cache Digitech default) | Override system prompt |
| `CHATBOT_MODEL` | `gpt-4o-mini` | OpenAI model |
| `CHATBOT_MAX_TOKENS` | `512` | Max tokens per reply |
| `CHATBOT_EXPAND_SPEED` | `1.2` | UI expand animation (seconds) |
| `CHATBOT_TEXT_FADE_SPEED` | `0.8` | UI text fade (seconds) |

## Routes

| Route | Description |
|-------|-------------|
| `GET /api/config/chatbot-ui` | Chatbot UI settings |
| `POST /api/chat` | Chat (body: `{ messages: [{ role, content }] }`) |
| `POST /api/chat/stream` | Chat streaming (SSE) |
| `GET/POST/PUT/DELETE /api/blogs` | Blog posts (auth for write) |
| `GET/PUT /api/highlights` | Latest Highlights cards (auth for write) |
| `POST /api/auth/blog-login` | Admin login (email + password) |

## Use a new pgAdmin server

If you created a **new server** (and database) in pgAdmin and want the project to use it, see **[docs/USE-NEW-PGADMIN-SERVER.md](docs/USE-NEW-PGADMIN-SERVER.md)**.

## Migrate DB to localhost

To move the database from a network server to PostgreSQL on your laptop, see **[docs/MIGRATE-DB-TO-LOCALHOST.md](docs/MIGRATE-DB-TO-LOCALHOST.md)**.

## Scripts

- `npm run dev` – start with auto-reload (`--watch`)
- `npm start` – start production server
