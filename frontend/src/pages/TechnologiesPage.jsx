import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechnologiesSection from '../sections/TechnologiesSection';
import SEO from '../components/SEO';
import { apiService } from '../services/api';
import PageHero from '../components/motion/PageHero';
import { Reveal } from '../components/motion/Reveal';
import { IMAGES } from '../data/images';

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

      <div className="min-h-screen bg-[#F8FAFC]">
        <PageHero
          eyebrow="Full Stack Architecture"
          icon={Cpu}
          title="Technology"
          highlight="Ecosystem"
          description="We build with modern, production-hardened technologies designed for high availability, security, and developer velocity."
          image={IMAGES.services['cloud-solutions']}
          imageAlt="Cloud infrastructure and technology ecosystem used by Core Apex.dev"
          imageBadge={{ icon: Sparkles, title: '11 core technologies', subtitle: 'Battle-tested stack' }}
        />

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal variant="down" className="mb-10 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-300 ${
                    activeCategory === cat.key
                      ? 'border border-[#2563EB] bg-[#2563EB] text-white shadow-button-glow'
                      : 'border border-[#E2E8F0] bg-white text-[#64748B] hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:text-[#172033]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </Reveal>

            <motion.div
              layout
              className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredTech.map((tech, idx) => (
                <motion.div
                  key={`${tech.name}-${tech.category}`}
                  layout
                  initial={{ opacity: 0, y: 22, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (idx % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
                  className="light-card card-interactive group flex flex-col justify-between p-6"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-base font-bold text-[#172033] transition-colors group-hover:text-[#2563EB]">
                        {tech.name}
                      </span>
                      <span className="rounded-md border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-0.5 font-mono text-[10px] uppercase text-[#1D4ED8]">
                        {tech.category}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-[#64748B] sm:text-sm">
                      {tech.description || 'Enterprise-grade technology implemented with industry best practices.'}
                    </p>
                  </div>

                  <span className="mt-4 h-[2px] w-0 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] transition-all duration-500 group-hover:w-full" />
                </motion.div>
              ))}
            </motion.div>

            <TechnologiesSection technologies={technologies} />

            <Reveal variant="up" className="mt-14">
              <div className="relative overflow-hidden rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-8 text-center shadow-sm sm:p-10">
                <div className="bg-grid-subtle pointer-events-none absolute inset-0 opacity-70" />
                <div className="relative space-y-4">
                  <h3 className="text-2xl font-extrabold text-[#172033] sm:text-3xl">
                    Have a Specific Tech Stack in Mind?
                  </h3>
                  <p className="mx-auto max-w-lg text-xs text-[#64748B] sm:text-sm">
                    We adapt to your existing infrastructure or architect a greenfield stack tailored to your load requirements.
                  </p>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-button-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
                  >
                    <span>Discuss Your Tech Stack</span>
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
