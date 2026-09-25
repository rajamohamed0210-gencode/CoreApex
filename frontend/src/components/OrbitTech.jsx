import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  Share2
} from 'lucide-react';
import ApexLogoMark from './ApexLogoMark';

const INNER_TECHS = [
  { name: "Python", category: "backend", desc: "Core language for backend APIs & automation", icon: Terminal, angle: 0 },
  { name: "Django", category: "backend", desc: "Secure full-stack Python framework & ORM", icon: Server, angle: 72 },
  { name: "React 19", category: "frontend", desc: "High-speed declarative component UI library", icon: Globe, angle: 144 },
  { name: "PostgreSQL 18", category: "database", desc: "Enterprise relational ACID database system", icon: Database, angle: 216 },
  { name: "FastAPI", category: "backend", desc: "Ultra-fast ASGI framework for microservices", icon: Cpu, angle: 288 },
];

const OUTER_TECHS = [
  { name: "TypeScript", category: "frontend", desc: "Type-safe robust frontend interactivity", icon: Code2, angle: 0 },
  { name: "AWS", category: "cloud", desc: "Scalable cloud hosting, S3 & RDS", icon: Cloud, angle: 60 },
  { name: "Docker", category: "cloud", desc: "Containerized deployment & DevOps parity", icon: Layers, angle: 120 },
  { name: "Git", category: "tools", desc: "Distributed version control & CI/CD", icon: GitBranch, angle: 180 },
  { name: "Tailwind CSS", category: "frontend", desc: "Utility-first design engine", icon: Terminal, angle: 240 },
  { name: "REST API", category: "api", desc: "Standardized secure RESTful API architectures", icon: Share2, angle: 300 },
];

/** Responsive orbital radii, derived from the viewport (never read during render). */
const RING_SIZES = {
  base: { inner: 112, outer: 168 },
  sm: { inner: 138, outer: 208 },
  md: { inner: 158, outer: 238 },
};

function useRingSize() {
  const [ring, setRing] = useState('md');

  useEffect(() => {
    const resolve = () => {
      const width = typeof window === 'undefined' ? 1280 : window.innerWidth;
      setRing(width < 640 ? 'base' : width < 768 ? 'sm' : 'md');
    };

    resolve();
    window.addEventListener('resize', resolve);
    return () => window.removeEventListener('resize', resolve);
  }, []);

  return RING_SIZES[ring];
}

function OrbitNode({ tech, radius, size, spinDuration, spinDirection, onHover, onLeave, reduceMotion, delay = 0 }) {
  const rad = (tech.angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  const Icon = tech.icon;
  const large = size === 'lg';

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Counter-rotation keeps icons and labels upright while orbiting */}
        <motion.div
          animate={reduceMotion ? undefined : { rotate: spinDirection * 360 }}
          transition={{ duration: spinDuration, repeat: Infinity, ease: 'linear' }}
          className="group relative"
          onMouseEnter={() => onHover(tech)}
          onMouseLeave={onLeave}
          onFocus={() => onHover(tech)}
          onBlur={onLeave}
          tabIndex={0}
        >
          <div
            className={`flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#2563EB] shadow-sm transition-all duration-300 group-hover:border-[#2563EB] group-hover:bg-[#EFF6FF] group-hover:shadow-button-glow ${
              large ? 'h-11 w-11' : 'h-9 w-9 sm:h-10 sm:w-10'
            }`}
          >
            <Icon size={large ? 18 : 16} />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-medium text-[#64748B] transition-colors group-hover:text-[#2563EB]">
            {tech.name}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function OrbitTech() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const radius = useRingSize();
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex h-[440px] w-full max-w-4xl items-center justify-center overflow-hidden sm:h-[480px] md:h-[520px]">
      {/* Orbit tracks */}
      {[radius.inner, radius.outer].map((r, idx) => (
        <motion.span
          key={r}
          aria-hidden="true"
          className="absolute rounded-full border border-[#E2E8F0]"
          style={{ width: r * 2, height: r * 2 }}
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Soft pulsing halo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full bg-[#EFF6FF] blur-2xl animate-pulse-ring"
        style={{ width: radius.inner * 1.5, height: radius.inner * 1.5 }}
      />

      {/* Inner ring (clockwise) */}
      <div
        className="absolute"
        style={{ width: radius.inner * 2, height: radius.inner * 2 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {INNER_TECHS.map((tech, idx) => (
            <OrbitNode
              key={tech.name}
              tech={tech}
              radius={radius.inner}
              size="lg"
              spinDuration={45}
              spinDirection={-1}
              delay={idx * 0.08}
              reduceMotion={reduceMotion}
              onHover={setHoveredTech}
              onLeave={() => setHoveredTech(null)}
            />
          ))}
        </motion.div>
      </div>

      {/* Outer ring (counter-clockwise) */}
      <div
        className="absolute"
        style={{ width: radius.outer * 2, height: radius.outer * 2 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {OUTER_TECHS.map((tech, idx) => (
            <OrbitNode
              key={tech.name}
              tech={tech}
              radius={radius.outer}
              size="sm"
              spinDuration={60}
              spinDirection={1}
              delay={0.1 + idx * 0.07}
              reduceMotion={reduceMotion}
              onHover={setHoveredTech}
              onLeave={() => setHoveredTech(null)}
            />
          ))}
        </motion.div>
      </div>

      {/* Nucleus */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex flex-col items-center justify-center"
      >
        <div className="flex h-28 w-28 flex-col items-center justify-center space-y-1 rounded-2xl border-2 border-[#2563EB] bg-white p-2 text-center shadow-card sm:h-32 sm:w-32">
          <ApexLogoMark size={28} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
            Core Apex.dev
          </span>
          <span className="text-xs font-extrabold leading-tight text-[#172033]">Full-Stack Stack</span>
        </div>
      </motion.div>

      {/* Hover tooltip */}
      {hoveredTech && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 z-30 max-w-xs rounded-xl border border-[#BFDBFE] bg-white px-4 py-2 text-center shadow-dropdown"
        >
          <div className="mb-0.5 flex items-center justify-center gap-1.5">
            <span className="text-xs font-bold text-[#172033]">{hoveredTech.name}</span>
            <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase text-[#2563EB]">
              {hoveredTech.category}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">{hoveredTech.desc}</p>
        </motion.div>
      )}
    </div>
  );
}
