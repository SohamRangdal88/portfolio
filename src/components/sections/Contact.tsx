import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { CONTACT, SITE, SOCIALS } from "@/data/portfolio";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { useToast } from "@/components/common/Toast";

function ChannelIcon({ id }: { id: string }) {
  if (id === "github") return <Github size={16} />;
  if (id === "linkedin") return <Linkedin size={16} />;
  return <Mail size={16} />;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const notify = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      notify("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      notify("Could not copy email");
    }
  };

  return (
    <section id="contact" className="relative section-pad bg-forest text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-charcoal/40 to-transparent"
      />
      <div className="container-editorial relative">
        <SectionHeading
          number="08"
          eyebrow="Contact"
          theme="forest"
          titleLines={CONTACT.headline}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-sage/70">
                No forms to fill in — reach me directly through any of the channels on the
                right. Email is the fastest way to get a reply.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 rounded-full bg-terracotta px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-ivory hover:text-forest"
                >
                  <Mail size={14} />
                  {SITE.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 rounded-full border border-ivory/25 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-sage/80 transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex items-center gap-3 text-sage/75">
              <MapPin size={16} className="text-terracotta" />
              <span className="text-sm">{SITE.location}</span>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <ul className="divide-y divide-ivory/12 overflow-hidden rounded-3xl border border-ivory/12 bg-ivory/[0.04]">
                {SOCIALS.map((social) => {
                  const external = social.id !== "email";
                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-ivory/[0.06]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-sage/80 transition-colors group-hover:border-terracotta group-hover:text-terracotta">
                          <ChannelIcon id={social.id} />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-sage/50">
                            {social.label}
                          </span>
                          <span className="truncate text-sm text-ivory">{social.handle}</span>
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="ml-auto shrink-0 text-sage/40 transition-colors group-hover:text-terracotta"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-20">
          <div className="rounded-2xl border border-ivory/12 bg-charcoal/50 p-6 font-mono text-sm">
            <p className="text-sage/80">{CONTACT.closing}</p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-3 text-terracotta"
            >
              {CONTACT.closingTag}
            </motion.p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
