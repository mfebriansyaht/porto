export type Theme = "dark" | "light";

export function resolveTheme(stored: string | null): Theme {
  return stored === "dark" ? "dark" : "light";
}

// Inline pre-hydration script; must behave exactly like resolveTheme.
export const THEME_SCRIPT = `(function(){var s=null;try{s=localStorage.getItem("theme")}catch(e){}document.documentElement.classList.toggle("dark",s==="dark")})();`;
