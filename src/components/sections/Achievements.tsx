import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Award, BadgeCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { achievements, stats } from '@/data/content';
import { fadeUp, stagger, easeOutExpo } from '@/lib/motion';

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28 sm:py-36 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Achievements"
        title={
          <>
            Certificates &amp; <span className="text-gradient-accent">milestones</span>.
          </>
        }
        description="A record of continuous learning — credentials earned and numbers earned along the way."
      />

      {/* Stat strip with glow-pulse counters */}
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative card-surface rounded-3xl p-6 text-center overflow-hidden"
          >
            {/* Pulse glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(59,130,246,0.18),transparent_70%)]" />
            <div className="relative text-3xl sm:text-4xl font-bold tracking-tightish text-gradient">
              <Counter value={s.value} display={s.display} suffix={s.suffix} />
            </div>
            <div className="relative mt-1 text-xs tracking-[0.15em] uppercase text-muted">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Certificates */}
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {achievements.map((a) => (
          <motion.div
            key={a.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ ease: easeOutExpo }}
            className="group relative card-surface rounded-3xl p-5 flex items-center gap-4 hover:border-white/15 transition-colors overflow-hidden"
          >
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent/10 to-transparent" />
            <motion.div
              whileHover={{ rotate: -8, scale: 1.1 }}
              className="relative grid place-items-center w-12 h-12 rounded-2xl glass text-accent"
            >
              <BadgeCheck size={22} />
            </motion.div>
            <div className="relative flex-1">
              <h3 className="text-base font-medium tracking-tightish">{a.title}</h3>
              <p className="text-sm text-muted">
                {a.issuer} · {a.year}
              </p>
            </div>
            <Award size={18} className="relative text-muted/40 group-hover:text-accent/60 transition-colors" />
          </motion.div>
        ))}
      </motion.div>
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
    <motion.span ref={ref} style={{ display: 'inline-block' }}>
      <motion.span>{text}</motion.span>
    </motion.span>
  );
}
