import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/data/portfolio";
import { EASE_EDITORIAL } from "@/animations/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SEQUENCE = [
  "[OK] LOADING VISUAL SYSTEM",
  "[OK] INITIALIZING AI MODULES",
  "[OK] LOADING PROJECT ARCHITECTURE",
  "[OK] ESTABLISHING CONNECTION",
];

interface PreloaderProps {
  onComplete: () => void;
}

const SESSION_KEY = "sr-portfolio-visited";

/**
 * Terminal-style cinematic preloader. Shown once per session and skipped
 * entirely when reduced-motion is requested.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.sessionStorage.getItem(SESSION_KEY);
  });
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Skip instantly for reduced-motion or returning sessions.
  useEffect(() => {
    if (!visible) {
      onComplete();
      return;
    }
    if (reduced) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
      onComplete();
    }
  }, [visible, reduced, onComplete]);

  useEffect(() => {
    if (!visible || reduced) return;

    const timers: number[] = [];
    SEQUENCE.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => setLineIndex(i + 1), 340 * (i + 1))
      );
    });

    const start = performance.now();
    const total = 1750;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(Math.round(p * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setReady(true);
    };
    timers.push(window.setTimeout(() => (frame = requestAnimationFrame(tick)), 200));

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
    };
  }, [visible, reduced]);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
      onComplete();
    }, 900);
    return () => clearTimeout(t);
  }, [ready, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9998] flex flex-col justify-between bg-forest px-6 py-6 text-ivory md:px-12 md:py-10"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
        >
          <div className="flex items-center justify-between font-mono text-[0.7rem] tracking-[0.25em] text-sage/70">
            <span>INITIALIZING EXPERIENCE</span>
            <span>{String(progress).padStart(3, "0")}%</span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-2 font-mono text-xs text-sage/80 md:text-sm">
            {SEQUENCE.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: i < lineIndex ? 1 : 0.15, x: 0 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
              >
                {line}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0.3 }}
              className="mt-2 text-terracotta"
            >
              [100%] SYSTEM READY
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="h-px w-full overflow-hidden bg-ivory/15">
              <motion.div
                className="h-full bg-terracotta"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h1
                className="display-heading text-ivory"
                style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}
              >
                {SITE.name.toUpperCase()}.
              </h1>
              <span className="font-mono text-[0.7rem] tracking-[0.25em] text-sage/60">
                {SITE.location.toUpperCase()}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
