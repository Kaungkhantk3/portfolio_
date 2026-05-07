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
      "Designed RESTful APIs for card creation, retrieval, editing, and sharing",
      "Built SVG/Canvas-based image masking with photo upload, resize, rotation, and shape selection",
      "Implemented shareable unique links and interactive unlock animations (drag-and-drop, scratch-to-reveal)",
      "Designed relational database schema with Prisma ORM and MySQL; containerized with Docker Compose",
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
      "Designed RESTful APIs for users, items, rentals, payments, reviews, chat, and notifications",
      "Multi-step workflow: request → payment → approval → transfer → return → refund → completion",
      "Implemented secure JWT authentication, bcrypt hashing, and admin/user role separation",
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
