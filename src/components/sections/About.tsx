import { motion } from "framer-motion";

const cards = [
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">About</p>
          <h2 className="font-display mb-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] text-white">
            Full-stack developer building
            <br />
            practical web applications.
          </h2>
          <p className="mb-12 max-w-[520px] text-[15px] leading-[1.75] text-white/55">
            Focused on building complete systems from frontend interfaces to
            backend APIs and relational database architecture.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl glass card-shimmer p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(129,140,248,0.22)] hover:bg-[rgba(129,140,248,0.05)]"
            >
              {/* Corner glow on hover */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(129,140,248,0.1)] blur-2xl transition-all duration-300 group-hover:bg-[rgba(129,140,248,0.18)]" />

              <div className="relative">
                {/* Accent line */}
                <div className="accent-line mb-5" />

                <h3 className="font-display mb-3 text-[16px] font-bold text-white">
                  {card.title}
                </h3>
                <p className="text-[13px] leading-[1.75] text-white/55">
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
