// All site copy lives here. Components import from this file only.
// (data/projects.ts and data/skills.ts are the pre-rebuild data, kept but unused.)

/* ── Feature flags ─────────────────────────────────────────────────────── */
export const flags = {
  // Plate → card 01 handoff between sections 01 and 02.
  // true:  a ghost shape morphs the top plate into card 01 (PlateHandoff.tsx).
  // false: the plate stays and the deck tilts in.
  // ?handoff=0 / ?handoff=1 in the URL overrides this for one visit.
  // enableFlipHandoff: false,  (default until step 7)
  enableFlipHandoff: true,
};

/* ── Meta / identity ───────────────────────────────────────────────────── */
export const site = {
  name: "Kaung Khant Kyaw",
  initials: "KKK",
  role: "Full-Stack Developer",
  location: "Bangkok, Thailand",
  email: "kaungkhant.luke.dev@gmail.com",
  github: "https://github.com/Kaungkhantk3",
  linkedin: "https://www.linkedin.com/in/kaung-khant-kyaw-66064627b/",
  resume: {
    href: "/resume.pdf",
    download: "Kaung_Khant_Kyaw_Resume.pdf",
    label: "Resume",
  },
};

/* ── Nav ───────────────────────────────────────────────────────────────── */
export const nav = [
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ── Hero ──────────────────────────────────────────────────────────────── */
export type Stat = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
};

export const hero = {
  status: "Open to full-time · Bangkok · UTC+7",
  // Rendered as headline + accent-coloured headlineEnd.
  headline: "I build the layers users never see",
  headlineEnd: ".",
  paragraph:
    "Full-stack developer, backend-first. I turn requirements into production systems — REST APIs, auth, relational data — and the React front ends on top. Right now I build and run InnoNet's company website in production.",
  // Plate labels, top → bottom. Colours are assigned by position in the UI.
  plates: ["client / react", "api / node · fastapi", "data / postgres · mysql"],
  stats: [
    { value: 4, label: "Apps shipped" },
    { value: 15, suffix: "+", label: "REST endpoints" },
    { value: 3.86, decimals: 2, label: "GPAX (First Honours)" },
    { value: 60, suffix: "+", label: "Students mentored" },
  ] satisfies Stat[],
  cta: {
    primary: { label: "View work", href: "#work" },
    secondary: { label: "Contact", href: "#contact" },
  },
};

/* ── Marquee ───────────────────────────────────────────────────────────── */
export const marquee = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Express",
  "FastAPI",
  "PostgreSQL",
  "MySQL",
  "Prisma",
  "Docker",
  "JWT + RBAC",
  "Tailwind CSS",
];

/* ── 01 Stack ──────────────────────────────────────────────────────────── */
export type StackLayer = {
  label: string;
  // Extra chip rows shown under the main one (e.g. tooling under Data & Infra).
  chips: string[];
  sub?: { label: string; chips: string[] };
};

export const stack = {
  index: "01",
  label: "Stack",
  // title: "Technologies I use to build complete web applications.",  (step 2 copy)
  title: "End to end, layer by layer.",
  // Order matches the plates, top → bottom.
  layers: [
    {
      label: "Frontend",
      chips: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5"],
    },
    {
      label: "Backend & APIs",
      chips: ["Python", "Node.js", "Express", "FastAPI", "REST", "JWT", "RBAC"],
    },
    {
      label: "Data & Infra",
      chips: ["MySQL", "PostgreSQL", "Prisma", "SQL", "Docker", "AWS"],
      sub: {
        label: "Tooling",
        chips: ["Git", "GitHub", "GitHub Actions", "Vercel", "Postman", "Jest"],
      },
    },
  ] satisfies StackLayer[],
};

/* ── 02 Selected work ──────────────────────────────────────────────────── */
export type ProjectStatus =
  | { kind: "live"; label: string } // green
  | { kind: "dev"; label: string }; // amber

export type Project = {
  index: string;
  title: string;
  context?: string;
  status?: ProjectStatus;
  summary: string;
  bullets: string[];
  stack: string[];
  buildLog: string[];
  links: { live?: string; source?: string };
};

