import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Github,
} from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";
import SectionHeading from "@/components/common/SectionHeading";
import HorizontalScroller from "@/components/interactions/HorizontalScroller";
import RagPipeline from "@/components/visualizations/RagPipeline";
import EmbeddingExplorer from "@/components/visualizations/EmbeddingExplorer";
import { scrollToHash } from "@/lib/smoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { EASE_EDITORIAL, VIEWPORT_ONCE } from "@/animations/motion";

/** Muted, coordinated surfaces so project identities stay distinct without clashing. */
const ACCENT: Record<
  Project["accent"],
  { text: string; bg: string; softBg: string; surface: string }
> = {
  graphite: {
    text: "text-project-accent-graphite",
    bg: "bg-project-accent-graphite",
    softBg: "bg-project-accent-graphite/10",
    surface: "bg-project-graphite",
  },
  clay: {
    text: "text-project-accent-clay",
    bg: "bg-project-accent-clay",
    softBg: "bg-project-accent-clay/10",
    surface: "bg-project-clay",
  },
  ochre: {
    text: "text-project-accent-ochre",
    bg: "bg-project-accent-ochre",
    softBg: "bg-project-accent-ochre/10",
    surface: "bg-project-ochre",
  },
  plum: {
    text: "text-project-accent-plum",
    bg: "bg-project-accent-plum",
    softBg: "bg-project-accent-plum/10",
    surface: "bg-project-plum",
  },
  slate: {
    text: "text-project-accent-slate",
    bg: "bg-project-accent-slate",
    softBg: "bg-project-accent-slate/10",
    surface: "bg-project-slate",
  },
};

interface ArchitectureFlowProps {
  steps: string[];
  dotClass: string;
}

/** Animated numbered pipeline used for each project's architecture. */
function ArchitectureFlow({ steps, dotClass }: ArchitectureFlowProps) {
  const reduced = useReducedMotion();

  return (
    <ol className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <motion.li
          key={step}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={
            reduced ? { duration: 0 } : { duration: 0.5, delay: i * 0.07, ease: EASE_EDITORIAL }
          }
          className="relative"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.62rem] text-sage/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("h-2 w-2 shrink-0 rounded-full", dotClass)} />
            <span className="h-px flex-1 bg-ivory/12" />
          </div>
          <p className="mt-3 text-sm text-sage/80">{step}</p>
        </motion.li>
      ))}
    </ol>
  );
}

interface GalleryPanelProps {
  project: Project;
  onSelect: () => void;
}

