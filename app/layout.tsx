import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";
import { THEME_SCRIPT } from "@/lib/theme";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

const title = `${profile.name} — ${profile.title}`;
const description = profile.summary.split(". ")[0] + ".";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
