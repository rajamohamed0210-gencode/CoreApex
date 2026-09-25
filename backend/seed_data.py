import os
import sys
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.core.models import SiteSetting, Technology, FAQ, TeamMember
from apps.services.models import Service, Solution
from apps.projects.models import Project
from apps.contacts.models import ContactLead
from apps.testimonials.models import Testimonial

User = get_user_model()

# SEED_IF_EMPTY=1 makes the script safe to run on every deploy (see render.yaml):
# it still creates the superuser, but skips the content seed whenever demo data
# already exists, so live contact leads and admin edits are never overwritten.
SEED_IF_EMPTY = os.getenv('SEED_IF_EMPTY', '').strip().lower() in ('1', 'true', 'yes', 'on')

def seed_all():
    print("[*] Starting Core Apex.dev database seeding...")

    # 1. Superuser
    # Deploying? Override the local defaults with real secrets before running:
    #   DJANGO_SUPERUSER_PASSWORD='<strong-password>' python seed_data.py
    su_username = os.getenv('DJANGO_SUPERUSER_USERNAME') or 'admin'
    su_email = os.getenv('DJANGO_SUPERUSER_EMAIL') or 'admin@coreapex.dev'
    su_password = os.getenv('DJANGO_SUPERUSER_PASSWORD') or 'admin123'
    if su_password == 'admin123':
        print("[!] WARNING: using the default password 'admin123'. Set "
              "DJANGO_SUPERUSER_PASSWORD (or change it in /admin) before going public.")
    if not User.objects.filter(username=su_username).exists():
        User.objects.create_superuser(su_username, su_email, su_password)
        print(f"[+] Superuser '{su_username}' created")
    else:
        print(f"[i] Superuser '{su_username}' already exists")

    # 1b. Idempotency guard for deploys
    if SEED_IF_EMPTY and SiteSetting.objects.exists():
        print("[i] SEED_IF_EMPTY is set and content already exists — skipping the "
              "content seed to protect live leads and admin edits.")
        print("[SUCCESS] Nothing to do.")
        return

    # 2. Site Settings
    SiteSetting.objects.all().delete()
    SiteSetting.objects.create(
        site_name="Core Apex.dev",
        tagline="Web • App • Cloud • Software Solutions",
        hero_headline="We Turn Ideas Into Digital Reality.",
        hero_subheading="We build modern websites, mobile applications, cloud platforms and custom software solutions that help businesses grow.",
        email="coreapex.dev@gmail.com",
        phone="+91 7639930013",
        address="1/137, L. Karungulam, Ramanathapuram, Tamil Nadu – 623527",
        whatsapp_url="https://wa.me/message/THZ4AI7TCFGLE1",
        founder_name="Raja Mohamed",
        founder_role="Founder & CEO",
        founder_bio="Visionary software architect and founder of Core Apex.dev. Dedicated to engineering robust, scalable software architectures and converting ambitious enterprise ideas into high-performance digital products.",
        github_url="https://github.com",
        linkedin_url="https://linkedin.com",
        twitter_url="https://x.com"
    )
    print("[+] Site Settings populated")

    # 3. Technologies
    Technology.objects.all().delete()
    techs = [
        {"name": "Python", "category": "backend", "icon_name": "python", "description": "High-level, versatile programming language for robust backends & AI", "is_core": True, "order": 1},
        {"name": "Django", "category": "backend", "icon_name": "django", "description": "Batteries-included web framework for perfectionists with deadlines", "is_core": True, "order": 2},
        {"name": "React", "category": "frontend", "icon_name": "react", "description": "Declarative, component-driven UI library for high-speed SPAs", "is_core": True, "order": 3},
        {"name": "JavaScript", "category": "frontend", "icon_name": "javascript", "description": "Modern ES6+ JavaScript powering interactive client experiences", "is_core": True, "order": 4},
        {"name": "PostgreSQL", "category": "database", "icon_name": "postgresql", "description": "World's most advanced open-source relational SQL database", "is_core": True, "order": 5},
        {"name": "FastAPI", "category": "backend", "icon_name": "fastapi", "description": "Modern, fast ASGI web framework for building microservices & APIs", "is_core": True, "order": 6},
        {"name": "Node.js", "category": "backend", "icon_name": "nodejs", "description": "Event-driven asynchronous JavaScript runtime for high-throughput I/O", "is_core": True, "order": 7},
        {"name": "AWS", "category": "cloud", "icon_name": "aws", "description": "Amazon Web Services scalable cloud infrastructure & serverless deploy", "is_core": True, "order": 8},
        {"name": "Docker", "category": "cloud", "icon_name": "docker", "description": "Containerization for seamless parity between dev and production", "is_core": True, "order": 9},
        {"name": "Git", "category": "cloud", "icon_name": "git", "description": "Distributed version control and enterprise CI/CD pipelines", "is_core": True, "order": 10},
        {"name": "REST API", "category": "api", "icon_name": "rest", "description": "Standardized, secure, scalable RESTful API architecture", "is_core": True, "order": 11},
    ]
    for t in techs:
        Technology.objects.create(**t)
    print("[+] Technologies populated (11 core technologies)")

    # 4. Services (The 6 core services)
    Service.objects.all().delete()
    services_data = [
        {
            "title": "Web Development",
            "slug": "web-development",
            "tagline": "Modern business websites, portals and web applications",
            "short_description": "Modern business websites, portals and web applications built with React, Next.js, and high-performance frontend frameworks.",
            "full_description": "We engineer fast, responsive, and SEO-optimized web applications tailored to your business goals. From engaging corporate showcase portals to complex web apps, we deliver pixel-perfect designs with scalable architectures.",
            "icon_name": "Globe",
            "features": ["Single Page Applications (SPA)", "SEO & Performance Optimization", "Dynamic Dashboard Interfaces", "PWA & Offline Capability"],
            "deliverables": ["Production-ready React codebase", "Responsive cross-browser layouts", "CMS Integration", "Automated CI/CD deployment"],
            "tech_stack": ["React", "JavaScript", "Tailwind CSS", "Vite", "HTML5/CSS3"],
            "order": 1,
            "is_featured": True
        },
        {
            "title": "Mobile App Development",
            "slug": "mobile-app-development",
            "tagline": "Android and iOS applications built for scale",
            "short_description": "Native and cross-platform Android and iOS applications with smooth 60fps animations and intuitive UX.",
            "full_description": "We craft captivating mobile experiences for iOS and Android. Our mobile solutions feature fluid offline sync, real-time push notifications, biometric security, and native device hardware integrations.",
            "icon_name": "Smartphone",
            "features": ["Cross-Platform React Native & Flutter", "Native Performance & 60fps animations", "Offline-first Database Sync", "App Store & Play Store Deployment"],
            "deliverables": ["Signed production APK/AAB and IPA builds", "Push notification backend", "Analytics & Crashlytics setup", "App Store optimization"],
            "tech_stack": ["React Native", "Flutter", "iOS Swift", "Android Kotlin", "REST APIs"],
            "order": 2,
            "is_featured": True
        },
        {
            "title": "Custom Software",
            "slug": "custom-software",
            "tagline": "Business-specific software and automation systems",
            "short_description": "Bespoke business-specific software, workflow automations, and enterprise platforms tailored to your operations.",
            "full_description": "Eliminate operational bottlenecks with tailor-made software. We architect internal tooling, custom dashboards, inventory workflows, and multi-tenant platforms designed to scale as your enterprise grows.",
            "icon_name": "Code",
            "features": ["Custom Workflow Automation", "Multi-Tenant Enterprise Architecture", "Role-Based Access Control (RBAC)", "Real-Time Reporting Engines"],
            "deliverables": ["Full-stack software architecture", "Interactive admin console", "Audit logging & compliance", "Comprehensive developer docs"],
            "tech_stack": ["Python", "Django", "PostgreSQL", "React", "Docker"],
            "order": 3,
            "is_featured": True
        },
        {
            "title": "Cloud Solutions",
            "slug": "cloud-solutions",
            "tagline": "Scalable cloud infrastructure and deployment",
            "short_description": "High-availability cloud architecture, containerization with Docker, and automated CI/CD deployment pipelines.",
            "full_description": "Design, migrate, and maintain high-performance cloud environments on AWS, Google Cloud, or Azure. We implement zero-downtime deployments, auto-scaling clusters, and robust disaster recovery strategies.",
            "icon_name": "Cloud",
            "features": ["Infrastructure as Code (IaC)", "Docker Container Orchestration", "Auto-Scaling & Load Balancing", "Cloud Security & Compliance"],
            "deliverables": ["Production cloud cluster config", "Automated GitHub Actions CI/CD", "Monitoring & alert dashboards", "Backup & disaster recovery plan"],
            "tech_stack": ["AWS", "Docker", "PostgreSQL", "Nginx", "Linux / Ubuntu"],
            "order": 4,
            "is_featured": True
        },
        {
            "title": "API Development",
            "slug": "api-development",
            "tagline": "Secure REST APIs and third-party integrations",
            "short_description": "Secure, documented REST and GraphQL APIs with token authentication, rate limiting, and seamless 3rd-party connections.",
            "full_description": "Power your digital ecosystem with clean, modular RESTful APIs. We build resilient backend microservices with Django REST Framework, complete with OpenAPI/Swagger documentation and enterprise-grade security.",
            "icon_name": "Server",
            "features": ["JWT & OAuth2 Authentication", "OpenAPI & Swagger Documentation", "Webhook Engine & Event Queues", "Rate Limiting & Threat Mitigation"],
            "deliverables": ["DRF / FastAPI microservice API", "Interactive Swagger UI documentation", "Automated endpoint test suite", "Postman collection"],
            "tech_stack": ["Django REST Framework", "FastAPI", "Python", "PostgreSQL", "Redis"],
            "order": 5,
            "is_featured": True
        },
        {
            "title": "UI/UX Design",
            "slug": "ui-ux-design",
            "tagline": "Modern interfaces focused on usability and conversion",
            "short_description": "Modern interfaces, user journeys, wireframes, and design systems crafted for high conversion and intuitive use.",
            "full_description": "We bridge aesthetics and functionality. By conducting user research and crafting interactive prototypes, we deliver design systems and design assets that make your brand stand out in crowded markets.",
            "icon_name": "Palette",
            "features": ["Design Systems & Component Libraries", "Interactive High-Fidelity Prototypes", "User Journey & Usability Audits", "Micro-Interactions & Motion Design"],
            "deliverables": ["Figma source design tokens", "Component design guidelines", "SVG icon & vector asset kits", "Interactive clickable demo"],
            "tech_stack": ["Figma", "Framer Motion", "Tailwind CSS", "Modern Typography", "SVG"],
            "order": 6,
            "is_featured": True
        },
    ]
    for s in services_data:
        Service.objects.create(**s)
    print("[+] Services populated (6 core services)")

    # 5. Solutions (6 targeted industry solutions)
    Solution.objects.all().delete()
    solutions_data = [
        {
            "title": "Business Websites",
            "slug": "business-websites",
            "industry": "Corporate & Enterprises",
            "tagline": "High-impact digital front doors that convert visitors into qualified leads",
            "description": "Custom branded websites engineered for speed, search visibility, and seamless lead capture. Packed with interactive cost estimators, dynamic case study galleries, and direct CRM integrations.",
            "key_modules": ["Dynamic Lead Capture Engines", "SEO Meta & Schema Automation", "Interactive Service Calculators", "Multi-Language Support"],
            "business_benefits": ["3x higher conversion rates", "Sub-second page load times", "Zero maintenance overhead"],
            "icon_name": "Briefcase",
            "order": 1
        },
        {
            "title": "Ecommerce Platforms",
            "slug": "ecommerce-platforms",
            "industry": "Retail & Consumer Goods",
            "tagline": "Scalable storefronts with frictionless checkout and omnichannel inventory",
            "description": "High-volume ecommerce engines powered by React frontends and Django backends. Includes payment gateway integrations (Stripe, Razorpay, PayPal), coupon engines, order fulfillment pipelines, and inventory sync.",
            "key_modules": ["Instant Checkout & Payment Gateways", "Live Stock & Inventory Tracking", "Discounts & Automated Coupon Logic", "Customer Loyalty & Review System"],
            "business_benefits": ["35% reduction in cart abandonment", "Instant real-time inventory reconciliation", "Support for 100k+ SKUs"],
            "icon_name": "ShoppingCart",
            "order": 2
        },
        {
            "title": "School Management System",
            "slug": "school-management",
            "industry": "Education & Academics",
            "tagline": "All-in-one digital campus ecosystem for students, teachers, and administration",
            "description": "A comprehensive cloud ERP for educational institutions. Manages student admissions, attendance, gradebooks, timetable scheduling, fee collections, and parent-teacher communication portals.",
            "key_modules": ["Automated Student Attendance & Bio-sync", "Online Fee Invoicing & Receipts", "Exam Grading & Report Card Generation", "Parent Notification Mobile App"],
            "business_benefits": ["80% less paperwork", "Zero fee leakage with automated reminders", "Instant compliance reports"],
            "icon_name": "GraduationCap",
            "order": 3
        },
        {
            "title": "CRM Systems",
            "slug": "crm-systems",
            "industry": "Sales & Client Management",
            "tagline": "Track leads, accelerate deals, and nurture customer relationships",
            "description": "Custom Customer Relationship Management tailored to your exact sales process. Visual Kanban pipelines, email automation, proposal tracking, and automated client follow-ups.",
            "key_modules": ["Kanban Deal Stage Pipeline", "Automated Lead Assignment", "Call & Email Activity Logging", "Revenue Forecasting Dashboard"],
            "business_benefits": ["40% faster deal closing cycles", "Complete visibility on sales team metrics", "Zero lost customer inquiries"],
            "icon_name": "Users",
            "order": 4
        },
        {
            "title": "ERP Solutions",
            "slug": "erp-solutions",
            "industry": "Manufacturing & Logistics",
            "tagline": "Unify operations, supply chain, procurement, and financials into one source of truth",
            "description": "Enterprise Resource Planning system engineered with Django ORM and PostgreSQL. Connects purchasing, warehouse inventory, manufacturing workflows, invoicing, and audit trails.",
            "key_modules": ["Supply Chain & Vendor Management", "Warehouse & Barcode Inventory", "Multi-Currency Ledger & Invoicing", "Role-Based Security & Audit Trail"],
            "business_benefits": ["Real-time profitability insights", "Prevent stockouts and over-purchasing", "Audit-ready compliance"],
            "icon_name": "Cpu",
            "order": 5
        },
        {
            "title": "Custom Software",
            "slug": "custom-software-solutions",
            "industry": "Proprietary Innovations",
            "tagline": "Purpose-built proprietary applications solving complex operational challenges",
            "description": "When off-the-shelf software doesn't fit, we build tailored software solutions from the ground up to automate your proprietary business logic with scalable cloud architecture.",
            "key_modules": ["Proprietary Algorithm Implementation", "Legacy System Migration & API Wrappers", "Real-Time WebSockets & Telemetry", "Custom Reporting & Business Intelligence"],
            "business_benefits": ["100% intellectual property ownership", "Zero per-seat recurring license costs", "Tailored to your exact workflow"],
            "icon_name": "Layers",
            "order": 6
        },
    ]
    for sol in solutions_data:
        Solution.objects.create(**sol)
    print("[+] Solutions populated (6 targeted solutions)")

    # 6. Projects & Case Studies
    Project.objects.all().delete()
    projects_data = [
        {
            "title": "ApexCommerce — NextGen Omnichannel Retail Platform",
            "slug": "apex-commerce-platform",
            "client": "Apex Retail Global",
            "industry": "Retail & Ecommerce",
            "category": "web",
            "tagline": "High-throughput ecommerce store handling 50,000+ daily orders with sub-second latency.",
            "short_description": "Engineered a scalable ecommerce ecosystem with React frontend, Django REST API, and PostgreSQL database.",
            "challenge": "The client suffered from severe slowdowns during flash sale events, high checkout drop-offs, and desynchronized inventory across 14 physical warehouse locations.",
            "solution": "We architected a headless commerce platform leveraging React + Vite for sub-second UI rendering, coupled with a high-performance Django REST Framework backend backed by Redis caching and PostgreSQL partitioning.",
            "results_summary": "4.2x increase in checkout conversion rate, 99.99% uptime during peak holiday sales, and instantaneous inventory updates across all retail stores.",
            "technologies": ["React", "Django", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
            "metrics": [
                {"label": "Conversion Boost", "value": "+42%"},
                {"label": "Page Load Speed", "value": "0.6s"},
                {"label": "Peak Uptime", "value": "99.99%"},
                {"label": "Daily Transactions", "value": "50K+"}
            ],
            "featured_image": "/images/project-web-platform.jpg",
            "gallery_images": [
                    "/images/project-web-platform.jpg",
                    "/images/services-ui-ux-design.jpg"
                ],
            "website_url": "https://example.com/apex-commerce",
            "is_featured": True,
            "order": 1
        },
        {
            "title": "EduCore — Cloud Campus & Academy Management ERP",
            "slug": "educore-campus-erp",
            "client": "Global Academy Consortium",
            "industry": "Education",
            "category": "software",
            "tagline": "Complete digital ERP powering 25,000+ students across multiple institutions.",
            "short_description": "Full-scale educational ERP managing admissions, online fee payments, timetables, and mobile gradebooks.",
            "challenge": "Manual spreadsheets and fragmented software caused delayed fee collection, administrative overhead, and poor communication between parents and teachers.",
            "solution": "Developed a modular Django + PostgreSQL web app with automated payment gateway hooks, automated WhatsApp/SMS alerts, and role-based portals for students, teachers, and principals.",
            "results_summary": "Eliminated 95% of manual paperwork and achieved 100% on-time fee recovery with automated payment reminders.",
            "technologies": ["Python", "Django", "PostgreSQL", "React", "AWS", "REST API"],
            "metrics": [
                {"label": "Active Students", "value": "25,000+"},
                {"label": "Admin Time Saved", "value": "70%"},
                {"label": "Fee Leakage", "value": "0%"},
                {"label": "Institutions", "value": "12 Campus"}
            ],
            "featured_image": "/images/project-erp-software.jpg",
            "gallery_images": [
                    "/images/project-erp-software.jpg",
                    "/images/services-custom-software.jpg"
                ],
            "website_url": "https://example.com/educore",
            "is_featured": True,
            "order": 2
        },
        {
            "title": "PulseFleet — Real-Time Logistics & Telematics App",
            "slug": "pulsefleet-logistics-telematics",
            "client": "TransLogix International",
            "industry": "Logistics & Supply Chain",
            "category": "mobile",
            "tagline": "Live GPS vehicle tracking, route optimization, and driver telemetry mobile app.",
            "short_description": "Cross-platform mobile application connected to IoT telemetry sensors and Django cloud backend.",
            "challenge": "Fleet managers lacked real-time visibility on driver status, fuel consumption anomalies, and unexpected delivery delays across 500+ long-haul trucks.",
            "solution": "Built a React Native mobile application paired with a FastAPI/Django backend utilizing WebSockets for live sub-second GPS coordinate streaming and route heatmaps.",
            "results_summary": "Reduced overall fuel wastage by 18% and improved on-time delivery rate from 81% to 98.4%.",
            "technologies": ["React Native", "Python", "FastAPI", "PostgreSQL", "Docker", "WebSockets"],
            "metrics": [
                {"label": "Fuel Savings", "value": "18%"},
                {"label": "On-Time Rate", "value": "98.4%"},
                {"label": "Tracked Vehicles", "value": "500+"},
                {"label": "Live GPS Ping", "value": "< 1 sec"}
            ],
            "featured_image": "/images/project-mobile-app.jpg",
            "gallery_images": [
                    "/images/project-mobile-app.jpg",
                    "/images/services-mobile-app.jpg"
                ],
            "website_url": "https://example.com/pulsefleet",
            "is_featured": True,
            "order": 3
        },
        {
            "title": "CloudScale — Multi-Region Infrastructure & CI/CD",
            "slug": "cloudscale-devops-migration",
            "client": "FinTech Matrix Solutions",
            "industry": "FinTech & Banking",
            "category": "cloud",
            "tagline": "Zero-downtime AWS multi-region Kubernetes migration and automated deployment pipeline.",
            "short_description": "Enterprise cloud architecture overhaul with auto-scaling, strict security compliance, and disaster recovery.",
            "challenge": "Legacy monolithic infrastructure on shared hosting led to random downtime spikes during financial market opening hours and slow 2-day manual release cycles.",
            "solution": "Containerized the backend workloads into Docker containers, deployed on AWS with load balancers, configured PostgreSQL automated multi-region replication, and set up GitHub Actions CI/CD pipelines.",
            "results_summary": "Deployment frequency increased from bi-weekly to 15+ automated releases daily with 100% zero downtime.",
            "technologies": ["AWS", "Docker", "PostgreSQL", "Git", "Python", "Linux"],
            "metrics": [
                {"label": "Deployment Speed", "value": "4 min"},
                {"label": "Infra Cost Saved", "value": "35%"},
                {"label": "Availability", "value": "99.999%"},
                {"label": "Compliance", "value": "SOC2 Ready"}
            ],
            "featured_image": "/images/project-cloud-api.jpg",
            "gallery_images": [
                    "/images/project-cloud-api.jpg",
                    "/images/services-cloud-solutions.jpg"
                ],
            "website_url": "https://example.com/cloudscale",
            "is_featured": True,
            "order": 4
        },
        {
            "title": "ZenithPay — Unified Banking API Gateway",
            "slug": "zenithpay-api-gateway",
            "client": "Zenith Financial Technologies",
            "industry": "Banking & Payments",
            "category": "api",
            "tagline": "High-security payment gateway aggregating 12+ banking protocols into single REST API.",
            "short_description": "Engineered a secure microservices API gateway handling millions of monthly financial transactions.",
            "challenge": "Aggregating inconsistent banking legacy endpoints with strict security and sub-100ms response guarantees.",
            "solution": "Built a Django REST Framework and FastAPI hybrid gateway with JWT bearer tokens, SHA-256 HMAC signature validation, rate limiting, and automated webhook retries.",
            "results_summary": "Processed over $20M in monthly transactional volume with zero fraud incidents and 45ms average response time.",
            "technologies": ["Django REST Framework", "Python", "PostgreSQL", "FastAPI", "Docker"],
            "metrics": [
                {"label": "Monthly Volume", "value": "$20M+"},
                {"label": "Avg Latency", "value": "45ms"},
                {"label": "Success Rate", "value": "99.98%"},
                {"label": "Security Score", "value": "A+"}
            ],
            "featured_image": "/images/services-api-development.jpg",
            "gallery_images": [
                    "/images/services-api-development.jpg",
                    "/images/project-cloud-api.jpg"
                ],
            "website_url": "https://example.com/zenithpay",
            "is_featured": True,
            "order": 5
        },
        {
            "title": "AuraHealth — Patient Telehealth & Clinic Portal",
            "slug": "aurahealth-clinic-portal",
            "client": "Aura Medical Network",
            "industry": "Healthcare & Wellness",
            "category": "web",
            "tagline": "Modern patient appointment booking, video consultations, and digital health records.",
            "short_description": "HIPAA-compliant React + Django portal connecting patients with certified specialists seamlessly.",
            "challenge": "Patients experienced long waiting times and missed appointments due to lack of digital scheduling and online consultation options.",
            "solution": "Created an accessible, beautiful React UI with interactive calendar scheduling, automated SMS reminders, and integrated WebRTC encrypted video consult rooms.",
            "results_summary": "Patient satisfaction score improved to 98% with an 85% reduction in appointment no-shows.",
            "technologies": ["React", "Django", "PostgreSQL", "Tailwind CSS", "JavaScript"],
            "metrics": [
                {"label": "Patient Rating", "value": "4.9/5"},
                {"label": "No-Shows Dropped", "value": "85%"},
                {"label": "Consultations", "value": "40K+"},
                {"label": "Booking Speed", "value": "< 30 sec"}
            ],
            "featured_image": "/images/services-ui-ux-design.jpg",
            "gallery_images": [
                    "/images/services-ui-ux-design.jpg",
                    "/images/project-web-platform.jpg"
                ],
            "website_url": "https://example.com/aurahealth",
            "is_featured": True,
            "order": 6
        },
    ]
    for p in projects_data:
        Project.objects.create(**p)
    print("[+] Projects populated (6 comprehensive case studies)")

    # 7. Testimonials
    Testimonial.objects.all().delete()
    testimonials_data = [
        {
            "client_name": "Arun Kumar",
            "client_role": "Managing Director",
            "company_name": "Velox Logistics India",
            "avatar_url": "/images/avatar-arun-kumar.jpg",
            "content": "Core Apex transformed our legacy tracking system into a modern cloud platform. Raja Mohamed and the engineering team delivered exceptional technical precision, cutting our operational dispatch times in half.",
            "rating": 5,
            "project_title": "PulseFleet Logistics App",
            "is_featured": True,
            "order": 1
        },
        {
            "client_name": "Sarah Jenkins",
            "client_role": "Chief Technology Officer",
            "company_name": "OmniRetail UK",
            "avatar_url": "/images/avatar-sarah-jenkins.jpg",
            "content": "The React + Django stack built by Core Apex is pure engineering art. Our platform handled Black Friday traffic with 100% stability. Their commitment to clean architecture and code quality is world-class.",
            "rating": 5,
            "project_title": "ApexCommerce Retail Platform",
            "is_featured": True,
            "order": 2
        },
        {
            "client_name": "Karthik Subramanian",
            "client_role": "Director of Administration",
            "company_name": "Apex Global Schools",
            "avatar_url": "/images/avatar-karthik-subramanian.jpg",
            "content": "Our school ERP was completed ahead of schedule. The administrative staff, teachers, and parents have had zero complaints. Core Apex is our long-term technology partner for all digital initiatives.",
            "rating": 5,
            "project_title": "EduCore Campus ERP",
            "is_featured": True,
            "order": 3
        },
        {
            "client_name": "Elena Rostova",
            "client_role": "VP of Product",
            "company_name": "FinScale Systems",
            "avatar_url": "/images/avatar-elena-rostova.jpg",
            "content": "From the initial discovery call to architecture and launch, Core Apex proved they understand the business requirements before writing a single line of code. Highly recommended!",
            "rating": 5,
            "project_title": "ZenithPay API Gateway",
            "is_featured": True,
            "order": 4
        }
    ]
    for test in testimonials_data:
        Testimonial.objects.create(**test)
    print("[+] Testimonials populated (4 verified client testimonials)")

    # 8. FAQs
    FAQ.objects.all().delete()
    faqs_data = [
        {
            "question": "What is the typical timeline for developing a custom software or web application?",
            "answer": "Timelines depend on project scope. A standard modern business website or MVP web application typically takes 2 to 4 weeks. Full-scale custom software, CRM/ERP platforms, or multi-platform mobile apps generally take 6 to 12 weeks. We work in 2-week agile sprints with working software delivered after each sprint.",
            "category": "development",
            "order": 1
        },
        {
            "question": "Why does Core Apex recommend React + Django for enterprise software?",
            "answer": "React provides unmatched speed, component modularity, and an ultra-smooth user experience on the frontend. Django provides a battle-tested, secure, and rapid backend with powerful ORM, built-in admin dashboard, and rock-solid REST Framework scalability. Combined with PostgreSQL, it creates an unbreakable foundation.",
            "category": "development",
            "order": 2
        },
        {
            "question": "How do you handle source code ownership and intellectual property?",
            "answer": "You own 100% of the intellectual property (IP), source code, design assets, and database architecture upon project completion. We provide full Git repository handover and complete deployment documentation.",
            "category": "general",
            "order": 3
        },
        {
            "question": "Do you provide ongoing maintenance and post-launch technical support?",
            "answer": "Yes! All projects include a complimentary 30-day post-launch warranty period for bug fixes and adjustments. We also offer dedicated monthly SLA support plans covering continuous security patching, server monitoring, feature enhancements, and database backups.",
            "category": "support",
            "order": 4
        },
        {
            "question": "Can Core Apex integrate with our existing legacy systems or third-party APIs?",
            "answer": "Absolutely. We specialize in building secure RESTful API wrappers, Webhook listeners, and database connectors that bridge your existing CRM, ERP, payment gateways, and third-party SaaS tools smoothly.",
            "category": "development",
            "order": 5
        },
        {
            "question": "What is the engagement process to start a project with Core Apex?",
            "answer": "Simply fill out our project inquiry form or schedule a discovery call. We analyze your requirements within 24 hours, conduct a technical scoping session, present a clear proposal with milestones and fixed pricing, and kick off development immediately upon approval.",
            "category": "pricing",
            "order": 6
        },
    ]
    for f in faqs_data:
        FAQ.objects.create(**f)
    print("[+] FAQs populated (6 categorized FAQs)")

    # 9. Team Members
    TeamMember.objects.all().delete()
    team_data = [
        {
            "name": "Raja Mohamed",
            "role": "Founder & CEO",
            "bio": "Software Architect with extensive expertise in full-stack web, cloud, and enterprise systems. Passionate about transforming ideas into high-impact digital realities.",
            "avatar_url": "/images/team-founder.jpg",
            "linkedin_url": "https://linkedin.com",
            "github_url": "https://github.com",
            "order": 1
        },
        {
            "name": "Alex Chen",
            "role": "Principal Cloud & DevOps Architect",
            "bio": "Specialist in high-availability AWS deployments, Docker container orchestration, and automated CI/CD pipelines with zero downtime.",
            "avatar_url": "/images/team-cloud-architect.jpg",
            "linkedin_url": "https://linkedin.com",
            "github_url": "https://github.com",
            "order": 2
        },
        {
            "name": "Sophia Martinez",
            "role": "Lead UI/UX & Motion Designer",
            "bio": "Crafting premium, intuitive interfaces with micro-interactions and user-centric design systems that elevate tech brands.",
            "avatar_url": "/images/team-designer.jpg",
            "linkedin_url": "https://linkedin.com",
            "github_url": "https://github.com",
            "order": 3
        }
    ]
    for member in team_data:
        TeamMember.objects.create(**member)
    print("[+] Team members populated")

    # 10. Sample Leads for CRM pipeline demonstration
    ContactLead.objects.all().delete()
    sample_leads = [
        {
            "name": "Praveen Nair",
            "email": "praveen@sunriselogistics.in",
            "phone": "+91 98410 11223",
            "company": "Sunrise Logistics",
            "service": "crm_erp",
            "budget": "15k_50k",
            "project_details": "We need an integrated ERP to manage 8 warehouses across South India with live barcode scanning and inventory forecasting.",
            "status": "discussion",
            "admin_notes": "Initial technical scoping call completed on Sept 15. Preparing architectural proposal."
        },
        {
            "name": "David Miller",
            "email": "david@nexusfintech.com",
            "phone": "+1 415 555 2678",
            "company": "Nexus FinTech Corp",
            "service": "api_dev",
            "budget": "50k_plus",
            "project_details": "Building a high-throughput payment aggregation API with OAuth2 and PCI-DSS compliance.",
            "status": "proposal_sent",
            "admin_notes": "Proposal sent for 3-month milestone contract. Client reviewing with legal."
        },
        {
            "name": "Meera Krishnan",
            "email": "meera@bloomretail.com",
            "phone": "+91 99620 33445",
            "company": "Bloom Organic Retail",
            "service": "ecommerce",
            "budget": "5k_15k",
            "project_details": "Looking for a fast React ecommerce store with custom subscription box billing and Razorpay integration.",
            "status": "new",
            "admin_notes": "Received inquiry via homepage form. Need to assign engineer."
        }
    ]
    for lead in sample_leads:
        ContactLead.objects.create(**lead)
    print("[+] Sample Contact Leads populated with CRM status pipeline")

    print("\n[SUCCESS] Core Apex.dev database seeded successfully with production data!")

if __name__ == '__main__':
    seed_all()

