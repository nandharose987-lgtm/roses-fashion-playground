import { useEffect, useState } from 'react';

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* True once the element has scrolled into view (stays true after that). */
export function useInView(ref, threshold = 0.6) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(node);
    return () => io.disconnect();
  }, [ref, seen, threshold]);
  return seen;
}
