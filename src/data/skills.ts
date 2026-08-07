import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMysql,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiVercel,
  SiPostman,
  SiJest,
  SiJsonwebtokens,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon?: IconType;
  color: string;
};

export const skillGroups: { label: string; skills: Skill[] }[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    ],
  },
  {
    label: "Backend & APIs",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#888888" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "REST", color: "#A5B4FC" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#FB015B" },
      { name: "RBAC", color: "#C084FC" },
    ],
  },
  {
    label: "Data & Infra",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },
      { name: "SQL", color: "#67E8F9" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "AWS", color: "#FF9900" },
    ],
  },
  {
    label: "Tooling & Delivery",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#aaaaaa" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Jest", icon: SiJest, color: "#C21325" },
    ],
  },
];
