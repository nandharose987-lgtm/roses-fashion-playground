import { useRef, useState } from 'react';
import { DROPS, WHY } from '../content.js';
import { useBoard } from '../useBoard.js';
import { useToast } from './Toast.jsx';
import TagSticker from './TagSticker.jsx';
import Raw from './Raw.jsx';

const GOAL = 25;
const EMAIL = 'nandharose987@gmail.com';

function ago(t) {
  const s = Math.max(1, (Date.now() - t) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  if (s < 86400 * 30) return Math.floor(s / 86400) + 'd ago';
  return new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

const SKETCH = `
  <g class="sketch" fill="none" stroke="#3D2722" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M132 40 Q200 74 268 40 L350 78 L388 160 L322 188 L306 152 L306 388 Q200 404 94 388 L94 152 L78 188 L12 160 L50 78 Z" fill="#FBF6EA"/>
    <path d="M132 40 Q200 100 268 40"/>
    <path d="M322 188 L306 152 M78 188 L94 152 M306 152 L268 40 M94 152 L132 40" stroke-width="2" stroke-dasharray="6 7" stroke="#8E1825"/>
    <g transform="rotate(-6 266 172)"><rect x="240" y="150" width="54" height="44" rx="6" fill="#FFEDAD"/><path d="M240 172 h54" stroke-width="2"/><path d="M240 172 h54 v16 a6 6 0 0 1 -6 6 h-42 a6 6 0 0 1 -6 -6 Z" fill="#C8D9EC" stroke-width="2"/></g>
    <g stroke="#8E1825" stroke-width="2.4" stroke-dasharray="4 5">
      <ellipse cx="160" cy="246" rx="15" ry="30"/><ellipse cx="160" cy="246" rx="15" ry="30" transform="rotate(60 160 276)"/><ellipse cx="160" cy="246" rx="15" ry="30" transform="rotate(-60 160 276)"/>
    </g>
    <circle cx="160" cy="276" r="9" fill="#FFEDAD" stroke-width="2.4"/>
    <path d="M44 6 q-6 60 50 96"/><path d="M86 92 l8 10 l-12 2"/>
    <path d="M360 4 q20 50 -6 92"/><path d="M346 86 l8 10 l6 -12"/>
    <path d="M348 244 q-20 -10 -42 -54"/><path d="M300 202 l6 -12 l8 10"/>
    <path d="M160 430 q-4 -60 0 -110"/><path d="M152 330 l8 -10 l8 10"/>
  </g>
  <text x="-6" y="-6">reversible?</text>
  <text x="404" y="-12" text-anchor="end">swap the sleeves</text>
  <text x="414" y="270" text-anchor="end">flip patch</text>
  <text x="160" y="456" text-anchor="middle">stitch it yourself</text>`;

const TABS = [
  ['spark', 'The spark'],
  ['kit', 'The kit'],
  ['why', 'Why I think it works'],
  ['qs', 'Still figuring out'],
];

const OPEN_QS = [
  ['-.6deg', 'Premium, but affordable', "I want it to feel special without a scary price tag. Where's that sweet spot for parents?"],
  ['.7deg', 'Safe for little hands', 'How do I keep the youngest kit easy and safe while still making it feel special?'],
  ['.5deg', 'Where the fabric waste comes from', 'My own offcuts, partner factories, or deadstock from other brands? And can I get enough of it, every season?'],
  ['-.5deg', 'How often to drop', 'Every season? Every few months? Often enough to stay exciting, but never rushed.'],
  ['.4deg', 'Beyond the tee', 'Start with tees, then maybe dresses, jackets or bags, each with its own twist?'],
  ['-.7deg', 'The name', 'Still deciding. Got a good one? Suggest it in the notes.'],
];

function Thinking() {
  const [tab, setTab] = useState('spark');
  const refs = useRef({});
  const onKey = (e, i) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = TABS[(i + d + TABS.length) % TABS.length][0];
    setTab(next); refs.current[next]?.focus();
  };
  return (
    <article className="tabs paper" aria-label="The thinking behind the idea">
      <div className="tablist" role="tablist">
        {TABS.map(([id, label], i) => (
          <button key={id} role="tab" id={'tab-' + id} aria-controls={'panel-' + id} aria-selected={tab === id} tabIndex={tab === id ? 0 : -1}
            ref={n => (refs.current[id] = n)} onClick={() => setTab(id)} onKeyDown={e => onKey(e, i)}>{label}</button>
        ))}
      </div>

      <div className="tabpanel" role="tabpanel" id="panel-spark" aria-labelledby="tab-spark" hidden={tab !== 'spark'}>
        <div className="story">
          <div><h4>Where it came from</h4><p>When I was little I had a watch where you could swap the strap and the frame. I loved it more than any toy that came finished. Same with Kinder Joy: the best part was never the chocolate, it was building the surprise.</p></div>
          <div><h4>Why now</h4><p>After this course and everything I've tried in fashion, I know I don't want to start something basic. I want to sell an experience, not just a product.</p></div>
          <div><h4>The idea</h4><p>A clothing brand for girls that releases in drops. Each drop is a piece with a twist and a DIY kit to match: a reversible tee, sleeves you can swap, an outline you embroider yourself with a proper guide, a patch that flips, a two-tone tee. Something new every time, so the same piece can be worn lots of different ways.</p></div>
          <div><h4>Picture it</h4><p>A sleepover (a huge thing here in Australia) with everyone remixing their tees together. Or a mum or dad giving it for a birthday, because it's a gift and an activity in one box.</p></div>
          <p className="hand">Not a t-shirt. A t-shirt that keeps changing, just like me.</p>
        </div>
      </div>

      <div className="tabpanel" role="tabpanel" id="panel-kit" aria-labelledby="tab-kit" hidden={tab !== 'kit'}>
        <div className="kits">
          <div className="kit" style={{ '--bg': 'var(--blue)' }}>
            <span className="mono">Ages 5–9</span><h4>Mini Makers</h4>
            <p>Simple and quick, with no needles needed.</p>
            <ul><li>Easy swaps, like sleeves or a flip patch</li><li>Colour-in and draw-on details</li><li>A picture guide they can follow on their own</li></ul>
          </div>
          <div className="kit" style={{ '--bg': 'var(--butter)' }}>
            <span className="mono">Ages 10–15</span><h4>Big Makers</h4>
            <p>More freedom, more making.</p>
            <ul><li>Embroidery outlines with a step-by-step guide</li><li>Reversible and two-tone pieces to style different ways</li><li>A style guide for wearing it more than one way</li></ul>
          </div>
          <div className="every">
            <div><b>A new surprise</b><p>Never repeated, so every box feels like opening something for the first time.</p></div>
            <div><b>A proper guide</b><p>Clear steps for each drop, so kids can do it on their own or with friends.</p></div>
            <div><b>Made from fabric waste</b><p>Kit pieces cut from offcuts, so waste becomes something new.</p></div>
            <div><b>Washable</b><p>Everything in the kit is designed to go through the wash.</p></div>
          </div>
        </div>
      </div>

      <div className="tabpanel" role="tabpanel" id="panel-why" aria-labelledby="tab-why" hidden={tab !== 'why'}>
        <ul className="why-list">
          {WHY.map(w => <li key={w.t}><b>{w.t}</b><p>{w.d}</p></li>)}
        </ul>
      </div>

      <div className="tabpanel" role="tabpanel" id="panel-qs" aria-labelledby="tab-qs" hidden={tab !== 'qs'}>
        <ul className="open-qs">
          {OPEN_QS.map(([r, t, d]) => <li key={t} style={{ '--r': r }}><b>{t}</b><p>{d}</p></li>)}
        </ul>
        <p className="tab-foot">Got an answer to one of these? Leave me a note below.</p>
      </div>
    </article>
  );
}

function NotesWall({ board }) {
  const toast = useToast();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const live = board.mode === 'live';

  const submit = async e => {
    e.preventDefault();
    if (!text.trim()) return;
    setBusy(true);
    try {
      await board.postNote(name.trim(), text.trim());
      setText('');
      toast('Note posted. Thank you!');
    } catch {
      toast("That didn't post. Check your connection and try again.");
    } finally { setBusy(false); }
  };

  return (
    <article className="wall paper" id="notes-wall" aria-labelledby="wall-title">
      <div className="wall-intro">
        <h3 id="wall-title">Leave me a note.</h3>
        <p>What do you love? What would you change? What would make you buy it for someone? Every note helps me shape this idea.</p>
        {live ? (
          <form className="note-form" onSubmit={submit}>
            <label htmlFor="note-name">Your name (optional)</label>
            <input id="note-name" maxLength={40} value={name} onChange={e => setName(e.target.value)} placeholder="So I know who it’s from" />
            <label htmlFor="note-text">Your note</label>
            <textarea id="note-text" maxLength={500} value={text} onChange={e => setText(e.target.value)} placeholder="I'd love it if the kit had…" />
            <div className="row"><small>{text.length} / 500</small><button className="btn" type="submit" disabled={busy}>Post note</button></div>
          </form>
        ) : (
          <p className="note-locked">Notes open up once the site's database is connected. Until then, you can email me at <b>{EMAIL}</b>.</p>
        )}
      </div>
      <ul className="note-list" aria-label="Notes from visitors">
        {board.notes.length === 0 && <li className="empty">{live ? 'No notes yet. Yours could be the first!' : 'Notes from visitors show up here.'}</li>}
        {board.notes.map((n, i) => (
          <li key={n.id} style={{ '--r': [-1.2, 0.8, -0.4, 1.1][i % 4] + 'deg' }}>
            <p className="txt">{n.text}</p>
            <div className="note-meta"><b>{n.name || 'A visitor'}</b><span>· {ago(n.at)}</span></div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function BigIdea() {
  const board = useBoard();
  const toast = useToast();
  const [pop, setPop] = useState(false);
  const live = board.mode === 'live';

  const back = async () => {
    setPop(false); requestAnimationFrame(() => setPop(true));
    try {
      const now = await board.toggleBack();
      toast(now ? 'Backed! Thank you ♥' : 'Removed your backing.');
    } catch {
      toast("That didn't save. Check your connection and try again.");
    }
  };

  const status = {
    loading: 'Loading the backers board…',
    off: <>Backing and notes aren't switched on yet. In the meantime, you can send me your thoughts at <b>{EMAIL}</b>.</>,
    error: <>The backers board didn't load. Refresh the page to try again, or email me at <b>{EMAIL}</b>.</>,
    live: 'Back the idea if you like it, and leave me a note. Everyone who visits can see the notes.',
  }[board.mode];

  return (
    <section className="band band-cherry" id="brain">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">A sneak peek into my brain.<TagSticker bg="var(--butter)" fg="var(--cherry)">the big idea</TagSticker></h2>
          <p>The business I want to start one day. It's still a brainstorm, not a finished plan, so I'd love your help shaping it. Back it if you like it, and leave me a note with your thoughts.</p>
        </div>
        <p className="board-status">{status}</p>

        <div className="brain-stack">
          <article className="campaign paper" aria-labelledby="camp-title">
            <figure className="sketchpage">
              <svg viewBox="-20 -40 440 500" role="img" aria-label="Sketch of a girls' tee with notes: reversible, swap the sleeves, flip patch, stitch it yourself" dangerouslySetInnerHTML={{ __html: SKETCH }} />
              <figcaption>From my sketchbook: one tee, lots of possible twists.</figcaption>
            </figure>
            <div className="summary">
              <span className="mono kicker">Idea no. 01 · in the sketchbook</span>
              <h3 className="camp-title" id="camp-title">A t-shirt that's never finished.</h3>
              <p className="camp-line">A clothing brand for girls aged 5 to 15 that releases in drops. Every piece comes with a DIY kit and a surprise, and no two drops are ever the same. Kids don't just wear it. They make it theirs.</p>
              <div className="chips"><span className="chip">Girls 5–15</span><span className="chip">New DIY kit every drop</span><span className="chip">Made from fabric waste</span><span className="chip">Premium, but affordable</span></div>
              <div className="camp-stats">
                <div><b>{board.backers}</b><span>backers</span></div>
                <div><b>{board.notes.length}</b><span>notes</span></div>
              </div>
              <div className="meter" aria-hidden="true"><i style={{ '--p': Math.min(100, (board.backers / GOAL) * 100) + '%' }} /></div>
              <p className="camp-name">{board.backers >= GOAL ? `Goal reached: ${board.backers} backers! Thank you.` : `Goal: ${GOAL} backers before I pitch it for real. ${GOAL - board.backers} to go.`}</p>
              <div className="camp-actions">
                <button className={'like-btn' + (pop ? ' pop' : '')} aria-pressed={board.backed} disabled={!live} onClick={back} onAnimationEnd={() => setPop(false)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill="currentColor" /></svg>
                  <span>{board.backed ? 'Backed! Thank you' : 'Back this idea'}</span>
                </button>
                <a className="btn ghost" href="#notes-wall">Leave a note</a>
              </div>
            </div>
          </article>

          <section className="drops" aria-labelledby="drops-title">
            <div className="drops-head">
              <h3 id="drops-title">Every drop is different.</h3>
              <p>A few ideas for what a drop could be. The kit and the surprise inside change every time, so it never gets repetitive.</p>
            </div>
            <div className="drop-grid">
              {DROPS.map(d => (
                <article key={d.t} className="drop paper" style={{ '--r': d.r }}>
                  <div className="drop-art" style={{ '--tint': d.tint }}><Raw html={d.art} /></div>
                  <span className="mono">Drop idea</span>
                  <h4>{d.t}</h4>
                  <p>{d.d}</p>
                </article>
              ))}
            </div>
          </section>

          <Thinking />
          <NotesWall board={board} />
        </div>
      </div>
    </section>
  );
}
