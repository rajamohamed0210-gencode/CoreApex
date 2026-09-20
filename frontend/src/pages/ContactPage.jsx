import React from 'react';
import ContactLeadSection from '../sections/ContactLeadSection';
import SEO from '../components/SEO';
import { Sparkles } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us & Project Estimator — Core Apex.dev"
        description="Connect with Core Apex.dev for custom software development, web applications, mobile apps, or cloud architectures. Fast 24-hour response."
      />

      <div className="pt-28 pb-10 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
              <Sparkles size={14} /> Direct Engagement
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#172033] tracking-tight leading-tight">
              Start Your <span className="text-[#2563EB]">Project</span>
            </h1>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              Tell us about your business goals and technical requirements. We will analyze your scope and get in touch within 24 hours.
            </p>
          </div>
        </div>

        <ContactLeadSection />
      </div>
    </>
  );
}
