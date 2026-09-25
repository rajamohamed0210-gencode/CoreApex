import React from 'react';
import ProcessSection from '../sections/ProcessSection';
import SEO from '../components/SEO';
import PageHero from '../components/motion/PageHero';
import { Sparkles } from 'lucide-react';

export default function ProcessPage() {
  return (
    <>
      <SEO
        title="7-Step Development Process — Core Apex.dev"
        description="Discover our battle-tested 7-stage agile development process: Discover, Plan, Design, Develop, Test, Deploy, and Support."
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        <PageHero
          eyebrow="Agile Delivery"
          icon={Sparkles}
          title="Engineering"
          highlight="Process"
          description="Our 7-stage software development lifecycle ensures structured execution, transparent communication, and predictable timelines."
          chips={['2-week sprints', 'Written scope', 'Live demos', '30-day warranty']}
        />

        <ProcessSection />
      </div>
    </>
  );
}
