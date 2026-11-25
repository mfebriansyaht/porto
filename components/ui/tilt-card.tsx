"use client";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { usePointerFine } from "@/components/ui/use-pointer-fine";

const MAX_TILT = 4;

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const interactive = fine && !reduced;

  const base =
    "relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-[border-color] duration-300 " +
    className;

  if (!interactive) return <div className={base}>{children}</div>;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - py) * 2 * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  const style = {
    transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
    transition: "transform 200ms ease-out, border-color 300ms",
  } as CSSProperties;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
      style={style}
      className={base + " hover:border-[var(--accent)]"}
    >
      {children}
    </div>
  );
}
