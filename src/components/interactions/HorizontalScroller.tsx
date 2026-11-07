import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface HorizontalScrollerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scroll-driven horizontal scroller.
 *
 * On viewports >= 1024px (and when reduced-motion is not requested) a GSAP
 * ScrollTrigger pins the section and translates an inner track horizontally as
 * the user scrolls vertically. Everywhere else — small screens or reduced
 * motion — it falls back to normal vertical stacking.
 *
 * The effect is fully cleaned up on unmount (the `gsap.matchMedia` instance is
 * reverted and the context is torn down).
 */
export default function HorizontalScroller({ children, className }: HorizontalScrollerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    registerGsapPlugins();

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Only pin + scrub on desktop widths.
      mm.add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, track.scrollWidth - wrapper.clientWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "transform" });
        };
      });
    }, wrapper);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      mm.revert();
      ctx.revert();
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reduced]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative",
        !reduced && "lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden",
        className
      )}
    >
      <div
        ref={trackRef}
        className={cn(
          "flex gap-8 lg:gap-10",
          reduced
            ? "flex-col"
            : "flex-col lg:h-full lg:w-max lg:flex-row lg:items-center"
        )}
      >
        {children}
      </div>
    </div>
  );
}
