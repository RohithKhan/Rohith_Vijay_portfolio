import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs, type FaqItem } from '@/data/content';
import { fadeUp, stagger, easeOutExpo } from '@/lib/motion';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-28 sm:py-36 px-6 max-w-4xl mx-auto">
      <SectionHeading
        align="center"
        eyebrow="Frequently Asked Questions"
        title={
          <>
            Web Development &amp;{' '}
            <span className="text-gradient-accent">SEO Questions Answered</span>.
          </>
        }
        description="Clear answers about hiring a freelance web developer in Chennai, technical workflows, MERN stack development, and SEO capabilities."
      />

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-14 space-y-4"
      >
        {faqs.map((faq, index) => (
          <FaqAccordionItem
            key={faq.question}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
          />
        ))}
      </motion.div>

      {/* Still have questions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-muted">
          Have a specific project question not answered here?{' '}
          <a
            href="#contact"
            className="text-accent hover:text-accent-hover font-medium underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
          >
            Ask me directly <ArrowRight size={14} />
          </a>
        </p>
      </motion.div>
    </section>
  );
}

function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`card-surface rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-accent/30 bg-white/[0.04]' : 'border-white/8 hover:border-white/15'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <HelpCircle
            size={18}
            className={`shrink-0 transition-colors ${
              isOpen ? 'text-accent' : 'text-muted/60'
            }`}
          />
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white/95">
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easeOutExpo }}
          className="shrink-0 text-muted"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-muted leading-relaxed border-t border-white/5 pl-13">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

