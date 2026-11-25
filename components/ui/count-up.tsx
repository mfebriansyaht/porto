"use client";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { countAt } from "@/lib/count";

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  // Final value is the default so no-JS / reduced-motion users see real numbers.
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    if (!inView) {
      setValue(0);
      return;
    }
    const controls = animate(0, 1, {
      duration: 1.2,
      ease: "linear",
      onUpdate: (p) => setValue(countAt(to, p)),
      onComplete: () => setValue(to),
    });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
