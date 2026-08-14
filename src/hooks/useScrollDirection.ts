import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down' | 'idle';

/**
 * Tracks scroll direction. Returns the current direction and whether
 * the user has scrolled past a threshold. Used to hide/reveal the navbar.
 */
export function useScrollDirection(threshold = 40) {
  const [direction, setDirection] = useState<Direction>('idle');
  const [scrolled, setScrolled] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > threshold);
      const diff = y - last.current;
      if (Math.abs(diff) < 6) return;
      setDirection(diff > 0 ? 'down' : 'up');
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { direction, scrolled };
}
