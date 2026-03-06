/**
 * Seed the blogs table with sample posts.
 * Run from backend folder: node scripts/seed-blogs.js
 */
import 'dotenv/config';
import pool from '../db.js';

const BLOGS = [
  {
    title: 'Why hybrid cloud is the default for enterprise in 2025',
    excerpt: `Enterprises are no longer choosing "cloud or on-prem." The real question is how to run workloads across multiple clouds and data centers with a single operating model. In 2025, hybrid and multi-cloud are the default. At Cache Digitech, we help clients design for portability, automate governance, and optimize cost with FinOps—so you get agility without lock-in. This post looks at why hybrid is winning, how to think about placement and security, and how to get from strategy to execution without big-bang migrations.`,
    author: 'Cache Team',
    date: '2025-02-20',
    category: 'Cloud',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    title: 'Unlocking business value with AI',
    excerpt: `AI is moving from experiments to core operations. The challenge is no longer "can we use AI?" but "where does it drive real outcomes?" We work with enterprises to identify high-impact use cases—from intelligent automation to predictive operations—and implement with governance and trust built in. This article outlines how we help you differentiate with AI, measure ROI, and scale responsibly.`,
    author: 'Cache Team',
    date: '2025-02-15',
    category: 'AI & Data',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },
  {
    title: 'Cybersecurity in the hybrid cloud era',
    excerpt: `Securing workloads that span on-prem, multiple clouds, and SaaS requires a unified view of identity, data, and compliance. We share practical steps: zero-trust principles, consistent policy across environments, and how to align security with DevOps so that speed and safety go together. Learn how Cache helps enterprises harden their posture without slowing delivery.`,
    author: 'Cache Team',
    date: '2025-02-10',
    category: 'Security',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  },
  {
    title: 'Building resilient IT infrastructure',
    excerpt: `Resilient infrastructure is the foundation for digital transformation. We focus on availability, scalability, and future-ready design—whether you're modernizing legacy systems or building cloud-native from day one. This post covers how we assess current state, design for failure, and implement so your business can grow without infrastructure becoming the bottleneck.`,
    author: 'Cache Team',
    date: '2025-02-05',
    category: 'Infrastructure',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url || !url.startsWith('postgres')) {
    console.error('DATABASE_URL is required in backend/.env');
    process.exit(1);
  }

  const client = await pool.connect();
  try {
    for (const post of BLOGS) {
      await client.query(
        `INSERT INTO blogs (title, excerpt, author, date, category, read_time, image)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          post.title,
          post.excerpt,
          post.author,
          post.date,
          post.category,
          post.readTime,
          post.image,
        ]
      );
      console.log('Inserted:', post.title);
    }
    console.log('Done. Inserted', BLOGS.length, 'blog posts.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
