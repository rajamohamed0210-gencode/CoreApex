import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <section id="process" className="py-20 relative bg-white border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
            <Sparkles size={14} /> Agile Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
            Our 7-Step <span className="text-[#2563EB]">Engineering Process</span>
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            From initial requirements discovery to post-launch SLA warranty, our structured roadmap ensures reliable delivery.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          
          {/* Vertical central connector line for timeline on large screens */}
          <div className="hidden lg:block absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-0.5 bg-[#E2E8F0]"></div>

          <div className="space-y-10 sm:space-y-12">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = iconMap[step.icon] || Code2;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Step Card Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="light-card p-6 sm:p-7 relative group">
                      
                      {/* Top Step Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl sm:text-3xl font-mono font-black text-[#2563EB]">
                          {step.step}
                        </span>
                        <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                          <Icon size={20} />
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg sm:text-xl font-bold text-[#172033] mb-1">
                        {step.title}
                      </h3>
                      <div className="text-xs font-mono font-semibold text-[#2563EB] uppercase tracking-wider mb-3">
                        {step.subtitle}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-5">
                        {step.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="pt-4 border-t border-[#F1F5F9]">
                        <div className="text-[11px] font-mono uppercase text-[#94A3B8] mb-2 font-semibold">
                          Deliverables:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {step.deliverables.map((del, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] flex items-center gap-1.5"
                            >
                              <CheckCircle2 size={12} className="text-emerald-600" />
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Central Timeline Milestone Node */}
                  <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[#EFF6FF] border-2 border-[#2563EB] text-[#2563EB] font-mono font-bold text-xs shadow-sm relative z-10">
                    {step.step}
                  </div>

                  {/* Empty Spacer on other side */}
                  <div className="hidden lg:block w-1/2"></div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
