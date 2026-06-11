import Link from "next/link";

const footerLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/partner", label: "Partner werden" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-border bg-transparent pt-8 sm:mt-24">
      <div className="page-container flex flex-col gap-8 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold tracking-tight text-foreground">
            ichsuchdeinauto<span className="text-premium">.de</span>
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Moderne Gebrauchtwagen-Suche mit persönlichem Rückruf — digital organisiert.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted-foreground transition duration-200 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-[#111111]/[0.06] py-5 text-center text-xs text-[#9a9a9a]">
        © {new Date().getFullYear()} ichsuchdeinauto.de
      </div>
    </footer>
  );
}
