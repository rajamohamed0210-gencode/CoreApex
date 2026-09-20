import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquareText } from 'lucide-react';

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section id="testimonials" className="py-20 relative bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase tracking-wider">
            <MessageSquareText size={14} /> Client Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
            Trusted by Forward-Thinking{' '}
            <span className="text-[#2563EB]">Businesses</span>
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            Hear directly from founders and engineering leaders who have partnered with Core Apex.dev.
          </p>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          <p className="text-center text-[#64748B] text-base">
            No testimonials available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={test.id || idx}
                className="light-card p-7 flex flex-col justify-between"
              >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating || 5)].map((_, rIdx) => (
                      <Star key={rIdx} size={15} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={24} className="text-slate-300" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-[#1E293B] text-sm sm:text-base leading-relaxed italic mb-6">
                  "{test.content}"
                </p>
              </div>

              {/* Author & Project info */}
              <div className="pt-5 border-t border-[#F1F5F9] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={test.avatar_url}
                    alt={test.client_name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#172033]">{test.client_name}</h4>
                    <p className="text-xs text-[#64748B]">{test.client_role}, <span className="text-[#2563EB]">{test.company_name}</span></p>
                  </div>
                </div>

                {test.project_title && (
                  <div className="hidden sm:block text-right">
                    <span className="text-[10px] font-mono uppercase text-[#94A3B8] block">Project</span>
                    <span className="text-xs font-mono font-semibold text-[#2563EB]">{test.project_title}</span>
                  </div>
                )}
              </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
