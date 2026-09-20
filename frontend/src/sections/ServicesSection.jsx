import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe,
  Smartphone,
  Code,
  Cloud,
  Server,
  Palette,
  ArrowRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Code,
  Cloud,
  Server,
  Palette,
};

export default function ServicesSection({ services = [] }) {
  return (
    <section id="services" className="py-20 relative bg-white border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
            <Cpu size={14} /> Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
            Engineering Services Built for{' '}
            <span className="text-[#2563EB]">Scale</span>
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
            We architect and develop digital systems from high-performance web applications to resilient cloud infrastructure.
          </p>
        </div>

        {/* 6 Consistent White Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon_name] || Code;
            return (
              <div
                key={service.id || idx}
                className="light-card p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Index Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-xl font-mono font-bold text-slate-300">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#172033] mb-2.5">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#64748B] text-sm leading-relaxed mb-5">
                    {service.short_description}
                  </p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-[#64748B] flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-[#2563EB] flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#F1F5F9]">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#172033] hover:text-[#2563EB] border border-[#E2E8F0] text-sm font-semibold transition-colors"
          >
            <span>View All Engineering Services</span>
            <ArrowRight size={15} className="text-[#2563EB]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
