import { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

/**
 * Ambient animated background:
 *  - subtle animated grid with low opacity
 *  - soft drifting radial lights
 *  - floating particles
 *  - mouse-reactive glow that follows the cursor
 *  - film-grain noise overlay
 * Everything moves very slowly and stays subtle so content leads.
 */
export function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 14,
        xDrift: (Math.random() - 0.5) * 40,
      })),
    []
  );

  // Mouse-reactive glow
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const gx = useSpring(mx, { stiffness: 40, damping: 30 });
  const gy = useSpring(my, { stiffness: 40, damping: 30 });

  // Scroll-linked parallax
  const { scrollY } = useScroll();
  // Smooth scroll translation for a glass-like depth effect
  const smoothScrollY = useSpring(scrollY, { stiffness: 60, damping: 20 });
  const gridY = useTransform(smoothScrollY, [0, 5000], [0, 500]);
  const particleParallaxY = useTransform(smoothScrollY, [0, 5000], [0, 200]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-base pointer-events-none">
      {/* Subtle animated grid with scroll parallax - Desktop only */}
      {/* <motion.div
        className="hidden md:block absolute inset-0 opacity-[0.035]"
        style={{
          y: gridY,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 78%)',
        }}
        animate={{ backgroundPosition: ['0px 0px', '64px 64px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      /> */}

      {/* Slowly drifting radial lights - Desktop only */}
      <motion.div
        className="hidden md:block absolute -inset-[25%]"
        animate={{ rotate: [0, 8, -6, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(50% 40% at 25% 20%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(45% 35% at 80% 75%, rgba(34,197,94,0.07), transparent 60%)',
        }}
      />

      {/* Mouse-reactive glow - Desktop only */}
      <motion.div
        className="hidden md:block absolute h-[40vmax] w-[40vmax] rounded-full blur-[120px]"
        style={{
          left: '0%',
          top: '0%',
          x: useSpring(gx, { stiffness: 40, damping: 30 }),
          y: useSpring(gy, { stiffness: 40, damping: 30 }),
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%)',
        }}
      />

      {/* Floating particles with scroll parallax */}
      <motion.div className="absolute inset-0" style={{ y: particleParallaxY }}>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/40"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{
              y: [0, -30, 0],
              x: [0, p.xDrift, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Film-grain noise */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6))]" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-base to-transparent" />
    </div>
  );
}
