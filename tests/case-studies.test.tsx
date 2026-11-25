// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseStudies } from "@/components/sections/case-studies";
import { caseStudies } from "@/lib/data";

// jsdom has no IntersectionObserver; Reveal (motion whileInView) needs one.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver ??= NoopObserver as unknown as typeof IntersectionObserver;

afterEach(cleanup);

describe("CaseStudies", () => {
  it("shows every case study without architecture diagrams (owner removed them)", () => {
    const { container } = render(<CaseStudies />);
    for (const c of caseStudies) expect(container.textContent).toContain(c.title);
    expect(container.querySelector('svg[role="img"]')).toBeNull();
  });
});
