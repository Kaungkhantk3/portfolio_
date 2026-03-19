# Kaung Khant Kyaw — Portfolio

> Personal portfolio website showcasing my full-stack development projects, skills, and experience.

[![Live Site](https://img.shields.io/badge/Live%20Site-portfolio--kaung--khant--kyaw.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-kaung-khant-kyaw.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-latest-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 🔗 Live Site

**[https://portfolio-kaung-khant-kyaw.vercel.app/](https://portfolio-kaung-khant-kyaw.vercel.app/)**

---

## ✨ Features

- **Glassmorphism UI** — frosted glass cards, ambient gradient blobs, and subtle noise grain overlay
- **Fully responsive** — mobile-first layout that works across all screen sizes
- **Scroll-aware navbar** — active section highlighting and blur-on-scroll effect
- **Framer Motion animations** — staggered entrance reveals and smooth transitions
- **Skills grouped by category** — Frontend, Backend & Database, Tooling & DevOps
- **Timeline experience section** — vertical connector with glowing dots
- **Tailwind v4** — CSS-first configuration using `@theme` tokens, no config file needed
- **Vercel Analytics** — page view tracking via `@vercel/analytics`
- **GitHub CI/CD** — auto-deploys on every push to `main`

---

## 🗂 Sections

| Section    | Description                                           |
| ---------- | ----------------------------------------------------- |
| Hero       | Introduction, availability status, and key stats      |
| About      | Six focus areas as glassmorphism cards                |
| Skills     | Tech stack grouped by category with brand icons       |
| Projects   | Featured hero project, secondary cards, and more work |
| Experience | Timeline of internship and teaching assistant roles   |
| Contact    | Email, GitHub, and LinkedIn links                     |

---

## 🛠 Tech Stack

| Layer      | Technology                      |
| ---------- | ------------------------------- |
| Framework  | React 18 + TypeScript           |
| Styling    | Tailwind CSS v4                 |
| Animations | Framer Motion                   |
| Icons      | Lucide React + React Icons      |
| Fonts      | Syne (display) + DM Sans (body) |
| Deployment | Vercel (GitHub CI/CD)           |
| Analytics  | Vercel Analytics                |

---

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Kaungkhantk3/portfolio_.git
cd portfolio_

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   └── ui/
│       └── ProjectCard.tsx
├── data/
│   ├── projects.ts
│   └── skills.ts
├── App.tsx
└── index.css
public/
└── resume.pdf
```

---

## 📄 License

MIT © 2026 [Kaung Khant Kyaw](https://portfolio-kaung-khant-kyaw.vercel.app/)
