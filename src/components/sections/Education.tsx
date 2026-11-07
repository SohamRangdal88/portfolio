import { EDUCATION } from "@/data/portfolio";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import FlipCard from "@/components/interactions/FlipCard";
import { cn } from "@/lib/cn";

/** Shared card height so the three flip cards line up in the grid. */
const CARD_MIN_H = "min-h-[15.5rem]";

export default function Education() {
  const stageLabels: Record<string, string> = {
    ssc: "Secondary school",
    hsc: "Higher secondary",
    wit: "Undergraduate",
  };

  return (
    <section id="education" className="relative overflow-hidden section-pad bg-sage/50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 12% 20%, rgba(243,240,232,0.85) 0%, rgba(220,232,223,0) 60%)",
        }}
      />

      <div className="container-editorial relative">
        <SectionHeading
          number="01"
          eyebrow="Academic background"
          theme="sage"
          titleLines={["EDUCATION."]}
          intro={
            <p className="text-muted">
              My academic path from secondary school through higher secondary studies to a
              B.Tech in Information Technology. Hover a card — or tap on a phone — to see
              the details.
            </p>
          }
        />

        <ol className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {EDUCATION.map((entry, index) => {
            const isDegree = entry.id === "wit";
            return (
              <li key={entry.id} className="relative z-10">
                <Reveal delay={index * 0.1}>
                  <FlipCard
                    front={
                      <article
                        className={cn(
                          "flex flex-col rounded-3xl border border-forest/10 bg-ivory p-6 shadow-sm md:p-7",
                          CARD_MIN_H
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-terracotta/50 bg-ivory font-mono text-[0.62rem] text-forest">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-terracotta">
                            {entry.id.toUpperCase()}
                          </span>
                          <span className="ml-auto font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                            flip
                          </span>
                        </div>

                        <p className="mt-7 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                          {stageLabels[entry.id] ?? "Education"}
                        </p>
                        <h3
                          className={cn(
                            "mt-2 text-forest",
                            isDegree
                              ? "font-mono text-lg leading-snug tracking-tight md:text-xl"
                              : "font-display text-2xl leading-tight md:text-3xl"
                          )}
                        >
                          {entry.qualification}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {entry.institution}
                        </p>

                        <div className="mt-auto flex items-end justify-between gap-3 border-t border-forest/10 pt-4">
                          <span className="font-mono text-[0.62rem] text-muted">
                            {entry.period}
                          </span>
                          <span
                            className={cn(
                              "text-right font-display text-forest",
                              isDegree ? "text-2xl" : "text-xl"
                            )}
                          >
                            {entry.score}
                            <span className="ml-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted">
                              {entry.scoreLabel}
                            </span>
                          </span>
                        </div>
                      </article>
                    }
                    back={
                      <div
                        className={cn(
                          "flex h-full flex-col rounded-3xl bg-forest p-6 text-ivory md:p-7",
                          CARD_MIN_H
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-sage/50">
                            {stageLabels[entry.id] ?? "Education"}
                          </span>
                          <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-sage/40">
                            {entry.id.toUpperCase()}
                          </span>
                        </div>

                        {entry.details ? (
                          <ul className="mt-5 space-y-2 text-sm text-sage/85">
                            {entry.details.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="text-terracotta">—</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-5 text-sm leading-relaxed text-sage/85">
                            Completed in {entry.period}. Final result {entry.score}.
                          </p>
                        )}

                        <p className="mt-auto border-t border-ivory/15 pt-4 text-xs leading-relaxed text-sage/60">
                          {entry.institution}
                        </p>
                      </div>
                    }
                  />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
