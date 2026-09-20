import React from 'react';
import { Cpu } from 'lucide-react';
import OrbitTech from '../components/OrbitTech';

export default function TechnologiesSection({ technologies = [] }) {
  return (
    <section id="technologies" className="py-20 relative bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
            <Cpu size={14} /> Technology Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
            Engineered with <span className="text-[#2563EB]">Modern Tech</span>
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            We build with battle-tested frameworks, declarative UI libraries, and high-performance relational databases.
          </p>
        </div>

        {/* Orbit Visualization */}
        <div className="my-4">
          <OrbitTech technologies={technologies} />
        </div>

        {/* Tech Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-8">
          {[
            { name: "React 19", role: "Frontend Engine", badge: "Declarative SPA" },
            { name: "Django", role: "Backend Core", badge: "Secure ORM" },
            { name: "PostgreSQL 18", role: "Relational DB", badge: "High ACID" },
            { name: "FastAPI", role: "Microservices", badge: "High Speed" },
            { name: "AWS Cloud", role: "Infrastructure", badge: "Auto-Scaling" },
            { name: "Docker", role: "Containers", badge: "DevOps Parity" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-center hover:border-[#BFDBFE] transition-colors shadow-sm"
            >
              <div className="text-sm font-bold text-[#172033]">{item.name}</div>
              <div className="text-xs text-[#2563EB] font-mono mt-0.5">{item.role}</div>
              <div className="text-[10px] text-[#64748B] font-mono mt-2 px-2 py-0.5 rounded-md bg-[#F1F5F9] inline-block">
                {item.badge}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
