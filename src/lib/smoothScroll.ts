import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/animations/gsap";

let lenis: Lenis | null = null;
let rafCallback: ((time: number) => void) | null = null;

/**
 * Initialize Lenis smooth scrolling and synchronize it with GSAP ScrollTrigger.
 * Returns a cleanup function. Skips entirely when reduced-motion is requested.
 */
export function initSmoothScroll(reducedMotion: boolean): () => void {
  if (typeof window === "undefined" || reducedMotion) return () => {};

  registerGsapPlugins();

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  const instance = lenis;

  instance.on("scroll", ScrollTrigger.update);

  rafCallback = (time: number) => {
    instance.raf(time * 1000);
  };
  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  return () => {
    if (rafCallback) gsap.ticker.remove(rafCallback);
    rafCallback = null;
    instance.off("scroll", ScrollTrigger.update);
    instance.destroy();
    lenis = null;
  };
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Smooth-scroll to a hash target (e.g. "#projects"), falling back to native. */
export function scrollToHash(hash: string): void {
  const target = document.querySelector(hash);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.3 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function lockScroll(locked: boolean): void {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}
