/**
 * Central registry for all locally bundled brand imagery.
 * Keeping paths in one place makes it trivial to swap in real client
 * screenshots later without touching component code.
 */
export const IMAGES = {
  heroAbstract: '/images/hero-abstract.jpg',
  aboutTeam: '/images/about-team.jpg',

  services: {
    'web-development': '/images/services-web-development.jpg',
    'mobile-app-development': '/images/services-mobile-app.jpg',
    'custom-software': '/images/services-custom-software.jpg',
    'cloud-solutions': '/images/services-cloud-solutions.jpg',
    'api-development': '/images/services-api-development.jpg',
    'ui-ux-design': '/images/services-ui-ux-design.jpg',
  },

  solutions: {
    'business-websites': '/images/services-web-development.jpg',
    'ecommerce-platforms': '/images/project-web-platform.jpg',
    'school-management': '/images/services-custom-software.jpg',
    'crm-systems': '/images/project-erp-software.jpg',
    'erp-solutions': '/images/project-erp-software.jpg',
    'custom-software': '/images/services-cloud-solutions.jpg',
  },
};

export const PROJECT_IMAGES = [
  '/images/project-web-platform.jpg',
  '/images/project-mobile-app.jpg',
  '/images/project-erp-software.jpg',
  '/images/project-cloud-api.jpg',
  '/images/services-api-development.jpg',
  '/images/services-ui-ux-design.jpg',
];

const FALLBACK = IMAGES.heroAbstract;

export const serviceImage = (slug) => IMAGES.services[slug] || FALLBACK;

export const solutionImage = (slug) => IMAGES.solutions[slug] || FALLBACK;

export const projectImage = (index = 0, fallback) =>
  PROJECT_IMAGES[index % PROJECT_IMAGES.length] || fallback || FALLBACK;

export default IMAGES;
