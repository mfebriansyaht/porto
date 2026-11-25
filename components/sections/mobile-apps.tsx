import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { apps, type App } from "@/lib/data";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

function AppCard({ app }: { app: App }) {
  return (
    <TiltCard className="h-full">
      <article className="flex h-full flex-col gap-5 p-5 sm:flex-row sm:p-6">
        <Image
          src={app.image}
          alt={`${app.title} app screenshot`}
          width={240}
          height={240}
          sizes="(min-width: 640px) 112px, 96px"
          className="h-24 w-24 shrink-0 rounded-2xl border border-[var(--border)] object-cover sm:h-28 sm:w-28"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <h4 className="break-words text-lg font-semibold leading-snug">{app.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{app.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {app.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <a
            href={app.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-gradient-to-r from-accent-from to-accent-to px-5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-to)]/20 transition-transform hover:scale-[1.03]"
          >
            Get it on Google Play <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </article>
    </TiltCard>
  );
}

export function MobileApps() {
  const primary = apps.filter((a) => a.group === "bank-mega");
  const freelance = apps.filter((a) => a.group === "freelance");
  return (
    <section id="apps" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-6">
      <SectionHeading eyebrow="Mobile Apps" title="Mobile apps on Play Store" />
      <div className="grid grid-cols-1 gap-5">
        {primary.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <AppCard app={a} />
          </Reveal>
        ))}
      </div>
      <Reveal>
        <h3 className="mb-5 mt-14 text-xl font-semibold tracking-tight">Freelance &amp; Other Work</h3>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {freelance.map((a, i) => (
          <Reveal key={a.title} delay={(i % 2) * 0.08}>
            <AppCard app={a} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
