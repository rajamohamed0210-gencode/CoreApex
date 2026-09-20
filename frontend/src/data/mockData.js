export const INITIAL_SITE_SETTINGS = {
  site_name: "Core Apex.dev",
  tagline: "Web • App • Cloud • Software Solutions",
  hero_headline: "We Turn Ideas Into Digital Reality.",
  hero_subheading: "We build modern websites, mobile applications, cloud platforms and custom software solutions that help businesses grow.",
  email: "coreapex.dev@gmail.com",
  phone: "+91 7639930013",
  address: "1/137, L. Karungulam, Ramanathapuram, Tamil Nadu – 623527",
  whatsapp_url: "https://wa.me/message/THZ4AI7TCFGLE1",
  founder_name: "Raja Mohamed",
  founder_role: "Founder & CEO",
  founder_bio: "Visionary software architect and founder of Core Apex.dev. Dedicated to engineering robust, scalable software architectures and converting ambitious enterprise ideas into high-performance digital products.",
  github_url: "https://github.com",
  linkedin_url: "https://linkedin.com",
  twitter_url: "https://x.com"
};

export const SERVICES_DATA = [
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    tagline: "Modern business websites, portals and web applications",
    short_description: "Modern business websites, portals and web applications built with React, Next.js, and high-performance frontend frameworks.",
    full_description: "We engineer fast, responsive, and SEO-optimized web applications tailored to your business goals. From engaging corporate showcase portals to complex web apps, we deliver pixel-perfect designs with scalable architectures.",
    icon_name: "Globe",
    features: ["Single Page Applications (SPA)", "SEO & Performance Optimization", "Dynamic Dashboard Interfaces", "PWA & Offline Capability"],
    deliverables: ["Production-ready React codebase", "Responsive cross-browser layouts", "CMS Integration", "Automated CI/CD deployment"],
    tech_stack: ["React", "JavaScript", "Tailwind CSS", "Vite", "HTML5/CSS3"],
    order: 1
  },
  {
    id: 2,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    tagline: "Android and iOS applications built for scale",
    short_description: "Native and cross-platform Android and iOS applications with smooth 60fps animations and intuitive UX.",
    full_description: "We craft captivating mobile experiences for iOS and Android. Our mobile solutions feature fluid offline sync, real-time push notifications, biometric security, and native device hardware integrations.",
    icon_name: "Smartphone",
    features: ["Cross-Platform React Native & Flutter", "Native Performance & 60fps animations", "Offline-first Database Sync", "App Store & Play Store Deployment"],
    deliverables: ["Signed production APK/AAB and IPA builds", "Push notification backend", "Analytics & Crashlytics setup", "App Store optimization"],
    tech_stack: ["React Native", "Flutter", "iOS Swift", "Android Kotlin", "REST APIs"],
    order: 2
  },
  {
    id: 3,
    title: "Custom Software",
    slug: "custom-software",
    tagline: "Business-specific software and automation systems",
    short_description: "Bespoke business-specific software, workflow automations, and enterprise platforms tailored to your operations.",
    full_description: "Eliminate operational bottlenecks with tailor-made software. We architect internal tooling, custom dashboards, inventory workflows, and multi-tenant platforms designed to scale as your enterprise grows.",
    icon_name: "Code",
    features: ["Custom Workflow Automation", "Multi-Tenant Enterprise Architecture", "Role-Based Access Control (RBAC)", "Real-Time Reporting Engines"],
    deliverables: ["Full-stack software architecture", "Interactive admin console", "Audit logging & compliance", "Comprehensive developer docs"],
    tech_stack: ["Python", "Django", "PostgreSQL", "React", "Docker"],
    order: 3
  },
  {
    id: 4,
    title: "Cloud Solutions",
    slug: "cloud-solutions",
    tagline: "Scalable cloud infrastructure and deployment",
    short_description: "High-availability cloud architecture, containerization with Docker, and automated CI/CD deployment pipelines.",
    full_description: "Design, migrate, and maintain high-performance cloud environments on AWS, Google Cloud, or Azure. We implement zero-downtime deployments, auto-scaling clusters, and robust disaster recovery strategies.",
    icon_name: "Cloud",
    features: ["Infrastructure as Code (IaC)", "Docker Container Orchestration", "Auto-Scaling & Load Balancing", "Cloud Security & Compliance"],
    deliverables: ["Production cloud cluster config", "Automated GitHub Actions CI/CD", "Monitoring & alert dashboards", "Backup & disaster recovery plan"],
    tech_stack: ["AWS", "Docker", "PostgreSQL", "Nginx", "Linux / Ubuntu"],
    order: 4
  },
  {
    id: 5,
    title: "API Development",
    slug: "api-development",
    tagline: "Secure REST APIs and third-party integrations",
    short_description: "Secure, documented REST and GraphQL APIs with token authentication, rate limiting, and seamless 3rd-party connections.",
    full_description: "Power your digital ecosystem with clean, modular RESTful APIs. We build resilient backend microservices with Django REST Framework, complete with OpenAPI/Swagger documentation and enterprise-grade security.",
    icon_name: "Server",
    features: ["JWT & OAuth2 Authentication", "OpenAPI & Swagger Documentation", "Webhook Engine & Event Queues", "Rate Limiting & Threat Mitigation"],
    deliverables: ["DRF / FastAPI microservice API", "Interactive Swagger UI documentation", "Automated endpoint test suite", "Postman collection"],
    tech_stack: ["Django REST Framework", "FastAPI", "Python", "PostgreSQL", "Redis"],
    order: 5
  },
  {
    id: 6,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    tagline: "Modern interfaces focused on usability and conversion",
    short_description: "Modern interfaces, user journeys, wireframes, and design systems crafted for high conversion and intuitive use.",
    full_description: "We bridge aesthetics and functionality. By conducting user research and crafting interactive prototypes, we deliver design systems and design assets that make your brand stand out in crowded markets.",
    icon_name: "Palette",
    features: ["Design Systems & Component Libraries", "Interactive High-Fidelity Prototypes", "User Journey & Usability Audits", "Micro-Interactions & Motion Design"],
    deliverables: ["Figma source design tokens", "Component design guidelines", "SVG icon & vector asset kits", "Interactive clickable demo"],
    tech_stack: ["Figma", "Framer Motion", "Tailwind CSS", "Modern Typography", "SVG"],
    order: 6
  }
];

