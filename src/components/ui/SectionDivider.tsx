import { motion } from 'framer-motion';

/**
 * SectionDivider — an elegant gradient separator with an animated light
 * sweep, placed between sections to make transitions feel intentional.
 */
export function SectionDivider() {
  return (
    <div className="relative max-w-6xl mx-auto px-6 h-px">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <motion.div
        className="absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent blur-[1px]"
        initial={{ left: '-10%', opacity: 0 }}
        whileInView={{ left: '100%', opacity: [0, 1, 0] }}
        viewport={{ once: true, margin: '-50% 0px' }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
