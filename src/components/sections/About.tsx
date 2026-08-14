import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { stats } from '@/data/content';
import { blurUp, stagger, easeOutExpo } from '@/lib/motion';

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            A developer who treats the <span className="text-gradient-accent">browser as a canvas</span>.
          </>
        }
        description="I'm Rohith Vijay, a Engineer obsessed with the small details — the easing curve, the millisecond, the empty state. I build interfaces that feel considered, fast, and alive."
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Story */}
        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="lg:col-span-3 space-y-6"
        >
          <motion.p variants={blurUp} className="text-lg text-white/90 leading-relaxed">
            I started building for the web out of curiosity — a way to make ideas
            visible. That curiosity became a craft. Today I focus on the frontend
            layer where design and engineering meet, shaping products that feel
            effortless to use.
          </motion.p>
          <motion.p variants={blurUp} className="text-lg text-muted leading-relaxed">
            My approach is simple: understand the problem, design with intent, and
            ship with polish. I care about accessibility, performance budgets, and
            motion that serves the content rather than showing off.
          </motion.p>

          {/* Mini timeline */}
          <motion.div variants={stagger(0.1)} className="mt-8 space-y-5">
            {[
              { year: '2023', text: 'Wrote my first lines of HTML & CSS.' },
              { year: '2024', text: 'Fell in love with React and component thinking.' },
              { year: '2025', text: 'Shipped real projects and discovered motion design.' },
              { year: '2026', text: 'Refining craft — performance, accessibility, polish.' },
            ].map((item) => (
              <motion.div
                key={item.year}
                variants={blurUp}
                className="flex gap-5 group"
              >
                <span className="text-sm font-mono text-accent w-12 shrink-0 pt-0.5">
                  {item.year}
                </span>
                <div className="relative pl-5">
                  <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent transition-colors group-hover:shadow-glow" />
                  <span className="absolute left-[3px] top-4 bottom-[-1.4rem] w-px bg-white/10 last:hidden" />
                  <p className="text-base text-white/85 leading-relaxed group-hover:text-white transition-colors">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="lg:col-span-2 grid grid-cols-2 gap-4 self-start"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={blurUp}
              whileHover={{ y: -6 }}
              className="group relative card-surface rounded-3xl p-6 flex flex-col gap-2 hover:border-white/15 transition-colors overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]" />
              <div className="relative">
                <Counter value={s.value} display={s.display} suffix={s.suffix} />
              </div>
              <span className="relative text-xs tracking-[0.15em] uppercase text-muted">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({
  value,
  display,
  suffix,
}: {
  value: number;
  display?: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const text = useTransform(spring, (v) =>
    display ? display : `${Math.round(v)}${suffix}`
  );

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  return (
    <motion.span
      ref={ref}
      style={{ display: 'inline-block' }}
      className="text-4xl sm:text-5xl font-bold tracking-tightish"
    >
      <motion.span>{text}</motion.span>
    </motion.span>
  );
}
