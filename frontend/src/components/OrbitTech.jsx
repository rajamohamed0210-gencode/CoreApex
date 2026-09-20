import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Cloud,
  Server,
  Layers,
  Cpu,
  Globe,
  GitBranch,
  Terminal,
  Share2,
  Sparkles
} from 'lucide-react';
import ApexLogoMark from './ApexLogoMark';

export default function OrbitTech({ technologies = [] }) {
  const [hoveredTech, setHoveredTech] = useState(null);

  const defaultTechs = [
    { name: "Python", category: "backend", desc: "Core language for backend APIs & automation", icon: Terminal, ring: "inner", angle: 0 },
    { name: "Django", category: "backend", desc: "Secure full-stack Python framework & ORM", icon: Server, ring: "inner", angle: 72 },
    { name: "React 19", category: "frontend", desc: "High-speed declarative component UI library", icon: Globe, ring: "inner", angle: 144 },
    { name: "PostgreSQL 18", category: "database", desc: "Enterprise relational ACID database system", icon: Database, ring: "inner", angle: 216 },
    { name: "FastAPI", category: "backend", desc: "Ultra-fast ASGI framework for microservices", icon: Cpu, ring: "inner", angle: 288 },

    { name: "TypeScript", category: "frontend", desc: "Type-safe robust frontend interactivity", icon: Code2, ring: "outer", angle: 0 },
    { name: "AWS", category: "cloud", desc: "Scalable cloud hosting, S3 & RDS", icon: Cloud, ring: "outer", angle: 60 },
    { name: "Docker", category: "cloud", desc: "Containerized deployment & DevOps parity", icon: Layers, ring: "outer", angle: 120 },
    { name: "Git", category: "tools", desc: "Distributed version control & CI/CD", icon: GitBranch, ring: "outer", angle: 180 },
    { name: "Tailwind CSS", category: "frontend", desc: "Utility-first design engine", icon: Terminal, ring: "outer", angle: 240 },
    { name: "REST API", category: "api", desc: "Standardized secure RESTful API architectures", icon: Share2, ring: "outer", angle: 300 },
  ];

  const innerTechs = defaultTechs.filter(t => t.ring === "inner");
  const outerTechs = defaultTechs.filter(t => t.ring === "outer");

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[440px] sm:h-[480px] md:h-[520px] flex items-center justify-center overflow-hidden">
      
      {/* Subtle Orbit Track 1 (Inner Ring) */}
      <div className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-[#E2E8F0] pointer-events-none"></div>

      {/* Subtle Orbit Track 2 (Outer Ring) */}
      <div className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] rounded-full border border-[#E2E8F0] pointer-events-none"></div>

      {/* Rotating Inner Ring */}
      <motion.div
        className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {innerTechs.map((tech, i) => {
          const rad = (tech.angle * Math.PI) / 180;
          const radius = window.innerWidth < 640 ? 120 : window.innerWidth < 768 ? 140 : 160;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const Icon = tech.icon;

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#2563EB] group-hover:border-[#2563EB] group-hover:bg-[#EFF6FF] transition-all">
                  <Icon size={18} />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-medium text-[#64748B] group-hover:text-[#2563EB] transition-colors">
                  {tech.name}
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Rotating Outer Ring */}
      <motion.div
        className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {outerTechs.map((tech, i) => {
          const rad = (tech.angle * Math.PI) / 180;
          const radius = window.innerWidth < 640 ? 180 : window.innerWidth < 768 ? 210 : 240;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const Icon = tech.icon;

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#475569] group-hover:border-[#2563EB] group-hover:text-[#2563EB] group-hover:bg-[#EFF6FF] transition-all">
                  <Icon size={16} />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-medium text-[#64748B] group-hover:text-[#2563EB] transition-colors">
                  {tech.name}
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Central Clean Nucleus */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border-2 border-[#2563EB] p-2 flex flex-col items-center justify-center text-center shadow-card space-y-1">
          <ApexLogoMark size={28} />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB] font-bold">
            Core Apex.dev
          </span>
          <span className="text-xs font-extrabold text-[#172033] leading-tight">
            Full-Stack Stack
          </span>
        </div>
      </div>

      {/* Dynamic Hover Tooltip */}
      {hoveredTech && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 z-30 px-4 py-2 rounded-xl bg-white border border-[#BFDBFE] shadow-dropdown max-w-xs text-center"
        >
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <span className="text-xs font-bold text-[#172033]">{hoveredTech.name}</span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] font-semibold uppercase">
              {hoveredTech.category}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">{hoveredTech.desc}</p>
        </motion.div>
      )}

    </div>
  );
}
