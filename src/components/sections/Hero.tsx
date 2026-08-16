import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Download, Rocket, Code2, Zap } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiGithub,
  SiUnity,
  SiUnrealengine
} from 'react-icons/si';
import { profile, stats } from '@/data/content';
import { Button } from '@/components/ui/Button';

const ease = [0.16, 1, 0.3, 1] as const;

const heroTechs = [
  { name: 'Augmented Reality', icon: SiUnity },
  { name: 'Virtual Reality', icon: SiUnrealengine },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Git & GitHub', icon: SiGithub },
];

const statIcons = [Rocket, Code2, Zap];

export function Hero() {
  // Mouse parallax — desktop only
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20 });
  const py = useSpring(my, { stiffness: 50, damping: 20 });

  const imgX = useTransform(px, [-0.5, 0.5], [8, -8]);
  const imgY = useTransform(py, [-0.5, 0.5], [8, -8]);
  const glowX = useTransform(px, [-0.5, 0.5], [-16, 16]);
  const glowY = useTransform(py, [-0.5, 0.5], [-16, 16]);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const el = ref.current;
    el?.addEventListener('mousemove', onMove);
    return () => el?.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-20 sm:pb-24 w-full overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Two-column layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 xl:gap-8 items-center">
          {/* ========== LEFT COLUMN ========== */}
          <div className="order-1 flex flex-col">
            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass w-fit mb-6 sm:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-xs text-muted">Available for select projects</span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease }}
              className="text-sm sm:text-base text-muted mb-3"
            >
              Hi, I&apos;m
            </motion.p>

            {/* Name — primary visual identity */}
            <h1 className="mb-3">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.8rem,9vw,5rem)] lg:text-[5.2rem] xl:text-[5.8rem] font-bold tracking-ultra leading-[1.02]"
                  initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 0.5, duration: 0.9, ease }}
                >
                  <span className="text-gradient-accent">Rohith</span>{' '}
                  <span className="text-gradient">Vijay</span>
                </motion.span>
              </span>
            </h1>

            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease }}
              className="mb-5 sm:mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-accent/10 border border-accent/25 text-accent text-xs sm:text-sm font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {profile.role}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.8, ease }}
              className="text-base sm:text-lg text-muted max-w-md leading-relaxed mb-8"
            >
              I build modern, responsive and user-friendly web applications that deliver exceptional digital experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, ease }}
              className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mb-10"
            >
              <Button className="order-2 sm:order-1" href="#projects" variant="accent" icon={<ArrowRight size={16} />}>
                View My Work
              </Button>
              <Button className="order-1 sm:order-2" href={profile.resume} variant="outline" icon={<Download size={16} />}>
                Download Resume
              </Button>
            </motion.div>

            {/* Stats with icons and dividers */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.7, ease }}
              className="flex items-center gap-0 mb-8"
            >
              {stats.slice(0, 3).map((s, i) => {
                const Icon = statIcons[i];
                return (
                  <div key={s.label} className="flex items-center">
                    {i > 0 && (
                      <div className="w-px h-10 bg-white/10 mx-4 sm:mx-6 shrink-0" />
                    )}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/10 border border-accent/20 shrink-0">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <div>
                        <span className="block text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                          {s.display ?? s.value}{s.suffix}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-muted tracking-[0.12em] uppercase leading-none mt-0.5 block">
                          {s.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Technologies strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease }}
            >
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted/70 mb-3">
                Technologies I Work With
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {heroTechs.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + i * 0.06, duration: 0.5 }}
                      className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-accent/30 transition-colors"
                      title={tech.name}
                    >
                      <Icon className="w-3.5 h-3.5 text-accent/80 group-hover:text-accent transition-colors shrink-0" />
                      <span className="text-[11px] text-muted/90 group-hover:text-white/90 transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ========== RIGHT COLUMN — Profile Image ========== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.1, ease }}
            className="order-2 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] xl:w-[460px] xl:h-[460px]">

              {/* === Background glow === */}
              <motion.div
                style={{ x: glowX, y: glowY }}
                className="absolute -inset-10 sm:-inset-14 rounded-full bg-accent/15 blur-[80px] animate-glow-breathe pointer-events-none"
                aria-hidden
              />

              {/* === Outer neon ring (vivid blue) === */}
              <div
                className="absolute -inset-4 sm:-inset-5 rounded-full pointer-events-none"
                style={{
                  border: '2px solid rgba(59,130,246,0.35)',
                  boxShadow: '0 0 30px -5px rgba(59,130,246,0.3), inset 0 0 30px -5px rgba(59,130,246,0.15)',
                }}
                aria-hidden
              />

              {/* === Second ring (inner accent) === */}
              <div
                className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-accent/20 pointer-events-none"
                aria-hidden
              />

              {/* === Dashed decorative ring === */}
              <div
                className="absolute -inset-8 sm:-inset-10 rounded-full border border-dashed border-accent/[0.08] pointer-events-none"
                aria-hidden
              />

              {/* === Code snippet decorative panel (top-left) === */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="hidden lg:block absolute -top-8 -left-12 xl:-left-16"
                aria-hidden
              >
                <div className="w-20 h-24 xl:w-24 xl:h-28 rounded-xl glass border border-accent/10 p-2.5 overflow-hidden rotate-[-6deg]">
                  <div className="space-y-1.5">
                    <div className="h-1 w-10 rounded-full bg-accent/30" />
                    <div className="h-1 w-14 rounded-full bg-white/10" />
                    <div className="h-1 w-8 rounded-full bg-accent/20" />
                    <div className="h-1 w-12 rounded-full bg-white/8" />
                    <div className="h-1 w-6 rounded-full bg-accent/15" />
                    <div className="h-1 w-10 rounded-full bg-white/6" />
                    <div className="h-1 w-14 rounded-full bg-accent/10" />
                  </div>
                </div>
              </motion.div>

              {/* === Code snippet decorative panel (bottom-left) === */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="hidden lg:block absolute bottom-4 -left-14 xl:-left-16"
                aria-hidden
              >
                <div className="w-16 h-20 rounded-lg glass border border-white/[0.05] p-2 overflow-hidden rotate-[4deg]">
                  <div className="space-y-1.5">
                    <div className="h-1 w-8 rounded-full bg-accent/20" />
                    <div className="h-1 w-10 rounded-full bg-white/8" />
                    <div className="h-1 w-5 rounded-full bg-accent/15" />
                    <div className="h-1 w-9 rounded-full bg-white/6" />
                    <div className="h-1 w-7 rounded-full bg-accent/10" />
                  </div>
                </div>
              </motion.div>

              {/* === Floating accent orbs === */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[10%] right-[15%] w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent/60 shadow-[0_0_20px_4px_rgba(59,130,246,0.4)] pointer-events-none"
                aria-hidden
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-[40%] -right-2 sm:-right-3 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent/50 shadow-[0_0_16px_3px_rgba(59,130,246,0.3)] pointer-events-none"
                aria-hidden
              />
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[25%] -left-2 sm:-left-4 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent/40 shadow-[0_0_16px_3px_rgba(59,130,246,0.25)] pointer-events-none"
                aria-hidden
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute bottom-[5%] right-[25%] w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent/50 shadow-[0_0_12px_2px_rgba(59,130,246,0.3)] pointer-events-none"
                aria-hidden
              />

              {/* === Main photo frame === */}
              <motion.div
                style={{ x: imgX, y: imgY }}
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent/30"
                style-glow="true"
              >
                <img
                  src="/coder.png"
                  alt={`${profile.name} — ${profile.role}`}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                {/* Bottom gradient fade */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-ink-base/50 via-transparent to-transparent pointer-events-none" />
                {/* Subtle blue rim light on edges */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 40px 8px rgba(59,130,246,0.12)' }}
                />
              </motion.div>

              {/* === Floating quote card === */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease }}
                className="absolute -bottom-6 -right-2 sm:-bottom-4 sm:-right-6 lg:-right-12 xl:-right-16 z-10 rounded-2xl p-4 sm:p-5 w-[190px] sm:w-[220px] pointer-events-none glass border border-accent/20"
                style={{
                  boxShadow: '0 0 40px -10px rgba(59,130,246,0.2), 0 20px 50px -20px rgba(0,0,0,0.6)',
                }}
                aria-hidden
              >
                <span className="text-accent text-2xl leading-none font-serif">&ldquo;</span>
                <p className="text-[11px] sm:text-xs text-white/85 leading-relaxed mt-1">
                  Clean Code.
                  <br />
                  Creative Design.
                  <br />
                  Better Experience.
                </p>
                <p
                  className="mt-3 text-accent/80 text-sm"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: 'italic' }}
                >
                  Rohith Vijay
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative grid place-items-center w-9 h-9 rounded-full glass"
        >
          <ArrowDown size={16} className="text-muted" />
          <span className="absolute inset-0 rounded-full border border-accent/30 animate-ping" />
        </motion.div>
      </motion.div>
    </section>
  );
}
