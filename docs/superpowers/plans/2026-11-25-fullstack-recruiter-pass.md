# Full-Stack Recruiter Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the live portfolio for Full-Stack recruiters: sharper hero, three case studies with hand-drawn SVG architecture diagrams, a compact "More projects" list, a shorter Experience and layer-grouped Skills.

**Architecture:** Same Next.js 15 app. All copy stays in `lib/data.ts` (new `caseStudies`, `moreProjects`, `profile.availability`, `profile.stack`). Diagrams are static inline-SVG server components in `components/diagrams/` styled only with CSS vars. A new `components/sections/case-studies.tsx` replaces `featured-work.tsx` at `id="work"`.

**Tech Stack:** Next.js 15.5, React 19, TypeScript, Tailwind 4, `motion`, lucide-react, vitest (+ jsdom/@testing-library/react already installed).

**Spec:** `docs/superpowers/specs/2026-11-25-fullstack-recruiter-pass-design.md` (read the "Answers & calls after builder check" section — it overrides earlier wording in the same doc).

## Global Constraints

- Every claim traces to the CV (`/mnt/d/Febri/CV/build/content.js`); Problem/Built/Outcome restate CV facts only; no metrics.
- No "lead" wording anywhere in data or UI (owner decision).
- No gradients, glows, shadows-as-glow; colours only via CSS vars `--bg --fg --muted --card --border --accent --accent-fg --accent-soft`.
- Title is exactly `Full-Stack Engineer`; subtitle exactly `Web, mobile & backend systems for banking`; availability exactly `Open to Full-Stack roles`; stack strip exactly `["Next.js","Node.js","Laravel","Kotlin","PostgreSQL","Kafka","Kubernetes"]`.
- Responsive from 360px with no horizontal page scroll; diagrams scroll inside their own wrapper.
- Content visible without JS (`data-reveal` + existing noscript rule); reduced motion respected; contrast ≥ AA in light and dark.
- `npm test`, `npm run lint` (0 errors), `npm run check` must pass.
- Commit as `git -c user.name="mfebriansyaht" -c user.email="mfebriansyaht@gmail.com" commit`, message ending `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Review Focus

1. **"Lead" creeping back via copied CV text** — data must never contain "lead" as a role word. Test: Task 1 `no lead wording` test (`/\blead\b/i` over JSON of all exported data).
2. **Diagram wider than a 360px phone** — page must not scroll sideways. Test: Task 4 browser check `scrollWidth <= clientWidth` at 360px.
3. **Dark mode diagrams** — strokes/text must use CSS vars, no hard-coded hex. Test: Task 2 diagram test asserts no `#` hex colour in rendered SVG markup.
4. **Screen readers on diagrams** — each SVG must expose a title + description. Test: Task 2 test asserts `role="img"` and `aria-labelledby` resolve to non-empty `<title>`/`<desc>`.
5. **Case studies hidden without JS** — Test: Task 4 `check-build` asserts all three case-study titles and "More projects" appear in prerendered HTML.

---

## File Structure

```
lib/data.ts                         profile.title/subtitle/availability/stack; caseStudies; moreProjects;
                                    experience (Bank Mega compacted); skills regrouped; featuredWork removed (Task 3)
components/sections/hero.tsx        availability line, stack strip, summary paragraph removed
components/sections/experience.tsx  optional `link` per experience item ("See case studies ↑" → #work)
components/diagrams/flow.tsx        shared SVG primitives: <Box>, <Arrow>, <DiagramFrame>
components/diagrams/finance-ops.tsx, m-smile.tsx, loyalty.tsx
components/sections/case-studies.tsx  case study cards + More projects list (replaces featured-work.tsx)
app/page.tsx                        FeaturedWork → CaseStudies
scripts/check-build.mjs             required strings updated
tests/data.test.ts, tests/diagrams.test.tsx
```

Deleted in Task 3: `components/sections/featured-work.tsx`, `featuredWork` + `FeaturedWork` type. Keep `TiltCard`/`usePointerFine` (still used by `mobile-apps.tsx`).

---

### Task 1: Data, hero, experience, skills

**Files:** Modify `lib/data.ts`, `components/sections/hero.tsx`, `components/sections/experience.tsx`, `scripts/check-build.mjs`, `tests/data.test.ts`

