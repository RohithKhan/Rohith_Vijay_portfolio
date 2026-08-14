import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'button' | 'link' | 'view' | 'drag';

type CursorState = {
  variant: CursorVariant;
  label: string;
};

/**
 * CustomCursor — a premium two-part cursor (dot + ring) with:
 *  - smooth spring interpolation
 *  - morphing ring that grows over interactive elements
 *  - text labels ("View", "Drag", etc.) driven by data-cursor attributes
 *  - magnetic attraction toward [data-magnetic] elements
 *  - disabled on touch / reduced-motion devices
 */
export function CustomCursor() {
  const [state, setState] = useState<CursorState>({ variant: 'default', label: '' });
  const [hidden, setHidden] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Dot follows tightly
  const dotX = useSpring(x, { stiffness: 600, damping: 35, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 600, damping: 35, mass: 0.4 });

  // Ring trails slightly for a lag effect
  const ringX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.7 });

  // Magnetic offset applied to the ring
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const magXs = useSpring(magX, { stiffness: 200, damping: 18 });
  const magYs = useSpring(magY, { stiffness: 200, damping: 18 });

  const magTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const el = e.target as HTMLElement;
      if (!el) return;
      const interactive = el.closest('a, button, [data-cursor]') as HTMLElement | null;

      if (interactive) {
        const c = interactive.getAttribute('data-cursor');
        const label = interactive.getAttribute('data-cursor-label') ?? '';
        if (c === 'view') setState({ variant: 'view', label: label || 'View' });
        else if (c === 'drag') setState({ variant: 'drag', label: label || 'Drag' });
        else if (interactive.tagName === 'A') setState({ variant: 'link', label });
        else setState({ variant: 'button', label });
      } else {
        setState({ variant: 'default', label: '' });
      }

      // Magnetic attraction
      const magnetic = el.closest('[data-magnetic]') as HTMLElement | null;
      if (magnetic) {
        const r = magnetic.getBoundingClientRect();
        magX.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        magY.set((e.clientY - (r.top + r.height / 2)) * 0.25);
        magTarget.current = magnetic;
      } else if (magTarget.current) {
        magX.set(0);
        magY.set(0);
        magTarget.current = null;
      }
    };

    const leave = () => setHidden(true);
    const enter = () => setHidden(false);
    const down = () => setState((s) => ({ ...s, variant: s.variant === 'view' ? 'view' : 'button' }));

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    window.addEventListener('mousedown', down);
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      window.removeEventListener('mousedown', down);
    };
  }, [x, y, magX, magY]);

  if (!enabled) return null;

  const { variant, label } = state;

  const ringSize =
    variant === 'view' || variant === 'drag' ? 88 : variant === 'button' ? 52 : 34;
  const dotSize = variant === 'view' || variant === 'drag' ? 0 : variant === 'button' ? 10 : 6;
  const ringBg =
    variant === 'view'
      ? 'rgba(59,130,246,0.14)'
      : variant === 'drag'
        ? 'rgba(34,197,94,0.14)'
        : 'rgba(255,255,255,0)';
  const ringBorder =
    variant === 'view'
      ? 'rgba(59,130,246,0.5)'
      : variant === 'drag'
        ? 'rgba(34,197,94,0.5)'
        : 'rgba(255,255,255,0.4)';

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference">
      {/* Outer ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          marginLeft: magXs,
          marginTop: magYs,
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: ringBg,
          borderColor: ringBorder,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: ringBorder }}
        />
        {label && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/90 font-medium">
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-white"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
          opacity: hidden ? 0 : variant === 'view' || variant === 'drag' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
    </div>
  );
}
