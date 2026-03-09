import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-slate-800 bg-slate-900/40 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Experience"
          title="Experience building full-stack applications in real development environments."
          description="Hands-on work across frontend development, backend APIs, authentication, role-based access control, and database-driven systems."
        />

        <div className="mt-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-800 bg-slate-950 p-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Full-Stack Developer Intern
                </h3>
                <p className="mt-1 text-sky-400">
                  Mfessoultions Co., Ltd · Bangkok, Thailand
                </p>
              </div>

              <p className="text-sm text-slate-400">Jan 2026 – Present</p>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li>
                Developed 10+ responsive UI components using React and
                TypeScript.
              </li>
              <li>
                Built and maintained 15+ RESTful API endpoints using Node.js and
                Express.
              </li>
              <li>
                Implemented authentication and role-based access control using
                JWT.
              </li>
              <li>
                Resolved performance bottlenecks and bugs to improve application
                stability.
              </li>
              <li>
                Collaborated with team members through Git-based workflows in an
                agile environment.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-3xl border border-slate-800 bg-slate-950 p-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Teaching Assistant
                </h3>
                <p className="mt-1 text-sky-400">
                  Mae Fah Luang University · Chiang Rai, Thailand
                </p>
              </div>

              <p className="text-sm text-slate-400">Aug 2023 – Apr 2025</p>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li>
                Assisted students in understanding programming fundamentals.
              </li>
              <li>
                Guided students in debugging and troubleshooting code issues
                during labs.
              </li>
              <li>
                Provided one-on-one support for students struggling with
                programming concepts.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
