import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  ChevronRight,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import ProjectModal from '../components/ProjectModal';
import SectionHeading from '../components/motion/SectionHeading';
import SmartImage from '../components/SmartImage';
import { projectImage } from '../data/images';

export default function PortfolioSection({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const gridRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start 85%', 'end 40%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

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
    <section id="portfolio" className="relative overflow-hidden border-t border-[#E2E8F0] bg-[#F8FAFC] py-20">
      <div className="pointer-events-none absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-[#DBEAFE]/50 blur-3xl" />

      <div ref={gridRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            className="max-w-2xl"
            eyebrow="Case Studies"
            icon={FolderKanban}
            title="Featured Work &"
            highlight="Architectures"
            description="Explore production architectures engineered for high concurrency, security, and measurable return on investment."
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`relative rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-300 ${
                  filter === cat.key
                    ? 'border border-[#2563EB] bg-[#2563EB] text-white shadow-button-glow'
                    : 'border border-[#E2E8F0] bg-white text-[#64748B] hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:text-[#172033]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Scroll progress rail */}
        <div className="mb-8 h-[3px] w-full overflow-hidden rounded-full bg-[#E2E8F0]">
          <motion.div
            style={{ scaleX: progress }}
            className="h-full origin-left rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
          />
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || project.slug || idx}
                layout
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="light-card card-sheen flex h-full flex-col justify-between overflow-hidden">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-56">
                    <SmartImage
                      src={project.featured_image || projectImage(idx)}
                      fallback={projectImage(idx)}
                      alt={`${project.title} case study by Core Apex.dev`}
                      wrapperClassName="h-full w-full"
                      className="transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.08]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

                    <div className="absolute left-3.5 top-3.5">
                      <span className="rounded-lg border border-[#E2E8F0] bg-white/95 px-2.5 py-1 font-mono text-xs font-semibold text-[#2563EB] shadow-sm backdrop-blur">
                        {project.industry}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Quick preview of ${project.title}`}
                      className="absolute right-3.5 top-3.5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-xl border border-white/50 bg-white/95 text-[#2563EB] opacity-0 shadow-sm backdrop-blur transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#2563EB] hover:text-white"
                    >
                      <ArrowUpRight size={15} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <Link to={`/projects/${project.slug}`}>
                        <h3 className="mb-2 line-clamp-1 text-lg font-bold text-[#172033] transition-colors hover:text-[#2563EB] sm:text-xl">
                          {project.title}
                        </h3>
                      </Link>

                      <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                        {project.short_description}
                      </p>

                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {project.technologies && project.technologies.slice(0, 3).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-md border border-[#E2E8F0] bg-[#F1F5F9] px-2 py-0.5 font-mono text-[11px] text-[#475569] transition-colors group-hover:border-[#BFDBFE] group-hover:bg-[#EFF6FF]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 font-mono text-[11px] text-[#94A3B8]">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-[#F1F5F9] pt-4">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="group/btn flex flex-1 items-center justify-between rounded-xl bg-[#EFF6FF] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D4ED8] transition-colors hover:bg-[#DBEAFE]"
                      >
                        <span>Read Case Study</span>
                        <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                      <button
                        onClick={() => setSelectedProject(project)}
                        title="Quick Preview"
                        aria-label={`Quick preview of ${project.title}`}
                        className="rounded-xl border border-[#E2E8F0] bg-white p-2 text-[#64748B] transition-colors hover:border-[#2563EB] hover:text-[#172033]"
                      >
                        <Layers size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#E2E8F0] bg-white/70 py-16 text-center">
            <Sparkles size={20} className="text-[#2563EB]" />
            <p className="text-sm font-semibold text-[#172033]">No projects in this category yet.</p>
            <p className="text-xs text-[#64748B]">Try another filter or start a conversation about your build.</p>
          </div>
        )}

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
