import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { stats } from '@/data/content';
import { blurUp, stagger } from '@/lib/motion';

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="About Rohith Vijay"
        title={
          <>
            Engineering web solutions with <span className="text-gradient-accent">clean architecture</span> and search visibility.
          </>
        }
        description="I'm Rohith Vijay, a freelance web developer and SEO specialist based in Chennai. I combine modern MERN stack engineering with technical SEO strategies to deliver fast, discoverable, and user-centric web applications."
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
            Based in Chennai, India, I specialize in full-stack web development and technical search engine optimization. My work bridges the gap between clean code, responsive design, and organic search discoverability — ensuring that every website not only looks premium but also loads instantaneously and ranks on Google.
          </motion.p>
          <motion.p variants={blurUp} className="text-lg text-muted leading-relaxed">
            Whether engineering role-based MERN stack platforms like the School Management System and JIT Permigo, or optimizing business websites for Core Web Vitals and Schema markup, my engineering approach is rooted in measurable performance, semantic accessibility, and clean maintainable code.
          </motion.p>

          {/* Mini timeline */}
          <motion.div variants={stagger(0.1)} className="mt-8 space-y-5">
            {[
              { year: '2023', text: 'Built first interactive web and AR prototypes in Chennai.' },
              { year: '2024', text: 'Engineered production campus portals with React & TypeScript.' },
              { year: '2025', text: 'Shipped full-stack MERN projects & advanced motion interfaces.' },
              { year: '2026', text: 'Providing freelance web development & technical SEO solutions.' },
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
