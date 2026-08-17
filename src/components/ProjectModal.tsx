import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';
import type { Project } from '@/data/content';

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink-base/70 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto no-scrollbar glass rounded-4xl p-6 sm:p-10"
            data-lenis-prevent="true"
          >
            {/* Accent glow */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{ background: project.accent }}
            />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-50 grid place-items-center w-10 h-10 rounded-full glass hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative">
              <span className="text-xs tracking-[0.2em] uppercase text-muted">
                {project.year} · Case Study
              </span>
              <h3 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tightish">
                {project.name}
              </h3>
              <p className="mt-3 text-lg text-muted">{project.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs glass text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {(project.video || project.backgroundImage) && (
                <div className="mt-8 relative w-full aspect-video rounded-2xl overflow-hidden glass border border-white/5 bg-[#0B0B0B]">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={project.backgroundImage}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              )}

              <div className="mt-8 space-y-7">
                <Detail label="Overview" body={project.overview} />
                <Detail label="The Problem" body={project.problem} />
                <Detail label="The Solution" body={project.solution} />
                <Detail label="Challenges" body={project.challenges} />
                <Detail label="Impact" body={project.impact} accent />
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <GlitchButton 
                  href={project.liveUrl}
                  label="Live Demo"
                  icon={<ExternalLink size={16} />}
                  errorText="NOT YET DEPLOYED"
                  primary={true}
                />
                <GlitchButton 
                  href={project.githubUrl}
                  label="GitHub"
                  icon={<Github size={16} />}
                  errorText="PROJECT UNDER CONSTRUCTION"
                />
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm text-muted hover:text-white transition-colors ml-auto relative z-50"
                >
                  Close <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Detail({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div>
      <h4
        className={`text-xs tracking-[0.2em] uppercase mb-2 ${accent ? 'text-accent' : 'text-muted'}`}
      >
        {label}
      </h4>
      <p className="text-base leading-relaxed text-white/90">{body}</p>
    </div>
  );
}

function GlitchButton({
  href,
  icon,
  label,
  errorText,
  primary
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  errorText: string;
  primary?: boolean;
}) {
  const [isError, setIsError] = useState(false);
  const [scrambleText, setScrambleText] = useState('');

  const isValid = href && href !== '#';

  const handleClick = (e: React.MouseEvent) => {
    if (!isValid) {
      e.preventDefault();
      if (isError) return;
      setIsError(true);
      
      let iterations = 0;
      const chars = "!<>-_\\/[]{}—=+*^?#________";
      const interval = setInterval(() => {
        setScrambleText(errorText.split("").map((letter, index) => {
          if(index < iterations) {
            return errorText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)]
        }).join(""));
        
        if(iterations >= errorText.length){
          clearInterval(interval);
        }
        iterations += 1 / 3;
      }, 30);

      setTimeout(() => {
        setIsError(false);
        clearInterval(interval);
      }, 2500);
    }
  };

  return (
    <a
      href={isValid ? href : '#'}
      target={isValid ? '_blank' : undefined}
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all w-[260px] overflow-hidden ${
        isError
          ? 'bg-red-500/10 text-red-500 border border-red-500/50'
          : primary
          ? 'bg-white text-ink-base hover:bg-accent hover:text-white'
          : 'glass text-white hover:border-white/20'
      }`}
    >
      {isError ? (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono font-bold tracking-wider text-[11px] sm:text-xs uppercase flex items-center gap-2 z-10"
        >
          {/* subtle glitch animation wrapper */}
          <motion.span
            animate={{ x: [-2, 2, -2, 0] }}
            transition={{ duration: 0.2, repeat: 3 }}
          >
            {scrambleText}
          </motion.span>
        </motion.span>
      ) : (
        <span className="flex items-center gap-2 z-10">
          {label} {icon}
        </span>
      )}
      
      {/* Red flash effect */}
      {isError && (
         <motion.div
           className="absolute inset-0 bg-red-500/20"
           initial={{ opacity: 1 }}
           animate={{ opacity: 0 }}
           transition={{ duration: 0.5, ease: 'easeOut' }}
         />
      )}
    </a>
  );
}
