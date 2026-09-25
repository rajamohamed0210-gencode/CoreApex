import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, Code2, Headphones, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { WHY_CORE_APEX } from '../data/mockData';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import SectionHeading from '../components/motion/SectionHeading';
import AnimatedCounter from '../components/motion/AnimatedCounter';
import SmartImage from '../components/SmartImage';
import { IMAGES } from '../data/images';

const icons = [Target, Cpu, Code2, Headphones];

const OVERLAY_STATS = [
  { value: 40, suffix: '+', label: 'Systems shipped', position: '-bottom-6 -right-2 sm:-right-6' },
  { value: 12, suffix: ' wk', label: 'Avg. delivery sprint', position: '-top-6 -left-2 sm:-left-6' },
];

export default function WhyCoreApexSection() {
  return (
    <section className="relative overflow-hidden border-t border-[#E2E8F0] bg-white py-20">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#E0F2FE]/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Visual column */}
          <div className="lg:col-span-5">
            <Reveal variant="left">
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-[#EFF6FF] via-white to-[#E0F2FE] blur-2xl" />

                <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-lift">
                  <SmartImage
                    src={IMAGES.aboutTeam}
                    alt="The Core Apex.dev engineering team collaborating on a product sprint"
                    ratio="4 / 3"
                    wrapperClassName="w-full"
                    className="transition-transform duration-[1400ms] ease-smooth hover:scale-[1.05]"
                  />
                </div>

                {OVERLAY_STATS.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.85, y: 14 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.35 + idx * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute ${stat.position} z-20 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur animate-float-soft`}
                  >
                    <div className="text-lg font-extrabold text-[#172033]">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-xl border border-emerald-200 bg-white/95 px-3 py-2 text-[11px] font-semibold text-emerald-700 shadow-lg backdrop-blur"
                >
                  <ShieldCheck size={14} />
                  Production standard on every release
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Principles column */}
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              className="mb-10 max-w-2xl"
              eyebrow="Why Core Apex.dev"
              title="Engineering Principles &"
              highlight="Values"
              description="We build resilient digital assets engineered to drive tangible, long-term enterprise return on investment."
            />

            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.12}>
              {WHY_CORE_APEX.map((item, idx) => {
                const Icon = icons[idx] || Target;
                return (
                  <StaggerItem key={idx} variant="up" className="h-full">
                    <div className="light-card card-interactive group h-full p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="font-mono text-3xl font-black text-[#2563EB] transition-transform duration-500 group-hover:-translate-y-0.5">
                          {item.number}
                        </span>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition-all duration-500 group-hover:rotate-[10deg] group-hover:bg-[#2563EB] group-hover:text-white">
                          <Icon size={20} />
                        </div>
                      </div>

                      <h3 className="mb-1.5 text-lg font-bold text-[#172033]">{item.title}</h3>
                      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                        {item.headline}
                      </p>
                      <p className="text-xs leading-relaxed text-[#64748B] sm:text-sm">{item.description}</p>

                      <div className="mt-6 flex items-center gap-2 border-t border-[#F1F5F9] pt-4 font-mono text-xs text-[#64748B]">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>Production Standard</span>
                        <TrendingUp
                          size={13}
                          className="ml-auto text-[#2563EB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
