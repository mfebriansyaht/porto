# Portfolio Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ByteGrad template with a from-scratch, recruiter-focused, animated one-page portfolio whose content mirrors the Nov 2025 CV.

**Architecture:** Next.js 15 App Router, fully static. All copy lives in typed `lib/data.ts`; section components in `components/sections/*` render from it; small reusable UI/motion pieces in `components/ui/*`. Theme handled by an inline pre-paint script + `ThemeToggle` client component. No server code, no env vars.

**Tech Stack:** Next.js 15.5.x, React 19, TypeScript, Tailwind CSS 4 (`@tailwindcss/postcss`), `motion` (Framer Motion), `lucide-react` + `react-icons` (brand icons), `geist` font, Vitest for unit tests, `sharp` (dev, one-off image conversion).

**Spec:** `docs/superpowers/specs/2026-11-25-portfolio-rewrite-design.md`

## Global Constraints

- Every claim on the page traces to `D:\Febri\CV\Moch_Febriansyah_Trisnadi_CV.pdf`, except the "Freelance & Other Work" apps whose copy comes from the old `lib/data.ts`.
- `npm run build` must pass with no env vars set.
- All non-essential motion disabled under `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` + explicit checks for count-up/tilt/timeline).
- Dark mode is the default; light via toggle, persisted in `localStorage` key `theme`, no flash on load.
- Responsive from 360px width; no horizontal scroll.
- No hard-coded domain: `metadataBase` = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` if set, else `http://localhost:3000`.
- Contact: email `mfebriansyaht@gmail.com`, WhatsApp `https://wa.me/6281910233934`, LinkedIn `https://www.linkedin.com/in/mfebriansyaht`, GitHub `https://github.com/mfebriansyaht`, CV `/Moch_Febriansyah_Trisnadi_CV.pdf`.
- Commits authored locally; never push (owner pushes).

## Review Focus

1. **JS disabled / before hydration** — scroll-reveal elements must not stay invisible; content must be readable in the static HTML (reveal uses `initial` only after mount, or `whileInView` with server-visible fallback). Test: Task 6 build-output check greps `out` HTML for hero name and every experience title.
2. **Touch devices** — tilt/glow hover effects must not fire or stick on touch; cards remain tappable links. Test: Task 4 `usePointerFine` unit test.
3. **Clipboard unavailable** (insecure context / denied) — copy-email button must fall back to opening `mailto:` and never throw. Test: Task 5 `copyEmail` unit test.
4. **Theme stored value garbage** (`localStorage.theme = "blue"`) or storage throwing — falls back to dark. Test: Task 2 `resolveTheme` unit test.
5. **Long words on narrow screens** (e.g. "Infrastructure & Observability", long skill chips) — wrap, no overflow at 360px. Test: Task 6 Playwright screenshot check at 360px.

---

## File Structure

```
app/layout.tsx            fonts, metadata, theme pre-paint script, MotionConfig provider
app/page.tsx              composes sections in order
app/globals.css           Tailwind 4 import, theme tokens (dark default + .light), grid/glow bg
app/opengraph-image.tsx   next/og image (name + title)
app/icon.png              favicon (from photo)
lib/data.ts               ALL content (typed)
lib/theme.ts              resolveTheme(), THEME_SCRIPT string
lib/clipboard.ts          copyEmail()
lib/site-url.ts           siteUrl()
components/providers.tsx  MotionConfig reducedMotion="user"
components/ui/            reveal.tsx, count-up.tsx, tilt-card.tsx, use-pointer-fine.ts,
                          section-heading.tsx, chip.tsx, theme-toggle.tsx, copy-email-button.tsx
components/sections/      navbar.tsx, hero.tsx, featured-work.tsx, mobile-apps.tsx,
                          experience.tsx, skills.tsx, contact.tsx, footer.tsx
tests/                    *.test.ts (vitest)
public/                   profile.webp, Moch_Febriansyah_Trisnadi_CV.pdf, ct.webp, gbk.webp,
                          arsy.webp, arsy-partners.webp (renamed from "arsy p.webp")
```

Deleted: `actions/`, `email/`, `context/`, old `components/*`, `lib/hooks.ts`, `lib/types.ts`, `lib/utils.ts`, `tailwind.config.js`, `yarn.lock`, `public/CV.pdf`, `public/corpcomment.png`, `public/rmtdev.png`, `public/wordanalytics.png`, `public/mega.png`, `.eslintrc.json` (replaced by `eslint.config.mjs`).

---

### Task 1: Fresh scaffold + content data

