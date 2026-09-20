import React, { useState, useEffect } from 'react';
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
import { apiService } from '../services/api';
import SEO from '../components/SEO';

const iconMap = {
  Globe,
  Smartphone,
  Code,
  Cloud,
  Server,
  Palette
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await apiService.getServices();
      setServices(data);
    }
    load();
  }, []);

  return (
    <>
      <SEO
        title="Services — Core Apex.dev | Web, Mobile, Custom Software & Cloud"
        description="Comprehensive software engineering services: Web development with React, mobile apps with React Native, custom Django backends, and AWS cloud solutions."
      />

      <div className="pt-28 pb-20 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
              <Cpu size={14} /> Engineering Capabilities
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#172033] tracking-tight leading-tight">
              Enterprise <span className="text-[#2563EB]">Digital Services</span>
            </h1>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              Bespoke software engineering built on modern stacks. We engineer high-speed web apps, mobile systems, scalable APIs, and resilient cloud architectures.
            </p>
          </div>

          {/* 6 Core Services List */}
          <div className="space-y-8 mb-16">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon_name] || Code;

              return (
                <div
                  key={service.id || idx}
                  className="light-card p-7 sm:p-9 relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Info */}
                    <div className="lg:col-span-8 space-y-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                          <Icon size={24} />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-[#2563EB] font-bold uppercase tracking-wider block">
                            Service 0{idx + 1}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold text-[#172033]">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-[#2563EB] text-xs sm:text-sm font-medium">
                        {service.tagline}
                      </p>

                      <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
                        {service.full_description || service.short_description}
                      </p>

                      {/* Deliverables */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {service.deliverables && service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-[#475569]">
                            <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack tags */}
                      {service.tech_stack && (
                        <div className="pt-1 flex flex-wrap gap-1.5">
                          {service.tech_stack.map((t, tIdx) => (
                            <span key={tIdx} className="px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-mono text-[#475569]">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-2">
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold uppercase font-mono tracking-wider shadow-button-glow transition-all"
                        >
                          <span>Explore Service Architecture</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>

                    </div>

                    {/* Right: Specifications Box */}
                    <div className="lg:col-span-4 flex justify-center">
                      <div className="w-full p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono text-[#64748B] border-b border-[#E2E8F0] pb-2.5">
                          <span>CORE APEX SPEC</span>
                          <span className="text-[#2563EB] font-semibold">PRODUCTION GRADE</span>
                        </div>
                        <div className="space-y-2.5 text-xs text-[#172033]">
                          <div>
                            <span className="text-[#94A3B8] font-mono block">Timeline:</span>
                            2 – 6 Weeks Sprint Roadmap
                          </div>
                          <div>
                            <span className="text-[#94A3B8] font-mono block">IP Handover:</span>
                            100% Full Codebase & Git Repo
                          </div>
                          <div>
                            <span className="text-[#94A3B8] font-mono block">Warranty:</span>
                            30-Day Post-Launch Bug Warranty
                          </div>
                        </div>
                        <div className="pt-2">
                          <Link
                            to="/contact"
                            className="block w-full py-2 text-center rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] text-xs font-mono font-semibold transition-colors"
                          >
                            Request Custom Quote →
                          </Link>
                        </div>
                      </div>
                    </div>

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
