import { useRef, useState, type KeyboardEvent } from "react";
import { SYSTEM_DESIGN_TRACKS } from "@/data/portfolio";
import { cn } from "@/lib/cn";

interface SystemDesignExplorerProps {
  className?: string;
}

export default function SystemDesignExplorer({ className }: SystemDesignExplorerProps) {
  const [trackId, setTrackId] = useState("software-systems");
  const [stageIndex, setStageIndex] = useState(0);
  const stageRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const track =
    SYSTEM_DESIGN_TRACKS.find((entry) => entry.id === trackId) ?? SYSTEM_DESIGN_TRACKS[0];
  const stage = track.stages[stageIndex] ?? track.stages[0];

  const selectTrack = (nextTrackId: string) => {
    setTrackId(nextTrackId);
    setStageIndex(0);
    stageRefs.current = [];
  };

  const selectStage = (index: number, moveFocus = false) => {
    const next = (index + track.stages.length) % track.stages.length;
    setStageIndex(next);
    if (moveFocus) stageRefs.current[next]?.focus();
  };

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectStage(stageIndex + 1, true);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectStage(stageIndex - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectStage(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectStage(track.stages.length - 1, true);
    }
  };

  return (
    <section
      className={cn(
        "rounded-2xl border border-forest/10 bg-ivory p-5 text-charcoal sm:p-7",
        className
      )}
      aria-label="Illustrative software and AI system design explorer"
    >
      <div className="flex flex-col gap-5 border-b border-forest/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-forest/50">Architecture explorer</p>
          <h3 className="mt-2 font-display text-2xl text-forest sm:text-3xl">
            Follow the system boundaries
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Illustrative patterns for AI applications and software systems. Choose a stage
            to inspect its responsibility; adapt the design to each project.
          </p>
        </div>
        <span className="w-fit shrink-0 rounded-full border border-forest/15 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
          Simulated architecture
        </span>
      </div>

      <div
        role="group"
        aria-label="Architecture pattern"
        className="mt-5 flex flex-wrap gap-2"
      >
        {SYSTEM_DESIGN_TRACKS.map((entry) => {
          const selected = entry.id === track.id;
          return (
            <button
              key={entry.id}
              type="button"
              aria-pressed={selected}
              onClick={() => selectTrack(entry.id)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-colors",
                selected
                  ? "border-forest bg-forest text-ivory"
                  : "border-forest/15 text-forest hover:border-terracotta hover:text-terracotta"
              )}
            >
              {entry.title}
            </button>
          );
        })}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div
          role="tablist"
          aria-label={`${track.title} architecture stages`}
          aria-orientation="vertical"
          onKeyDown={onStageKeyDown}
          className="space-y-2"
        >
          {track.stages.map((entry, index) => {
            const selected = index === stageIndex;
            return (
              <button
                key={entry.id}
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
                id={`architecture-tab-${track.id}-${entry.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="architecture-stage-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => selectStage(index)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-colors sm:p-4",
                  selected
                    ? "border-terracotta/40 bg-terracotta/10"
                    : "border-forest/10 hover:border-forest/25 hover:bg-sage/30"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[0.62rem]",
                    selected ? "bg-terracotta text-ivory" : "bg-forest/8 text-forest/60"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg text-forest">{entry.title}</span>
                <span
                  className={cn(
                    "ml-auto h-1.5 w-1.5 shrink-0 rounded-full",
                    selected ? "bg-terracotta" : "bg-forest/15"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div
          id="architecture-stage-panel"
          role="tabpanel"
          aria-labelledby={`architecture-tab-${track.id}-${stage.id}`}
          className="min-h-64 rounded-2xl bg-sage/55 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow text-forest/50">{track.title} · design stage</span>
            <span className="font-mono text-[0.62rem] text-forest/45">
              {String(stageIndex + 1).padStart(2, "0")} /{" "}
              {String(track.stages.length).padStart(2, "0")}
            </span>
          </div>
          <h4 className="mt-8 font-display text-3xl leading-tight text-forest sm:text-4xl">
            {stage.title}
          </h4>
          <p className="mt-4 text-base leading-relaxed text-charcoal/80">{stage.focus}</p>
          <div className="mt-8 border-t border-forest/12 pt-4">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-forest/45">
              Relevant concepts &amp; tools
            </p>
            <p className="mt-2 text-sm text-forest">{stage.context}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
