import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { COUNTER_STATS, SKILL_CATEGORIES } from "@/data/portfolio";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import Marquee from "@/components/common/Marquee";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import FlipCard from "@/components/interactions/FlipCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { EASE_EDITORIAL } from "@/animations/motion";

/** Short, factual notes derived from each skill's category context. No levels/metrics invented. */
const SKILL_NOTES: Record<string, string> = {
  LLMs: "Language models that generate and reason over text.",
  RAG: "Retrieval-augmented generation grounded in retrieved context.",
  Embeddings: "Vector representations that enable semantic search.",
  NLP: "Classical and modern techniques for processing natural language.",
  "AI Agents": "Autonomous workflows that plan, call tools and act.",
  LangChain: "Orchestration for chaining LLM and retrieval steps.",
  LangGraph: "Graph-based orchestration for agent workflows.",
  ChromaDB: "Vector store for semantic retrieval over embeddings.",
  FastAPI: "Python framework for building REST APIs and services.",
  Flask: "Lightweight Python framework for backend services.",
  PostgreSQL: "Relational database for structured application data.",
  Elasticsearch: "Search engine for text retrieval and indexing.",
  Docker: "Containerization for packaging and running services.",
  Vercel: "Platform for deploying and hosting web apps.",
};

/** A curated row of skills spanning AI, frameworks, retrieval and backend. */
const FLIP_SKILLS = ["LLMs", "RAG", "LangChain", "ChromaDB", "FastAPI", "Docker"];

const ALL_SKILLS = SKILL_CATEGORIES.flatMap((category) => category.items);

const categoryOf = (skill: string) =>
  SKILL_CATEGORIES.find((category) => category.items.includes(skill));

export default function Skills() {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(SKILL_CATEGORIES[0].id);
  const category =
    SKILL_CATEGORIES.find((entry) => entry.id === activeId) ?? SKILL_CATEGORIES[0];

  const panelTransition = reduced
    ? { duration: 0 }
    : { duration: 0.45, ease: EASE_EDITORIAL };

  return (
    <section id="expertise" className="relative section-pad bg-ivory">
      <div className="container-editorial">
        <SectionHeading
          number="03"
          eyebrow="Expertise"
          titleLines={["THE TECHNICAL", "ARSENAL."]}
          theme="ivory"
          intro={
            <p className="text-muted">
              Seven disciplines, one working system. Explore the toolkit by category,
              then trace how software and AI application layers fit together.
            </p>
          }
        />

        {/* Category explorer: editorial index selector + composed item list */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex flex-col divide-y divide-forest/10 border-y border-forest/10">
              {SKILL_CATEGORIES.map((entry) => {
                const isActive = entry.id === activeId;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(entry.id)}
                    className={cn(
                      "group flex items-center gap-5 py-4 text-left transition-colors",
                      isActive ? "text-forest" : "text-muted hover:text-forest"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[0.62rem] tracking-[0.2em]",
                        isActive ? "text-terracotta" : "text-muted"
                      )}
                    >
                      {entry.index}
                    </span>
                    <span className="font-display text-xl md:text-2xl">{entry.title}</span>
                    <span
                      className={cn(
                        "ml-auto h-1.5 w-1.5 rounded-full transition-all duration-300",
                        isActive
                          ? "scale-100 bg-terracotta"
                          : "scale-0 bg-forest/40 group-hover:scale-100"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={panelTransition}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="eyebrow text-forest/50">{category.blurb}</p>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted">
                    {String(category.items.length).padStart(2, "0")} entries
                  </span>
                </div>

                <ul className="mt-6 border-t border-forest/10">
                  {category.items.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { duration: 0.4, delay: index * 0.04, ease: EASE_EDITORIAL }
                      }
                      className="group flex items-baseline gap-5 border-b border-forest/10 py-3.5"
                    >
                      <span className="font-mono text-[0.6rem] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl text-charcoal transition-colors group-hover:text-terracotta md:text-2xl">
                        {item}
                      </span>
                      {SKILL_NOTES[item] && (
                        <span className="ml-auto hidden max-w-[48%] text-right text-xs text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                          {SKILL_NOTES[item]}
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Selected skills as flip cards */}
        <Reveal className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3
              className="display-heading text-forest"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.25rem)" }}
            >
              SELECTED SKILLS
            </h3>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
              hover / tap to flip
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FLIP_SKILLS.map((skill) => {
              const owner = categoryOf(skill);
              return (
                <FlipCard
                  key={skill}
                  front={
                    <div className="flex min-h-[10.5rem] flex-col justify-between rounded-2xl border border-forest/12 bg-sage/50 p-5">
                      <span className="eyebrow text-forest/40">
                        {owner ? `${owner.index} · ${owner.title}` : "Skill"}
                      </span>
                      <span className="font-display text-2xl text-forest">{skill}</span>
                    </div>
                  }
                  back={
                    <div className="flex h-full min-h-[10.5rem] flex-col justify-between rounded-2xl bg-forest p-5 text-ivory">
                      <span className="eyebrow text-sage/50">
                        {owner?.title ?? "Skill"}
                      </span>
                      <span className="text-sm leading-relaxed text-sage/85">
                        {SKILL_NOTES[skill]}
                      </span>
                    </div>
                  }
                />
              );
            })}
          </div>
        </Reveal>

        {/* Technology marquee */}
        <div className="mt-20 border-y border-forest/10 py-8">
          <Marquee
            items={ALL_SKILLS}
            separator="/"
            className="font-display text-2xl text-forest/75 md:text-4xl"
          />
        </div>

        {/* Counters strip */}
        <Reveal className="mt-16">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-forest/10 bg-forest/10 md:grid-cols-5">
            {COUNTER_STATS.map((stat) => (
              <div key={stat.id} className="bg-ivory p-5">
                <div className="font-display text-3xl text-forest">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="mt-1 text-sm text-charcoal">{stat.label}</div>
                <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted">
                  {stat.context}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
