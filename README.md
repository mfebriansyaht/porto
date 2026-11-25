# Moch Febriansyah Trisnadi — Portfolio

A single-page personal portfolio for recruiters, built with Next.js (App Router), React, Tailwind CSS v4 and Motion. Sections: Hero, Featured Work, Mobile Apps, Experience, Skills, Contact. Dark/light theme, CV download, and a generated Open Graph image.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit tests (vitest)
npm run lint    # ESLint
npm run check   # production build + assertions on the prerendered HTML
```

`npm run check` runs `next build` and then `scripts/check-build.mjs`, which verifies the built HTML contains the key content (name, title, every role, every skill group, contact email) and that nothing is hidden before JavaScript runs.

## Updating content

- All site copy lives in `lib/data.ts` (profile, stats, featured work, apps, experience, skills, contact links). Edit there; components render from it.
- **CV:** replace `public/Moch_Febriansyah_Trisnadi_CV.pdf` (keep the file name).
- **Photo:** replace `public/profile.webp`.
- App screenshots/icons are in `public/` and referenced from `lib/data.ts`.

## Deploying (Vercel)

1. **GitHub token for pushing.** On GitHub go to Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token, with the `repo` scope. Use this token as the password when `git push` asks for credentials.
2. **Import into Vercel.** Go to [vercel.com](https://vercel.com), log in with the GitHub account `mfebriansyaht`, then Add New → Project → import the `porto` repository → Deploy. Next.js is auto-detected and no environment variables are needed.
3. **Auto-deploy.** Every push to `main` deploys automatically.
