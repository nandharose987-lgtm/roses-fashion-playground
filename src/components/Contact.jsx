import { useRef, useState } from 'react';
import { useToast } from './Toast.jsx';
import TagSticker from './TagSticker.jsx';

function CopyRow({ label, value, copy }) {
  const toast = useToast();
  const valRef = useRef(null);
  const [done, setDone] = useState(false);
  const onCopy = () => {
    const selectIt = () => {
      const r = document.createRange(); r.selectNodeContents(valRef.current);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      toast('Selected. Press copy on your keyboard.');
    };
    try {
      navigator.clipboard.writeText(copy).then(() => { setDone(true); setTimeout(() => setDone(false), 1600); }, selectIt);
    } catch { selectIt(); }
  };
  return (
    <li>
      <span className="mono">{label}</span>
      <span className="val" ref={valRef}>{value}</span>
      <button className="copy" onClick={onCopy}>{done ? 'Copied' : 'Copy'}</button>
    </li>
  );
}

function Envelope() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mail">
      <span className="mail-label">You've got mail ↓ tap the envelope</span>
      <button className={'envelope' + (open ? ' open' : '')} aria-label="Open a note from Rose" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span className="env-back" />
        <span className="letter"><p>Thanks for visiting my playground!</p><small>Come back soon. There's always something new. — Rose</small></span>
        <span className="env-front">
          <svg viewBox="0 0 300 200" preserveAspectRatio="none">
            <path d="M0 0 L150 110 L300 0 V200 H0 Z" fill="#8E1825" stroke="#3D2722" strokeWidth="2" strokeLinejoin="round" />
            <path d="M2 198 L132 104 M298 198 L168 104" fill="none" stroke="#3D2722" strokeWidth="2" opacity=".5" />
          </svg>
        </span>
        <span className="flap"><svg viewBox="0 0 300 124" preserveAspectRatio="none"><path d="M2 2 L150 120 L298 2 Z" fill="#7a1420" stroke="#3D2722" strokeWidth="2" strokeLinejoin="round" /></svg></span>
        <span className="seal">r</span>
      </button>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="band band-blue site-foot" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <h2 className="h2">Let's make something new.<TagSticker right bg="var(--cherry)" fg="var(--butter)">say hi</TagSticker></h2>
            <p className="contact-lede">A collab, a shoot, feedback on an idea, or a coffee in Melbourne. I'm always up for meeting someone new.</p>
            <ul className="contact-list">
              <CopyRow label="Email" value="nandharose987@gmail.com" copy="nandharose987@gmail.com" />
              <CopyRow label="Phone" value="0402 665 854" copy="0402665854" />
              <li><span className="mono">Instagram</span><a className="val" href="https://www.instagram.com/roz_nandha/" target="_blank" rel="noopener noreferrer">@roz_nandha ↗</a></li>
              <li><span className="mono">Based in</span><span className="val">Melbourne, Australia</span></li>
            </ul>
          </div>
          <Envelope />
        </div>
        <p className="wordmark" aria-hidden="true">NANDHA ROSE DOMINIC</p>
        <div className="foot-row">
          <span>Made by Rose for <b>Fabric to Fashion Essentials</b> · Master's in Fashion Entrepreneurship</span>
          <nav aria-label="Footer"><a href="#about">About</a><a href="#work">Work</a><a href="#brain">The big idea</a><a href="#home">Back to top ↑</a></nav>
        </div>
      </div>
    </section>
  );
}
