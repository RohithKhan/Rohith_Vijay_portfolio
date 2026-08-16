import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { experiences } from '@/data/content';
import { easeOutExpo } from '@/lib/motion';
import { SpatialDeveloperCore } from './SpatialDeveloperCore';

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-28 sm:py-36 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Journey"
        title={
          <>
            Experience, <span className="text-gradient-accent">in motion</span>.
          </>
        }
        description="The path from curious beginner to shipping developer — each step shaped the craft."
      />

      <div ref={ref} className="mt-16 relative">
        {/* Developer Spatial Core Visualization - Occupying left space */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none">
          <div className="sticky top-[15vh] h-[70vh] min-h-[600px] w-full pointer-events-auto pr-8">
            <SpatialDeveloperCore />
          </div>
        </div>

        {/* Track */}
        <div className="absolute left-[7px] sm:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/8" />
        {/* Growing progress line */}
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: 'top' }}
          className="absolute left-[7px] sm:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-accent via-accent-hover to-transparent"
        />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: easeOutExpo }}
              className={`relative pl-10 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12 ${i % 2 === 0 ? 'sm:[direction:rtl]' : 'sm:[direction:rtl]'
                }`}
            >
              {/* Node */}
              <span className="absolute left-0 sm:left-1/2 top-2 -translate-x-1/2 grid place-items-center w-4 h-4">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 300 }}
                  className="relative"
                >
                  <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
                  <span className="relative block w-2.5 h-2.5 rounded-full bg-accent shadow-glow" />
                </motion.span>
              </span>

              {/* Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className={`sm:[direction:ltr] ${i % 2 === 0 ? 'sm:pr-12 sm:text-left' : 'sm:col-start-2 sm:pl-12'}`}
              >
                <div className="group card-surface rounded-3xl p-6 hover:border-white/15 transition-colors">
                  <span className="text-xs tracking-[0.2em] uppercase text-accent">
                    {exp.period}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tightish">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-muted">{exp.org}</p>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">
                    {exp.summary}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-sm text-muted flex gap-2 leading-relaxed"
                      >
                        <span className="text-accent shrink-0">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
