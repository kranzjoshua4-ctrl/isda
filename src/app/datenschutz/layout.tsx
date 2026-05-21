import type { Metadata } from "next";

const SITE_URL = "https://ichsuchdeinauto.de";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung gemäß DSGVO und BDSG für ichsuchdeinauto.de (Inhaber Serkan Tekten, Autoecke-Kostheim): Verantwortlicher, Datenkategorien, Rechtsgrundlagen, Drittlandtransfers, Betroffenenrechte und Beschwerderecht.",
  alternates: { canonical: `${SITE_URL}/datenschutz` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Datenschutzerklärung · ichsuchdeinauto.de",
    description:
      "Informationen gemäß Art. 13/14 DSGVO zur Verarbeitung personenbezogener Daten auf ichsuchdeinauto.de.",
    url: `${SITE_URL}/datenschutz`,
    locale: "de_DE",
    type: "website",
  },
};

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return children;
}
