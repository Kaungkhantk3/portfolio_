import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-slate-800 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Contact"
          title="Let’s talk about opportunities and real product work."
          description="I’m open to software engineering roles where I can contribute to real applications, collaborate with product teams, and continue growing as a developer."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8"
        >
          <p className="max-w-2xl text-slate-300 leading-7">
            The best way to reach me is by email or LinkedIn. I’m happy to talk
            about frontend roles, full-stack opportunities, or teams building
            modern web products.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:kaungkhantluke.dev@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-sky-400"
            >
              <Mail size={18} />
              Email Me
            </a>

            <a
              href="https://github.com/Kaungkhantk3"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-medium text-white transition hover:border-slate-500 hover:bg-slate-950"
            >
              <Github size={18} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/kaung-khant-kyaw-66064627b/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-medium text-white transition hover:border-slate-500 hover:bg-slate-950"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
