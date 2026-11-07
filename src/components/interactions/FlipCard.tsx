import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_EDITORIAL } from "@/animations/motion";

interface FlipCardProps {
  /** Front face content (e.g. a term label). */
  front: ReactNode;
  /** Back face content (e.g. a short description). */
  back: ReactNode;
  className?: string;
}

/**
 * Reusable 3D flip card.
 * - Desktop: flips on hover.
 * - Touch / keyboard: toggles on click or Enter/Space (`aria-pressed`).
 * - Reduced motion: no 3D rotation — a static swap between faces.
 */
export default function FlipCard({ front, back, className }: FlipCardProps) {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (reduced) {
    return (
      <div className={cn("relative", className)}>
        <div className={flipped ? "hidden" : "block"}>{front}</div>
        <div className={flipped ? "block" : "hidden"}>{back}</div>
        <button
          type="button"
          aria-pressed={flipped}
          aria-label="Toggle card details"
          onClick={() => setFlipped((value) => !value)}
          className="absolute inset-0 z-10"
        />
      </div>
    );
  }

  const showBack = flipped || hovered;

  return (
    <div
      className={cn("perspective relative", className)}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
    >
      <motion.div
        className="preserve-3d relative"
        initial={false}
        animate={{ rotateY: showBack ? 180 : 0 }}
        transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
      >
        <div className="backface-hidden">{front}</div>
        <div className="backface-hidden rotate-y-180 absolute inset-0">{back}</div>
      </motion.div>

      <button
        type="button"
        aria-pressed={flipped}
        aria-label="Toggle card details"
        onClick={() => setFlipped((value) => !value)}
        className="absolute inset-0 z-10 rounded-2xl"
      />
    </div>
  );
}
