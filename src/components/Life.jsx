import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { STOPS } from '../content.js';
import { reducedMotion } from '../hooks.js';
import TagSticker from './TagSticker.jsx';

// The hand-drawn bits of the map: clouds, sunrise, gym, kitchen, travel, trees, compass rose
const MAP_ART = `
  <path class="ink" d="M200 96 q6 -26 32 -20 q12 -22 36 -8 q26 -4 24 22 q20 6 6 22 h-92 q-20 -6 -6 -16 Z" fill="#FFFDF7"/>
  <path class="ink" d="M540 120 q6 -20 26 -14 q12 -16 30 -4 q20 0 16 18 h-70 q-12 -2 -2 0 Z"/>
  <path d="M74 382 a42 42 0 0 1 84 0" fill="#FFEDAD" class="ink"/>
  <path class="ink" d="M116 318 v-18 M76 334 l-12 -12 M156 334 l12 -12 M54 368 h-16 M178 368 h16"/>
  <path class="ink" d="M24 404 q54 -50 108 -14 q44 -34 104 8" fill="#FFFDF7"/>
  <rect x="318" y="248" width="14" height="38" rx="4" fill="#8E1825" class="ink"/>
  <rect x="334" y="255" width="9" height="24" rx="3" fill="#8E1825" class="ink"/>
  <path class="ink" d="M343 267 h40"/>
  <rect x="383" y="255" width="9" height="24" rx="3" fill="#8E1825" class="ink"/>
  <rect x="394" y="248" width="14" height="38" rx="4" fill="#8E1825" class="ink"/>
  <path class="ink" d="M428 302 q0 -22 16 -22 q16 0 16 22"/>
  <circle cx="444" cy="318" r="20" fill="#C8D9EC" class="ink"/>
  <path class="ink" d="M598 432 h88 v38 q0 20 -20 20 h-48 q-20 0 -20 -20 Z" fill="#FFEDAD"/>
  <path class="ink" d="M590 432 h104 M598 444 h-12 M686 444 h12"/>
  <path class="ink" d="M626 420 q-8 -10 0 -18 q8 -8 0 -16 M650 418 q-8 -10 0 -18 M672 420 q-8 -10 0 -18" stroke="#8E1825"/>
  <path class="ink" d="M700 490 l40 -60"/>
  <ellipse cx="744" cy="424" rx="9" ry="13" transform="rotate(34 744 424)" fill="#FFFDF7" class="ink"/>
  <path class="ink" d="M738 80 l52 -10 l14 -18 l8 2 l-6 20 l26 -4 l8 -10 l6 2 l-4 14 l-100 18 Z" fill="#FFFDF7"/>
  <path class="ink" d="M730 92 q-60 20 -110 6" stroke-dasharray="6 10"/>
  <rect x="852" y="206" width="96" height="70" rx="10" fill="#C8D9EC" class="ink"/>
  <path class="ink" d="M884 206 v-14 h32 v14 M852 232 h96"/>
  <circle cx="878" cy="254" r="9" fill="#FFEDAD" class="ink"/>
  <path class="ink" d="M912 248 l18 0 M912 260 l12 0" stroke="#8E1825"/>
  <path class="ink" d="M230 500 v-22 M230 478 q-20 -4 -14 -22 q-2 -18 14 -20 q18 2 14 20 q6 18 -14 22" fill="#FFFDF7"/>
  <path class="ink" d="M486 510 v-18 M486 492 q-16 -4 -12 -18 q0 -14 12 -16 q14 2 12 16 q4 14 -12 18" fill="#FFFDF7"/>
  <circle cx="900" cy="462" r="38" fill="#FFFDF7" class="ink"/>
  <path class="ink" d="M900 428 l8 26 l26 8 l-26 8 l-8 26 l-8 -26 l-26 -8 l26 -8 Z" fill="#8E1825"/>`;

const TRAIL = 'M90 450 C 180 440, 250 220, 360 210 C 470 200, 520 390, 640 380 C 760 370, 800 160, 910 150';

export default function Life() {
  const trail = useRef(null);
  const stopLen = useRef([]);
  const lenRef = useRef(0);
  const [cur, setCur] = useState(0);
  const [pos, setPos] = useState({ x: STOPS[0].x, y: STOPS[0].y });

  // Work out where each stop sits along the dotted path
  useLayoutEffect(() => {
    const p = trail.current, total = p.getTotalLength();
    stopLen.current = STOPS.map(s => {
      let best = 0, bd = Infinity;
      for (let l = 0; l <= total; l += 2) {
        const pt = p.getPointAtLength(l), d = (pt.x - s.x) ** 2 + (pt.y - s.y) ** 2;
        if (d < bd) { bd = d; best = l; }
      }
      return best;
    });
    lenRef.current = stopLen.current[0];
  }, []);

  // Walk the "R" pin along the path to the chosen stop
  useEffect(() => {
    const p = trail.current, from = lenRef.current, to = stopLen.current[cur] ?? 0;
    const place = l => { const pt = p.getPointAtLength(l); setPos({ x: pt.x, y: pt.y }); lenRef.current = l; };
    if (reducedMotion()) { place(to); return; }
    const t0 = performance.now(), dur = Math.min(1600, 400 + Math.abs(to - from) * 1.6);
    let raf;
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      place(from + (to - from) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cur]);

  const go = i => setCur((i + STOPS.length) % STOPS.length);
  const s = STOPS[cur];

  return (
    <section className="band band-butter" id="life">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Off the clock.<TagSticker bg="var(--cherry)" fg="var(--cream)">life outside fashion</TagSticker></h2>
          <p>Roughly how a good day goes. Tap a stop on the map and I'll walk you there.</p>
        </div>
        <div className="life-grid">
          <div className="map">
            <svg viewBox="0 0 1000 560" role="group" aria-label="Hand-drawn map of Rose's day">
              <g className="sketch" dangerouslySetInnerHTML={{ __html: MAP_ART }} />
              <text x="900" y="414" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="15" fill="#3D2722">N</text>
              <text x="900" y="530" textAnchor="middle" className="label-script">a compass rose, obviously</text>
              <path className="trail" ref={trail} d={TRAIL} />
              {STOPS.map((st, i) => (
                <g key={st.key} className={'stop' + (i === cur ? ' active' : '')} tabIndex={0} role="button" aria-label={`${st.title}, ${st.time}`}
                  onClick={() => go(i)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(i); } }}>
                  <circle className="dot" cx={st.x} cy={st.y} r={15} />
                  <text x={st.lx} y={st.ly} textAnchor={st.anchor}>{st.label}</text>
                </g>
              ))}
              <g transform={`translate(${pos.x} ${pos.y - 12})`} aria-hidden="true">
                <path d="M0 -44 c-14 0 -22 10 -22 21 c0 15 22 31 22 31 s22 -16 22 -31 c0 -11 -8 -21 -22 -21 Z" fill="#8E1825" stroke="#3D2722" strokeWidth="2.6" />
                <text x="0" y="-16" textAnchor="middle" fontFamily="Yellowtail, cursive" fontSize="22" fill="#FFEDAD">R</text>
              </g>
            </svg>
          </div>
          <div className="diary" aria-live="polite">
            <span className="mono">{s.time}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="diary-nav">
              <button aria-label="Previous stop" onClick={() => go(cur - 1)}>←</button>
              <button aria-label="Next stop" onClick={() => go(cur + 1)}>→</button>
              <span className="diary-count">{cur + 1} / {STOPS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
