import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrbitTech from '../components/OrbitTech';
import SectionHeading from '../components/motion/SectionHeading';
import { Stagger, StaggerItem, Reveal } from '../components/motion/Reveal';

const HIGHLIGHTS = [
  { name: 'React 19', role: 'Frontend Engine', badge: 'Declarative SPA' },
  { name: 'Django', role: 'Backend Core', badge: 'Secure ORM' },
  { name: 'PostgreSQL 18', role: 'Relational DB', badge: 'High ACID' },
  { name: 'FastAPI', role: 'Microservices', badge: 'High Speed' },
  { name: 'AWS Cloud', role: 'Infrastructure', badge: 'Auto-Scaling' },
  { name: 'Docker', role: 'Containers', badge: 'DevOps Parity' },
];

export default function TechnologiesSection({ technologies = [] }) {
  return (
    <section id="technologies" className="relative overflow-hidden border-t border-[#E2E8F0] bg-[#F8FAFC] py-20">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[#E0F2FE]/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-10"
          eyebrow="Technology Ecosystem"
          icon={Cpu}
          title="Engineered with"
          highlight="Modern Tech"
          description="We build with battle-tested frameworks, declarative UI libraries, and high-performance relational databases."
        />

        <Reveal variant="zoom" duration={0.8} className="my-4">
          <OrbitTech technologies={technologies} />
        </Reveal>

        <Stagger className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6" stagger={0.07}>
          {HIGHLIGHTS.map((item) => (
            <StaggerItem key={item.name} variant="up" className="h-full">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full rounded-xl border border-[#E2E8F0] bg-white p-4 text-center shadow-sm transition-colors hover:border-[#BFDBFE]"
              >
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB] transition-transform duration-500 group-hover:rotate-[12deg]">
                  <Zap size={15} />
                </div>
                <div className="text-sm font-bold text-[#172033]">{item.name}</div>
                <div className="mt-0.5 font-mono text-xs text-[#2563EB]">{item.role}</div>
                <div className="mt-2 inline-block rounded-md bg-[#F1F5F9] px-2 py-0.5 font-mono text-[10px] text-[#64748B]">
                  {item.badge}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal variant="up" className="mt-10 flex justify-center">
          <Link
            to="/technologies"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#172033] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:text-[#2563EB]"
          >
            <span>Explore the Full Stack</span>
            <ArrowRight size={15} className="text-[#2563EB] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
