"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Scrollt nach Routenwechsel nach oben (außer Startseite mit Hash-Anker). */
export function NavScrollRestoration() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) {
      return;
    }
    previousPath.current = pathname;

    const hash = window.location.hash;
    if (pathname === "/" && hash) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
