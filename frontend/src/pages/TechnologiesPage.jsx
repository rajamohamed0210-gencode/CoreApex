import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechnologiesSection from '../sections/TechnologiesSection';
import SEO from '../components/SEO';
import { apiService } from '../services/api';

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function load() {
      const data = await apiService.getTechnologies();
      setTechnologies(data);
    }
    load();
  }, []);

  const categories = [
    { key: 'all', label: 'All Technologies' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'database', label: 'Database' },
    { key: 'cloud', label: 'Cloud & DevOps' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'tools', label: 'Tools' },
  ];

  const techList = technologies.length > 0 ? technologies : [
    { name: "React 19", category: "frontend", description: "Component-based declarative UI architecture for ultra-responsive web applications." },
    { name: "Django & DRF", category: "backend", description: "Enterprise-grade secure Python web framework with powerful ORM." },
    { name: "PostgreSQL 18", category: "database", description: "Advanced relational ACID database built for high concurrency and complex queries." },
    { name: "FastAPI", category: "backend", description: "High-performance async ASGI Python framework for microservices." },
    { name: "Docker & Compose", category: "cloud", description: "Containerized deployment pipelines ensuring production parity." },
    { name: "AWS Cloud & S3", category: "cloud", description: "Resilient cloud infrastructure with automated backups and horizontal scalability." },
    { name: "Tailwind CSS", category: "frontend", description: "Utility-first CSS engine delivering bespoke responsive aesthetics." },
    { name: "React Native", category: "mobile", description: "Cross-platform iOS and Android native apps with shared business logic." },
    { name: "Redis", category: "database", description: "In-memory caching and message brokerage for ultra-low latency response times." },
    { name: "Celery", category: "backend", description: "Distributed task queues for async processing and background jobs." },
    { name: "Git & CI/CD", category: "tools", description: "Automated linting, testing, and deployment pipelines." },
    { name: "Postman & OpenAPI", category: "tools", description: "Comprehensive API specification and integration testing suites." }
  ];

  const filteredTech = activeCategory === 'all'
    ? techList
    : techList.filter(t => (t.category || '').toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <SEO
        title="Technology Stack & Architecture — Core Apex.dev"
        description="Explore the modern tech stack and infrastructure we utilize at Core Apex.dev: React, Django, PostgreSQL 18, FastAPI, AWS, and Docker."
      />

      <div className="pt-28 pb-20 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
              <Cpu size={14} /> Full Stack Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#172033] tracking-tight leading-tight">
              Technology <span className="text-[#2563EB]">Ecosystem</span>
            </h1>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
              We build with modern, production-hardened technologies designed for high availability, security, and developer velocity.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-[#2563EB] text-white shadow-sm border border-[#2563EB]'
                    : 'bg-white text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Technologies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {filteredTech.map((tech, idx) => (
              <div
                key={idx}
                className="light-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-bold text-[#172033]">
                      {tech.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8]">
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {tech.description || 'Enterprise-grade technology implemented with industry best practices.'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Visual Orbit Section */}
          <TechnologiesSection technologies={technologies} />

          {/* Light CTA */}
          <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-center space-y-4 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
              Have a Specific Tech Stack in Mind?
            </h3>
            <p className="text-[#64748B] text-xs sm:text-sm max-w-lg mx-auto">
              We adapt to your existing infrastructure or architect a greenfield stack tailored to your load requirements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs uppercase tracking-wider font-mono shadow-button-glow transition-all"
            >
              <span>Discuss Your Tech Stack</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
