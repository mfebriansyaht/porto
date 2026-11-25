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
  it("has 7 skill groups in CV order", () =>
    expect(skills.map((s) => s.group)).toEqual([
      "Languages", "Mobile", "Web & Backend", "Data & Messaging",
      "DevOps & Observability", "AI", "Security & Delivery",
    ]));
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
  it("stats", () => expect(stats.map((s) => s.value)).toEqual([4, 17, 2]));
});
