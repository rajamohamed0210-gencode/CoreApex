import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  Code2,
  Check,
  Star,
  Activity,
  GitBranch,
  Sparkles,
  Mouse
} from 'lucide-react';
import { WhatsAppIcon } from '../components/SocialIcons';
import { ReactLogo, PythonLogo, DjangoLogo, PostgreSQLLogo } from '../components/TechBrandIcons';
import AuroraBackground from '../components/motion/AuroraBackground';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import AnimatedCounter from '../components/motion/AnimatedCounter';
import Marquee from '../components/motion/Marquee';
import TiltCard from '../components/motion/TiltCard';
import SmartImage from '../components/SmartImage';
import { IMAGES } from '../data/images';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

const ROTATING_WORDS = [
  'Digital Reality.',
  'Scalable Platforms.',
  'Mobile Products.',
  'Cloud Systems.',
];

const STACK_CHIPS = [
  { name: 'React', Logo: ReactLogo },
  { name: 'Python', Logo: PythonLogo },
  { name: 'Django', Logo: DjangoLogo },
  { name: 'PostgreSQL', Logo: PostgreSQLLogo },
];

const HERO_STATS = [
  { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime Standard', Icon: Code2 },
  { value: 100, suffix: '%', label: 'IP & Code Ownership', Icon: Shield },
  { value: 30, suffix: '-Day', label: 'Post-Launch Warranty', Icon: Clock },
  { value: 24, suffix: '/7', label: 'Monitoring & Support', Icon: Users },
];

const KPI_BARS = [58, 74, 46, 88, 62, 96, 70];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <span className="text-gradient-brand inline-block">{ROTATING_WORDS[0]}</span>;
  }

  return (
    <span className="relative inline-flex h-[1.18em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: '110%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-110%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient-brand whitespace-nowrap"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Animated product surface used as the hero's visual anchor. */
function ProductShowcase() {
  return (
    <div className="relative w-full max-w-[560px]">
      {/* Glow behind the mockup */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-[#DBEAFE] via-white to-[#E0F2FE] blur-2xl" />

      <TiltCard intensity={6} className="rounded-[26px]">
        <div className="overflow-hidden rounded-[26px] border border-[#E2E8F0] bg-white shadow-lift">
          {/* Browser chrome */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-[10px] font-mono text-[#64748B]">
              <Shield size={10} className="text-emerald-500" />
              coreapex.dev
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              live
            </div>
          </div>

          {/* Abstract hero banner image */}
          <div className="relative h-40 overflow-hidden sm:h-48">
            <SmartImage
              src={IMAGES.heroAbstract}
              alt="Abstract visualization of Core Apex digital product engineering"
              priority
              wrapperClassName="h-full w-full"
              className="transition-transform duration-[1200ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/10 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#2563EB]">
                  Product Delivery
                </div>
                <div className="text-sm font-bold text-[#172033]">Sprint 04 · Shipping</div>
              </div>
              <span className="rounded-lg border border-[#BFDBFE] bg-white/95 px-2 py-1 text-[10px] font-mono font-semibold text-[#1D4ED8]">
                +18% velocity
              </span>
            </div>
          </div>

          {/* Animated KPI panel */}
          <div className="space-y-4 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#172033]">
                <Activity size={14} className="text-[#2563EB]" />
                Performance Telemetry
              </div>
              <span className="text-[10px] font-mono text-[#64748B]">last 7 cycles</span>
            </div>

            <div className="flex h-24 items-end gap-2 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3">
              {KPI_BARS.map((height, idx) => (
                <motion.span
                  key={idx}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-[#2563EB] to-[#60A5FA]"
                  style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                  initial={{ scaleY: 0.15, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { k: 'Lighthouse', v: '99' },
                { k: 'Coverage', v: '94%' },
                { k: 'Build', v: '1.2s' },
              ].map((item, idx) => (
                <motion.div
                  key={item.k}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1, duration: 0.5 }}
                  className="rounded-xl border border-[#E2E8F0] bg-white p-2.5 text-center"
                >
                  <div className="text-sm font-extrabold text-[#172033]">{item.v}</div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
                    {item.k}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>

      {/* Floating checklist card */}
      <motion.div
        initial={{ opacity: 0, x: -28, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-3 top-24 z-20 hidden min-w-[168px] rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:-left-8 sm:block animate-float-soft"
      >
        {['Modern Design', 'Clean Code', 'Fast Performance', 'Ongoing Support'].map((item, idx) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + idx * 0.12, duration: 0.45 }}
            className="flex items-center gap-2 py-1 text-xs font-semibold text-slate-800"
          >
            <Check size={14} className="stroke-[3] text-[#2563EB]" />
            <span>{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating stack chips card */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:gap-6 animate-float-delayed"
      >
        {STACK_CHIPS.map(({ name, Logo }) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <Logo size={22} />
            <span className="text-[10px] font-semibold text-slate-700">{name}</span>
          </div>
        ))}
      </motion.div>

      {/* Floating deploy card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-6 right-0 z-20 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:flex animate-float"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
          <GitBranch size={16} />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#172033]">
            Deployment
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-[10px] font-mono text-[#64748B]">CI/CD · zero downtime</div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] pb-20 pt-20 sm:pt-24">
      <AuroraBackground intensity="strong" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Technical marker */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 hidden items-center justify-end gap-3 text-xs font-mono font-semibold uppercase tracking-widest text-[#2563EB] lg:flex"
        >
          <span>IDEAS TO REALITY</span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-[2px] bg-[#2563EB]"
          />
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Left: copy + CTAs */}
          <div className="space-y-7 text-center lg:col-span-5 lg:text-left">
            <Reveal variant="down" duration={0.5}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-white/80 px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#2563EB] backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-70 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2563EB]" />
                </span>
                Web &bull; App &bull; Cloud &bull; Software
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-[32px] font-black leading-[1.12] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[54px]">
                We Turn Ideas Into
                {/* Slightly smaller on phones so the longest rotating phrase never overflows */}
                <span className="mt-1 block text-[27px] sm:text-5xl lg:text-[54px]">
                  <RotatingWord />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-[#64748B] sm:text-lg lg:mx-0">
                <span className="font-semibold text-[#1E293B]">Core Apex.dev</span> builds modern websites,
                mobile applications, custom software, e-commerce platforms, backend systems and cloud
                solutions for businesses.
              </p>
            </Reveal>

            <Stagger className="flex flex-col items-center justify-center gap-3 pt-1 lg:justify-start sm:flex-row" stagger={0.1}>
              <StaggerItem variant="up" className="w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="card-sheen group/cta relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-button-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] sm:w-auto"
                >
                  <span className="relative z-10">Start a Project</span>
                  <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
              </StaggerItem>

              <StaggerItem variant="up" className="w-full sm:w-auto">
                <Link
                  to="/projects"
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#1E293B] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:bg-[#F8FAFC] sm:w-auto"
                >
                  <span>View Our Work</span>
                  <ArrowRight size={15} className="text-[#64748B] transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </StaggerItem>

              <StaggerItem variant="up" className="w-full sm:w-auto">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#22C55E]/60 bg-white px-5 py-3.5 text-sm font-semibold text-[#16A34A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-50/60 sm:w-auto"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp Us</span>
                </a>
              </StaggerItem>
            </Stagger>

            <Reveal delay={0.2} variant="fade">
              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:items-center lg:justify-start">
                <div className="flex -space-x-2.5">
                  {['RM', 'AC', 'SM', 'KP'].map((initials, idx) => (
                    <motion.span
                      key={initials}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.09, duration: 0.4 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-[10px] font-bold text-white shadow-sm"
                    >
                      {initials}
                    </motion.span>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 text-xs font-bold text-[#172033]">5.0</span>
                  </div>
                  <div className="text-xs text-[#64748B]">Rated by founders across 4 countries</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: animated product showcase */}
          <div className="flex items-center justify-center pt-10 lg:col-span-7 lg:pt-0">
            <ProductShowcase />
          </div>
        </div>

        {/* Stats strip */}
        <Stagger
          className="mt-20 grid grid-cols-2 gap-5 border-t border-slate-200/80 pt-8 md:grid-cols-4 sm:gap-8"
          stagger={0.1}
        >
          {HERO_STATS.map(({ value, decimals = 0, suffix, label, Icon }) => (
            <StaggerItem key={label} variant="up">
              <div className="group flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#BFDBFE]/60 bg-[#EFF6FF] text-[#2563EB] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:shadow-button-glow">
                  <Icon size={22} />
                </div>
                <div>
                  <div className="text-xl font-extrabold tracking-tight text-[#0F172A] sm:text-2xl">
                    <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
                  </div>
                  <div className="text-xs font-medium text-[#64748B]">{label}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Stack marquee */}
        <Reveal variant="fade" className="mt-14 border-t border-slate-200/70 pt-6">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
            <div className="flex shrink-0 items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B]">
              <Sparkles size={13} className="text-[#2563EB]" />
              Trusted production stack
            </div>
            <Marquee speed={34} className="flex-1">
              {[
                'React 19',
                'Django REST',
                'PostgreSQL 18',
                'FastAPI',
                'AWS',
                'Docker',
                'React Native',
                'Tailwind CSS',
                'Redis',
                'CI/CD Pipelines',
              ].map((tech) => (
                <span
                  key={tech}
                  className="mx-4 whitespace-nowrap text-sm font-semibold text-[#94A3B8] transition-colors hover:text-[#2563EB]"
                >
                  {tech}
                </span>
              ))}
            </Marquee>
          </div>
        </Reveal>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12 hidden justify-center lg:flex"
        >
          <div className="flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#94A3B8]">
            <Mouse size={16} />
            <span className="relative flex h-6 w-[1px] bg-slate-300">
              <span className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#2563EB] animate-scroll-dot" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
