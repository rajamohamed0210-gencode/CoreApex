import React from 'react';
import ContactLeadSection from '../sections/ContactLeadSection';
import SEO from '../components/SEO';
import PageHero from '../components/motion/PageHero';
import { Sparkles } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us & Project Estimator — Core Apex.dev"
        description="Connect with Core Apex.dev for custom software development, web applications, mobile apps, or cloud architectures. Fast 24-hour response."
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        <PageHero
          eyebrow="Direct Engagement"
          icon={Sparkles}
          title="Start Your"
          highlight="Project"
          description="Tell us about your business goals and technical requirements. We will analyze your scope and get in touch within 24 hours."
          chips={['24-hour response', 'Fixed-scope quote', 'NDA on request', 'Direct WhatsApp line']}
        />

        <ContactLeadSection />
      </div>
    </>
  );
}
