import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Command as CommandIcon } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/data/portfolio";
import { scrollToHash, lockScroll } from "@/lib/smoothScroll";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { EASE_EDITORIAL } from "@/animations/motion";
import { cn } from "@/lib/cn";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();

  // Track the section currently in view.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(menuOpen);
    return () => lockScroll(false);
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-terracotta transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_EDITORIAL, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[70]"
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-6 transition-all duration-500",
            scrolled
              ? "mt-3 w-[calc(100%-1.5rem)] max-w-6xl rounded-full border border-forest/10 bg-ivory/80 px-5 py-3 backdrop-blur-xl"
              : "mt-0 max-w-[1440px] px-[clamp(1.25rem,5vw,5rem)] py-6"
          )}
        >
          <button
            onClick={() => go("#home")}
            className="shrink-0 font-display text-sm font-semibold tracking-tight text-forest"
          >
            {SITE.name.toUpperCase()}
            <span className="text-terracotta">.</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.href)}
                className={cn(
                  "relative rounded-full px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors",
                  active === item.id ? "text-forest" : "text-muted hover:text-forest"
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-sage"
                    transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="hidden items-center gap-2 rounded-full border border-forest/15 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted transition-colors hover:border-forest/40 hover:text-forest sm:flex"
            >
              <CommandIcon size={13} />
              <span>Ctrl K</span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-forest/15 p-2 text-forest lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-forest px-6 py-6 text-ivory"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold">
                {SITE.name.toUpperCase()}
                <span className="text-terracotta">.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-ivory/20 p-2"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-12 flex flex-1 flex-col justify-center gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => go(item.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE_EDITORIAL }}
                  className="flex items-baseline justify-between border-b border-ivory/10 py-4 text-left"
                >
                  <span
                    className="display-heading"
                    style={{ fontSize: "clamp(1.75rem, 9vw, 3.25rem)" }}
                  >
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-sage/50">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="font-mono text-[0.7rem] tracking-[0.2em] text-sage/60">
              {SITE.location.toUpperCase()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
