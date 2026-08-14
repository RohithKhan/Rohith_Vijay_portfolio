import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type Props = {
  children: string;
  className?: string;
  by?: 'word' | 'letter';
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
};

/**
 * SplitText — reveals text by word or letter with a mask + blur-up motion.
 * Each unit is wrapped in an overflow-hidden span and translated from
 * y=100% to 0, giving a clean line-reveal effect. Words preserve spaces.
 */
export function SplitText({
  children,
  className = '',
  by = 'word',
  delay = 0,
  stagger = 0.04,
  once = true,
  as = 'h2',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });

  const Tag = motion[as] as typeof motion.h2;

  const units =
    by === 'letter'
      ? Array.from(children).map((c, i) => ({ id: i, text: c === ' ' ? '\u00A0' : c }))
      : children.split(' ').map((w, i) => ({ id: i, text: w }));

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      aria-label={children}
    >
      {units.map((u, i) => (
        <span key={u.id} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
            animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {u.text}
            {by === 'word' && i < units.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
