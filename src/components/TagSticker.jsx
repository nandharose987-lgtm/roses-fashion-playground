import { useRef } from 'react';
import { useInView, reducedMotion } from '../hooks.js';

/* The little tilted sticker on each section heading. It "stamps" in when you scroll to it. */
export default function TagSticker({ children, bg, fg, right }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const cls = 'tag-sticker' + (right ? ' right' : '') + (seen && !reducedMotion() ? ' stamp' : '');
  return <span ref={ref} className={cls} style={{ '--bg': bg, '--fg': fg }}>{children}</span>;
}
