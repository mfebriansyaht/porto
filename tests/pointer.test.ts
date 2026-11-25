// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePointerFine } from "@/components/ui/use-pointer-fine";

const original = window.matchMedia;
afterEach(() => {
  window.matchMedia = original;
});

function mockMatch(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches,
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

describe("usePointerFine", () => {
  it("is false when matchMedia is missing", () => {
    // @ts-expect-error simulate missing API
    window.matchMedia = undefined;
    expect(renderHook(() => usePointerFine()).result.current).toBe(false);
  });
  it("is false when the query does not match (touch)", () => {
    mockMatch(false);
    expect(renderHook(() => usePointerFine()).result.current).toBe(false);
  });
  it("is true when hover+fine pointer matches", () => {
    mockMatch(true);
    const { result } = renderHook(() => usePointerFine());
    expect(result.current).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith("(hover: hover) and (pointer: fine)");
  });
});
