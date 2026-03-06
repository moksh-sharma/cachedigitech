import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import OpenAI from 'openai';
import pool from './db.js';

const openaiApiKey = process.env.OPENAI_API_KEY;
const BLOG_ADMIN_EMAIL = (process.env.BLOG_ADMIN_EMAIL || 'admin@cachedigitech.com').trim().toLowerCase();
const BLOG_ADMIN_PASSWORD = (process.env.BLOG_ADMIN_PASSWORD || 'admin').trim();
const SESSION_SECRET = process.env.SESSION_SECRET || 'blog-cms-secret-change-in-production';
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

const CHAT_SYSTEM_PROMPT_DEFAULT = `You are the System Assistant for Cache Digitech, a company that provides operational excellence, cloud infrastructure, and intelligent interfaces. You help visitors with questions about services, deployments, and technology. Keep replies concise, professional, and helpful.`;

/** Hardcoded chatbot config from environment (no database). */
function getChatbotConfig() {
  const enabled = process.env.CHATBOT_ENABLED !== 'false';
  const systemPrompt = (process.env.CHATBOT_SYSTEM_PROMPT || '').trim() || CHAT_SYSTEM_PROMPT_DEFAULT;
  const model = (process.env.CHATBOT_MODEL || '').trim() || process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';
  const maxTokens = Math.min(4096, Math.max(100, parseInt(process.env.CHATBOT_MAX_TOKENS, 10) || 512));
  const expandSpeed = parseFloat(process.env.CHATBOT_EXPAND_SPEED) || 1.2;
  const textFadeSpeed = parseFloat(process.env.CHATBOT_TEXT_FADE_SPEED) || 0.8;
  return { enabled, systemPrompt, model, maxTokens, expandSpeed, textFadeSpeed };
}

// --------------- Database init (create tables, seed defaults only) ---------------
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
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
    `);
    // Ensure highlights has link column (for existing DBs created before link was added)
    try {
      await client.query("ALTER TABLE highlights ADD COLUMN link TEXT DEFAULT ''");
    } catch (e) {
      if (e.code !== '42701') throw e; // 42701 = duplicate_column, ignore
    }
    const testimonialCount = (await client.query('SELECT COUNT(*) FROM testimonials')).rows[0].count;
    if (parseInt(testimonialCount, 10) === 0) {
      const defaultTestimonials = [
        { name: 'Rajesh Sharma', role: 'Global CTO', company: 'Leading Telecom Provider', logo: '/Partners/cisco.png', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop', quote: "We've built a very strong partnership with Cache Digitech. Our plan is to take this relationship to the next level by making our Digital IT the best in class, and we appreciate Cache for all their efforts and collaboration in making that happen." },
        { name: 'Anita Verma', role: 'VP of IT', company: 'Top BFSI Enterprise', logo: '/community/microsoft.jpg', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop', quote: "The cybersecurity solutions implemented by Cache gave us peace of mind. Their proactive approach to threat detection is remarkable, and their team operates as a true extension of ours." },
        { name: 'Suresh Mehta', role: 'Director of Operations', company: 'Manufacturing Giant', logo: '/community/awslogo.png', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop', quote: "Migrating to cloud with Cache was seamless. Zero downtime, complete transparency, and a team that truly understands enterprise scale. They delivered beyond our expectations." },
        { name: 'Priya Nair', role: 'Head of Digital', company: 'Government Agency', logo: '/community/dell.png', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop', quote: "Cache's managed services freed our internal team to focus on innovation. Their NOC and SOC operate like an extension of our own team, providing 24/7 reliability we can count on." },
        { name: 'Vikram Patel', role: 'CISO', company: 'Consulting Firm', logo: '/community/paloalto.jpg', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop', quote: "Working with Cache on our security posture was transformative. They brought deep OEM expertise and a genuine commitment to our success that is rare in this industry." },
      ];
      for (let i = 0; i < defaultTestimonials.length; i++) {
        const t = defaultTestimonials[i];
        await client.query(
          `INSERT INTO testimonials (name, role, company, logo, image, quote, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [t.name || '', t.role || '', t.company || '', t.logo || '', t.image || '', t.quote || '', i]
        );
      }
      console.log('Seeded testimonials (default data)');
    }
    const heroBgCount = (await client.query('SELECT COUNT(*) FROM hero_backgrounds')).rows[0].count;
    if (parseInt(heroBgCount, 10) === 0) {
      const defaultHeroBg = [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80',
        'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80',
      ];
      for (let i = 0; i < defaultHeroBg.length; i++) {
        await client.query(
          'INSERT INTO hero_backgrounds (image_url, sort_order) VALUES ($1, $2)',
          [defaultHeroBg[i], i]
        );
      }
      console.log('Seeded hero_backgrounds (default images)');
    }
  } finally {
    client.release();
  }
}

