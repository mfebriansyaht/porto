import { caseStudies, moreProjects } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";

const rowLabel = "font-mono text-xs uppercase tracking-wider text-[var(--accent)]";

export function CaseStudies() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-6">
      <SectionHeading eyebrow="Case studies" title="Things I've built end to end" />

      <div className="space-y-6">
        {caseStudies.map((c) => (
          <Reveal key={c.id}>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="break-words font-display text-2xl font-medium tracking-tight sm:text-3xl">
                  {c.title}
                </h3>
                <p className={rowLabel}>{c.role}</p>
              </div>

              <dl className="mt-5 grid gap-y-3 text-sm leading-relaxed sm:grid-cols-[7rem_1fr] sm:gap-x-6">
                <dt className={rowLabel}>Problem</dt>
                <dd className="text-[var(--muted)]">{c.problem}</dd>
                <dt className={rowLabel}>Built</dt>
                <dd>
                  <ul className="list-disc space-y-1.5 pl-5 text-[var(--muted)] marker:text-[var(--accent)]">
                    {c.built.map((b) => (
                      <li key={b} className="break-words">
                        {b}
                      </li>
                    ))}
                  </ul>
                </dd>
                <dt className={rowLabel}>Outcome</dt>
                <dd className="font-medium text-[var(--fg)]">{c.outcome}</dd>
              </dl>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {c.layers.map((l) => (
                  <div key={l.label} className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--fg)]">{l.label}</span>
                    {l.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-12 font-display text-2xl font-medium tracking-tight">More projects</h3>
      <ul className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {moreProjects.map((p) => (
          <li key={p.title} className="grid gap-2 py-4 md:grid-cols-[16rem_1fr] md:gap-6">
            <p className="font-semibold">{p.title}</p>
            <div>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{p.summary}</p>
              <p className="mt-2 font-mono text-xs text-[var(--muted)]">{p.stack.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
