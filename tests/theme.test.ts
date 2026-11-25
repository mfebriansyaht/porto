import { describe, it, expect } from "vitest";
import { resolveTheme, THEME_SCRIPT } from "@/lib/theme";

describe("resolveTheme", () => {
  it("returns dark only for 'dark'", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
    expect(resolveTheme(null)).toBe("light");
    expect(resolveTheme("blue")).toBe("light");
  });
});

describe("THEME_SCRIPT", () => {
  const run = (stored: string | null, throws = false) => {
    const cls = new Set<string>();
    const doc = {
      documentElement: {
        classList: { toggle: (c: string, on: boolean) => (on ? cls.add(c) : cls.delete(c)) },
      },
    };
    const ls = {
      getItem: () => {
        if (throws) throw new Error("blocked");
        return stored;
      },
    };
    new Function("localStorage", "document", THEME_SCRIPT)(ls, doc);
    return cls.has("dark");
  };
  it("matches resolveTheme", () => {
    for (const v of ["light", "dark", null, "blue"]) {
      expect(run(v)).toBe(resolveTheme(v) === "dark");
    }
    expect(run("dark", true)).toBe(false);
  });
});
