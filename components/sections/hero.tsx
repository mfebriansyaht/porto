import type { CSSProperties } from "react";
import Image from "next/image";
import { Download, Mail, MapPin } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { contact, profile, stats } from "@/lib/data";
import { CountUp } from "@/components/ui/count-up";

const iconLink =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:border-[var(--accent-from)] hover:text-[var(--fg)]";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const words = profile.title.split(" ");
  return (
    <section id="home" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 pt-14 sm:px-6 sm:pt-20 lg:pt-28">
      <div className="flex flex-col items-center gap-10 text-center lg:flex-row-reverse lg:justify-between lg:text-left">
        <div className="hero-in" style={d(0)}>
          <div className="rounded-full bg-gradient-to-br from-accent-from to-accent-to p-1 shadow-[0_0_80px_-10px_var(--accent-to)]">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={400}
              height={400}
              priority
              className="h-44 w-44 rounded-full border-4 border-[var(--bg)] object-cover sm:h-56 sm:w-56 lg:h-72 lg:w-72"
            />
          </div>
        </div>

        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
              {profile.shortName}
            </span>
          </h1>
          <p className="mt-4 flex flex-wrap justify-center gap-x-[0.3em] text-2xl font-semibold sm:text-3xl lg:justify-start">
            {words.map((w, i) => (
              <span key={w + i} className="hero-in inline-block" style={d(150 + i * 120)}>
                {w}
              </span>
            ))}
          </p>
          <div className="hero-in" style={d(400)}>
            <p className="mt-3 text-lg text-[var(--muted)]">{profile.subtitle}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#contact"
                className="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-btn-from to-btn-to px-6 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-to)]/20 transition-transform hover:scale-[1.03]"
              >
                Hire me
              </a>
              <a
                href={profile.cvUrl}
                download
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 text-sm font-semibold transition-colors hover:border-[var(--accent-from)]"
              >
                <Download className="h-4 w-4" aria-hidden /> Download CV
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={iconLink}
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href={`mailto:${contact.email}`} aria-label="Email" className={iconLink}>
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={iconLink}
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-in mt-14" style={d(200)}>
        <dl className="grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-5 text-center sm:px-6"
            >
              <dt className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{s.label}</dt>
              <dd className="text-3xl font-bold sm:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-in mt-10" style={d(300)}>
        <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-[var(--muted)]">
          {profile.summary}
        </p>
      </div>
    </section>
  );
}
