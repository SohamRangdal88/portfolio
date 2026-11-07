import { Fragment, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { EASE_EDITORIAL } from "@/animations/motion";

interface Stage {
  id: string;
  label: string;
  detail: string;
}

/** The eight stages of a retrieval-augmented generation pipeline, in order. */
const STAGES: Stage[] = [
  {
    id: "document-input",
    label: "Document Input",
    detail:
      "Raw documents — PDFs, pages and notes — enter the pipeline as the source corpus.",
  },
  {
    id: "text-extraction",
    label: "Text Extraction",
    detail:
      "Text is extracted from each document and normalized into clean, machine-readable content.",
  },
  {
    id: "chunking",
    label: "Chunking",
    detail:
      "Extracted text is split into overlapping chunks sized for retrieval and the model's context window.",
  },
  {
    id: "embedding-generation",
    label: "Embedding Generation",
    detail:
      "Every chunk is converted into a dense vector embedding that represents its meaning.",
  },
  {
    id: "vector-storage",
    label: "Vector Storage",
    detail:
      "Embeddings are written to a vector index that supports fast similarity search.",
  },
  {
    id: "retrieval",
    label: "Retrieval",
    detail:
      "A query is embedded and matched against the index to surface the most relevant chunks.",
  },
  {
    id: "context-assembly",
    label: "Context Assembly",
    detail:
      "Retrieved chunks are ranked and assembled into a grounded context window for the model.",
  },
  {
    id: "llm-response",
    label: "LLM Response",
    detail:
      "The language model generates an answer grounded in the assembled context.",
  },
];

const PANEL_ID = "rag-pipeline-panel";

function HConnector() {
  return (
    <svg
      viewBox="0 0 40 12"
      className="h-3 w-8 shrink-0 self-center text-terracotta/55"
      aria-hidden="true"
    >
      <line
        x1="1"
        y1="6"
        x2="31"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        className="animate-dash-flow"
      />
      <path d="M30 3 L39 6 L30 9 Z" fill="currentColor" />
    </svg>
  );
}

function VConnector() {
  return (
    <svg
      viewBox="0 0 12 40"
      className="ml-4 h-7 w-3 text-terracotta/55"
      aria-hidden="true"
    >
      <line
        x1="6"
        y1="1"
        x2="6"
        y2="31"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        className="animate-dash-flow"
      />
      <path d="M3 30 L6 39 L9 30 Z" fill="currentColor" />
    </svg>
  );
}

interface RagPipelineProps {
  className?: string;
}

/**
 * Interactive RAG pipeline visualizer.
 *
 * Clicking or hovering a stage reveals its explanation in the panel below; the
 * dashed connectors flow to suggest direction. Fully keyboard accessible
 * (roving tabindex + arrow keys) and responsive — a horizontal flow on wide
 * screens, a vertical stepper below `xl`.
 *
 * This is an illustrative / simulated diagram, not a live model run.
 */
export default function RagPipeline({ className }: RagPipelineProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const stage = STAGES[active];

  const select = (index: number, focus = false) => {
    const next = (index + STAGES.length) % STAGES.length;
    setActive(next);
    if (focus) refs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        select(active + 1, true);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        select(active - 1, true);
        break;
      case "Home":
        event.preventDefault();
        select(0, true);
        break;
      case "End":
        event.preventDefault();
        select(STAGES.length - 1, true);
        break;
      default:
        break;
    }
  };

  const renderNode = (index: number) => {
    const item = STAGES[index];
    const isActive = index === active;
    return (
      <button
        key={item.id}
        ref={(el) => {
          refs.current[index] = el;
        }}
        type="button"
        role="tab"
        id={`rag-stage-${index}`}
        aria-selected={isActive}
        aria-controls={PANEL_ID}
        tabIndex={isActive ? 0 : -1}
        onClick={() => select(index)}
        onMouseEnter={() => setActive(index)}
        onFocus={() => setActive(index)}
        className={cn(
          "flex flex-1 flex-col items-center gap-2 rounded-xl border px-2 py-4 text-center transition-colors duration-300",
          isActive
            ? "border-terracotta bg-terracotta/10"
            : "border-forest/12 hover:border-forest/25"
        )}
      >
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full font-mono text-[0.6rem] transition-colors duration-300",
            isActive ? "bg-terracotta text-ivory" : "bg-forest/8 text-forest/60"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "font-mono text-[0.56rem] uppercase leading-tight tracking-[0.1em] transition-colors duration-300",
            isActive ? "text-forest" : "text-muted"
          )}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className={cn("rounded-2xl border border-forest/12 bg-ivory p-5 sm:p-7", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-forest/50">Illustrative RAG pipeline</p>
          <p className="mt-1 max-w-md text-xs text-muted">
            Simulated diagram — each stage is explained, not executed. Not connected
            to a live model.
          </p>
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted">
          {String(active + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Horizontal flow (wide screens) */}
      <div
        role="tablist"
        aria-label="RAG pipeline stages"
        onKeyDown={onKeyDown}
        className="mt-6 hidden items-stretch gap-1 xl:flex"
      >
        {STAGES.map((item, index) => (
          <Fragment key={item.id}>
            {renderNode(index)}
            {index < STAGES.length - 1 && <HConnector />}
          </Fragment>
        ))}
      </div>

      {/* Vertical stepper (mobile / tablet) */}
      <div
        role="tablist"
        aria-label="RAG pipeline stages"
        onKeyDown={onKeyDown}
        className="mt-6 xl:hidden"
      >
        <ol>
          {STAGES.map((item, index) => (
            <li key={item.id}>
              {renderNode(index)}
              {index < STAGES.length - 1 && <VConnector />}
            </li>
          ))}
        </ol>
      </div>

      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`rag-stage-${active}`}
        aria-live="polite"
        className="mt-6 rounded-2xl border border-forest/12 bg-sage/40 p-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.id}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={reduced ? { duration: 0 } : { duration: 0.35, ease: EASE_EDITORIAL }}
          >
            <h4 className="font-display text-xl text-forest">{stage.label}</h4>
            <p className="mt-2 text-sm text-muted">{stage.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
