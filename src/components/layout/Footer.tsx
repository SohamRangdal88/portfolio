import { ArrowUp } from "lucide-react";
import { NAV_ITEMS, SITE, SOCIALS } from "@/data/portfolio";
import { scrollToHash } from "@/lib/smoothScroll";
import Reveal from "@/components/common/Reveal";
import Magnetic from "@/components/common/Magnetic";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest text-ivory">
      <div className="container-editorial section-pad">
        <Reveal>
          <p className="eyebrow text-sage/60">Get in touch</p>
          <h2
            className="mt-4 display-heading"
            style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
          >
            {SITE.name.toUpperCase()}
            <span className="text-terracotta">.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sage/70">
            A final-year Information Technology student with experience across
            backend services, AI applications and full-stack software.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-ivory/10 pt-10 md:grid-cols-3">
          <div>
            <p className="eyebrow text-sage/50">Navigation</p>
            <ul className="mt-5 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHash(item.href)}
                    className="text-sm text-sage/80 transition-colors hover:text-terracotta"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-sage/50">Elsewhere</p>
            <ul className="mt-5 space-y-2">
              {SOCIALS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-sage/80 transition-colors hover:text-terracotta"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-sage/50">Details</p>
            <ul className="mt-5 space-y-2 text-sm text-sage/80">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-mono transition-colors hover:text-terracotta"
                >
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-ivory/10 pt-6">
          <p className="font-mono text-[0.68rem] tracking-[0.15em] text-sage/50">
            © {year} {SITE.name}. All rights reserved.
          </p>

          <Magnetic strength={0.4}>
            <button
              onClick={() => scrollToHash("#home")}
              className="flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-sage/80 transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <ArrowUp size={13} />
              Back to top
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
