"use client";

import { handleMainNavClick } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";
import { Car, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const links = [
  { href: "/", label: "Start" },
  { href: "/#so-gehts", label: "So funktioniert’s" },
  { href: "/partner", label: "Partner werden" },
  { href: "/kontakt", label: "Kontakt" },
];

function syncHash(setHash: (hash: string) => void) {
  setHash(typeof window !== "undefined" ? window.location.hash : "");
}

export function GlassNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    syncHash(setHash);
  }, []);

  useEffect(() => {
    syncHash(setHash);
    const onHashChange = () => syncHash(setHash);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const matchPageBackground = pathname === "/partner";
  const alignPortalWithSearch = pathname === "/";

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (handleMainNavClick(e, href, { pathname, setHash })) {
      return;
    }
    const url = new URL(href, "http://localhost");
    const target = `${url.pathname}${url.search}${url.hash}`;
    e.preventDefault();
    router.push(target, { scroll: false });
  };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          matchPageBackground ? "nav-bar-page-bg--partner" : "nav-bar-scroll-bg",
          matchPageBackground && scrolled && "nav-bar-scroll-bg--scrolled",
        )}
        initial={false}
        animate={{
          opacity: matchPageBackground || scrolled ? 1 : 0,
          y: matchPageBackground || scrolled ? 0 : -6,
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        className={cn(
          "page-container relative z-10 flex min-h-[3.75rem] items-center py-3 sm:min-h-[4rem]",
          alignPortalWithSearch && "nav-bar__inner--home-align",
        )}
      >
        <Link
          href="/"
          scroll={false}
          onClick={(e) => onNavClick(e, "/")}
          className="nav-bar__brand group flex shrink-0 items-center gap-2 leading-none"
          aria-label="ichsuchdeinauto.de — Startseite"
        >
          <span className="flex size-8 items-center justify-center rounded-md border border-border bg-[#fafafa] text-[#111111] transition group-hover:border-premium/30">
            <Car className="size-4" strokeWidth={1.75} />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-[#111111] sm:text-[0.95rem]">
            ichsuchdeinauto<span className="text-premium">.de</span>
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {links.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/" && hash !== "#so-gehts"
                  : l.href === "/#so-gehts"
                    ? pathname === "/" && hash === "#so-gehts"
                    : pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    scroll={false}
                    onClick={(e) => onNavClick(e, l.href)}
                    className={cn(
                      "relative pb-1 text-[14px] font-medium tracking-tight transition-colors lg:text-[15px]",
                      active ? "text-[#111111]" : "text-[#6b6b6b] hover:text-[#111111]",
                    )}
                  >
                    {l.label}
                    {active ? (
                      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-premium" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/partner/portal"
          scroll={false}
          onClick={(e) => onNavClick(e, "/partner/portal")}
          className={cn(
            "nav-bar__portal ml-auto inline-flex h-10 shrink-0 items-center gap-2 rounded-sm border-0 bg-cta-navy px-4 text-[12px] font-bold text-white shadow-cta transition duration-200 hover:bg-cta-navy-hover sm:px-5 sm:text-[13px]",
            pathname === "/partner/portal" && "ring-2 ring-white/30",
          )}
        >
          <UserRound className="size-3.5 text-white/90" strokeWidth={1.75} />
          Partner Portal
        </Link>
      </div>
    </motion.header>
  );
}
