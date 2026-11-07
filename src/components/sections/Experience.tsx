import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import SectionHeading from "@/components/common/SectionHeading";
import Timeline, { type TimelineItem } from "@/components/interactions/Timeline";
import { EASE_EDITORIAL } from "@/animations/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(EXPERIENCE[0]?.id ?? null);
  const reduced = useReducedMotion();

  const items: TimelineItem[] = EXPERIENCE.map((exp, index) => {
    const isOpen = openId === exp.id;

    return {
      id: exp.id,
      period: exp.period,
      title: exp.role,
      subtitle: `${exp.company} · ${exp.location}`,
      content: (
        <div className="rounded-2xl border border-ivory/10 bg-forest-600/40 p-5 backdrop-blur-sm md:p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="max-w-xl text-sm text-sage/80">{exp.summary}</p>
            <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ivory/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={`experience-panel-${exp.id}`}
            onClick={() => setOpenId(isOpen ? null : exp.id)}
            className={cn(
              "group mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] transition-colors",
              isOpen
                ? "border-terracotta/40 bg-terracotta/15 text-terracotta"
                : "border-ivory/20 text-sage/80 hover:border-terracotta/40 hover:text-terracotta"
            )}
          >
            <span>{isOpen ? "Hide details" : "Show contributions"}</span>
            <motion.span
              className="inline-flex"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              aria-hidden="true"
            >
              <ChevronDown size={15} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="panel"
                id={`experience-panel-${exp.id}`}
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE_EDITORIAL }}
                className="overflow-hidden"
              >
                <ul className="mt-6 space-y-2.5">
                  {exp.contributions.map((contribution) => (
                    <li key={contribution} className="flex gap-3 text-sm text-sage/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                      <span>{contribution}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-ivory/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-sage/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    };
  });

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-forest text-ivory section-pad"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(243,240,232,0.045) 1px, transparent 1px)",
          backgroundSize: "92px 100%",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 55% at 82% 6%, rgba(215,123,91,0.16) 0%, rgba(23,59,53,0) 62%)",
        }}
      />

      <div className="container-editorial relative">
        <SectionHeading
          number="05"
          eyebrow="Experience"
          theme="forest"
          titleLines={["WHERE I'VE BUILT", "AND WHAT I SHIPPED."]}
          intro="Three roles across AI engineering, backend development and independent delivery — grounded in production Python and retrieval-augmented systems."
        />

        <div className="mt-16 md:mt-20">
          <Timeline items={items} theme="dark" />
        </div>
      </div>
    </section>
  );
}
