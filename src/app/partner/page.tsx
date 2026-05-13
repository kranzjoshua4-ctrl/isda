"use client";

import { PartnerForm } from "@/components/partner/PartnerForm";
import { motion } from "framer-motion";

export default function PartnerPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-tech">
          Händlernetzwerk
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-tight tracking-tight">
          Partner für moderne Gebrauchtwagen-Sourcing-Anfragen.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Digitale Anfragen mit Kontext — statt anonymer Lead-Flut aus dem Portal.
        </p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
        {[
          {
            t: "Händlernetzwerk",
            b: "Gebündelte Reichweite mit klarer Qualitätslinse.",
          },
          { t: "Qualität statt Masse", b: "Weniger Noise, mehr Absicht pro Kontakt." },
          { t: "Gezielte Anfragen", b: "Kunden, die schon wissen, was sie wollen." },
          { t: "Persönliche Vermittlung", b: "Telefonischer Fit-Check vor dem Connect." },
          { t: "Starke Kundschaft", b: "Digital natives mit Budget & Timeline." },
        ].map((c, i) => (
          <motion.article
            key={c.t}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.04 * i }}
            className="rounded-xl border border-border bg-card p-6 shadow-premium-sm transition hover:border-tech/35"
          >
            <h2 className="font-display text-lg font-bold tracking-tight">{c.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
          </motion.article>
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mx-auto mt-16 max-w-3xl rounded-xl border border-border bg-card p-6 shadow-tech sm:p-8"
      >
        <h2 className="font-display text-2xl font-bold tracking-tight">Kurz vorstellen</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Wir lesen jede Nachricht — kein Vertriebs-Bot.
        </p>
        <PartnerForm className="mt-6" />
      </motion.section>
    </div>
  );
}
