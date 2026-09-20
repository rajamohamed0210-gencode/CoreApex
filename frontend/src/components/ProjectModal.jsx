import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-2xl shadow-dropdown z-10 p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-[#F8FAFC] text-[#64748B] hover:text-[#172033] hover:bg-[#EFF6FF] transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Industry / Category Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] uppercase tracking-wider">
              {project.industry}
            </span>
            {project.client && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono text-[#64748B] bg-[#F8FAFC]">
                Client: {project.client}
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#172033] mb-1 leading-tight">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#2563EB] font-medium mb-5">
            {project.tagline || project.short_description}
          </p>

          {/* Project Featured Image */}
          <div className="relative rounded-xl overflow-hidden mb-6 border border-[#E2E8F0] h-52 sm:h-64 bg-slate-100">
            <img
              src={project.featured_image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                  <div className="text-lg font-bold text-[#2563EB] flex items-center justify-center gap-1">
                    <TrendingUp size={15} />
                    {m.value}
                  </div>
                  <div className="text-[11px] text-[#64748B] font-mono mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Case Study Details */}
          <div className="space-y-4 mb-6 text-xs sm:text-sm">
            {project.challenge && (
              <div className="p-4 rounded-xl bg-amber-50/60 border-l-3 border-amber-500 text-[#1E293B]">
                <h4 className="text-xs font-mono uppercase font-bold text-amber-800 tracking-wider mb-1">
                  The Engineering Challenge
                </h4>
                <p className="leading-relaxed">{project.challenge}</p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 rounded-xl bg-[#EFF6FF] border-l-3 border-[#2563EB] text-[#1E293B]">
                <h4 className="text-xs font-mono uppercase font-bold text-[#1D4ED8] tracking-wider mb-1">
                  The Architecture Solution
                </h4>
                <p className="leading-relaxed">{project.solution}</p>
              </div>
            )}

            {project.results_summary && (
              <div className="p-4 rounded-xl bg-emerald-50/60 border-l-3 border-emerald-500 text-[#1E293B]">
                <h4 className="text-xs font-mono uppercase font-bold text-emerald-800 tracking-wider mb-1">
                  Measurable Results & Impact
                </h4>
                <p className="leading-relaxed">{project.results_summary}</p>
              </div>
            )}
          </div>

          {/* Tech Stack Chips */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold mb-2.5 flex items-center gap-1.5">
              <Cpu size={14} /> Technologies Applied
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies && project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#475569]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-3">
            {project.website_url ? (
              <a
                href={project.website_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2563EB] hover:underline"
              >
                <span>Live Project Demo</span>
                <ExternalLink size={12} />
              </a>
            ) : <div />}

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#F8FAFC] text-[#64748B] hover:text-[#172033] text-xs font-semibold transition-colors"
              >
                Close
              </button>
              <Link
                to="/contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors"
              >
                <span>Start Similar Project</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
