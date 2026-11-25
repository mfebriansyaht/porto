// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ reduced: true as boolean | null, inView: false }));
vi.mock("motion/react", () => ({
  animate: () => ({ stop: () => {} }),
  useInView: () => mocks.inView,
  useReducedMotion: () => mocks.reduced,
}));

import { CountUp } from "@/components/ui/count-up";

afterEach(cleanup);

describe("CountUp", () => {
  it("shows the final value, visible, under reduced motion", () => {
    mocks.reduced = true;
    mocks.inView = false;
    const { container } = render(<CountUp to={17} suffix="+" />);
    const el = container.querySelector("span")!;
    expect(el.textContent).toBe("17+");
    expect(el.style.opacity).toBe("1");
  });

  it("stays hidden (never shows 0) while off-screen with motion", () => {
    mocks.reduced = false;
    mocks.inView = false;
    const { container } = render(<CountUp to={17} />);
    const el = container.querySelector("span")!;
    expect(el.style.opacity).toBe("0");
    expect(el.hasAttribute("data-reveal")).toBe(true);
  });
});
