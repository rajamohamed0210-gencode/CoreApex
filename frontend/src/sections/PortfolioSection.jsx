import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  ArrowRight,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

export default function PortfolioSection({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Applications' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'software', label: 'Custom Software / ERP' },
    { key: 'cloud', label: 'Cloud & API' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter || (filter === 'cloud' && (p.category === 'cloud' || p.category === 'api')));

  return (
    <section id="portfolio" className="py-20 relative bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
              <FolderKanban size={14} /> Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
              Featured Work &{' '}
              <span className="text-[#2563EB]">Architectures</span>
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg">
              Explore production architectures engineered for high concurrency, security, and measurable return on investment.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  filter === cat.key
                    ? 'bg-[#2563EB] text-white shadow-sm border border-[#2563EB]'
                    : 'bg-white text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="light-card overflow-hidden flex flex-col justify-between"
              >
                {/* Clean Image Container */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white/95 text-[#2563EB] border border-[#E2E8F0] shadow-sm">
                      {project.industry}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Title */}
                    <Link to={`/projects/${project.slug}`}>
                      <h3 className="text-lg sm:text-xl font-bold text-[#172033] mb-2 hover:text-[#2563EB] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.short_description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies && project.technologies.slice(0, 3).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-mono text-[#475569]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[11px] font-mono text-[#94A3B8]">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* View Case Study CTA Button */}
                  <div className="pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex-1 inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] text-xs font-semibold uppercase tracking-wider font-mono transition-colors group/btn"
                    >
                      <span>Read Case Study</span>
                      <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      onClick={() => setSelectedProject(project)}
                      title="Quick Preview"
                      className="p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#172033] hover:border-[#2563EB] transition-colors"
                    >
                      <Layers size={14} />
                    </button>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Case Study Modal Popup */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </section>
  );
}
