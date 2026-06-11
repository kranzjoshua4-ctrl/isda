"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Search } from "lucide-react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a9a9a]">
          Kontakt
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
          Wir sind für dich da.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#6b6b6b]">
          Für organisatorische Fragen erreichst du uns per E-Mail. Fahrzeuganfragen
          erfolgen ausschließlich über die Suchanfrage auf der Startseite.
        </p>
      </motion.header>

      <div className="mt-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="rounded-sm border border-border bg-white p-6 shadow-[0_10px_30px_rgb(17_17_17/0.05)] sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-premium/10 text-premium"
              aria-hidden
            >
              <Mail className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
                E-Mail
              </p>
              <a
                href="mailto:kontakt@ichsuchdeinauto.de"
                className="mt-1.5 block text-base font-semibold text-[#111111] underline decoration-[#111111]/15 underline-offset-4 transition hover:decoration-premium sm:text-lg"
              >
                kontakt@ichsuchdeinauto.de
              </a>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                Wir melden uns in der Regel innerhalb eines Werktags bei dir.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
          className="rounded-sm border border-border bg-[#fafafa] p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-premium/10 text-premium"
              aria-hidden
            >
              <Search className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
                Du suchst ein Auto?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6b6b6b]">
                Starte bitte mit der Eingabe auf der Startseite. So bleibt der
                Kontext erhalten — für dich und für uns.
              </p>
              <Link
                href="/#eingabe"
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-cta-navy px-6 text-sm font-semibold text-white shadow-cta transition hover:bg-cta-navy-hover"
              >
                Suchauftrag starten
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
