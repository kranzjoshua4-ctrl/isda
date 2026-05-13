"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Start" },
  { href: "/#so-gehts", label: "So funktioniert’s" },
  { href: "/partner", label: "Partner werden" },
  { href: "/kontakt", label: "Kontakt" },
];

export function GlassNavbar() {
  const [elevated, setElevated] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useLayoutEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
  }, []);

  useEffect(() => {
    const sync = () => {
      setHash(typeof window !== "undefined" ? window.location.hash : "");
    };
    sync();
    const t = window.setTimeout(sync, 0);
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-cta-navy text-[#f1f5f9]",
        "shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-[box-shadow] duration-300",
        elevated && "shadow-[0_10px_28px_rgba(15,23,42,0.16)]",
      )}
    >
      <div className="relative mx-auto flex min-h-[4.25rem] w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group relative z-10 flex shrink-0 items-baseline gap-0.5 leading-none"
          aria-label="ichsuchdeinauto.de — Startseite"
        >
          <span className="font-display text-sm font-semibold tracking-tight text-[#f8fafc] sm:text-[0.95rem]">
            ichsuchdeinauto
          </span>
          <span className="text-xs font-semibold text-tech-accent">.de</span>
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
                    onClick={(e) => {
                      if (l.href === "/" && pathname === "/") {
                        e.preventDefault();
                        if (window.location.hash) {
                          history.replaceState(null, "", "/");
                        }
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      const sync = () =>
                        setHash(typeof window !== "undefined" ? window.location.hash : "");
                      queueMicrotask(sync);
                      window.setTimeout(sync, 0);
                    }}
                    className={cn(
                      "border-b-2 border-b-transparent pb-0.5 text-[13px] font-medium tracking-tight transition-colors duration-200",
                      active
                        ? "border-b-white text-white"
                        : "text-[rgb(226_232_240/0.72)] hover:border-b-white/25 hover:text-[#f8fafc]",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </motion.header>
  );
}
