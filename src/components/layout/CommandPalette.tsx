import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react";
import { NAV_ITEMS, SITE, SOCIALS } from "@/data/portfolio";
import { scrollToHash, lockScroll } from "@/lib/smoothScroll";
import { useToast } from "@/components/common/Toast";
import { EASE_EDITORIAL } from "@/animations/motion";
import { cn } from "@/lib/cn";

interface Command {
  id: string;
  label: string;
  hint: string;
  group: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const notify = useToast();

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = NAV_ITEMS.map((item) => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      hint: item.href,
      group: "Navigate",
      run: () => scrollToHash(item.href),
    }));

    const actions: Command[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        hint: SITE.email,
        group: "Actions",
        run: () => {
          navigator.clipboard?.writeText(SITE.email).then(
            () => notify("Email copied to clipboard"),
            () => notify("Could not copy email")
          );
        },
      },
      {
        id: "open-github",
        label: "Open GitHub profile",
        hint: SOCIALS[0].handle,
        group: "Actions",
        run: () => window.open(SOCIALS[0].href, "_blank", "noopener"),
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn profile",
        hint: SOCIALS[1].handle,
        group: "Actions",
        run: () => window.open(SOCIALS[1].href, "_blank", "noopener"),
      },
    ];

    if (SITE.resumeUrl) {
      actions.unshift({
        id: "resume",
        label: "Download resume",
        hint: SITE.resumeUrl,
        group: "Actions",
        run: () => window.open(SITE.resumeUrl as string, "_blank", "noopener"),
      });
    } else {
      actions.unshift({
        id: "resume-missing",
        label: "Resume — not configured yet",
        hint: "add /public/resume.pdf",
        group: "Actions",
        run: () => notify("Resume link not configured yet"),
      });
    }

    return [...nav, ...actions];
  }, [notify]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      lockScroll(false);
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setIndex((i) => Math.min(filtered.length - 1, i + 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (event.key === "Enter") {
        const cmd = filtered[index];
        if (cmd) {
          cmd.run();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, index, onClose]);

  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-forest/15 bg-ivory shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-forest/10 px-4 py-3.5">
              <Search size={16} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands…"
                className="w-full bg-transparent font-mono text-sm text-charcoal outline-none placeholder:text-muted/70"
              />
              <kbd className="rounded border border-forest/15 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center font-mono text-xs text-muted">
                  No commands found.
                </div>
              )}

              {groups.map((group) => (
                <div key={group} className="mb-1">
                  <div className="px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                    {group}
                  </div>
                  {filtered
                    .filter((c) => c.group === group)
                    .map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd);
                      const isActive = globalIndex === index;
                      return (
                        <button
                          key={cmd.id}
                          onMouseEnter={() => setIndex(globalIndex)}
                          onClick={() => {
                            cmd.run();
                            onClose();
                          }}
                          className={cn(
                            "flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors",
                            isActive ? "bg-sage" : "hover:bg-sage/50"
                          )}
                        >
                          <span className="text-sm text-charcoal">{cmd.label}</span>
                          <span className="truncate font-mono text-[0.65rem] text-muted">
                            {cmd.hint}
                          </span>
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-forest/10 px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              <span className="flex items-center gap-1.5">
                <ArrowUp size={11} />
                <ArrowDown size={11} />
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <CornerDownLeft size={11} />
                select
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
