export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  stack: string[];
  highlights: string[];
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Valentine Card Creation Web Application",
    subtitle: "Internship Project",
    description:
      "Built a full-stack web application that lets users create customizable Valentine’s Day cards with photo uploads, dynamic shape masking, text styling, and image export.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MySQL",
      "Prisma",
      "Docker",
    ],
    highlights: [
      "Designed and implemented RESTful APIs for card creation, retrieval, and editing",
      "Built dynamic UI rendering with SVG and Canvas-based image masking",
      "Implemented image upload handling and export-to-image functionality",
      "Designed relational database schema using Prisma ORM and MySQL",
      "Structured backend architecture with Express and modular routing",
    ],
    github: "https://github.com/Kaungkhantk3",
    featured: true,
  },
  {
    title: "Admin Dashboard & Management System",
    subtitle: "Internship Project",
    description:
      "Contributed to an internal admin panel for managing users, content, and system activity with authentication, role control, and dashboard analytics.",
    stack: ["React", "JavaScript", "Node.js", "Express", "MySQL", "JWT"],
    highlights: [
      "Implemented authentication using JWT",
      "Built role-based access control for Admin and User roles",
      "Developed dashboard UI for system statistics and analytics",
      "Collaborated with senior developer on feature architecture and code improvements",
    ],
    github: "https://github.com/Kaungkhantk3",
    featured: true,
  },
  {
    title: "RentMate",
    subtitle: "Senior Project",
    description:
      "Developed a full-stack peer-to-peer rental marketplace for camping equipment with a complete rental and payment workflow system.",
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
      "Designed and implemented RESTful APIs for users, items, rentals, payments, reviews, chat, and notifications",
      "Built JWT-based authentication and role-based access control",
      "Implemented secure password hashing using bcrypt",
      "Developed a multi-step rental workflow from request to refund and completion",
      "Built real-time chat between borrowers and lenders",
      "Developed admin panel for user, item, payment, and rental monitoring",
    ],
    github: "https://github.com/Kaungkhantk3",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather app that fetches live city weather data and shows key conditions in a clean UI.",
    stack: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    highlights: [
      "Search by city",
      "Display weather conditions and temperature",
      "Responsive interface",
    ],
    github: "https://github.com/Kaungkhantk3/Weather_Dashboard",
    live: "https://kaungkhantk3.github.io/Weather_Dashboard/",
  },
];
