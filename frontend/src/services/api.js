import axios from 'axios';
import {
  INITIAL_SITE_SETTINGS,
  SERVICES_DATA,
  SOLUTIONS_DATA,
  PROJECTS_DATA,
  TECHNOLOGIES_DATA
} from '../data/mockData';

// Relative by default: requests go to the same origin and are proxied to the
// Django backend (configured in vite.config.js / the production web server).
// Set VITE_API_URL to point at an absolute API host when needed.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper for localStorage leads
const getLocalLeads = () => {
  try {
    const data = localStorage.getItem('coreapex_leads');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalLead = (lead) => {
  try {
    const existing = getLocalLeads();

    const newLead = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      status: 'new',
      status_display: 'New Lead',
      service_display: lead.service || 'Custom Solution',
      ...lead,
    };

    localStorage.setItem(
      'coreapex_leads',
      JSON.stringify([newLead, ...existing])
    );

    return newLead;
  } catch (err) {
    console.error('Error saving local lead:', err);
    return lead;
  }
};

export const apiService = {
  // Services
  getServices: async () => {
    try {
      const res = await client.get('/services/');

      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error('Failed to load services:', error);
      return SERVICES_DATA;
    }
  },

  getServiceBySlug: async (slug) => {
    try {
      const res = await client.get(`/services/${slug}/`);
      return res.data;
    } catch (error) {
      console.error(`Failed to load service: ${slug}`, error);
      return (
        SERVICES_DATA.find((s) => s.slug === slug) ||
        SERVICES_DATA[0]
      );
    }
  },

  // Solutions
  getSolutions: async () => {
    try {
      const res = await client.get('/solutions/');

      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error('Failed to load solutions:', error);
      return SOLUTIONS_DATA;
    }
  },

  // Projects
  getProjects: async () => {
    try {
      const res = await client.get('/projects/');

      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error('Failed to load projects:', error);
      return PROJECTS_DATA;
    }
  },

  getFeaturedProjects: async () => {
    try {
      const res = await client.get('/projects/featured/');

      return Array.isArray(res.data)
        ? res.data
        : PROJECTS_DATA.filter((p) => p.is_featured);
    } catch (error) {
      console.error('Failed to load featured projects:', error);

      return PROJECTS_DATA.filter((p) => p.is_featured);
    }
  },

  getProjectBySlug: async (slug) => {
    try {
      const res = await client.get(`/projects/${slug}/`);
      return res.data;
    } catch (error) {
      console.error(`Failed to load project: ${slug}`, error);

      return (
        PROJECTS_DATA.find((p) => p.slug === slug) ||
        PROJECTS_DATA[0]
      );
    }
  },

  // Technologies
  getTechnologies: async () => {
    try {
      const res = await client.get('/technologies/');

      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error('Failed to load technologies:', error);
      return TECHNOLOGIES_DATA;
    }
  },

  // Testimonials
  getTestimonials: async () => {
    try {
      const res = await client.get('/testimonials/');

      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error('Failed to load testimonials:', error);
      return [];
    }
  },

  // FAQs
  getFAQs: async () => {
    try {
      const res = await client.get('/faqs/');

      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error('Failed to load FAQs:', error);
      return [];
    }
  },

  // Team
  getTeam: async () => {
    try {
      const res = await client.get(`/team/?t=${Date.now()}`);

      if (!Array.isArray(res.data)) {
        throw new Error('Invalid team API response');
      }

      return res.data;
    } catch (error) {
      console.error('Failed to load team members from API:', error);
      return [];
    }
  },

  // Site Settings
  getSiteSettings: async () => {
    try {
      const res = await client.get('/site-settings/');
      return res.data || INITIAL_SITE_SETTINGS;
    } catch (error) {
      console.error('Failed to load site settings:', error);
      return INITIAL_SITE_SETTINGS;
    }
  },

  // Submit Lead
  submitLead: async (leadData) => {
    try {
      const res = await client.post('/contact/', leadData);

      saveLocalLead(res.data.lead || leadData);

      return {
        success: true,
        message:
          res.data.message ||
          'Inquiry submitted successfully!',
        data: res.data,
      };
    } catch (err) {
      console.warn(
        'Django API unavailable, saving lead locally:',
        err
      );

      const saved = saveLocalLead(leadData);

      return {
        success: true,
        message:
          'Thank you! Your project request has been registered with Core Apex. Our engineering lead will contact you within 24 hours.',
        data: saved,
      };
    }
  },

  // Fetch Leads
  getLeads: async () => {
    try {
      const res = await client.get('/leads/');

      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (error) {
      console.error('Failed to load leads:', error);
    }

    return getLocalLeads();
  },
};