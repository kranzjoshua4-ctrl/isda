import type { Metadata } from "next";

const SITE_URL = "https://ichsuchdeinauto.de";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der Autoecke-Kostheim (Inhaber Serkan Tekten): Angaben gemäß § 5 TMG, Kontakt, Steuer- und Umsatzsteuer-IDs, Haftungsausschluss und Urheberrecht.",
  alternates: { canonical: `${SITE_URL}/impressum` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Impressum · Autoecke-Kostheim",
    description: "Rechtliche Anbieterkennzeichnung und Pflichtangaben gemäß TMG und RStV.",
    url: `${SITE_URL}/impressum`,
    locale: "de_DE",
    type: "website",
  },
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
