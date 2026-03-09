import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Contact from "../components/sections/Contact";
import Experience from "../components/sections/Experience";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 bg-grid text-slate-100">
      {/* glow background */}
      <div className="bg-glow pointer-events-none"></div>

      {/* noise texture */}
      <div className="bg-noise pointer-events-none"></div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