export const SOLUTIONS_DATA = [
  {
    id: 1,
    title: "Business Websites",
    slug: "business-websites",
    industry: "Corporate & Enterprises",
    tagline: "High-impact digital front doors that convert visitors into qualified leads",
    description: "Custom branded websites engineered for speed, search visibility, and seamless lead capture. Packed with interactive cost estimators, dynamic case study galleries, and direct CRM integrations.",
    key_modules: ["Dynamic Lead Capture Engines", "SEO Meta & Schema Automation", "Interactive Service Calculators", "Multi-Language Support"],
    business_benefits: ["3x higher conversion rates", "Sub-second page load times", "Zero maintenance overhead"],
    icon_name: "Briefcase"
  },
  {
    id: 2,
    title: "Ecommerce Platforms",
    slug: "ecommerce-platforms",
    industry: "Retail & Consumer Goods",
    tagline: "Scalable storefronts with frictionless checkout and omnichannel inventory",
    description: "High-volume ecommerce engines powered by React frontends and Django backends. Includes payment gateway integrations (Stripe, Razorpay, PayPal), coupon engines, order fulfillment pipelines, and inventory sync.",
    key_modules: ["Instant Checkout & Payment Gateways", "Live Stock & Inventory Tracking", "Discounts & Automated Coupon Logic", "Customer Loyalty & Review System"],
    business_benefits: ["35% reduction in cart abandonment", "Instant real-time inventory reconciliation", "Support for 100k+ SKUs"],
    icon_name: "ShoppingCart"
  },
  {
    id: 3,
    title: "School Management System",
    slug: "school-management",
    industry: "Education & Academics",
    tagline: "All-in-one digital campus ecosystem for students, teachers, and administration",
    description: "A comprehensive cloud ERP for educational institutions. Manages student admissions, attendance, gradebooks, timetable scheduling, fee collections, and parent-teacher communication portals.",
    key_modules: ["Automated Student Attendance & Bio-sync", "Online Fee Invoicing & Receipts", "Exam Grading & Report Card Generation", "Parent Notification Mobile App"],
    business_benefits: ["80% less paperwork", "Zero fee leakage with automated reminders", "Instant compliance reports"],
    icon_name: "GraduationCap"
  },
  {
    id: 4,
    title: "CRM Systems",
    slug: "crm-systems",
    industry: "Sales & Client Management",
    tagline: "Track leads, accelerate deals, and nurture customer relationships",
    description: "Custom Customer Relationship Management tailored to your exact sales process. Visual Kanban pipelines, email automation, proposal tracking, and automated client follow-ups.",
    key_modules: ["Kanban Deal Stage Pipeline", "Automated Lead Assignment", "Call & Email Activity Logging", "Revenue Forecasting Dashboard"],
    business_benefits: ["40% faster deal closing cycles", "Complete visibility on sales team metrics", "Zero lost customer inquiries"],
    icon_name: "Users"
  },
  {
    id: 5,
    title: "ERP Solutions",
    slug: "erp-solutions",
    industry: "Manufacturing & Logistics",
    tagline: "Unify operations, supply chain, procurement, and financials into one source of truth",
    description: "Enterprise Resource Planning system engineered with Django ORM and PostgreSQL. Connects purchasing, warehouse inventory, manufacturing workflows, invoicing, and audit trails.",
    key_modules: ["Supply Chain & Vendor Management", "Warehouse & Barcode Inventory", "Multi-Currency Ledger & Invoicing", "Role-Based Security & Audit Trail"],
    business_benefits: ["Real-time profitability insights", "Prevent stockouts and over-purchasing", "Audit-ready compliance"],
    icon_name: "Cpu"
  },
  {
    id: 6,
    title: "Custom Software",
    slug: "custom-software-solutions",
    industry: "Proprietary Innovations",
    tagline: "Purpose-built proprietary applications solving complex operational challenges",
    description: "When off-the-shelf software doesn't fit, we build tailored software solutions from the ground up to automate your proprietary business logic with scalable cloud architecture.",
    key_modules: ["Proprietary Algorithm Implementation", "Legacy System Migration & API Wrappers", "Real-Time WebSockets & Telemetry", "Custom Reporting & Business Intelligence"],
    business_benefits: ["100% intellectual property ownership", "Zero per-seat recurring license costs", "Tailored to your exact workflow"],
    icon_name: "Layers"
  }
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "ApexCommerce — NextGen Omnichannel Retail Platform",
    slug: "apex-commerce-platform",
    client: "Apex Retail Global",
    industry: "Retail & Ecommerce",
    category: "web",
    tagline: "High-throughput ecommerce store handling 50,000+ daily orders with sub-second latency.",
    short_description: "Engineered a scalable ecommerce ecosystem with React frontend, Django REST API, and PostgreSQL database.",
    challenge: "The client suffered from severe slowdowns during flash sale events, high checkout drop-offs, and desynchronized inventory across 14 physical warehouse locations.",
    solution: "We architected a headless commerce platform leveraging React + Vite for sub-second UI rendering, coupled with a high-performance Django REST Framework backend backed by Redis caching and PostgreSQL partitioning.",
    results_summary: "4.2x increase in checkout conversion rate, 99.99% uptime during peak holiday sales, and instantaneous inventory updates across all retail stores.",
    technologies: ["React", "Django", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
    metrics: [
      { label: "Conversion Boost", value: "+42%" },
      { label: "Page Load Speed", value: "0.6s" },
      { label: "Peak Uptime", value: "99.99%" },
      { label: "Daily Transactions", value: "50K+" }
    ],
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    website_url: "https://example.com/apex-commerce",
    is_featured: true,
    order: 1
  },
  {
    id: 2,
    title: "EduCore — Cloud Campus & Academy Management ERP",
    slug: "educore-campus-erp",
    client: "Global Academy Consortium",
    industry: "Education",
    category: "software",
    tagline: "Complete digital ERP powering 25,000+ students across multiple institutions.",
    short_description: "Full-scale educational ERP managing admissions, online fee payments, timetables, and mobile gradebooks.",
    challenge: "Manual spreadsheets and fragmented software caused delayed fee collection, administrative overhead, and poor communication between parents and teachers.",
    solution: "Developed a modular Django + PostgreSQL web app with automated payment gateway hooks, automated WhatsApp/SMS alerts, and role-based portals for students, teachers, and principals.",
    results_summary: "Eliminated 95% of manual paperwork and achieved 100% on-time fee recovery with automated payment reminders.",
    technologies: ["Python", "Django", "PostgreSQL", "React", "AWS", "REST API"],
    metrics: [
      { label: "Active Students", value: "25,000+" },
      { label: "Admin Time Saved", value: "70%" },
      { label: "Fee Leakage", value: "0%" },
      { label: "Institutions", value: "12 Campus" }
    ],
    featured_image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    website_url: "https://example.com/educore",
    is_featured: true,
    order: 2
  },
  {
    id: 3,
    title: "PulseFleet — Real-Time Logistics & Telematics App",
    slug: "pulsefleet-logistics-telematics",
    client: "TransLogix International",
    industry: "Logistics & Supply Chain",
    category: "mobile",
    tagline: "Live GPS vehicle tracking, route optimization, and driver telemetry mobile app.",
    short_description: "Cross-platform mobile application connected to IoT telemetry sensors and Django cloud backend.",
    challenge: "Fleet managers lacked real-time visibility on driver status, fuel consumption anomalies, and unexpected delivery delays across 500+ long-haul trucks.",
    solution: "Built a React Native mobile application paired with a FastAPI/Django backend utilizing WebSockets for live sub-second GPS coordinate streaming and route heatmaps.",
    results_summary: "Reduced overall fuel wastage by 18% and improved on-time delivery rate from 81% to 98.4%.",
    technologies: ["React Native", "Python", "FastAPI", "PostgreSQL", "Docker", "WebSockets"],
    metrics: [
      { label: "Fuel Savings", value: "18%" },
      { label: "On-Time Rate", value: "98.4%" },
      { label: "Tracked Vehicles", value: "500+" },
      { label: "Live GPS Ping", value: "< 1 sec" }
    ],
    featured_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    website_url: "https://example.com/pulsefleet",
    is_featured: true,
    order: 3
  },
  {
    id: 4,
    title: "CloudScale — Multi-Region Infrastructure & CI/CD",
    slug: "cloudscale-devops-migration",
    client: "FinTech Matrix Solutions",
    industry: "FinTech & Banking",
    category: "cloud",
    tagline: "Zero-downtime AWS multi-region Kubernetes migration and automated deployment pipeline.",
    short_description: "Enterprise cloud architecture overhaul with auto-scaling, strict security compliance, and disaster recovery.",
    challenge: "Legacy monolithic infrastructure on shared hosting led to random downtime spikes during financial market opening hours and slow 2-day manual release cycles.",
    solution: "Containerized the backend workloads into Docker containers, deployed on AWS with load balancers, configured PostgreSQL automated multi-region replication, and set up GitHub Actions CI/CD pipelines.",
    results_summary: "Deployment frequency increased from bi-weekly to 15+ automated releases daily with 100% zero downtime.",
    technologies: ["AWS", "Docker", "PostgreSQL", "Git", "Python", "Linux"],
    metrics: [
      { label: "Deployment Speed", value: "4 min" },
      { label: "Infra Cost Saved", value: "35%" },
      { label: "Availability", value: "99.999%" },
      { label: "Compliance", value: "SOC2 Ready" }
    ],
    featured_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    website_url: "https://example.com/cloudscale",
    is_featured: true,
    order: 4
  },
  {
    id: 5,
    title: "ZenithPay — Unified Banking API Gateway",
    slug: "zenithpay-api-gateway",
    client: "Zenith Financial Technologies",
    industry: "Banking & Payments",
    category: "api",
    tagline: "High-security payment gateway aggregating 12+ banking protocols into single REST API.",
    short_description: "Engineered a secure microservices API gateway handling millions of monthly financial transactions.",
    challenge: "Aggregating inconsistent banking legacy endpoints with strict security and sub-100ms response guarantees.",
    solution: "Built a Django REST Framework and FastAPI hybrid gateway with JWT bearer tokens, SHA-256 HMAC signature validation, rate limiting, and automated webhook retries.",
    results_summary: "Processed over $20M in monthly transactional volume with zero fraud incidents and 45ms average response time.",
    technologies: ["Django REST Framework", "Python", "PostgreSQL", "FastAPI", "Docker"],
    metrics: [
      { label: "Monthly Volume", value: "$20M+" },
      { label: "Avg Latency", value: "45ms" },
      { label: "Success Rate", value: "99.98%" },
      { label: "Security Score", value: "A+" }
    ],
    featured_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    website_url: "https://example.com/zenithpay",
    is_featured: true,
    order: 5
  },
  {
    id: 6,
    title: "AuraHealth — Patient Telehealth & Clinic Portal",
    slug: "aurahealth-clinic-portal",
    client: "Aura Medical Network",
    industry: "Healthcare & Wellness",
    category: "web",
    tagline: "Modern patient appointment booking, video consultations, and digital health records.",
    short_description: "HIPAA-compliant React + Django portal connecting patients with certified specialists seamlessly.",
    challenge: "Patients experienced long waiting times and missed appointments due to lack of digital scheduling and online consultation options.",
    solution: "Created an accessible, beautiful React UI with interactive calendar scheduling, automated SMS reminders, and integrated WebRTC encrypted video consult rooms.",
    results_summary: "Patient satisfaction score improved to 98% with an 85% reduction in appointment no-shows.",
    technologies: ["React", "Django", "PostgreSQL", "Tailwind CSS", "JavaScript"],
    metrics: [
      { label: "Patient Rating", value: "4.9/5" },
      { label: "No-Shows Dropped", value: "85%" },
      { label: "Consultations", value: "40K+" },
      { label: "Booking Speed", value: "< 30 sec" }
    ],
    featured_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    website_url: "https://example.com/aurahealth",
    is_featured: true,
    order: 6
  }
];

