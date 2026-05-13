"use client";

import { BookingProgressNav } from "@/components/booking/BookingProgressNav";
import { HeroInput } from "@/components/concierge/HeroInput";
import { AnimatePresence, motion } from "framer-motion";
import { CarFront, ClipboardCheck, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type RotatingPhrase = {
  prefix: string;
  emphasized: string;
  suffix: string;
};

const ROTATING_PHRASES: RotatingPhrase[] = [
  { prefix: "Ich suche dein Auto. ", emphasized: "Unkompliziert", suffix: "." },
  { prefix: "Dein ", emphasized: "Wunschauto", suffix: ". Ohne Stress." },
  { prefix: "", emphasized: "Echte Suche", suffix: " statt Massenplattform." },
];

function phraseText(p: RotatingPhrase) {
  return `${p.prefix}${p.emphasized}${p.suffix}`;
}

function RotatingHeadline() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(
      () => setIdx((i) => (i + 1) % ROTATING_PHRASES.length),
      10400,
    );
    return () => window.clearInterval(interval);
  }, []);

  const active = ROTATING_PHRASES[idx];

  return (
    <span className="relative inline-grid align-baseline [perspective:900px]">
      {ROTATING_PHRASES.map((p) => (
        <span
          key={`sizer-${phraseText(p)}`}
          aria-hidden
          className="invisible pointer-events-none col-start-1 row-start-1 whitespace-nowrap select-none"
        >
          {phraseText(p)}
        </span>
      ))}
      <span className="col-start-1 row-start-1 flex items-baseline justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 26, rotateX: -85, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -26, rotateX: 85, filter: "blur(7px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-block origin-[50%_50%_-22px] whitespace-nowrap will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden]"
          >
            <span className="relative z-[1]">
              {active.prefix}
              <span className="text-black">{active.emphasized}</span>
              {active.suffix}
            </span>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute bottom-[0.04em] left-0 z-0 h-[0.11em] min-h-[2.5px] w-full max-w-full origin-left rounded-full bg-[#0f172a]/45"
              initial={{ scaleX: 0, opacity: 0.85 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              transition={{
                scaleX: { delay: 0.7, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                opacity: { delay: 0.7, duration: 0.3 },
              }}
            />
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

const steps: {
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Du beschreibst",
    body: "Marke, Budget, Ausstattung — wie du es von Autoscout gewohnt bist, nur ohne Tab-Chaos.",
    icon: CarFront,
  },
  {
    title: "Wir prüfen manuell",
    body: "Echte Menschen lesen deine Anfrage und ordnen sie sinnvoll ein.",
    icon: ClipboardCheck,
  },
  {
    title: "Rückruf & Fokus",
    body: "Telefontermin statt Spam-Mails. Klarheit vor Schnelligkeit.",
    icon: Phone,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16">
      <section className="flex min-h-[calc(100dvh-4.75rem)] flex-col items-center justify-center py-6 text-center sm:py-10">
        <div className="max-w-full px-1 sm:px-0">
          <h1 className="font-display inline-block min-w-0 max-w-full overflow-x-auto text-nowrap text-[clamp(1.05rem,4.25vw,3.05rem)] font-bold leading-tight tracking-[-0.03em] text-[#0f172a] [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            <RotatingHeadline />
          </h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg"
        >
          Digitale Plattform für echte Fahrzeugsuche — du beschreibst, ich melde mich persönlich.{" "}
          <span className="font-medium text-foreground">
            Schnell. Seriös. <span className="font-bold">Serkan Tekten.</span>
          </span>
        </motion.p>

        <BookingProgressNav active={1} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 w-full"
        >
          <HeroInput />
        </motion.div>
      </section>

      <section id="so-gehts" className="scroll-mt-24 border-t border-border py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            So funktioniert’s
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Kein Marktplatz. Ein klarer Prozess.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Für alle, die Autos mögen — aber keine Zeit für endloses Scrollen haben.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group flex gap-5 rounded-2xl border border-[rgba(31,78,121,0.12)] bg-card p-6 text-left shadow-[0_1px_0_rgb(255_255_255/0.75)_inset,0_1px_2px_rgb(15_23_42/0.04),0_18px_48px_-32px_rgb(15_23_42/0.08)] transition duration-300 hover:border-[rgba(31,78,121,0.2)] hover:shadow-[0_1px_0_rgb(255_255_255/0.82)_inset,0_14px_44px_-28px_rgb(15_23_42/0.12)] sm:gap-6 sm:p-7"
              >
                <div
                  className="relative flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-2xl border border-[rgba(148,163,184,0.4)] bg-gradient-to-b from-white to-[#eef3f8] text-tech shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(15_23_42/0.04)] sm:h-16 sm:w-16"
                  aria-hidden
                >
                  <div className="absolute inset-px rounded-[0.9rem] bg-gradient-to-br from-tech/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Icon className="relative size-[1.6rem] sm:size-7" strokeWidth={1.35} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-mono text-[11px] font-medium tabular-nums tracking-wide text-zinc-400">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                    {s.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          Bereit für den nächsten Schritt?{" "}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-medium text-foreground underline decoration-zinc-300 underline-offset-[5px] transition hover:decoration-tech/50"
          >
            Suchauftrag starten
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
