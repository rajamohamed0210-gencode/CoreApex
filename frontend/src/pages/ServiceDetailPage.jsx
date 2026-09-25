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
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import SmartImage from '../components/SmartImage';
import { serviceImage } from '../data/images';

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
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8FAFC] pb-24 pt-36 text-center">
        <div className="relative h-11 w-11">
          <div className="absolute inset-0 rounded-full border-2 border-[#DBEAFE]" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-slate-400">Loading service…</div>
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
          <Reveal variant="up">
          <div className="light-card mb-6 space-y-4 overflow-hidden p-7 sm:p-10">
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
          </Reveal>

          {/* Capability visual */}
          <Reveal variant="zoom" className="mb-8">
            <div className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-card">
              <SmartImage
                src={serviceImage(service.slug)}
                alt={`${service.title} engineering at Core Apex.dev`}
                ratio="16 / 7"
                wrapperClassName="w-full"
                priority
                className="transition-transform duration-[1300ms] ease-smooth group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-[#0F172A]/10 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center gap-2">
                {(service.tech_stack || []).slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Features & Deliverables Grid */}
          <Stagger className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.15}>
            
            {/* Features */}
            <StaggerItem variant="left" className="h-full">
            <div className="light-card h-full space-y-4 p-6 sm:p-7">
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
            </StaggerItem>

            {/* Deliverables */}
            <StaggerItem variant="right" className="h-full">
            <div className="light-card h-full space-y-4 p-6 sm:p-7">
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
            </StaggerItem>

          </Stagger>

          {/* Tech Stack Chips */}
          {service.tech_stack && service.tech_stack.length > 0 && (
            <div className="p-6 sm:p-7 rounded-2xl light-card mb-8 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                Technology Stack Utilized
              </h3>
              <Stagger className="flex flex-wrap gap-2" stagger={0.06}>
                {service.tech_stack.map((t, idx) => (
                  <StaggerItem key={idx} variant="zoom">
                    <span className="rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] px-3 py-1.5 font-mono text-xs font-medium text-[#172033] transition-colors hover:border-[#BFDBFE] hover:bg-[#EFF6FF]">
                      {t}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}

          {/* Light CTA Box */}
          <Reveal variant="up">
          <div className="space-y-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-8 text-center shadow-sm sm:p-10">
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
          </Reveal>

        </div>
      </div>
    </>
  );
}
