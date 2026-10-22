import { useRef, useState } from 'react';

const STICKERS = [
  { text: 'Stylist', shape: 'blob', x: '6%', y: '16%', mx: '0%', my: '6%', r: -10, bg: 'var(--blue)', fg: 'var(--choc)', d: '-.6s' },
  { text: ['Makeup', 'artist'], shape: 'flower', x: '70%', y: '-2%', mx: '74%', my: '-6%', r: 12, bg: 'var(--cherry)', fg: 'var(--butter)', d: '-1.4s' },
  { text: 'Photographer', shape: 'pill', x: '-1%', y: '56%', mx: '30%', my: '2%', r: 6, bg: 'var(--butter)', fg: 'var(--choc)', d: '-2.1s' },
  { text: 'Designer', shape: 'pill', x: '79%', y: '48%', mx: '44%', my: '82%', r: -8, bg: 'var(--choc)', fg: 'var(--butter)', d: '-.2s' },
  { text: 'Marketer', shape: 'blob', x: '64%', y: '84%', mx: '72%', my: '88%', r: 7, bg: 'var(--blue)', fg: 'var(--cherry)', d: '-3s' },
  { text: 'Business brain', shape: 'blob', x: '14%', y: '86%', mx: '0%', my: '86%', r: -6, bg: 'var(--butter)', fg: 'var(--cherry)', d: '-1s' },
];

// A wavy 8-petal flower outline for the "Makeup artist" sticker
const FLOWER = (() => {
  let d = '';
  for (let i = 0; i <= 360; i += 3) {
    const a = (i * Math.PI) / 180, r = 44 + 6 * Math.cos(8 * a);
    d += (i ? 'L' : 'M') + (50 + r * Math.cos(a)).toFixed(2) + ' ' + (50 + r * Math.sin(a)).toFixed(2);
  }
  return d + 'Z';
})();

const SHUFFLE_LINES = ['Shuffle my hats ↻', 'New day, new hat ↻', 'And again ↻', 'Never the same twice ↻'];

function Sticker({ s, offset, onMove }) {
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);
  const down = e => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX - offset.dx, y: e.clientY - offset.dy };
    setDragging(true);
  };
  const move = e => { if (drag.current) onMove({ ...offset, dx: e.clientX - drag.current.x, dy: e.clientY - drag.current.y }); };
  const up = () => { drag.current = null; setDragging(false); };
  return (
    <span
      className={`sticker ${s.shape}${dragging ? ' dragging' : ''}`}
      style={{ '--x': s.x, '--y': s.y, '--mx': s.mx, '--my': s.my, '--bg': s.bg, '--fg': s.fg, '--d': s.d, '--dx': offset.dx + 'px', '--dy': offset.dy + 'px', '--r': offset.r + 'deg' }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
    >
      {s.shape === 'flower' && <svg viewBox="0 0 100 100" aria-hidden="true"><path d={FLOWER} /></svg>}
      {Array.isArray(s.text) ? <>{s.text[0]}<br />{s.text[1]}</> : s.text}
    </span>
  );
}

export default function Hero() {
  const stage = useRef(null);
  const [offsets, setOffsets] = useState(STICKERS.map(s => ({ dx: 0, dy: 0, r: s.r })));
  const [shuffles, setShuffles] = useState(0);

  const shuffle = () => {
    const w = stage.current?.clientWidth || 600;
    setOffsets(STICKERS.map(() => ({
      dx: Math.round((Math.random() - 0.5) * w * 0.35),
      dy: Math.round((Math.random() - 0.5) * 120),
      r: Math.round((Math.random() - 0.5) * 40),
    })));
    setShuffles(n => n + 1);
  };

  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div className="stage" ref={stage}>
          <h1 className="name" aria-label="Rose">r<span className="o">o</span>se</h1>
          {STICKERS.map((s, i) => (
            <Sticker key={i} s={s} offset={offsets[i]} onMove={o => setOffsets(all => all.map((v, k) => (k === i ? o : v)))} />
          ))}
        </div>
        <p className="intro">Hi, I'm Nandha Rose Dominic. Call me <em>Rose!</em></p>
        <div className="hero-actions">
          <button className="btn" onClick={shuffle}>{SHUFFLE_LINES[shuffles % SHUFFLE_LINES.length]}</button>
          <span className="nudge">
            <svg viewBox="0 0 44 30" className="sketch" aria-hidden="true"><path d="M40 6 C 28 2, 12 6, 8 22 M8 22 l-4 -7 M8 22 l7 -3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
            or drag the stickers around
          </span>
        </div>
        <p className="sign">Rose's Fashion Playground</p>
      </div>
      <div className="awning-wrap" aria-hidden="true"><div className="rod" /><div className="awning" /></div>
    </section>
  );
}
