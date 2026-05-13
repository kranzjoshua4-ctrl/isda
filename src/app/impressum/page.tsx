import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Copyright,
  FileText,
  Hash,
  Landmark,
  Mail,
  MapPin,
  Scale,
  Shield,
  User,
} from "lucide-react";

const SITE_URL = "https://ichsuchdeinauto.de";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der Autoecke-Kostheim (Inhaber Serkan Tekten): Angaben gemäß § 5 TMG, Kontakt, Steuer- und Umsatzsteuer-IDs, Haftungsausschluss und Urheberrecht.",
  alternates: { canonical: `${SITE_URL}/impressum` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Impressum · Autoecke-Kostheim",
    description:
      "Rechtliche Anbieterkennzeichnung und Pflichtangaben gemäß TMG und RStV.",
    url: `${SITE_URL}/impressum`,
    locale: "de_DE",
    type: "website",
  },
};

const business = {
  name: "Autoecke-Kostheim",
  owner: "Serkan Tekten",
  street: "Am Mainzer Weg 1",
  postal: "55246",
  city: "Mainz-Kostheim",
  country: "Deutschland",
  taxId: "04387405990",
  vatId: "DE 291562760",
} as const;

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-tech/35 bg-gradient-to-b from-tech/20 to-tech/5 text-tech shadow-[inset_0_1px_0_0_oklch(1_0_0/0.12)] transition duration-300 group-hover:border-tech/55 group-hover:from-tech/30 group-hover:to-tech/10 group-hover:shadow-[0_0_20px_-4px_oklch(0.42_0.09_252/0.45)]">
      {children}
    </span>
  );
}

