import Link from "next/link";

const footerLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/partner", label: "Partner werden" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-[#111111]/[0.06] bg-[#f8f8f7]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div>
          <p className="font-display text-base font-semibold tracking-tight text-[#111111]">
            ichsuchdeinauto<span className="text-premium">.de</span>
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6b6b6b]">
            Moderne Gebrauchtwagen-Suche mit persönlichem Rückruf — digital organisiert.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#6b6b6b] transition duration-200 hover:text-[#111111]"
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
