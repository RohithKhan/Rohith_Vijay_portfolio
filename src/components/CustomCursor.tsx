import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorVariant = 'default' | 'link' | 'button' | 'project' | 'image';

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Raw mouse coordinates
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Spring physics for smooth movement
  // High stiffness + low mass = very low latency, smooth interpolation
  const springConfig = { stiffness: 1000, damping: 50, mass: 0.15 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    // Only enable on fine pointers (desktops/laptops)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by the tip of the arrow (top-left)
      x.set(e.clientX);
      y.set(e.clientY);

      if (hidden) setHidden(false);

      const el = e.target as HTMLElement;
      if (!el) return;

      const interactive = el.closest('a, button, img, [data-cursor]') as HTMLElement | null;

      if (interactive) {
        const c = interactive.getAttribute('data-cursor');
        const tagName = interactive.tagName.toLowerCase();

        if (c === 'project') setVariant('project');
        else if (c === 'image' || tagName === 'img') setVariant('image');
        else if (tagName === 'button' || interactive.closest('button')) setVariant('button');
        else if (tagName === 'a' || interactive.closest('a')) setVariant('link');
        else setVariant('default');
      } else {
        setVariant('default');
      }
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [x, y, hidden]);

  if (!enabled) return null;

  // Determine styles based on variant
  const isHovered = variant !== 'default';
  
  // Arrow scaling
  let arrowScale = 1;
  if (isClicked) arrowScale = 0.9;
  else if (variant === 'button') arrowScale = 1.15;
  else if (variant === 'link') arrowScale = 1.05;

  // Halo properties
  const showHalo = isHovered || isClicked;
  let haloScale = 0;
  let haloOpacity = 0;
  
  if (isClicked) {
    haloScale = 1.5;
    haloOpacity = 0.5;
  } else if (variant === 'button') {
    haloScale = 1.2;
    haloOpacity = 0.3;
  } else if (variant === 'link') {
    haloScale = 1;
    haloOpacity = 0.2;
  } else if (variant === 'image') {
    haloScale = 1;
    haloOpacity = 0.15;
  } else if (variant === 'project') {
    haloScale = 1.1;
    haloOpacity = 0.2;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-screen">
      <motion.div
        className="absolute top-0 left-0 flex items-start justify-start"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        {/* Halo / Ripple */}
        <motion.div
          className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-blue-500/30 blur-md"
          initial={false}
          animate={{
            scale: haloScale,
            opacity: haloOpacity,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            mass: 0.5
          }}
        />

        {/* Project Label */}
        <AnimatePresence>
          {variant === 'project' && (
            <motion.div
              initial={{ opacity: 0, x: 10, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 24, y: 24, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-blue-100"
              style={{
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(96, 165, 250, 0.4)',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2), inset 0 0 12px rgba(96, 165, 250, 0.1)'
              }}
            >
              VIEW PROJECT &rarr;
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Glass Arrow */}
        <motion.div
          className="relative origin-top-left"
          initial={false}
          animate={{ scale: arrowScale }}
          transition={{ type: 'spring', stiffness: 600, damping: 35, mass: 0.4 }}
        >
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 blur-sm bg-blue-400/20 rounded-full scale-150" />
          
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10"
            style={{ transform: 'rotate(-5deg)' }} // slight tilt for elegance
          >
            {/* Base Glass Body */}
            <path
              d="M6 3L25 14L15 16.5L10 27L6 3Z"
              fill="rgba(255, 255, 255, 0.15)"
              stroke="rgba(96, 165, 250, 0.9)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Inner Highlight/Reflection to sell the glass effect */}
            <path
              d="M7.5 5.5L21.5 13.5L14.5 15.5L11 23.5L7.5 5.5Z"
              fill="url(#glass-gradient)"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="glass-gradient" x1="6" y1="3" x2="25" y2="27" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.6" />
                <stop offset="0.5" stopColor="white" stopOpacity="0.1" />
                <stop offset="1" stopColor="#60A5FA" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

      </motion.div>
    </div>
  );
}
