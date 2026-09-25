import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Rocket, ShieldCheck, Timer, Terminal, Sparkles } from 'lucide-react';
import AuroraBackground from '../components/motion/AuroraBackground';
import AnimatedCounter from '../components/motion/AnimatedCounter';
import { Stagger, StaggerItem, Reveal } from '../components/motion/Reveal';
import SectionHeading from '../components/motion/SectionHeading';

const METRICS = [
  { Icon: Gauge, value: 99.9, decimals: 1, suffix: '%', label: 'Uptime SLA', note: 'Monitored every 60s' },
  { Icon: Rocket, value: 1.2, decimals: 1, suffix: 's', label: 'Median load time', note: 'Global CDN edge' },
  { Icon: ShieldCheck, value: 100, suffix: '%', label: 'Code ownership', note: 'Full Git handover' },
  { Icon: Timer, value: 24, suffix: 'h', label: 'Proposal turnaround', note: 'Scoped & priced' },
];

const PIPELINE = [
  { label: 'git push', detail: 'main → feature/checkout' },
  { label: 'tests', detail: '148 passed · 0 failed' },
  { label: 'build', detail: 'bundle 128 kB gzip' },
  { label: 'deploy', detail: 'production · zero downtime' },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden border-t border-[#1E293B] bg-[#0F172A] py-20 text-white">
      <AuroraBackground variant="dark" intensity="strong" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy + metrics */}
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              className="mb-12"
              eyebrow="Engineering Telemetry"
              icon={Sparkles}
              title="Performance You Can"
              highlight="Measure"
              description="Every Core Apex build ships with monitoring, budgets, and automated pipelines — so quality is provable, not promotional."
              tone="dark"
            />

            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.12}>
              {METRICS.map(({ Icon, value, decimals = 0, suffix, label, note }) => (
                <StaggerItem key={label} variant="up" className="h-full">
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-[400ms] hover:-translate-y-1 hover:border-[#38BDF8]/50 hover:bg-white/[0.07]">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/20 text-[#93C5FD] transition-transform duration-500 group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <div className="text-3xl font-extrabold tracking-tight text-white">
                      <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-200">{label}</div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      {note}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Animated terminal */}
          <div className="lg:col-span-5">
            <Reveal variant="right" duration={0.7}>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#2563EB]/20 blur-3xl" />

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/90 shadow-2xl backdrop-blur">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      <Terminal size={11} />
                      ci/cd pipeline
                    </div>
                  </div>

                  <div className="space-y-3 p-5 font-mono text-xs">
                    {PIPELINE.map((step, idx) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ delay: 0.2 + idx * 0.22, duration: 0.45 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 text-[#34D399]">➜</span>
                        <div>
                          <div className="text-[#93C5FD]">
                            {step.label}
                            {idx === PIPELINE.length - 1 && (
                              <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-[2px] bg-[#38BDF8] animate-blink" />
                            )}
                          </div>
                          <div className="text-slate-400">{step.detail}</div>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5"
                    >
                      <span className="text-emerald-300">deployment verified</span>
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        live
                      </span>
                    </motion.div>
                  </div>

                  {/* Animated activity bars */}
                  <div className="flex h-16 items-end gap-1.5 border-t border-white/10 px-5 pb-4 pt-3">
                    {[38, 62, 48, 76, 55, 88, 64, 92, 70, 58, 80, 66].map((height, idx) => (
                      <motion.span
                        key={idx}
                        className="flex-1 rounded-t bg-gradient-to-t from-[#2563EB]/40 to-[#38BDF8]"
                        style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                        initial={{ scaleY: 0.1, opacity: 0.2 }}
                        whileInView={{ scaleY: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
