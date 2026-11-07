import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import SplitText from "./SplitText";
import Reveal from "./Reveal";

type Theme = "ivory" | "forest" | "sage" | "charcoal";

const THEME_TEXT: Record<Theme, { eyebrow: string; title: string; number: string }> = {
  ivory: { eyebrow: "text-muted", title: "text-forest", number: "text-forest/15" },
  forest: { eyebrow: "text-sage/70", title: "text-ivory", number: "text-ivory/15" },
  sage: { eyebrow: "text-forest/60", title: "text-forest", number: "text-forest/12" },
  charcoal: { eyebrow: "text-ivory/50", title: "text-ivory", number: "text-ivory/12" },
};

interface SectionHeadingProps {
  number: string;
  eyebrow: string;
  titleLines: string[];
  titleSize?: string;
  theme?: Theme;
  align?: "left" | "center";
  className?: string;
  intro?: ReactNode;
}

export default function SectionHeading({
  number,
  eyebrow,
  titleLines,
  titleSize = "var(--text-section)",
  theme = "ivory",
  align = "left",
  className,
  intro,
}: SectionHeadingProps) {
  const t = THEME_TEXT[theme];

  return (
    <div className={cn("relative", align === "center" && "text-center", className)}>
      <Reveal>
        <div
          className={cn(
            "flex items-baseline gap-6",
            align === "center" && "justify-center"
          )}
        >
          <span
            className={cn("font-mono text-xs tracking-[0.3em]", t.eyebrow)}
          >
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <div className="relative mt-6">
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-[0.55em] select-none font-display leading-none",
            t.number
          )}
          style={{ fontSize: "clamp(3.5rem, 16vw, 15rem)", left: align === "center" ? "50%" : "-0.05em", transform: align === "center" ? "translateX(-50%)" : undefined }}
        >
          {number}
        </span>

        <h2
          className={cn("relative display-heading", t.title)}
          style={{ fontSize: titleSize }}
        >
          {titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <SplitText text={line} delay={i * 0.08} />
            </span>
          ))}
        </h2>
      </div>

      {intro && (
        <Reveal delay={0.15} className={cn("mt-8 max-w-2xl", align === "center" && "mx-auto")}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
