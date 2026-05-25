"use client";

import { BookingProgressNav } from "@/components/booking/BookingProgressNav";
import { HeroInput } from "@/components/concierge/HeroInput";
import { HeroFeaturesAside } from "@/components/hero/HeroFeaturesAside";
import { AppStoreButtons } from "@/components/hero/AppStoreButtons";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { AnimatePresence, motion } from "framer-motion";
import { CarFront, ClipboardCheck, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useEffect, useState } from "react";

type HeadlineLine =
  | string
  | { before?: string; gold: string; after?: string };

type RotatingPhrase = {
  line1: HeadlineLine;
  line2: HeadlineLine;
};

const ROTATING_PHRASES: RotatingPhrase[] = [
  { line1: { before: "Ich suche dein ", gold: "Auto." }, line2: { gold: "Unkompliziert", after: "." } },
  { line1: "Dein Wunschauto.", line2: { gold: "Ohne Stress", after: "." } },
  { line1: { gold: "Echte Suche", after: " statt" }, line2: "Massenplattform." },
];

function phraseKey(p: RotatingPhrase) {
  const fmt = (line: HeadlineLine) =>
    typeof line === "string" ? line : `${line.before ?? ""}${line.gold}${line.after ?? ""}`;
  return `${fmt(p.line1)}|${fmt(p.line2)}`;
}

function HeadlineLineContent({
  line,
  underline,
}: {
  line: HeadlineLine;
  underline?: boolean;
}) {
  if (typeof line === "string") {
    return <>{line}</>;
  }

  return (
    <>
      {line.before}
      <span className="relative inline-block">
        <span className="relative z-[1] text-premium">{line.gold}</span>
        {underline ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute bottom-[0.06em] left-0 z-0 h-[0.09em] min-h-[2px] w-full max-w-full origin-left rounded-full bg-[rgb(232_90_40/0.38)]"
            initial={{ scaleX: 0, opacity: 0.85 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
            transition={{
              scaleX: { delay: 0.7, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              opacity: { delay: 0.7, duration: 0.3 },
            }}
          />
        ) : null}
      </span>
      {line.after}
    </>
  );
}

function PhraseBlock({ phrase, underline }: { phrase: RotatingPhrase; underline?: boolean }) {
  const goldOnLine1 = typeof phrase.line1 !== "string";
  const goldOnLine2 = typeof phrase.line2 !== "string";

  return (
    <span className="hero-headline-lines block">
      <span className="hero-headline-line block">
        <HeadlineLineContent line={phrase.line1} underline={underline && goldOnLine1} />
      </span>
      <span className="hero-headline-line block">
        <HeadlineLineContent line={phrase.line2} underline={underline && goldOnLine2} />
      </span>
    </span>
  );
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
    <span className="hero-headline-rotator relative inline-block [perspective:900px]">
      {ROTATING_PHRASES.map((p) => (
        <span
          key={`sizer-${phraseKey(p)}`}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 select-none"
        >
          <PhraseBlock phrase={p} />
        </span>
      ))}
      <span className="relative block min-[1100px]:text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 26, rotateX: -85, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -26, rotateX: 85, filter: "blur(7px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative block origin-[50%_50%_-22px] will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden]"
          >
            <PhraseBlock phrase={active} underline />
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
    <div className="page-container pb-16">
      <section className="hero-section">
        <div className="hero-section__grid">
          <div className="hero-section__copy">
            <h1 className="hero-section__headline font-display max-w-full text-[clamp(1.75rem,3.8vw,3.625rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#111111]">
              <RotatingHeadline />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 max-w-[520px] text-pretty text-[clamp(1rem,2.2vw,1.375rem)] leading-[1.6] text-black/[0.65] min-[1100px]:mx-0"
            >
              Fahrzeugsuche wie beim Makler — du beschreibst, wir melden uns persönlich.
            </motion.p>
            <AppStoreButtons />
            <BookingProgressNav
              active={1}
              className="!mt-8 !max-w-none justify-center gap-3.5 min-[1100px]:justify-start"
            />
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Auswahl + Suche (Desktop: zwei Boxen nebeneinander) */}
      <section className="hero-section hero-section--search">
        <HeroInput embedded />
      </section>

      <section className="mt-6" aria-label="Vorteile">
        <HeroFeaturesAside />
      </section>

      <section
        id="so-gehts"
        className="scroll-mt-[5.5rem] surface-card mt-10 p-8 sm:p-10 lg:mt-12 lg:p-12"
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
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group flex gap-5 rounded-2xl border border-border bg-[#fafafa] p-6 text-left transition duration-300 hover:-translate-y-0.5 hover:border-premium/25 hover:bg-white hover:shadow-premium-sm sm:gap-6 sm:p-7"
              >
                <div
                  className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-white text-[#111111] shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] transition duration-300 group-hover:border-premium/25 group-hover:text-premium"
                  aria-hidden
                >
                  <Icon className="relative size-6" strokeWidth={1.35} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-mono text-[11px] font-medium tabular-nums tracking-wide text-[#9a9a9a]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
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
