import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import ApexLogoMark from './ApexLogoMark';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';
import { Reveal, Stagger, StaggerItem } from './motion/Reveal';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#172033] pb-10 pt-16 text-[#CBD5E1]">
      {/* Ambient animated glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#2563EB]/25 blur-3xl animate-aurora" />
        <span className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#38BDF8]/20 blur-3xl animate-aurora-slow" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.4) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Stagger className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5" stagger={0.09}>
          
          {/* Col 1: Brand Info */}
          <StaggerItem variant="up" className="lg:col-span-2 space-y-4">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <motion.span
                whileHover={{ rotate: -8, scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="inline-flex"
              >
                <ApexLogoMark size={36} />
              </motion.span>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Core Apex<span className="text-[#38BDF8]">.dev</span>
                </span>
                <span className="text-[9px] tracking-widest text-slate-400 uppercase font-mono font-medium">
                  BUILDING DIGITAL SOLUTIONS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed max-w-sm">
              We turn ideas into digital reality. Building modern websites, mobile applications, cloud infrastructures, and custom software systems designed for measurable business growth.
            </p>

            <div className="p-3.5 rounded-xl bg-[#1E293B] border border-[#334155] space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#38BDF8] font-semibold flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Engineering Leadership
              </div>
              <p className="text-xs text-white">
                <span className="font-semibold">Raja Mohamed</span> — Founder & CEO, Core Apex.dev
              </p>
              <p className="text-[11px] text-slate-400">
                1/137, L. Karungulam, Ramanathapuram, Tamil Nadu – 623527
              </p>
            </div>

            {/* Social / WhatsApp Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Core Apex.dev WhatsApp"
                title="Chat on WhatsApp"
                className="rounded-xl border border-emerald-500/40 bg-emerald-500/20 p-2 text-emerald-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:text-white"
              >
                <WhatsAppIcon size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-xl bg-[#1E293B] border border-[#334155] text-slate-300 hover:text-white hover:border-[#2563EB] transition-colors"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-xl bg-[#1E293B] border border-[#334155] text-slate-300 hover:text-white hover:border-[#2563EB] transition-colors"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </StaggerItem>

          {/* Col 2: Services */}
          <StaggerItem variant="up" className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#CBD5E1]">
              <li><Link to="/services/web-development" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services/mobile-app-development" className="hover:text-white transition-colors">Mobile App Development</Link></li>
              <li><Link to="/services/custom-software" className="hover:text-white transition-colors">Custom Software</Link></li>
              <li><Link to="/services/cloud-solutions" className="hover:text-white transition-colors">Cloud Solutions & AWS</Link></li>
              <li><Link to="/services/api-development" className="hover:text-white transition-colors">API Development</Link></li>
              <li><Link to="/services/ui-ux-design" className="hover:text-white transition-colors">UI/UX Design Systems</Link></li>
            </ul>
          </StaggerItem>

          {/* Col 3: Company & Process */}
          <StaggerItem variant="up" className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#CBD5E1]">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Portfolio & Case Studies</Link></li>
              <li><Link to="/process" className="hover:text-white transition-colors">7-Step Process</Link></li>
              <li><Link to="/technologies" className="hover:text-white transition-colors">Technology Stack</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact & Quote</Link></li>
            </ul>
          </StaggerItem>

          {/* Col 4: Direct Contact & Newsletter */}
          <StaggerItem variant="up" className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            
            <div className="space-y-2 text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#38BDF8] flex-shrink-0" />
                <a href="mailto:coreapex.dev@gmail.com" className="hover:text-white transition-colors">coreapex.dev@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#38BDF8] flex-shrink-0" />
                <a href="tel:+917639930013" className="hover:text-white transition-colors">+91 7639930013</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#38BDF8] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">Ramanathapuram, Tamil Nadu, India</span>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="pt-2">
              <p className="text-[11px] text-slate-400 mb-1.5">Subscribe for engineering updates:</p>
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#1E293B] border border-[#334155] text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="p-1.5 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors flex-shrink-0"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 flex items-center gap-1 text-[10px] font-medium text-emerald-400"
                >
                  <CheckCircle2 size={11} /> Subscribed successfully!
                </motion.p>
              )}
            </form>
          </StaggerItem>

        </Stagger>

        {/* Bottom Divider & Copyright */}
        <Reveal variant="fade" className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[#334155] pt-6 font-mono text-xs text-slate-400 sm:flex-row">
          <div>
            © {new Date().getFullYear()} Core Apex.dev. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Stack: <span className="text-[#38BDF8]">React + Django + PostgreSQL 18</span>
            </span>
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </Reveal>

      </div>
    </footer>
  );
}
