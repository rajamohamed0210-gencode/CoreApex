import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  Compass,
  ArrowRight,
  Shield,
  Check,
  Globe,
  Award,
  Users,
  Menu as MenuIcon
} from 'lucide-react';
import ApexLogoMark from '../components/ApexLogoMark';
import { WhatsAppIcon, LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import { ReactLogo, PythonLogo, DjangoLogo, PostgreSQLLogo } from '../components/TechBrandIcons';
import SEO from '../components/SEO';
import { apiService } from '../services/api';
import AuroraBackground from '../components/motion/AuroraBackground';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import AnimatedCounter from '../components/motion/AnimatedCounter';
import { Parallax } from '../components/motion/Parallax';
import SmartImage from '../components/SmartImage';
import { IMAGES } from '../data/images';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';
const DEFAULT_FOUNDER_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';

export default function AboutPage() {
  const [founderAvatar, setFounderAvatar] = useState(DEFAULT_FOUNDER_AVATAR);

  useEffect(() => {
    let isMounted = true;

    apiService.getTeam().then((teamMembers) => {
      const founder = teamMembers.find((member) => (
        member.name === 'Raja Mohamed' && member.role === 'Founder & CEO'
      ));

      if (isMounted && founder) {
        setFounderAvatar(founder.avatar || founder.avatar_url || DEFAULT_FOUNDER_AVATAR);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="About Us — Core Apex.dev | Technology That Moves Businesses Forward"
        description="Learn about Core Apex.dev, our mission, vision, engineering philosophy, and leadership under Founder & CEO Raja Mohamed."
      />

      <div className="relative min-h-screen overflow-hidden bg-[#F8FAFC] pt-28 pb-20">
        <AuroraBackground />

        {/* Top Right "ENGINEERING EXCELLENCE" Technical Marker */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="hidden lg:flex items-center justify-end gap-3 text-xs font-mono font-semibold tracking-widest text-[#2563EB] uppercase mb-3">
            <span>ENGINEERING EXCELLENCE</span>
            <div className="w-16 h-[2px] bg-[#2563EB]"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* =========================================
              HERO SECTION (Matching Template Design)
             ========================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center mb-16">
            
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6">
              
              {/* Eyebrow Pill/Tag */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                <span className="text-xs sm:text-sm font-bold tracking-wider text-[#2563EB] uppercase font-mono">
                  WHO WE ARE &bull; OUR MISSION &bull; ENGINEERING EXCELLENCE
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-[#0F172A] leading-[1.14]"
              >
                Technology That Moves{' '}
                <span className="text-[#2563EB] block">
                  Businesses Forward.
                </span>
              </motion.h1>

              {/* Description Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                <span className="font-semibold text-[#1E293B]">Core Apex.dev</span> is a full-cycle software engineering and digital transformation company. We bridge business vision with high-performance digital reality through robust architectures, clean code, and transparent delivery.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
              >
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-semibold shadow-button-glow transition-all duration-200"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#1E293B] border border-slate-200 hover:border-slate-300 text-sm font-semibold transition-all duration-200 shadow-sm"
                >
                  <span>View Our Work</span>
                  <ArrowRight size={15} className="text-[#64748B]" />
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50/50 border border-[#22C55E]/60 text-[#16A34A] text-sm font-semibold transition-all duration-200 shadow-sm"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp Us</span>
                </a>
              </motion.div>

            </div>

            {/* Right Column: Realistic System Monitor Workstation & Floating Badges */}
            <div className="lg:col-span-7 relative flex items-center justify-center pt-8 pb-4">
              
              <div className="relative w-full max-w-2xl">
                
                {/* Floating Card 1: Core Pillars (Top Center) */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute -top-6 left-1/4 sm:left-1/3 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-4 sm:gap-6 animate-float-delayed"
                >
                  <div className="flex flex-col items-center gap-1">
                    <ReactLogo size={24} />
                    <span className="text-[10px] font-semibold text-slate-700">React 19</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <PythonLogo size={24} />
                    <span className="text-[10px] font-semibold text-slate-700">Python 3.12</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <DjangoLogo size={24} />
                    <span className="text-[10px] font-semibold text-slate-700">Django REST</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <PostgreSQLLogo size={24} />
                    <span className="text-[10px] font-semibold text-slate-700">PostgreSQL</span>
                  </div>
                </motion.div>

                {/* Floating Card 2: Engineering Commitments (Middle Left) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="absolute top-28 -left-4 sm:-left-8 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 space-y-2.5 min-w-[185px] animate-float-soft"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <Check size={14} className="text-[#2563EB] stroke-[3]" />
                    <span>100% IP & Code Ownership</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <Check size={14} className="text-[#2563EB] stroke-[3]" />
                    <span>Zero Technical Debt</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <Check size={14} className="text-[#2563EB] stroke-[3]" />
                    <span>Agile 2-Week Sprints</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <Check size={14} className="text-[#2563EB] stroke-[3]" />
                    <span>Enterprise Security SLAs</span>
                  </div>
                </motion.div>

                {/* Workstation Laptop & Mobile */}
                <div className="relative pl-12 pr-6 pt-10 pb-6">
                  
                  {/* Laptop Mockup */}
                  <div className="relative z-10 w-full max-w-[480px] mx-auto sm:ml-auto sm:mr-16">
                    
                    {/* Screen Bezel */}
                    <div className="rounded-t-2xl bg-[#0B0F17] p-2.5 shadow-2xl border border-slate-700/80">
                      
                      {/* Top Bar */}
                      <div className="flex items-center justify-between px-2 py-1.5 bg-[#141A26] rounded-t-lg border-b border-slate-800/80">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            PROD CLOUD HEALTH
                          </span>
                          <span className="text-slate-300">AWS / ECS CLUSTER</span>
                        </div>
                        <div className="w-8"></div>
                      </div>

                      {/* Architecture Monitor Screen */}
                      <div className="bg-[#0B0F17] p-3 grid grid-cols-12 gap-3 text-[10px] font-mono leading-relaxed h-[210px] overflow-hidden rounded-b-lg select-none text-slate-300">
                        
                        {/* Services status list */}
                        <div className="col-span-5 border-r border-slate-800/80 pr-2 space-y-2">
                          <div className="text-[11px] font-bold text-slate-200">Active Services</div>
                          
                          <div className="p-1.5 rounded bg-slate-900/90 border border-slate-800">
                            <div className="text-[9px] text-[#38BDF8] font-bold">API Gateway</div>
                            <div className="text-[8px] text-emerald-400">Latency: 14ms (Healthy)</div>
                          </div>

                          <div className="p-1.5 rounded bg-slate-900/90 border border-slate-800">
                            <div className="text-[9px] text-[#818CF8] font-bold">Django REST API</div>
                            <div className="text-[8px] text-emerald-400">RPS: 3,420/s (Optimal)</div>
                          </div>

                          <div className="p-1.5 rounded bg-slate-900/90 border border-slate-800">
                            <div className="text-[9px] text-[#34D399] font-bold">Postgres 18 ACID</div>
                            <div className="text-[8px] text-emerald-400">Pool: 24/50 Conn</div>
                          </div>
                        </div>

                        {/* Right: Live Metrics & Code snippet */}
                        <div className="col-span-7 pl-1 space-y-2">
                          <div className="text-[11px] font-bold text-slate-200">Engineering SLA Monitor</div>
                          
                          <div className="grid grid-cols-2 gap-1.5 text-center">
                            <div className="p-1.5 rounded bg-[#141A26] border border-slate-800">
                              <div className="text-[12px] font-black text-[#60A5FA]">99.99%</div>
                              <div className="text-[8px] text-slate-400">Cloud Uptime</div>
                            </div>
                            <div className="p-1.5 rounded bg-[#141A26] border border-slate-800">
                              <div className="text-[12px] font-black text-emerald-400">0ms</div>
                              <div className="text-[8px] text-slate-400">Data Loss</div>
                            </div>
                          </div>

                          <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[9px] text-slate-400 space-y-0.5 font-mono">
                            <div className="text-slate-300 font-semibold">// Continuous Delivery Pipeline</div>
                            <div>✓ TypeScript Strict Validation: PASS</div>
                            <div>✓ PyTest 100% Coverage: PASS</div>
                            <div>✓ Zero Vulnerabilities: PASS</div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Laptop Bottom Aluminum Base */}
                    <div className="relative h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-b-xl shadow-lg flex items-center justify-center">
                      <div className="w-16 h-1 bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="h-3 w-5/6 mx-auto bg-slate-900/20 blur-md rounded-full"></div>

                  </div>

                  {/* Smartphone Mockup (Client Collaboration Portal) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute bottom-2 -right-2 sm:right-2 z-20 w-[160px] sm:w-[185px] bg-white rounded-[28px] p-2.5 shadow-2xl border-[4px] border-slate-900"
                  >
                    <div className="w-12 h-2.5 bg-slate-900 rounded-full mx-auto mb-2"></div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1">
                        <ApexLogoMark size={14} />
                        <span className="text-[9px] font-bold text-slate-900">Client Portal</span>
                      </div>
                      <MenuIcon size={12} className="text-slate-600" />
                    </div>

                    <div className="py-2.5 space-y-2 text-center">
                      <div className="text-[11px] font-extrabold text-slate-900 leading-tight">
                        Sprint 4 On Track
                      </div>
                      <div className="text-[8px] text-slate-500 leading-tight">
                        Milestone 2 API & UI components deployed to staging.
                      </div>
                      <div className="pt-0.5">
                        <div className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[8px] font-bold">
                          <span>Live Demo Ready</span>
                        </div>
                      </div>

                      {/* Sprint Timeline Graphic */}
                      <div className="mt-2 p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between px-2 text-[8px] font-mono">
                        <span className="text-emerald-700 font-bold">● Sprint 4</span>
                        <span className="text-slate-500">100% Quality</span>
                      </div>
                    </div>
                  </motion.div>

                </div>

              </div>

            </div>

          </div>

          {/* =========================================
              BOTTOM 4-COLUMN STATS BANNER
             ========================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-6 pb-16 border-t border-slate-200/80 mb-16"
          >
            <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8" stagger={0.1}>
              
              {/* Stat 1 */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Award size={22} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    <AnimatedCounter value={50} suffix="+" />
                  </div>
                  <div className="text-xs text-[#64748B] font-medium">Projects Delivered</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Globe size={22} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">Global</div>
                  <div className="text-xs text-[#64748B] font-medium">Enterprise Clients</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Shield size={22} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    <AnimatedCounter value={100} suffix="%" />
                  </div>
                  <div className="text-xs text-[#64748B] font-medium">In-House Engineering</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Users size={22} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">24/7</div>
                  <div className="text-xs text-[#64748B] font-medium">Dedicated Support</div>
                </div>
              </div>

            </Stagger>
          </motion.div>

          {/* =========================================
              MISSION & VISION SECTION
             ========================================= */}
          <Stagger className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2" stagger={0.15}>
            <StaggerItem variant="left" className="h-full">
            <div className="light-card h-full space-y-4 p-8 sm:p-10">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F172A]">Our Mission</h3>
              <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                To empower forward-looking businesses by transforming ambitious digital concepts into scalable, secure, and intuitive software products that create sustained competitive advantages.
              </p>
            </div>

            </StaggerItem>
            <StaggerItem variant="right" className="h-full">
            <div className="light-card h-full space-y-4 p-8 sm:p-10">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center">
                <Compass size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F172A]">Our Vision</h3>
              <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                To become the gold-standard engineering partner for enterprises and visionary entrepreneurs seeking world-class full-stack development, cloud resilience, and product excellence.
              </p>
            </div>
            </StaggerItem>
          </Stagger>

          {/* =========================================
              CULTURE / ENGINEERING TEAM BAND
             ========================================= */}
          <div className="grid grid-cols-1 items-center gap-10 mb-20 lg:grid-cols-12">
            <Reveal variant="left" className="lg:col-span-6">
              <Parallax speed={0.1}>
                <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-lift">
                  <SmartImage
                    src={IMAGES.aboutTeam}
                    alt="Core Apex.dev engineers pairing on a product sprint"
                    ratio="16 / 11"
                    wrapperClassName="w-full"
                    className="transition-transform duration-[1400ms] ease-smooth hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
                </div>
              </Parallax>
            </Reveal>

            <div className="lg:col-span-6 space-y-6">
              <Reveal variant="up">
                <span className="inline-flex items-center gap-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">
                  How We Work
                </span>
              </Reveal>
              <Reveal variant="up" delay={0.08}>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033]">
                  A senior team, <span className="text-gradient-brand">close to your business</span>
                </h2>
              </Reveal>
              <Reveal variant="up" delay={0.14}>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  You work directly with the engineers writing the code — no account-manager relay.
                  Short feedback loops, written updates every sprint, and architecture decisions explained in plain language.
                </p>
              </Reveal>

              <Stagger className="grid grid-cols-2 gap-4 pt-2" stagger={0.1}>
                {[
                  { value: 2, suffix: '-week', label: 'Sprint cadence' },
                  { value: 100, suffix: '%', label: 'In-house team' },
                  { value: 24, suffix: 'h', label: 'Response window' },
                  { value: 30, suffix: '-day', label: 'Launch warranty' },
                ].map((stat) => (
                  <StaggerItem key={stat.label} variant="zoom" className="h-full">
                    <div className="light-card h-full p-5">
                      <div className="text-xl font-extrabold tracking-tight text-[#0F172A] sm:text-2xl">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs font-medium text-[#64748B]">{stat.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal variant="up" delay={0.1}>
                <Link
                  to="/process"
                  className="group inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#172033] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:text-[#2563EB]"
                >
                  <span>See how a project runs</span>
                  <ArrowRight size={15} className="text-[#2563EB] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>

          {/* =========================================
              EXECUTIVE LEADERSHIP SECTION
             ========================================= */}
          <Reveal variant="up" className="mb-20">
          <div className="light-card overflow-hidden p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-4 flex justify-center">
                <motion.div
                  whileHover={{ rotate: -2, scale: 1.03 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-1 border border-[#BFDBFE] bg-white shadow-card-hover"
                >
                  <span className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-[#EFF6FF] animate-pulse" />
                  <img
                    src={founderAvatar}
                    alt="Raja Mohamed — Founder & CEO"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </motion.div>
              </div>

              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-bold text-[#1D4ED8] uppercase">
                  Executive Leadership
                </div>
                <h3 className="text-3xl font-extrabold text-[#0F172A]">
                  Raja Mohamed
                </h3>
                <div className="text-sm font-semibold text-[#2563EB] font-mono">
                  Founder & Chief Executive Officer — Core Apex.dev
                </div>
                <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                  With over a decade of technical leadership across enterprise cloud architecture, full-stack application development, and software design, Raja founded Core Apex.dev to bring institutional-grade software engineering directly to high-growth organizations worldwide.
                </p>

                <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
                  >
                    <LinkedinIcon size={16} />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
          </Reveal>

          {/* =========================================
              BOTTOM CTA BANNER
             ========================================= */}
          <Reveal variant="up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#172033] to-[#1E293B] p-8 text-center text-white shadow-2xl sm:p-12">
            <span className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#2563EB]/30 blur-3xl animate-aurora" />
            <h2 className="relative text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Build Your Next Digital Milestone?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Partner with Core Apex.dev for reliable engineering, modern tech stacks, and predictable project delivery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold shadow-button-glow transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all duration-200"
              >
                <WhatsAppIcon size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
          </Reveal>

        </div>

      </div>
    </>
  );
}