// --------------- Blogs (PostgreSQL) ---------------
async function getBlogs() {
  const res = await pool.query('SELECT id, title, excerpt, author, date, category, read_time AS "readTime", image FROM blogs ORDER BY id');
  return res.rows;
}

async function getBlogById(id) {
  const numId = parseInt(id, 10);
  const res = await pool.query(
    'SELECT id, title, excerpt, author, date, category, read_time AS "readTime", image FROM blogs WHERE id = $1',
    [numId]
  );
  return res.rows[0] || null;
}

async function createBlog(post) {
  const res = await pool.query(
    `INSERT INTO blogs (title, excerpt, author, date, category, read_time, image)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, excerpt, author, date, category, read_time AS "readTime", image`,
    [post.title, post.excerpt, post.author, post.date, post.category, post.readTime, post.image]
  );
  return res.rows[0];
}

async function updateBlog(id, post) {
  const numId = parseInt(id, 10);
  const res = await pool.query(
    `UPDATE blogs SET title=$1, excerpt=$2, author=$3, date=$4, category=$5, read_time=$6, image=$7
     WHERE id=$8 RETURNING id, title, excerpt, author, date, category, read_time AS "readTime", image`,
    [post.title, post.excerpt, post.author, post.date, post.category, post.readTime, post.image, numId]
  );
  return res.rows[0] || null;
}

async function deleteBlog(id) {
  const numId = parseInt(id, 10);
  const res = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING id', [numId]);
  return res.rowCount > 0;
}

// --------------- Highlights (PostgreSQL) ---------------
async function getHighlights() {
  const res = await pool.query('SELECT image, tag, title, description, type, link FROM highlights ORDER BY sort_order, id');
  return res.rows.map((r) => ({
    image: r.image || '',
    tag: r.tag || '',
    title: r.title || '',
    description: r.description || '',
    type: r.type || 'Article',
    link: r.link || '',
  }));
}

async function replaceHighlights(panels) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM highlights');
    for (let i = 0; i < panels.length; i++) {
      const p = panels[i];
      await client.query(
        `INSERT INTO highlights (image, tag, title, description, type, sort_order, link) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [p.image || '', p.tag || '', p.title || '', p.description || '', p.type || 'Article', i, p.link || '']
      );
    }
    return panels;
  } finally {
    client.release();
  }
}

// --------------- Testimonials (PostgreSQL) ---------------
async function getTestimonials() {
  const res = await pool.query('SELECT name, role, company, logo, image, quote FROM testimonials ORDER BY sort_order, id');
  return res.rows.map((r) => ({
    name: r.name || '',
    role: r.role || '',
    company: r.company || '',
    logo: r.logo || '',
    image: r.image || '',
    quote: r.quote || '',
  }));
}

async function replaceTestimonials(items) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM testimonials');
    for (let i = 0; i < items.length; i++) {
      const t = items[i];
      await client.query(
        `INSERT INTO testimonials (name, role, company, logo, image, quote, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [t.name || '', t.role || '', t.company || '', t.logo || '', t.image || '', t.quote || '', i]
      );
    }
    return items;
  } finally {
    client.release();
  }
}