export const work = {
  index: "02",
  label: "Selected work",
  title: "Selected work",
  linkLabels: { live: "Visit site", source: "Source" },
  overviewLabel: "All projects",
  indexLabel: "Projects",
  /** Screen-reader text for the odometer. */
  counterLabel: (n: number, total: number) => `Project ${n} of ${total}`,
  projects: [
    {
      index: "01",
      title: "InnoNet",
      status: { kind: "live", label: "live" },
      summary:
        "Built and deployed the company website on my own, from architecture to launch.",
      bullets: [
        "SEO infrastructure: sitemap and metadata",
        "Resend contact form with client + server validation, IP rate limiting and honeypot spam detection",
        "Next.js upgrade closing high-severity advisories before launch",
      ],
      stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "Resend", "Vercel"],
      buildLog: [
        "$ deploy innonet",
        "✓ next build · ts strict",
        "✓ sitemap.xml + metadata",
        "✓ rate limit + honeypot",
        "→ innonetconsulting.com",
      ],
      links: { live: "https://innonetconsulting.com" },
    },
    {
      index: "02",
      title: "Speech-to-Text Tool",
      status: { kind: "dev", label: "in development · internal" },
      summary:
        "Internal web app that turns long interview recordings into speaker-separated, downloadable transcripts.",
      bullets: [
        "Handles recordings over an hour long, uploaded as .mp4",
        "Speaker diarization separates the interviewer from the respondent",
        "Built on ElevenLabs Scribe v2, chosen after testing transcription accuracy on Burmese audio",
        "Downloadable text output; multilingual support planned",
      ],
      // TODO(stack): add the rest of the Speech-to-Text stack chips.
      stack: ["ElevenLabs Scribe v2"],
      buildLog: [
        "$ transcribe interview.mp4",
        "✓ audio extracted",
        "✓ 2 speakers separated",
        "→ transcript.txt",
      ],
      // Private repo: no live link, no source link.
      links: {},
    },
    {
      index: "03",
      title: "API Sentinel",
      context: "Personal project",
      summary:
        "API monitoring platform running scheduled HTTP/HTTPS health checks.",
      bullets: [
        "Checks every 30s, logging status codes, response times and errors to PostgreSQL",
        "Alerts after three consecutive failures or a response-time breach",
        "SSRF protection blocking private, loopback, link-local and reserved IPs; pytest suites for alerting and URL safety",
      ],
      stack: ["FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "APScheduler", "Docker"],
      buildLog: [
        "$ GET /health · every 30s",
        "✗ ✗ ✗ → alert raised",
        "✓ SSRF guard",
        "✓ pytest passed",
      ],
      // Source only. No live/demo link and no "live" badge.
      links: { source: "https://github.com/Kaungkhantk3/API-TM-Tool" },
    },
    {
      index: "04",
      title: "RentMate",
      context: "Senior project · Mae Fah Luang University",
      summary: "Peer-to-peer camping-gear rental marketplace.",
      bullets: [
        "Listings, booking requests, notifications and payment verification",
        "JWT + RBAC separating admin and user flows",
        "Real-time chat between borrowers and lenders",
      ],
      stack: ["Node.js", "Express", "MySQL", "JWT", "Tailwind"],
      buildLog: [
        "$ npm start · rentmate",
        "✓ jwt + rbac · admin | user",
        "✓ booking → payment verification",
        "✓ chat · borrower ↔ lender",
      ],
      links: { source: "https://github.com/Kaungkhantk3" },
    },
    {
      index: "05",
      title: "Admin Dashboard",
      context: "Internship · MFessolutions",
      summary: "Internal panel for restaurants, user accounts and media.",
      bullets: [
        "Four roles, Super Admin to Viewer, on JWT + RBAC",
        "Multer uploads for logos and banners",
        "Thai/English with i18next",
      ],
      stack: ["React", "Express", "MySQL", "JWT", "Multer", "i18next"],
      buildLog: [
        "$ seed roles",
        "✓ 4 roles · super admin → viewer",
        "✓ multer · logos + banners",
        "✓ i18next · th | en",
      ],
      links: { source: "https://github.com/Kaungkhantk3" },
    },
    {
      index: "06",
      title: "Valentine Card Creator",
      context: "Internship · MFessolutions",
      summary:
        "Card builder with photo uploads, custom text styling and shareable links.",
      bullets: [
        "SVG and HTML5 Canvas masking with unlock animations",
        "Express + Prisma APIs for user-generated content",
        "Dockerised",
      ],
      stack: ["React", "TypeScript", "Express", "MySQL", "Prisma", "Docker"],
      buildLog: [
        "$ docker compose up",
        "✓ express + prisma api",
        "✓ svg + canvas mask",
        "→ shareable link ready",
      ],
      links: { source: "https://github.com/Kaungkhantk3" },
    },
  ] satisfies Project[] as Project[],
};

