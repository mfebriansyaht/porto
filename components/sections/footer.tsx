import { contact, profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 py-8 text-center text-sm text-[var(--muted)]">
      © {new Date().getFullYear()} {profile.name} · Built with Next.js ·{" "}
      <a
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="underline underline-offset-4 hover:text-[var(--fg)]"
      >
        GitHub
      </a>
    </footer>
  );
}
