import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, stagger } from '@/lib/motion';

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
}: Props) {
  return (
    <motion.div
      id={id}
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}
    >
      <motion.div
        variants={fadeUp}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs tracking-[0.2em] uppercase text-muted"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        {eyebrow}
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightish leading-[1.05] max-w-3xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={`text-base sm:text-lg text-muted leading-relaxed max-w-xl ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
