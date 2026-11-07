# BUILD PROGRESS — Soham Rangdal Portfolio

> **Purpose of this file:** Single source of truth for build state. Every agent (or human)
> working on this repo MUST update this file when a task is completed or a blocker is hit,
> so the next agent knows exactly where to resume. Update the **RESUME HERE** block and the
> relevant checkboxes. Add an entry to the **Session Log** at the bottom.

---

## RESUME HERE

- **Status:** ✅ Feature-complete and building. Typecheck + production build pass.
- **Current phase:** PHASE 5/6 — Testing & final delivery (manual browser QA recommended).
- **Last completed task:** Replaced the Contact Name/Email/Message form with direct contact
  channels (Email / GitHub / LinkedIn rows + mailto CTA + copy-email + location), retitled the
  Education section to "EDUCATION." and converted its three records into flip cards.
- **Next recommended tasks:**
  1. Manual browser QA (`npm run dev`) at desktop width (1024px+) to confirm the pinned gallery
     stays vertically centered; current browser check was at 836px (responsive fallback).
     Also re-check on a real phone (≈360–430px wide) after the mobile pass.
  2. Optional: drop a real `public/resume.pdf` and set `SITE.resumeUrl = "/resume.pdf"` in
     `src/data/portfolio.ts` to enable the resume download CTA.
  3. Confirm or replace the Simplitechkey website link; the listed domain did not respond to
     direct fetch. Optional: confirm Shilp AI's technology stack, currently hidden until verified.
     Verified live links: Daivik, NutriAI, Shilp AI. Verified GitHub links: Daivik, Faculty 360.
- **Follow-up:** Brihad Veterinary Academy's website is verified. The listed Simplitechkey domain
  (`www.simplitechkey.in`) did not respond to direct fetch; confirm or replace it if needed.
- **Blockers:** None for build or typecheck.
- **Dev server:** `npm run dev` → http://localhost:5173 (falls back to 5174 when 5173 is
  already in use). Verified booting; preview opens with no browser errors.

---

## PROJECT SNAPSHOT

- **Owner:** Soham Rangdal — final-year Information Technology student; work spans software,
  backend, AI applications and full-stack development.
- **Deliverable:** Complete, production-quality, animation-rich creative portfolio website.
- **Reference for look/feel:** https://fineacts.co/ (inspiration only — original identity built).
- **Workspace root:** `d:\portfolio`

### Hard constraints (from the spec — do not violate)
- Do NOT fabricate: project metrics, employment dates, certifications, client identities,
  live deployment URLs, GitHub repo links, testimonials, company endorsements, skill percentages.
- Use ONLY these real stats: `10,000+ documents indexed`, `sub-200ms retrieval latency`,
  `5+ clients`, `9.2/10 CGPA`, `30+ API test cases`.
- Every demo/visualization is clearly labelled **simulated / illustrative**.
- Contact form hands off to the visitor's email client (real mechanism); no false success messages.
- TypeScript throughout; centralized content config; animation cleanup; reduced-motion support.

### Color palette
| Token | Value |
|---|---|
| Primary background | Warm Ivory `#F3F0E8` |
| Primary identity | Deep Forest Green `#173B35` |
| Secondary background | Sage Green `#DCE8DF` |
| Accent | Terracotta `#D77B5B` |
| Primary text | Charcoal `#242824` |
| Secondary text | Muted Grey `#777B75` |

### Tech stack (as implemented)
Vite 6 · React 18 · TypeScript · Tailwind CSS v4 (CSS-first `@theme`) · GSAP + ScrollTrigger ·
Lenis · `motion` (import from `motion/react`) · Three.js + React Three Fiber · lucide-react ·
Recharts · react-syntax-highlighter (PrismLight, json only) · react-intersection-observer.
Path alias `@/*` → `src/*`.

---

## PHASE CHECKLIST

### PHASE 0 — Setup
- [x] `PROGRESS.md` tracking doc

### PHASE 1 — Repository inspection & scaffolding
- [x] Repo confirmed empty at start → built from scratch
- [x] Vite + React + TypeScript project
- [x] Dependencies installed
- [x] Tailwind v4 + design tokens + Google Fonts (Space Grotesk / Inter / JetBrains Mono)
- [x] Dev server boots; production build passes

### PHASE 2 — Design architecture
- [x] Design tokens (`src/styles/globals.css` `@theme`)
- [x] Global styles + base + accessibility (reduced motion, focus rings, sr-only)
- [x] Keyframes / animation utilities (`src/styles/animations.css`)
- [x] `index.html` metadata + font preconnect

