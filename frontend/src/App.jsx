import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
    <div className="pt-40 pb-28 min-h-[60vh] bg-navy-950 flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-2 border-electric-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-xs font-mono text-slate-400 tracking-wider uppercase">Loading Core Apex...</div>
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
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#1E293B] selection:bg-brand-500 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
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
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
