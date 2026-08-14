import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowUpRight } from 'react-icons/fi';
import { profile } from '@/data/content';
import { blurUp, stagger, easeOutExpo } from '@/lib/motion';
import { Magnetic } from '@/components/ui/Magnetic';

const socials = [
  { icon: FiMail, label: 'Email', href: `mailto:${profile.email}` },
  { icon: FiGithub, label: 'GitHub', href: profile.github },
  { icon: FiLinkedin, label: 'LinkedIn', href: profile.linkedin },
  { icon: FiDownload, label: 'Resume', href: profile.resume },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-40 px-6 max-w-6xl mx-auto">
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative overflow-hidden rounded-5xl card-surface p-8 sm:p-14 lg:p-20 text-center"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -top-1/2 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-accent/15 to-transparent blur-3xl" />

        <motion.span
          variants={blurUp}
          className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs tracking-[0.2em] uppercase text-muted"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Open to opportunities
        </motion.span>

        <motion.h2
          variants={blurUp}
          className="relative mt-6 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tightish leading-[1.02]"
        >
          Let&apos;s build something
          <br />
          <span className="text-gradient-accent">worth remembering.</span>
        </motion.h2>

        <motion.p
          variants={blurUp}
          className="relative mt-6 text-lg text-muted max-w-xl mx-auto"
        >
          Have a project in mind, or just want to say hello? My inbox is always open.
        </motion.p>

        {/* Email CTA */}
        <motion.div variants={blurUp} className="relative mt-10 flex justify-center">
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex max-w-full items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white text-ink-base text-sm sm:text-base font-medium hover:bg-accent hover:text-white transition-colors"
            >
              <FiMail size={18} className="shrink-0" />
              <span className="truncate">{profile.email}</span>
              <FiArrowUpRight
                size={18}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
        </motion.div>

        {/* Socials */}
        <motion.div
          variants={blurUp}
          className="relative mt-10 flex flex-wrap justify-center gap-3"
        >
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <Magnetic key={s.label} strength={0.3}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group grid place-items-center w-12 h-12 rounded-2xl glass text-white/80 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              </Magnetic>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
