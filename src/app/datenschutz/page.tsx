import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Cookie,
  CreditCard,
  Eye,
  FileText,
  Globe2,
  HardDrive,
  Lock,
  Mail,
  Mic,
  RefreshCcw,
  ScrollText,
  Server,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

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

const business = {
  name: "Autoecke-Kostheim",
  owner: "Serkan Tekten",
  street: "Am Mainzer Weg 1",
  postal: "55246",
  city: "Mainz-Kostheim",
  country: "Deutschland",
  email: "kontakt@ichsuchdeinauto.de",
} as const;

const supervisoryAuthority = {
  name: "Der Hessische Beauftragte für Datenschutz und Informationsfreiheit",
  street: "Gustav-Stresemann-Ring 1",
  postal: "65189",
  city: "Wiesbaden",
  phone: "+49 611 1408 - 0",
  email: "poststelle@datenschutz.hessen.de",
  url: "https://datenschutz.hessen.de",
} as const;

function SectionNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-full bg-cta-navy px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-cta">
      § {String(n).padStart(2, "0")}
    </span>
  );
}

function PrivacySection({
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
      className="group scroll-mt-28 rounded-2xl border border-[rgba(148,163,184,0.28)] bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07),0_4px_14px_rgba(15,23,42,0.05)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_24px_64px_rgba(15,23,42,0.1),0_8px_22px_rgba(15,23,42,0.06)] sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex items-center gap-3">
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(148,163,184,0.32)] bg-[#f8fafc] text-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(15,23,42,0.04)]"
            aria-hidden
          >
            {icon}
          </span>
          <SectionNumber n={n} />
        </div>
        <div className="min-w-0 flex-1">
          <h2
            id={`${id}-heading`}
            className="font-display text-lg font-semibold leading-snug tracking-tight text-[#0f172a] sm:text-xl"
          >
            {title}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#475569] [&_a]:font-medium [&_a]:text-[#0a0a0a] [&_a]:underline [&_a]:decoration-[rgba(15,23,42,0.25)] [&_a]:underline-offset-2 [&_a:hover]:decoration-[#0a0a0a] [&_strong]:font-semibold [&_strong]:text-[#0f172a]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DatenschutzPage() {
  const year = new Date().getFullYear();
  const updated = "Mai 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "Datenschutzerklärung",
    url: `${SITE_URL}/datenschutz`,
    inLanguage: "de-DE",
    dateModified: "2026-05-13",
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.street,
        addressLocality: business.city,
        postalCode: business.postal,
        addressCountry: "DE",
      },
      email: business.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-b from-[rgba(15,23,42,0.06)] via-transparent to-transparent blur-3xl"
          aria-hidden
        />

        <header className="relative z-10 mb-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748b]">
            Rechtliche Hinweise · DSGVO
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl md:text-[2.65rem]">
            Datenschutzerklärung
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-[#475569] sm:text-[15px]">
            Informationen gemäß Art. 13 und 14 Datenschutz-Grundverordnung (DSGVO) sowie § 13
            Telemediengesetz (TMG) zur Verarbeitung personenbezogener Daten beim Besuch und der
            Nutzung von{" "}
            <Link
              href="/"
              className="font-medium text-[#0a0a0a] underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 transition hover:decoration-[#0a0a0a]"
            >
              ichsuchdeinauto.de
            </Link>
            .
          </p>
          <p className="mt-3 text-xs text-[#64748b]">
            Stand: {updated} · © {year} {business.name}
          </p>
        </header>

        <nav
          aria-label="Inhaltsverzeichnis Datenschutzerklärung"
          className="relative z-10 mb-10 rounded-2xl border border-[rgba(148,163,184,0.28)] bg-white/80 p-5 text-sm shadow-[0_14px_40px_rgba(15,23,42,0.06),0_4px_12px_rgba(15,23,42,0.04)] backdrop-blur-md"
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
            Inhalt
          </p>
          <ol className="mt-3 grid gap-1.5 text-[13px] leading-relaxed text-[#475569] sm:grid-cols-2">
            {[
              ["verantwortlicher", "Verantwortlicher"],
              ["geltungsbereich", "Geltungsbereich & Begriffe"],
              ["hosting", "Hosting & Bereitstellung"],
              ["logs", "Server-Logfiles"],
              ["ssl", "SSL-/TLS-Verschlüsselung"],
              ["speicher", "Lokale Speicherung im Browser"],
              ["anfrage", "Anfrage- und Suchauftragsformular"],
              ["termin", "Terminbuchung"],
              ["zahlung", "Zahlungsabwicklung via Stripe"],
              ["spracheingabe", "Spracheingabe (Web Speech API)"],
              ["cookies", "Cookies & Tracking"],
              ["empfaenger", "Empfänger & Auftragsverarbeiter"],
              ["drittland", "Datenübermittlung in Drittländer"],
              ["speicherdauer", "Speicherdauer"],
              ["rechte", "Betroffenenrechte"],
              ["beschwerde", "Beschwerderecht"],
              ["aenderungen", "Änderungen dieser Erklärung"],
            ].map(([id, label]) => (
              <li key={id} className="flex items-start gap-2">
                <span className="mt-1 size-1 shrink-0 rounded-full bg-[#cbd5e1]" aria-hidden />
                <Link
                  href={`#${id}`}
                  className="text-[#0f172a] transition hover:text-[#0a0a0a] hover:underline hover:decoration-[#0a0a0a] hover:underline-offset-2"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <article className="relative z-10 space-y-5">
          <PrivacySection
            id="verantwortlicher"
            n={1}
            title="Verantwortlicher i. S. d. DSGVO"
            icon={<Building2 className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Verantwortlicher für die Verarbeitung personenbezogener Daten auf dieser Website ist
              gemäß Art. 4 Nr. 7 DSGVO:
            </p>
            <address className="not-italic">
              <strong>{business.name}</strong>
              <br />
              Inhaber: {business.owner}
              <br />
              {business.street}
              <br />
              {business.postal} {business.city}, {business.country}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </address>
            <p>
              Aufgrund der Unternehmensgröße besteht keine Pflicht zur Bestellung eines
              betrieblichen Datenschutzbeauftragten (Art. 37 DSGVO, § 38 BDSG). Anfragen zum
              Datenschutz richten Sie bitte an die oben genannte Anschrift bzw. E-Mail.
            </p>
          </PrivacySection>

          <PrivacySection
            id="geltungsbereich"
            n={2}
            title="Geltungsbereich & Begriffe"
            icon={<ScrollText className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Diese Datenschutzerklärung gilt für die Domain{" "}
              <span className="font-mono text-[13px] text-[#0f172a]">ichsuchdeinauto.de</span> und
              alle darunter erreichbaren Unterseiten sowie für etwaige damit verbundene
              Kommunikationskanäle (z. B. E-Mail).
            </p>
            <p>
              Begriffe wie „personenbezogene Daten“, „Verarbeitung“, „Verantwortlicher“,
              „Auftragsverarbeiter“ und „Einwilligung“ verwenden wir im Sinne der Legaldefinitionen
              des Art. 4 DSGVO.
            </p>
          </PrivacySection>

          <PrivacySection
            id="hosting"
            n={3}
            title="Hosting & Bereitstellung der Website"
            icon={<Server className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Diese Website wird bei einem externen Hosting-Dienstleister bereitgestellt. Zur
              technischen Auslieferung der Inhalte werden personenbezogene Daten verarbeitet, die
              ein Browser üblicherweise übermittelt (siehe §&nbsp;4 „Server-Logfiles“). Der Einsatz
              eines Hosters erfolgt zur Erfüllung des Vertrags mit potenziellen und bestehenden
              Kunden (Art. 6 Abs. 1 lit. b DSGVO) sowie im Interesse einer sicheren, schnellen und
              effizienten Bereitstellung unseres Online-Angebots durch einen professionellen
              Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p>
              Mit dem Hosting-Dienstleister besteht ein Vertrag über Auftragsverarbeitung im Sinne
              des Art. 28 DSGVO. Eine Übermittlung in Drittländer findet nur statt, soweit dies in
              §&nbsp;13 dieser Erklärung dargestellt ist und auf Grundlage geeigneter Garantien
              (z.&nbsp;B. EU-Standardvertragsklauseln) erfolgt.
            </p>
          </PrivacySection>

          <PrivacySection
            id="logs"
            n={4}
            title="Server-Logfiles"
            icon={<HardDrive className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Beim Aufruf dieser Website werden durch den Browser automatisch Informationen
              übermittelt, die der Server in sogenannten Logfiles speichert. Erfasst werden
              insbesondere:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>anonymisierte / gekürzte IP-Adresse des anfragenden Geräts,</li>
              <li>Datum und Uhrzeit der Anfrage,</li>
              <li>angefragte URL und HTTP-Statuscode,</li>
              <li>übertragene Datenmenge,</li>
              <li>Referrer-URL (vorher besuchte Seite),</li>
              <li>verwendeter Browser inkl. Version und Betriebssystem.</li>
            </ul>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse besteht in
              der technischen Bereitstellung, IT-Sicherheit und Missbrauchsprävention. Die Daten
              werden nach maximal 14 Tagen automatisch gelöscht, sofern nicht im Einzelfall ein
              konkreter sicherheitsrelevanter Vorfall eine längere Speicherung erforderlich macht.
            </p>
          </PrivacySection>

          <PrivacySection
            id="ssl"
            n={5}
            title="SSL-/TLS-Verschlüsselung"
            icon={<Lock className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Aus Gründen der Sicherheit und zum Schutz vertraulicher Inhalte (z. B. Anfragen, die
              Sie an uns senden) verwendet diese Website eine SSL-/TLS-Verschlüsselung. Sie erkennen
              eine verschlüsselte Verbindung am „https://“ in der Adresszeile und am
              Schloss-Symbol Ihres Browsers.
            </p>
          </PrivacySection>

          <PrivacySection
            id="speicher"
            n={6}
            title="Lokale Speicherung im Browser (LocalStorage)"
            icon={<HardDrive className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Um den Buchungsprozess (Anfrage → Termin → Zahlung) komfortabel über mehrere Schritte
              hinweg zu ermöglichen, speichert die Website Eingaben (z.&nbsp;B. Ihre
              Fahrzeugbeschreibung, gewählter Termin, Kontaktdaten) ausschließlich lokal in Ihrem
              Browser (LocalStorage / Session Storage). Eine Übertragung dieser Daten an unseren
              Server erfolgt erst nach aktivem Absenden des jeweiligen Formulars.
            </p>
            <p>
              Diese Verarbeitung erfolgt zur Vertragsanbahnung bzw. zur Durchführung
              vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Sie können die lokal
              gespeicherten Daten jederzeit selbst löschen, indem Sie die Daten Ihrer Website
              („Site-Daten“) in den Browser-Einstellungen entfernen.
            </p>
          </PrivacySection>

          <PrivacySection
            id="anfrage"
            n={7}
            title="Anfrage- und Suchauftragsformular"
            icon={<FileText className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Wenn Sie uns über das Eingabefeld einen Suchauftrag (Wunschfahrzeug) übermitteln
              oder das anschließende Anfrageformular ausfüllen, verarbeiten wir die von Ihnen
              eingegebenen Daten — insbesondere Vor- und Nachname, E-Mail-Adresse, Telefonnummer,
              bevorzugte Rückrufzeit sowie Ihre Fahrzeugwünsche — zur Bearbeitung Ihrer Anfrage und
              für eventuelle Anschlussfragen.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
              Maßnahmen) und, soweit es sich nicht um eine direkte Vertragsanbahnung handelt,
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
            </p>
            <p>
              Die Eingabe der Daten ist freiwillig. Ohne die Pflichtangaben können wir Ihre Anfrage
              jedoch nicht bearbeiten.
            </p>
          </PrivacySection>

          <PrivacySection
            id="termin"
            n={8}
            title="Terminbuchung"
            icon={<UserCheck className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Im Buchungsprozess wählen Sie einen Beratungstag sowie eine Uhrzeit aus. Die hierzu
              erhobenen Daten (Datum, Slot, Bezugnahme auf Ihre Suchauftragsdaten) werden zur
              Vorbereitung und Durchführung des Beratungstermins verarbeitet.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden für die Dauer der
              Vertragsanbahnung bzw. -durchführung sowie zur Erfüllung gesetzlicher
              Aufbewahrungspflichten (insbesondere § 147 AO, § 257 HGB) gespeichert.
            </p>
          </PrivacySection>

          <PrivacySection
            id="zahlung"
            n={9}
            title="Zahlungsabwicklung über Stripe"
            icon={<CreditCard className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Die Bezahlung der Servicegebühr (17,90 €) erfolgt über den Zahlungsdienstleister{" "}
              <strong>Stripe Payments Europe, Ltd.</strong>, 1 Grand Canal Street Lower, Grand Canal
              Dock, Dublin, Irland („Stripe“). Stripe verarbeitet in eigener Verantwortung sämtliche
              für die Zahlung erforderlichen personenbezogenen Daten (z. B. Name, Karten- oder
              Kontodaten, Beträge, Transaktionskennungen, Geräte- und Browserinformationen, Zeit
              und Ort der Transaktion).
            </p>
            <p>
              Wir selbst erhalten von Stripe ausschließlich Status- und Referenzinformationen zur
              Zuordnung Ihrer Buchung (z.&nbsp;B. Checkout-Session-ID, Zahlungsstatus). Karten- bzw.
              Bankdaten werden zu keinem Zeitpunkt von uns gespeichert.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Für die Zahlungsabwicklung über Stripe
              ist die Übermittlung der erforderlichen Daten an Stripe unerlässlich. Weitere
              Informationen finden Sie in der Datenschutzerklärung von Stripe:{" "}
              <a
                href="https://stripe.com/de/privacy"
                target="_blank"
                rel="noreferrer noopener"
              >
                stripe.com/de/privacy
              </a>
              .
            </p>
            <p>
              Stripe kann Daten in die USA übermitteln. Die Datenübermittlung erfolgt unter
              Berücksichtigung des EU-US Data Privacy Framework und der EU-Standardvertragsklauseln
              gemäß Art. 46 Abs. 2 lit. c DSGVO als geeignete Garantien.
            </p>
          </PrivacySection>

          <PrivacySection
            id="spracheingabe"
            n={10}
            title="Spracheingabe (Web Speech API)"
            icon={<Mic className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Im Eingabefeld der Startseite besteht die Möglichkeit, Ihre Fahrzeugbeschreibung per
              Mikrofon zu diktieren. Diese Funktion nutzt die Web Speech API Ihres Browsers. Die
              Sprachverarbeitung erfolgt — abhängig von Ihrem Browser bzw. Betriebssystem — entweder
              lokal auf Ihrem Gerät oder über die jeweiligen Server des Anbieters (z. B. Google bei
              Chrome). Auf den Verarbeitungsweg und auf etwaige Datenübermittlungen Ihres Browsers
              haben wir keinen Einfluss.
            </p>
            <p>
              An unsere Server wird ausschließlich das Ergebnis (der erkannte Text) übermittelt, und
              auch nur dann, wenn Sie Ihre Anfrage anschließend bewusst absenden. Rechtsgrundlage
              für die Übermittlung des Ergebnisses an uns ist Art. 6 Abs. 1 lit. b DSGVO.
            </p>
            <p>
              Bitte beachten Sie die Datenschutzhinweise Ihres Browser-Herstellers für Details zur
              dortigen Sprachverarbeitung.
            </p>
          </PrivacySection>

          <PrivacySection
            id="cookies"
            n={11}
            title="Cookies & Tracking"
            icon={<Cookie className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Wir setzen <strong>keine</strong> Cookies oder Tracking-Technologien zu Werbe- oder
              Marketingzwecken ein. Soweit technisch zwingend erforderliche Cookies oder
              vergleichbare Technologien (z.&nbsp;B. LocalStorage zur Wahrung des Buchungsstatus,
              vgl. §&nbsp;6) verwendet werden, geschieht dies auf Grundlage des § 25 Abs. 2 Nr. 2
              TDDDG; eine Einwilligung ist nach geltendem Recht nicht erforderlich.
            </p>
            <p>
              Sollten künftig optionale Cookies/Analyse-Tools eingebunden werden, wird hierzu ein
              Consent-Banner eingerichtet und Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO i.
              V. m. § 25 Abs. 1 TDDDG eingeholt.
            </p>
          </PrivacySection>

          <PrivacySection
            id="empfaenger"
            n={12}
            title="Empfänger & Auftragsverarbeiter"
            icon={<ShieldCheck className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Personenbezogene Daten werden ausschließlich an die folgenden Kategorien von
              Empfängern weitergegeben, soweit dies zur Erfüllung der jeweiligen Zwecke erforderlich
              ist:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <strong>IT-Dienstleister / Hosting-Provider</strong> zur technischen Bereitstellung
                der Website (Art. 28 DSGVO).
              </li>
              <li>
                <strong>Stripe Payments Europe, Ltd.</strong> zur Zahlungsabwicklung (siehe
                §&nbsp;9).
              </li>
              <li>
                <strong>E-Mail-Dienstleister</strong> zur Kommunikation und zum Versand von
                Bestätigungs- oder Antwortmails.
              </li>
              <li>
                <strong>Behörden</strong>, soweit eine gesetzliche Verpflichtung zur Übermittlung
                besteht.
              </li>
            </ul>
            <p>
              Mit Auftragsverarbeitern bestehen entsprechende Verträge nach Art. 28 DSGVO. Eine
              Übermittlung an Dritte zu Werbezwecken findet nicht statt.
            </p>
          </PrivacySection>

          <PrivacySection
            id="drittland"
            n={13}
            title="Datenübermittlung in Drittländer"
            icon={<Globe2 className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Eine Übermittlung personenbezogener Daten in Staaten außerhalb des Europäischen
              Wirtschaftsraums (EWR) erfolgt nur insoweit, als dies in dieser Erklärung beschrieben
              ist (insbesondere im Rahmen von Stripe). In diesen Fällen stellen wir durch geeignete
              Garantien gemäß Art. 44 ff. DSGVO ein angemessenes Datenschutzniveau sicher.
            </p>
            <p>
              Garantien können insbesondere sein: Angemessenheitsbeschlüsse der EU-Kommission (Art.
              45 DSGVO), Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) oder eine
              Zertifizierung nach dem EU-US Data Privacy Framework.
            </p>
          </PrivacySection>

          <PrivacySection
            id="speicherdauer"
            n={14}
            title="Speicherdauer"
            icon={<RefreshCcw className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke
              erforderlich ist bzw. wie es gesetzliche Aufbewahrungsfristen vorsehen
              (insbesondere § 257 HGB, § 147 AO — i.&nbsp;d.&nbsp;R. 6 bzw. 10 Jahre für
              steuer-/handelsrechtlich relevante Unterlagen).
            </p>
            <p>
              Anfragen, die nicht zu einem Vertragsabschluss führen, werden spätestens 12 Monate
              nach letztem Kontakt gelöscht, sofern keine sonstigen Rechtsgrundlagen für eine
              längere Speicherung bestehen.
            </p>
          </PrivacySection>

          <PrivacySection
            id="rechte"
            n={15}
            title="Ihre Rechte als betroffene Person"
            icon={<Eye className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>Sofern wir personenbezogene Daten von Ihnen verarbeiten, haben Sie folgende Rechte:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO);</li>
              <li>Berichtigung unrichtiger oder unvollständiger Daten (Art. 16 DSGVO);</li>
              <li>
                Löschung der zu Ihrer Person gespeicherten Daten, soweit die Verarbeitung nicht zur
                Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung einer
                rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur
                Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist
                (Art. 17 DSGVO);
              </li>
              <li>
                Einschränkung der Verarbeitung (Art. 18 DSGVO), insbesondere wenn Sie die Richtigkeit
                der Daten bestreiten oder Widerspruch eingelegt haben;
              </li>
              <li>
                Datenübertragbarkeit, d. h. Erhalt der durch Sie bereitgestellten Daten in einem
                strukturierten, gängigen und maschinenlesbaren Format (Art. 20 DSGVO);
              </li>
              <li>
                Widerspruch gegen die Verarbeitung, soweit diese auf Art. 6 Abs. 1 lit. e oder f
                DSGVO beruht (Art. 21 DSGVO);
              </li>
              <li>
                Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3
                DSGVO).
              </li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an{" "}
              <a href={`mailto:${business.email}`}>{business.email}</a>. Eine identitätsprüfende
              Rückfrage behalten wir uns vor.
            </p>
          </PrivacySection>

          <PrivacySection
            id="beschwerde"
            n={16}
            title="Beschwerderecht bei der Aufsichtsbehörde"
            icon={<Mail className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Sie haben gemäß Art. 77 DSGVO das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer
              personenbezogenen Daten gegen die DSGVO verstößt. Die für uns örtlich zuständige
              Aufsichtsbehörde ist:
            </p>
            <address className="not-italic">
              <strong>{supervisoryAuthority.name}</strong>
              <br />
              {supervisoryAuthority.street}
              <br />
              {supervisoryAuthority.postal} {supervisoryAuthority.city}
              <br />
              Telefon: {supervisoryAuthority.phone}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${supervisoryAuthority.email}`}>{supervisoryAuthority.email}</a>
              <br />
              Web:{" "}
              <a href={supervisoryAuthority.url} target="_blank" rel="noreferrer noopener">
                {supervisoryAuthority.url}
              </a>
            </address>
          </PrivacySection>

          <PrivacySection
            id="aenderungen"
            n={17}
            title="Änderungen dieser Datenschutzerklärung"
            icon={<RefreshCcw className="size-4" strokeWidth={1.75} aria-hidden />}
          >
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie
              stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer
              Leistungen umzusetzen (z.&nbsp;B. Einführung neuer Dienste). Für Ihren erneuten Besuch
              gilt dann die neue Datenschutzerklärung.
            </p>
            <p>
              Die jeweils aktuelle Fassung kann jederzeit unter{" "}
              <Link href="/datenschutz">/datenschutz</Link> abgerufen werden.
            </p>
          </PrivacySection>
        </article>

        <footer className="relative z-10 mt-12 rounded-2xl border border-[rgba(148,163,184,0.28)] bg-white/90 p-6 text-center text-xs leading-relaxed text-[#64748b] shadow-[0_14px_40px_rgba(15,23,42,0.06),0_4px_12px_rgba(15,23,42,0.04)] sm:text-[13px]">
          <p>
            Diese Datenschutzerklärung wurde mit größter Sorgfalt erstellt und auf die DSGVO sowie
            das BDSG abgestimmt. Sie ersetzt keine individuelle Rechtsberatung; bei rechtlichen
            Fragen wenden Sie sich bitte an eine fachkundige Person.
          </p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[#475569]">
            <Link
              href="/impressum"
              className="font-medium text-[#0a0a0a] underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 transition hover:decoration-[#0a0a0a]"
            >
              Impressum
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/kontakt"
              className="font-medium text-[#0a0a0a] underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 transition hover:decoration-[#0a0a0a]"
            >
              Kontakt
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/"
              className="font-medium text-[#0a0a0a] underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 transition hover:decoration-[#0a0a0a]"
            >
              Zur Startseite
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}