/** Large editorial poster used inside the pinned horizontal gallery. */
function GalleryPanel({ project, onSelect }: GalleryPanelProps) {
  const accent = ACCENT[project.accent];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Open ${project.title} case study`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-3xl text-left lg:h-[64vh] lg:w-[82vw] lg:shrink-0",
        accent.surface
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl",
          accent.softBg
        )}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 bottom-[-2.5rem] select-none font-display leading-none text-ivory/5"
        style={{ fontSize: "clamp(4.5rem, 24vw, 20rem)" }}
      >
        {project.number}
      </span>

      <div className="relative flex h-full flex-col justify-between gap-10 p-8 md:p-12">
        <div className="flex items-center justify-between gap-6">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-sage/60">
            {project.number} / {project.year}
          </span>
          <span className={cn("h-2 w-2 rounded-full", accent.bg)} />
        </div>

        <div className="max-w-2xl">
          <p className="eyebrow text-sage/50">{project.subtitle}</p>
          <h3
            className="mt-4 display-heading text-ivory"
            style={{ fontSize: "clamp(1.9rem, 4.6vw, 4.25rem)" }}
          >
            {project.title}
          </h3>
          <p className="mt-6 text-sm text-sage/75 md:text-base">{project.overview}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory/10 pt-5">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sage/50">
            Open case study
          </span>
          <span
            className={cn(
              "flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.22em]",
              accent.text
            )}
          >
            View details
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </button>
  );
}

interface ProjectDetailProps {
  project: Project;
  open: boolean;
  onToggle: () => void;
  registerRef: (el: HTMLElement | null) => void;
}

/** Full editorial case study for a single project. */
function ProjectDetail({ project, open, onToggle, registerRef }: ProjectDetailProps) {
  const accent = ACCENT[project.accent];
  const reduced = useReducedMotion();
  const hasLinks = Boolean(project.github || project.live);

  return (
    <article
      id={`project-${project.id}`}
      ref={registerRef}
      className={cn(
        "relative scroll-mt-28 overflow-hidden rounded-3xl p-5 md:p-8 lg:p-10",
        accent.surface
      )}
    >
      <div className="hairline" />

      <div className="grid gap-12 pt-12 lg:grid-cols-12">
        {/* Sticky showcase column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "font-mono text-[0.66rem] uppercase tracking-[0.26em]",
                  accent.text
                )}
              >
                Project {project.number}
              </span>
              <span className="h-px w-10 bg-ivory/20" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.26em] text-sage/50">
                {project.year}
              </span>
            </div>

            <motion.h3
              initial={reduced ? false : { opacity: 0, y: 26, filter: "blur(10px)" }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VIEWPORT_ONCE}
              transition={reduced ? { duration: 0 } : { duration: 0.7, ease: EASE_EDITORIAL }}
              className="mt-5 display-heading text-ivory"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3.5rem)" }}
            >
              {project.title}
            </motion.h3>

            <p className="mt-3 text-sm text-sage/70">{project.subtitle}</p>

            <motion.span
              aria-hidden="true"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={reduced ? undefined : { scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={reduced ? { duration: 0 } : { duration: 0.8, ease: EASE_EDITORIAL }}
              className={cn("mt-6 block h-1 w-20 origin-left rounded-full", accent.bg)}
            />

            {project.metrics.length > 0 && (
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ivory/12 bg-ivory/10 sm:grid-cols-3 lg:grid-cols-1">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="bg-charcoal/25 p-4">
                    <div className={cn("font-display text-xl", accent.text)}>
                      {metric.value}
                    </div>
                    <div className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.15em] text-sage/50">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {project.stack.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow text-sage/50">Tech stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ivory/15 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-sage/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hasLinks && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-charcoal transition-opacity hover:opacity-80",
                      accent.bg
                    )}
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Narrative + case study */}
        <div className="space-y-10 lg:col-span-7">
          <p className="text-lg text-ivory/90 md:text-xl">{project.overview}</p>

          <div className="rounded-2xl border border-ivory/12 bg-charcoal/20 p-6 md:p-8">
            <p className="eyebrow text-sage/50">Project case study</p>
            <h4 className="mt-3 font-display text-2xl leading-tight text-ivory md:text-3xl">
              {project.caseStudy.headline}
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-sage/75 md:text-base">
              {project.caseStudy.narrative}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-sage/50">The problem</p>
              <p className="mt-3 text-sm leading-relaxed text-sage/75">{project.problem}</p>
            </div>
            <div>
              <p className="eyebrow text-sage/50">The approach</p>
              <p className="mt-3 text-sm leading-relaxed text-sage/75">{project.approach}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ivory/12 bg-charcoal/20">
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={`case-${project.id}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sage/70">
                  Case study details
                </span>
                <span className={cn("h-1.5 w-1.5 rounded-full", accent.bg)} />
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  "shrink-0 text-sage/70 transition-transform duration-300",
                  open && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`case-${project.id}`}
                  role="region"
                  aria-label={`${project.title} case study`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduced ? { duration: 0 } : { duration: 0.5, ease: EASE_EDITORIAL }
                  }
                  style={{ overflow: "hidden" }}
                >
                  <div className="space-y-8 border-t border-ivory/10 px-5 py-6">
                    <div>
                      <p className="eyebrow text-sage/50">Architecture pipeline</p>
                      <div className="mt-5">
                        <ArchitectureFlow steps={project.architecture} dotClass={accent.bg} />
                      </div>
                    </div>

                    <div>
                      <p className="eyebrow text-sage/50">Features</p>
                      <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex gap-3 text-sm text-sage/80">
                            <span
                              className={cn("mt-2 h-1 w-1 shrink-0 rounded-full", accent.bg)}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.id === "daivik" && (
                      <div>
                        <p className="eyebrow text-sage/50">RAG pipeline visualizer</p>
                        <div className="mt-4">
                          <RagPipeline />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {project.id === "daivik" && (
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h4 className="font-display text-xl text-ivory md:text-2xl">
                  How retrieval works
                </h4>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-sage/40">
                  illustrative
                </span>
              </div>
              <div className="mt-5">
                <EmbeddingExplorer />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [openCase, setOpenCase] = useState<string | null>("daivik");
  const detailRefs = useRef<Array<HTMLElement | null>>([]);
  const activeAccent = ACCENT[PROJECTS[active].accent];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = detailRefs.current.findIndex((el) => el === entry.target);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    detailRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, index));
    scrollToHash(`#project-${PROJECTS[clamped].id}`);
  }, []);

  const onNavKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  const toggleCase = (id: string) =>
    setOpenCase((current) => (current === id ? null : id));

  return (
    <section id="projects" className="relative section-pad grain bg-charcoal text-ivory">
      <div className="container-editorial">
        <SectionHeading
          number="04"
          eyebrow="Projects"
          titleLines={["SELECTED WORK.", "BUILT END-TO-END."]}
          theme="forest"
          intro={
            <p className="text-sage/70">
              Five projects across applied AI and full-stack engineering, including a
              legal guidance assistant, textile production tool and faculty profile
              system. Explore each project-specific case study.
            </p>
          }
        />

        {/* Project navigation slider */}
        <div
          role="group"
          aria-label="Project navigation"
          onKeyDown={onNavKeyDown}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-terracotta hover:text-terracotta disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft size={15} />
          </button>

          <div className="flex items-center gap-3">
            {PROJECTS.map((project, i) => {
              const isActive = i === active;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Go to project ${project.number}: ${project.title}`}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[0.62rem] tracking-[0.1em] transition-colors",
                    isActive
                      ? cn("border-transparent", activeAccent.bg, "text-charcoal")
                      : "border-ivory/20 text-sage/60 hover:border-ivory/50 hover:text-sage"
                  )}
                >
                  {project.number}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === PROJECTS.length - 1}
            aria-label="Next project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-terracotta hover:text-terracotta disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight size={15} />
          </button>

          <span className="hidden min-w-0 flex-1 truncate text-right font-mono text-[0.6rem] uppercase tracking-[0.2em] text-sage/45 md:block">
            {PROJECTS[active].title}
          </span>
        </div>
      </div>

      {/* Pinned horizontal gallery */}
      <div className="mt-16">
        <div className="container-editorial flex items-center justify-between gap-4 pb-6">
          <span className="eyebrow text-sage/50">Gallery</span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sage/40 lg:inline">
            scroll to move →
          </span>
        </div>
        <HorizontalScroller>
          {PROJECTS.map((project, i) => (
            <GalleryPanel key={project.id} project={project} onSelect={() => goTo(i)} />
          ))}
        </HorizontalScroller>
      </div>

      {/* Detailed case studies */}
      <div className="container-editorial mt-24 space-y-24">
        {PROJECTS.map((project, i) => (
          <ProjectDetail
            key={project.id}
            project={project}
            open={openCase === project.id}
            onToggle={() => toggleCase(project.id)}
            registerRef={(el) => {
              detailRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
