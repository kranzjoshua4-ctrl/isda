import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Portal — Anmeldung",
  description:
    "Anmeldung für registrierte Händlerpartner — Zugriff auf Anfragen und Vermittlung im Partner Portal.",
};

export default function PartnerPortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
