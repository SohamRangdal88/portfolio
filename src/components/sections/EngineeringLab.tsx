import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LAB_DEMOS } from "@/data/portfolio";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import Terminal from "@/components/interactions/Terminal";
import RagPipeline from "@/components/visualizations/RagPipeline";
import EmbeddingExplorer from "@/components/visualizations/EmbeddingExplorer";
import AgentWorkflow from "@/components/visualizations/AgentWorkflow";
import ApiExplorer from "@/components/visualizations/ApiExplorer";
import SystemDesignExplorer from "@/components/visualizations/SystemDesignExplorer";
import { EASE_EDITORIAL } from "@/animations/motion";
import { cn } from "@/lib/cn";

/** Personal engineering records shown individually, not as an employer comparison. */
const ENGINEERING_RECORDS = [
  { value: "10,000+", label: "Documents indexed", context: "Daivik knowledge base" },
  { value: "<200ms", label: "Retrieval latency", context: "Hybrid retrieval pipeline" },
  { value: "30+", label: "API test cases", context: "REST API test suite" },
];

type DemoId = "systems" | "rag" | "embedding" | "agent" | "api";

export default function EngineeringLab() {
  const [active, setActive] = useState<DemoId>("systems");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeDemo = LAB_DEMOS.find((demo) => demo.id === active) ?? LAB_DEMOS[0];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next += 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next -= 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = LAB_DEMOS.length - 1;
    else return;

    event.preventDefault();
    next = (next + LAB_DEMOS.length) % LAB_DEMOS.length;
    setActive(LAB_DEMOS[next].id as DemoId);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="lab" className="relative section-pad bg-charcoal text-ivory">
      <div className="container-editorial">
        <SectionHeading
          number="07"
          eyebrow="Engineering Lab"
          theme="charcoal"
          titleLines={["INTERACTIVE", "SYSTEMS STUDIO."]}
          intro={
            <p className="text-ivory/60">
              Explore software architecture, AI workflows, retrieval, agents and APIs
              through detailed interactive examples. Everything is illustrative and
              simulated; nothing connects to a production backend.
            </p>
          }
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Engineering demonstrations">
              {LAB_DEMOS.map((demo, index) => {
                const isActive = demo.id === active;
                return (
                  <button
                    key={demo.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={`lab-tab-${demo.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="lab-demo-panel"
                    tabIndex={isActive ? 0 : -1}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    onClick={() => setActive(demo.id as DemoId)}
                    className={cn(
                      "rounded-full border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors",
                      isActive
                        ? "border-terracotta bg-terracotta text-ivory"
                        : "border-ivory/20 text-ivory/70 hover:border-ivory/50 hover:text-ivory"
                    )}
                  >
                    {demo.label}
                  </button>
                );
              })}
            </div>

            <div
              id="lab-demo-panel"
              role="tabpanel"
              aria-labelledby={`lab-tab-${activeDemo.id}`}
              tabIndex={0}
              className="mt-6 outline-none"
            >
              <div className="mb-4">
                <p className="eyebrow text-sage/60">{activeDemo.title}</p>
                <p className="mt-2 text-sm text-ivory/55">{activeDemo.caption}</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
                >
                  {active === "systems" && <SystemDesignExplorer />}
                  {active === "rag" && <RagPipeline />}
                  {active === "embedding" && <EmbeddingExplorer />}
                  {active === "agent" && <AgentWorkflow />}
                  {active === "api" && <ApiExplorer />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-4">
            <Reveal>
              <div className="rounded-2xl border border-ivory/12 bg-ivory/[0.04] p-6">
                <p className="eyebrow text-sage/60">Engineering records</p>
                <p className="mt-2 text-sm text-ivory/55">
                  Selected project and testing records.
                </p>
                <div className="mt-5 space-y-3">
                  {ENGINEERING_RECORDS.map((record) => (
                    <div
                      key={record.label}
                      className="flex items-center justify-between gap-4 rounded-xl border border-ivory/10 bg-ivory/[0.03] p-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm text-ivory/80">{record.label}</p>
                        <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ivory/40">
                          {record.context}
                        </p>
                      </div>
                      <span className="shrink-0 font-display text-2xl text-terracotta">
                        {record.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-6">
              <p className="eyebrow text-sage/60">Try the shell</p>
              <p className="mt-2 text-sm text-ivory/55">
                A real command-line interface over the portfolio data.
              </p>
              <div className="mt-4">
                <Terminal />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
