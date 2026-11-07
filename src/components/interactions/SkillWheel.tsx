import { useRef, useState, type KeyboardEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import { SYSTEM_DESIGN_TRACKS } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_EDITORIAL } from "@/animations/motion";

const SECTORS = SYSTEM_DESIGN_TRACKS.map((track) => ({
  id: track.id,
  label: track.title,
  tech: track.stages.map((stage) => stage.title),
}));
const STEP = 360 / SECTORS.length;
const PANEL_ID = "skill-wheel-panel";

/**
 * Rotatable technology wheel.
 * - Renders the 8 technology sectors on a circular dial.
 * - Selecting a sector rotates the dial until that sector faces the marker,
 *   and reveals its technologies in the panel.
 * - A subtle slow rotation runs while idle and pauses on interaction.
 * - Full keyboard support (tablist + arrow keys).
 * - Reduced motion: degrades to a static, accessible list.
 */
export default function SkillWheel() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const rotation = useMotionValue(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const idle = !reduced && !hovered && !focused && !engaged;

  useAnimationFrame((_, delta) => {
    if (!idle) return;
    rotation.set(rotation.get() + delta * 0.0035);
  });

  const select = (index: number, moveFocus = false) => {
    const next = (index + SECTORS.length) % SECTORS.length;
    setEngaged(true);
    setActive(next);

    if (!reduced) {
      const target = -next * STEP;
      const current = rotation.get();
      // Rotate to the nearest equivalent angle so the dial never over-spins.
      const adjusted = target + Math.round((current - target) / 360) * 360;
      animate(rotation, adjusted, { duration: 0.9, ease: EASE_EDITORIAL });
    }

    if (moveFocus) buttonRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(active + 1, true);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(active - 1, true);
    }
  };

  const activeSector = SECTORS[active];

  const tabButtonClass = (isActive: boolean) =>
    cn(
      "rounded-full border px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-colors",
      isActive
        ? "border-terracotta bg-terracotta text-ivory"
        : "border-ivory/25 text-sage/70 hover:border-ivory/60 hover:text-sage"
    );

  const panel = (
    <div
      id={PANEL_ID}
      role="tabpanel"
      aria-label={`${activeSector.label} technologies`}
      className="min-h-[12rem]"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow text-sage/60">Sector</span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-sage/40">
          {String(active + 1).padStart(2, "0")} / {String(SECTORS.length).padStart(2, "0")}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSector.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: EASE_EDITORIAL }}
        >
          <h3 className="mt-4 font-display text-3xl text-ivory">{activeSector.label}</h3>
          <ul className="mt-6 flex flex-wrap gap-2">
            {activeSector.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-ivory/20 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-sage/80"
              >
                {tech}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  if (reduced) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <div
          role="tablist"
          aria-label="Technology sectors"
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-2 self-start"
        >
          {SECTORS.map((sector, index) => (
            <button
              key={sector.id}
              ref={(element) => {
                buttonRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={PANEL_ID}
              tabIndex={index === active ? 0 : -1}
              onClick={() => select(index)}
              className={tabButtonClass(index === active)}
            >
              {sector.label}
            </button>
          ))}
        </div>
        {panel}
      </div>
    );
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div
        className="relative mx-auto aspect-square w-full max-w-[24rem]"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHovered(false);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div aria-hidden="true" className="absolute inset-0 rounded-full border border-ivory/12" />
        <div
          aria-hidden="true"
          className="absolute inset-[16%] rounded-full border border-dashed border-ivory/15 animate-spin-slow"
          style={{ animationPlayState: idle ? "running" : "paused" }}
        />
        <div aria-hidden="true" className="absolute inset-[31%] rounded-full border border-ivory/10" />

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[7%] z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="block h-2 w-2 rotate-45 bg-terracotta" />
        </div>

        <motion.div
          role="tablist"
          aria-label="Technology sectors"
          className="absolute inset-0"
          style={{ rotate: rotation }}
          onKeyDown={onKeyDown}
        >
          {SECTORS.map((sector, index) => {
            const angle = index * STEP;
            const isActive = index === active;
            return (
              <div
                key={sector.id}
                className="absolute inset-[10%]"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <button
                  ref={(element) => {
                    buttonRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={PANEL_ID}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  style={{ transform: "translate(-50%, -50%)" }}
                  className={cn(
                    "absolute left-1/2 top-0 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.16em] transition-colors",
                    isActive
                      ? "border-terracotta bg-terracotta text-ivory"
                      : "border-ivory/25 bg-forest/50 text-sage/70 hover:border-ivory/60 hover:text-sage"
                  )}
                >
                  {sector.label}
                </button>
              </div>
            );
          })}
        </motion.div>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="eyebrow text-sage/50">Active</span>
          <span className="mt-2 font-display text-2xl text-ivory">{activeSector.label}</span>
          <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-sage/40">
            {idle ? "spinning" : "locked"}
          </span>
        </div>
      </div>

      <div className="rounded-3xl border border-ivory/12 bg-forest-600/40 p-7">{panel}</div>
    </div>
  );
}
