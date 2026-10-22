import { useEffect, useRef, useState } from 'react';
import { ICONS, WORK } from '../content.js';
import TagSticker from './TagSticker.jsx';
import Raw from './Raw.jsx';

function WorkCard({ w, onOpenPhoto }) {
  const [flipped, setFlipped] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const flip = e => {
    if (e.target.closest('.thumb')) return;
    setFlipped(f => !f);
    setFlipping(false);
    requestAnimationFrame(() => setFlipping(true));
  };
  return (
    <div className={'card' + (flipped ? ' flipped' : '') + (flipping ? ' flipping' : '')} onClick={flip} onAnimationEnd={() => setFlipping(false)}>
      <div className="card-inner">
        <div className="face front" inert={flipped ? '' : undefined}>
          <div className="bar" style={{ '--bg': w.bg, '--fg': w.fg }}><h3>{w.title}</h3><i /></div>
          <div className="art" style={{ '--tint': w.tint }}><Raw html={ICONS[w.icon]} /></div>
          <div className="foot">
            {w.tags.map(t => <span key={t} className="chip">{t}</span>)}
            <button type="button" className="flip-hint" aria-label={`Flip the ${w.title} card`}>flip ↻</button>
          </div>
        </div>
        <div className="face back" inert={flipped ? undefined : ''}>
          <div className="back-top"><h3>{w.title}</h3><button type="button" className="flip-hint" aria-label={`Flip the ${w.title} card back`}>↺ back</button></div>
          <p className="desc">{w.back}</p>
          <div className="slots">
            {w.photos.map((p, i) => (
              <button key={i} type="button" className="thumb" aria-label={`View photo ${i + 1} of ${w.photos.length}`} onClick={() => onOpenPhoto(w, i)}>
                <img src={p.src} alt={p.alt} decoding="async" />
              </button>
            ))}
          </div>
          <span className="photo-hint">Tap a photo to see it bigger.</span>
          <span className="care">Care label: {w.care}</span>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ view, setView }) {
  const closeRef = useRef(null);
  const back = useRef(null);
  const open = !!view;
  const count = view?.set.photos.length || 0;
  const go = d => setView(v => ({ ...v, i: (v.i + d + count) % count }));
  const close = () => { setView(null); back.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    back.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = e => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;
  const p = view.set.photos[view.i];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={e => { if (e.target === e.currentTarget) close(); }}>
      <button className="lb-btn lb-close" ref={closeRef} aria-label="Close photo" onClick={close}>✕</button>
      <button className="lb-btn" aria-label="Previous photo" onClick={() => go(-1)}>←</button>
      <figure>
        <img src={p.src} alt={p.alt} />
        <figcaption><span>{view.set.title} · {view.i + 1} of {count}</span></figcaption>
      </figure>
      <button className="lb-btn" aria-label="Next photo" onClick={() => go(1)}>→</button>
    </div>
  );
}

export default function Work() {
  const [view, setView] = useState(null);
  return (
    <section className="band band-cream" id="work">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Look what I've tried on.<TagSticker right bg="var(--blue)" fg="var(--cherry)">my work</TagSticker></h2>
          <p>Six corners of fashion, each one tried hands-on. Tap a card to flip it.</p>
        </div>
        <div className="work-grid">
          {WORK.map(w => <WorkCard key={w.title} w={w} onOpenPhoto={(set, i) => setView({ set, i })} />)}
        </div>
      </div>
      <Lightbox view={view} setView={setView} />
    </section>
  );
}
