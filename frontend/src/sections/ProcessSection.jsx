import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Compass,
  ClipboardCheck,
  PenTool,
  Code2,
  ShieldAlert,
  Rocket,
  LifeBuoy,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';
import SectionHeading from '../components/motion/SectionHeading';
import { Reveal } from '../components/motion/Reveal';

const iconMap = {
  Compass,
  ClipboardCheck,
  PenTool,
  Code2,
  ShieldAlert,
  Rocket,
  LifeBuoy
};

export default function ProcessSection() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 55%'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  return (
    <section id="process" className="relative overflow-hidden border-t border-[#E2E8F0] bg-white py-20">
      <div className="bg-grid-subtle pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-16"
          eyebrow="Agile Lifecycle"
          icon={Sparkles}
          title="Our 7-Step"
          highlight="Engineering Process"
          description="From initial requirements discovery to post-launch SLA warranty, our structured roadmap ensures reliable delivery."
          titleClassName="text-3xl sm:text-4xl md:text-5xl"
        />

        <div ref={timelineRef} className="relative">
          {/* Animated centre rail (desktop) */}
          <div className="absolute bottom-10 left-1/2 top-6 hidden w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-[#E2E8F0] lg:block">
            <motion.div
              style={{ scaleY: lineProgress }}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#38BDF8]"
            />
          </div>

          <div className="space-y-10 sm:space-y-12">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = iconMap[step.icon] || Code2;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center gap-8 lg:flex-row ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Card */}
                  <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: isEven ? 60 : -60, y: 18 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="light-card card-interactive group relative p-6 sm:p-7">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-mono text-2xl font-black text-[#2563EB] sm:text-3xl">
                          {step.step}
                        </span>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white">
                          <Icon size={20} />
                        </div>
                      </div>

                      <h3 className="mb-1 text-lg font-bold text-[#172033] sm:text-xl">{step.title}</h3>
                      <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                        {step.subtitle}
                      </div>
                      <p className="mb-5 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                        {step.description}
                      </p>

                      <div className="border-t border-[#F1F5F9] pt-4">
                        <div className="mb-2 font-mono text-[11px] font-semibold uppercase text-[#94A3B8]">
                          Deliverables:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {step.deliverables.map((del, dIdx) => (
                            <motion.span
                              key={dIdx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + dIdx * 0.08, duration: 0.35 }}
                              className="flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#475569] transition-colors hover:border-[#BFDBFE] hover:bg-[#EFF6FF]"
                            >
                              <CheckCircle2 size={12} className="text-emerald-600" />
                              {del}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Milestone node */}
                  <div className="relative hidden lg:flex lg:w-10 lg:items-center lg:justify-center">
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2563EB] bg-[#EFF6FF] font-mono text-xs font-bold text-[#2563EB] shadow-sm"
                    >
                      <span className="absolute inset-0 rounded-full border-2 border-[#2563EB] animate-pulse-ring" />
                      {step.step}
                    </motion.span>
                  </div>

                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        <Reveal variant="up" className="mt-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 text-center sm:p-7">
            <p className="text-sm font-semibold text-[#172033] sm:text-base">
              Every sprint ends with a working build, a written summary, and a live demo.
            </p>
            <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
              No black boxes — you always know exactly what has shipped and what is next.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
