import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Globe,
  Smartphone,
  Code,
  Cloud,
  Server,
  Palette,
  Briefcase,
  ShoppingCart,
  GraduationCap,
  Users,
  Cpu,
  Layers
} from 'lucide-react';
import ApexLogoMark from './ApexLogoMark';
import { WhatsAppIcon } from './SocialIcons';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  const serviceItems = [
    { title: "Web Development", desc: "React, modern portals & full-stack SPAs", path: "/services/web-development", icon: Globe },
    { title: "Mobile App Development", desc: "Native iOS & Android cross-platform apps", path: "/services/mobile-app-development", icon: Smartphone },
    { title: "Custom Software", desc: "Enterprise software & automated workflows", path: "/services/custom-software", icon: Code },
    { title: "Cloud Solutions", desc: "AWS infrastructure, Docker & CI/CD", path: "/services/cloud-solutions", icon: Cloud },
    { title: "API Development", desc: "Django REST, FastAPI & microservices", path: "/services/api-development", icon: Server },
    { title: "UI/UX Design", desc: "Design systems & conversion interfaces", path: "/services/ui-ux-design", icon: Palette },
  ];

  const solutionItems = [
    { title: "Business Websites", desc: "High-impact conversion websites", path: "/solutions#business-websites", icon: Briefcase },
    { title: "Ecommerce Platforms", desc: "Scalable multi-channel retail", path: "/solutions#ecommerce-platforms", icon: ShoppingCart },
    { title: "School Management", desc: "Comprehensive cloud campus ERP", path: "/solutions#school-management", icon: GraduationCap },
    { title: "CRM Systems", desc: "Deals, leads & pipeline tracking", path: "/solutions#crm-systems", icon: Users },
    { title: "ERP Solutions", desc: "Operations, inventory & billing", path: "/solutions#erp-solutions", icon: Cpu },
    { title: "Custom Software", desc: "Proprietary software architectures", path: "/solutions#custom-software", icon: Layers },
  ];

  const isHomeActive = location.pathname === '/';
  const isAboutActive = location.pathname === '/about';
  const isServicesActive = location.pathname.startsWith('/services');
  const isSolutionsActive = location.pathname.startsWith('/solutions');
  const isProjectsActive = location.pathname.startsWith('/projects');
  const isProcessActive = location.pathname === '/process';
  const isTechActive = location.pathname === '/technologies';
  const isFaqActive = location.pathname === '/faq';
  const isContactActive = location.pathname === '/contact';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] border-b border-[#E2E8F0] shadow-[0_1px_2px_rgba(15,23,42,0.03)] h-[56px] md:h-[60px] lg:h-[64px] flex items-center">
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-6 lg:px-7 xl:px-8 h-full flex items-center justify-between">
        
        {/* ==================================================
            1. BRAND SECTION (LEFT) — Extra Compact (28px logo, 17px text)
           ================================================== */}
        <Link to="/" className="flex items-center gap-2 shrink-0 select-none group">
          <ApexLogoMark size={28} />
          <div className="flex flex-col justify-center">
            <span className="font-bold text-[17px] tracking-tight text-[#172033] leading-none">
              Core Apex<span className="text-[#2563EB]">.dev</span>
            </span>
            <span className="text-[7px] font-mono font-semibold tracking-[0.08em] text-[#64748B] uppercase leading-none mt-[2.5px]">
              BUILDING DIGITAL SOLUTIONS
            </span>
          </div>
        </Link>

        {/* ==================================================
            2. NAVIGATION SECTION (CENTER) — 13px, Gap 14px-16px
           ================================================== */}
        <nav className="hidden xl:flex flex-1 justify-center items-center">
          <div className="flex items-center gap-[14px] 2xl:gap-[16px]">
            
            {/* Home */}
            <Link
              to="/"
              className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center ${
                isHomeActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                  : 'text-[#172033] hover:text-[#2563EB] font-medium'
              }`}
            >
              Home
            </Link>

            {/* About */}
            <Link
              to="/about"
              className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center ${
                isAboutActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                  : 'text-[#172033] hover:text-[#2563EB] font-medium'
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center gap-[3px] ${
                  isServicesActive
                    ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                    : 'text-[#172033] hover:text-[#2563EB] font-medium'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  size={10}
                  className={`transition-transform duration-200 shrink-0 ${
                    servicesOpen ? 'rotate-180 text-[#2563EB]' : 'text-[#64748B]'
                  }`}
                />
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 3 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-68 p-1.5 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 mt-1"
                  >
                    <div className="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1 font-semibold border-b border-slate-100 mb-1">
                      Engineering Services
                    </div>
                    <div className="space-y-0.5">
                      {serviceItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.path}
                            className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="p-1 rounded-md bg-[#EFF6FF] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                              <Icon size={13} />
                            </div>
                            <div>
                              <div className="text-[11.5px] font-semibold text-[#172033] group-hover:text-[#2563EB] transition-colors">
                                {item.title}
                              </div>
                              <div className="text-[9.5px] text-slate-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-1 pt-1 border-t border-slate-100">
                      <Link
                        to="/services"
                        className="text-[10.5px] font-semibold text-[#2563EB] flex items-center justify-between px-2 py-1 rounded-md hover:bg-[#EFF6FF] transition-colors"
                      >
                        <span>View All Services</span>
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <Link
                to="/solutions"
                className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center gap-[3px] ${
                  isSolutionsActive
                    ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                    : 'text-[#172033] hover:text-[#2563EB] font-medium'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  size={10}
                  className={`transition-transform duration-200 shrink-0 ${
                    solutionsOpen ? 'rotate-180 text-[#2563EB]' : 'text-[#64748B]'
                  }`}
                />
              </Link>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 3 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-68 p-1.5 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 mt-1"
                  >
                    <div className="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1 font-semibold border-b border-slate-100 mb-1">
                      Business Solutions
                    </div>
                    <div className="space-y-0.5">
                      {solutionItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.path}
                            className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="p-1 rounded-md bg-[#EFF6FF] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                              <Icon size={13} />
                            </div>
                            <div>
                              <div className="text-[11.5px] font-semibold text-[#172033] group-hover:text-[#2563EB] transition-colors">
                                {item.title}
                              </div>
                              <div className="text-[9.5px] text-slate-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-1 pt-1 border-t border-slate-100">
                      <Link
                        to="/solutions"
                        className="text-[10.5px] font-semibold text-[#2563EB] flex items-center justify-between px-2 py-1 rounded-md hover:bg-[#EFF6FF] transition-colors"
                      >
                        <span>Explore Solutions</span>
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Projects */}
            <Link
              to="/projects"
              className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center ${
                isProjectsActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                  : 'text-[#172033] hover:text-[#2563EB] font-medium'
              }`}
            >
              Projects
            </Link>

            {/* Process */}
            <Link
              to="/process"
              className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center ${
                isProcessActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                  : 'text-[#172033] hover:text-[#2563EB] font-medium'
              }`}
            >
              Process
            </Link>

            {/* Tech */}
            <Link
              to="/technologies"
              className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center ${
                isTechActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                  : 'text-[#172033] hover:text-[#2563EB] font-medium'
              }`}
            >
              Tech
            </Link>

            {/* FAQ */}
            <Link
              to="/faq"
              className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center ${
                isFaqActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                  : 'text-[#172033] hover:text-[#2563EB] font-medium'
              }`}
            >
              FAQ
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`text-[13px] transition-colors px-2 py-1 rounded-[6px] leading-none inline-flex items-center ${
                isContactActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                  : 'text-[#172033] hover:text-[#2563EB] font-medium'
              }`}
            >
              Contact
            </Link>

          </div>
        </nav>

        {/* ==================================================
            3. ACTIONS SECTION (RIGHT) — 34px Height Extra Compact
           ================================================== */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          
          {/* WhatsApp Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            title="Chat with us on WhatsApp"
            className="h-[34px] px-[11px] rounded-[7px] bg-[#FFFFFF] hover:bg-emerald-50/50 border border-[#10B981] text-[#10B981] text-[12px] font-semibold transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <WhatsAppIcon size={13} />
            <span>WhatsApp</span>
          </a>

          {/* Start a Project Primary Button */}
          <Link
            to="/contact"
            className="h-[34px] px-[13px] rounded-[7px] bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-[#FFFFFF] text-[11px] font-bold tracking-[0.02em] uppercase transition-all duration-200 inline-flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>START A PROJECT</span>
            <ArrowRight size={12} />
          </Link>

        </div>

        {/* ==================================================
            MOBILE & TABLET: COMPACT ACTIONS & HAMBURGER
           ================================================== */}
        <div className="flex xl:hidden items-center gap-2">
          <Link
            to="/contact"
            className="h-[32px] px-2.5 rounded-[6px] bg-[#2563EB] text-white text-[10.5px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1"
          >
            <span>START</span>
            <ArrowRight size={11} />
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[32px] h-[32px] rounded-[6px] bg-slate-50 border border-[#E2E8F0] text-[#172033] hover:text-[#2563EB] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

      </div>

      {/* ==================================================
          MOBILE SLIDE-DOWN DRAWER
         ================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E2E8F0] px-4 pt-2.5 pb-4 max-h-[calc(100vh-64px)] overflow-y-auto shadow-xl z-50"
          >
            <div className="flex flex-col space-y-0.5">
              
              <Link
                to="/"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isHomeActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                Home
              </Link>
              
              <Link
                to="/about"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isAboutActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                About
              </Link>
              
              <Link
                to="/services"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isServicesActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                Services
              </Link>
              
              <Link
                to="/solutions"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isSolutionsActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                Solutions
              </Link>
              
              <Link
                to="/projects"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isProjectsActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                Projects
              </Link>
              
              <Link
                to="/process"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isProcessActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                Process
              </Link>
              
              <Link
                to="/technologies"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isTechActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                Tech
              </Link>
              
              <Link
                to="/faq"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isFaqActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                FAQ
              </Link>
              
              <Link
                to="/contact"
                className={`px-2.5 py-1.5 text-[13px] rounded-md ${
                  isContactActive ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold' : 'text-[#172033] font-medium hover:bg-slate-50'
                }`}
              >
                Contact
              </Link>

              {/* Mobile CTAs */}
              <div className="pt-2.5 space-y-1.5 border-t border-[#E2E8F0]">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-[34px] rounded-[7px] bg-white border border-[#10B981] text-[#10B981] text-[12px] font-semibold flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp</span>
                </a>
                <Link
                  to="/contact"
                  className="w-full h-[34px] rounded-[7px] bg-[#2563EB] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
