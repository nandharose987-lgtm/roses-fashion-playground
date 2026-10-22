/*
  The site's tiny backend, run by Vercel as a serverless function at /api/board.
  It keeps the "Back this idea" count and the visitor notes in an Upstash Redis
  database. Connect one in Vercel (Storage tab) and these keys get filled in for you.
*/
import { Redis } from '@upstash/redis';

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim().slice(0, max);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!redis) return res.status(503).json({ error: 'Database not connected yet.' });

  try {
    if (req.method === 'GET') {
      const [backers, notes] = await Promise.all([redis.get('backers'), redis.lrange('notes', 0, 199)]);
      return res.status(200).json({ backers: Math.max(0, Number(backers) || 0), notes });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

      if (body.action === 'back') {
        return res.status(200).json({ backers: await redis.incr('backers') });
      }
      if (body.action === 'unback') {
        let n = await redis.decr('backers');
        if (n < 0) { await redis.set('backers', 0); n = 0; }
        return res.status(200).json({ backers: n });
      }
      if (body.action === 'note') {
        const text = clean(body.text, 500);
        if (!text) return res.status(400).json({ error: 'Write something first.' });
        const note = { id: crypto.randomUUID(), name: clean(body.name, 40), text, at: Date.now() };
        await redis.lpush('notes', note);
        await redis.ltrim('notes', 0, 499);
        return res.status(201).json({ note });
      }
      return res.status(400).json({ error: 'Unknown action.' });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