### PHASE 3 — Implementation
#### Data layer
- [x] `src/data/portfolio.ts` (typed interfaces + all content)

#### Hooks & animation utilities
- [x] `src/hooks/useLenis` equivalent → `src/lib/smoothScroll.ts` (Lenis + GSAP ticker sync, scrollToHash, lockScroll)
- [x] `src/hooks/useScrollProgress.ts`
- [x] `src/hooks/useReducedMotion.ts`
- [x] `src/animations/gsap.ts` (single plugin registration)
- [x] `src/animations/motion.ts` (variants + shared easing)

#### Common primitives
- [x] `Reveal`, `SplitText`, `SectionHeading`, `AnimatedCounter`, `Magnetic`, `Marquee`, `Toast`

#### Layout components
- [x] `layout/Preloader.tsx` (terminal-style, session-skipped, reduced-motion safe)
- [x] `layout/Navbar.tsx` (floating, active-section tracking, scroll progress, mobile overlay)
- [x] `layout/CommandPalette.tsx` (Ctrl/Cmd+K, search, keyboard nav)
- [x] `layout/Footer.tsx`
- [x] `layout/CustomCursor.tsx`

#### Sections
- [x] `sections/Hero.tsx` (id `home`)
- [x] `sections/About.tsx` (id `about`)
- [x] `sections/Skills.tsx` (id `expertise`)
- [x] `sections/Projects.tsx` (id `projects`)
- [x] `sections/Experience.tsx` (id `experience`)
- [x] `sections/Education.tsx` (id `education`)
- [x] `sections/Achievements.tsx` (id `achievements`)
- [x] `sections/EngineeringLab.tsx` (id `lab`)
- [x] `sections/Contact.tsx` (id `contact`)

#### Interactions
- [x] `interactions/Terminal.tsx` (real commands, history, arrow keys, Tab autocomplete, clear)
- [x] `interactions/FlipCard.tsx`
- [x] `interactions/HorizontalScroller.tsx` (GSAP pin/scrub + lg/reduced-motion fallback)
- [x] `interactions/Magnetic` → `common/Magnetic.tsx`
- [x] `interactions/CustomCursor` → `layout/CustomCursor.tsx`
- [x] `interactions/Timeline.tsx` (scroll-linked fill + moving indicator)
- [x] `interactions/SkillWheel.tsx`

#### Visualizations
- [x] `visualizations/NeuralNetwork.tsx` (R3F, hero background)
- [x] `visualizations/RagPipeline.tsx`
- [x] `visualizations/EmbeddingExplorer.tsx`
- [x] `visualizations/AgentWorkflow.tsx`
- [x] `visualizations/ApiExplorer.tsx`

### PHASE 4 — Animation polish
- [x] Lenis ↔ GSAP ScrollTrigger sync + `ScrollTrigger.refresh()` after preloader
- [x] Distinct motion identity per section
- [x] Typography reveals (SplitText), horizontal scrolling, flip cards, magnetic buttons
- [x] Bundle chunking (three / syntax split; syntax trimmed to json-only PrismLight)

