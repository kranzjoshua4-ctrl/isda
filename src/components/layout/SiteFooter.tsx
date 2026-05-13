import Link from "next/link";

const footerLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/partner", label: "Partner werden" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[rgb(255_255_255/0.08)] bg-[#1d232a] text-[rgb(226_232_240/0.72)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold tracking-tight text-[#f8fafc]">
            ichsuchdeinauto<span className="text-tech-accent">.de</span>
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[rgb(148_163_184/0.95)]">
            Moderne Gebrauchtwagen-Suche mit persönlichem Rückruf — digital organisiert.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[rgb(148_163_184/0.95)] transition hover:text-[#f8fafc]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-[rgb(255_255_255/0.06)] py-5 text-center text-xs text-[rgb(148_163_184/0.65)]">
        © {new Date().getFullYear()} ichsuchdeinauto.de
      </div>
    </footer>
  );
}
