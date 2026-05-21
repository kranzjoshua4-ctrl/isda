"use client";

import { BookingProgressNav } from "@/components/booking/BookingProgressNav";
import { HeroInput } from "@/components/concierge/HeroInput";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { AnimatePresence, motion } from "framer-motion";
import { CarFront, ClipboardCheck, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { scrollToSection } from "@/lib/scroll-to-section";
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
      <span className="col-start-1 row-start-1 flex items-baseline justify-center lg:justify-start">
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
              <span className="text-premium">{active.emphasized}</span>
              {active.suffix}
            </span>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute bottom-[0.04em] left-0 z-0 h-[0.11em] min-h-[2.5px] w-full max-w-full origin-left rounded-none bg-premium/55"
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
  useEffect(() => {
    const scrollIfNeeded = () => {
      if (window.location.hash !== "#so-gehts") return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSection("so-gehts", { updateHash: false });
        });
      });
    };
    scrollIfNeeded();
    window.addEventListener("hashchange", scrollIfNeeded);
    return () => window.removeEventListener("hashchange", scrollIfNeeded);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
      <section className="relative flex min-h-[calc(100dvh-4.75rem)] flex-col justify-center py-8 sm:py-12 lg:py-14">
        <motion.div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="max-w-full px-1 sm:px-0 lg:max-w-2xl">
              <h1 className="font-display inline-block min-w-0 max-w-full overflow-x-auto text-nowrap text-[clamp(1.35rem,5.2vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#111111] [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-visible [&::-webkit-scrollbar]:hidden">
                <RotatingHeadline />
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-[#6b6b6b] sm:mt-8 sm:text-lg lg:mx-0"
            >
              Digitale Plattform für echte Fahrzeugsuche — du beschreibst, ich melde mich persönlich.{" "}
              <span className="font-medium text-[#111111]">
                Schnell. Seriös. <span className="font-bold">Serkan Tekten.</span>
              </span>
            </motion.p>

            <BookingProgressNav active={1} className="lg:justify-start" />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 w-full max-w-2xl lg:mt-9"
            >
              <HeroInput />
            </motion.div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-end">
            <HeroVisual />
          </div>
        </motion.div>
      </section>

      <section
        id="so-gehts"
        className="scroll-mt-[5.5rem] border-t border-[#111111]/[0.06] bg-[#f8f8f7]/50 py-24"
      >
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
                className="group flex gap-5 rounded-none border border-[#111111]/[0.06] bg-white p-6 text-left shadow-premium-sm transition duration-300 hover:-translate-y-0.5 hover:border-premium/25 hover:shadow-premium sm:gap-6 sm:p-7"
              >
                <div
                  className="relative flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-none border border-[#111111]/[0.06] bg-[#f8f8f7] text-[#111111] shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] transition duration-300 group-hover:border-premium/20 group-hover:text-premium sm:h-16 sm:w-16"
                  aria-hidden
                >
                  <div className="absolute inset-px rounded-none bg-gradient-to-br from-premium/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
            className="font-medium text-[#111111] underline decoration-[#eaeaea] underline-offset-[5px] transition hover:decoration-premium/60"
          >
            Suchauftrag starten
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
