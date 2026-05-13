import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { SiteShell } from "@/components/layout/SiteShell";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ichsuchdeinauto.de"),
  title: {
    default: "ichsuchdeinauto.de — Smarte Gebrauchtwagen-Suche",
    template: "%s · ichsuchdeinauto.de",
  },
  description:
    "Beschreib dein Wunschfahrzeug. Wir prüfen persönlich und melden uns — digital, schnell, verlässlich.",
  openGraph: {
    title: "ichsuchdeinauto.de",
    description:
      "Moderne Fahrzeugsuche mit persönlichem Rückruf. Kein Marktplatz-Chaos.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
