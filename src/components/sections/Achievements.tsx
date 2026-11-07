import { ACHIEVEMENTS } from "@/data/portfolio";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import AnimatedCounter from "@/components/common/AnimatedCounter";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden section-pad bg-charcoal text-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 14% 0%, rgba(215,123,91,0.14) 0%, rgba(36,40,36,0) 58%)",
        }}
      />

      <div className="container-editorial relative mx-auto max-w-5xl">
        <SectionHeading
          number="06"
          eyebrow="Achievements"
          titleSize="clamp(3.25rem, 7.5vw, 7rem)"
          theme="charcoal"
          titleLines={["RECOGNITION", "EARNED."]}
        />

        <div className="mt-16 space-y-16 md:mt-20">
          {ACHIEVEMENTS.map((achievement) => {
            const teamsMatch = achievement.context.match(/(\d+)\+/);
            const membersMatch = achievement.context.match(/(\d+)-member/);
            const teams = teamsMatch ? Number(teamsMatch[1]) : 100;
            const members = membersMatch ? Number(membersMatch[1]) : 4;

            return (
              <article key={achievement.id} className="relative grid gap-12 lg:grid-cols-12 lg:gap-10">
                <div className="relative lg:col-span-7">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-2 -top-16 select-none font-display leading-none text-ivory/5"
                    style={{ fontSize: "clamp(4.5rem, 22vw, 17rem)" }}
                  >
                    {achievement.year}
                  </span>

                  <div className="relative">
                    <Reveal>
                      <span className="eyebrow text-ivory/50">Achievement</span>
                    </Reveal>

                    <Reveal delay={0.05}>
                      <h3
                        className="display-heading mt-5 text-ivory"
                        style={{ fontSize: "var(--text-section)" }}
                      >
                        {achievement.title}
                      </h3>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-terracotta/40 bg-terracotta/15 px-4 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-terracotta">
                          {achievement.placement}
                        </span>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ivory/40">
                          {achievement.year}
                        </span>
                      </div>
                    </Reveal>

                    <Reveal delay={0.15}>
                      <p className="mt-6 max-w-xl text-base text-ivory/70 md:text-lg">
                        {achievement.description}
                      </p>
                    </Reveal>

                    <Reveal delay={0.2}>
                      <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ivory/40">
                        {achievement.context}
                      </p>
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={0.1} className="lg:col-span-5">
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl border border-ivory/10 bg-charcoal-700/40">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(60% 45% at 50% 34%, rgba(215,123,91,0.22) 0%, rgba(36,40,36,0) 72%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute h-72 w-72 rounded-full border border-ivory/5"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute h-56 w-56 rounded-full border border-dashed border-ivory/10 animate-spin-slow"
                    />

                    <div className="relative animate-float">
                      <svg
                        viewBox="0 0 120 140"
                        className="h-40 w-auto text-terracotta md:h-48"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M36 24h48v14c0 18-11 30-24 30S36 56 36 38V24Z"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        />
                        <path
                          d="M30 24h60"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M36 30H22c-6 0-8 7-6 13 2 6 8 9 15 8"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M84 30h14c6 0 8 7 6 13-2 6-8 9-15 8"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path d="M60 68v22" stroke="currentColor" strokeWidth="2.5" />
                        <path
                          d="M40 90h40l-4 14H44L40 90Z"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M34 104h52"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M60 36l3.2 6.4 7 .9-5 4.9 1.2 6.9L60 51.8 53.6 55l1.2-6.9-5-4.9 7-.9L60 36Z"
                          fill="currentColor"
                          opacity="0.85"
                        />
                      </svg>
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute bottom-6 right-7 font-display leading-none text-ivory/15"
                      style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
                    >
                      {achievement.year}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.15} className="lg:col-span-12">
                  <div className="grid gap-px overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/10 sm:grid-cols-3">
                    <div className="bg-charcoal p-6">
                      <div className="font-display text-4xl text-ivory md:text-5xl">
                        <AnimatedCounter value={teams} suffix="+" />
                      </div>
                      <div className="mt-2 text-sm text-ivory/60">Competing teams</div>
                    </div>
                    <div className="bg-charcoal p-6">
                      <div className="font-display text-4xl text-ivory md:text-5xl">
                        <AnimatedCounter value={members} />
                      </div>
                      <div className="mt-2 text-sm text-ivory/60">Member team</div>
                    </div>
                    <div className="bg-charcoal p-6">
                      <div className="font-display text-4xl text-terracotta md:text-5xl">Lead</div>
                      <div className="mt-2 text-sm text-ivory/60">Technical design</div>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
