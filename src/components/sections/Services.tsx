import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services, type Service } from '@/data/content';
import { fadeUp, stagger, easeOutExpo } from '@/lib/motion';

export function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Services & Solutions"
        title={
          <>
            Freelance Web Development &amp;{' '}
            <span className="text-gradient-accent">SEO Services in Chennai</span>.
          </>
        }
        description="From full-stack MERN web applications to technical SEO and speed optimization, I build search-engine-friendly digital solutions designed to grow your business."
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>

      {/* Commercial Inquiry Callout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="mt-14 card-surface rounded-3xl p-8 sm:p-10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
            <Sparkles size={14} />
            <span>Ready for Growth</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Have a project in mind for Chennai or remote markets?
          </h3>
          <p className="text-sm text-muted max-w-xl">
            Whether you need a full-stack MERN application, a fast corporate website, or a technical SEO audit to boost Google rankings, I provide transparent scopes and dependable delivery.
          </p>
        </div>
        <a
          href="#contact"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-ink-base font-semibold text-sm hover:bg-accent hover:text-white transition-all shadow-glow"
        >
          <span>Hire for a Project</span>
          <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ ease: easeOutExpo }}
      className="group relative card-surface rounded-3xl p-7 flex flex-col justify-between hover:border-white/20 transition-all overflow-hidden"
    >
      {/* Background radial glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]" />

      <div className="relative">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-accent">
            {service.eyebrow}
          </span>
          <span className="text-[10px] px-2.5 py-1 rounded-full glass border border-accent/20 text-accent/90">
            {service.highlight}
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tightish text-white group-hover:text-gradient-accent transition-colors">
          {service.title}
        </h3>

        <p className="mt-3 text-sm text-muted leading-relaxed">
          {service.description}
        </p>

        {/* Deliverables */}
        <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
          {service.deliverables.map((item) => (
            <li key={item} className="text-xs text-white/80 flex items-start gap-2 leading-relaxed">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack Pills */}
      <div className="relative mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
        {service.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-muted/90"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
