import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquareText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/motion/SectionHeading';
import { Stagger, StaggerItem, Reveal } from '../components/motion/Reveal';
import AnimatedCounter from '../components/motion/AnimatedCounter';
import SmartImage from '../components/SmartImage';

const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop';

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-[#E2E8F0] bg-[#F8FAFC] py-20">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#DBEAFE]/60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-14"
          eyebrow="Client Endorsements"
          icon={MessageSquareText}
          title="Trusted by Forward-Thinking"
          highlight="Businesses"
          description="Hear directly from founders and engineering leaders who have partnered with Core Apex.dev."
        />

        {testimonials.length === 0 ? (
          <p className="text-center text-base text-[#64748B]">No testimonials available yet.</p>
        ) : (
          <>
            <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2" stagger={0.14}>
              {testimonials.map((test, idx) => (
                <StaggerItem key={test.id || idx} variant="up" className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="light-card card-interactive group flex h-full flex-col justify-between p-7"
                  >
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(test.rating || 5)].map((_, rIdx) => (
                            <motion.span
                              key={rIdx}
                              initial={{ opacity: 0, scale: 0.5, rotate: -18 }}
                              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.15 + rIdx * 0.07, duration: 0.35 }}
                            >
                              <Star size={15} className="fill-amber-400 text-amber-400" />
                            </motion.span>
                          ))}
                        </div>
                        <Quote
                          size={26}
                          className="text-slate-300 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-[#BFDBFE]"
                        />
                      </div>

                      <p className="mb-6 text-sm italic leading-relaxed text-[#1E293B] sm:text-base">
                        &ldquo;{test.content}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-[#F1F5F9] pt-5">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <SmartImage
                            src={test.avatar_url || FALLBACK_AVATAR}
                            fallback={FALLBACK_AVATAR}
                            alt={test.client_name}
                            wrapperClassName="h-11 w-11 rounded-full"
                            className="rounded-full border border-[#E2E8F0]"
                          />
                          <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#2563EB]/0 transition-all duration-500 group-hover:ring-[#2563EB]/40" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#172033]">{test.client_name}</h4>
                          <p className="text-xs text-[#64748B]">
                            {test.client_role},{' '}
                            <span className="text-[#2563EB]">{test.company_name}</span>
                          </p>
                        </div>
                      </div>

                      {test.project_title && (
                        <div className="hidden text-right sm:block">
                          <span className="block font-mono text-[10px] uppercase text-[#94A3B8]">
                            Project
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#2563EB]">
                            {test.project_title}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Aggregate proof row */}
            <Reveal variant="up" className="mt-12">
              <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-6 shadow-card sm:flex-row">
                <div className="grid w-full grid-cols-3 gap-6 sm:w-auto">
                  {[
                    { value: 5, suffix: '.0', label: 'Average rating' },
                    { value: 40, suffix: '+', label: 'Projects delivered' },
                    { value: 98, suffix: '%', label: 'Client retention' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center sm:text-left">
                      <div className="text-xl font-extrabold text-[#172033] sm:text-2xl">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white shadow-button-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
                >
                  <span>Become a client</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
