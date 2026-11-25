"use client";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const isLight = document.documentElement.classList.toggle("light");
    try {
      localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] transition-colors hover:border-[var(--accent-from)]"
    >
      <Sun className="hidden h-4 w-4 [:root.light_&]:block" />
      <Moon className="block h-4 w-4 [:root.light_&]:hidden" />
    </button>
  );
}
