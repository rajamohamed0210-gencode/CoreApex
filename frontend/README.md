# Core Apex.dev — Frontend

Marketing site for **Core Apex.dev** (web • app • cloud • software solutions), built with
React 19, Vite, Tailwind CSS and Framer Motion, backed by a Django REST API.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the production bundle
npm run lint       # oxlint
```

The dev server binds to `0.0.0.0` and proxies `/api` and `/media` to the Django backend
(`http://127.0.0.1:8000`), so browser code never references `localhost` directly.

### Backend (for live content)

```bash
cd ../backend
python -m venv .venv && .venv/bin/pip install -r requirements.txt   # (requirements.txt is UTF-16)
cp .env.example .env                                                # set SECRET_KEY + ALLOWED_HOSTS
.venv/bin/python manage.py migrate
.venv/bin/python seed_data.py
.venv/bin/python manage.py runserver 0.0.0.0:8000
```

If the API is unreachable, the site degrades gracefully: services, projects, technologies
and site settings fall back to the content in `src/data/mockData.js`.

### Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | `/api/v1` (proxied) | Absolute API base URL when the API lives on another host |

---

## Project structure

```
src/
├── components/
│   ├── motion/            # Reusable animation primitives
│   │   ├── Reveal.jsx         # Reveal + Stagger + StaggerItem (scroll-triggered)
│   │   ├── AnimatedCounter.jsx# Count-up numbers on scroll into view
│   │   ├── Marquee.jsx        # Seamless infinite marquee (CSS-driven)
│   │   ├── TiltCard.jsx       # 3D pointer tilt + glare
│   │   ├── Parallax.jsx       # Scroll-linked parallax + image zoom
│   │   ├── AuroraBackground.jsx# Ambient animated gradient/grid backdrop
│   │   ├── SectionHeading.jsx # Shared animated section header
│   │   ├── ScrollProgress.jsx # Reading-progress bar + back-to-top ring
│   │   └── PageTransition.jsx # Route-level enter/exit transition
│   ├── SmartImage.jsx     # Lazy image: shimmer placeholder + blur-up + fallback
│   ├── Navbar.jsx         # Scroll-aware nav, animated mega dropdowns, mobile drawer
│   ├── Footer.jsx         # Animated footer with newsletter micro-interaction
│   └── FloatingWhatsApp.jsx, ProjectModal.jsx, OrbitTech.jsx, …
├── sections/              # Home page sections (hero, services, portfolio, stats, …)
├── pages/                 # Route components (lazy-loaded)
├── data/images.js         # Single registry of bundled brand imagery
├── services/api.js        # Axios wrapper + graceful fallbacks
└── index.css              # Design tokens, utilities, reduced-motion handling
```

## Imagery

All artwork lives in `public/images/` and is registered in `src/data/images.js`
(`serviceImage(slug)`, `solutionImage(slug)`, `projectImage(index)`). Swap a file or update
the registry entry to change a visual everywhere at once.

## Animation system

* **Scroll reveals** — `Reveal` / `Stagger` fade, slide, zoom and blur elements into view once.
* **Micro-interactions** — card lift, gradient border glow (`.card-interactive`), hover sheen
  (`.card-sheen`), animated underlines (`.link-underline`), icon rotations and arrow slides.
* **Ambient motion** — aurora orbs, floating badges, orbiting tech ring, animated CI/CD
  terminal, count-up statistics, marquees and scroll-linked progress rails.
* **Page transitions** — `AnimatePresence` wraps routed pages for a soft cross-fade.
* **Accessibility** — everything respects `prefers-reduced-motion` (global CSS guard plus
  `useReducedMotion` fallbacks in each primitive).

## Performance notes

* Route-level code splitting via `React.lazy` + `Suspense`.
* Images are lazy-loaded with `loading="lazy"` / `decoding="async"`, except the hero which is
  prioritised (`fetchPriority="high"`).
* Fonts are self-hosted with `@fontsource` (no third-party requests, no FOUT blocking).
* Sticky nav, cards and sections use transform/opacity-only animations to stay compositor-friendly.