export const TECHNOLOGIES_DATA = [
  { id: 1, name: "Python", category: "backend", icon_name: "python", is_core: true, color: "#3776AB", tag: "Backend & AI" },
  {"id": 2, name: "Django", category: "backend", icon_name: "django", is_core: true, color: "#092E20", tag: "Batteries Included" },
  { id: 3, name: "React", category: "frontend", icon_name: "react", is_core: true, color: "#61DAFB", tag: "Interactive UI" },
  { id: 4, name: "JavaScript", category: "frontend", icon_name: "javascript", is_core: true, color: "#F7DF1E", tag: "ES6+ Standard" },
  { id: 5, name: "PostgreSQL", category: "database", icon_name: "postgresql", is_core: true, color: "#4169E1", tag: "Relational DB" },
  { id: 6, name: "FastAPI", category: "backend", icon_name: "fastapi", is_core: true, color: "#009688", tag: "High Speed ASGI" },
  { id: 7, name: "Node.js", category: "backend", icon_name: "nodejs", is_core: true, color: "#339933", tag: "Async Runtime" },
  { id: 8, name: "AWS", category: "cloud", icon_name: "aws", is_core: true, color: "#FF9900", tag: "Cloud Scale" },
  { id: 9, name: "Docker", category: "cloud", icon_name: "docker", is_core: true, color: "#2496ED", tag: "Containerization" },
  { id: 10, name: "Git", category: "cloud", icon_name: "git", is_core: true, color: "#F05032", tag: "Version Control" },
  { id: 11, name: "REST API", category: "api", icon_name: "rest", is_core: true, color: "#126BFF", tag: "Microservices" }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Understanding your business DNA",
    description: "We deep-dive into your business goals, user personas, market opportunities, and technical requirements before writing a single line of code.",
    icon: "Compass",
    deliverables: ["Product Roadmap", "Tech Architecture Spec", "Feasibility Assessment"]
  },
  {
    step: "02",
    title: "Plan",
    subtitle: "Strategic milestone blueprint",
    description: "We formulate milestone schedules, sprint goals, data models, and API interface contracts for predictable, transparent progress.",
    icon: "ClipboardCheck",
    deliverables: ["Database Schema", "API Contract Blueprint", "Sprint Milestones"]
  },
  {
    step: "03",
    title: "Design",
    subtitle: "Pixel-perfect UX & motion systems",
    description: "Crafting modern, accessible UI layouts, interactive design prototypes, design tokens, and sleek micro-interactions tailored to your brand.",
    icon: "PenTool",
    deliverables: ["Interactive Prototypes", "Design System Tokens", "High-Fidelity Screens"]
  },
  {
    step: "04",
    title: "Develop",
    subtitle: "Engineering clean, scalable code",
    description: "Building production-grade frontend and backend code with React, Django, PostgreSQL, and strict clean-code architectural patterns.",
    icon: "Code2",
    deliverables: ["Clean Modular Codebase", "REST/GraphQL APIs", "Unit & Integration Tests"]
  },
  {
    step: "05",
    title: "Test",
    subtitle: "Automated QA & load stress tests",
    description: "Rigorous testing across browsers, devices, performance benchmarks, and vulnerability scans to ensure bulletproof reliability.",
    icon: "ShieldAlert",
    deliverables: ["Cross-Device QA Report", "Load Benchmark Test", "Security Audit Scan"]
  },
  {
    step: "06",
    title: "Launch",
    subtitle: "Seamless cloud deployment",
    description: "Zero-downtime deployment to AWS/Cloud infrastructure, setting up SSL certificates, CDNs, automated backups, and live telemetry.",
    icon: "Rocket",
    deliverables: ["Production Cloud Deploy", "SSL & CDN Setup", "Monitoring Dashboards"]
  },
  {
    step: "07",
    title: "Support",
    subtitle: "Continuous evolution & maintenance",
    description: "Post-launch warranty, ongoing feature enhancements, database tuning, 24/7 uptime monitoring, and strategic technical support.",
    icon: "LifeBuoy",
    deliverables: ["30-Day Launch Warranty", "SLA Support Contracts", "Performance Tuning"]
  }
];

