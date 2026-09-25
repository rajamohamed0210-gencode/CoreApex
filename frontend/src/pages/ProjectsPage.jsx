import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PortfolioSection from '../sections/PortfolioSection';
import SEO from '../components/SEO';
import { apiService } from '../services/api';
import PageHero from '../components/motion/PageHero';
import { FolderKanban, Building2, TrendingUp, Layers } from 'lucide-react';
import AnimatedCounter from '../components/motion/AnimatedCounter';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await apiService.getProjects();
      setProjects(data);
    }
    load();
  }, []);

  const industries = [...new Set(projects.map((p) => p.industry).filter(Boolean))];

  return (
    <>
      <SEO
        title="Portfolio & Case Studies — Core Apex.dev"
        description="Browse real-world case studies and production architectures delivered by Core Apex.dev across retail, logistics, education, fin-tech and healthcare."
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        <PageHero
          eyebrow="Case Study Archive"
          icon={FolderKanban}
          title="Engineering"
          highlight="Case Studies"
          description="Explore how we design and deploy scalable digital systems with measurable ROI, high concurrency, and clean codebases."
          chips={industries.slice(0, 6)}
        >
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { Icon: Layers, value: projects.length || 6, suffix: '', label: 'Case studies' },
              { Icon: Building2, value: industries.length || 5, suffix: '', label: 'Industries' },
              { Icon: TrendingUp, value: 99, suffix: '%', label: 'On-time delivery' },
              { Icon: FolderKanban, value: 100, suffix: '%', label: 'Code handover' },
            ].map(({ Icon, value, suffix, label }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + idx * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#E2E8F0] bg-white/80 p-4 text-center shadow-sm backdrop-blur"
              >
                <Icon size={16} className="mx-auto mb-2 text-[#2563EB]" />
                <div className="text-lg font-extrabold text-[#172033] sm:text-xl">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">{label}</div>
              </motion.div>
            ))}
          </div>
        </PageHero>

        <PortfolioSection projects={projects} />
      </div>
    </>
  );
}
