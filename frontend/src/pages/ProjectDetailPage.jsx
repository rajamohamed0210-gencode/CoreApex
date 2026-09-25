import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  ChevronLeft,
  TrendingUp,
  Cpu,
  ArrowRight,
  MessageSquare,
  Building
} from 'lucide-react';
import { apiService } from '../services/api';
import SEO from '../components/SEO';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import { ParallaxImage } from '../components/motion/Parallax';
import SmartImage from '../components/SmartImage';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await apiService.getProjectBySlug(slug);
      setProject(data);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading || !project) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-[#F8FAFC] text-center flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${project.title} — Engineering Case Study | Core Apex.dev`}
        description={project.short_description || `Explore how Core Apex.dev engineered ${project.title}.`}
      />

      <div className="pt-28 pb-20 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              <ChevronLeft size={14} /> Back to Case Studies Archive
            </Link>

            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-mono font-medium text-[#2563EB] hover:bg-[#EFF6FF] transition-colors shadow-sm"
              >
                <span>Live Project Demo</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Hero Header */}
          <Reveal variant="up">
          <div className="light-card mb-8 space-y-4 p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] uppercase tracking-wider">
                {project.industry || 'Enterprise Solution'}
              </span>
              {project.client && (
                <span className="inline-flex items-center gap-1 text-xs font-mono text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md">
                  <Building size={12} /> Client: <span className="text-[#172033] font-medium">{project.client}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172033] tracking-tight leading-tight">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="text-base sm:text-lg text-[#2563EB] font-medium">
                {project.tagline}
              </p>
            )}

            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              {project.short_description}
            </p>
          </div>
          </Reveal>

          {/* Main Featured Image */}
          {project.featured_image && (
            <Reveal variant="zoom" className="mb-8">
              <ParallaxImage className="light-card overflow-hidden rounded-2xl bg-slate-100">
                <SmartImage
                  src={project.featured_image}
                  alt={`${project.title} — delivered by Core Apex.dev`}
                  wrapperClassName="max-h-[480px] w-full"
                  className="max-h-[480px] w-full object-cover"
                />
              </ParallaxImage>
            </Reveal>
          )}

          {/* Architecture & Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <Stagger className="mb-8 grid grid-cols-2 gap-3.5 md:grid-cols-4" stagger={0.09}>
              {project.metrics.map((metric, idx) => (
                <StaggerItem key={idx} variant="zoom" className="h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="light-card h-full space-y-0.5 p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-[#2563EB]">
                      {metric.value}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
                      {metric.label}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {/* Challenge & Solution Grid */}
          <Stagger className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.15}>
            
            {/* The Challenge */}
            <StaggerItem variant="left" className="h-full">
            <div className="h-full space-y-2.5 rounded-2xl border border-amber-200/60 bg-amber-50/60 p-6 sm:p-7">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-mono font-semibold uppercase">
                The Engineering Challenge
              </div>
              <p className="text-[#1E293B] text-xs sm:text-sm leading-relaxed">
                {project.challenge || 'Client required a high-speed, scalable system with zero downtime, capable of handling surge traffic with predictable sub-second response times.'}
              </p>
            </div>
            </StaggerItem>

            {/* The Solution */}
            <StaggerItem variant="right" className="h-full">
            <div className="h-full space-y-2.5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 sm:p-7">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-100 text-[#1D4ED8] text-xs font-mono font-semibold uppercase">
                Core Apex.dev Architecture
              </div>
              <p className="text-[#1E293B] text-xs sm:text-sm leading-relaxed">
                {project.solution || 'We architected a modern modular solution with optimized database queries, automated CI/CD pipelines, and high-performance caching layers.'}
              </p>
            </div>
            </StaggerItem>

          </Stagger>

          {/* Results Summary */}
          {project.results_summary && (
            <div className="p-6 sm:p-7 rounded-2xl light-card mb-8 space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[#172033] flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-600" />
                Measurable Business Results & Impact
              </h3>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
                {project.results_summary}
              </p>
            </div>
          )}

          {/* Tech Stack Badge Section */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="p-6 sm:p-7 rounded-2xl light-card mb-8 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold flex items-center gap-1.5">
                <Cpu size={14} className="text-[#2563EB]" /> Technology Stack Applied
              </h3>
              <Stagger className="flex flex-wrap gap-2" stagger={0.06}>
                {project.technologies.map((tech, idx) => (
                  <StaggerItem key={idx} variant="zoom">
                    <span className="rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] px-3 py-1.5 font-mono text-xs font-medium text-[#172033] transition-colors hover:border-[#BFDBFE] hover:bg-[#EFF6FF]">
                      {tech}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}

          {/* Gallery Images */}
          {project.gallery_images && project.gallery_images.length > 0 && (
            <div className="mb-8 space-y-4">
              <h3 className="text-lg font-bold text-[#172033]">Interface Screenshots</h3>
              <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.12}>
                {project.gallery_images.map((imgUrl, idx) => (
                  <StaggerItem key={idx} variant="zoom">
                    <div className="light-card card-interactive group overflow-hidden">
                      <SmartImage
                        src={imgUrl}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        wrapperClassName="w-full"
                        className="transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.05]"
                      />
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}

          {/* Light CTA Box */}
          <Reveal variant="up">
          <div className="space-y-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-8 text-center shadow-sm sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
              Need a Similar Solution for Your Business?
            </h3>
            <p className="text-[#64748B] text-xs sm:text-sm max-w-lg mx-auto">
              We specialize in custom web applications, mobile platforms, and enterprise software built to exact specifications.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs uppercase tracking-wider font-mono shadow-button-glow transition-all"
              >
                <span>Start Your Project</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#BFDBFE] text-[#1D4ED8] text-xs uppercase tracking-wider font-mono font-semibold transition-colors"
              >
                <MessageSquare size={15} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
          </Reveal>

        </div>
      </div>
    </>
  );
}
