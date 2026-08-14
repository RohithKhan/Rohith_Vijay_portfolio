import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/data/content';
import { TiltCard } from '@/components/ui/TiltCard';

type Props = {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
};

export function ProjectCard({ project, index, onOpen }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
      style={{ perspective: 1200 }}
    >
      <TiltCard
        max={7}
        className="group relative h-full rounded-4xl card-surface overflow-hidden cursor-pointer"
      >
        {/* Animated gradient border */}
        <span className="pointer-events-none absolute inset-0 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span
            className="absolute inset-0 rounded-4xl"
            style={{
              padding: 1,
              background: `conic-gradient(from 0deg, ${project.accent}, transparent 25%, ${project.accent} 50%, transparent 75%, ${project.accent})`,
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        </span>

        {/* Gradient glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: `radial-gradient(60% 60% at 50% 0%, ${project.accent}40, transparent 70%)` }}
        />

        <button
          data-cursor="view"
          data-cursor-label="View"
          onClick={() => onOpen(project)}
          className="block w-full text-left h-full"
        >
          {/* Visual header with slow zoom */}
          <div className="relative h-44 sm:h-52 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 120% at 20% 10%, ${project.accent}40, transparent 55%), radial-gradient(120% 120% at 90% 90%, ${project.accent}25, transparent 55%), #0B0B0B`,
              }}
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Animated noise lines for texture */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_3px)]" />
            </div>
            
            {/* Under Development Watermark */}
            {project.underDevelopment && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mix-blend-overlay opacity-60">
                <div className="transform -rotate-12 text-white font-black text-2xl sm:text-3xl uppercase tracking-widest border-[3px] border-white px-6 py-2 rounded-xl whitespace-nowrap">
                  Development
                </div>
              </div>
            )}

            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition-all duration-500" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="text-xs tracking-[0.2em] uppercase text-white/70 px-2.5 py-1 rounded-full glass">
                {project.year}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 grid place-items-center w-10 h-10 rounded-full glass transition-all duration-300 group-hover:bg-white group-hover:text-ink-base">
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </div>
            <span className="absolute bottom-2 left-4 sm:left-5 text-6xl sm:text-[5rem] leading-none font-bold text-white/[0.04] select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7 flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-tightish transition-colors group-hover:text-white">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{project.tagline}</p>
            </div>

            {/* Tech badges with stagger */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + ti * 0.06, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 border border-white/8 text-white/70 hover:border-accent/40 hover:text-white transition-colors"
                >
                  {t}
                </motion.span>
              ))}
              {project.stack.length > 4 && (
                <span className="px-2.5 py-1 rounded-full text-[11px] text-muted">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-muted group-hover:text-white transition-colors flex items-center gap-1">
                Read case study
                <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span
                className="grid place-items-center w-8 h-8 rounded-full glass text-white/70 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank', 'noopener');
                }}
                role="link"
                aria-label={`${project.name} GitHub`}
              >
                <Github size={14} />
              </span>
            </div>
          </div>
        </button>
      </TiltCard>
    </motion.div>
  );
}
