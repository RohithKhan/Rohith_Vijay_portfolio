import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — a thin glowing bar pinned to the top of the viewport
 * that fills as the user scrolls. Uses a spring for a premium feel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[95] origin-left"
      style={{ scaleX }}
    >
      <div className="h-full w-full bg-gradient-to-r from-accent via-accent-hover to-accent" />
      <div className="absolute inset-0 blur-sm bg-gradient-to-r from-accent/60 to-accent-hover/60" />
    </motion.div>
  );
}
