import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";

import { SiteShell } from "@/components/layout/SiteShell";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${montserrat.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
