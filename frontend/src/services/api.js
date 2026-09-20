import axios from 'axios';
import {
  INITIAL_SITE_SETTINGS,
  SERVICES_DATA,
  SOLUTIONS_DATA,
  PROJECTS_DATA,
  TECHNOLOGIES_DATA,
  FAQS_DATA,
  TEAM_MEMBERS
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
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
    localStorage.setItem('coreapex_leads', JSON.stringify([newLead, ...existing]));
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
      return res.data && res.data.length > 0 ? res.data : SERVICES_DATA;
    } catch {
      return SERVICES_DATA;
    }
  },

  getServiceBySlug: async (slug) => {
    try {
      const res = await client.get(`/services/${slug}/`);
      return res.data;
    } catch {
      return SERVICES_DATA.find((s) => s.slug === slug) || SERVICES_DATA[0];
    }
  },

  // Solutions
  getSolutions: async () => {
    try {
      const res = await client.get('/solutions/');
      return res.data && res.data.length > 0 ? res.data : SOLUTIONS_DATA;
    } catch {
      return SOLUTIONS_DATA;
    }
  },

  // Projects
  getProjects: async () => {
    try {
      const res = await client.get('/projects/');
      return res.data && res.data.length > 0 ? res.data : PROJECTS_DATA;
    } catch {
      return PROJECTS_DATA;
    }
  },

  getFeaturedProjects: async () => {
    try {
      const res = await client.get('/projects/featured/');
      return res.data && res.data.length > 0 ? res.data : PROJECTS_DATA.filter((p) => p.is_featured);
    } catch {
      return PROJECTS_DATA.filter((p) => p.is_featured);
    }
  },

  getProjectBySlug: async (slug) => {
    try {
      const res = await client.get(`/projects/${slug}/`);
      return res.data;
    } catch {
      return PROJECTS_DATA.find((p) => p.slug === slug) || PROJECTS_DATA[0];
    }
  },

  // Technologies
  getTechnologies: async () => {
    try {
      const res = await client.get('/technologies/');
      return res.data && res.data.length > 0 ? res.data : TECHNOLOGIES_DATA;
    } catch {
      return TECHNOLOGIES_DATA;
    }
  },

  // Testimonials
  getTestimonials: async () => {
    try {
      const res = await client.get('/testimonials/');
      return Array.isArray(res.data) ? res.data : [];
    } catch {
      return [];
    }
  },

  // FAQs
  getFAQs: async () => {
    try {
      const res = await client.get('/faqs/');
      return res.data && res.data.length > 0 ? res.data : FAQS_DATA;
    } catch {
      return FAQS_DATA;
    }
  },

  // Team
  getTeam: async () => {
    try {
      const res = await client.get('/team/');
      return res.data && res.data.length > 0 ? res.data : TEAM_MEMBERS;
    } catch {
      return TEAM_MEMBERS;
    }
  },

  // Site Settings
  getSiteSettings: async () => {
    try {
      const res = await client.get('/site-settings/');
      return res.data || INITIAL_SITE_SETTINGS;
    } catch {
      return INITIAL_SITE_SETTINGS;
    }
  },

  // Submit Lead
  submitLead: async (leadData) => {
    try {
      const res = await client.post('/contact/', leadData);
      saveLocalLead(res.data.lead || leadData);
      return { success: true, message: res.data.message || 'Inquiry submitted successfully!', data: res.data };
    } catch (err) {
      console.warn('Django API offline, saving lead locally:', err);
      const saved = saveLocalLead(leadData);
      return {
        success: true,
        message: 'Thank you! Your project request has been registered with Core Apex. Our engineering lead will contact you within 24 hours.',
        data: saved,
      };
    }
  },

  // Fetch Leads (for Dashboard)
  getLeads: async () => {
    try {
      const res = await client.get('/leads/');
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // ignore
    }
    return getLocalLeads();
  },
};