// --------------- Hero backgrounds (PostgreSQL) ---------------
async function getHeroBackgrounds() {
  const res = await pool.query('SELECT image_url FROM hero_backgrounds ORDER BY sort_order, id');
  return res.rows.map((r) => r.image_url || '').filter(Boolean);
}

async function replaceHeroBackgrounds(urls) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM hero_backgrounds');
    const list = Array.isArray(urls) ? urls : [];
    for (let i = 0; i < list.length; i++) {
      const url = typeof list[i] === 'string' ? list[i].trim() : '';
      if (url) await client.query('INSERT INTO hero_backgrounds (image_url, sort_order) VALUES ($1, $2)', [url, i]);
    }
    return list.filter(Boolean);
  } finally {
    client.release();
  }
}

// --------------- Contact submissions: database only (no JSON files) ---------------
async function getContactSubmissions() {
  const res = await pool.query(
    'SELECT id, name, email, phone, subject, message, created_at FROM contact_submissions ORDER BY created_at DESC'
  );
  return res.rows.map((r) => ({
    id: r.id,
    name: r.name || '',
    email: r.email || '',
    phone: r.phone || '',
    subject: r.subject || '',
    message: r.message || '',
    created_at: r.created_at,
  }));
}

async function insertContactSubmission(body) {
  const res = await pool.query(
    `INSERT INTO contact_submissions (name, email, phone, subject, message)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, subject, message, created_at`,
    [
      body.name != null ? String(body.name).trim() : '',
      body.email != null ? String(body.email).trim() : '',
      body.phone != null ? String(body.phone).trim() : '',
      body.subject != null ? String(body.subject).trim() : '',
      body.message != null ? String(body.message).trim() : '',
    ]
  );
  return res.rows[0];
}

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy so session cookie works when frontend is behind Vite proxy (e.g. port 5178 -> 3000)
app.set('trust proxy', 1);
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

