/** Höhe der fixen Navbar — muss mit SiteShell pt-[4.25rem] übereinstimmen */
const HEADER_OFFSET_PX = 72;
const EXTRA_GAP_PX = 16;

export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, left: 0, behavior });
}

type MainNavClickOptions = {
  pathname: string;
  setHash?: (hash: string) => void;
  behavior?: ScrollBehavior;
};

/** Nav-Klick: gleiche Seite → Anfang (oder Sektion); andere Seite → Link/Router übernehmen. */
export function handleMainNavClick(
  e: { preventDefault: () => void },
  href: string,
  { pathname, setHash, behavior = "smooth" }: MainNavClickOptions,
): boolean {
  const url = new URL(href, "http://localhost");
  const targetPath = url.pathname || "/";
  const sectionId = url.hash ? url.hash.slice(1) : "";

  if (targetPath === "/" && sectionId === "so-gehts") {
    if (pathname === "/") {
      e.preventDefault();
      scrollToSection("so-gehts", { behavior, updateHash: true });
      setHash?.("#so-gehts");
      return true;
    }
    return false;
  }

  if (targetPath === pathname) {
    e.preventDefault();
    if (sectionId) {
      history.replaceState(null, "", `${targetPath}#${sectionId}`);
      scrollToSection(sectionId, { behavior, updateHash: false });
      setHash?.(`#${sectionId}`);
    } else {
      history.replaceState(null, "", targetPath);
      scrollToTop(behavior);
      setHash?.("");
    }
    return true;
  }

  return false;
}

export function scrollToSection(
  id: string,
  options?: { behavior?: ScrollBehavior; updateHash?: boolean },
) {
  if (typeof window === "undefined") return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const behavior = options?.behavior ?? "smooth";
  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    HEADER_OFFSET_PX -
    EXTRA_GAP_PX;

  window.scrollTo({ top: Math.max(0, top), behavior });

  if (options?.updateHash !== false) {
    const hash = `#${id}`;
    if (window.location.hash !== hash) {
      history.pushState(null, "", `${window.location.pathname}${hash}`);
    }
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return true;
}
