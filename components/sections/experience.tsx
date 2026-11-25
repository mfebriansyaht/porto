"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-6">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />
      <div ref={ref} className="relative pl-10 sm:pl-14">
        <div aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px bg-[var(--border)] sm:left-[19px]" />
        <motion.div
          aria-hidden
          className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-[var(--accent)] sm:left-[19px]"
          style={{ scaleY: reduced ? 1 : progress }}
        />
        <ol className="space-y-8">
          {experience.map((item, i) => {
            const Icon = item.kind === "education" ? GraduationCap : Briefcase;
            return (
              <li key={`${item.org}-${item.period}`} className="relative">
                <span className="absolute -left-10 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--accent)] sm:-left-14 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                </span>
                <Reveal delay={i * 0.05}>
                  <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="break-words text-lg font-semibold leading-snug">{item.role}</h3>
                        <p className="mt-1 break-words text-sm text-[var(--muted)]">
                          {item.org}
                          {item.location ? ` · ${item.location}` : ""}
                        </p>
                      </div>
                      <span className="w-fit shrink-0 rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--muted)]">
                        {item.period}
                      </span>
                    </div>
                    <div className="mt-5 space-y-5">
                      {item.groups.map((g, gi) => (
                        <div key={gi}>
                          {g.heading && (
                            <h4 className="mb-2 text-sm font-semibold text-[var(--accent)]">{g.heading}</h4>
                          )}
                          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)] marker:text-[var(--accent)]">
                            {g.bullets.map((b) => (
                              <li key={b} className="break-words">
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
