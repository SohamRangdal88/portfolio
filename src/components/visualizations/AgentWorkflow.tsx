import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface Step {
  id: string;
  label: string;
  detail: string;
}

const STEPS: Step[] = [
  { id: "request", label: "User Request", detail: '"Summarise the retrieval failures in last week\'s incidents."' },
  { id: "planner", label: "Planner", detail: "Decompose the goal into retrieval + analysis subtasks." },
  { id: "tool-select", label: "Tool Selection", detail: "Choose: incident_search(query), logs_aggregate(range)." },
  { id: "tool-exec", label: "Tool Execution", detail: "Run selected tools against the incident store." },
  { id: "observation", label: "Observation", detail: "12 incidents · 4 recurring retrieval errors detected." },
  { id: "reasoning", label: "Reasoning", detail: "Correlate errors → root cause hypothesis." },
  { id: "response", label: "Final Response", detail: "Structured summary + recommended mitigation." },
];

export default function AgentWorkflow({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(reduced ? STEPS.length : -1);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const start = useCallback(() => {
    clearTimers();
    setRunning(true);
    setActive(-1);
    STEPS.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setActive(i);
          if (i === STEPS.length - 1) setRunning(false);
        }, 520 * (i + 1))
      );
    });
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setRunning(false);
    setActive(-1);
  }, [clearTimers]);

  return (
    <div className={cn("rounded-2xl border border-forest/12 bg-ivory p-5 sm:p-7", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow text-forest/50">Agent execution loop</p>
          <p className="mt-1 text-sm text-muted">
            Illustrative agent workflow — simulated, not a live model run.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={start}
            disabled={running}
            className="flex items-center gap-2 rounded-full bg-forest px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-terracotta disabled:opacity-50"
          >
            <Play size={12} />
            Run
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-full border border-forest/20 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-forest transition-colors hover:border-terracotta hover:text-terracotta"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        </div>
      </div>

      <ol className="mt-6 space-y-2">
        {STEPS.map((step, i) => {
          const state = i < active ? "done" : i === active ? "active" : "idle";
          return (
            <li
              key={step.id}
              className={cn(
                "flex items-start gap-4 rounded-xl border px-4 py-3 transition-colors duration-500",
                state === "idle" && "border-forest/8 bg-transparent",
                state === "active" && "border-terracotta/60 bg-terracotta/8",
                state === "done" && "border-forest/12 bg-sage/50"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.6rem]",
                  state === "idle" && "bg-forest/10 text-forest/50",
                  state === "active" && "bg-terracotta text-ivory",
                  state === "done" && "bg-forest text-ivory"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-charcoal">{step.label}</p>
                <p
                  className={cn(
                    "mt-1 font-mono text-[0.7rem] transition-opacity duration-500",
                    state === "idle" ? "text-muted/50 opacity-40" : "text-muted opacity-100"
                  )}
                >
                  {step.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
