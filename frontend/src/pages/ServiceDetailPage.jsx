import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Globe,
  Smartphone,
  Code,
  Cloud,
  Server,
  Palette,
  ArrowRight,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  ChevronLeft,
  MessageSquare
} from 'lucide-react';
import { apiService } from '../services/api';
import SEO from '../components/SEO';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

const iconMap = {
  Globe,
  Smartphone,
  Code,
  Cloud,
  Server,
  Palette
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await apiService.getServiceBySlug(slug);
      setService(data);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading || !service) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-[#F8FAFC] text-center flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const Icon = iconMap[service.icon_name] || Code;

  return (
    <>
      <SEO
        title={`${service.title} — Core Apex.dev`}
        description={service.short_description}
      />

      <div className="pt-28 pb-20 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              <ChevronLeft size={14} /> Back to Services Directory
            </Link>
          </div>

          {/* Hero of Service */}
          <div className="p-7 sm:p-10 rounded-2xl light-card mb-8 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                <Icon size={28} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#2563EB] tracking-wider">
                  Core Apex.dev Engineering
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172033]">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#2563EB] font-medium">
              {service.tagline}
            </p>

            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              {service.full_description || service.short_description}
            </p>
          </div>

          {/* Features & Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Features */}
            <div className="p-6 sm:p-7 rounded-2xl light-card space-y-4">
              <h3 className="text-lg font-bold text-[#172033] flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#2563EB]" />
                Technical Capabilities
              </h3>
              <ul className="space-y-2.5">
                {service.features && service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="p-6 sm:p-7 rounded-2xl light-card space-y-4">
              <h3 className="text-lg font-bold text-[#172033] flex items-center gap-2">
                <Cpu size={18} className="text-[#2563EB]" />
                Production Deliverables
              </h3>
              <ul className="space-y-2.5">
                {service.deliverables && service.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 size={15} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Tech Stack Chips */}
          {service.tech_stack && service.tech_stack.length > 0 && (
            <div className="p-6 sm:p-7 rounded-2xl light-card mb-8 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                Technology Stack Utilized
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.tech_stack.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-mono font-medium text-[#172033]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Light CTA Box */}
          <div className="text-center p-8 sm:p-10 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-4 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#172033]">
              Launch Your {service.title} Project
            </h3>
            <p className="text-[#64748B] text-sm max-w-lg mx-auto">
              Get an exact engineering estimate and architecture proposal tailored to your technical requirements.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs uppercase tracking-wider font-mono font-semibold shadow-button-glow transition-all"
              >
                <span>Get Started with {service.title}</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#BFDBFE] text-[#1D4ED8] text-xs uppercase tracking-wider font-mono font-semibold transition-colors"
              >
                <MessageSquare size={15} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
