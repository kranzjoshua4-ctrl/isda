import Link from "next/link";

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">Kontakt</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Für organisatorische Fragen erreichst du uns hier.{" "}
        <span className="text-foreground/90">
          Fahrzeuganfragen erfolgen ausschließlich über die Suchanfrage auf der Startseite.
        </span>
      </p>
      <div className="mt-10 rounded-xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground shadow-premium-sm">
        <p>
          E-Mail:{" "}
          <a className="text-foreground underline decoration-foreground/20 underline-offset-4" href="mailto:kontakt@ichsuchdeinauto.de">
            kontakt@ichsuchdeinauto.de
          </a>
        </p>
        <p className="mt-4">
          Wenn du ein Auto suchst, starte bitte mit der Eingabe auf der{" "}
          <Link href="/#eingabe" className="text-foreground underline decoration-foreground/20 underline-offset-4">
            Startseite
          </Link>
          . So bleibt der Kontext erhalten — für dich und für uns.
        </p>
      </div>
    </div>
  );
}
