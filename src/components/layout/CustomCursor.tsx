import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Custom cursor: a crosshair made of four white segments around a center dot.
 * It blends against whatever is beneath it (mix-blend-mode: difference) so it
 * stays legible on both light and dark sections, and blooms outward over
 * interactive elements. Disabled on touch devices and reduced-motion.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  const reduced = useReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      const el = event.target as HTMLElement | null;
      const hovering = !!el?.closest?.('a, button, [role="button"], [data-cursor="hover"]');
      cursorRef.current.dataset.hover = hovering ? "true" : "false";
    };

    const onDown = () => {
      if (cursorRef.current) cursorRef.current.dataset.down = "true";
    };
    const onUp = () => {
      if (cursorRef.current) cursorRef.current.dataset.down = "false";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-hover="false"
      data-down="false"
      className="cursor-cross hidden md:block"
    >
      <span className="cursor-cross__seg cursor-cross__seg--t" />
      <span className="cursor-cross__seg cursor-cross__seg--b" />
      <span className="cursor-cross__seg cursor-cross__seg--l" />
      <span className="cursor-cross__seg cursor-cross__seg--r" />
      <span className="cursor-cross__dot" />
    </div>
  );
}
