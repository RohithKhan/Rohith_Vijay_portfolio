import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type LoaderProps = {
  onComplete: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

const loadingStates = [
  'INITIALIZING DESIGN SYSTEM',
  'LOADING COMPONENTS',
  'COMPILING EXPERIENCE',
  'READY',
];

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2800; // Slightly longer for the narrative to play out elegantly

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // Smooth easing for the progress number
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      
      const currentProgress = Math.round(eased * 100);
      setProgress(currentProgress);

      if (currentProgress < 25) setStatusIndex(0);
      else if (currentProgress < 60) setStatusIndex(1);
      else if (currentProgress < 95) setStatusIndex(2);
      else setStatusIndex(3);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setIsReady(true);
        // Wait briefly at 100% before triggering the exit transition
        setTimeout(() => setComplete(true), 400); 
      }
    };
    raf = requestAnimationFrame(tick);
    
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* SOLID BACKGROUND - Fades out to reveal the site seamlessly */}
          <motion.div 
            className="absolute inset-0 bg-[#0B0B0B]"
            animate={{ opacity: isReady ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
          />

          {/* GRID (DESIGN LAYER) */}
          <motion.div 
            className="absolute inset-0 opacity-0 mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 0 : 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(96,165,250,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
            }}
          />

          {/* DESIGN & CODE LAYER FRAGMENTS */}
          <motion.div 
            className="absolute inset-0"
            animate={{ opacity: isReady ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Developer Tags */}
            <motion.div 
              className="absolute top-[25%] left-[20%] font-mono text-[9px] text-blue-400/20 tracking-wider"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            >
              {"{ init() }"}
            </motion.div>
            <motion.div 
              className="absolute bottom-[35%] right-[20%] font-mono text-[9px] text-blue-400/20 tracking-wider"
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
            >
              {"<Experience />"}
            </motion.div>
            <motion.div 
              className="absolute top-[65%] left-[25%] font-mono text-[9px] text-blue-400/10 tracking-wider"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            >
              {"const layout = true;"}
            </motion.div>
            <motion.div 
              className="absolute top-[35%] right-[25%] font-mono text-[9px] text-blue-400/10 tracking-wider"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            >
              {"// render"}
            </motion.div>

            {/* Design Crosshairs */}
            <motion.div 
              className="absolute top-[30%] right-[30%] flex items-center justify-center w-4 h-4 opacity-30"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.4, scale: 1 }} transition={{ delay: 0.5 }}
            >
              <div className="absolute w-full h-[1px] bg-blue-400/50" />
              <div className="absolute h-full w-[1px] bg-blue-400/50" />
            </motion.div>
            <motion.div 
              className="absolute bottom-[30%] left-[30%] flex items-center justify-center w-4 h-4 opacity-30"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.4, scale: 1 }} transition={{ delay: 0.9 }}
            >
              <div className="absolute w-full h-[1px] bg-blue-400/50" />
              <div className="absolute h-full w-[1px] bg-blue-400/50" />
            </motion.div>

            {/* Animated Design Cursor */}
            <motion.div
              className="absolute z-50 pointer-events-none"
              initial={{ x: '10vw', y: '70vh', opacity: 0 }}
              animate={isReady ? { opacity: 0 } : { 
                x: ['10vw', '35vw', '50vw', '55vw'], 
                y: ['70vh', '25vh', '50vh', '45vh'],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2.4,
                times: [0, 0.4, 0.7, 1],
                ease: "easeInOut"
              }}
            >
              {/* Figma/Mac style cursor */}
              <svg width="18" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                <path d="M1.08272 0.706132C0.609503 0.231267 -0.203772 0.569477 -0.197992 1.23963L0.264771 19.9882C0.270634 20.6687 1.09241 21.0026 1.55403 20.5118L5.61715 16.1917C5.74836 16.0522 5.93282 15.9734 6.12457 15.9734H14.1293C14.8016 15.9734 15.1378 15.1583 14.6627 14.6815L1.08272 0.706132Z" fill="#60a5fa" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* CENTRAL CONSTRUCTION (Signature Animation) */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[500px] h-[200px] px-6">
            
            {/* The transforming signature element */}
            <motion.div
              className="absolute border border-blue-400/[0.08] bg-blue-400/[0.01] backdrop-blur-sm"
              initial={{ width: 0, height: 1, opacity: 0 }}
              animate={isReady ? {
                width: '100vw',
                height: '100vh',
                borderWidth: 0,
                backgroundColor: 'rgba(96,165,250,0)',
                backdropFilter: 'blur(0px)',
              } : {
                width: ["0%", "80%", "2px", "100%"],
                height: [1, 1, 24, 160],
                opacity: [0, 1, 1, 1],
                borderWidth: [0, 0, 0, 1],
                backgroundColor: [
                  "rgba(35, 130, 247, 0.4)", 
                  "rgba(61, 147, 252, 0.4)", 
                  "rgba(14, 115, 238, 0.8)", 
                  "rgba(96,165,250,0.02)"
                ]
              }}
              transition={isReady ? {
                duration: 0.8, ease
              } : {
                duration: 2.2,
                times: [0, 0.25, 0.45, 1],
                ease: [0.16, 1, 0.3, 1]
              }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              style={{ originX: 0.5, originY: 0.5 }}
            />

            {/* Inner Content Reveal */}
            <motion.div 
              className="relative flex flex-col items-center justify-center pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isReady ? 0 : 1, y: isReady ? -20 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: isReady ? 0 : 1.2, ease }}
            >
              <h1 className="text-2xl sm:text-3xl tracking-[0.4em] uppercase text-blue-400/90 font-light mb-3">
                Rohith
              </h1>
              <div className="flex items-center gap-3 text-[9px] sm:text-[10px] tracking-[0.3em] font-mono text-blue-400/50">
                <span>DEVELOPER</span>
                <motion.span 
                  className="text-blue-400/80"
                  animate={{ rotate: 90 }}
                  transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                >×</motion.span>
                <span>DESIGNER</span>
              </div>
            </motion.div>

          </div>

          {/* PROGRESS INDICATOR */}
          <motion.div 
            className="absolute bottom-12 w-full max-w-[300px] px-8 flex flex-col gap-3 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isReady ? 0 : 1, y: isReady ? 10 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1, ease }}
          >
            <div className="flex justify-between items-end px-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 4 }}
                  transition={{ duration: 0.3 }}
                  className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-blue-400/40"
                >
                  {loadingStates[statusIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-blue-400/80">
                {String(progress).padStart(2, '0')}%
              </span>
            </div>
            {/* Minimal Progress Bar */}
            <div className="relative w-full h-[1px] bg-blue-400/10 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-400/60"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
