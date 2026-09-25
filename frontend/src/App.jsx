import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ScrollProgress, BackToTop } from './components/motion/ScrollProgress';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PageTransition from './components/motion/PageTransition';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const TechnologiesPage = lazy(() => import('./pages/TechnologiesPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLeadViewerPage = lazy(() => import('./pages/AdminLeadViewerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 bg-[#F8FAFC] pb-28 pt-40">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#DBEAFE]" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
        <div className="absolute inset-[10px] rounded-full bg-[#EFF6FF] animate-pulse" />
      </div>
      <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
        Loading Core Apex…
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#1E293B] selection:bg-brand-500 selection:text-white">
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/technologies" element={<TechnologiesPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin-leads" element={<AdminLeadViewerPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
