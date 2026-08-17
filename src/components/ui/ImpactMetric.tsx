import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { Activity } from 'lucide-react';

interface ImpactMetricProps {
  value: string;
  label: string;
  caption?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'glow' | 'outline';
  accentColor?: string;
  className?: string;
}

const AnimatedNumber = ({ value }: { value: string }) => {
  const match = value.match(/^([0-9.]+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!match || !ref.current || !inView) return;

    const num = parseFloat(match[1]);
    const suffix = match[2];

    const controls = animate(0, num, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1], // Custom easing for premium feel
      onUpdate(currentValue) {
        if (ref.current) {
          ref.current.textContent = Math.floor(currentValue) + suffix;
        }
      }
    });

    return () => controls.stop();
  }, [value, inView]);

  if (!match) return <span>{value}</span>;
  return <span ref={ref}>0{match[2]}</span>;
};

export const ImpactMetric: React.FC<ImpactMetricProps> = ({
  value,
  label,
  caption = "LIVE IMPACT",
  icon = <Activity size={12} />,
  accentColor = "#22C55E",
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group/metric relative flex flex-col items-end sm:items-start ${className}`}
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      {/* Subtle background glow */}
      <div 
        className="absolute inset-0 rounded-2xl blur-xl transition-all duration-700 opacity-20 group-hover/metric:opacity-40"
        style={{ background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)` }}
      />
      
      {/* Soft radial light sweep on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-[-20deg] w-[200%] -left-[50%]"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 glass border border-white/5 rounded-2xl p-3 sm:p-4 pr-10 sm:pr-12 backdrop-blur-md overflow-hidden flex flex-col gap-1 shadow-lg bg-black/40 hover:bg-black/60 transition-colors duration-500">
        
        {/* Caption with blinking live indicator */}
        <div className="flex items-center gap-1.5 opacity-80 mb-1">
          <div className="relative flex items-center justify-center w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: 'var(--accent)' }} />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-white/70">
            {caption}
          </span>
        </div>

        {/* Value and Label */}
        <div className="flex items-baseline gap-2">
          <motion.div 
            className="text-2xl sm:text-3xl font-black tracking-tighter text-white"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatedNumber value={value} />
          </motion.div>
          <span className="text-xs sm:text-sm font-medium text-white/50 tracking-wider">
            {label}
          </span>
        </div>

        {/* Animated circular progress / orbit ring positioned absolutely on the right side */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/metric:border-white/20 transition-colors duration-500">
          {/* Rotating orbit */}
          <motion.div
            className="absolute inset-[-2px] rounded-full border border-transparent border-t-[var(--accent)] border-r-[var(--accent)] opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: isHovered ? 2 : 4, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner pulse */}
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-[var(--accent)] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: isHovered ? 1 : 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-[var(--accent)] opacity-80 group-hover/metric:opacity-100 transition-opacity duration-500">
            {icon}
          </div>
        </div>

        {/* Particles emitting on view / hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1 h-1 rounded-full bg-[var(--accent)]"
               initial={{ top: '50%', left: '30%', opacity: 0, scale: 0 }}
               animate={isHovered ? {
                 top: `${20 + Math.random() * 60}%`,
                 left: `${-10 + Math.random() * 120}%`,
                 opacity: [0, 0.8, 0],
                 scale: [0, Math.random() + 0.5, 0],
               } : { top: '50%', left: '30%', opacity: 0, scale: 0 }}
               transition={{ duration: 1.5 + Math.random(), repeat: isHovered ? Infinity : 0, delay: Math.random() }}
             />
           ))}
        </div>
      </div>
    </motion.div>
  );
};
