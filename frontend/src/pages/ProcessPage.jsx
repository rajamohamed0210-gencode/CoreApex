import React from 'react';
import ProcessSection from '../sections/ProcessSection';
import SEO from '../components/SEO';
import { Sparkles } from 'lucide-react';

export default function ProcessPage() {
  return (
    <>
      <SEO
        title="7-Step Development Process — Core Apex.dev"
        description="Discover our battle-tested 7-stage agile development process: Discover, Plan, Design, Develop, Test, Deploy, and Support."
      />

      <div className="pt-28 pb-10 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
              <Sparkles size={14} /> Agile Delivery
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#172033] tracking-tight leading-tight">
              Engineering <span className="text-[#2563EB]">Process</span>
            </h1>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              Our 7-stage software development lifecycle ensures structured execution, transparent communication, and predictable timelines.
            </p>
          </div>
        </div>

        <ProcessSection />
      </div>
    </>
  );
}
