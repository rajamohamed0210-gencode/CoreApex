import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, Code2, Headphones, CheckCircle2 } from 'lucide-react';
import { WHY_CORE_APEX } from '../data/mockData';

const icons = [Target, Cpu, Code2, Headphones];

export default function WhyCoreApexSection() {
  return (
    <section className="py-20 relative bg-white border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
            Why Core Apex.dev
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
            Engineering Principles & <span className="text-[#2563EB]">Values</span>
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            We build resilient digital assets engineered to drive tangible, long-term enterprise return on investment.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CORE_APEX.map((item, idx) => {
            const Icon = icons[idx] || Target;
            return (
              <div
                key={idx}
                className="light-card p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Top Index & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-mono font-black text-[#2563EB]">
                      {item.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#172033] mb-1.5">
                    {item.title}
                  </h3>

                  {/* Headline */}
                  <p className="text-xs font-mono font-semibold text-[#2563EB] uppercase tracking-wider mb-3">
                    {item.headline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Sub-badge */}
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center gap-2 text-xs font-mono text-[#64748B]">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Production Standard</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
