import { describe, expect, it } from "vitest";
import { countAt } from "@/lib/count";

describe("countAt", () => {
  it("starts at 0 and ends at target", () => {
    expect(countAt(17, 0)).toBe(0);
    expect(countAt(17, 1)).toBe(17);
  });
  it("clamps progress", () => {
    expect(countAt(17, 2)).toBe(17);
    expect(countAt(17, -1)).toBe(0);
  });
  it("returns an integer mid-way", () => {
    const v = countAt(4, 0.5);
    expect(Number.isInteger(v)).toBe(true);
    expect(v).toBeGreaterThanOrEqual(1);
    expect(v).toBeLessThanOrEqual(4);
  });
});
