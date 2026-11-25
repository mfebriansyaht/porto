# Full-Stack Recruiter Pass — Design

Date: 2026-11-25
Builds on: `docs/superpowers/specs/2026-11-25-portfolio-rewrite-design.md`
(the live site at https://moch-febriansyah.vercel.app/). Everything not
mentioned here stays as it is (palette, fonts, Mobile Apps section,
Contact, theme, motion rules, data-in-`lib/data.ts`).

## Intent

The owner asked "what else would make it more attractive?" and handed the
call to us, framed as: *what does a recruiter hiring a **Full-Stack
Engineer** want?* The answer:

1. In 5 seconds: role, years, stack match, location, availability.
2. Proof of end-to-end work (frontend → backend → data/infra), not a list
   of logos.
3. What changed because of the work.
4. Scannable: short sentences, clear structure, no walls of text.
5. Fast contact + CV (already good).

The current page fails 2–4: projects appear twice (Featured Work **and**
Experience bullets), project cards are text-only (internal bank systems,
no screenshots), and the hero opens with a long summary paragraph.

## Goals

- Hero reads as a Full-Stack Engineer in one glance, with a stack strip
  and an availability line.
- Three deep **case studies** that prove end-to-end work, each with a
  hand-drawn architecture diagram instead of screenshots.
- Remaining projects as a compact one-line list.
- Experience shortened to a scannable timeline that does not repeat the
  case studies.
- Skills regrouped by full-stack layer.

## Non-goals

- No numbers/metrics (owner has none to share — outcomes stay qualitative,
  taken from CV wording).
- No separate case-study pages, blog, testimonials, analytics.
- No change to palette, fonts, Mobile Apps, Contact, or theme behaviour.

## Anti-goals

- Inventing claims, metrics, users, or architecture details not in the CV.
  Diagrams only show components the CV names.
- Re-introducing "lead" wording anywhere (owner decision: everything is
  "Developer").
- Gradients/glows or anything that brings back the "AI template" look.
- Making the page longer than it is now.

## Approaches considered

- **A. One page, case studies with hand-drawn SVG diagrams (chosen).**
  Recruiters see everything in one scroll; custom diagrams in the site's
  palette look bespoke. Cost: each diagram drawn by hand.
- **B. Same, diagrams from Mermaid text.** Easier to edit, but generic
  look and a heavy dependency; works against the "not a template" goal.
- **C. Separate case-study pages.** Most room for depth, but recruiters
  rarely click through and it is the most work.

Owner handed the choice to us; we picked **A**.

## Decided design

### Hero

```
Hi, I'm Febriansyah                                   [photo]
Full-Stack Engineer
Web, mobile & backend systems for banking
● Open to Full-Stack roles · South Jakarta, Indonesia
Next.js · Node.js · Laravel · Kotlin · PostgreSQL · Kafka · Kubernetes
[Hire me] [Download CV] (in) (✉) (wa)
                 ┌───────────────┐
                 │ 4+  Years exp │
                 └───────────────┘
```

- Title becomes **"Full-Stack Engineer"** (was "Software Engineer");
  subtitle **"Web, mobile & backend systems for banking"**.
- New availability line with a small solid-accent dot:
  **"Open to Full-Stack roles"** + location (`profile.location`).
- New stack strip: plain text separated by `·`, muted colour, from a
  `profile.stack` array (the 7 items above, all from the CV skills).
- Long summary paragraph removed from the hero (kept only as meta
  description). Stats row unchanged (single "4+ Years experience").
- `<title>`/OG title follow the new title.

### Case studies (replaces the "Featured Work" bento, `id="work"`)

Heading eyebrow "Case studies", title "Things I've built end to end".
Three studies, in this order, stacked vertically (one per row, full
width), each card:

```
┌───────────────────────────────────────────────────────────────┐
│ Finance Operations Automation                 Developer       │
│ Problem   Reconciliation, GL posting and settlement were      │
│           manual Excel work.                                  │
│ Built     …                                                   │
│ Outcome   …                                                   │
│ ┌ diagram ──────────────────────────────────────────────────┐ │
│ │ [Web UI] → [Laravel app] → [SQL Server] → [Excel/email]   │ │
│ └───────────────────────────────────────────────────────────┘ │
│ Frontend: …   Backend: …   Data/Infra: …                      │
└───────────────────────────────────────────────────────────────┘
```

On `lg` the text sits left and the diagram right; on mobile the diagram
goes under the text and scrolls horizontally inside its own box if wider
than the screen (never widens the page).

Content (all wording derived from CV bullets; builder may trim):

1. **Finance Operations Automation** (Laravel, SQL Server)
   - Problem: biller reconciliation (Artajasa, Finnet), GL posting, fund
     settlement, forex claims and Mark-to-Market statements were manual,
     Excel-based processes.
   - Built: reconciliation, GL posting and settlement workflows; bulk
     posting for offline credit-card payments via BCA and Mandiri with
     multi-level approval; merchant settlement reporting with bulk
     upload, approval and automatic Excel emails; forex claim workflow and
     MtM statement generation.
   - Outcome: "Replaced manual Excel processes with approval-driven
     workflows and automatic reports."
   - Diagram: Biller/bank files (Artajasa, Finnet, BCA, Mandiri) →
     Laravel web app (upload · approval · posting) → SQL Server →
     Excel reports by email.
   - Layers: Frontend: Laravel web UI · Backend: Laravel · Data: SQL Server.
2. **M-Smile Mobile Banking Revamp** (Kotlin Multiplatform)
   - Problem: the React Native app had separate concerns per platform;
     the revamp needed one codebase and existing users had to move over
     without re-registering.
   - Built: KMP + Compose Multiplatform shared codebase for Android & iOS;
     eKYC face verification; HSM-based request encryption with
     certificate pinning; migration of login, biometrics and preferences;
     shared design system (accessibility for large text, unified error &
     offline handling).
   - Outcome: "One shared codebase for Android and iOS; users kept their
     login, biometrics and settings without re-registration."
   - Diagram: Android / iOS → shared KMP module (Compose UI · Ktor client)
     → pinned TLS + HSM-encrypted requests → bank backend; side box eKYC.
   - Layers: Mobile: KMP, Compose · Networking: Ktor · Security: HSM,
     certificate pinning.
   - The Problem line must not claim RN shortcomings not in the CV — keep
     it to "rebuild from React Native to one shared codebase" + "migrate
     users without re-registration".
3. **Loyalty Platform** (backend & infrastructure)
   - Problem: the production Loyalty platform needed its data and
     messaging infrastructure provisioned and its microservices deployed
     reliably.
   - Built: provisioned 17 production servers (Redis Cluster, Kafka
     KRaft, Cassandra, Typesense, PostgreSQL with streaming
     replication); deployed microservices to Kubernetes (Rancher RKE) via
     ArgoCD GitOps and Jenkins; troubleshot pods, configuration and
     connectivity across environments.
   - Outcome: "Production platform running on Kubernetes with GitOps
     deployments."
   - Diagram: Jenkins → ArgoCD → Kubernetes (microservices) → Kafka ·
     Redis Cluster · Cassandra · Typesense · PostgreSQL (primary →
     replica).
   - Layers: Backend: microservices · Data: Kafka, Redis, Cassandra,
     Typesense, PostgreSQL · Infra: Kubernetes, ArgoCD, Jenkins.

### More projects (compact list, under the case studies)

One line each: title — one-sentence summary — stack chips. Items:
Observability (OpenTelemetry/SigNoz), AI Chatbot & AI Gateway,
Insider → S3 Data Pipeline, Payroll Onboarding & Complaint Dashboard.
No icons-in-gradient tiles; plain list rows with a thin divider.

### Experience

Each item: role, org, period, and **at most 3 short lines**. Bank Mega
Full-Stack Developer item no longer lists project bullets; it gets
2–3 lines summarising scope (mobile banking, platform & observability,
finance automation, AI) and a pointer "See case studies above" linking
`#work`. IT Development Program, EcoEdu, Telkom University keep their
CV bullets (already short). Timeline animation kept.

### Skills

Regroup into full-stack layers (all items still from the CV, none
added/dropped):

- **Frontend:** Next.js, React, TypeScript, JavaScript
- **Backend:** Node.js, Fastify, Express.js, Laravel, PHP, Spring Boot,
  Java, REST API
- **Mobile:** Kotlin Multiplatform, Compose Multiplatform, Ktor, Kotlin,
  Flutter, Dart, Ionic, Android, iOS
- **Data & Messaging:** PostgreSQL, MySQL, SQL Server, Apache Cassandra,
  Redis, Apache Kafka, Typesense, S3, SQL
- **DevOps & Observability:** Docker, Kubernetes (Rancher RKE), ArgoCD,
  Jenkins, CI/CD, Linux, OpenTelemetry, SigNoz
- **AI:** LLM chatbot, AI Gateway, AI service integration
- **Security & Delivery:** HSM encryption, data masking, FSD/SIT
  documentation, Agile, system & business analysis

### Diagrams (implementation constraints)

- Inline SVG React components (`components/diagrams/*.tsx`), one per case
  study, using CSS vars (`--fg`, `--muted`, `--border`, `--card`,
  `--accent`) so they work in light and dark.
- Rounded boxes, thin strokes, arrows; Geist Sans labels; no gradients,
  shadows or glows.
- Accessible: `role="img"` + `aria-labelledby` title/desc describing the
  flow in words.
- Static (no animation needed); must stay readable at 360px via a
  horizontally scrollable wrapper.

### Navigation

Navbar labels unchanged (Work, Experience, Skills, Contact); `#work` now
points at Case studies.

## Constraints (inherited)

Next.js 15.5, React 19, Tailwind 4, `motion`; all copy in `lib/data.ts`;
`npm test`, `npm run lint`, `npm run check` must pass;
`scripts/check-build.mjs` updated for any changed required strings;
responsive from 360px with no horizontal page scroll; reduced motion
respected; content visible without JS; contrast ≥ AA in both themes.
Deploy = push to `main` (Vercel auto-deploys).

## Left to the builder

- Exact wording trims of CV-derived copy (never adding claims).
- Exact SVG layout, box sizes and arrow routing.
- Component/file breakdown and data types for case studies.
- Whether "More projects" rows use chips or a muted comma list.

## Answers & calls after builder check

**Owner decision**
- Availability line: show **"Open to Full-Stack roles"** (option a), stored
  as `profile.availability` so it is a one-line removal later.

**Builder's calls (made by us, owner can override)**
- **Title everywhere:** "Full-Stack Engineer" replaces "Software Engineer"
  in hero, `<title>`, OG image/alt and `scripts/check-build.mjs`.
  `profile.summary` (meta description) keeps the CV wording.
- **Problem / Built / Outcome rows** restate CV facts only — no causes,
  pain points or results the CV doesn't state. Concretely:
  - M-Smile Problem: "Rebuild the app from React Native into one shared
    codebase for Android and iOS, and move existing users over without
    re-registration." Outcome: "One Kotlin Multiplatform codebase for
    Android and iOS; login, biometric settings and preferences carried
    over without re-registration."
  - Finance Ops Problem: "Reconciliation, GL posting, settlement, forex
    claims and Mark-to-Market statements relied on manual Excel
    processes." Outcome: "Manual Excel processes replaced by workflows
    with bulk upload, multi-level approval and automatic Excel email
    reports."
  - Loyalty Problem: "Stand up the production data and messaging
    infrastructure for the Loyalty platform and deploy its
    microservices." Outcome: "17 production servers provisioned;
    microservices deployed to Kubernetes through ArgoCD GitOps and
    Jenkins."
- **Experience, Bank Mega item:** 3 short lines — (1) M-Smile revamp and
  CT Connect Flutter app; (2) Loyalty platform, Kubernetes deployments,
  OpenTelemetry/SigNoz observability, Insider → S3 pipeline;
  (3) finance-operations automation, payroll onboarding, complaint
  dashboard, AI chatbot & AI Gateway — plus "See case studies ↑" link to
  `#work`. CT Connect also stays in Mobile Apps.
- **More projects list:** Observability, AI Chatbot & AI Gateway,
  Insider → S3 Data Pipeline, Payroll Onboarding & Complaint Dashboard
  (CT Connect is already in Mobile Apps).
- **Skills:** the CV "Languages" group is intentionally dissolved into
  layers; each item appears exactly once: Frontend (Next.js, React,
  TypeScript, JavaScript) · Backend (Node.js, Fastify, Express.js,
  Laravel, PHP, Spring Boot, Java, REST API) · Mobile (Kotlin Multiplatform,
  Compose Multiplatform, Ktor, Kotlin, Flutter, Dart, Ionic, Android, iOS)
  · Data & Messaging (PostgreSQL, MySQL, SQL Server, Apache Cassandra,
  Redis, Apache Kafka, Typesense, S3, SQL) · DevOps & Observability ·
  AI · Security & Delivery (as CV). Spoken languages row unchanged.
- **Diagram nodes:** generic structural nodes are allowed ("Android",
  "iOS", "Bank backend APIs", "Web UI", "Excel reports by email") as long
  as every named technology comes from the CV. "Pinned TLS" is allowed —
  the CV states certificate pinning. Diagrams are static, no links.
- **Old Featured Work:** `featuredWork` type/data, `featured-work.tsx` and
  the bento `TiltCard` usage are removed; tests rewritten for the new
  `caseStudies` and `moreProjects` data. `TiltCard`/`usePointerFine` may
  be deleted if nothing else uses them.
- **Hero on mobile:** need not fit one screen; the stack strip wraps.