function requireBlogAuth(req, res, next) {
  if (req.session?.blogAdmin) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// --------------- Blog auth ---------------
app.post('/api/auth/blog-login', (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password.trim() : '';
  const emailMatch = email && BLOG_ADMIN_EMAIL && email === BLOG_ADMIN_EMAIL;
  const passwordMatch = password && password === BLOG_ADMIN_PASSWORD;
  if (emailMatch && passwordMatch) {
    req.session.blogAdmin = true;
    req.session.save((err) => {
      if (err) return res.status(500).json({ error: 'Session error' });
      res.json({ ok: true });
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.post('/api/auth/blog-logout', (req, res) => {
  req.session.blogAdmin = false;
  req.session.save(() => res.json({ ok: true }));
});

app.get('/api/auth/blog-me', (req, res) => {
  if (req.session?.blogAdmin) return res.json({ loggedIn: true });
  res.json({ loggedIn: false });
});

// --------------- Blog CRUD (public read, auth write) ---------------
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await getBlogs();
    res.json(blogs);
  } catch (e) {
    console.error('GET /api/blogs:', e.message);
    res.status(500).json({ error: e.message || 'Failed to load blogs' });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const post = await getBlogById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (e) {
    console.error('GET /api/blogs/:id:', e.message);
    res.status(500).json({ error: e.message || 'Failed to load blog' });
  }
});

app.post('/api/blogs', requireBlogAuth, async (req, res) => {
  try {
    const { title, excerpt, author, date, category, readTime, image } = req.body || {};
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const post = {
      title: String(title).trim(),
      excerpt: excerpt != null ? String(excerpt).trim() : '',
      author: author != null ? String(author).trim() : '',
      date: date != null ? String(date).trim() : '',
      category: category != null ? String(category).trim() : '',
      readTime: readTime != null ? String(readTime).trim() : '',
      image: image != null ? String(image).trim() : '',
    };
    const created = await createBlog(post);
    res.status(201).json(created);
  } catch (e) {
    console.error('POST /api/blogs:', e.message);
    res.status(500).json({ error: e.message || 'Failed to create blog' });
  }
});

app.put('/api/blogs/:id', requireBlogAuth, async (req, res) => {
  try {
    const existing = await getBlogById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const { title, excerpt, author, date, category, readTime, image } = req.body || {};
    const post = {
      title: title !== undefined ? String(title).trim() : existing.title,
      excerpt: excerpt !== undefined ? String(excerpt).trim() : existing.excerpt,
      author: author !== undefined ? String(author).trim() : existing.author,
      date: date !== undefined ? String(date).trim() : existing.date,
      category: category !== undefined ? String(category).trim() : existing.category,
      readTime: readTime !== undefined ? String(readTime).trim() : existing.readTime,
      image: image !== undefined ? String(image).trim() : existing.image,
    };
    if (!post.title) return res.status(400).json({ error: 'Title is required' });
    const updated = await updateBlog(req.params.id, post);
    res.json(updated);
  } catch (e) {
    console.error('PUT /api/blogs/:id:', e.message);
    res.status(500).json({ error: e.message || 'Failed to update blog' });
  }
});

app.delete('/api/blogs/:id', requireBlogAuth, async (req, res) => {
  try {
    const deleted = await deleteBlog(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/blogs/:id:', e.message);
    res.status(500).json({ error: e.message || 'Failed to delete blog' });
  }
});

// --------------- Latest Highlights (public read, auth write) ---------------
app.get('/api/highlights', async (req, res) => {
  try {
    const panels = await getHighlights();
    res.json(panels);
  } catch (e) {
    console.error('GET /api/highlights:', e.message);
    res.status(500).json({ error: e.message || 'Failed to load highlights' });
  }
});

app.put('/api/highlights', requireBlogAuth, async (req, res) => {
  try {
    const body = req.body;
    const panels = Array.isArray(body) ? body : [];
    const normalized = panels.map((p) => ({
      image: p?.image != null ? String(p.image).trim() : '',
      tag: p?.tag != null ? String(p.tag).trim() : '',
      title: p?.title != null ? String(p.title).trim() : '',
      description: p?.description != null ? String(p.description).trim() : '',
      type: p?.type != null ? String(p.type).trim() : 'Article',
      link: p?.link != null ? String(p.link).trim() : '',
    }));
    await replaceHighlights(normalized);
    res.json(normalized);
  } catch (e) {
    console.error('PUT /api/highlights:', e.message);
    res.status(500).json({ error: e.message || 'Failed to save highlights' });
  }
});

// --------------- Testimonials (public read, auth write) ---------------
app.get('/api/testimonials', async (req, res) => {
  try {
    const items = await getTestimonials();
    res.json(items);
  } catch (e) {
    console.error('GET /api/testimonials:', e.message);
    res.status(500).json({ error: e.message || 'Failed to load testimonials' });
  }
});

app.put('/api/testimonials', requireBlogAuth, async (req, res) => {
  try {
    const body = req.body;
    const items = Array.isArray(body) ? body : [];
    const normalized = items.map((t) => ({
      name: t?.name != null ? String(t.name).trim() : '',
      role: t?.role != null ? String(t.role).trim() : '',
      company: t?.company != null ? String(t.company).trim() : '',
      logo: t?.logo != null ? String(t.logo).trim() : '',
      image: t?.image != null ? String(t.image).trim() : '',
      quote: t?.quote != null ? String(t.quote).trim() : '',
    }));
    await replaceTestimonials(normalized);
    res.json(normalized);
  } catch (e) {
    console.error('PUT /api/testimonials:', e.message);
    res.status(500).json({ error: e.message || 'Failed to save testimonials' });
  }
});

// --------------- Hero backgrounds (public read, auth write) ---------------
app.get('/api/hero-backgrounds', async (req, res) => {
  try {
    const urls = await getHeroBackgrounds();
    res.json(urls);
  } catch (e) {
    console.error('GET /api/hero-backgrounds:', e.message);
    res.status(500).json({ error: e.message || 'Failed to load hero backgrounds' });
  }
});

app.put('/api/hero-backgrounds', requireBlogAuth, async (req, res) => {
  try {
    const body = req.body;
    const urls = Array.isArray(body) ? body : [];
    const normalized = urls.map((u) => (typeof u === 'string' ? u.trim() : '')).filter(Boolean);
    await replaceHeroBackgrounds(normalized);
    res.json(normalized);
  } catch (e) {
    console.error('PUT /api/hero-backgrounds:', e.message);
    res.status(500).json({ error: e.message || 'Failed to save hero backgrounds' });
  }
});

// --------------- Contact form (public submit; stored in database only) ---------------
app.post('/api/contact', async (req, res) => {
  try {
    const body = req.body || {};
    const name = body.name != null ? String(body.name).trim() : '';
    const email = body.email != null ? String(body.email).trim() : '';
    const subject = body.subject != null ? String(body.subject).trim() : '';
    const message = body.message != null ? String(body.message).trim() : '';
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject and message are required.' });
    }
    const created = await insertContactSubmission({
      name,
      email,
      phone: body.phone != null ? String(body.phone).trim() : '',
      subject,
      message,
    });
    res.status(201).json(created);
  } catch (e) {
    console.error('POST /api/contact:', e.message);
    res.status(500).json({ error: e.message || 'Failed to save message.' });
  }
});

// --------------- Contact submissions (admin read-only; fetched from database only) ---------------
app.get('/api/contact-submissions', requireBlogAuth, async (req, res) => {
  try {
    const list = await getContactSubmissions();
    res.json(list);
  } catch (e) {
    console.error('GET /api/contact-submissions:', e.message);
    res.status(500).json({ error: e.message || 'Failed to load contact submissions.' });
  }
});

// --------------- Chatbot UI config (for frontend; optional) ---------------
app.get('/api/config/chatbot-ui', (req, res) => {
  const c = getChatbotConfig();
  res.json({
    enabled: c.enabled,
    expandSpeed: c.expandSpeed,
    textFadeSpeed: c.textFadeSpeed,
  });
});

// --------------- Chat (non-streaming) ---------------
app.post('/api/chat', async (req, res) => {
  const chatbot = getChatbotConfig();
  if (chatbot.enabled === false) {
    return res.status(503).json({ error: 'Chat is disabled.' });
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

  try {
    const apiMessages = [
      { role: 'system', content: chatbot.systemPrompt },
      ...messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content) })),
    ];
    const completion = await openai.chat.completions.create({
      model: chatbot.model,
      messages: apiMessages,
      max_tokens: chatbot.maxTokens,
    });
    const reply = completion.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';
    res.json({ reply });
  } catch (e) {
    console.error('OpenAI chat error:', e.message);
    const status = e.status === 401 ? 401 : e.status === 429 ? 429 : 500;
    res.status(status).json({ error: e.message || 'Chat request failed.' });
  }
});

// --------------- Chat Stream (SSE) ---------------
app.post('/api/chat/stream', async (req, res) => {
  const chatbot = getChatbotConfig();
  if (chatbot.enabled === false) {
    return res.status(503).json({ error: 'Chat is disabled.' });
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

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const apiMessages = [
      { role: 'system', content: chatbot.systemPrompt },
      ...messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content) })),
    ];
    const stream = await openai.chat.completions.create({
      model: chatbot.model,
      messages: apiMessages,
      max_tokens: chatbot.maxTokens,
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

async function start() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required. Set it in backend/.env');
    process.exit(1);
  }
  try {
    await initDb();
    console.log('Database connected.');
  } catch (e) {
    console.error('Database connection failed:', e.message);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
    if (!openai) console.log('Chat disabled: set OPENAI_API_KEY to enable.');
  });
}

start();
