import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { gsap, registerGsapPlugins } from "@/animations/gsap";
import { EASE_EDITORIAL, VIEWPORT_ONCE } from "@/animations/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  /** Optional rich block rendered beneath the title (contributions, chips, stats...). */
  content?: ReactNode;
}

interface TimelineTheme {
  track: string;
  accent: string;
  period: string;
  title: string;
  subtitle: string;
  dot: string;
  connector: string;
}

const THEMES: Record<"light" | "dark", TimelineTheme> = {
  light: {
    track: "bg-forest/15",
    accent: "bg-terracotta",
    period: "text-forest",
    title: "text-charcoal",
    subtitle: "text-muted",
    dot: "border-forest bg-ivory",
    connector: "bg-forest/20",
  },
  dark: {
    track: "bg-ivory/15",
    accent: "bg-terracotta",
    period: "text-terracotta",
    title: "text-ivory",
    subtitle: "text-sage/70",
    dot: "border-sage bg-forest",
    connector: "bg-ivory/20",
  },
};

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  theme?: "light" | "dark";
}

/**
 * Scroll-linked editorial timeline.
 * A progress line fills with the scroll position (GSAP ScrollTrigger + scrub) and a
 * moving node travels down the rail while date markers fade in per item.
 * Degrades gracefully: with reduced motion the rail is fully drawn and the node hidden.
 */
export default function Timeline({ items, className, theme = "light" }: TimelineProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const t = THEMES[theme];

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const fill = fillRef.current;
    const indicator = indicatorRef.current;
    if (!root || !fill || !indicator) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const config = {
        trigger: root,
        start: "top 72%",
        end: "bottom 72%",
        scrub: 0.6,
      };
      gsap.fromTo(
        fill,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, ease: "none", scrollTrigger: { ...config } }
      );
      gsap.fromTo(
        indicator,
        { top: "0%" },
        { top: "100%", ease: "none", scrollTrigger: { ...config } }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced, items.length]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-1 left-2 top-1 w-px md:left-3",
          t.track
        )}
      />
      <span
        ref={fillRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-1 left-2 top-1 w-px origin-top md:left-3",
          t.accent
        )}
        style={reduced ? undefined : { transform: "scaleY(0)" }}
      />
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse-dot md:left-3",
          t.accent
        )}
        style={reduced ? { display: "none" } : { top: "0%" }}
      />

      <ol className="relative">
        {items.map((item) => (
          <li key={item.id} className="relative pb-12 pl-10 last:pb-0 md:pb-16 md:pl-16">
            <motion.span
              aria-hidden="true"
              className={cn(
                "absolute left-2 top-1 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 md:left-3",
                t.dot
              )}
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
            >
              <span className={cn("absolute inset-[3px] rounded-full", t.accent)} />
            </motion.span>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn("font-mono text-[0.66rem] uppercase tracking-[0.24em]", t.period)}
                >
                  {item.period}
                </span>
                <span className={cn("h-px w-8 shrink-0", t.connector)} />
              </div>
              <h3 className={cn("mt-3 font-display text-xl leading-tight md:text-2xl", t.title)}>
                {item.title}
              </h3>
              <p className={cn("mt-1 text-sm", t.subtitle)}>{item.subtitle}</p>
              {item.content && <div className="mt-4">{item.content}</div>}
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
