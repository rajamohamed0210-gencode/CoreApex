import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Sparkles,
  Rocket
} from 'lucide-react';
import { apiService } from '../services/api';
import SEO from '../components/SEO';
import PageHero from '../components/motion/PageHero';
import { Stagger, StaggerItem } from '../components/motion/Reveal';
import TiltCard from '../components/motion/TiltCard';
import SmartImage from '../components/SmartImage';
import { IMAGES, serviceImage } from '../data/images';

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

      <div className="min-h-screen bg-[#F8FAFC]">
        <PageHero
          eyebrow="Engineering Capabilities"
          icon={Cpu}
          title="Enterprise"
          highlight="Digital Services"
          description="Bespoke software engineering built on modern stacks. We engineer high-speed web apps, mobile systems, scalable APIs, and resilient cloud architectures."
          image={IMAGES.services['web-development']}
          imageAlt="Core Apex.dev engineers building a web platform"
          imageBadge={{ icon: Rocket, title: 'Sprint delivery', subtitle: 'Working build every 2 weeks' }}
          chips={['React 19', 'Django REST', 'PostgreSQL', 'AWS', 'Docker', 'FastAPI']}
        />

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Stagger className="space-y-8" stagger={0.12}>
              {services.map((service, idx) => {
                const Icon = iconMap[service.icon_name] || Code;

                return (
                  <StaggerItem key={service.id || idx} variant="up">
                    <div className="light-card card-interactive group overflow-hidden">
                      <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
                        {/* Text column */}
                        <div className="space-y-5 p-7 sm:p-9 lg:col-span-7">
                          <div className="flex items-center gap-3.5">
                            <motion.div
                              whileHover={{ rotate: 10, scale: 1.08 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]"
                            >
                              <Icon size={24} />
                            </motion.div>
                            <div>
                              <span className="block font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                Service 0{idx + 1}
                              </span>
                              <h2 className="text-xl font-bold text-[#172033] sm:text-2xl">
                                {service.title}
                              </h2>
                            </div>
                          </div>

                          <p className="text-xs font-medium text-[#2563EB] sm:text-sm">{service.tagline}</p>

                          <p className="text-xs leading-relaxed text-[#64748B] sm:text-sm">
                            {service.full_description || service.short_description}
                          </p>

                          <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                            {service.deliverables && service.deliverables.map((item, dIdx) => (
                              <motion.div
                                key={dIdx}
                                initial={{ opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: dIdx * 0.07, duration: 0.4 }}
                                className="flex items-center gap-2 text-xs text-[#475569]"
                              >
                                <CheckCircle2 size={13} className="flex-shrink-0 text-emerald-600" />
                                <span>{item}</span>
                              </motion.div>
                            ))}
                          </div>

                          {service.tech_stack && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {service.tech_stack.map((t, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="rounded-md border border-[#E2E8F0] bg-[#F1F5F9] px-2.5 py-1 font-mono text-xs text-[#475569] transition-colors hover:border-[#BFDBFE] hover:bg-[#EFF6FF]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="pt-2">
                            <Link
                              to={`/services/${service.slug}`}
                              className="group/cta inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-button-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
                            >
                              <span>Explore Service Architecture</span>
                              <ArrowRight
                                size={14}
                                className="transition-transform duration-300 group-hover/cta:translate-x-1"
                              />
                            </Link>
                          </div>
                        </div>

                        {/* Visual + spec column */}
                        <div className="relative lg:col-span-5">
                          <SmartImage
                            src={serviceImage(service.slug)}
                            alt={`${service.title} delivered by Core Apex.dev`}
                            wrapperClassName="h-44 w-full lg:h-full"
                            className="transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.06]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-[#0F172A]/15 to-transparent lg:bg-gradient-to-l lg:from-[#0F172A]/80 lg:via-[#0F172A]/35" />

                          <div className="absolute inset-x-4 bottom-4 lg:left-6 lg:right-6">
                            <div className="space-y-2.5 rounded-xl border border-white/20 bg-white/12 p-4 backdrop-blur-md">
                              <div className="flex items-center justify-between border-b border-white/20 pb-2 font-mono text-[10px] uppercase tracking-wider text-white/80">
                                <span>Core Apex Spec</span>
                                <span className="font-semibold text-white">Production Grade</span>
                              </div>
                              <div className="space-y-1.5 text-[11px] text-white/90">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-white/60">Timeline</span>
                                  <span className="font-semibold">2 – 6 week roadmap</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-white/60">IP handover</span>
                                  <span className="font-semibold">100% codebase</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-white/60">Warranty</span>
                                  <span className="font-semibold">30-day support</span>
                                </div>
                              </div>
                              <Link
                                to="/contact"
                                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg bg-white py-2 font-mono text-[11px] font-semibold text-[#1D4ED8] transition-colors hover:bg-[#EFF6FF]"
                              >
                                Request Custom Quote
                                <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>

            {/* Closing CTA */}
            <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.12}>
              {[
                { Icon: Sparkles, title: 'Fixed-scope estimates', copy: 'Written proposals with milestones, price and timeline before we start.' },
                { Icon: Cpu, title: 'Senior-only engineering', copy: 'No hand-offs to juniors — the engineers who scope your build ship it.' },
                { Icon: Rocket, title: 'Launch-ready delivery', copy: 'CI/CD, monitoring and documentation included on every release.' },
              ].map(({ Icon, title, copy }) => (
                <StaggerItem key={title} variant="up" className="h-full">
                  <TiltCard intensity={5} className="h-full rounded-2xl">
                    <div className="light-card h-full p-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                        <Icon size={20} />
                      </div>
                      <h3 className="mb-1.5 text-base font-bold text-[#172033]">{title}</h3>
                      <p className="text-xs leading-relaxed text-[#64748B] sm:text-sm">{copy}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </div>
    </>
  );
}
