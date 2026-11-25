import type { ReactNode } from "react";

// Shared primitives for the hand-drawn case-study diagrams. Colours come only
// from theme CSS variables so the diagrams follow light/dark mode.

export function DiagramFrame({
  id,
  title,
  desc,
  width,
  height,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full min-w-[560px]"
      style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{desc}</desc>
      <defs>
        <marker
          id={`${id}-arrow`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill="var(--accent)" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={accent ? "var(--accent-soft)" : "var(--card)"}
        stroke={accent ? "var(--accent)" : "var(--border)"}
        strokeWidth={1.5}
      />
      <text
        x={cx}
        y={sub ? cy - 4 : cy + 5}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill="var(--fg)"
      >
        {label}
      </text>
      {sub && (
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fill="var(--muted)">
          {sub}
        </text>
      )}
    </g>
  );
}

export function Arrow({ id, from, to }: { id: string; from: [number, number]; to: [number, number] }) {
  return (
    <line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      stroke="var(--muted)"
      strokeWidth={1.5}
      markerEnd={`url(#${id}-arrow)`}
    />
  );
}
