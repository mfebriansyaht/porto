import { describe, it, expect, afterEach } from "vitest";
import { siteUrl } from "@/lib/site-url";

const orig = process.env.VERCEL_PROJECT_PRODUCTION_URL;
afterEach(() => {
  if (orig === undefined) delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  else process.env.VERCEL_PROJECT_PRODUCTION_URL = orig;
});

describe("siteUrl", () => {
  it("uses vercel production url", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "x.vercel.app";
    expect(siteUrl().href).toBe("https://x.vercel.app/");
  });
  it("falls back to localhost", () => {
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    expect(siteUrl().href).toBe("http://localhost:3000/");
  });
});