### PHASE 5 — Testing
- [x] `npx tsc --noEmit` passes (0 errors)
- [x] `npm run build` passes
- [x] Dev server boots cleanly (http://localhost:5173)
- [ ] **Manual browser QA** — open dev server and click through every section, test
      desktop / tablet / mobile, and toggle `prefers-reduced-motion` (recommended next step)
- [x] Reduced-motion handling implemented across all animated components

### PHASE 6 — Final delivery
- [x] `README.md` with setup / dev / build / deploy instructions
- [ ] Optional: real `public/resume.pdf`
- [x] GitHub profile link set to `github.com/sohamrangdal88` (was `github.com/sohamrangdal`)
- [ ] Optional: real per-project `github` / `live` URLs (intentionally `null` — profile-only decision)

---

## KEY DECISIONS LOG

| Date | Decision | Reason |
|---|---|---|
| 2026-11-07 | Built from scratch (repo was empty) | No existing files |
| 2026-11-07 | Tailwind v4 CSS-first `@theme` tokens | Simplest token system, no config file |
| 2026-11-07 | `motion/react` (not `framer-motion`) | Current package name |
| 2026-11-07 | R3F for hero NeuralNetwork only; CSS/SVG for other viz | Performance vs. fidelity balance |
| 2026-11-07 | `PrismLight` + json-only syntax highlighting | Cut syntax chunk 635 kB → 52 kB |
| 2026-11-07 | Contact form → `mailto:` handoff | Honest "real" submission without a backend |
| 2026-11-07 | Resume CTA degrades to a toast when `resumeUrl` is null | Avoid fake/broken download |
| 2026-11-07 | Project `github`/`live` left `null`; only the GitHub *profile* is linked | Public repos don't match the portfolio projects — no guessed URLs |

---

## FILE MAP

```
src/
  App.tsx                       # composition root + Lenis + Ctrl/Cmd+K
  data/portfolio.ts             # single source of content (typed)
  animations/{gsap,motion}.ts
  hooks/{useReducedMotion,useScrollProgress}.ts
  lib/{cn,smoothScroll}.ts
  components/
    common/  Reveal, SplitText, SectionHeading, AnimatedCounter, Magnetic, Marquee, Toast
    layout/  Preloader, Navbar, CommandPalette, Footer, CustomCursor
    sections/ Hero, About, Skills, Projects, Experience, Education, Achievements,
              EngineeringLab, Contact
    interactions/ Terminal, FlipCard, HorizontalScroller, Timeline, SkillWheel (not used in Skills)
    visualizations/ NeuralNetwork, RagPipeline, EmbeddingExplorer, AgentWorkflow, ApiExplorer,
                    SystemDesignExplorer
  styles/ globals.css (tokens) + animations.css
public/
  soham-rangdal-cutout.png, favicon-profile.png, favicon-profile.svg
```

---

## SESSION LOG

### Session 12 — 2026-11-07 (contact channels + education flip cards)
- **Contact** (`src/components/sections/Contact.tsx`): removed the Name / Email / Message form
  and the "Send message" button (no backend; it only opened a `mailto:`). Replaced the form
  column with a contact-channel list built from `SOCIALS` — one row each for Email, GitHub and
  LinkedIn (icon, label, handle, external-link arrow; external rows open in a new tab, the
  mailto row does not). Kept the mailto CTA, copy-email button, location line and the closing
  terminal block. Dropped the now-unused `Field` component, `FormState`, `EMAIL_RE`, validation
  and the `magnetic`/`cn`/`Send` imports.
- **Education** (`src/components/sections/Education.tsx`): heading changed from
  "SSC TO HSC TO / INFORMATION TECHNOLOGY." to a single line "EDUCATION." (eyebrow is now
  "Academic background"). The three records are now **flip cards** (`FlipCard`): front shows
  index badge, stage label, qualification, institution, period and score; back shows either the
  B.Tech subject list or the completion summary. Shared `min-h-[15.5rem]` keeps the row aligned.
  The **B.Tech qualification renders in `font-mono` (IBM Plex Mono)** instead of the site's
  display face (Fraunces), per request; SSC/HSC keep the display face. Removed the old connector
  hairline.
- Verified: `npx tsc --noEmit` exit 0; `npm run build` exit 0 (css 62.05 kB, index 384.95 kB,
  syntax 51.73 kB, three 961.92 kB).

### Session 11 — 2026-11-07 (About cleanup + mobile-screen pass)
- Removed the About sidebar's "Engineering patterns" block (the three `interface → api → …`
  annotation rows) and its `ANNOTATIONS` const. The internship cards remain.
- Mobile-screen pass:
  - `globals.css`: `overflow-x: clip` on `html` **and** `body` (replaces `body overflow-x: hidden`;
    `clip` stops sideways scroll without creating a scroll container, so `position: sticky` still
    works); `-webkit-text-size-adjust: 100%` to stop iOS body-text inflation;
    `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation` on
    buttons/links to remove the grey tap flash and 300 ms tap delay.
  - `SectionHeading`: decorative section numeral lowered from `clamp(5rem,16vw,15rem)` to
    `clamp(3.5rem,16vw,15rem)` so it no longer collides with the eyebrow/title on small screens.
  - `Achievements` year watermark and `Projects` gallery numeral: minimum reduced from `7rem`
    to `4.5rem` for small screens.
  - `Hero`: portrait container height `min(68svh,36rem)` → `min(56svh,30rem)` on mobile only
    (desktop `lg:` value unchanged) to tighten the tall mobile hero.
  - `Navbar`: scrolled pill now uses `w-[calc(100%-1.5rem)]` so it is inset 12 px on phones
    instead of touching the screen edges.
- Fixed a leftover identity label: the Preloader footer previously read `AI ENGINEER` (a
  definitive role statement the user asked to avoid). It now shows the location, matching the
  mobile menu and footer.
- Verified: `npx tsc --noEmit` exit 0; `npm run build` exit 0 (css 62.01 kB, index 386.73 kB,
  syntax 51.73 kB, three 961.92 kB). Device-width visual QA still pending.

