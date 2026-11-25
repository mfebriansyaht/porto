import {
  Activity,
  Bot,
  Boxes,
  Database,
  Landmark,
  LayoutDashboard,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { featuredWork } from "@/lib/data";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Server,
  Activity,
  Bot,
  Landmark,
  Database,
  LayoutDashboard,
};

/** Display order so the bento rows fill: 2+1, 1+2, 1+1+1 (md and up). */
const order = ["m-smile", "observability", "ai-gateway", "loyalty", "finance-ops", "insider-pipeline", "payroll-complaint"];

export function FeaturedWork() {
  const items = [...featuredWork].sort((a, b) => {
    const ia = order.indexOf(a.id);
    const ib = order.indexOf(b.id);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-6">
      <SectionHeading eyebrow="Featured Work" title="Things I've built and shipped" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((w, i) => {
          const Icon = iconMap[w.icon] ?? Boxes;
          return (
            <Reveal key={w.id} delay={(i % 3) * 0.08} className={w.size === "lg" ? "md:col-span-2" : ""}>
              <TiltCard className="h-full">
                <article className="flex h-full flex-col p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-from to-accent-to text-white shadow-lg shadow-[var(--accent-to)]/20">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-semibold leading-snug">{w.title}</h3>
                      <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-[var(--accent-from)]">
                        {w.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{w.summary}</p>
                  {w.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                      {w.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex gap-2">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent-from to-accent-to"
                          />
                          <span className="min-w-0">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {w.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
