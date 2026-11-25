"use client";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
    >
      <Sun className="block h-4 w-4 [:root.dark_&]:hidden" />
      <Moon className="hidden h-4 w-4 [:root.dark_&]:block" />
    </button>
  );
}