**Files:**
- Delete: everything listed under "Deleted" above
- Create/replace: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `app/layout.tsx` (minimal), `app/page.tsx` (minimal), `app/globals.css`, `lib/data.ts`, `tests/data.test.ts`
- Assets: `public/profile.webp`, `public/Moch_Febriansyah_Trisnadi_CV.pdf`, rename `public/arsy p.webp` → `public/arsy-partners.webp`

**Interfaces:**
- Produces (`lib/data.ts`):
  ```ts
  export const profile: { name: string; shortName: "Febriansyah"; title: "Software Engineer";
    subtitle: "Full-Stack & Mobile · Banking Systems"; location: "South Jakarta, Indonesia";
    summary: string; photo: "/profile.webp"; cvUrl: "/Moch_Febriansyah_Trisnadi_CV.pdf" };
  export const contact: { email: string; whatsapp: string; linkedin: string; github: string };
  export const stats: { value: number; suffix: string; label: string }[];  // 4 "+" "Years experience", 17 "" "Production servers", 2 "" "Platforms led"
  export type FeaturedWork = { id: string; title: string; role: string; summary: string; highlights: string[]; stack: string[]; size: "lg" | "sm"; icon: string /* lucide icon name */ };
  export const featuredWork: FeaturedWork[]; // 7 items in spec order; M-Smile & Loyalty size "lg"
  export type App = { title: string; description: string; tags: string[]; image: string; playStoreUrl: string; group: "bank-mega" | "freelance" };
  export const apps: App[];               // CT Connect (bank-mega), Love GBK, ArsyGas, ArsyGas Partners (freelance)
  export type ExperienceItem = { role: string; org: string; location?: string; period: string; kind: "work" | "education"; groups: { heading?: string; bullets: string[] }[] };
  export const experience: ExperienceItem[]; // 4 items, CV order
  export const skills: { group: string; items: string[] }[]; // 7 groups, CV order
  export const languages: { name: string; level: string }[];
  export const navLinks: { label: string; href: `#${string}` }[]; // Work, Experience, Skills, Contact
  ```

- [ ] **Step 1:** Delete old files; write `package.json` with deps `next@15.5.29 react@19 react-dom@19 motion lucide-react react-icons geist`, devDeps `typescript @types/node @types/react @types/react-dom tailwindcss@4 @tailwindcss/postcss eslint eslint-config-next@15.5.29 vitest sharp`; scripts `dev`, `build`, `start`, `lint`, `test: "vitest run"`. Run `npm install`. Expected: exit 0, `package-lock.json` created.
- [ ] **Step 2:** Assets: `node -e` with sharp converts `/mnt/d/Febri/CV/build/photo.png` → `public/profile.webp` (400×400, q90); copy CV PDF; rename `arsy p.webp`.
- [ ] **Step 3: Write failing test `tests/data.test.ts`**
  ```ts
  it("has CV titles and periods", () => {
    expect(experience.map(e => [e.role, e.period])).toEqual([
      ["Full-Stack Developer", "Feb 2023 – Present"],
      ["IT Development Program", "Aug 2022 – Feb 2023"],
      ["IT Developer", "Sep 2021 – Feb 2022"],
      ["Bachelor of Informatics", "2017 – 2021"]]);
  });
  it("has 7 skill groups in CV order", () => expect(skills.map(s => s.group)).toEqual(
    ["Languages","Mobile","Web & Backend","Data & Messaging","DevOps & Observability","AI","Security & Delivery"]));
  it("featured work ids", () => expect(featuredWork.map(f => f.id)).toEqual(
    ["m-smile","loyalty","observability","ai-gateway","finance-ops","insider-pipeline","payroll-complaint"]));
  it("apps grouping", () => { expect(apps.filter(a => a.group === "freelance").map(a => a.title))
    .toEqual(["Love GBK","ArsyGas: Gas yang Benar","ArsyGas – Partners"]); });
  it("every asset path exists in public/", ...) // profile.photo, cvUrl, apps[].image via fs.existsSync
  it("stats", () => expect(stats.map(s => s.value)).toEqual([4, 17, 2]));
  ```
- [ ] **Step 4:** `npm test` → FAIL (module not found).
- [ ] **Step 5:** Write `lib/data.ts` from the CV text verbatim (bullets copied, may be lightly trimmed, never added to). Experience bullets for Bank Mega grouped under "Mobile Banking", "Platform, Infrastructure & Observability", "Finance Operations Automation", "AI". Freelance app copy from old `lib/data.ts` (git `HEAD~1:lib/data.ts`).
- [ ] **Step 6:** `npm test` → PASS. Minimal `app/page.tsx` renders `profile.name`; `npm run build` → success.
- [ ] **Step 7:** Commit `feat: fresh Next.js 15 scaffold with CV content data`.

### Task 2: Layout, theme, globals, metadata

**Files:** `app/layout.tsx`, `app/globals.css`, `lib/theme.ts`, `lib/site-url.ts`, `components/providers.tsx`, `components/ui/theme-toggle.tsx`, `app/opengraph-image.tsx`, `app/icon.png`, `tests/theme.test.ts`, `tests/site-url.test.ts`

**Interfaces:**
- Produces: `resolveTheme(stored: string | null): "dark" | "light"`; `THEME_SCRIPT: string` (inline IIFE: reads `localStorage.theme` in try/catch, applies `resolveTheme`, toggles class `light` on `<html>`); `siteUrl(): URL`; `<ThemeToggle />`; `<Providers>` wraps children in `MotionConfig reducedMotion="user"`.
- Tokens in `globals.css` via `@theme`/CSS vars: `--bg`, `--fg`, `--muted`, `--card`, `--border`, `--accent-from` (blue ~#3b82f6), `--accent-to` (violet ~#8b5cf6). Dark values on `:root`, light on `:root.light`. Body background: radial glows + faint grid (CSS only).

- [ ] **Step 1: Failing tests** — `resolveTheme("light") === "light"`, `resolveTheme("dark") === "dark"`, `resolveTheme(null) === "dark"`, `resolveTheme("blue") === "dark"`; `siteUrl()` with `VERCEL_PROJECT_PRODUCTION_URL="x.vercel.app"` → `https://x.vercel.app/`, unset → `http://localhost:3000/`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement; layout injects `THEME_SCRIPT` in `<head>` via `dangerouslySetInnerHTML`, `<html suppressHydrationWarning>`, Geist Sans + Mono, metadata title `Moch Febriansyah Trisnadi — Software Engineer`, description = `profile.summary` (first sentence ok), `metadataBase: siteUrl()`. OG image 1200×630 with name, title, subtitle on dark gradient. `app/icon.png` = 64×64 from photo via sharp.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` → success.
- [ ] **Step 5:** Commit `feat: layout, theming and metadata`.

