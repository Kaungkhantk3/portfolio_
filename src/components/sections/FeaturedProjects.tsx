import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import SectionTitle from "../ui/SectionTitle";

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Projects"
          title="Work that reflects how I build real applications."
          description="Selected projects focused on product thinking, practical engineering, and clean implementation."
        />

        <div className="mt-10 space-y-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {otherProjects.length > 0 ? (
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-white">Other Projects</h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