export const WHY_CORE_APEX = [
  {
    number: "01",
    title: "Business First",
    headline: "We understand the business requirement before writing code.",
    description: "Technology is a tool to generate real business value. We align every architectural decision with your ROI, user retention, and growth metrics."
  },
  {
    number: "02",
    title: "Modern Technology",
    headline: "Modern frameworks and scalable architecture.",
    description: "We leverage industry-leading stacks—React, Django, PostgreSQL, and AWS—to deliver lightning-fast speed, bulletproof security, and effortless scaling."
  },
  {
    number: "03",
    title: "Custom Solutions",
    headline: "No one-size-fits-all templates.",
    description: "Every product is tailored specifically to your workflows. You receive clean, proprietary code engineered exclusively for your enterprise."
  },
  {
    number: "04",
    title: "Long-Term Support",
    headline: "Development, maintenance and continuous improvements.",
    description: "We are your committed technology partner. Beyond launch, we monitor, optimize, and expand your systems as your customer base multiplies."
  }
];

export const FAQS_DATA = [
  {
    id: 1,
    question: "What is the typical timeline for developing a custom software or web application?",
    answer: "Timelines depend on project scope. A standard modern business website or MVP web application typically takes 2 to 4 weeks. Full-scale custom software, CRM/ERP platforms, or multi-platform mobile apps generally take 6 to 12 weeks. We work in 2-week agile sprints with working software delivered after each sprint.",
    category: "development"
  },
  {
    id: 2,
    question: "Why does Core Apex recommend React + Django for enterprise software?",
    answer: "React provides unmatched speed, component modularity, and an ultra-smooth user experience on the frontend. Django provides a battle-tested, secure, and rapid backend with powerful ORM, built-in admin dashboard, and rock-solid REST Framework scalability. Combined with PostgreSQL, it creates an unbreakable foundation.",
    category: "development"
  },
  {
    id: 3,
    question: "How do you handle source code ownership and intellectual property?",
    answer: "You own 100% of the intellectual property (IP), source code, design assets, and database architecture upon project completion. We provide full Git repository handover and complete deployment documentation.",
    category: "general"
  },
  {
    id: 4,
    question: "Do you provide ongoing maintenance and post-launch technical support?",
    answer: "Yes! All projects include a complimentary 30-day post-launch warranty period for bug fixes and adjustments. We also offer dedicated monthly SLA support plans covering continuous security patching, server monitoring, feature enhancements, and database backups.",
    category: "support"
  },
  {
    id: 5,
    question: "Can Core Apex integrate with our existing legacy systems or third-party APIs?",
    answer: "Absolutely. We specialize in building secure RESTful API wrappers, Webhook listeners, and database connectors that bridge your existing CRM, ERP, payment gateways, and third-party SaaS tools smoothly.",
    category: "development"
  },
  {
    id: 6,
    question: "What is the engagement process to start a project with Core Apex?",
    answer: "Simply fill out our project inquiry form or schedule a discovery call. We analyze your requirements within 24 hours, conduct a technical scoping session, present a clear proposal with milestones and fixed pricing, and kick off development immediately upon approval.",
    category: "pricing"
  }
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Raja Mohamed",
    role: "Founder & CEO",
    bio: "Software Architect with extensive expertise in full-stack web, cloud, and enterprise systems. Passionate about transforming ideas into high-impact digital realities.",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com"
  },
  {
    id: 2,
    name: "Alex Chen",
    role: "Principal Cloud & DevOps Architect",
    bio: "Specialist in high-availability AWS deployments, Docker container orchestration, and automated CI/CD pipelines with zero downtime.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com"
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Lead UI/UX & Motion Designer",
    bio: "Crafting premium, intuitive interfaces with micro-interactions and user-centric design systems that elevate tech brands.",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com"
  }
];
