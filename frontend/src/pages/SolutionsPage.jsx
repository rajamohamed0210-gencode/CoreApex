import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import PageHero from '../components/motion/PageHero';
import { Stagger, StaggerItem } from '../components/motion/Reveal';
import TiltCard from '../components/motion/TiltCard';
import SmartImage from '../components/SmartImage';
import { solutionImage, IMAGES } from '../data/images';

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

      <div className="min-h-screen bg-[#F8FAFC]">
        <PageHero
          eyebrow="Business Solutions"
          icon={Sparkles}
          title="Industry-Specific"
          highlight="Solutions"
          description="Tailored software ecosystems engineered for immediate business impact. Proven architectures with bespoke customization."
          image={IMAGES.solutions['ecommerce-platforms']}
          imageAlt="Custom ecommerce and ERP solutions engineered by Core Apex.dev"
          imageBadge={{ icon: TrendingUp, title: 'Measurable ROI', subtitle: 'Outcome-first scoping' }}
          chips={['Ecommerce', 'School ERP', 'CRM', 'ERP', 'Business Sites', 'Custom Software']}
        />

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {solutions.map((sol, idx) => {
                const Icon = iconMap[sol.icon_name] || Layers;

                return (
                  <StaggerItem key={sol.id || idx} variant="up" className="h-full">

                    <TiltCard intensity={5} className="h-full rounded-2xl">
                      <div
                        id={sol.slug}
                        className="light-card card-interactive card-sheen group flex h-full scroll-mt-28 flex-col justify-between overflow-hidden"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <SmartImage
                            src={solutionImage(sol.slug)}
                            alt={`${sol.title} solution by Core Apex.dev`}
                            wrapperClassName="h-full w-full"
                            className="transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.08]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/78 via-[#0F172A]/20 to-transparent" />

                          <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/40 bg-white/90 text-[#2563EB] backdrop-blur transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                            <Icon size={20} />
                          </div>

                          <span className="absolute right-4 top-4 rounded-lg border border-white/30 bg-white/20 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                            {sol.industry}
                          </span>

                          <h3 className="absolute bottom-3.5 left-4 right-4 text-lg font-bold text-white">
                            {sol.title}
                          </h3>
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div>
                            <p className="mb-3 font-mono text-xs font-semibold text-[#2563EB]">{sol.tagline}</p>

                            <p className="mb-5 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                              {sol.description}
                            </p>

                            {sol.key_modules && sol.key_modules.length > 0 && (
                              <div className="mb-5 space-y-1.5">
                                <div className="font-mono text-[11px] font-semibold uppercase text-[#94A3B8]">
                                  Core Modules:
                                </div>
                                {sol.key_modules.map((mod, mIdx) => (
                                  <motion.div
                                    key={mIdx}
                                    initial={{ opacity: 0, x: -6 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: mIdx * 0.07, duration: 0.4 }}
                                    className="flex items-center gap-2 text-xs text-[#475569]"
                                  >
                                    <CheckCircle2 size={13} className="flex-shrink-0 text-[#2563EB]" />
                                    <span>{mod}</span>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {sol.business_benefits && sol.business_benefits.length > 0 && (
                              <div className="mb-5 space-y-1 rounded-xl border border-emerald-200/60 bg-emerald-50/70 p-3">
                                <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase text-emerald-800">
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

                          <div className="border-t border-[#F1F5F9] pt-4">
                            <Link
                              to="/contact"
                              className="group/btn flex w-full items-center justify-between rounded-xl bg-[#EFF6FF] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D4ED8] transition-colors hover:bg-[#DBEAFE]"
                            >
                              <span>Deploy {sol.title}</span>
                              <ArrowRight
                                size={14}
                                className="transition-transform duration-300 group-hover/btn:translate-x-1"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      </div>
    </>
  );
}
