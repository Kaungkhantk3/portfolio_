import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const aboutCards = [
  {
    title: "Full-Stack Development",
    description:
      "Build complete web applications across frontend interfaces, backend APIs, authentication flows, and database-driven features.",
  },
  {
    title: "Backend Systems",
    description:
      "Develop REST APIs with Node.js and Express, including JWT authentication, RBAC, modular routing, and business logic handling.",
  },
  {
    title: "Database Design",
    description:
      "Work with MySQL and Prisma to design relational schemas, structure data models, and support scalable application features.",
  },
  {
    title: "Product Features",
    description:
      "Implemented admin dashboards, CRUD workflows, file uploads, image export flows, and real-world application features.",
  },
  {
    title: "Development Workflow",
    description:
      "Use Git-based collaboration, Docker environments, clean project structure, and maintainable coding practices in development.",
  },
  {
    title: "Current Goal",
    description:
      "Looking for full-stack developer roles where I can contribute to real products and continue growing through practical engineering work.",
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="About"
          title="Full-stack developer building practical web applications."
          description="Focused on building complete systems from frontend interfaces to backend APIs and relational database architecture."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {aboutCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] opacity-60" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-sky-400/10 blur-2xl transition duration-300 group-hover:bg-sky-400/15" />

              <div className="relative z-10">
                <div className="mb-5 h-px w-12 bg-gradient-to-r from-sky-400/80 to-transparent" />

                <h3 className="text-lg font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
