import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';
import { projectImage, projectImageSrc } from '../data/images';

const EASE = [0.16, 1, 0.3, 1];

const DETAIL_BLOCKS = [
  {
    key: 'challenge',
    title: 'The Engineering Challenge',
    wrapper: 'bg-amber-50/70 border-l-4 border-amber-500',
    heading: 'text-amber-800',
  },
  {
    key: 'solution',
    title: 'The Architecture Solution',
    wrapper: 'bg-[#EFF6FF] border-l-4 border-[#2563EB]',
    heading: 'text-[#1D4ED8]',
  },
  {
    key: 'results_summary',
    title: 'Measurable Results & Impact',
    wrapper: 'bg-emerald-50/70 border-l-4 border-emerald-500',
    heading: 'text-emerald-800',
  },
];

export default function ProjectModal({ project, onClose }) {
  // Close on Escape + lock background scroll while open
  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
        />

        {/* Dialog */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study preview`}
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-dropdown sm:p-8"
        >
          {/* Close */}
          <motion.button
            whileHover={{ rotate: 90, scale: 1.05 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute right-5 top-5 z-10 rounded-lg bg-[#F8FAFC] p-2 text-[#64748B] transition-colors hover:bg-[#EFF6FF] hover:text-[#172033]"
            aria-label="Close modal"
          >
            <X size={18} />
          </motion.button>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="mb-3 flex flex-wrap items-center gap-2 pr-12"
          >
            <span className="rounded-md border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              {project.industry}
            </span>
            {project.client && (
              <span className="rounded-md bg-[#F8FAFC] px-2.5 py-1 font-mono text-xs text-[#64748B]">
                Client: {project.client}
              </span>
            )}
          </motion.div>

          <h2 className="mb-1 text-xl font-bold leading-tight text-[#172033] sm:text-2xl">
            {project.title}
          </h2>
          <p className="mb-5 text-xs font-medium text-[#2563EB] sm:text-sm">
            {project.tagline || project.short_description}
          </p>

          {/* Featured image */}
          <div className="group relative mb-6 h-52 overflow-hidden rounded-xl border border-[#E2E8F0] bg-slate-100 sm:h-64">
            <SmartImage
              src={projectImageSrc(project, 0)}
              fallback={project.featured_image || projectImage(0)}
              alt={`${project.title} case study`}
              wrapperClassName="h-full w-full"
              className="transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.05]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 to-transparent" />
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.metrics.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.45, ease: EASE }}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-center"
                >
                  <div className="flex items-center justify-center gap-1 text-lg font-bold text-[#2563EB]">
                    <TrendingUp size={15} />
                    {m.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-[#64748B]">{m.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Case study detail blocks */}
          <div className="mb-6 space-y-4 text-xs sm:text-sm">
            {DETAIL_BLOCKS.map((block, idx) =>
              project[block.key] ? (
                <motion.div
                  key={block.key}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + idx * 0.1, duration: 0.45, ease: EASE }}
                  className={`rounded-xl p-4 text-[#1E293B] ${block.wrapper}`}
                >
                  <h4 className={`mb-1 font-mono text-xs font-bold uppercase tracking-wider ${block.heading}`}>
                    {block.title}
                  </h4>
                  <p className="leading-relaxed">{project[block.key]}</p>
                </motion.div>
              ) : null
            )}
          </div>

          {/* Tech chips */}
          <div className="mb-6">
            <h4 className="mb-2.5 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              <Cpu size={14} /> Technologies Applied
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies && project.technologies.map((tech, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + idx * 0.05, duration: 0.35 }}
                  className="rounded-md border border-[#E2E8F0] bg-[#F1F5F9] px-2.5 py-1 text-xs font-medium text-[#475569]"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#F1F5F9] pt-4 sm:flex-row">
            {project.website_url ? (
              <a
                href={project.website_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#2563EB] hover:underline"
              >
                <span>Live Project Demo</span>
                <ExternalLink size={12} />
              </a>
            ) : (
              <div />
            )}

            <div className="flex w-full items-center gap-2.5 sm:w-auto">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-[#F8FAFC] px-4 py-2 text-xs font-semibold text-[#64748B] transition-colors hover:text-[#172033] sm:w-auto"
              >
                Close
              </button>
              <Link
                to="/contact"
                onClick={onClose}
                className="group inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] sm:w-auto"
              >
                <span>Start Similar Project</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
