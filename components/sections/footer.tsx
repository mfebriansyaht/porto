import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 py-8 text-center text-sm text-[var(--muted)]">
      © {new Date().getFullYear()} {profile.name} · Built with Next.js
    </footer>
  );
}
