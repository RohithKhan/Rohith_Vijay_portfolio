import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initializes Lenis smooth scrolling once for the whole app.
 * Respects prefers-reduced-motion by skipping smoothing.
 */
export function useLenis() {
  useEffect(() => {
    // Skip Lenis on reduced motion or mobile viewports to ensure pure native touch scrolling
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let frameId = 0;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // Smooth anchor links
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      }
    };
    document.addEventListener('click', handleAnchor);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('click', handleAnchor);
      lenis.destroy();
    };
  }, []);
}
