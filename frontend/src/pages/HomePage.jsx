import React, { useState, useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import WhyCoreApexSection from '../sections/WhyCoreApexSection';
import TechnologiesSection from '../sections/TechnologiesSection';
import PortfolioSection from '../sections/PortfolioSection';
import ProcessSection from '../sections/ProcessSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FAQSection from '../sections/FAQSection';
import ContactLeadSection from '../sections/ContactLeadSection';
import SEO from '../components/SEO';
import { apiService } from '../services/api';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [s, p, t, test, f] = await Promise.all([
        apiService.getServices(),
        apiService.getProjects(),
        apiService.getTechnologies(),
        apiService.getTestimonials(),
        apiService.getFAQs()
      ]);
      setServices(s);
      setProjects(p);
      setTechnologies(t);
      setTestimonials(test);
      setFaqs(f);
    }
    loadData();
  }, []);

  return (
    <>
      <SEO
        title="Core Apex.dev — Web • App • Cloud • Software Solutions"
        description="We turn ideas into digital reality. Core Apex builds modern websites, mobile applications, cloud platforms and custom software solutions that help businesses grow."
      />
      <div className="relative">
        <HeroSection />
        <ServicesSection services={services} />
        <WhyCoreApexSection />
        <TechnologiesSection technologies={technologies} />
        <PortfolioSection projects={projects} />
        <ProcessSection />
        <TestimonialsSection testimonials={testimonials} />
        <FAQSection faqs={faqs} />
        <ContactLeadSection />
      </div>
    </>
  );
}
