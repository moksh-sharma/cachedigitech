/**
 * Create tables and seed default data into the database (DATABASE_URL in .env).
 * Safe to run multiple times: only seeds when tables are empty.
 * Run from backend folder: node scripts/seed-db.js
 */
import 'dotenv/config';
import pool from '../db.js';

const CREATE_TABLES = `
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
`;

const DEFAULT_BLOGS = [
  { title: 'Unlocking business value with AI', excerpt: 'How intelligent automation is transforming enterprise operations.', author: 'Cache Team', date: '2025-01-15', category: 'AI & Data', readTime: '5 min', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' },
  { title: 'Cybersecurity in the hybrid cloud era', excerpt: 'Best practices for securing workloads across on-prem and cloud.', author: 'Cache Team', date: '2025-01-10', category: 'Security', readTime: '6 min', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80' },
  { title: 'Building resilient IT infrastructure', excerpt: 'Designing for availability, scalability, and future growth.', author: 'Cache Team', date: '2025-01-05', category: 'Infrastructure', readTime: '4 min', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80' },
];

const DEFAULT_TESTIMONIALS = [
  { name: 'Rajesh Sharma', role: 'Global CTO', company: 'Leading Telecom Provider', logo: '/Partners/cisco.png', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop', quote: "We've built a very strong partnership with Cache Digitech. Our plan is to take this relationship to the next level by making our Digital IT the best in class, and we appreciate Cache for all their efforts and collaboration in making that happen." },
  { name: 'Anita Verma', role: 'VP of IT', company: 'Top BFSI Enterprise', logo: '/community/microsoft.jpg', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop', quote: "The cybersecurity solutions implemented by Cache gave us peace of mind. Their proactive approach to threat detection is remarkable, and their team operates as a true extension of ours." },
  { name: 'Suresh Mehta', role: 'Director of Operations', company: 'Manufacturing Giant', logo: '/community/awslogo.png', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop', quote: "Migrating to cloud with Cache was seamless. Zero downtime, complete transparency, and a team that truly understands enterprise scale. They delivered beyond our expectations." },
  { name: 'Priya Nair', role: 'Head of Digital', company: 'Government Agency', logo: '/community/dell.png', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop', quote: "Cache's managed services freed our internal team to focus on innovation. Their NOC and SOC operate like an extension of our own team, providing 24/7 reliability we can count on." },
  { name: 'Vikram Patel', role: 'CISO', company: 'Consulting Firm', logo: '/community/paloalto.jpg', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop', quote: "Working with Cache on our security posture was transformative. They brought deep OEM expertise and a genuine commitment to our success that is rare in this industry." },
];

const DEFAULT_HERO_BG = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80',
  'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80',
];

// Latest highlights from frontend HeroSection.jsx HIGHLIGHTS_PANELS
const DEFAULT_HIGHLIGHTS = [
  { image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80', tag: 'AI and GenAI', title: 'Unlocking business value with AI', description: 'Decoding differentiated positioning and capabilities in the AI market.', type: 'Article' },
  { image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80', tag: 'AI', title: 'AI for inclusive growth: Leadership lessons from Davos', description: '', type: 'Article' },
  { image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80', tag: 'Cloud', title: 'Advancing education with AI: Preparing the workforce of tomorrow', description: '', type: 'Article' },
  { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80', tag: 'Strategy', title: 'Building a trust-led wealth management platform', description: '', type: 'Article' },
  { image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80', tag: 'Technology', title: 'Transforming enterprise IT operations for leading brands', description: '', type: 'Article' },
  { image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', tag: 'Partnerships', title: 'Accelerating AI-led tech modernisation with Guardian', description: '', type: 'Article' },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required in backend/.env');
    process.exit(1);
  }
  const client = await pool.connect();
  try {
    console.log('Creating tables...');
    await client.query(CREATE_TABLES);

    const blogCount = (await client.query('SELECT COUNT(*) FROM blogs')).rows[0].count;
    if (parseInt(blogCount, 10) === 0) {
      for (const b of DEFAULT_BLOGS) {
        await client.query(
          `INSERT INTO blogs (title, excerpt, author, date, category, read_time, image) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [b.title, b.excerpt, b.author, b.date, b.category, b.readTime, b.image]
        );
      }
      console.log('Seeded blogs:', DEFAULT_BLOGS.length);
    } else {
      console.log('Blogs already have data, skip seed.');
    }

    const testimonialCount = (await client.query('SELECT COUNT(*) FROM testimonials')).rows[0].count;
    if (parseInt(testimonialCount, 10) === 0) {
      for (let i = 0; i < DEFAULT_TESTIMONIALS.length; i++) {
        const t = DEFAULT_TESTIMONIALS[i];
        await client.query(
          `INSERT INTO testimonials (name, role, company, logo, image, quote, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [t.name, t.role, t.company, t.logo, t.image, t.quote, i]
        );
      }
      console.log('Seeded testimonials:', DEFAULT_TESTIMONIALS.length);
    } else {
      console.log('Testimonials already have data, skip seed.');
    }

    const heroBgCount = (await client.query('SELECT COUNT(*) FROM hero_backgrounds')).rows[0].count;
    if (parseInt(heroBgCount, 10) === 0) {
      for (let i = 0; i < DEFAULT_HERO_BG.length; i++) {
        await client.query(
          'INSERT INTO hero_backgrounds (image_url, sort_order) VALUES ($1, $2)',
          [DEFAULT_HERO_BG[i], i]
        );
      }
      console.log('Seeded hero_backgrounds:', DEFAULT_HERO_BG.length);
    } else {
      console.log('Hero backgrounds already have data, skip seed.');
    }

    const highlightCount = (await client.query('SELECT COUNT(*) FROM highlights')).rows[0].count;
    if (parseInt(highlightCount, 10) === 0) {
      for (let i = 0; i < DEFAULT_HIGHLIGHTS.length; i++) {
        const h = DEFAULT_HIGHLIGHTS[i];
        await client.query(
          `INSERT INTO highlights (image, tag, title, description, type, sort_order, link) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [h.image || '', h.tag || '', h.title || '', h.description || '', h.type || 'Article', i, h.link || '']
        );
      }
      console.log('Seeded highlights:', DEFAULT_HIGHLIGHTS.length);
    } else {
      console.log('Highlights already have data.');
    }

    console.log('Done. Data migrated into local tables.');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
