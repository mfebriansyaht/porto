# Portfolio Rewrite — Design

Date: 2026-11-25
Owner: Moch Febriansyah Trisnadi (mfebriansyaht)
Repo: https://github.com/mfebriansyaht/porto (branch `main`)

## Intent

Rewrite the personal portfolio from scratch so it matches the latest CV
(`D:\Febri\CV\Moch_Febriansyah_Trisnadi_CV.pdf`, Nov 2025) and looks
distinctly more attractive than the current ByteGrad tutorial template.

**Audience:** recruiters. **Success:** a recruiter lands on the page, within
~10 seconds understands *who he is* (Software Engineer, Full-Stack & Mobile,
banking systems), *what he has proven* (lead dev on M-Smile mobile banking
revamp and the production Loyalty platform), and *contacts him* (email,
WhatsApp, LinkedIn) or downloads the CV.

## Goals

- Content mirrors the new CV exactly (titles, dates, bullets, skills).
- Modern, polished one-page site with tasteful motion.
- Zero-failure contact path: every contact option works without a backend.
- All content lives in one data file so future CV updates touch one place.
- Deployed to Vercel from the GitHub repo.

## Non-goals

- No blog, CMS, i18n, analytics, or multi-page routing.
- No server-side contact form (Resend form is removed).

## Anti-goals (failure even if it "works")

- Anything a recruiter clicks that errors or 404s (broken photo, dead form,
  broken CV link).
- Animation that delays reading the headline or makes the page feel slow;
  janky motion on mobile.
- Claims not in the CV (no invented metrics or roles).

## Constraints

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4,
  Framer Motion (`motion` package or `framer-motion` latest compatible with React 19).
- Static, fully pre-rendered page; must `next build` cleanly on Vercel with
  no env vars.
- Respect `prefers-reduced-motion`: all non-essential motion disabled.
- Responsive from 360px width; Lighthouse performance and accessibility
  should stay high (target ≥ 90).
- Profile photo and CV served from `/public` (the current LinkedIn photo URL
  has expired and must not be used).

## Approaches considered

- **A. Revamp on the existing Next 13 codebase** — less work, lowest risk,
  but keeps template structure.
- **B. Rewrite from zero on Next 15 (chosen)** — clean, modern codebase the
  owner can show and extend; roughly double the work of A.
- **C. Content update + light polish** — fastest, but stays a recognisable
  template; rejected because it fails the "more attractive" goal.

Owner chose **B**.

## Decided design

### Page structure (single page, English)

0. (Global) Content order is tuned for a recruiter skimming top-down.

1. **Navbar** — sticky, translucent/blur. Logo text `MFT.`, anchor links
   (Work, Experience, Skills, Contact), theme toggle. Highlights active
   section on scroll. Collapses to a menu on mobile.
2. **Hero** — photo, "Hi, I'm Febriansyah", title *Software Engineer*,
   subtitle *Full-Stack & Mobile · Banking Systems*, location South Jakarta.
   CTAs: **Hire me** (scrolls to Contact), **Download CV**, icon links
   LinkedIn / email / WhatsApp. Stats row: `4+ yrs experience`,
   `17 production servers`, `2 platforms led` (M-Smile, Loyalty).
   Below the CTAs: the CV summary as a short paragraph (builder's call,
   condensed only by trimming, never adding claims).
3. **Featured Work** — bento grid of case-study cards, each: title, role,
   one/two-line problem→outcome, stack chips. Cards:
   - M-Smile Mobile Banking Revamp (large card)
   - Loyalty Platform (large card)
   - Observability (OpenTelemetry + SigNoz)
   - AI Chatbot & AI Gateway
   - Finance Operations Automation (reconciliation, bulk posting,
     settlement reporting, forex claim, MtM)
   - Insider → S3 data pipeline
   - Payroll Onboarding & Complaint Dashboard
   No screenshots required for these (internal bank systems); visual
   interest comes from gradients/icons.
