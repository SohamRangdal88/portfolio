import { ABOUT_PARAGRAPHS, EXPERIENCE } from "@/data/portfolio";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";

const INTERNSHIPS = EXPERIENCE.filter((entry) => entry.employmentType === "internship");

export default function About() {
  return (
    <section id="about" className="relative section-pad bg-ivory">
      <div className="container-editorial">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              number="02"
              eyebrow="About"
              titleLines={["BUILDING USEFUL", "SOFTWARE SYSTEMS."]}
              theme="ivory"
            />

            <div className="mt-10 max-w-2xl space-y-5">
              {ABOUT_PARAGRAPHS.map((paragraph, i) => (
                <Reveal key={paragraph} delay={i * 0.1} y={20}>
                  <p
                    className={
                      i === 0
                        ? "text-lg text-charcoal md:text-xl"
                        : "text-base text-muted"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-forest p-8 text-ivory">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-terracotta/20 blur-3xl"
                />
                <p className="eyebrow text-sage/60">Internship experience</p>
                <div className="relative mt-6 space-y-4">
                  {INTERNSHIPS.map((entry, index) => (
                    <article
                      key={entry.id}
                      className="rounded-2xl border border-ivory/12 bg-ivory/[0.04] p-5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sage/45">
                          Internship · {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-right font-mono text-[0.58rem] text-sage/45">
                          {entry.period}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl text-ivory">{entry.role}</h3>
                      <p className="mt-1 text-sm text-sage/75">{entry.summary}</p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ivory/10 pt-3">
                        <span className="text-sm text-ivory/90">{entry.company}</span>
                        {entry.companyUrl && (
                          <a
                            href={entry.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-terracotta transition-colors hover:text-ivory"
                          >
                            Company website ↗
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
