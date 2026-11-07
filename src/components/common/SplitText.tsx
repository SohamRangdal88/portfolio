import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_EDITORIAL } from "@/animations/motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Animate per character (true) or per word (false). */
  byChar?: boolean;
  delay?: number;
  stagger?: number;
  /** Play immediately instead of waiting for viewport entry. */
  immediate?: boolean;
}

/** Editorial character/word reveal used for headings. */
export default function SplitText({
  text,
  className,
  byChar = true,
  delay = 0,
  stagger = 0.03,
  immediate = false,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const unit = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.85, ease: EASE_EDITORIAL },
    },
  };

  const animateProps = immediate
    ? { initial: "hidden", animate: "visible" as const }
    : { initial: "hidden", whileInView: "visible" as const, viewport: { once: true, amount: 0.4 } };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      aria-label={text}
      {...animateProps}
    >
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block overflow-hidden align-bottom">
          {byChar ? (
            word.split("").map((char, ci) => (
              <motion.span
                key={`${char}-${ci}`}
                variants={unit}
                className="inline-block"
                aria-hidden="true"
              >
                {char}
              </motion.span>
            ))
          ) : (
            <motion.span variants={unit} className="inline-block" aria-hidden="true">
              {word}
            </motion.span>
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
