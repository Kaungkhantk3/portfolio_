import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen bg-base overflow-x-hidden grain">
      {/* ── Ambient background blobs ── */}
      <div aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      {/* ── App shell ── */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <FeaturedProjects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
