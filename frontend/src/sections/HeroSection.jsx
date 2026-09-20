import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  Code2,
  Check,
  Menu as MenuIcon
} from 'lucide-react';
import ApexLogoMark from '../components/ApexLogoMark';
import { WhatsAppIcon } from '../components/SocialIcons';
import { ReactLogo, PythonLogo, DjangoLogo, PostgreSQLLogo } from '../components/TechBrandIcons';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden bg-[#F8FAFC]">
      
      {/* Background Soft Blue Ambient Lights */}
      <div className="absolute top-0 right-0 w-3/5 h-[650px] bg-gradient-to-bl from-[#DBEAFE]/40 via-[#EFF6FF]/60 to-transparent pointer-events-none blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-blue-50/50 pointer-events-none blur-3xl"></div>

      {/* Top Right "IDEAS TO REALITY" Technical Marker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="hidden lg:flex items-center justify-end gap-3 text-xs font-mono font-semibold tracking-widest text-[#2563EB] uppercase mb-3">
          <span>IDEAS TO REALITY</span>
          <div className="w-16 h-[2px] bg-[#2563EB]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Grid: Left Headline & Right Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            
            {/* Eyebrow Pill/Tag */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block"
            >
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#2563EB] uppercase font-mono">
                WEB &bull; APP &bull; CLOUD &bull; SOFTWARE SOLUTIONS
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#0F172A] leading-[1.12]"
            >
              We Turn Ideas Into{' '}
              <span className="text-[#2563EB] block">
                Digital Reality.
              </span>
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              <span className="font-semibold text-[#1E293B]">Core Apex.dev</span> builds modern websites, mobile applications, custom software, e-commerce platforms, backend systems and cloud solutions for businesses.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
            >
              {/* Start a Project */}
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-semibold shadow-button-glow transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowRight size={16} />
              </Link>

              {/* View Our Work */}
              <Link
                to="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#1E293B] border border-slate-200 hover:border-slate-300 text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                <span>View Our Work</span>
                <ArrowRight size={15} className="text-[#64748B]" />
              </Link>

              {/* WhatsApp Us */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50/50 border border-[#22C55E]/60 text-[#16A34A] text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                <WhatsAppIcon size={18} />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column: Realistic Workstation & Floating Badges */}
          <div className="lg:col-span-7 relative flex items-center justify-center pt-8 pb-4">
            
            {/* Composition Container */}
            <div className="relative w-full max-w-2xl">
              
              {/* Floating Card 1: Tech Stack Icons (Top Center) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -top-6 left-1/4 sm:left-1/3 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-4 sm:gap-6"
              >
                {/* React */}
                <div className="flex flex-col items-center gap-1">
                  <ReactLogo size={24} />
                  <span className="text-[10px] font-semibold text-slate-700">React</span>
                </div>
                {/* Python */}
                <div className="flex flex-col items-center gap-1">
                  <PythonLogo size={24} />
                  <span className="text-[10px] font-semibold text-slate-700">Python</span>
                </div>
                {/* Django */}
                <div className="flex flex-col items-center gap-1">
                  <DjangoLogo size={24} />
                  <span className="text-[10px] font-semibold text-slate-700">Django</span>
                </div>
                {/* PostgreSQL */}
                <div className="flex flex-col items-center gap-1">
                  <PostgreSQLLogo size={24} />
                  <span className="text-[10px] font-semibold text-slate-700">PostgreSQL</span>
                </div>
              </motion.div>

              {/* Floating Card 2: Checklist (Middle Left) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="absolute top-28 -left-4 sm:-left-8 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 space-y-2.5 min-w-[170px]"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Check size={14} className="text-[#2563EB] stroke-[3]" />
                  <span>Modern Design</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Check size={14} className="text-[#2563EB] stroke-[3]" />
                  <span>Clean Code</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Check size={14} className="text-[#2563EB] stroke-[3]" />
                  <span>Fast Performance</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Check size={14} className="text-[#2563EB] stroke-[3]" />
                  <span>Ongoing Support</span>
                </div>
              </motion.div>

              {/* Workstation Base: Laptop & Mobile & Desk Setup */}
              <div className="relative pl-12 pr-6 pt-10 pb-6">
                
                {/* Realistic Laptop Mockup */}
                <div className="relative z-10 w-full max-w-[480px] mx-auto sm:ml-auto sm:mr-16">
                  
                  {/* Laptop Screen Bezel */}
                  <div className="rounded-t-2xl bg-[#0B0F17] p-2.5 shadow-2xl border border-slate-700/80">
                    
                    {/* Screen Top Bar */}
                    <div className="flex items-center justify-between px-2 py-1.5 bg-[#141A26] rounded-t-lg border-b border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                        <span className="text-slate-300">📁 project</span>
                        <span className="text-[#38BDF8]">📄 views.py</span>
                      </div>
                      <div className="w-8"></div>
                    </div>

                    {/* IDE Content Area */}
                    <div className="bg-[#0B0F17] p-3 grid grid-cols-12 gap-2 text-[10px] font-mono leading-relaxed h-[210px] overflow-hidden rounded-b-lg select-none">
                      
                      {/* Left Sidebar: File Tree */}
                      <div className="col-span-4 border-r border-slate-800/80 pr-2 text-slate-400 space-y-1">
                        <div className="text-slate-200 font-semibold flex items-center gap-1">
                          <span>▼ frontend</span>
                        </div>
                        <div className="pl-2 space-y-0.5 text-[9px]">
                          <div>▼ src</div>
                          <div className="pl-2 text-slate-500">📄 components</div>
                          <div className="pl-2 text-slate-500">📄 pages</div>
                          <div className="pl-2 text-slate-500">📄 services</div>
                        </div>
                        <div className="text-slate-200 font-semibold pt-1 flex items-center gap-1">
                          <span>▼ backend</span>
                        </div>
                        <div className="pl-2 space-y-0.5 text-[9px]">
                          <div className="text-[#38BDF8]">📄 api</div>
                          <div className="text-slate-500">📄 models</div>
                          <div className="text-[#60A5FA]">📄 views.py</div>
                          <div className="text-slate-500">📄 config</div>
                        </div>
                      </div>

                      {/* Right Editor: Python Django API Code */}
                      <div className="col-span-8 pl-1 text-slate-300 space-y-0.5">
                        <div className="text-slate-500">1  <span className="text-[#F472B6]">from</span> django.shortcuts <span className="text-[#F472B6]">import</span> render</div>
                        <div className="text-slate-500">2  <span className="text-[#F472B6]">from</span> rest_framework.response <span className="text-[#F472B6]">import</span> Response</div>
                        <div className="text-slate-500">3  <span className="text-[#F472B6]">from</span> rest_framework.decorators <span className="text-[#F472B6]">import</span> api_view</div>
                        <div className="text-slate-500">4  <span className="text-[#F472B6]">from</span> .models <span className="text-[#F472B6]">import</span> Project</div>
                        <div className="text-slate-500">5</div>
                        <div className="text-slate-500">6  <span className="text-[#60A5FA]">@api_view</span>([<span className="text-[#34D399]">'GET'</span>])</div>
                        <div className="text-slate-500">7  <span className="text-[#F472B6]">def</span> <span className="text-[#FBBF24]">project_list</span>(request):</div>
                        <div className="text-slate-500">8      projects = Project.objects.<span className="text-[#60A5FA]">filter</span>(is_published=<span className="text-[#F472B6]">True</span>)</div>
                        <div className="text-slate-500">9      serializer = ProjectSerializer(projects, many=<span className="text-[#F472B6]">True</span>)</div>
                        <div className="text-slate-500">10     <span className="text-[#F472B6]">return</span> Response({'{'}</div>
                        <div className="text-slate-500">11         <span className="text-[#34D399]'">'success'</span>: <span className="text-[#F472B6]">True</span>,</div>
                        <div className="text-slate-500">12         <span className="text-[#34D399]'">'data'</span>: serializer.data</div>
                        <div className="text-slate-500">13     {'}'})</div>
                      </div>

                    </div>
                  </div>

                  {/* Laptop Bottom Aluminum Base & Hinge */}
                  <div className="relative h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-b-xl shadow-lg flex items-center justify-center">
                    <div className="w-16 h-1 bg-slate-800 rounded-full"></div>
                  </div>
                  {/* Laptop Shadow on Desk */}
                  <div className="h-3 w-5/6 mx-auto bg-slate-900/20 blur-md rounded-full"></div>

                </div>

                {/* Smartphone Standing Mockup (Overlapping on right) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute bottom-2 -right-2 sm:right-2 z-20 w-[160px] sm:w-[185px] bg-white rounded-[28px] p-2.5 shadow-2xl border-[4px] border-slate-900"
                >
                  {/* Dynamic Island Notch */}
                  <div className="w-12 h-2.5 bg-slate-900 rounded-full mx-auto mb-2"></div>

                  {/* Mobile Screen Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1">
                      <ApexLogoMark size={14} />
                      <span className="text-[9px] font-bold text-slate-900">Core Apex.dev</span>
                    </div>
                    <MenuIcon size={12} className="text-slate-600" />
                  </div>

                  {/* Mobile Screen Body */}
                  <div className="py-2.5 space-y-2 text-center">
                    <div className="text-[11px] font-extrabold text-slate-900 leading-tight">
                      Build Your Next Big Idea
                    </div>
                    <div className="text-[8px] text-slate-500 leading-tight">
                      Modern web, mobile and cloud solutions for your business.
                    </div>
                    <div className="pt-0.5">
                      <div className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-[#2563EB] text-white text-[8px] font-bold">
                        <span>Get Started</span>
                        <ArrowRight size={8} />
                      </div>
                    </div>

                    {/* Mobile Analytics Graphic */}
                    <div className="mt-2 p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-end justify-between h-9 px-2">
                      <div className="w-2 bg-[#93C5FD] rounded-t h-4"></div>
                      <div className="w-2 bg-[#60A5FA] rounded-t h-6"></div>
                      <div className="w-2 bg-[#3B82F6] rounded-t h-8"></div>
                      <div className="w-2 bg-[#2563EB] rounded-t h-5"></div>
                      <div className="w-2 bg-[#1D4ED8] rounded-t h-7"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Desk Hardcover Notebook & Pen on bottom left */}
                <div className="absolute -bottom-4 left-6 hidden sm:flex items-center gap-2 pointer-events-none">
                  <div className="w-28 h-12 bg-slate-900 rounded-lg shadow-lg border border-slate-800 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-slate-800"></div>
                  </div>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full shadow-md"></div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Horizontal 4-Column Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 pt-6 border-t border-slate-200/80"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Stat 1: 99.9% */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                <Code2 size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">99.9%</div>
                <div className="text-xs text-[#64748B] font-medium">Uptime Standard</div>
              </div>
            </div>

            {/* Stat 2: 100% */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                <Shield size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">100%</div>
                <div className="text-xs text-[#64748B] font-medium">IP & Code Ownership</div>
              </div>
            </div>

            {/* Stat 3: 30-Day */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">30-Day</div>
                <div className="text-xs text-[#64748B] font-medium">Post-Launch Warranty</div>
              </div>
            </div>

            {/* Stat 4: Dedicated Support */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                <Users size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">Dedicated</div>
                <div className="text-xs text-[#64748B] font-medium">Support Team</div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

    </section>
  );
}
