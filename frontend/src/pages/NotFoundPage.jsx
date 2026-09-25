import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home, FolderKanban, MessageSquare, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import AuroraBackground from '../components/motion/AuroraBackground';
import { Stagger, StaggerItem } from '../components/motion/Reveal';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

const SUGGESTIONS = [
  { label: 'Services', path: '/services', Icon: FolderKanban },
  { label: 'Case Studies', path: '/projects', Icon: Compass },
  { label: 'Contact', path: '/contact', Icon: MessageSquare },
];

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Page Not Found | Core Apex.dev"
        description="The requested page could not be found. Return to Core Apex.dev home or explore our engineering services and case studies."
      />

      <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#F8FAFC] pb-24 pt-32">
        <AuroraBackground />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]"
          >
            <Compass size={14} /> Error 404
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-mono text-6xl font-black tracking-tight text-[#2563EB] sm:text-8xl animate-float-soft"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-4 text-2xl font-extrabold text-[#172033] sm:text-3xl"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#64748B] sm:text-base"
          >
            The resource you requested does not exist or has been moved to a new system path.
          </motion.p>

          <Stagger className="mt-8 flex flex-wrap items-center justify-center gap-3" stagger={0.09} delayChildren={0.35}>
            <StaggerItem variant="zoom" className="w-full sm:w-auto">
              <Link
                to="/"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-button-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] sm:w-auto"
              >
                <Home size={14} />
                <span>Back to Home</span>
              </Link>
            </StaggerItem>

            {SUGGESTIONS.map(({ label, path, Icon }) => (
              <StaggerItem key={label} variant="zoom" className="w-full sm:w-auto">
                <Link
                  to={path}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#172033] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:text-[#2563EB] sm:w-auto"
                >
                  <Icon size={14} />
                  <span>{label}</span>
                  <ArrowRight size={13} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </StaggerItem>
            ))}

            <StaggerItem variant="zoom" className="w-full sm:w-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 transition-colors hover:bg-emerald-100 sm:w-auto"
              >
                <MessageSquare size={14} />
                <span>WhatsApp Us</span>
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </>
  );
}
