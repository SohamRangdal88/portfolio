import { motion } from "motion/react";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { SITE } from "@/data/portfolio";
import { scrollToHash } from "@/lib/smoothScroll";
import { EASE_EDITORIAL } from "@/animations/motion";
import SplitText from "@/components/common/SplitText";
import Magnetic from "@/components/common/Magnetic";
import NeuralNetwork from "@/components/visualizations/NeuralNetwork";
import { useToast } from "@/components/common/Toast";

export default function Hero() {
  const notify = useToast();

  const handleResume = () => {
    if (SITE.resumeUrl) {
      window.open(SITE.resumeUrl, "_blank", "noopener");
    } else {
      notify("Resume link not configured yet");
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ivory pt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 78% 18%, rgba(220,232,223,0.9) 0%, rgba(243,240,232,0) 55%)",
        }}
      />
      <NeuralNetwork className="pointer-events-none absolute right-[-12%] top-1/2 h-[80vh] w-[80vh] -translate-y-1/2 opacity-15 md:right-[-6%]" />

      <div className="container-editorial relative z-10 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_EDITORIAL, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted">
              Solapur, India · B.Tech IT &apos;27
            </span>
          </motion.div>

          <h1
            className="mt-8 display-heading text-forest"
            style={{ fontSize: "var(--text-hero)" }}
          >
            <span className="block overflow-hidden">
              <SplitText text={SITE.headlineTop} immediate delay={0.15} stagger={0.045} />
            </span>
            <span className="block overflow-hidden">
              <SplitText text={SITE.headlineBottom} immediate delay={0.35} stagger={0.045} />
            </span>
          </h1>

          <div className="mt-8 max-w-2xl">
            <p
              className="display-heading text-charcoal"
              style={{ fontSize: "clamp(1.15rem, 2.4vw, 2rem)", fontWeight: 500 }}
            >
              {SITE.tagline.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <SplitText text={line} byChar={false} immediate delay={0.7 + i * 0.12} />
                </span>
              ))}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_EDITORIAL, delay: 1.15 }}
              className="mt-6 text-muted"
            >
              {SITE.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_EDITORIAL, delay: 1.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3}>
              <button
                onClick={() => scrollToHash("#projects")}
                className="group flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-terracotta"
              >
                <Sparkles size={14} />
                Explore my work
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <button
                onClick={handleResume}
                className="flex items-center gap-2 rounded-full border border-forest/25 px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-forest transition-colors hover:border-terracotta hover:text-terracotta"
              >
                <Download size={14} />
                Download resume
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_EDITORIAL, delay: 1.4 }}
          className="flex items-center justify-center lg:col-span-4"
        >
          <div className="flex h-[min(56svh,30rem)] w-full max-w-[28rem] items-end justify-center lg:h-[min(82svh,46rem)]">
            <img
              src="/soham-rangdal-cutout.png"
              alt="Portrait of Soham Rangdal"
              className="h-full w-full object-contain object-bottom drop-shadow-[0_16px_24px_rgba(23,59,53,0.12)]"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToHash("#education")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted"
        aria-label="Scroll to education section"
      >
        <span>Scroll</span>
        <ArrowDown size={13} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
