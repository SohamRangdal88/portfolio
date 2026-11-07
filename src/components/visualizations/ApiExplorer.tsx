import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/cn";

SyntaxHighlighter.registerLanguage("json", json);

interface Endpoint {
  id: string;
  method: "GET" | "POST";
  path: string;
  summary: string;
  request?: string;
  response: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    id: "health",
    method: "GET",
    path: "/health",
    summary: "Service liveness and dependency status.",
    response: `{
  "status": "ok",
  "service": "portfolio-api",
  "version": "1.0.0",
  "uptime_seconds": 84213
}`,
  },
  {
    id: "projects",
    method: "GET",
    path: "/projects",
    summary: "Returns the portfolio project catalogue.",
    response: `{
  "count": 5,
  "items": [
    { "id": "01", "title": "Industrial Incident Management & SOP Analyzer" },
    { "id": "02", "title": "Daivik" },
    { "id": "03", "title": "NutriAI" },
    { "id": "04", "title": "Shilp AI" },
    { "id": "05", "title": "Faculty 360" }
  ]
}`,
  },
  {
    id: "skills",
    method: "GET",
    path: "/skills",
    summary: "Returns the grouped technical stack.",
    response: `{
  "categories": 7,
  "sample": {
    "ai": ["LLMs", "RAG", "NLP", "Embeddings", "Semantic Search"],
    "vector_databases": ["ChromaDB", "Pinecone", "FAISS"]
  }
}`,
  },
  {
    id: "analyze",
    method: "POST",
    path: "/analyze",
    summary: "Illustrative incident analysis endpoint.",
    request: `{
  "incident": "Retrieval returns stale SOP for mode-3 outage",
  "top_k": 5,
  "include_rca": true
}`,
    response: `{
  "incident_id": "INC-20431",
  "recommended_steps": [
    "Re-index SOP corpus (stale embeddings detected)",
    "Verify chunk overlap for affected documents",
    "Re-run hybrid retrieval with tuned alpha"
  ],
  "confidence": 0.82,
  "simulated": true
}`,
  },
];

export default function ApiExplorer({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState(ENDPOINTS[0].id);
  const active = ENDPOINTS.find((e) => e.id === activeId) ?? ENDPOINTS[0];

  return (
    <div className={cn("rounded-2xl border border-forest/12 bg-ivory p-5 sm:p-7", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow text-forest/50">FastAPI-style interface</p>
          <p className="mt-1 text-sm text-muted">
            Illustrative API explorer — endpoints are simulated and not a live service.
          </p>
        </div>
        <span className="rounded-full bg-terracotta/12 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-terracotta">
          simulated
        </span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ul className="space-y-2" role="tablist" aria-label="API endpoints">
          {ENDPOINTS.map((endpoint) => {
            const isActive = endpoint.id === activeId;
            return (
              <li key={endpoint.id}>
                <button
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(endpoint.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                    isActive
                      ? "border-forest bg-forest text-ivory"
                      : "border-forest/12 hover:border-forest/40"
                  )}
                >
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 font-mono text-[0.6rem] font-semibold",
                      endpoint.method === "GET"
                        ? "bg-sage text-forest"
                        : "bg-terracotta/20 text-terracotta"
                    )}
                  >
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-xs">{endpoint.path}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="min-w-0 rounded-xl border border-forest/12 bg-sage/25 p-4">
          <p className="text-sm text-charcoal">{active.summary}</p>

          {active.request && (
            <div className="mt-4">
              <p className="eyebrow text-forest/45">Request body</p>
              <div className="mt-2 overflow-x-auto rounded-lg">
                <SyntaxHighlighter
                  language="json"
                  style={oneLight}
                  customStyle={{
                    margin: 0,
                    background: "transparent",
                    fontSize: "0.72rem",
                    padding: 0,
                  }}
                >
                  {active.request}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          <div className="mt-4">
            <p className="eyebrow text-forest/45">Response</p>
            <div className="mt-2 overflow-x-auto rounded-lg">
              <SyntaxHighlighter
                language="json"
                style={oneLight}
                customStyle={{
                  margin: 0,
                  background: "transparent",
                  fontSize: "0.72rem",
                  padding: 0,
                }}
              >
                {active.response}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
