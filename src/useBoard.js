import { useCallback, useEffect, useState } from 'react';

/*
  Talks to /api/board (see the api folder) to load and save backers and notes.
  If the database isn't connected yet, the page still works and just says so.
*/
const BACKED_KEY = 'rose-backed-tee';
const readBacked = () => { try { return localStorage.getItem(BACKED_KEY) === '1'; } catch { return false; } };
const writeBacked = v => { try { v ? localStorage.setItem(BACKED_KEY, '1') : localStorage.removeItem(BACKED_KEY); } catch { /* private mode */ } };

export function useBoard() {
  const [mode, setMode] = useState('loading'); // loading | live | off | error
  const [backers, setBackers] = useState(0);
  const [notes, setNotes] = useState([]);
  const [backed, setBacked] = useState(readBacked);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/board');
      if (res.status === 404 || res.status === 503) { setMode('off'); return; }
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      setBackers(data.backers || 0);
      setNotes(Array.isArray(data.notes) ? data.notes : []);
      setMode('live');
    } catch {
      setMode(m => (m === 'live' ? 'live' : 'off'));
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, [load]);

  const send = async body => {
    const res = await fetch('/api/board', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(res.status);
    return res.json();
  };

  const toggleBack = async () => {
    const next = !backed;
    const data = await send({ action: next ? 'back' : 'unback' });
    setBackers(data.backers);
    setBacked(next); writeBacked(next);
    return next;
  };

  const postNote = async (name, text) => {
    const data = await send({ action: 'note', name, text });
    setNotes(list => [data.note, ...list]);
  };

  return { mode, backers, notes, backed, toggleBack, postNote };
}
