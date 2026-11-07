import { useEffect, useRef, useState } from "react";
import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  SITE,
  SKILL_CATEGORIES,
  SOCIALS,
} from "@/data/portfolio";
import { useToast } from "@/components/common/Toast";
import { cn } from "@/lib/cn";

interface TerminalLine {
  id: number;
  kind: "input" | "output" | "accent";
  text: string;
}

const PROMPT = "soham@portfolio:~$";

const COMMANDS = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "achievements",
  "contact",
  "github",
  "resume",
  "clear",
] as const;

const BANNER: TerminalLine[] = [
  { id: 1, kind: "output", text: "Soham Rangdal — interactive portfolio shell" },
  { id: 2, kind: "output", text: 'Type "help" for available commands.' },
];

function buildOutput(command: string): TerminalLine[] {
  const make = (text: string, kind: TerminalLine["kind"] = "output"): TerminalLine => ({
    id: Date.now() + Math.random(),
    kind,
    text,
  });

  switch (command) {
    case "help":
      return [
        make("Available commands:"),
        make(COMMANDS.join("   ")),
        make("Tip: use ↑ / ↓ for history, Tab to autocomplete."),
      ];
    case "whoami":
      return [
        make("Final-year Information Technology student."),
        make("Internship and freelance software experience."),
        make("Work across backend, AI and full-stack systems."),
        make("Focused on practical, testable software."),
      ];
    case "about":
      return [
        make(`${SITE.role} based in ${SITE.location}.`),
        make(SITE.description),
      ];
    case "skills":
      return [
        make("Technical arsenal:"),
        ...SKILL_CATEGORIES.map((c) => make(`${c.index}. ${c.title}: ${c.items.join(", ")}`)),
      ];
    case "projects":
      return [
        ...PROJECTS.map((p) => make(`[${p.number}] ${p.title}`)),
        make("Run a project from the Projects section for the full case study."),
      ];
    case "experience":
      return EXPERIENCE.flatMap((e) => [
        make(`${e.role} — ${e.company} (${e.period})`, "accent"),
        ...e.contributions.map((c) => make(`  · ${c}`)),
      ]);
    case "education":
      return EDUCATION.map((e) =>
        make(`${e.qualification} — ${e.institution} · ${e.score} ${e.scoreLabel}`)
      );
    case "achievements":
      return ACHIEVEMENTS.map((a) => make(`${a.title} — ${a.placement}: ${a.description}`));
    case "contact":
      return [
        make(`Email:    ${SITE.email}`),
        make(`LinkedIn: ${SOCIALS[1].href}`),
        make(`GitHub:   ${SOCIALS[0].href}`),
        make(`Location: ${SITE.location}`),
      ];
    case "github":
      return [make(SOCIALS[0].href, "accent")];
    case "resume":
      return SITE.resumeUrl
        ? [make(`Resume: ${SITE.resumeUrl}`)]
        : [make("Resume link not configured yet — add /public/resume.pdf")];
    default:
      return [make(`command not found: ${command}. Type "help".`)];
  }
}

/** A genuinely interactive terminal: parsing, history, arrow keys, autocomplete, clear. */
export default function Terminal({ className }: { className?: string }) {
  const [lines, setLines] = useState<TerminalLine[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const notify = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;

    const echo: TerminalLine = { id: Date.now(), kind: "input", text: raw };
    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    if (command === "clear") {
      setLines([]);
      setValue("");
      return;
    }

    if (command === "resume" && !SITE.resumeUrl) {
      notify("Resume link not configured yet");
    }

    setLines((prev) => [...prev, echo, ...buildOutput(command)]);
    setValue("");
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      run(value);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(history[next]);
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(value.trim().toLowerCase()));
      if (match) setValue(match);
    }
  };

  return (
    <div
      className={cn(
        "flex h-[26rem] flex-col overflow-hidden rounded-2xl border border-line/60 bg-charcoal font-mono text-[0.78rem] text-ivory/90 shadow-2xl",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-ivory/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-ivory/25" />
        <span className="ml-3 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/45">
          zsh — portfolio
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto px-4 py-4" data-lenis-prevent>
        {lines.map((line) => (
          <div key={line.id} className="flex gap-2 leading-relaxed">
            {line.kind === "input" ? (
              <>
                <span className="shrink-0 text-terracotta">{PROMPT}</span>
                <span>{line.text}</span>
              </>
            ) : (
              <span className={line.kind === "accent" ? "text-terracotta" : "text-sage/85"}>
                {line.text}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-ivory/10 px-4 py-3">
        <span className="shrink-0 text-terracotta">{PROMPT}</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
          className="w-full bg-transparent text-ivory outline-none placeholder:text-ivory/30"
          placeholder="type a command…"
        />
        <span className="h-4 w-2 animate-blink bg-terracotta" />
      </div>
    </div>
  );
}
