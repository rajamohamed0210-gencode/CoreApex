import React, { useState, useEffect } from 'react';
import PortfolioSection from '../sections/PortfolioSection';
import SEO from '../components/SEO';
import { apiService } from '../services/api';
import { FolderKanban } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await apiService.getProjects();
      setProjects(data);
    }
    load();
  }, []);

  return (
    <>
      <SEO
        title="Portfolio & Case Studies — Core Apex.dev"
        description="Browse real-world case studies and production architectures delivered by Core Apex.dev across retail, logistics, education, fin-tech and healthcare."
      />

      <div className="pt-28 pb-10 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
              <FolderKanban size={14} /> Case Study Archive
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#172033] tracking-tight leading-tight">
              Engineering <span className="text-[#2563EB]">Case Studies</span>
            </h1>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              Explore how we design and deploy scalable digital systems with measurable ROI, high concurrency, and clean codebases.
            </p>
          </div>
        </div>

        <PortfolioSection projects={projects} />
      </div>
    </>
  );
}
