import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { contact, profile } from "@/lib/data";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Reveal } from "@/components/ui/reveal";

const btn =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-semibold transition-colors hover:border-[var(--accent-from)]";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-6">
      <Reveal>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center backdrop-blur-sm sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s talk</h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
            Open to software engineering roles building reliable web, mobile, and backend systems.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-btn-from to-btn-to px-5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-to)]/20 transition-transform hover:scale-[1.03]"
            >
              <Mail className="h-4 w-4" aria-hidden /> Email
            </a>
            <CopyEmailButton email={contact.email} className={btn} />
            <a href={contact.whatsapp} {...ext} className={btn}>
              <FaWhatsapp className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
            <a href={contact.linkedin} {...ext} className={btn}>
              <FaLinkedin className="h-4 w-4" aria-hidden /> LinkedIn
            </a>
            <a href={contact.github} {...ext} className={btn}>
              <FaGithub className="h-4 w-4" aria-hidden /> GitHub
            </a>
            <a href={profile.cvUrl} download className={btn}>
              <Download className="h-4 w-4" aria-hidden /> Download CV
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
