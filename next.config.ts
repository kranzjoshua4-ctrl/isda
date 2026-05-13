import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Kein x-powered-by Header */
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/anfrage", destination: "/termin", permanent: true }];
  },
  /**
   * Eck-Indikator der Next-Dev-Tools ausblenden (`process.env.__NEXT_DEV_INDICATOR` → false).
   *
   * Hinweis: Das Custom Element `<nextjs-portal>` kann trotzdem im DOM bleiben — Next.js
   * nutzt es u. a. für das **Fehler-Overlay** im Shadow DOM (siehe u. a. GH Discussion #76734).
   * Vollständig entfernen geht nur mit Framework-Änderung. In **Production** (`next build` /
   * `next start`) existiert das Portal nicht.
   *
   * Zusätzlich: minimale Styles in `globals.css`, damit der Host weniger stört.
   */
  devIndicators: false,
};

export default nextConfig;
