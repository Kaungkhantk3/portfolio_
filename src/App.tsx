// ── Pre-rebuild components: replaced, kept in the repo, not rendered ──────
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
// import Hero from "./components/sections/Hero";
// import About from "./components/sections/About";
// import Skills from "./components/sections/Skills";
// import FeaturedProjects from "./components/sections/FeaturedProjects";
// import Experience from "./components/sections/Experience";
// import Education from "./components/sections/Education";
// import Contact from "./components/sections/Contact";

import SmoothScroll from "./providers/SmoothScroll";
import Nav from "./components/layout/Nav";
import SiteFooter from "./components/layout/SiteFooter";
// Steps 1–3b composed these three directly; HeroStage now wraps them so the
// 01 Stack timeline can pin them as one stage.
// import HeroSection from "./components/sections/HeroSection";
// import Marquee from "./components/sections/Marquee";
// import StackSection from "./components/sections/StackSection";
import HeroStage from "./components/sections/HeroStage";
import SelectedWork from "./components/sections/SelectedWork";
import Changelog from "./components/sections/Changelog";
import ContactTerminal from "./components/sections/ContactTerminal";

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-bg text-ink">
        <Nav />
        <main>
          {/* <HeroSection /> <Marquee /> <StackSection />  (steps 1–3b) */}
          <HeroStage />
          <SelectedWork />
          <Changelog />
          <ContactTerminal />
        </main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}

/* ── Pre-rebuild App shell ─────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen bg-base overflow-x-hidden grain">
      <div aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <FeaturedProjects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
*/