**Interfaces:**
- Produces in `lib/data.ts`:
  ```ts
  profile.title = "Full-Stack Engineer"
  profile.subtitle = "Web, mobile & backend systems for banking"
  profile.availability = "Open to Full-Stack roles"
  profile.stack = ["Next.js","Node.js","Laravel","Kotlin","PostgreSQL","Kafka","Kubernetes"] as const
  export type ExperienceItem = { ...existing; link?: { label: string; href: `#${string}` } }
  ```
- Bank Mega item: one group, no heading, 3 bullets exactly as spec "Experience, Bank Mega item" (lines 1–3), plus `link: { label: "See case studies", href: "#work" }`.
- `skills` groups in order: `Frontend, Backend, Mobile, Data & Messaging, DevOps & Observability, AI, Security & Delivery`, items exactly as the spec list.

- [ ] **Step 1: Failing tests** in `tests/data.test.ts` (keep existing experience/apps/assets/stats tests; replace the skills test; add):
  ```ts
  it("profile framing", () => {
    expect(profile.title).toBe("Full-Stack Engineer");
    expect(profile.availability).toBe("Open to Full-Stack roles");
    expect(profile.stack).toEqual(["Next.js","Node.js","Laravel","Kotlin","PostgreSQL","Kafka","Kubernetes"]);
  });
  it("skills grouped by layer", () => expect(skills.map(s => s.group)).toEqual(
    ["Frontend","Backend","Mobile","Data & Messaging","DevOps & Observability","AI","Security & Delivery"]));
  it("every CV skill appears exactly once", () => {
    const all = skills.flatMap(s => s.items);
    expect(new Set(all).size).toBe(all.length);
    for (const s of ["Kotlin","TypeScript","JavaScript","PHP","Java","Dart","SQL","Spring Boot","Ionic"]) expect(all).toContain(s);
  });
  it("bank mega item is compact and links to case studies", () => {
    const bm = experience[0];
    expect(bm.groups.flatMap(g => g.bullets)).toHaveLength(3);
    expect(bm.link).toEqual({ label: "See case studies", href: "#work" });
  });
  it("no lead wording", () => expect(JSON.stringify({ profile, experience, skills })).not.toMatch(/\blead\b/i));
  ```
- [ ] **Step 2:** `npx vitest run tests/data.test.ts` → FAIL (title/availability/skills).
- [ ] **Step 3:** Update `lib/data.ts` as above. Hero: remove the summary paragraph block; under location render the availability line (small solid `--accent` dot + text, `data-reveal`-free, inside the existing `.hero-in` block) and the stack strip (`profile.stack.join(" · ")`, muted, wraps). Experience: render `item.link` after bullets as an `<a>` with an up-arrow icon. `check-build.mjs`: replace `"Software Engineer"` with `"Full-Stack Engineer"` and add `profile.availability` text.
- [ ] **Step 4:** `npm test` → all pass; `npm run lint` → 0 errors.
- [ ] **Step 5:** Commit `feat: full-stack framing for hero, experience and skills`.

### Task 2: Architecture diagrams

**Files:** Create `components/diagrams/flow.tsx`, `finance-ops.tsx`, `m-smile.tsx`, `loyalty.tsx`; Test `tests/diagrams.test.tsx` (jsdom, see `tests/count-up.test.tsx` for setup)

**Interfaces:**
- Produces: `export function FinanceOpsDiagram(): JSX.Element`, `MSmileDiagram()`, `LoyaltyDiagram()` — each renders `<svg role="img" aria-labelledby="<id>-title <id>-desc" viewBox=...>` with `<title id=…>` and `<desc id=…>`, `className="h-auto w-full min-w-[560px]"`.
- `flow.tsx`: `Box({ x, y, w, h, label, sub?, accent? })`, `Arrow({ from: [x,y], to: [x,y], label? })` (marker arrowhead defined once per SVG via a unique id), all strokes/fills via `var(--border)`, `var(--card)`, `var(--fg)`, `var(--muted)`, `var(--accent)`, `var(--accent-soft)`; text in `font-family: var(--font-geist-sans)`.
- Nodes (from spec, nothing else):
  - Finance: `Artajasa · Finnet · BCA · Mandiri` (sources) → `Laravel web app` (sub: `upload · approval · posting`) → `SQL Server` → `Excel reports by email`.
  - M-Smile: `Android`, `iOS` → `Shared KMP module` (sub: `Compose UI · Ktor client`) → `Pinned TLS + HSM encryption` → `Bank backend APIs`; side box `eKYC face verification`.
  - Loyalty: `Jenkins` → `ArgoCD` → `Kubernetes (Rancher RKE)` (sub: `microservices`) → `Kafka`, `Redis Cluster`, `Cassandra`, `Typesense`, `PostgreSQL primary → replica`.

- [ ] **Step 1: Failing tests** — for each of the 3 diagrams: render, assert `svg[role=img]` exists; every id in `aria-labelledby` resolves to an element with non-empty text; `container.innerHTML` does not match `/#[0-9a-f]{3,6}\b/i`; text contains each node label listed above (e.g. Finance contains "SQL Server", "Excel reports by email").
- [ ] **Step 2:** `npx vitest run tests/diagrams.test.tsx` → FAIL (modules missing).
- [ ] **Step 3:** Implement. Layout left→right, rounded boxes (rx 10), 1.5px strokes, accent used only for the central box border + arrowheads.
- [ ] **Step 4:** Tests PASS; `npm run lint` clean.
- [ ] **Step 5:** Commit `feat: hand-drawn architecture diagrams for case studies`.

