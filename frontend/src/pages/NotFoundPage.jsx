import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowRight, FolderKanban, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Page Not Found | Core Apex.dev"
        description="The requested page could not be found. Return to Core Apex.dev home or explore our engineering services and case studies."
      />

      <div className="pt-32 pb-24 min-h-[80vh] bg-[#F8FAFC] flex items-center justify-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
            <Compass size={14} /> Error 404
          </div>

          <h1 className="text-6xl sm:text-8xl font-black font-mono text-[#2563EB] tracking-tight">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
            Page Not Found
          </h2>

          <p className="text-[#64748B] text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            The resource you requested does not exist or has been moved to a new system path.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs uppercase tracking-wider font-mono shadow-button-glow transition-all"
            >
              <Home size={14} />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#172033] text-xs uppercase tracking-wider font-mono font-semibold transition-all"
            >
              <FolderKanban size={14} />
              <span>Explore Services</span>
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs uppercase tracking-wider font-mono font-semibold transition-colors"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
