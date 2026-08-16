import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Spatial Nodes Configuration
const NODES = [
  { id: 'frontend', label: 'FRONTEND', desc: 'React · Next.js · TypeScript', angle: -20, radius: 150, color: '#60A5FA' },
  { id: 'arvr', label: 'AR / VR', desc: 'Unity · Unreal Engine · Vuforia', angle: 45, radius: 200, color: '#A78BFA' },
  { id: 'ai', label: 'AI', desc: 'PyTorch · LLMs · SLMs', angle: 150, radius: 170, color: '#38BDF8' },
  { id: '3d', label: '3D', desc: 'Blender · WebGL', angle: 220, radius: 220, color: '#818CF8' },
];

export function SpatialDeveloperCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 40, stiffness: 120, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax Depth Layers
  const bgX = useTransform(smoothX, [-1, 1], [15, -15]);
  const bgY = useTransform(smoothY, [-1, 1], [15, -15]);
  
  const gridX = useTransform(smoothX, [-1, 1], [30, -30]);
  const gridY = useTransform(smoothY, [-1, 1], [30, -30]);
  const gridRotateX = useTransform(smoothY, [-1, 1], [65, 55]); 
  const gridRotateY = useTransform(smoothX, [-1, 1], [-5, 5]);

  const orbitX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const orbitY = useTransform(smoothY, [-1, 1], [-20, 20]);
  
  const coreX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const coreY = useTransform(smoothY, [-1, 1], [-40, 40]);
  const coreRotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const coreRotateY = useTransform(smoothX, [-1, 1], [-15, 15]);

  const nodesX = useTransform(smoothX, [-1, 1], [-60, 60]);
  const nodesY = useTransform(smoothY, [-1, 1], [-60, 60]);

  // Scroll Interaction
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Phases of materialization
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const coreOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const orbitOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const nodesOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 based on screen center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ scale, opacity }}
      className="relative w-full h-full min-h-[600px] flex items-center justify-center overflow-hidden"
    >
       {/* Layer 5: Background Depth */}
       <motion.div 
         style={{ x: bgX, y: bgY }} 
         className="absolute inset-[-200px] pointer-events-none opacity-40"
       >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
       </motion.div>

       {/* Layer 4: Spatial Grid & Scan */}
       <motion.div 
         style={{ x: gridX, y: gridY, rotateX: gridRotateX, rotateY: gridRotateY, opacity: orbitOpacity, transformStyle: 'preserve-3d' }}
         className="absolute inset-[-300px] pointer-events-none flex items-center justify-center"
       >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              backgroundPosition: 'center center',
              maskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)'
            }}
          />
          <ScanningWave />
       </motion.div>

       {/* Layer 2 & 3: Orbital System & Signals */}
       <motion.div style={{ x: orbitX, y: orbitY, opacity: orbitOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <OrbitalRing radius={130} duration={25} reverse tilt={5} />
          <OrbitalRing radius={180} duration={40} tilt={25} />
          <OrbitalRing radius={230} duration={30} tilt={-15} reverse />
          <OrbitalRing radius={280} duration={50} tilt={10} />
       </motion.div>

       {/* Layer 1: Central Core */}
       <motion.div 
         style={{ x: coreX, y: coreY, rotateX: coreRotateX, rotateY: coreRotateY, opacity: coreOpacity, transformStyle: 'preserve-3d' }}
         className="relative z-10 flex items-center justify-center pointer-events-none"
       >
          <CoreGeometry />
       </motion.div>

       {/* Spatial Nodes */}
       <motion.div style={{ x: nodesX, y: nodesY, opacity: nodesOpacity }} className="absolute inset-0 pointer-events-none">
          {NODES.map((node, i) => (
             <SpatialNode key={node.id} node={node} index={i} />
          ))}
       </motion.div>
    </motion.div>
  );
}

function CoreGeometry() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
       {/* Volumetric Glow */}
       <div className="absolute inset-[-40px] bg-blue-500/20 blur-3xl rounded-full" />
       
       {/* Outer wireframe sphere */}
       <motion.div 
         animate={{ rotateY: 360, rotateX: 360 }}
         transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
         className="absolute inset-0"
         style={{ transformStyle: 'preserve-3d' }}
       >
         <div className="absolute inset-0 rounded-full border border-white/10" style={{ transform: 'rotateY(0deg)' }} />
         <div className="absolute inset-0 rounded-full border border-white/10" style={{ transform: 'rotateY(60deg)' }} />
         <div className="absolute inset-0 rounded-full border border-white/10" style={{ transform: 'rotateY(120deg)' }} />
         <div className="absolute inset-0 rounded-full border border-white/10" style={{ transform: 'rotateX(90deg)' }} />
       </motion.div>

       {/* Inner glass core */}
       <motion.div
         animate={{ rotateY: -360, rotateZ: 180 }}
         transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
         className="relative w-16 h-16 glass rounded-lg border border-white/15 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]"
         style={{ transformStyle: 'preserve-3d' }}
       >
         <div className="absolute inset-2 border border-white/5 rounded-[4px]" style={{ transform: 'translateZ(-5px)' }} />
         <div className="flex flex-col items-center justify-center" style={{ transform: 'translateZ(15px)' }}>
            <span className="text-[9px] font-mono tracking-[0.2em] text-white/95 font-medium">ROHITH</span>
            <span className="text-[7px] font-mono tracking-[0.3em] text-blue-400/90 mt-0.5">.DEV</span>
         </div>
       </motion.div>

       {/* Floating crosshairs around core */}
       <div className="absolute -left-10 w-3 h-[1px] bg-white/30" />
       <div className="absolute -right-10 w-3 h-[1px] bg-white/30" />
       <div className="absolute -top-10 w-[1px] h-3 bg-white/30" />
       <div className="absolute -bottom-10 w-[1px] h-3 bg-white/30" />
    </div>
  );
}

