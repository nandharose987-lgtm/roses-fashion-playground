import { useEffect, useState } from 'react';

/* The little "Caught your eye?" card that appears in the corner while you scroll. */
export default function PopCard() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (dismissed) return;
    const check = () => {
      const c = document.getElementById('contact')?.getBoundingClientRect().top ?? 9999;
      setShow(scrollY > innerHeight * 0.8 && c > innerHeight * 0.6);
    };
    check();
    addEventListener('scroll', check, { passive: true });
    return () => removeEventListener('scroll', check);
  }, [dismissed]);
  return (
    <aside className={'pop-card' + (show && !dismissed ? '' : ' away')} aria-label="Get in touch">
      <span className="ico"><svg viewBox="0 0 40 40" aria-hidden="true"><g fill="none" stroke="#3D2722" strokeWidth="2" strokeLinejoin="round"><rect x="12" y="22" width="16" height="14" rx="2" fill="#8E1825" /><rect x="14" y="14" width="12" height="8" fill="#FFFDF7" /><path d="M15 14 V6 l10 -3 v11" fill="#8E1825" /></g></svg></span>
      <span><b>Caught your eye?</b><a href="#contact">Say hi →</a></span>
      <button className="x" aria-label="Dismiss" onClick={() => setDismissed(true)}>✕</button>
    </aside>
  );
}
