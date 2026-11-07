import { useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type ClusterId = "retrieval" | "agent" | "backend" | "data";

interface Cluster {
  id: ClusterId;
  label: string;
  blurb: string;
  dot: string;
  center: { x: number; y: number };
}

interface Concept {
  id: string;
  label: string;
  cluster: ClusterId;
  x: number;
  y: number;
}

const CLUSTERS: Cluster[] = [
  {
    id: "retrieval",
    label: "Retrieval",
    blurb: "Searching an index by meaning.",
    dot: "bg-terracotta",
    center: { x: 26, y: 29 },
  },
  {
    id: "agent",
    label: "Agent",
    blurb: "Planning, tools and reasoning.",
    dot: "bg-forest",
    center: { x: 75, y: 28 },
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Services and data stores.",
    dot: "bg-forest-300",
    center: { x: 30, y: 74 },
  },
  {
    id: "data",
    label: "Data",
    blurb: "Pipelines and feature stores.",
    dot: "bg-charcoal",
    center: { x: 72, y: 74 },
  },
];

const CONCEPTS: Concept[] = [
  // retrieval
  { id: "chunking", label: "Chunking", cluster: "retrieval", x: 13, y: 28 },
  { id: "embedding", label: "Embedding", cluster: "retrieval", x: 20, y: 18 },
  { id: "vector-index", label: "Vector Index", cluster: "retrieval", x: 32, y: 18 },
  { id: "semantic-search", label: "Semantic Search", cluster: "retrieval", x: 40, y: 29 },
  { id: "hybrid-retrieval", label: "Hybrid Retrieval", cluster: "retrieval", x: 33, y: 40 },
  { id: "reranker", label: "Reranker", cluster: "retrieval", x: 20, y: 41 },
  // agent
  { id: "planner", label: "Planner", cluster: "agent", x: 66, y: 19 },
  { id: "reasoning", label: "Reasoning", cluster: "agent", x: 63, y: 31 },
  { id: "tool-use", label: "Tool Use", cluster: "agent", x: 84, y: 20 },
  { id: "agent-core", label: "Agent", cluster: "agent", x: 75, y: 31 },
  { id: "memory", label: "Memory", cluster: "agent", x: 86, y: 34 },
  // backend
  { id: "fastapi", label: "FastAPI", cluster: "backend", x: 19, y: 68 },
  { id: "rest-api", label: "REST API", cluster: "backend", x: 13, y: 79 },
  { id: "postgres", label: "PostgreSQL", cluster: "backend", x: 32, y: 66 },
  { id: "docker", label: "Docker", cluster: "backend", x: 29, y: 84 },
  { id: "service", label: "Service", cluster: "backend", x: 42, y: 74 },
  // data
  { id: "etl", label: "ETL", cluster: "data", x: 61, y: 68 },
  { id: "data-lake", label: "Data Lake", cluster: "data", x: 57, y: 79 },
  { id: "pandas", label: "Pandas", cluster: "data", x: 74, y: 66 },
  { id: "feature-store", label: "Feature Store", cluster: "data", x: 79, y: 82 },
  { id: "analytics", label: "Analytics", cluster: "data", x: 87, y: 73 },
];

/** Illustrative similarity links — does not represent measured similarity scores. */
const LINKS: Array<[string, string]> = [
  ["chunking", "embedding"],
  ["embedding", "vector-index"],
  ["vector-index", "semantic-search"],
  ["semantic-search", "hybrid-retrieval"],
  ["hybrid-retrieval", "reranker"],
  ["semantic-search", "embedding"],
  ["agent-core", "planner"],
  ["agent-core", "reasoning"],
  ["agent-core", "tool-use"],
  ["agent-core", "memory"],
  ["planner", "reasoning"],
  ["fastapi", "rest-api"],
  ["fastapi", "service"],
  ["fastapi", "postgres"],
  ["service", "postgres"],
  ["docker", "service"],
  ["etl", "data-lake"],
  ["etl", "pandas"],
  ["pandas", "feature-store"],
  ["data-lake", "analytics"],
  ["feature-store", "analytics"],
  ["etl", "analytics"],
  ["embedding", "feature-store"],
  ["chunking", "etl"],
  ["agent-core", "fastapi"],
  ["vector-index", "data-lake"],
];

const CLUSTER_MAP: Record<ClusterId, Cluster> = CLUSTERS.reduce(
  (acc, cluster) => {
    acc[cluster.id] = cluster;
    return acc;
  },
  {} as Record<ClusterId, Cluster>
);

const CONCEPT_MAP: Record<string, Concept> = CONCEPTS.reduce(
  (acc, concept) => {
    acc[concept.id] = concept;
    return acc;
  },
  {} as Record<string, Concept>
);

interface EmbeddingExplorerProps {
  className?: string;
}

/**
 * Illustrative 2D semantic embedding explorer.
 *
 * Concepts are plotted in scattered clusters (retrieval / agent / backend /
 * data) with lines drawn between related ideas. Hovering or focusing a point
 * reveals its label and its illustrative similarity links.
 *
 * IMPORTANT: the coordinates are simulated for visualization only — they are
 * NOT actual outputs, projections or similarity scores from any embedding
 * model. Keyboard accessible and reduced-motion friendly.
 */
export default function EmbeddingExplorer({ className }: EmbeddingExplorerProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const relatedIds = useMemo(
    () =>
      active
        ? LINKS.filter(([a, b]) => a === active || b === active).map(([a, b]) =>
            a === active ? b : a
          )
        : [],
    [active]
  );

  const activeConcept = active ? CONCEPT_MAP[active] : null;

  return (
    <div className={cn("rounded-2xl border border-forest/12 bg-ivory p-5 sm:p-7", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-forest/50">Semantic embedding explorer</p>
          <p className="mt-1 max-w-md text-xs text-muted">
            Hover or focus a point to inspect it and reveal illustrative similarity
            links.
          </p>
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted">
          {CONCEPTS.length} concepts
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Plot */}
        <div
          role="group"
          aria-label="Illustrative embedding scatter plot"
          className="relative mx-auto aspect-square w-full max-w-[34rem] rounded-xl border border-forest/10 bg-sage/25"
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {CLUSTERS.map((cluster) => (
              <circle
                key={cluster.id}
                cx={cluster.center.x}
                cy={cluster.center.y}
                r={23}
                fill="none"
                className="stroke-forest"
                strokeOpacity={0.14}
                strokeWidth={0.25}
                strokeDasharray="1.5 1.5"
              />
            ))}

            {LINKS.map(([a, b]) => {
              const pa = CONCEPT_MAP[a];
              const pb = CONCEPT_MAP[b];
              const isLinked = active !== null && (a === active || b === active);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  className={cn(
                    "transition-[stroke-opacity] duration-300",
                    isLinked ? "stroke-terracotta" : "stroke-forest"
                  )}
                  strokeWidth={isLinked ? 0.45 : 0.22}
                  strokeOpacity={active ? (isLinked ? 0.9 : 0.1) : 0.28}
                  strokeDasharray={isLinked ? "2 1.5" : undefined}
                />
              );
            })}
          </svg>

          {CONCEPTS.map((concept) => {
            const cluster = CLUSTER_MAP[concept.cluster];
            const isActive = active === concept.id;
            const isRelated = relatedIds.includes(concept.id);
            const isDimmed = active !== null && !isActive && !isRelated;
            const showLabel = isActive || isRelated;

            return (
              <button
                key={concept.id}
                type="button"
                onMouseEnter={() => setActive(concept.id)}
                onFocus={() => setActive(concept.id)}
                onClick={() => setActive(concept.id)}
                aria-label={`${concept.label} — ${cluster.label} cluster`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ left: `${concept.x}%`, top: `${concept.y}%` }}
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    cluster.dot,
                    isActive ? "h-3.5 w-3.5" : "h-2.5 w-2.5",
                    isDimmed && "opacity-25",
                    isActive && !reduced && "animate-pulse-dot"
                  )}
                />
                {showLabel && (
                  <span
                    className={cn(
                      "pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] backdrop-blur-sm",
                      concept.x < 50
                        ? "left-[calc(100%+0.4rem)]"
                        : "right-[calc(100%+0.4rem)]",
                      isActive
                        ? "border-terracotta/50 bg-ivory text-forest"
                        : "border-forest/15 bg-ivory/90 text-muted"
                    )}
                  >
                    {concept.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-terracotta/30 bg-terracotta/8 p-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-terracotta">
              Illustrative — not real data
            </p>
            <p className="mt-2 text-xs leading-relaxed text-charcoal/75">
              Point coordinates are simulated purely for visualization. They are{" "}
              <strong className="font-semibold">not</strong> actual outputs,
              projections or similarity scores from any embedding model.
            </p>
          </div>

          <div className="min-h-[9.5rem] rounded-2xl border border-forest/12 bg-ivory p-5">
            {activeConcept ? (
              <>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                    {CLUSTER_MAP[activeConcept.cluster].label} cluster
                  </span>
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      CLUSTER_MAP[activeConcept.cluster].dot
                    )}
                  />
                </div>
                <h3 className="mt-3 font-display text-2xl text-forest">
                  {activeConcept.label}
                </h3>
                <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
                  Illustrative similarity links
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {relatedIds.map((id) => (
                    <li
                      key={id}
                      className="rounded-full border border-forest/15 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-forest/80"
                    >
                      {CONCEPT_MAP[id].label}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-muted">
                Select a point to see its cluster and the concepts it is linked to.
              </p>
            )}
          </div>

          <ul className="grid grid-cols-2 gap-2">
            {CLUSTERS.map((cluster) => (
              <li
                key={cluster.id}
                className="flex items-center gap-3 rounded-xl border border-forest/10 px-3 py-2"
              >
                <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", cluster.dot)} />
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-charcoal">
                    {cluster.label}
                  </span>
                  <span className="block truncate font-mono text-[0.54rem] uppercase tracking-[0.12em] text-muted">
                    {cluster.blurb}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
