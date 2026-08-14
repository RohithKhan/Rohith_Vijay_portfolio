import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
  glare?: boolean;
};

/**
 * A card that tilts in 3D toward the cursor. Used for project cards.
 */
export function TiltCard({ children, className = '', max = 8, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`);
    setGlarePos({ x: px * 100, y: py * 100, o: 0.15 });
  };

  const onLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setGlarePos((g) => ({ ...g, o: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`relative preserve-3d ${className}`}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.o,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25), transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  );
}
