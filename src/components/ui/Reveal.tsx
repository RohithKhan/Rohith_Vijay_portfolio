import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** direction the content travels from */
  from?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

const offset = 40;

const map: Record<NonNullable<RevealProps['from']>, Variants> = {
  up: {
    hidden: { opacity: 0, y: offset },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -offset },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -offset },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: offset },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, y: 20, filter: 'blur(14px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
};

/**
 * Reveal — scroll-triggered entrance animation with a premium easing.
 * Wraps any content and animates it into view once.
 */
export function Reveal({
  children,
  className = '',
  from = 'up',
  delay = 0,
  duration = 0.8,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const v = map[from];
  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
