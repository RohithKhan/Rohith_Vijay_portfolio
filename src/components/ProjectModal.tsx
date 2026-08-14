import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
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

              <div className="mt-8 space-y-7">
                <Detail label="Overview" body={project.overview} />
                <Detail label="The Problem" body={project.problem} />
                <Detail label="The Solution" body={project.solution} />
                <Detail label="Challenges" body={project.challenges} />
                <Detail label="Impact" body={project.impact} accent />
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-ink-base text-sm font-medium hover:bg-accent hover:text-white transition-colors"
                >
                  Live Demo <ExternalLink size={16} />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm font-medium hover:border-white/20 transition-colors"
                >
                  GitHub <Github size={16} />
                </a>
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