### Task 3: Motion primitives + Navbar + Hero

**Files:** `components/ui/reveal.tsx`, `components/ui/count-up.tsx`, `components/ui/section-heading.tsx`, `components/ui/chip.tsx`, `components/sections/navbar.tsx`, `components/sections/hero.tsx`, `lib/count.ts`, `tests/count.test.ts`

**Interfaces:**
- Produces: `<Reveal delay?: number>` (whileInView fade+slide 16px, `viewport={{ once: true, margin: "-80px" }}`); `<CountUp to: number suffix?: string />` (counts 0→to over 1.2s once in view; renders final value immediately if reduced motion); `countAt(to: number, progress: number): number` (eased, integer, clamps progress to [0,1]); `<SectionHeading eyebrow: string title: string />`; `<Chip>`.
- Navbar: sticky, `backdrop-blur`, `MFT.` logo, `navLinks`, active-section highlight via IntersectionObserver on section ids `work|experience|skills|contact`, mobile menu button (<md) toggling a panel, `<ThemeToggle />`.
- Hero (`id="home"`): photo (`next/image`, priority, rounded-full ring gradient), "Hi, I'm Febriansyah", title words revealed staggered, subtitle, location; CTAs `Hire me` → `#contact`, `Download CV` (`download` attr); icon links LinkedIn/Email/WhatsApp; stats row with `CountUp`; summary paragraph.

- [ ] **Step 1: Failing test** — `countAt(17,0)===0`, `countAt(17,1)===17`, `countAt(17,2)===17`, `countAt(17,-1)===0`, `countAt(4,0.5)` integer between 1 and 4.
- [ ] **Step 2:** `npm test` → FAIL. **Step 3:** implement. **Step 4:** `npm test` PASS, `npm run build` success.
- [ ] **Step 5:** Commit `feat: navbar, hero and motion primitives`.

### Task 4: Featured Work + Mobile Apps

**Files:** `components/ui/use-pointer-fine.ts`, `components/ui/tilt-card.tsx`, `components/sections/featured-work.tsx`, `components/sections/mobile-apps.tsx`, `tests/pointer.test.ts`

