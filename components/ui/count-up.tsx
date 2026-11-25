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
  // Hidden (opacity 0, via data-reveal so no-JS shows it) until the number is
  // final (reduced motion) or about to count from 0, so the reset is never seen.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      setVisible(true);
      return;
    }
    if (!inView) {
      setValue(0);
      return;
    }
    setValue(0);
    setVisible(true);
    const controls = animate(0, 1, {
      duration: 1.2,
      ease: "linear",
      onUpdate: (p) => setValue(countAt(to, p)),
      onComplete: () => setValue(to),
    });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <span ref={ref} data-reveal className="tabular-nums" style={{ opacity: visible ? 1 : 0 }}>
      {value}
      {suffix}
    </span>
  );
}