/* ── 03 Experience ("changelog") ───────────────────────────────────────── */
export type ChangelogEntry = {
  tag: "work" | "edu";
  date: string;
  title: string;
  org: string;
  location?: string;
  items: string[];
  chips?: string[];
};

export const experience = {
  index: "03",
  label: "Experience",
  title: "Changelog",
  languagesLabel: "Languages",
  entries: [
    {
      tag: "work",
      date: "May 2026 – Present",
      title: "Junior Software Developer",
      org: "InnoNet Healthcare Recruitment Group",
      location: "Remote · UK hours",
      items: [
        "Independently building and maintaining the company website (Next.js, Vercel): architecture, front end and SEO, from stakeholder requirements to shipped features.",
        "Technical support across UK business hours, troubleshooting hardware, software and workflow issues.",
      ],
    },
    {
      tag: "work",
      date: "Jan 2026 – Apr 2026",
      title: "Full-Stack Developer Intern",
      org: "MFessolutions Co., Ltd",
      location: "Bangkok, Thailand",
      items: [
        "Engineered and shipped four production-ready web applications, including corporate SPAs, admin dashboards, a bilingual directory platform, and an interactive card creator.",
        "Replaced manual data entry by integrating Google Sheets APIs to automate business data synchronization.",
        "Architected 15+ REST endpoints using Node.js, Express, Prisma, and MySQL.",
        "Secured dashboard access for multiple user roles with JWT authentication and role-based access control (RBAC).",
        "Standardized development environments and deployment pipelines with Docker, Docker Compose, and GitLab workflows.",
      ],
    },
    {
      tag: "work",
      date: "Aug 2023 – Apr 2025",
      title: "Teaching Assistant",
      org: "Mae Fah Luang University",
      location: "Chiang Rai, Thailand",
      items: [
        "Mentored 60+ students per semester, providing lab guidance, debugging support, and one-on-one programming instruction.",
      ],
    },
    {
      tag: "edu",
      date: "Aug 2022 – Jun 2026",
      title: "Bachelor of Engineering in Computer Engineering",
      org: "Mae Fah Luang University",
      items: [],
      chips: ["GPAX 3.86 / 4.00", "First Honours Degree"],
    },
  ] satisfies ChangelogEntry[] as ChangelogEntry[],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Burmese", level: "Native" },
    { name: "Thai", level: "Learning" },
  ],
};

/* ── 04 Contact ────────────────────────────────────────────────────────── */
export const contact = {
  index: "04",
  label: "Contact",
  // title: "Open to full-stack developer opportunities.",  (step 2 copy)
  // Rendered as title + accent-coloured titleEnd.
  title: "Let's ship something",
  titleEnd: ".",
  // Paragraph under the terminal, removed in step 3b:
  // paragraph:
  //   "The best way to reach me is by email or LinkedIn. I'm open to full-stack developer opportunities involving modern web applications, backend APIs, database-driven systems, and product-focused engineering work.",
  command: `$ echo "let's build something" | mail ${site.email}`,
  response: "← 200 OK · usually replies within a day",
  links: [
    { label: "Email", href: `mailto:${site.email}` },
    { label: "GitHub", href: site.github, external: true },
    { label: "LinkedIn", href: site.linkedin, external: true },
  ],
};

/* ── Footer ────────────────────────────────────────────────────────────── */
export const footer = {
  copyright: "© 2026 Kaung Khant Kyaw. All rights reserved.",
  builtWith: "Built with React · TypeScript · Tailwind · GSAP · Motion",
};
