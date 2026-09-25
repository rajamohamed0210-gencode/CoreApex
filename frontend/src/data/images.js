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

  team: {
    'raja-mohamed': '/images/team-founder.jpg',
    'alex-chen': '/images/team-cloud-architect.jpg',
    'sophia-martinez': '/images/team-designer.jpg',
  },

  testimonials: {
    'arun-kumar': '/images/avatar-arun-kumar.jpg',
    'sarah-jenkins': '/images/avatar-sarah-jenkins.jpg',
    'karthik-subramanian': '/images/avatar-karthik-subramanian.jpg',
    'elena-rostova': '/images/avatar-elena-rostova.jpg',
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
const FALLBACK_AVATAR = IMAGES.team['raja-mohamed'];

const slugifyName = (name = '') =>
  String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Resolve an avatar for a person.
 *
 * Priority: media the API manages itself (uploaded files / bundled paths),
 * then the portrait bundled with the site, then whatever remote URL the API
 * supplied. This keeps portraits working even when third-party image hosts
 * are unreachable.
 */
const resolveAvatar = (map, name, remoteUrl) => {
  const isManaged = remoteUrl && (remoteUrl.startsWith('/media') || remoteUrl.startsWith('/images'));
  if (isManaged) return remoteUrl;
  return map[slugifyName(name)] || remoteUrl || FALLBACK_AVATAR;
};

export const teamAvatar = (name, remoteUrl) => resolveAvatar(IMAGES.team, name, remoteUrl);

export const testimonialAvatar = (name, remoteUrl) =>
  resolveAvatar(IMAGES.testimonials, name, remoteUrl);

export const serviceImage = (slug) => IMAGES.services[slug] || FALLBACK;

export const solutionImage = (slug) => IMAGES.solutions[slug] || FALLBACK;

export const projectImage = (index = 0, fallback) =>
  PROJECT_IMAGES[index % PROJECT_IMAGES.length] || fallback || FALLBACK;

/**
 * Pick the image for a project record coming from the API.
 * Paths the API manages itself (/media uploads, bundled /images paths) win;
 * otherwise we fall back to bundled artwork instead of hotlinking a
 * third-party host that may be unreachable.
 */
export const projectImageSrc = (project = {}, index = 0) => {
  const remote = project.featured_image;
  const isManaged = remote && (remote.startsWith('/media') || remote.startsWith('/images'));
  return isManaged ? remote : projectImage(index);
};

export default IMAGES;
