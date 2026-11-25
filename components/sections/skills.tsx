import { languages, skills } from "@/lib/data";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-6">
      <SectionHeading eyebrow="Skills" title="Tools I work with" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.06}>
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 backdrop-blur-sm">
              <h3 className="mb-4 text-base font-semibold">{s.group}</h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <Chip key={it}>{it}</Chip>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {languages.map((l) => (
            <p key={l.name} className="text-sm text-[var(--muted)]">
              <span className="font-semibold text-[var(--fg)]">{l.name}</span> · {l.level}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