function OrbitalRing({ radius, duration, tilt = 0, reverse = false }: { radius: number, duration: number, tilt?: number, reverse?: boolean }) {
  return (
    <div 
      className="absolute flex items-center justify-center" 
      style={{ transformStyle: 'preserve-3d', transform: `rotateX(65deg) rotateY(${tilt}deg)` }}
    >
      {/* Orbital Path */}
      <div 
        className="absolute rounded-full border border-white/5" 
        style={{ width: radius * 2, height: radius * 2 }} 
      />
      {/* Traveling Signal */}
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="absolute flex items-center justify-center"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]" />
           {/* Trail */}
           <div 
             className="absolute top-1/2 left-1/2 h-[1px] w-20 bg-gradient-to-r from-transparent to-white/40" 
             style={{ 
                transformOrigin: 'left',
                transform: `translateY(-50%) ${reverse ? 'rotate(0deg)' : 'rotate(180deg)'}` 
             }} 
           />
        </div>
      </motion.div>
    </div>
  );
}

function SpatialNode({ node, index }: { node: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate polar coordinates manually
  const posX = node.radius * Math.cos((node.angle * Math.PI) / 180);
  const posY = (node.radius * 0.6) * Math.sin((node.angle * Math.PI) / 180); 
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-auto group cursor-crosshair z-20"
      initial={{ x: posX, y: posY }}
      animate={{ 
        x: [posX, posX + 8, posX - 6, posX], 
        y: [posY, posY - 7, posY + 9, posY] 
      }}
      transition={{ duration: 15 + index * 3, repeat: Infinity, ease: 'easeInOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center">
        {/* Dynamic connection line to center */}
        <svg className="absolute pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-500" style={{ overflow: 'visible', top: 0, left: 0 }}>
           <line x1="0" y1="0" x2={-posX} y2={-posY} stroke="currentColor" strokeWidth="1" className="text-white/40" strokeDasharray="3 3" />
        </svg>

        {/* Node point */}
        <div className="relative w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-all duration-300 group-hover:scale-150">
           <div className="absolute inset-[-10px] rounded-full border border-white/0 group-hover:border-white/20 transition-all duration-300" />
           {/* Tracking brackets */}
           <div className="absolute -top-2 -left-2 w-1.5 h-1.5 border-t border-l border-white/0 group-hover:border-white/60 transition-all duration-300" />
           <div className="absolute -top-2 -right-2 w-1.5 h-1.5 border-t border-r border-white/0 group-hover:border-white/60 transition-all duration-300" />
           <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 border-b border-l border-white/0 group-hover:border-white/60 transition-all duration-300" />
           <div className="absolute -bottom-2 -right-2 w-1.5 h-1.5 border-b border-r border-white/0 group-hover:border-white/60 transition-all duration-300" />
        </div>

        {/* Info Panel */}
        <div className={`absolute ${posX > 0 ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 w-48`}>
          <motion.div 
             initial={false}
             animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : (posX > 0 ? -10 : 10) }}
             className={`flex flex-col gap-1.5 ${posX > 0 ? 'items-start' : 'items-end text-right'}`}
          >
             <div className="glass px-2.5 py-1.5 rounded-md border-white/10 backdrop-blur-md inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: node.color, color: node.color }} />
                <span className="text-[10px] font-mono tracking-widest text-white/90">{node.label}</span>
             </div>
             <motion.div 
               animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
               className="overflow-hidden"
             >
                <div className="px-1 py-1">
                   <span className="text-[10px] text-white/60 font-mono tracking-wide leading-relaxed block">{node.desc}</span>
                </div>
             </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ScanningWave() {
  return (
    <motion.div
      animate={{ scale: [0, 1.5], opacity: [0.5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', repeatDelay: 3 }}
      className="absolute w-[600px] h-[600px] rounded-full border border-blue-400/20 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.03)_0%,transparent_60%)]"
      style={{ transformStyle: 'preserve-3d' }}
    />
  );
}
