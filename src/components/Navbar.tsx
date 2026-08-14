import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '@/data/content';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Magnetic } from '@/components/ui/Magnetic';

export function Navbar() {
  const { direction, scrolled } = useScrollDirection(60);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const hidden = direction === 'down' && !open;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden ? -90 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pt-4 md:pt-6"
      >
        <nav
          className={`w-full max-w-6xl rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-500 border ${scrolled
              ? 'bg-white/5 border-white/10 backdrop-blur-md shadow-soft'
              : 'bg-transparent border-transparent'
            }`}
        >
          {/* Logo */}
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="relative grid place-items-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold transition-colors group-hover:border-accent/40">
              R
              <span className="absolute inset-0 rounded-lg bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-sm font-medium tracking-tight hidden sm:block">
              Rohith Vijay
            </span>
          </a>

          {/* Desktop links with animated active indicator */}
          <ul className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-muted hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="absolute left-4 right-4 bottom-1 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.25} className="hidden sm:block">
              <a
                href="#contact"
                data-magnetic
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-white text-ink-base hover:bg-accent hover:text-white transition-colors duration-300"
              >
                Let&apos;s talk
              </a>
            </Magnetic>
            <button
              className="md:hidden grid place-items-center w-10 h-10 rounded-lg glass"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-base/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.ul
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-24 inset-x-4 glass rounded-2xl p-4 flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl text-lg text-muted hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  className="block text-center px-4 py-3 rounded-xl bg-white text-ink-base font-medium"
                >
                  Let&apos;s talk
                </a>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
