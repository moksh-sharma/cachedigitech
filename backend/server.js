import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import fs from 'fs';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import pool from './db.js';

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

const pineconeApiKey = process.env.PINECONE_API_KEY;
const pinecone = pineconeApiKey ? new Pinecone({ apiKey: pineconeApiKey }) : null;

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIM = 1536;
const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 50;

const require = createRequire(import.meta.url);
const session = require('express-session');
const { PDFParse } = require('pdf-parse');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me-in-production';

const contentSchemaPath = path.join(DATA_DIR, 'content-schema.json');
const contentSeedPath = path.join(DATA_DIR, 'content-seed.json');
const mediaPlacementsPath = path.join(DATA_DIR, 'media-placements.json');

const RAG_DIR = path.join(__dirname, 'uploads', 'rag');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(RAG_DIR)) fs.mkdirSync(RAG_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

// --------------- RAG: multer for PDFs ---------------
const ragStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, RAG_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.pdf';
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
    cb(null, name);
  },
});
const ragUpload = multer({
  storage: ragStorage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'), false);
  },
});

// --------------- RAG: helpers ---------------
function chunkText(text, size, overlap) {
  const s = size || CHUNK_SIZE;
  const o = overlap || CHUNK_OVERLAP;
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + s, text.length);
    const chunk = text.slice(start, end).trim();
    if (chunk.length > 0) chunks.push(chunk);
    if (end >= text.length) break;
    start = end - o;
  }
  return chunks;
}

async function embedTexts(texts) {
  if (!openai) throw new Error('OPENAI_API_KEY is not set');
  const res = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: texts });
  return res.data.map((d) => d.embedding);
}

function getPineconeIndex(indexName) {
  if (!pinecone || !indexName) return null;
  try { return pinecone.index(indexName); } catch { return null; }
}

async function upsertChunksToPinecone(index, docId, chunks, embeddings) {
  const records = chunks.map((text, i) => ({
    id: `${docId}_${i}`,
    values: embeddings[i],
    metadata: { doc_id: docId, text },
  })).filter((v) => v.values && v.values.length > 0);
  if (records.length === 0) throw new Error('No valid vectors to upsert.');
  // Pinecone upsert limit is 100 vectors at a time
  for (let i = 0; i < records.length; i += 100) {
    await index.upsert({ records: records.slice(i, i + 100) });
  }
}

async function queryPinecone(index, queryEmbedding, topK) {
  const res = await index.query({ vector: queryEmbedding, topK: topK || 5, includeMetadata: true });
  return (res.matches || []).map((m) => m.metadata?.text || '').filter(Boolean);
}

async function deleteDocFromPinecone(index, docId) {
  try {
    // Use prefix-based delete: all vector IDs start with docId_
    const prefix = `${docId}_`;
    // List then delete in batches
    let done = false;
    while (!done) {
      const listed = await index.listPaginated({ prefix, limit: 100 });
      const ids = (listed.vectors || []).map((v) => v.id);
      if (ids.length === 0) { done = true; break; }
      await index.deleteMany(ids);
      if (!listed.pagination?.next) done = true;
    }
  } catch (e) {
    console.error('Pinecone delete error:', e.message);
  }
}

// --------------- DB: Config ---------------
async function getConfig() {
  const r = await pool.query('SELECT data FROM config WHERE id = 1');
  if (!r.rows[0]) return null;
  return r.rows[0].data || {};
}

async function setConfig(data) {
  await pool.query(
    `INSERT INTO config (id, data, updated_at) VALUES (1, $1::jsonb, NOW())
     ON CONFLICT (id) DO UPDATE SET data = $1::jsonb, updated_at = NOW()`,
    [JSON.stringify(data)]
  );
  return data;
}

// --------------- DB: Stats ---------------
async function getStats() {
  const r = await pool.query('SELECT total_page_views, unique_visitors, page_views_by_path, last_updated FROM stats WHERE id = 1');
  if (!r.rows[0]) return null;
  const row = r.rows[0];
  return {
    totalPageViews: Number(row.total_page_views) || 0,
    uniqueVisitors: Number(row.unique_visitors) || 0,
    pageViewsByPath: row.page_views_by_path || {},
    lastUpdated: row.last_updated ? row.last_updated.toISOString() : null,
  };
}