### Session 10 — 2026-11-07 (education order, portrait cutout, project colors)
- Removed the visible `ENGINEERING SYSTEMS MAP` block from Expertise. The System Design
  interactive demo remains in the Engineering Lab.
- Moved Education to the second page section and second navbar item, directly after Home.
  Reordered the résumé-backed cards as SSC → HSC → B.Tech; updated school/college names and
  laid them out horizontally on wider screens.
- Removed the portrait background using a locally processed transparent cutout. The full
  portrait now uses `object-contain` in the existing hero position; created a circular PNG
  favicon from the cutout.
- Assigned five coordinated muted colorways to projects (graphite, clay, ochre, plum, slate)
  and changed the projects section base from green to charcoal.
- Verified: `npm run build` (`tsc --noEmit` + Vite) exit 0; build copies the portrait and favicon.
  Browser snapshot at 836px confirms the section order and SSC/HSC/B.Tech entries. Desktop
  pinned-gallery QA remains outstanding.

### Session 9 — 2026-11-07 (broader profile, internships, system design)
- Removed the hero focus cards and narrow `SITE.identity` labels. Updated title/metadata and
  introductory copy to describe a broad software portfolio; retained actual internship titles
  in Experience. Terminal and footer language is role-neutral.
- Moved Soham's portrait from About into a circular hero treatment and added `public/favicon.svg`
  using the portrait in a circular browser-tab icon.
- Replaced About's profile facts panel with the two résumé-backed internships and company website
  links. Brihad Veterinary Academy (`https://brihadveterinaryacademy.com/`) was directly verified.
  Simplitechkey's listed domain (`http://www.simplitechkey.in`) did not respond to direct fetch.
- Replaced the technology wheel with two structured, project-informed architecture maps:
  AI application flow and general software system layers.
- Expanded the Interactive Demonstrations section to five tabs and made System Design the
  default. Added `SystemDesignExplorer` with AI/software patterns, stage details and keyboard
  navigation; RAG, embeddings, agent workflow and API examples remain separate tabs.
- Verified browser content at 836px (responsive layout, architecture map, internship links);
  `npx tsc --noEmit` and `npm run build` pass. Desktop pinned-gallery QA remains pending.

### Session 8 — 2026-11-07 (About profile facts)
- Replaced the About sidebar's numeric `ABOUT_STATS` with typed `ABOUT_FACTS` and renamed the
  panel "Profile & background".
- Facts now describe the B.Tech IT program and institution, AI Engineer / Python Developer
  internships, freelance automation work, and AI/full-stack engineering focus.
- Kept CGPA in the Education section and project metrics with their project/engineering records.
- Verified: `npx tsc --noEmit` exit 0; `npm run build` exit 0.

### Session 7 — 2026-11-07 (NutriAI live link)
- Verified the user-supplied `https://nutriai-psi.vercel.app/` page. It presents NutriAI v2.0
  and personalized seven-day meal protocols based on a metabolic profile.
- Added the user-supplied URL as NutriAI's `live` link.
- Updated NutriAI's overview, problem, approach, and unique case study to reflect the deployed
  experience; removed the unverified stack list (the project UI hides empty stacks).
- Verified: `npx tsc --noEmit` exit 0; `npm run build` exit 0.

### Session 6 — 2026-11-07 (gallery, photo, case studies, entry-level portfolio breadth)
- Fixed the pinned project gallery's vertical placement: desktop wrapper is viewport-height,
  flex-centers the track and cards; non-desktop/reduced-motion continues in vertical flow.
- Copied the supplied portrait from Downloads to `public/soham-rangdal.jpg`; added a compact
  personal profile card to the About sidebar. Browser at 836px verified the image loads
  (1123px natural width).
- Added a distinct configured case-study headline and narrative for each portfolio project.
  Reworked Daivik's copy to match its public README (adaptive legal intake, grounded information,
  structured analysis, follow-ups) and removed its unsupported "~30% relevance" metric.
- Reviewed the account's public repositories. Added **Faculty 360** as a verified non-AI
  full-stack project from `SohamRangdal88/360` README (MongoDB, Express, React, Node.js);
  GitHub button points to the matching repository. Daivik also links to its matching repo.
- Replaced the Engineering Lab Daivik-vs-Simplitechkey chart with independent project/testing
  records; Simplitechkey remains only in the Experience section as the actual employer.
- Narrowed the Recognition section content to `max-w-5xl` and enlarged its heading.
- Removed the remaining Navbar "Available" badge to honor the earlier availability-copy removal.
- Updated API Explorer catalogue and Projects introduction to five projects.
- Verified: `npx tsc --noEmit` exit 0; `npm run build` exit 0. Browser checked responsive
  fallback and portrait at 836px; desktop pinned state still needs visual QA at >=1024px.
