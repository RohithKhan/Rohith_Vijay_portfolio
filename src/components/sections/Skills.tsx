import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { skills, skillGroups, type Skill } from '@/data/content';
import { fadeUp, stagger, easeOutExpo } from '@/lib/motion';

export function Skills() {
  const [active, setActive] = useState<Skill['group']>('Frontend');
  const filtered = skills.filter((s) => s.group === active);

  return (
    <section id="skills" className="relative py-28 sm:py-36 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Skills"
        title={
          <>
            Tools I reach for <span className="text-gradient-accent">every day</span>.
          </>
        }
        description="A focused toolkit honed across projects — from interface craft to the infrastructure that supports it."
      />

      {/* Group selector */}
      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 flex flex-wrap gap-2"
      >
        {skillGroups.map((g) => (
          <motion.button
            key={g.name}
            variants={fadeUp}
            data-magnetic
            onClick={() => setActive(g.name)}
            className={`relative px-4 py-2 rounded-full text-sm transition-colors ${
              active === g.name ? 'text-ink-base' : 'text-muted hover:text-white'
            }`}
          >
            {active === g.name && (
              <motion.span
                layoutId="skill-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              />
            )}
            <span className="relative z-10">{g.name}</span>
          </motion.button>
        ))}
      </motion.div>

      <p className="mt-4 text-sm text-muted">
        {skillGroups.find((g) => g.name === active)?.blurb}
      </p>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: easeOutExpo }}
      whileHover={{ y: -8, rotateX: 6, rotateY: -6, scale: 1.02 }}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      className="group relative card-surface rounded-3xl p-6 overflow-hidden hover:border-white/15 transition-colors"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/15 to-transparent" />
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.25),transparent_70%)]" />

      <div className="relative flex items-start justify-between">
        <motion.div
          whileHover={{ rotate: -8, scale: 1.1 }}
          className="grid place-items-center w-12 h-12 rounded-2xl glass text-2xl text-white/90 group-hover:text-accent transition-colors"
        >
          <Icon />
        </motion.div>
        <span className="text-xs tabular-nums text-muted">{skill.level}%</span>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold tracking-tightish">
        {skill.name}
      </h3>

      {/* Progress with glow */}
      <div className="relative mt-4 h-1 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.06, duration: 1.1, ease: easeOutExpo }}
          className="relative h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-glow" />
        </motion.div>
      </div>
    </motion.div>
  );
}
