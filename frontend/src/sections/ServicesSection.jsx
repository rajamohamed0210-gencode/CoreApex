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
import SectionHeading from '../components/motion/SectionHeading';
import { Stagger, StaggerItem } from '../components/motion/Reveal';
import TiltCard from '../components/motion/TiltCard';
import SmartImage from '../components/SmartImage';
import { serviceImage } from '../data/images';

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
    <section id="services" className="relative overflow-hidden border-t border-[#E2E8F0] bg-white py-20">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-[#EFF6FF] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-14"
          eyebrow="Core Services"
          icon={Cpu}
          title="Engineering Services Built for"
          highlight="Scale"
          description="We architect and develop digital systems from high-performance web applications to resilient cloud infrastructure."
        />

        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8" stagger={0.1}>
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon_name] || Code;
            return (
              <StaggerItem key={service.id || idx} variant="up" className="h-full">
                <TiltCard intensity={5} className="h-full rounded-2xl">
                  <div className="light-card card-interactive card-sheen group flex h-full flex-col justify-between overflow-hidden">
                    {/* Media header */}
                    <div className="relative h-44 overflow-hidden">
                      <SmartImage
                        src={serviceImage(service.slug)}
                        alt={`${service.title} — Core Apex.dev`}
                        wrapperClassName="h-full w-full"
                        className="transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/72 via-[#0F172A]/12 to-transparent" />

                      <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/40 bg-white/90 text-[#2563EB] shadow-sm backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[8deg]">
                        <IconComponent size={20} />
                      </div>

                      <span className="absolute right-4 top-4 font-mono text-sm font-bold text-white/80">
                        0{idx + 1}
                      </span>

                      <h3 className="absolute bottom-3.5 left-4 right-4 text-lg font-bold text-white drop-shadow-sm">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6 pt-5">
                      <div>
                        <p className="mb-5 text-sm leading-relaxed text-[#64748B]">
                          {service.short_description}
                        </p>

                        {service.features && service.features.length > 0 && (
                          <ul className="mb-6 space-y-2">
                            {service.features.slice(0, 3).map((feat, fIdx) => (
                              <motion.li
                                key={fIdx}
                                initial={{ opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.12 + fIdx * 0.08, duration: 0.4 }}
                                className="flex items-center gap-2 text-xs text-[#64748B]"
                              >
                                <CheckCircle2 size={13} className="flex-shrink-0 text-[#2563EB]" />
                                <span>{feat}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="border-t border-[#F1F5F9] pt-4">
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                        >
                          <span>Explore Service Details</span>
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-300 group-hover:translate-x-1"
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

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3 text-sm font-semibold text-[#172033] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
          >
            <span>View All Engineering Services</span>
            <ArrowRight size={15} className="text-[#2563EB] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
