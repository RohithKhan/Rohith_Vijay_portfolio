import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Wraps content and translates it toward the cursor while hovered,
 * then springs back on leave. Used for buttons and links.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * strength, y: y * strength });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
