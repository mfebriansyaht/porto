export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 sm:mb-12">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h2>
    </div>
  );
}
