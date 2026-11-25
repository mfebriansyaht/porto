import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { apps, experience, featuredWork, profile, skills, stats } from "@/lib/data";

const pub = (p: string) => path.join(process.cwd(), "public", p);

describe("data", () => {
  it("has CV titles and periods", () => {
    expect(experience.map((e) => [e.role, e.period])).toEqual([
      ["Full-Stack Developer", "Feb 2023 – Present"],
      ["IT Development Program", "Aug 2022 – Feb 2023"],
      ["IT Developer", "Sep 2021 – Feb 2022"],
      ["Bachelor of Informatics", "2017 – 2021"],
    ]);
  });
  it("profile framing", () => {
    expect(profile.title).toBe("Full-Stack Engineer");
    expect(profile.subtitle).toBe("Web, mobile & backend systems for banking");
    expect(profile.availability).toBe("Open to Full-Stack roles");
    expect(profile.stack).toEqual(["Next.js", "Node.js", "Laravel", "Kotlin", "PostgreSQL", "Kafka", "Kubernetes"]);
  });
  it("skills grouped by layer", () =>
    expect(skills.map((s) => s.group)).toEqual([
      "Frontend", "Backend", "Mobile", "Data & Messaging",
      "DevOps & Observability", "AI", "Security & Delivery",
    ]));
  it("every CV skill appears exactly once", () => {
    const all = skills.flatMap((s) => s.items);
    expect(new Set(all).size).toBe(all.length);
    for (const s of ["Kotlin", "TypeScript", "JavaScript", "PHP", "Java", "Dart", "SQL", "Spring Boot", "Ionic"]) {
      expect(all).toContain(s);
    }
  });
  it("bank mega item is compact and links to case studies", () => {
    const bm = experience[0];
    expect(bm.groups.flatMap((g) => g.bullets)).toHaveLength(3);
    expect(bm.link).toEqual({ label: "See case studies", href: "#work" });
  });
  it("no lead wording", () =>
    expect(JSON.stringify({ profile, experience, skills })).not.toMatch(/\blead\b/i));
  it("featured work ids", () =>
    expect(featuredWork.map((f) => f.id)).toEqual([
      "m-smile", "loyalty", "observability", "ai-gateway",
      "finance-ops", "insider-pipeline", "payroll-complaint",
    ]));
  it("apps grouping", () => {
    expect(apps.filter((a) => a.group === "freelance").map((a) => a.title)).toEqual([
      "Love GBK", "ArsyGas: Gas yang Benar", "ArsyGas – Partners",
    ]);
  });
  it("every asset path exists in public/", () => {
    for (const p of [profile.photo, profile.cvUrl, ...apps.map((a) => a.image)]) {
      expect(fs.existsSync(pub(p)), p).toBe(true);
    }
  });
  it("stats", () => expect(stats.map((s) => s.value)).toEqual([4]));
});
