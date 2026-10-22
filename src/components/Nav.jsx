import { useEffect, useRef, useState } from 'react';

const LINKS = [
  ['#home', 'home', 'the front door'],
  ['#about', 'about me', 'why a playground?'],
  ['#work', 'my work', 'six hats'],
  ['#life', 'off the clock', 'walks, gym, food, travel'],
  ['#brain', 'my brain', 'the big idea'],
  ['#contact', 'say hi', "let's talk"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="nav">
        <a className="logo" href="#home" aria-label="Rose, back to top">rose</a>
        <button className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>MENU</button>
      </header>
      <div className="menu" id="menu" hidden={!open}>
        <button className="menu-close" ref={closeRef} onClick={() => setOpen(false)}>CLOSE</button>
        <nav aria-label="Sections">
          {LINKS.map(([href, label, note]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label} <span>{note}</span></a>
          ))}
        </nav>
      </div>
    </>
  );
}
