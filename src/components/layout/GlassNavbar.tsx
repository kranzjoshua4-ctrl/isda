"use client";

import { handleMainNavClick } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";
import { Car } from "lucide-react";
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
  const [elevated, setElevated] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");

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
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out",
        elevated
          ? "border-[#111111]/[0.07] bg-white/85 shadow-[0_4px_24px_-8px_rgba(17,17,17,0.08)] backdrop-blur-xl"
          : "border-transparent bg-white/70 backdrop-blur-md",
      )}
    >
      <motion.div className="relative mx-auto flex min-h-[4.25rem] w-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          scroll={false}
          onClick={(e) => onNavClick(e, "/")}
          className="group relative z-10 flex shrink-0 items-center gap-2 leading-none"
          aria-label="ichsuchdeinauto.de — Startseite"
        >
          <span className="flex size-8 items-center justify-center rounded-none border border-[#111111]/[0.08] bg-[#f8f8f7] text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] transition duration-200 group-hover:border-premium/30 group-hover:shadow-[0_4px_12px_-4px_rgba(201,162,39,0.2)]">
            <Car className="size-4" strokeWidth={1.75} />
          </span>
          <span className="flex items-baseline gap-0.5">
            <span className="font-display text-sm font-semibold tracking-tight text-[#111111] sm:text-[0.95rem]">
              ichsuchdeinauto
            </span>
            <span className="text-xs font-semibold text-premium">.de</span>
          </span>
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="absolute left-1/2 top-1/2 hidden min-w-0 -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <ul className="flex items-stretch gap-8 lg:gap-10">
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
                      "relative pb-0.5 text-[13px] font-medium tracking-tight transition-colors duration-200",
                      active
                        ? "text-[#111111] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-none after:bg-premium"
                        : "text-[#6b6b6b] hover:text-[#111111]",
                    )}
                  >
                    {l.label}
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
            "relative z-10 ml-auto inline-flex h-9 shrink-0 items-center justify-center rounded-none border px-3.5 text-[12px] font-semibold tracking-tight transition duration-200 sm:h-10 sm:px-4 sm:text-[13px]",
            pathname === "/partner/portal"
              ? "border-premium/35 bg-[#111111] text-white shadow-[0_4px_14px_rgba(17,17,17,0.14)] hover:bg-[#1a1a1a]"
              : "border-[#111111]/10 bg-white/90 text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] hover:border-premium/30 hover:bg-white",
          )}
        >
          Partner Portal
        </Link>
      </motion.div>
    </motion.header>
  );
}
