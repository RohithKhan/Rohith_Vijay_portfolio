import { motion } from 'framer-motion';
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { profile, navLinks } from '@/data/content';
import { Magnetic } from '@/components/ui/Magnetic';
import { fadeUp, stagger, easeOutExpo } from '@/lib/motion';

const socials = [
  { icon: FiMail, label: 'Email', href: `mailto:${profile.email}` },
  { icon: FiGithub, label: 'GitHub', href: profile.github },
  { icon: FiLinkedin, label: 'LinkedIn', href: profile.linkedin },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 pb-10 pt-24 max-w-6xl mx-auto overflow-hidden">
      {/* Background lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.12),transparent_70%)] blur-2xl" />
      </div>

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="border-t border-white/8 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold">
            R
          </span>
          <div>
            <p className="text-sm font-medium">{profile.name}</p>
            <p className="text-xs text-muted">{profile.role}</p>
          </div>
        </motion.div>

        <motion.nav variants={fadeUp} className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-xs text-muted hover:text-white transition-colors group"
            >
              {l.label}
              <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
          ))}
        </motion.nav>

        {/* Floating social icons */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <Magnetic key={s.label} strength={0.3}>
                <motion.a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4 }}
                  className="group grid place-items-center w-10 h-10 rounded-full glass text-white/70 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                </motion.a>
              </Magnetic>
            );
          })}
          <Magnetic strength={0.3}>
            <motion.a
              href="#top"
              aria-label="Back to top"
              whileHover={{ y: -4 }}
              className="group grid place-items-center w-10 h-10 rounded-full glass hover:border-accent/40 transition-colors"
            >
              <FiArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ ease: easeOutExpo }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted"
      >
        <p>© {year} {profile.name}. Crafted with care.</p>
        <p>Designed &amp; built from scratch.</p>
      </motion.div>
    </footer>
  );
}
