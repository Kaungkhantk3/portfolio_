export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  stack: string[];
  highlights: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  // Single image for card cover (secondary + other cards)
  image?: string;
  // Multiple images for hero carousel
  images?: string[];
};

export const projects: Project[] = [
  // ─── Featured (internship + senior) ───────────────────────────────────────

  {
    title: "Valentine Card Creator",
    subtitle: "Internship Project · MFessolutions Co., Ltd",
    description:
      "Full-stack web application for creating customizable Valentine cards with photo uploads, SVG/Canvas masking, interactive unlock animations, and shareable unique links.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MySQL",
      "Prisma ORM",
      "Docker",
    ],
    highlights: [
      "Engineered a full-stack interactive platform featuring image uploads, customizable text styling, and shareable links",
      "Solved complex frontend rendering challenges by implementing SVG and HTML5 Canvas masking alongside dynamic unlock animations",
      "Containerized the application with Docker and designed backend APIs using Express.js and Prisma ORM to reliably manage user-generated content",
    ],
    github: "https://github.com/Kaungkhantk3",
    featured: true,
    images: [
      "/images/valentine-1.png",
      "/images/valentine-2.png",
      "/images/valentine-3.png",
    ],
  },

  {
    title: "Admin Dashboard & Management System",
    subtitle: "Internship Project · MFessolutions Co., Ltd",
    description:
      "Internal admin panel for managing restaurants, user accounts, and media uploads with multi-role access control, analytics, and multilingual support.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "JWT",
      "Tailwind CSS",
      "Multer",
      "i18next",
    ],
    highlights: [
      "Built RBAC for Super Admin, Admin, Editor, and Viewer roles using JWT",
      "Developed dashboard UI with system statistics, recent activity, and restaurant/project management",
      "Implemented image upload and management (Multer) for logos and banners",
      "Added multi-language support (Thai/English) with i18next",
    ],
    github: "https://github.com/Kaungkhantk3",
    featured: true,
    image: "/images/admin-dashboard.png",
  },

  {
    title: "RentMate — P2P Rental Marketplace",
    subtitle: "Senior Project · Mae Fah Luang University",
    description:
      "Full-stack peer-to-peer rental marketplace for camping equipment with a complete multi-step rental workflow, real-time chat, and admin panel.",
    stack: [
      "Node.js",
      "Express",
      "MySQL",
      "JWT",
      "bcrypt",
      "Tailwind CSS",
      "JavaScript",
    ],
    highlights: [
      "Architected a full-stack marketplace to manage item listings, booking requests, real-time notifications, and payment verification workflows",
      "Isolated administrative and user workflows by engineering a secure authorization layer using JWT and role-based access control (RBAC)",
      "Designed scalable RESTful APIs and integrated backend services to streamline transaction processing",
      "Built real-time chat system between borrowers and lenders with admin platform management",
    ],
    github: "https://github.com/Kaungkhantk3",
    featured: true,
    image: "/images/rentmate.png",
  },

  // ─── Other internship projects ────────────────────────────────────────────

  {
    title: "Bangkok Centers Directory",
    subtitle: "Internship Project · MFessolutions Co., Ltd",
    description:
      "Bilingual directory platform for Bangkok's sport, recreation, library, and youth centers with search, pagination, and Google Sheets API integration.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Google Sheets API",
      "i18next",
      "Tailwind CSS",
    ],
    highlights: [
      "Built multilingual support (Thai/English) with i18next",
      "Integrated Google Sheets API as a data source for center listings",
      "Implemented search and pagination across multiple center categories",
    ],
    github: "https://github.com/Kaungkhantk3",
    image: "/images/bangkok-centers.png",
  },

  {
    title: "Corporate SPA — SWPC Co., Ltd",
    subtitle: "Internship Project · MFessolutions Co., Ltd",
    description:
      "Corporate single-page application website with smooth page transitions, contact form validation, and bilingual Thai/English content.",
    stack: ["React", "TypeScript", "Framer Motion", "i18next", "Tailwind CSS"],
    highlights: [
      "Implemented smooth page transitions and scroll animations using Framer Motion",
      "Built contact form with client-side validation",
      "Added Thai/English internationalization with i18next",
    ],
    github: "https://github.com/Kaungkhantk3",
    image: "/images/swpc-website.png",
  },

  {
    title: "Corporate SPA — MFessolutions Co., Ltd",
    subtitle: "Internship Project · MFessolutions Co., Ltd",
    description:
      "Official company website built as a single-page application with animated sections, multilingual support, and responsive design.",
    stack: ["React", "TypeScript", "Framer Motion", "i18next", "Tailwind CSS"],
    highlights: [
      "Delivered fully responsive SPA with animated section transitions",
      "Implemented i18n for Thai and English content",
      "Built reusable component library for consistent design across sections",
    ],
    github: "https://github.com/Kaungkhantk3",
    image: "/images/mfessolutions-website.png",
  },

  // ─── Personal projects ────────────────────────────────────────────────────

  {
    title: "API Sentinel",
    subtitle: "Personal Project",
    description:
      "Full-stack API monitoring platform running scheduled HTTP/HTTPS health checks, logging status codes and response times, and alerting on failures or SSRF-risky targets.",
    stack: [
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "PostgreSQL",
      "APScheduler",
      "Docker",
    ],
    highlights: [
      "Built scheduled HTTP/HTTPS health checks (default 30s interval) logging status codes, response times, and error details to PostgreSQL",
      "Implemented alert logic flagging endpoints after three consecutive failed checks or a response-time threshold breach, covered by a dedicated pytest suite",
      "Built SSRF protections rejecting requests to localhost, private, loopback, link-local, and reserved IP ranges, with redirects disabled during checks and verified by a separate URL-safety test suite",
      "Secured the API with signed bearer-token authentication and Pydantic request/response validation; containerized with Docker and deployed to Railway with a managed PostgreSQL service",
    ],
    github: "https://github.com/Kaungkhantk3/API-TM-Tool",
    live: "https://api-tm-tool-production.up.railway.app/docs",
    image: "/images/api.png",
  },

  {
    title: "Weather Dashboard",
    description:
      "Responsive weather app that fetches live city weather data and displays conditions, temperature, and humidity in a clean UI.",
    stack: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    highlights: [
      "Search by city name with live OpenWeather API fetch",
      "Displays weather conditions, temperature, and humidity",
      "Fully responsive across all screen sizes",
    ],
    github: "https://github.com/Kaungkhantk3/Weather_Dashboard",
    live: "https://kaungkhantk3.github.io/Weather_Dashboard/",
    image: "/images/weather-dashboard.png",
  },
];
