import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  ShoppingCart,
  GraduationCap,
  Users,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { apiService } from '../services/api';
import SEO from '../components/SEO';

const iconMap = {
  Briefcase,
  ShoppingCart,
  GraduationCap,
  Users,
  Cpu,
  Layers,
};

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await apiService.getSolutions();
      setSolutions(data);
    }
    load();
  }, []);

  return (
    <>
      <SEO
        title="Solutions — Core Apex.dev | Business Websites, Ecommerce, ERP, CRM & School Management"
        description="Engineered digital solutions for enterprises: E-commerce platforms, School Management ERPs, Custom CRMs, Enterprise Resource Planning, and Business Websites."
      />

      <div className="pt-28 pb-20 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
              <Sparkles size={14} /> Business Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#172033] tracking-tight leading-tight">
              Industry-Specific <span className="text-[#2563EB]">Solutions</span>
            </h1>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              Tailored software ecosystems engineered for immediate business impact. Proven architectures with bespoke customization.
            </p>
          </div>

          {/* Solutions 6-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {solutions.map((sol, idx) => {
              const Icon = iconMap[sol.icon_name] || Layers;

              return (
                <div
                  key={sol.id || idx}
                  id={sol.slug}
                  className="light-card p-7 flex flex-col justify-between scroll-mt-28"
                >
                  <div>
                    {/* Top Icon & Industry */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                        <Icon size={24} />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] uppercase">
                        {sol.industry}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-bold text-[#172033] mb-1">
                      {sol.title}
                    </h3>
                    <p className="text-xs font-mono text-[#2563EB] font-semibold mb-3">
                      {sol.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5">
                      {sol.description}
                    </p>

                    {/* Key Modules */}
                    {sol.key_modules && sol.key_modules.length > 0 && (
                      <div className="space-y-1.5 mb-5">
                        <div className="text-[11px] font-mono uppercase text-[#94A3B8] font-semibold">
                          Core Modules:
                        </div>
                        {sol.key_modules.map((mod, mIdx) => (
                          <div key={mIdx} className="text-xs text-[#475569] flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-[#2563EB] flex-shrink-0" />
                            <span>{mod}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Business Benefits */}
                    {sol.business_benefits && sol.business_benefits.length > 0 && (
                      <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-1 mb-5">
                        <div className="text-[10px] font-mono uppercase text-emerald-800 font-bold flex items-center gap-1">
                          <TrendingUp size={12} /> ROI Impact
                        </div>
                        {sol.business_benefits.map((ben, bIdx) => (
                          <div key={bIdx} className="text-xs text-[#1E293B]">
                            • {ben}
                          </div>
                        ))}
                      </div>
                    )}

                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-[#F1F5F9]">
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-between px-4 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] text-xs font-semibold uppercase font-mono tracking-wider transition-colors"
                    >
                      <span>Deploy {sol.title}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
