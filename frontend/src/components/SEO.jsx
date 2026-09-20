import React, { useEffect } from 'react';

export default function SEO({
  title = "Core Apex.dev — Web • App • Cloud • Software Solutions",
  description = "We turn ideas into digital reality. Core Apex builds modern websites, mobile applications, cloud platforms and custom software solutions that help businesses grow.",
  keywords = "Web Development Company, Software Development Company, React Development, Django Development, Mobile App Development, Custom Software Development, Cloud Solutions, Tamil Nadu Software Company",
  canonical = "https://coreapex.dev/"
}) {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonical, true);

    // Schema.org Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://coreapex.dev/#organization",
          "name": "Core Apex.dev",
          "url": "https://coreapex.dev",
          "logo": "https://coreapex.dev/logo.png",
          "description": "High-end software engineering company specializing in React, Django, mobile, cloud and custom software systems.",
          "founder": {
            "@type": "Person",
            "name": "Raja Mohamed",
            "jobTitle": "Founder & CEO"
          },
          "sameAs": [
            "https://wa.me/message/THZ4AI7TCFGLE1",
            "https://github.com",
            "https://linkedin.com",
            "https://x.com"
          ]
        },
        {
          "@type": ["LocalBusiness", "ProfessionalService"],
          "@id": "https://coreapex.dev/#localbusiness",
          "name": "Core Apex.dev",
          "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
          "telephone": "+917639930013",
          "email": "coreapex.dev@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1/137, L. Karungulam",
            "addressLocality": "Ramanathapuram",
            "addressRegion": "Tamil Nadu",
            "postalCode": "623527",
            "addressCountry": "IN"
          },
          "priceRange": "$$$",
          "openingHours": "Mo-Fr 09:00-19:00"
        }
      ]
    };

    let scriptTag = document.getElementById('core-apex-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'core-apex-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);

  }, [title, description, keywords, canonical]);

  return null;
}
