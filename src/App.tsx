import { useCallback, useEffect, useState } from "react";
import { ToastProvider } from "@/components/common/Toast";
import CustomCursor from "@/components/layout/CustomCursor";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import CommandPalette from "@/components/layout/CommandPalette";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Achievements from "@/components/sections/Achievements";
import EngineeringLab from "@/components/sections/EngineeringLab";
import Contact from "@/components/sections/Contact";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollTrigger } from "@/animations/gsap";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cleanup = initSmoothScroll(reduced);
    return cleanup;
  }, [reduced]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    // Recalculate scroll-triggered animations once the loader is gone.
    window.setTimeout(() => ScrollTrigger.refresh(), 150);
  }, []);

  return (
    <ToastProvider>
      <CustomCursor />
      <Preloader onComplete={handlePreloaderComplete} />
      <Navbar onOpenCommandPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero />
        <Education />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <EngineeringLab />
        <Contact />
      </main>

      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </ToastProvider>
  );
}
