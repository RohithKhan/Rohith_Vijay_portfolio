import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type LoaderProps = {
  onComplete: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

const loadingStates = [
  'INITIALIZING PORTFOLIO...',
  'LOADING EXPERIENCE...',
  'LOADING PROJECTS...',
  'LOADING INTERFACE...',
  'SYSTEM READY',
];

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    // Use a slightly faster duration so it doesn't artificially delay, but allows time to see the polish.
    const duration = 2200; 

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // Premium easing curve (easeOutExpo like)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      
      const currentProgress = Math.round(eased * 100);
      setProgress(currentProgress);

      // Determine status text based on progress
      if (currentProgress < 25) setStatusIndex(0);
      else if (currentProgress < 50) setStatusIndex(1);
      else if (currentProgress < 75) setStatusIndex(2);
      else if (currentProgress < 100) setStatusIndex(3);
      else setStatusIndex(4);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setIsReady(true);
        // Wait 600ms before triggering the exit transition so the user can read "SYSTEM READY" and see the final glow
        setTimeout(() => setComplete(true), 600);
      }
    };
    raf = requestAnimationFrame(tick);
    
    return () => cancelAnimationFrame(raf);
  }, []);

  const [complete, setComplete] = useState(false);

  // Trigger onComplete after exit animation finishes
  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
          exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.6, ease } }}
        >
          {/* BACKGROUND & EFFECTS */}
          {/* Ambient Glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vmax] h-[50vmax] rounded-full blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08), transparent 60%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0.6, scale: isReady ? 1.2 : 1 }}
            transition={{ duration: 1.5, ease }}
          />

          {/* Faint Grid */}
          {/* <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
          /> */}

          {/* Minimal Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-blue-400"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: '0 0 6px 1px rgba(96,165,250,0.6)'
                }}
                animate={{
                  y: [0, -40],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>


          {/* HUD CORNER ELEMENTS */}
          <div className="hidden sm:block absolute inset-6 pointer-events-none">
            {/* Top Left */}
            <div className="absolute top-0 left-0 flex items-center gap-3">
              <div className="w-4 h-4 border-t border-l border-blue-500/40" />
              <span className="text-[9px] font-mono tracking-widest text-blue-400/60 uppercase">SYS // 001</span>
            </div>
            {/* Top Right */}
            <div className="absolute top-0 right-0 flex items-center gap-3">
              <span className="text-[9px] font-mono tracking-widest text-blue-400/60 uppercase">ONLINE</span>
              <div className="w-4 h-4 border-t border-r border-blue-500/40" />
            </div>
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 flex items-center gap-3">
              <div className="w-4 h-4 border-b border-l border-blue-500/40" />
              <span className="text-[9px] font-mono tracking-widest text-blue-400/60 uppercase">INITIALIZING CORE...</span>
            </div>
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 flex items-center gap-3">
              <span className="text-[9px] font-mono tracking-widest text-blue-400/60 uppercase">V.1.0 // ROHITH</span>
              <div className="w-4 h-4 border-b border-r border-blue-500/40" />
            </div>
          </div>


          {/* MAIN CENTER CONTENT */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Logo Wrapper */}
            <motion.div className="relative mb-12 flex items-center justify-center">
              {/* Subtle glass background behind logo that forms */}
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease }}
              />

              {/* The V/R Logo */}
              <motion.div
                className="relative w-20 h-20 flex items-center justify-center text-3xl font-bold tracking-tighter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease }}
              >
                {/* Thin outline stroke effect */}
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
                  <motion.rect
                    x="4" y="4" width="72" height="72" rx="14"
                    fill="none"
                    stroke="rgba(59,130,246,0.6)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </svg>

                {/* Sweep light effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/30 to-transparent -skew-x-12"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4, ease }}
                  style={{ mixBlendMode: 'screen' }}
                />

                <span className="relative z-10 text-white/90 bg-clip-text">VR</span>

                {/* Final bright glow when ready */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isReady ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>

            {/* Profile Identity */}
            <motion.div 
              className="flex flex-col items-center gap-2 mb-16 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              <h1 className="text-sm tracking-[0.4em] uppercase text-white/90 font-medium">
                V. Rohith
              </h1>
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-blue-400/70 font-mono">
                Developer • Designer • Problem Solver
              </h2>
            </motion.div>

            {/* Progress Section */}
            <motion.div 
              className="w-full max-w-[280px] flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
            >
              {/* Dynamic Status Text */}
              <div className="flex justify-between items-end px-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={statusIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className={`text-[9px] font-mono tracking-widest uppercase ${isReady ? 'text-green-400' : 'text-blue-400/80'}`}
                  >
                    {loadingStates[statusIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[10px] font-mono tracking-wider text-white/60">
                  {progress}%
                </span>
              </div>

              {/* Advanced Progress Line */}
              <div className="relative w-full h-[2px] rounded-full overflow-hidden bg-white/[0.05] border border-white/[0.02]">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
                
                {/* Leading edge light particle */}
                <motion.div
                  className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent to-white rounded-full blur-[1px]"
                  style={{ left: `${progress}%`, x: '-100%' }}
                />
                {/* Glow for the track */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue-400/40 blur-sm rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
