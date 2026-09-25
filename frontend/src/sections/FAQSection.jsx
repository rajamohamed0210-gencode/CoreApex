import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/motion/SectionHeading';
import { Stagger, StaggerItem, Reveal } from '../components/motion/Reveal';

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative overflow-hidden border-t border-[#E2E8F0] bg-white py-20">
      <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-[#EFF6FF] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-14"
          eyebrow="Knowledge & FAQs"
          icon={HelpCircle}
          title="Frequently Asked"
          highlight="Questions"
          description="Answers regarding our software engineering standards, IP ownership, timelines, and warranty."
        />

        <Stagger className="space-y-3.5" stagger={0.08}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <StaggerItem key={faq.id || idx} variant="up">
                <div
                  className={`light-card overflow-hidden transition-colors ${
                    isOpen ? 'border-[#BFDBFE] shadow-card-hover' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-[#F8FAFC] sm:p-6"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3 text-sm font-bold text-[#172033] sm:text-base">
                      <span className="font-mono text-xs font-semibold text-[#2563EB]">
                        Q{idx + 1}.
                      </span>
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen
                          ? 'border-[#2563EB] bg-[#2563EB] text-white'
                          : 'border-[#E2E8F0] bg-white text-[#64748B]'
                      }`}
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="border-t border-[#F1F5F9] px-5 pb-6 pt-4 text-xs leading-relaxed text-[#64748B] sm:px-6 sm:text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal variant="up" className="mt-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-6 py-5 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-[#172033]">Still have a question?</p>
              <p className="text-xs text-[#64748B]">
                Send us your requirement and get a scoped answer within 24 hours.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-button-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
            >
              <span>Ask our team</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