function ImpressumSection({
  id,
  n,
  title,
  icon,
  children,
}: {
  id: string;
  n: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="group scroll-mt-24 rounded-xl border border-border/90 bg-card/35 px-5 py-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-tech/40 hover:bg-card/55 hover:shadow-[0_0_36px_-12px_oklch(0.42_0.09_252/0.22)] sm:px-6 sm:py-7"
    >
      <div className="flex gap-4">
        <SectionIcon>{icon}</SectionIcon>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-tech/85">
            {String(n).padStart(2, "0")}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
          >
            {title}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ImpressumPage() {
  const year = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city,
      postalCode: business.postal,
      addressCountry: "DE",
    },
    taxID: business.taxId,
    vatID: business.vatId.replace(/\s/g, ""),
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-[calc(100vh-8rem)] px-4 pb-20 pt-10 text-foreground sm:px-6 sm:pt-14">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-80 max-w-3xl bg-[radial-gradient(ellipse_75%_55%_at_50%_-25%,oklch(0.48_0.11_252/0.28),transparent_62%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-48 max-w-2xl bg-[radial-gradient(ellipse_90%_80%_at_50%_120%,oklch(0.38_0.06_260/0.12),transparent_55%)]"
          aria-hidden
        />

        <article
          className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both relative z-[1] mx-auto max-w-2xl duration-700"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <meta itemProp="name" content={business.name} />
          <meta itemProp="taxID" content={business.taxId} />
          <meta itemProp="vatID" content={business.vatId} />

          <header className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-tech">
              Rechtliche Hinweise
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
              Impressum
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Pflichtangaben gemäß Telemediengesetz (TMG) und Hinweise zu Haftung und Urheberrecht.
              Stand: {year}
            </p>
          </header>

          <div className="rounded-2xl border border-border/90 bg-card/50 p-5 shadow-tech-lg backdrop-blur-2xl ring-1 ring-tech/15 sm:p-8 md:p-10">
            <div className="space-y-4 sm:space-y-5">
              <ImpressumSection
                id="tmg"
                n={1}
                title="Angaben gemäß § 5 TMG"
                icon={<Building2 className="size-4" strokeWidth={1.75} aria-hidden />}
              >
                <address
                  className="not-italic text-muted-foreground"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span className="font-semibold text-foreground" itemProp="name">
                    {business.name}
                  </span>
                  <br />
                  <span itemProp="streetAddress">{business.street}</span>
                  <br />
                  <span itemProp="postalCode">{business.postal}</span>{" "}
                  <span itemProp="addressLocality">{business.city}</span>
                  <br />
                  <span itemProp="addressCountry">{business.country}</span>
                </address>
              </ImpressumSection>

              <ImpressumSection
                id="vertretung"
                n={2}
                title="Vertreten durch"
                icon={<User className="size-4" strokeWidth={1.75} aria-hidden />}
              >
                <p>
                  Der Betrieb wird geführt durch den Inhaber{" "}
                  <strong className="font-semibold text-foreground">{business.owner}</strong>{" "}
                  (Einzelunternehmen im Sinne des § 5 TMG).
                </p>
              </ImpressumSection>

              <ImpressumSection
                id="kontakt"
                n={3}
                title="Kontakt"
                icon={<Mail className="size-4" strokeWidth={1.75} aria-hidden />}
              >
                <p className="flex flex-wrap items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-tech" aria-hidden />
                  <span>
                    <span className="font-medium text-foreground/90">Postanschrift:</span> siehe oben
                    unter § 5 TMG.
                  </span>
                </p>
                <p className="flex flex-wrap items-start gap-2">
                  <Mail className="mt-0.5 size-4 shrink-0 text-tech" aria-hidden />
                  <span>
                    <span className="font-medium text-foreground/90">E-Mail:</span>{" "}
                    <a
                      className="rounded-md font-medium text-tech underline decoration-tech/50 underline-offset-4 transition hover:text-tech hover:decoration-tech"
                      href="mailto:kontakt@ichsuchdeinauto.de"
                    >
                      kontakt@ichsuchdeinauto.de
                    </a>{" "}
                    (schnelle elektronische Kontaktaufnahme im Sinne des § 5 TMG über dieses
                    Onlineangebot)
                  </span>
                </p>
                <p className="rounded-lg border border-tech/20 bg-tech/[0.06] px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
                  Hinweis: Vertragliche oder buchhalterische Anfragen bitte eindeutig an den oben
                  genannten Anbieter adressieren. Informationen zur Datenverarbeitung finden Sie in
                  unserer{" "}
                  <Link
                    href="/datenschutz"
                    className="font-medium text-foreground/80 underline decoration-tech/30 underline-offset-2 transition hover:text-tech"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </ImpressumSection>

              <ImpressumSection
                id="steuern"
                n={4}
                title="Steuerliche Angaben"
                icon={<Landmark className="size-4" strokeWidth={1.75} aria-hidden />}
              >
                <p className="flex flex-wrap items-start gap-2">
                  <Hash className="mt-0.5 size-4 shrink-0 text-tech" aria-hidden />
                  <span>
                    <span className="font-medium text-foreground/90">Steuernummer:</span>{" "}
                    <span className="font-mono text-sm text-foreground/80">{business.taxId}</span>{" "}
                    (Finanzamt zuständig nach innerdeutschen Vorschriften)
                  </span>
                </p>
                <p className="flex flex-wrap items-start gap-2">
                  <FileText className="mt-0.5 size-4 shrink-0 text-tech" aria-hidden />
                  <span>
                    <span className="font-medium text-foreground/90">Umsatzsteuer-Identifikationsnummer:</span>{" "}
                    <span className="font-mono text-sm text-foreground/80">{business.vatId}</span>{" "}
                    gemäß § 27a Umsatzsteuergesetz
                  </span>
                </p>
              </ImpressumSection>

              <ImpressumSection
                id="rstv"
                n={5}
                title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV"
                icon={<Shield className="size-4" strokeWidth={1.75} aria-hidden />}
              >
                <p>
                  <strong className="font-semibold text-foreground">{business.owner}</strong>
                  <br />
                  {business.street}, {business.postal} {business.city}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
                  Inhalte externer Links. Für den Inhalt verlinkter Seiten sind ausschließlich deren
                  Betreiber verantwortlich.
                </p>
              </ImpressumSection>

              <ImpressumSection
                id="haftung"
                n={6}
                title="Haftungsausschluss"
                icon={<Scale className="size-4" strokeWidth={1.75} aria-hidden />}
              >
                <h3 className="text-sm font-semibold text-foreground/90">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
                  Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
                  als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
                  fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                  rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
                  der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer
                  konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
                <h3 className="pt-1 text-sm font-semibold text-foreground/90">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte
                  wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
                  zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                  Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                  inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                  einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Links umgehend entfernen.
                </p>
              </ImpressumSection>

              <ImpressumSection
                id="urheber"
                n={7}
                title="Urheberrecht"
                icon={<Copyright className="size-4" strokeWidth={1.75} aria-hidden />}
              >
                <p>
                  Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                  unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                  Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                  Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                  wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
                  Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
                  aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
                  von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </ImpressumSection>
            </div>

            <footer className="mt-10 border-t border-border/80 pt-8 text-center">
              <p className="text-xs text-muted-foreground">
                © {year}{" "}
                <span itemProp="legalName" className="text-foreground/75">
                  {business.name}
                </span>
                {" · "}
                <Link
                  href="/datenschutz"
                  className="text-foreground/70 underline decoration-tech/25 underline-offset-4 transition hover:text-tech"
                >
                  Datenschutz
                </Link>
                {" · "}
                <Link
                  href="/kontakt"
                  className="text-foreground/70 underline decoration-tech/25 underline-offset-4 transition hover:text-tech"
                >
                  Kontakt
                </Link>
              </p>
            </footer>
          </div>
        </article>
      </div>
    </>
  );
}
