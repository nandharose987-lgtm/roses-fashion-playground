import { useEffect, useRef, useState } from 'react';
import { ROLES } from '../content.js';
import { useInView, reducedMotion } from '../hooks.js';
import TagSticker from './TagSticker.jsx';
import polaroid from '../assets/rose-polaroid.jpg';

const INTRO = "Doing the same thing every day wears me out fast. What keeps me going is the rush of starting something new: a new skill, a new city, a new person to talk to. Fashion gave me room to do exactly that, so I've tried a bit of everything under its umbrella.";

// The big paragraph "fills in" word by word as you scroll past it
function RevealText() {
  const ref = useRef(null);
  const words = INTRO.split(' ');
  const [lit, setLit] = useState(words.length);
  useEffect(() => {
    if (reducedMotion()) return;
    const paint = () => {
      const r = ref.current.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      setLit(Math.round(p * words.length));
    };
    paint();
    addEventListener('scroll', paint, { passive: true });
    return () => removeEventListener('scroll', paint);
  }, [words.length]);
  return (
    <p className="reveal-text" ref={ref}>
      {words.map((w, i) => <span key={i}><span className="w" style={{ '--o': i < lit ? 1 : 0.3 }}>{w}</span>{i < words.length - 1 ? ' ' : ''}</span>)}
    </p>
  );
}

function Stat({ n, sup, title, note }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const [shown, setShown] = useState(n);
  useEffect(() => {
    if (!seen || n === 0 || reducedMotion()) return;
    let k = 0;
    const t = setInterval(() => { setShown(k); if (k++ >= n) clearInterval(t); }, 120);
    return () => clearInterval(t);
  }, [seen, n]);
  return (
    <div className="stat">
      <span className="stat-num" ref={ref}>{shown}{sup && <sup>{sup}</sup>}</span>
      <b>{title}</b><span>{note}</span>
    </div>
  );
}

export default function About() {
  const pills = [...ROLES, ...ROLES, ...ROLES, ...ROLES];
  return (
    <section className="band band-blue" id="about">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">I get bored easily. So I built a playground.<TagSticker bg="var(--cherry)" fg="var(--butter)">about me</TagSticker></h2>
        </div>
      </div>
      <div className="wave" aria-label="Areas of fashion Rose has worked in">
        <div className="wave-track">
          {pills.map((r, i) => (
            <span key={i} className="wave-pill" style={{ '--bg': r.bg, '--fg': r.fg, '--i': i }} aria-hidden={i >= ROLES.length * 2 || undefined}>{r.t}</span>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="about-grid">
          <div className="about-left">
            <RevealText />
            <figure className="polaroid">
              <img src={polaroid} alt="Rose smiling by her window in Melbourne" />
              <figcaption>me, probably plotting something new</figcaption>
            </figure>
          </div>
          <div className="about-notes">
            <div className="note-card">
              <span className="mono">Where it started</span>
              <p>I grew up in a business family, watching my mom and dad run their business up close. Being an entrepreneur has been my dream since I was a kid, and I've always known it would be in fashion.</p>
            </div>
            <p>Back in India, I started my own independent label, <b>Roz Dominic</b>. I built it on my own as a place to explore my ideas and use my creativity.</p>
            <p>Right now I'm doing my Master's in Fashion Entrepreneurship in Melbourne. Along the way I've worked behind the camera, styled looks, designed, dug into business and marketing, and worked as a hair and makeup artist.</p>
            <p className="hand">This site is my playground: what I've made, what I love, and the ideas I can't stop thinking about.</p>
          </div>
        </div>
        <div className="stats">
          <Stat n={6} sup="+" title="Hats tried on" note="From photography to makeup" />
          <Stat n={1} title="Big dream" note="My own business in fashion" />
          <Stat n={0} title="Days the same" note="And that's the plan" />
        </div>
      </div>
    </section>
  );
}
