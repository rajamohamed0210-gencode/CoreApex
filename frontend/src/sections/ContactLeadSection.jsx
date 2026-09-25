import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Clock,
  Briefcase,
  MessageSquare
} from 'lucide-react';
import { apiService } from '../services/api';
import SectionHeading from '../components/motion/SectionHeading';
import { Reveal } from '../components/motion/Reveal';
import { Sparkles } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

export default function ContactLeadSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'website',
    budget: '25k_50k',
    project_details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    { value: 'website', label: 'Website Development' },
    { value: 'mobile_app', label: 'Mobile App Development' },
    { value: 'ecommerce', label: 'Ecommerce Platform' },
    { value: 'custom_software', label: 'Custom Software Development' },
    { value: 'crm_erp', label: 'CRM / ERP Solution' },
    { value: 'cloud_solution', label: 'Cloud Solution & Infrastructure' },
    { value: 'api_dev', label: 'API Development & Integration' },
    { value: 'ui_ux', label: 'UI/UX Design' },
    { value: 'other', label: 'Other Custom Requirement' },
  ];

  const budgetList = [
    { value: 'under_25k', label: 'Under ₹25,000' },
    { value: '25k_50k', label: '₹25,000 – ₹50,000' },
    { value: '50k_1lakh', label: '₹50,000 – ₹1,00,000' },
    { value: '1lakh_plus', label: '₹1,00,000+' },
    { value: 'not_sure', label: 'Not sure yet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project_details) {
      setErrorMessage('Please fill in your Name, Email, and Project Details.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await apiService.submitLead(formData);
      if (res.success) {
        setSubmitted(true);
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#2563EB', '#1D4ED8', '#38BDF8', '#EFF6FF']
          });
        } catch {}
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred submitting your lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeading
          className="mb-14"
          eyebrow="Start a Project"
          icon={Sparkles}
          title="Let's Build Something"
          highlight="Exceptional"
          description="Submit your project requirements below. Our engineering team reviews inquiries within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Guarantees */}
          <Reveal variant="left" className="lg:col-span-5 space-y-6">
            <div className="light-card p-7 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-[#172033]">
                What to Expect:
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#172033]">24-Hour Response</h4>
                    <p className="text-xs text-[#64748B]">Our engineering lead evaluates technical scope and schedules a discovery call.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#172033]">Strict Non-Disclosure (NDA)</h4>
                    <p className="text-xs text-[#64748B]">Your proprietary ideas, datasets, and trade secrets remain 100% confidential.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#172033]">Direct Founder Consultation</h4>
                    <p className="text-xs text-[#64748B]">Direct architecture review with Raja Mohamed, Founder & CEO.</p>
                  </div>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="pt-5 border-t border-[#F1F5F9] space-y-3 text-xs text-[#64748B]">
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#2563EB] flex-shrink-0" />
                  <a href="mailto:coreapex.dev@gmail.com" className="text-[#172033] hover:text-[#2563EB] transition-colors">coreapex.dev@gmail.com</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#2563EB] flex-shrink-0" />
                  <a href="tel:+917639930013" className="text-[#172033] hover:text-[#2563EB] transition-colors">+91 7639930013</a>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                  <span>1/137, L. Karungulam, Ramanathapuram, Tamil Nadu – 623527</span>
                </div>

                <div className="pt-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold text-xs transition-colors"
                  >
                    <MessageSquare size={16} />
                    <span>Chat Directly on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Lead Form */}
          <Reveal variant="right" delay={0.1} className="lg:col-span-7">
            <div className="light-card p-7 sm:p-8">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-[#172033]">Inquiry Submitted!</h3>
                    <p className="text-[#64748B] text-sm max-w-md mx-auto leading-relaxed">
                      Thank you <span className="text-[#172033] font-semibold">{formData.name}</span>. Your project request has been logged. We will contact you at <span className="text-[#2563EB] font-mono">{formData.email}</span> shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: 'website',
                        budget: '25k_50k',
                        project_details: '',
                      });
                    }}
                    className="px-5 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#2563EB] border border-[#E2E8F0] text-xs font-mono font-semibold transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle size={15} className="flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Raja Mohamed"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 76399 30013"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                      Target Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] text-sm transition-all"
                    >
                      {servicesList.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Selector Pills */}
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                      Estimated Investment Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      {budgetList.map((b) => (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b.value })}
                          className={`p-2 rounded-xl text-xs font-mono font-medium transition-all text-center ${
                            formData.budget === b.value
                              ? 'bg-[#2563EB] text-white border border-[#2563EB] shadow-sm'
                              : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#172033] border border-[#E2E8F0]'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                      Project Details & Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your project vision, key features, and timeline expectations..."
                      value={formData.project_details}
                      onChange={(e) => setFormData({ ...formData, project_details: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] text-sm transition-all"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-semibold text-sm shadow-button-glow transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Submit Project Request</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
