import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { apiService } from '../services/api';
import PageHero from '../components/motion/PageHero';
import { Stagger, StaggerItem, Reveal } from '../components/motion/Reveal';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function load() {
      const data = await apiService.getFAQs();
      setFaqs(data);
    }
    load();
  }, []);

  const defaultFaqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Timelines range from 2 to 4 weeks for MVP web apps and custom portals, to 6–12 weeks for complex enterprise ERPs and mobile ecosystems. We provide a milestone breakdown during the planning stage.",
      category: "Process"
    },
    {
      question: "How do you handle source code ownership and intellectual property?",
      answer: "You own 100% of the intellectual property and source code upon final milestone delivery. We provide fully documented repositories, clean git histories, and deployment scripts with zero vendor lock-in.",
      category: "Ownership"
    },
    {
      question: "What technologies does Core Apex.dev specialize in?",
      answer: "Our core engineering stack comprises React 19, Django REST Framework, PostgreSQL 18, FastAPI, Tailwind CSS, Docker, and AWS Cloud. We choose scalable tools with robust community support.",
      category: "Technology"
    },
    {
      question: "Do you provide post-launch maintenance and support?",
      answer: "Yes. Every project includes a 30-day post-launch warranty with zero-cost bug resolution, followed by optional ongoing maintenance tiers covering security patches and feature updates.",
      category: "Support"
    },
    {
      question: "Can we migrate our existing database and legacy software?",
      answer: "Yes. We specialize in database migrations, data sanitization, schema refactoring to PostgreSQL, and building modern React/Django frontends on top of existing legacy systems.",
      category: "Architecture"
    },
    {
      question: "How do we get started with Core Apex.dev?",
      answer: "Submit your requirements through our Contact form or reach out via WhatsApp. Our team will review your scope and provide a comprehensive proposal within 24 hours.",
      category: "Getting Started"
    }
  ];

  const faqItems = faqs.length > 0 ? faqs : defaultFaqs;
  const categories = ['all', ...new Set(faqItems.map(f => f.category || 'General'))];

  const filteredFaqs = activeCategory === 'all'
    ? faqItems
    : faqItems.filter(f => (f.category || 'General') === activeCategory);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      <SEO
        title="Frequently Asked Questions — Core Apex.dev"
        description="Find answers to common questions about our software development lifecycle, IP ownership, pricing, and warranty at Core Apex.dev."
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        <PageHero
          eyebrow="Clarity & Transparency"
          icon={HelpCircle}
          title="Frequently Asked"
          highlight="Questions"
          description="Transparent answers regarding our engineering standards, timelines, contracts, and continuous support."
          chips={['Timelines', 'IP Ownership', 'Pricing', 'Support', 'Migrations']}
        />

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          {categories.length > 2 && (
            <Reveal variant="down" className="mb-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#2563EB] text-white shadow-sm border border-[#2563EB]'
                      : 'bg-white text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </Reveal>
          )}

          {/* FAQ Accordion */}
          <Stagger className="mb-14 space-y-3.5" stagger={0.07}>
            {filteredFaqs.map((faq, idx) => {
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
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#172033] flex items-center gap-3">
                      <span className="text-[#2563EB] font-mono text-xs font-semibold">
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
                        <div className="px-5 sm:px-6 pb-6 pt-4 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#F1F5F9]">
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

          {/* Light CTA */}
          <Reveal variant="up" className="space-y-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-8 text-center shadow-sm sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#172033]">
              Still Have Questions?
            </h3>
            <p className="text-[#64748B] text-xs sm:text-sm max-w-lg mx-auto">
              We are here to answer any architecture, security, or contract inquiries directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs uppercase tracking-wider font-mono shadow-button-glow transition-all"
              >
                <span>Send Us an Inquiry</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#BFDBFE] text-[#1D4ED8] text-xs uppercase tracking-wider font-mono font-semibold transition-colors"
              >
                <MessageSquare size={15} />
                <span>Instant WhatsApp</span>
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </>
  );
}