// --------------- DB: Users ---------------
async function getUsers() {
  const r = await pool.query('SELECT id, email, password_hash, name, role, created_at FROM users ORDER BY created_at');
  return r.rows.map((row) => ({
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    role: row.role,
    createdAt: row.created_at ? row.created_at.toISOString() : null,
  }));
}

async function getUserByEmail(email) {
  const r = await pool.query('SELECT id, email, password_hash, name, role, created_at FROM users WHERE LOWER(email) = LOWER($1)', [email]);
  const row = r.rows[0];
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    role: row.role,
    createdAt: row.created_at ? row.created_at.toISOString() : null,
  };
}

async function insertUser(user) {
  await pool.query(
    'INSERT INTO users (id, email, password_hash, name, role) VALUES ($1, $2, $3, $4, $5)',
    [user.id, user.email, user.passwordHash, user.name, user.role]
  );
}

async function deleteUserById(id) {
  const r = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  return r.rowCount > 0;
}

// --------------- DB: Content ---------------
async function getContentMap() {
  const r = await pool.query('SELECT page_id, section_id, data FROM content');
  const map = {};
  for (const row of r.rows) {
    if (!map[row.page_id]) map[row.page_id] = {};
    map[row.page_id][row.section_id] = row.data || {};
  }
  return map;
}

async function upsertContentSection(pageId, sectionId, data) {
  await pool.query(
    `INSERT INTO content (page_id, section_id, data, updated_at)
     VALUES ($1, $2, $3::jsonb, NOW())
     ON CONFLICT (page_id, section_id) DO UPDATE SET
       data = content.data || $3::jsonb,
       updated_at = NOW()`,
    [pageId, sectionId, JSON.stringify(data)]
  );
  const r = await pool.query('SELECT data FROM content WHERE page_id = $1 AND section_id = $2', [pageId, sectionId]);
  return r.rows[0]?.data || {};
}

async function seedContentFromSeedFile() {
  const seed = readJson(contentSeedPath) || {};
  let merged = 0;
  const content = await getContentMap();
  for (const pageId of Object.keys(seed)) {
    for (const sectionId of Object.keys(seed[pageId] || {})) {
      const existing = content[pageId]?.[sectionId] || {};
      const seedSection = seed[pageId][sectionId] || {};
      const toMerge = {};
      for (const [field, value] of Object.entries(seedSection)) {
        const current = existing[field];
        if (current === undefined || current === null || String(current).trim() === '') {
          toMerge[field] = value;
          merged++;
        }
      }
      if (Object.keys(toMerge).length > 0) {
        await upsertContentSection(pageId, sectionId, toMerge);
      }
    }
  }
  return merged;
}