- Open item: Shilp AI's stack is hidden (not guessed); portrait is now installed in `public/`.

### Session 5 — 2026-11-07 (typography, cursor, availability copy)
- **Fonts changed site-wide** (per user: "non-AI" typeface, no strong preference → editorial serif chosen):
  - `index.html` Google Fonts link → `Fraunces` (display) · `Source Sans 3` (body) · `IBM Plex Mono` (mono).
  - `src/styles/globals.css` `@theme`: `--font-display` / `--font-sans` / `--font-mono` updated.
  - Verified the Google Fonts URL returns valid `@font-face` CSS.
- **Custom cursor replaced**: round dot+ring → **crosshair** (4 white segments + square center dot,
  `mix-blend-mode: difference` so it reads on light *and* dark sections; blooms outward on hover,
  contracts on press). New CSS lives in `globals.css` (`.cursor-cross*`); `layout/CustomCursor.tsx`
  rewritten. Still disabled on touch devices and under reduced-motion.
- **Availability copy removed** (both places): hero pill `Open to AI engineering roles & freelance work`
  and the Contact paragraph line. Removed the now-unused `SITE.availability` field.
- Verified: `npx tsc --noEmit` exit 0; `npm run build` exit 0.
- **Open question:** the Navbar still shows an `Available` pill (pulsing dot) — flagged, not removed.

### Session 4 — 2026-11-07 (content updates: Daivik, Shilp AI, hero identity)
- Renamed `NyayaDepaa` → `Daivik` everywhere: `PROJECTS` id/title, `COUNTER_STATS` context,
  `EngineeringLab` bar-chart label, `ApiExplorer` JSON, and `Projects.tsx` id checks + default open case.
- Daivik project: added `live: "https://daivik-pink.vercel.app/"` (user-supplied).
- SOP Analyzer project: `year` → `"Jan 2026 – Present"`; `features` replaced with the two real
  accomplishment bullets (ITSM workflow; automated SOP/RCA cataloging pipeline). Stack already matched.
- Added project `Shilp AI` (04, 2025, `live: "https://shilp-ai.vercel.app/"`, no metrics per user choice).
  Content derived from the live site (AI weave-pattern / yarn-consumption analyzer). Stack is a best
  guess (`Python`, `Machine Learning`, `REST APIs`, `Vercel`) — confirm/adjust if wrong.
- Hero: removed `HERO_STATS` (project metrics) and `AnimatedCounter`; added `HERO_FOCUS` (FocusArea[])
  rendering three identity cards — Generative AI / Python Backend / AI Engineering.
- `ApiExplorer` `/projects` sample JSON: count 3 → 4, added Shilp AI.
- Verified: `npx tsc --noEmit` exit 0; `npm run build` exit 0.

### Session 3 — 2026-11-07 (GitHub link)
- User supplied GitHub profile `github.com/sohamrangdal88`.
- Fixed `SOCIALS[0]` in `src/data/portfolio.ts`: `github.com/sohamrangdal` → `github.com/sohamrangdal88`
  (propagates to Contact, Footer, Command Palette, Terminal `github` command).
- Checked public repos via GitHub API: only `sohamrangdal88` (profile), `autonomous-agent-challenge`,
  `Daivik` — none match the 3 portfolio projects. Per user's choice, left per-project `github`/`live`
  as `null` (profile-only). `npx tsc --noEmit` exit 0.

### Session 2 — 2026-11-07 (post-context-reset verification)
- Re-verified state after a context reset: `npx tsc --noEmit` exit 0; `npm run build` exit 0
  (dist: index 781 kB / three 963 kB / syntax 52 kB / css 57 kB).
- Restarted dev server (`npm run dev`) — boots on 5174 (5173 held by a prior process);
  preview opened with no browser errors.
- No code changes required. Remaining items are manual browser QA + optional resume/links.

### Session 1 — 2026-11-07
- Read full master prompt spec; verified `d:\portfolio` empty.
- Scaffolded Vite + React + TS + Tailwind v4; installed deps.
- Built design system, data layer, hooks, animation utilities, common primitives.
- Built layout (Preloader, Navbar, CommandPalette, Footer, CustomCursor) + Hero + About.
- Parallelised remaining sections to sub-agents; built Lab/Terminal/Contact directly.
- Wired all 9 sections into `App.tsx`; typecheck + production build pass; dev server boots.
- **Resume point:** manual browser QA, then optional resume PDF + project links.
