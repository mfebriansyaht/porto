// Post-build check: the prerendered HTML must contain all key content, and the
// reveal animation must not hide anything before hydration / without JS.
import { existsSync, readFileSync } from "node:fs";

const candidates = [".next/server/app/index.html", ".next/server/pages/index.html"];
const file = candidates.find((p) => existsSync(p));
if (!file) {
  console.error(`check-build: prerendered HTML not found (tried ${candidates.join(", ")}). Run "next build" first.`);
  process.exit(1);
}
const html = readFileSync(file, "utf8");
const data = readFileSync("lib/data.ts", "utf8");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

// Slice experience / skills blocks out of data.ts and pull strings.
const slice = (start, end) => {
  const a = data.indexOf(start);
  const b = data.indexOf(end, a + 1);
  return data.slice(a, b === -1 ? undefined : b);
};
const roles = [...slice("export const experience", "export const skills").matchAll(/^\s{4}role: "([^"]+)"/gm)].map((m) => m[1]);
const groups = [...slice("export const skills", "export const languages").matchAll(/group: "([^"]+)"/g)].map((m) => m[1]);

const required = [
  "Moch Febriansyah Trisnadi",
  "Software Engineer",
  ...roles,
  ...groups,
  "Freelance & Other Work",
  "mfebriansyaht@gmail.com",
];
if (roles.length === 0 || groups.length === 0) {
  console.error("check-build: could not parse roles/groups from lib/data.ts");
  process.exit(1);
}

const failures = [];
for (const s of required) {
  if (!html.includes(s) && !html.includes(esc(s))) failures.push(`missing content: "${s}"`);
}

const noscriptRule = "[data-reveal]{opacity:1!important;transform:none!important}";
if (!html.replace(/\s+/g, "").includes(noscriptRule)) failures.push(`missing noscript rule: ${noscriptRule}`);

const h1 = html.match(/<h1\b[^>]*>/g) ?? [];
if (h1.length === 0) failures.push("no <h1> found");
for (const tag of h1) {
  if (/opacity:\s*0(?![.\d])/.test(tag)) failures.push(`hero <h1> has inline opacity:0: ${tag}`);
}

const heroStart = html.indexOf('id="home"');
const heroEnd = html.indexOf("<section", heroStart + 1);
if (heroStart === -1) failures.push('hero section id="home" not found');
else {
  const hero = html.slice(heroStart, heroEnd === -1 ? undefined : heroEnd);
  const tags = hero.match(/<[a-zA-Z][^>]*>/g) ?? [];
  for (const tag of tags) {
    if (/opacity:\s*0(?![.\d])/.test(tag) && !/tabular-nums/.test(tag)) failures.push(`hero element has inline opacity:0: ${tag}`);
  }
}

if (failures.length) {
  console.error(`check-build FAILED (${file}):\n - ${failures.join("\n - ")}`);
  process.exit(1);
}
console.log(`check-build OK (${file}): ${required.length} content strings, noscript rule, h1 visible.`);
