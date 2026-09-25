import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
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

const EASE = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
  { label: 'Home', path: '/', match: (p) => p === '/' },
  { label: 'About', path: '/about', match: (p) => p === '/about' },
  {
    label: 'Services',
    path: '/services',
    match: (p) => p.startsWith('/services'),
    dropdown: 'services',
  },
  {
    label: 'Solutions',
    path: '/solutions',
    match: (p) => p.startsWith('/solutions'),
    dropdown: 'solutions',
  },
  { label: 'Projects', path: '/projects', match: (p) => p.startsWith('/projects') },
  { label: 'Process', path: '/process', match: (p) => p === '/process' },
  { label: 'Tech', path: '/technologies', match: (p) => p === '/technologies' },
  { label: 'FAQ', path: '/faq', match: (p) => p === '/faq' },
  { label: 'Contact', path: '/contact', match: (p) => p === '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Lock background scroll while the mobile drawer is open (external system sync).
  useEffect(() => {
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = isOpen ? 'hidden' : previous;
    return () => {
      body.style.overflow = previous;
    };
  }, [isOpen]);

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

  const dropdownItems = { services: serviceItems, solutions: solutionItems };

  return (
    <motion.header
      initial={false}
      animate={{
        height: scrolled ? 56 : 64,
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
        boxShadow: scrolled
          ? '0 10px 30px -18px rgba(15,23,42,0.28)'
          : '0 1px 2px rgba(15,23,42,0.03)',
      }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center border-b border-[#E2E8F0] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 sm:px-6 lg:px-7 xl:px-8">
        {/* Brand */}
        <Link to="/" className="group flex shrink-0 select-none items-center gap-2">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="inline-flex"
          >
            <ApexLogoMark size={28} />
          </motion.span>
          <div className="flex flex-col justify-center">
            <span className="text-[17px] font-bold leading-none tracking-tight text-[#172033]">
              Core Apex<span className="text-[#2563EB]">.dev</span>
            </span>
            <span className="mt-[2.5px] font-mono text-[7px] font-semibold uppercase leading-none tracking-[0.08em] text-[#64748B]">
              BUILDING DIGITAL SOLUTIONS
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden flex-1 items-center justify-center xl:flex">
          <div className="flex items-center gap-[10px] 2xl:gap-[14px]">
            {NAV_LINKS.map((link) => {
              const active = link.match(location.pathname);
              const Icon = link.dropdown === 'solutions' ? Layers : Cpu;
              return (
                <div
                  key={link.label}
                  className="relative flex items-center"
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.dropdown)}
                  onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`relative inline-flex items-center gap-[3px] rounded-[8px] px-2.5 py-1.5 text-[13px] leading-none transition-colors ${
                      active
                        ? 'font-semibold text-[#2563EB]'
                        : 'font-medium text-[#172033] hover:text-[#2563EB]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-[8px] bg-[#EFF6FF]"
                      />
                    )}
                    <span>{link.label}</span>
                    {link.dropdown && (
                      <motion.span
                        animate={{ rotate: openDropdown === link.dropdown ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0"
                      >
                        <ChevronDown
                          size={10}
                          className={openDropdown === link.dropdown ? 'text-[#2563EB]' : 'text-[#64748B]'}
                        />
                      </motion.span>
                    )}
                  </Link>

                  <AnimatePresence>
                    {link.dropdown && openDropdown === link.dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className="absolute left-0 top-full z-50 mt-2 w-[276px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white/98 p-2 shadow-dropdown backdrop-blur-xl"
                      >
                        <div className="mb-1 border-b border-slate-100 px-2 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-400">
                          {link.dropdown === 'services' ? 'Engineering Services' : 'Business Solutions'}
                        </div>
                        <motion.div
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.04 } },
                          }}
                          className="space-y-0.5"
                        >
                          {dropdownItems[link.dropdown].map((item, idx) => {
                            const ItemIcon = item.icon;
                            return (
                              <motion.div
                                key={idx}
                                variants={{
                                  hidden: { opacity: 0, x: -8 },
                                  show: { opacity: 1, x: 0 },
                                }}
                              >
                                <Link
                                  to={item.path}
                                  className="group flex items-start gap-2 rounded-lg p-1.5 transition-colors hover:bg-slate-50"
                                >
                                  <div className="rounded-md bg-[#EFF6FF] p-1 text-[#2563EB] transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white">
                                    <ItemIcon size={13} />
                                  </div>
                                  <div>
                                    <div className="text-[11.5px] font-semibold text-[#172033] transition-colors group-hover:text-[#2563EB]">
                                      {item.title}
                                    </div>
                                    <div className="text-[9.5px] leading-tight text-slate-500">
                                      {item.desc}
                                    </div>
                                  </div>
                                  <ArrowRight
                                    size={11}
                                    className="ml-auto mt-1 -translate-x-1 text-[#2563EB] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                  />
                                </Link>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                        <div className="mt-1 border-t border-slate-100 pt-1">
                          <Link
                            to={link.path}
                            className="flex items-center justify-between rounded-md px-2 py-1.5 text-[10.5px] font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]"
                          >
                            <span className="inline-flex items-center gap-1.5">
                              <Icon size={11} />
                              {link.dropdown === 'services' ? 'View All Services' : 'Explore Solutions'}
                            </span>
                            <ArrowRight size={11} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            title="Chat with us on WhatsApp"
            className="inline-flex h-[34px] items-center justify-center gap-1.5 rounded-[8px] border border-[#10B981] bg-white px-[11px] text-[12px] font-semibold text-[#10B981] transition-colors hover:bg-emerald-50/60"
          >
            <WhatsAppIcon size={13} />
            <span>WhatsApp</span>
          </motion.a>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="group/cta relative inline-flex h-[34px] items-center justify-center gap-1.5 overflow-hidden rounded-[8px] bg-[#2563EB] px-[13px] text-[11px] font-bold uppercase tracking-[0.02em] text-white shadow-sm transition-colors hover:bg-[#1D4ED8]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
              <span className="relative">START A PROJECT</span>
              <ArrowRight
                size={12}
                className="relative transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            to="/contact"
            className="inline-flex h-[32px] items-center justify-center gap-1 rounded-[8px] bg-[#2563EB] px-2.5 text-[10.5px] font-bold uppercase tracking-wider text-white"
          >
            <span>START</span>
            <ArrowRight size={11} />
          </Link>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-slate-50 text-[#172033] transition-colors hover:text-[#2563EB]"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="absolute inline-flex"
              >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-64px)] overflow-y-auto border-b border-[#E2E8F0] bg-white/98 px-4 pb-4 pt-2.5 shadow-xl backdrop-blur-xl xl:hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="flex flex-col space-y-0.5"
            >
              {NAV_LINKS.map((link) => {
                const active = link.match(location.pathname);
                return (
                  <motion.div
                    key={link.label}
                    variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      to={link.path}
                      className={`block rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                        active
                          ? 'bg-[#EFF6FF] font-semibold text-[#2563EB]'
                          : 'font-medium text-[#172033] hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="space-y-1.5 border-t border-[#E2E8F0] pt-3"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[34px] w-full items-center justify-center gap-1.5 rounded-[8px] border border-[#10B981] bg-white text-[12px] font-semibold text-[#10B981]"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp</span>
                </a>
                <Link
                  to="/contact"
                  className="flex h-[34px] w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#2563EB] text-[11px] font-bold uppercase tracking-wider text-white shadow-sm"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
