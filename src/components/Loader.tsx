import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type LoaderProps = {
  onComplete: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2000;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 450);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const letters = 'Rohith Vijay'.split('');

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-base"
          exit={{ opacity: 0, filter: 'blur(12px)', transition: { duration: 0.7, ease } }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute w-[40vmax] h-[40vmax] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)' }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
          />

          {/* Animated monogram ring */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease }}
            className="relative mb-10"
          >
            <svg width="76" height="76" viewBox="0 0 76 76" className="overflow-visible">
              <motion.circle
                cx="38"
                cy="38"
                r="32"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="38"
                cy="38"
                r="32"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ rotate: -90, transformOrigin: 'center' }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ ease: 'linear' }}
              />
              <text
                x="38"
                y="47"
                textAnchor="middle"
                className="fill-white"
                style={{ font: '600 28px Inter, sans-serif' }}
              >
                R
              </text>
            </svg>
          </motion.div>

          {/* Letter-by-letter name reveal */}
          <div className="flex overflow-hidden mb-8">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                className="text-sm tracking-[0.35em] uppercase text-white/90 font-medium"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: ch === ' ' ? 0 : 1 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.7, ease }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </div>

          {/* Progress track */}
          <div className="relative w-60 h-px bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-hover"
              style={{ width: `${progress}%` }}
            />
            <motion.div
              className="absolute inset-y-0 w-16 bg-white/40 blur-[2px]"
              style={{ left: `${progress}%`, translateX: '-50%' }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-xs tabular-nums text-muted/70"
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