**Interfaces:**
- Produces: `usePointerFine(): boolean` (matchMedia `(hover: hover) and (pointer: fine)`, false on server / when matchMedia missing); `<TiltCard className?>` — max 6° tilt + radial glow following cursor only when `usePointerFine()` and not reduced motion; otherwise plain card.
- Featured Work (`id="work"`): bento grid — `md:grid-cols-3`, `lg` items `md:col-span-2` (layout M-Smile 2 + Loyalty… arrange so rows fill: row1 M-Smile(2)+Observability(1), row2 AI(1)+Loyalty(2), row3 Finance(1)+Insider(1)+Payroll(1)). Card: lucide icon in gradient square, title, role, summary, highlights (max 3), stack chips.
- Mobile Apps: heading "Mobile apps on Play Store"; CT Connect card(s) first, then sub-heading "Freelance & Other Work" with the 3 freelance apps; each card image + title + description + tags + "Get it on Google Play" link (`target="_blank" rel="noopener noreferrer"`).

- [ ] **Step 1: Failing test** (vitest, jsdom env for this file) — `usePointerFine` returns false when `window.matchMedia` undefined; returns false when matchMedia(...).matches false; true when true (use `renderHook` from `@testing-library/react`; add devDeps `@testing-library/react jsdom`).
- [ ] **Step 2–4:** FAIL → implement → PASS; build success.
- [ ] **Step 5:** Commit `feat: featured work bento and mobile apps`.

### Task 5: Experience, Skills, Contact, Footer

**Files:** `components/sections/experience.tsx`, `components/sections/skills.tsx`, `components/sections/contact.tsx`, `components/sections/footer.tsx`, `components/ui/copy-email-button.tsx`, `lib/clipboard.ts`, `tests/clipboard.test.ts`, `app/page.tsx`

**Interfaces:**
- Produces: `copyEmail(email: string, deps?: { clipboard?: { writeText(s: string): Promise<void> }; openMailto?: (href: string) => void }): Promise<"copied" | "mailto">` — tries clipboard, on missing/throw calls `openMailto("mailto:"+email)` and returns `"mailto"`; never rejects.
- Experience (`id="experience"`): vertical timeline; line whose height is `useScroll` progress of the section (`scaleY`, origin top; static full line under reduced motion); each item card with role, org, period badge, grouped bullets; education item uses graduation-cap icon.
- Skills (`id="skills"`): 7 group cards with chips; languages row below.
- Contact (`id="contact"`): "Let's talk" heading, one-line pitch, buttons Email (mailto), Copy email (`CopyEmailButton` shows "Copied!" for 2s or nothing if mailto fallback), WhatsApp, LinkedIn, GitHub, Download CV.
- Footer: `© {year} Moch Febriansyah Trisnadi · Built with Next.js`.
- `app/page.tsx` order: Navbar, Hero, FeaturedWork, MobileApps, Experience, Skills, Contact, Footer.

- [ ] **Step 1: Failing tests** — clipboard resolving → `"copied"`; clipboard undefined → `"mailto"` and openMailto called with `"mailto:mfebriansyaht@gmail.com"`; clipboard.writeText rejecting → `"mailto"`, no throw.
- [ ] **Step 2–4:** FAIL → implement → PASS; build success.
- [ ] **Step 5:** Commit `feat: experience timeline, skills, contact and footer`.

### Task 6: Verification, README, cleanup

**Files:** `README.md`, `tests/build-output.test.ts` (or script `scripts/check-build.mjs`)

- [ ] **Step 1:** Configure `next.config.ts` with `output: "export"` only if it doesn't break `opengraph-image`; otherwise check the prerendered HTML in `.next/server/app/index.html`. Write `scripts/check-build.mjs` asserting the built index HTML contains "Moch Febriansyah Trisnadi", "Software Engineer", every `experience[].role`, every `skills[].group`, "Freelance &amp; Other Work", and `mfebriansyaht@gmail.com`; and that no element in the HTML has inline `opacity:0` on the hero `h1` (Review Focus 1 — reveal must not hide content pre-hydration; Hero name rendered without initial opacity 0). Add script `"check": "next build && node scripts/check-build.mjs"`.
- [ ] **Step 2:** `npm run check` → exits 0.
- [ ] **Step 3:** `npm run lint` → no errors.
- [ ] **Step 4:** Visual check with Playwright MCP against `npm run start`: screenshots at 1440px dark, 1440px light (toggle), 360px dark; confirm no horizontal scroll at 360px (`document.documentElement.scrollWidth <= 360`), photo loads, CV link returns 200, theme persists after reload, no console errors.
- [ ] **Step 5:** README: what it is, `npm install / npm run dev / npm test / npm run check`, where content lives (`lib/data.ts`), how to update CV/photo, and deploy steps (PAT push, Vercel import from own account, auto-deploy on push to `main`, no env vars).
- [ ] **Step 6:** Commit `docs: README with deploy steps`.