// --------------- Bootstrap ---------------
async function ensureBootstrap() {
  // Ensure rag_documents table exists with all columns
  await pool.query(`
    CREATE TABLE IF NOT EXISTS rag_documents (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL DEFAULT '',
      file_path TEXT NOT NULL DEFAULT '',
      chunk_count INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  // Add columns if table was created by an older version
  await pool.query(`ALTER TABLE rag_documents ADD COLUMN IF NOT EXISTS file_path TEXT NOT NULL DEFAULT ''`).catch(() => {});
  await pool.query(`ALTER TABLE rag_documents ADD COLUMN IF NOT EXISTS chunk_count INT DEFAULT 0`).catch(() => {});

  const config = await getConfig();
  if (!config || Object.keys(config).length === 0) {
    await setConfig({
      siteName: 'CacheDigitech',
      maintenanceMode: false,
      contactEmail: '',
      analyticsEnabled: true,
      featuredSections: ['hero', 'services', 'insights'],
      updatedAt: new Date().toISOString(),
    });
  }

  const stats = await getStats();
  if (!stats) {
    await pool.query(
      `INSERT INTO stats (id, total_page_views, unique_visitors, page_views_by_path, last_updated)
       VALUES (1, 0, 0, '{}'::jsonb, NOW()) ON CONFLICT (id) DO NOTHING`
    );
  }

  const users = await getUsers();
  if (users.length === 0) {
    const defaultHash = bcrypt.hashSync('admin123', 10);
    await insertUser({
      id: 'admin-default',
      email: 'admin@cachedigitech.com',
      passwordHash: defaultHash,
      name: 'Admin',
      role: 'admin',
    });
  }

  const contentMap = await getContentMap();
  const schema = readJson(contentSchemaPath);
  if (schema?.pages && Object.keys(contentMap).length === 0) {
    const seed = readJson(contentSeedPath) || {};
    for (const page of schema.pages) {
      for (const sec of page.sections || []) {
        const seedSection = seed[page.id]?.[sec.id] || {};
        const data = {};
        for (const f of sec.fields || []) {
          data[f] = seedSection[f] != null ? String(seedSection[f]) : '';
        }
        await upsertContentSection(page.id, sec.id, data);
      }
    }
  }
}

// Session config (cookie-based)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
  })
);

function requireAuth(req, res, next) {
  if (req.session?.user) return next();
  if (req.path.startsWith('/api/')) return res.status(401).json({ error: 'Unauthorized' });
  return res.redirect('/admin/login');
}

function requireAdmin(req, res, next) {
  if (req.session?.user?.role === 'admin') return next();
  if (req.path.startsWith('/api/')) return res.status(403).json({ error: 'Forbidden' });
  return res.redirect('/admin');
}

// --------------- Auth API ---------------
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = await getUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  req.session.user = { id: user.id, email: user.email, name: user.name, role: user.role };
  req.session.save((err) => {
    if (err) return res.status(500).json({ error: 'Session error' });
    res.json({ user: req.session.user });
  });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/auth/me', (req, res) => {
  if (!req.session?.user) return res.status(401).json({ error: 'Not logged in' });
  res.json({ user: req.session.user });
});

// --------------- API: Stats ---------------
app.get('/api/stats', requireAuth, async (req, res) => {
  const stats = await getStats();
  res.json(stats || { totalPageViews: 0, uniqueVisitors: 0, pageViewsByPath: {}, lastUpdated: null });
});

app.post('/api/stats/view', async (req, res) => {
  const pathName = req.body?.path || req.query?.path || '/';
  await pool.query(
    `INSERT INTO stats (id, total_page_views, unique_visitors, page_views_by_path, last_updated)
     VALUES (1, 1, 0, jsonb_build_object($1::text, 1), NOW())
     ON CONFLICT (id) DO UPDATE SET
       total_page_views = stats.total_page_views + 1,
       page_views_by_path = jsonb_set(
         COALESCE(stats.page_views_by_path, '{}'::jsonb),
         ARRAY[$1::text],
         to_jsonb(COALESCE((stats.page_views_by_path->$1::text)::int, 0) + 1)
       ),
       last_updated = NOW()`,
    [pathName]
  );
  res.json({ ok: true });
});

// --------------- API: Config ---------------
// Public: exposes only chatbot UI settings (animation speeds, enabled state)
app.get('/api/config/chatbot-ui', async (req, res) => {
  try {
    const config = await getConfig();
    const c = config?.chatbot || {};
    res.json({
      enabled: c.enabled !== false,
      expandSpeed: c.expandSpeed || 1.2,
      textFadeSpeed: c.textFadeSpeed || 0.8,
    });
  } catch (e) {
    res.json({ enabled: true, expandSpeed: 1.2, textFadeSpeed: 0.8 });
  }
});

app.get('/api/config', requireAuth, async (req, res) => {
  const config = await getConfig();
  res.json(config || {});
});

app.put('/api/config', requireAuth, async (req, res) => {
  const current = await getConfig();
  const updated = { ...(current || {}), ...req.body, updatedAt: new Date().toISOString() };
  await setConfig(updated);
  res.json(updated);
});

// --------------- API: Users ---------------
app.get('/api/users', requireAuth, requireAdmin, async (req, res) => {
  const users = await getUsers();
  res.json(users.map(({ passwordHash, ...u }) => u));
});

app.post('/api/users', requireAuth, requireAdmin, async (req, res) => {
  const { email, password, name, role } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = await getUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'User with this email already exists' });
  const newUser = {
    id: 'user-' + Date.now(),
    email: email.trim().toLowerCase(),
    passwordHash: bcrypt.hashSync(password, 10),
    name: (name || email).trim(),
    role: role === 'admin' ? 'admin' : 'user',
  };
  await insertUser(newUser);
  res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role });
});

app.delete('/api/users/:id', requireAuth, requireAdmin, async (req, res) => {
  const deleted = await deleteUserById(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'User not found' });
  res.json({ ok: true });
});

// --------------- API: Content ---------------
app.get('/api/content/schema', requireAuth, (req, res) => {
  const schema = readJson(contentSchemaPath);
  if (!schema) return res.status(500).json({ error: 'Schema not found' });
  res.json(schema);
});

async function getMergedContent() {
  const content = await getContentMap();
  const schema = readJson(contentSchemaPath);
  if (!schema?.pages) return content;
  const merged = {};
  for (const page of schema.pages) {
    merged[page.id] = merged[page.id] || {};
    for (const sec of page.sections || []) {
      merged[page.id][sec.id] = { ...(content[page.id]?.[sec.id] || {}) };
      for (const f of sec.fields || []) {
        if (merged[page.id][sec.id][f] === undefined) merged[page.id][sec.id][f] = '';
      }
    }
  }
  return merged;
}

app.get('/api/content', async (req, res) => {
  const content = await getMergedContent();
  res.json(content);
});

app.get('/api/content/editable', requireAuth, async (req, res) => {
  const content = await getMergedContent();
  res.json(content);
});

app.put('/api/content', requireAuth, async (req, res) => {
  const { pageId, sectionId, data } = req.body || {};
  if (!pageId || !sectionId || typeof data !== 'object') {
    return res.status(400).json({ error: 'pageId, sectionId, and data required' });
  }
  const updated = { ...data, updatedAt: new Date().toISOString() };
  const result = await upsertContentSection(pageId, sectionId, updated);
  res.json(result);
});

app.post('/api/content/seed', requireAuth, async (req, res) => {
  const merged = await seedContentFromSeedFile();
  res.json({ ok: true, merged });
});

// --------------- API: Chat (hero section chatbot, uses OPENAI_API_KEY + config.chatbot) ---------------
const CHAT_SYSTEM_PROMPT_DEFAULT = `You are the System Assistant for Cache Digitech, a company that provides operational excellence, cloud infrastructure, and intelligent interfaces. You help visitors with questions about services, deployments, and technology. Keep replies concise, professional, and helpful.`;

app.post('/api/chat', async (req, res) => {
  const config = await getConfig();
  const chatbot = config?.chatbot || {};
  if (chatbot.enabled === false) {
    return res.status(503).json({ error: 'Chat is disabled in admin settings.' });
  }
  if (!openai) {
    return res.status(503).json({ error: 'Chat is not configured. Set OPENAI_API_KEY in the server environment.' });
  }
  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }
  const lastMsg = messages[messages.length - 1];
  if (!lastMsg?.content || typeof lastMsg.content !== 'string') {
    return res.status(400).json({ error: 'Last message must have content' });
  }
  let systemPrompt = (chatbot.systemPrompt && String(chatbot.systemPrompt).trim()) || CHAT_SYSTEM_PROMPT_DEFAULT;
  const model = (chatbot.model && String(chatbot.model).trim()) || process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

  // Optional RAG: retrieve knowledge base context from Pinecone
  if (chatbot.ragEnabled === true) {
    const indexName = (chatbot.pineconeIndex && String(chatbot.pineconeIndex).trim()) || process.env.PINECONE_INDEX;
    const index = getPineconeIndex(indexName);
    if (index && openai) {
      try {
        const topK = Number(chatbot.ragTopK) || 5;
        const queryText = lastMsg.content;
        const [queryEmb] = await embedTexts([queryText]);
        const contexts = await queryPinecone(index, queryEmb, topK);
        if (contexts.length > 0) {
          const contextBlock = contexts.map((c, i) => `[${i + 1}] ${c}`).join('\n\n');
          systemPrompt += `\n\nUse the following knowledge base excerpts when relevant to the user\'s question. If the excerpts are not relevant, answer from your general knowledge.\n\n${contextBlock}`;
        }
      } catch (ragErr) {
        console.error('RAG retrieval error (falling back to non-RAG):', ragErr.message);
      }
    }
  }

  try {
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content) })),
    ];
    const completion = await openai.chat.completions.create({
      model,
      messages: apiMessages,
      max_tokens: Number(chatbot.maxTokens) || 512,
    });
    const reply = completion.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';
    res.json({ reply });
  } catch (e) {
    console.error('OpenAI chat error:', e.message);
    const status = e.status === 401 ? 401 : e.status === 429 ? 429 : 500;
    res.status(status).json({ error: e.message || 'Chat request failed.' });
  }
});

