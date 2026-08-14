import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function CyberScrollLine() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress slightly to feel more premium and less jittery
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map 0-1 to 0%-100% for the vertical position of the glow dot
  const yPos = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 h-[50vh] w-[2px] z-50 pointer-events-none mix-blend-screen">
      {/* Background track (faint glass line) */}
      <div className="absolute inset-0 bg-white/[0.04] rounded-full" />
      
      {/* Active progress fill */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400/10 via-blue-500/60 to-blue-400/10 rounded-full"
        style={{ height: '100%', scaleY: smoothProgress, transformOrigin: 'top' }}
      />
      
      {/* The glowing "data packet" tracking the scroll tip */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-full bg-blue-100 shadow-[0_0_12px_2px_rgba(96,165,250,0.6)]"
        style={{
          top: yPos,
          y: '-50%' // center the dot on the exact tracked position
        }}
      />
    </div>
  );
}
