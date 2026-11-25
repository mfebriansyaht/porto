type Deps = {
  clipboard?: { writeText(s: string): Promise<void> };
  openMailto?: (href: string) => void;
};

const defaultOpenMailto = (href: string) => {
  window.location.href = href;
};

// Never rejects: any clipboard problem falls back to opening a mailto: link.
export async function copyEmail(email: string, deps: Deps = {}): Promise<"copied" | "mailto"> {
  const clipboard =
    "clipboard" in deps
      ? deps.clipboard
      : typeof navigator !== "undefined"
        ? navigator.clipboard
        : undefined;
  const openMailto = deps.openMailto ?? defaultOpenMailto;
  try {
    if (!clipboard) throw new Error("clipboard unavailable");
    await clipboard.writeText(email);
    return "copied";
  } catch {
    try {
      openMailto("mailto:" + email);
    } catch {
      // ignore: nothing more we can do
    }
    return "mailto";
  }
}