### Task 3: Case studies section + More projects

**Files:** Create `components/sections/case-studies.tsx`; Modify `lib/data.ts`, `app/page.tsx`, `tests/data.test.ts`; Delete `components/sections/featured-work.tsx`

**Interfaces:**
- Consumes: diagrams from Task 2.
- Produces in `lib/data.ts` (remove `featuredWork`/`FeaturedWork`):
  ```ts
  export type CaseStudy = { id: "finance-ops" | "m-smile" | "loyalty"; title: string; role: "Developer";
    problem: string; built: string[]; outcome: string; layers: { label: string; items: string[] }[] };
  export const caseStudies: CaseStudy[];   // order: finance-ops, m-smile, loyalty
  export type MoreProject = { title: string; summary: string; stack: string[] };
  export const moreProjects: MoreProject[]; // Observability, AI Chatbot & AI Gateway, Insider → S3 Data Pipeline, Payroll Onboarding & Complaint Dashboard
  ```
  Problem/Outcome strings copied exactly from the spec's "Answers & calls" section; `built` = the spec's Built bullets (CV wording); `layers` per spec Content section.
- Section: `id="work"`, `scroll-mt-24`, `SectionHeading eyebrow="Case studies" title="Things I've built end to end"`. Each study an `<article>` (border `--border`, bg `--card`, rounded-2xl, wrapped in `<Reveal>`): title + role; dl rows Problem/Built (ul)/Outcome; diagram in `<div className="overflow-x-auto">`; layers as label + chips. `lg:` text left / diagram right; below lg stacked. Then `<h3>More projects</h3>` and a `<ul>` of rows divided by `--border`: title, summary, muted stack list.

- [ ] **Step 1: Failing tests** in `tests/data.test.ts`: replace "featured work ids" with
  ```ts
  it("case studies", () => expect(caseStudies.map(c => c.id)).toEqual(["finance-ops","m-smile","loyalty"]));
  it("case studies have problem/built/outcome", () => { for (const c of caseStudies) {
    expect(c.problem.length).toBeGreaterThan(20); expect(c.built.length).toBeGreaterThan(0); expect(c.outcome.length).toBeGreaterThan(20); } });
  it("more projects", () => expect(moreProjects.map(p => p.title)).toEqual(
    ["Observability","AI Chatbot & AI Gateway","Insider → S3 Data Pipeline","Payroll Onboarding & Complaint Dashboard"]));
  ```
  and extend `no lead wording` to include `caseStudies, moreProjects`.
- [ ] **Step 2:** `npx vitest run tests/data.test.ts` → FAIL.
- [ ] **Step 3:** Implement data, section, page swap; delete `featured-work.tsx`.
- [ ] **Step 4:** `npm test` PASS, `npm run lint` 0 errors.
- [ ] **Step 5:** Commit `feat: case studies with diagrams and more-projects list`.

### Task 4: Verification

**Files:** Modify `scripts/check-build.mjs`

- [ ] **Step 1:** Add to `required`: the three case-study titles (`Finance Operations Automation`, `M-Smile Mobile Banking Revamp`, `Loyalty Platform`), `More projects`, `Open to Full-Stack roles`.
- [ ] **Step 2:** `npm run check` → `check-build OK`.
- [ ] **Step 3:** Browser check (Playwright MCP, `next start -p 3123`, navigate with a cache-busting query like `/?v=4`): light 1440 full-page screenshot, dark 1440 screenshot of `#work`, 360px full-page screenshot; assert at 360px `document.documentElement.scrollWidth <= clientWidth`; diagrams visible and readable in dark mode; no console errors; no text matching `/\blead\b/i` in `document.body.innerText`. Save to `screenshots/v4-*.png`. Stop the server (kill by PID from `pgrep -x next-server`, never `pkill -f`).
- [ ] **Step 4:** Commit `chore: check-build covers case studies`.