// --------------- API: Chat Stream (SSE) ---------------
app.post('/api/chat/stream', async (req, res) => {
  const config = await getConfig();
  const chatbot = config?.chatbot || {};
  if (chatbot.enabled === false) {
    return res.status(503).json({ error: 'Chat is disabled in admin settings.' });
  }
  if (!openai) {
    return res.status(503).json({ error: 'Chat is not configured. Set OPENAI_API_KEY in the server environment.' });
  }
  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }
  const lastMsg = messages[messages.length - 1];
  if (!lastMsg?.content || typeof lastMsg.content !== 'string') {
    return res.status(400).json({ error: 'Last message must have content' });
  }
  let systemPrompt = (chatbot.systemPrompt && String(chatbot.systemPrompt).trim()) || CHAT_SYSTEM_PROMPT_DEFAULT;
  const model = (chatbot.model && String(chatbot.model).trim()) || process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

  // Optional RAG
  if (chatbot.ragEnabled === true) {
    const indexName = (chatbot.pineconeIndex && String(chatbot.pineconeIndex).trim()) || process.env.PINECONE_INDEX;
    const index = getPineconeIndex(indexName);
    if (index && openai) {
      try {
        const topK = Number(chatbot.ragTopK) || 5;
        const [queryEmb] = await embedTexts([lastMsg.content]);
        const contexts = await queryPinecone(index, queryEmb, topK);
        if (contexts.length > 0) {
          const contextBlock = contexts.map((c, i) => `[${i + 1}] ${c}`).join('\n\n');
          systemPrompt += `\n\nUse the following knowledge base excerpts when relevant to the user\'s question. If the excerpts are not relevant, answer from your general knowledge.\n\n${contextBlock}`;
        }
      } catch (ragErr) {
        console.error('RAG retrieval error (falling back to non-RAG):', ragErr.message);
      }
    }
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content) })),
    ];
    const stream = await openai.chat.completions.create({
      model,
      messages: apiMessages,
      max_tokens: Number(chatbot.maxTokens) || 512,
      stream: true,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content;
      if (delta) {
        res.write(`data: ${JSON.stringify({ token: delta })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (e) {
    console.error('OpenAI stream error:', e.message);
    res.write(`data: ${JSON.stringify({ error: e.message || 'Stream failed' })}\n\n`);
    res.end();
  }
});

// --------------- API: RAG Documents ---------------
app.get('/api/rag/documents', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name, chunk_count, created_at FROM rag_documents ORDER BY created_at DESC');
    res.json(rows.map((r) => ({ id: r.id, name: r.name, chunkCount: r.chunk_count || 0, createdAt: r.created_at?.toISOString() || null })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/rag/documents', requireAuth, ragUpload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'A PDF file is required.' });

  const config = await getConfig();
  const chatbot = config?.chatbot || {};
  const indexName = (chatbot.pineconeIndex && String(chatbot.pineconeIndex).trim()) || process.env.PINECONE_INDEX;
  const index = getPineconeIndex(indexName);
  if (!index) {
    try { fs.unlinkSync(path.join(RAG_DIR, req.file.filename)); } catch {}
    return res.status(503).json({ error: 'Pinecone is not configured. Set PINECONE_API_KEY and a Pinecone index name (admin settings or PINECONE_INDEX env var).' });
  }
  if (!openai) {
    try { fs.unlinkSync(path.join(RAG_DIR, req.file.filename)); } catch {}
    return res.status(503).json({ error: 'OPENAI_API_KEY is required for embeddings.' });
  }

  let docId = null;
  try {
    // 1. Read PDF and extract text
    const filePath = path.join(RAG_DIR, req.file.filename);
    const parser = new PDFParse({ url: filePath });
    const pdfData = await parser.getText();
    // Clean: remove page separators like "-- 1 of 5 --" and collapse whitespace
    let text = (pdfData.text || '').replace(/--\s*\d+\s+of\s+\d+\s*--/g, ' ').trim();
    // Remove runs of whitespace
    text = text.replace(/\s{3,}/g, '  ');
    if (!text || text.length < 10) {
      try { fs.unlinkSync(path.join(RAG_DIR, req.file.filename)); } catch {}
      return res.status(400).json({ error: 'Could not extract any text from the PDF.' });
    }
    console.log(`RAG: extracted ${text.length} chars from "${req.file.originalname}"`);

    // 2. Chunk text
    const chunks = chunkText(text, CHUNK_SIZE, CHUNK_OVERLAP);
    if (chunks.length === 0) {
      try { fs.unlinkSync(path.join(RAG_DIR, req.file.filename)); } catch {}
      return res.status(400).json({ error: 'PDF text was too short to create any chunks.' });
    }
    console.log(`RAG: created ${chunks.length} chunks`);

    // 3. Insert metadata row into Postgres
    const { rows } = await pool.query(
      'INSERT INTO rag_documents (name, file_path, chunk_count) VALUES ($1, $2, $3) RETURNING id, name, chunk_count, created_at',
      [req.file.originalname, req.file.filename, chunks.length]
    );
    docId = rows[0].id;

    // 4. Embed chunks (batch in groups of 100 for OpenAI)
    const allEmbeddings = [];
    for (let i = 0; i < chunks.length; i += 100) {
      const batch = chunks.slice(i, i + 100);
      const embs = await embedTexts(batch);
      allEmbeddings.push(...embs);
    }

    // 5. Upsert to Pinecone
    await upsertChunksToPinecone(index, docId, chunks, allEmbeddings);

    res.status(201).json({ id: docId, name: rows[0].name, chunkCount: rows[0].chunk_count, createdAt: rows[0].created_at?.toISOString() || null });
  } catch (e) {
    console.error('RAG upload error:', e.message);
    // Cleanup on failure
    try { fs.unlinkSync(path.join(RAG_DIR, req.file.filename)); } catch {}
    if (docId) {
      try { await pool.query('DELETE FROM rag_documents WHERE id = $1', [docId]); } catch {}
      try { await deleteDocFromPinecone(index, docId); } catch {}
    }
    res.status(500).json({ error: e.message || 'Failed to process PDF.' });
  }
});

app.delete('/api/rag/documents/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const { rows } = await pool.query('SELECT file_path FROM rag_documents WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Document not found' });

    // Delete vectors from Pinecone
    const config = await getConfig();
    const chatbot = config?.chatbot || {};
    const indexName = (chatbot.pineconeIndex && String(chatbot.pineconeIndex).trim()) || process.env.PINECONE_INDEX;
    const index = getPineconeIndex(indexName);
    if (index) await deleteDocFromPinecone(index, id);

    // Delete file from disk
    try { fs.unlinkSync(path.join(RAG_DIR, rows[0].file_path)); } catch {}

    // Delete row from Postgres
    await pool.query('DELETE FROM rag_documents WHERE id = $1', [id]);
    res.json({ ok: true });
  } catch (e) {
    console.error('RAG delete error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// --------------- API: Media ---------------
function readMediaPlacements() {
  try {
    const raw = fs.readFileSync(mediaPlacementsPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

app.get('/api/media', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, filename, path, mime_type, size_bytes, created_at FROM media ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/media', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const { rows } = await pool.query(
      `INSERT INTO media (filename, path, mime_type, size_bytes) VALUES ($1, $2, $3, $4) RETURNING id, filename, path, mime_type, size_bytes, created_at`,
      [req.file.originalname, req.file.filename, req.file.mimetype, req.file.size]
    );
    const row = rows[0];
    res.status(201).json({ id: row.id, path: row.path, url: `/media/${row.path}` });
  } catch (e) {
    try { fs.unlinkSync(path.join(UPLOADS_DIR, req.file.filename)); } catch {}
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/media/:id', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT path FROM media WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Media not found' });
    const filePath = path.join(UPLOADS_DIR, rows[0].path);
    await pool.query('DELETE FROM media WHERE id = $1', [req.params.id]);
    try { fs.unlinkSync(filePath); } catch {}
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/media/placements', async (req, res) => {
  const definitions = readMediaPlacements();
  const placements = {};
  try {
    const { rows } = await pool.query(`
      SELECT mp.page_id, mp.section_id, mp.field_key, m.path
      FROM media_placement mp
      JOIN media m ON m.id = mp.media_id
    `);
    for (const r of rows) {
      const key = `${r.page_id}.${r.section_id}.${r.field_key}`;
      placements[key] = `/media/${r.path}`;
    }
  } catch (_) {}
  for (const def of definitions) {
    const key = `${def.pageId}.${def.sectionId}.${def.fieldKey}`;
    if (!placements[key] && def.defaultUrl) placements[key] = def.defaultUrl;
  }
  res.json(placements);
});

app.get('/api/media/placements/editable', requireAuth, async (req, res) => {
  const definitions = readMediaPlacements();
  const assignments = {};
  try {
    const { rows } = await pool.query(`
      SELECT mp.page_id, mp.section_id, mp.field_key, mp.media_id, m.path, m.filename
      FROM media_placement mp
      JOIN media m ON m.id = mp.media_id
    `);
    for (const r of rows) {
      const key = `${r.page_id}.${r.section_id}.${r.field_key}`;
      assignments[key] = { mediaId: r.media_id, path: r.path, url: `/media/${r.path}`, filename: r.filename };
    }
  } catch (_) {}
  res.json({ definitions, assignments });
});

app.put('/api/media/placement', requireAuth, async (req, res) => {
  const { pageId, sectionId, fieldKey, mediaId } = req.body || {};
  if (!pageId || !sectionId || !fieldKey) return res.status(400).json({ error: 'pageId, sectionId, fieldKey required' });
  try {
    await pool.query(
      `INSERT INTO media_placement (page_id, section_id, field_key, media_id) VALUES ($1, $2, $3, $4)
       ON CONFLICT (page_id, section_id, field_key) DO UPDATE SET media_id = $4`,
      [pageId, sectionId, fieldKey, mediaId || null]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --------------- Admin pages ---------------
app.get('/admin/login', (req, res) => {
  if (req.session?.user) return res.redirect('/admin');
  res.sendFile(path.join(__dirname, 'admin', 'login.html'));
});

app.get('/admin', (req, res) => {
  if (!req.session?.user) return res.redirect('/admin/login');
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.get('/admin/*', (req, res) => res.redirect('/admin'));
app.use('/admin-assets', express.static(path.join(__dirname, 'admin', 'assets')));
app.use('/media', express.static(UPLOADS_DIR));

async function run() {
  await ensureBootstrap();
  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
    console.log(`Admin portal: http://localhost:${PORT}/admin (login: admin@cachedigitech.com / admin123)`);
  });
}

run().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
