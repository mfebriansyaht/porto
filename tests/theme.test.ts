import { describe, it, expect } from "vitest";
import { resolveTheme, THEME_SCRIPT } from "@/lib/theme";

describe("resolveTheme", () => {
  it("returns light only for 'light'", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
    expect(resolveTheme(null)).toBe("dark");
    expect(resolveTheme("blue")).toBe("dark");
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
    return cls.has("light");
  };
  it("matches resolveTheme", () => {
    expect(run("light")).toBe(true);
    expect(run("dark")).toBe(false);
    expect(run(null)).toBe(false);
    expect(run("blue")).toBe(false);
    expect(run(null, true)).toBe(false);
  });
});
