import { describe, expect, it, vi } from "vitest";
import { copyEmail } from "@/lib/clipboard";

const email = "mfebriansyaht@gmail.com";

describe("copyEmail", () => {
  it("returns copied when clipboard resolves", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const openMailto = vi.fn();
    await expect(copyEmail(email, { clipboard: { writeText }, openMailto })).resolves.toBe("copied");
    expect(writeText).toHaveBeenCalledWith(email);
    expect(openMailto).not.toHaveBeenCalled();
  });

  it("falls back to mailto when clipboard is undefined", async () => {
    const openMailto = vi.fn();
    await expect(copyEmail(email, { clipboard: undefined, openMailto })).resolves.toBe("mailto");
    expect(openMailto).toHaveBeenCalledWith("mailto:" + email);
  });

  it("falls back to mailto when writeText rejects", async () => {
    const openMailto = vi.fn();
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    await expect(copyEmail(email, { clipboard: { writeText }, openMailto })).resolves.toBe("mailto");
    expect(openMailto).toHaveBeenCalledWith("mailto:" + email);
  });

  it("falls back to mailto when writeText throws synchronously", async () => {
    const openMailto = vi.fn();
    const writeText = vi.fn(() => {
      throw new Error("boom");
    });
    await expect(copyEmail(email, { clipboard: { writeText }, openMailto })).resolves.toBe("mailto");
  });
});
