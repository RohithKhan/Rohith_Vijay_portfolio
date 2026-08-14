import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';
import { projects, type Project } from '@/data/content';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-36 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Selected Work"
        title={
          <>
            Projects I&apos;ve built <span className="text-gradient-accent">end to end</span>.
          </>
        }
        description="Each project is a case study in turning a real problem into a polished product. Tap any card to dive deeper."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
        ))}

        {/* CTA tile to fill the grid nicely */}
        <div className="hidden lg:flex items-center justify-center rounded-4xl border border-dashed border-white/10 p-8 text-center">
          <div>
            <p className="text-sm text-muted">More in progress</p>
            <a
              href="#contact"
              className="mt-3 inline-flex items-center text-sm text-accent hover:text-accent-hover transition-colors"
            >
              Start a project together →
            </a>
          </div>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