4. **Mobile Apps on Play Store** — cards with existing images and Play Store
   links (reuse `public/ct.webp`, `gbk.webp`, `arsy.webp`, `arsy p.webp`;
   URLs from current `lib/data.ts`).
   - CT Connect — Bank Mega work, described per CV.
   - Love GBK, ArsyGas, ArsyGas Partners — shown under a sub-heading
     **"Freelance & Other Work"** (owner decision). These are not in the CV;
     this is the one explicit exception to "mirror the CV". Copy is taken
     from the current site's `lib/data.ts` (role: Mobile Apps Developer),
     not invented.
5. **Experience** — vertical timeline: Full-Stack Developer, Bank Mega
   (Feb 2023 – Present) with its grouped bullets (Mobile Banking; Platform,
   Infrastructure & Observability; Finance Operations Automation; AI);
   IT Development Program, Bank Mega (Aug 2022 – Feb 2023);
   IT Developer, EcoEdu.id (Sep 2021 – Feb 2022);
   Education: Telkom University, Bachelor of Informatics, GPA 3.13/4.00
   (2017 – 2021).
6. **Skills** — 7 groups exactly as CV: Languages, Mobile, Web & Backend,
   Data & Messaging, DevOps & Observability, AI, Security & Delivery.
   Plus Languages spoken: Indonesian (Native), English (Professional).
7. **Contact** — "Let's talk" block: email (mailto + copy-to-clipboard
   button with toast), WhatsApp (`https://wa.me/6281910233934`), LinkedIn
   (`https://www.linkedin.com/in/mfebriansyaht`), Download CV.
8. **Footer** — name, year, "Built with Next.js".

### Contact details (from CV)

- Email: mfebriansyaht@gmail.com
- Phone/WhatsApp: +62 819 1023 3934
- LinkedIn: linkedin.com/in/mfebriansyaht
- GitHub: github.com/mfebriansyaht (builder's call: shown in Contact and
  footer only, not in the Hero)

### Visual style

- Dark mode default, light mode via toggle; preference persisted in
  localStorage, no flash on load.
- Dark background with subtle radial gradient glows and a faint grid
  pattern; accent gradient blue→violet.
- Typography: Geist Sans (or Inter) via `next/font`.
- Generous spacing, rounded-2xl cards with thin borders.

### Motion (Framer Motion)

- Hero: headline words reveal in sequence; stat numbers count up once.
- Sections fade/slide in on scroll (once).
- Featured cards: subtle 3D tilt + cursor-following glow on hover
  (pointer devices only).
- Experience timeline: progress line fills as you scroll.
- All of the above off under `prefers-reduced-motion`.

### Assets

- **Photo:** use `D:\Febri\CV\build\photo.png` (400×400) → `public/profile.webp`.
- **CV:** copy `D:\Febri\CV\Moch_Febriansyah_Trisnadi_CV.pdf` to
  `public/Moch_Febriansyah_Trisnadi_CV.pdf`; remove old `public/CV.pdf`.
- Remove unused assets (`corpcomment.png`, `rmtdev.png`,
  `wordanalytics.png`, `mega.png` if unused).

### Content source

All copy in `lib/data.ts` (typed). Components render from it; no copy
hard-coded in components.

### SEO / metadata

Title "Moch Febriansyah Trisnadi — Software Engineer", description from CV
summary, Open Graph image (generated via `next/og` or static), favicon.

### Deployment

- Old code removed; new project replaces repo contents on `main` in one
  commit (history preserved).
- README rewritten for this project (remove ByteGrad tutorial text).
- The build ends at a **local commit on `main`**. The owner pushes it
  himself (no GitHub credentials on this machine).
- The owner imports the repo into **his own Vercel account** manually
  (Vercel connected to this Claude session belongs to a different
  account and must not be used). No Vercel project exists for this repo
  yet, so there are no old settings to clean up. No env vars needed.
- The builder writes step-by-step push + Vercel import instructions in
  the README.
- `metadataBase` / OG / canonical URL: derived from
  `process.env.VERCEL_PROJECT_PRODUCTION_URL` (set automatically by
  Vercel), falling back to `http://localhost:3000`. No hard-coded domain.

## Left to the builder

- Exact component breakdown, file layout, icon library (react-icons or
  lucide-react).
- Exact colors/shades within the blue→violet dark theme.
- Exact card copy wording, as long as every claim traces to the CV.
- Whether to use `framer-motion` or `motion` package.
