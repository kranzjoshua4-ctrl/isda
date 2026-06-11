"use client";

import { BookingProgressNav } from "@/components/booking/BookingProgressNav";
import { HeroInput } from "@/components/concierge/HeroInput";
import { HeroFeaturesAside } from "@/components/hero/HeroFeaturesAside";
import { AppStoreButtons } from "@/components/hero/AppStoreButtons";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CarFront, ClipboardCheck, Phone, type LucideIcon } from "lucide-react";
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
  { line1: { before: "Ich suche dein ", gold: "Auto." }, line2: { gold: "Unkompliziert." } },
  { line1: "Dein Wunschauto.", line2: { gold: "Ohne Stress." } },
  { line1: { gold: "Echte Suche", after: " statt" }, line2: "Massenplattform." },
];

function phraseKey(p: RotatingPhrase) {
  const fmt = (line: HeadlineLine) =>
    typeof line === "string" ? line : `${line.before ?? ""}${line.gold}${line.after ?? ""}`;
  return `${fmt(p.line1)}|${fmt(p.line2)}`;
}

function HeadlineLineContent({
  line,
  shine,
}: {
  line: HeadlineLine;
  shine?: boolean;
}) {
  if (typeof line === "string") {
    return <>{line}</>;
  }

  return (
    <>
      {line.before}
      <span className="relative inline-block">
        {shine ? (
          <>
            {/* Basis: startet dunkel, … */}
            <span className="relative z-[1]">{line.gold}</span>
            {/* … wird von links nach rechts orange eingefärbt … */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2] select-none text-premium"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.45, 0, 0.25, 1] }}
            >
              {line.gold}
            </motion.span>
            {/* … und danach läuft der Glanz-Sweep darüber */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[3] select-none bg-clip-text text-transparent [-webkit-background-clip:text]"
              style={{
                backgroundImage:
                  "linear-gradient(108deg, transparent 38%, rgb(255 248 243 / 0.95) 50%, transparent 62%)",
                backgroundSize: "250% 100%",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ backgroundPosition: "115% 0" }}
              animate={{ backgroundPosition: "-15% 0" }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: 1.35, duration: 1.05, ease: [0.45, 0, 0.25, 1] }}
            >
              {line.gold}
            </motion.span>
          </>
        ) : (
          <span className="relative z-[1] text-premium">{line.gold}</span>
        )}
      </span>
      {line.after}
    </>
  );
}

function PhraseBlock({ phrase, shine }: { phrase: RotatingPhrase; shine?: boolean }) {
  const goldOnLine1 = typeof phrase.line1 !== "string";
  const goldOnLine2 = typeof phrase.line2 !== "string";

  return (
    <span className="hero-headline-lines block">
      <span className="hero-headline-line block">
        <HeadlineLineContent line={phrase.line1} shine={shine && goldOnLine1} />
      </span>
      <span className="hero-headline-line block">
        <HeadlineLineContent line={phrase.line2} shine={shine && goldOnLine2} />
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
            <PhraseBlock phrase={active} shine />
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
  image: string;
}[] = [
  {
    title: "Du beschreibst",
    body: "Marke, Budget, Ausstattung — wie du es von Autoscout gewohnt bist, nur ohne Tab-Chaos.",
    icon: CarFront,
    image: "/so-gehts/step1_beschreiben.webp",
  },
  {
    title: "Wir prüfen manuell",
    body: "Echte Menschen lesen deine Anfrage und ordnen sie sinnvoll ein.",
    icon: ClipboardCheck,
    image: "/so-gehts/step2_pruefen.webp",
  },
  {
    title: "Rückruf & Fokus",
    body: "Telefontermin statt Spam-Mails. Klarheit vor Schnelligkeit.",
    icon: Phone,
    image: "/so-gehts/step3_rueckruf.webp",
  },
];

export default function HomePage() {
  useEffect(() => {
    const scrollIfNeeded = () => {
      const id = window.location.hash.slice(1);
      if (id !== "so-gehts" && id !== "eingabe") return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSection(id, { updateHash: false });
        });
      });
    };
    scrollIfNeeded();
    window.addEventListener("hashchange", scrollIfNeeded);
    return () => window.removeEventListener("hashchange", scrollIfNeeded);
  }, []);

  return (
    <div className="page-container pb-20">
      <section className="hero-section">
        <div className="hero-section__grid">
          <div className="hero-section__copy">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 inline-flex items-center justify-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a9a9a] min-[1100px]:justify-start"
            >
              <span
                aria-hidden
                className="h-px w-7 bg-gradient-to-r from-premium/60 to-transparent"
              />
              Persönliche Fahrzeugsuche
            </motion.p>
            <h1 className="hero-section__headline font-display max-w-full text-[clamp(1.75rem,3.8vw,3.625rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#111111]">
              <RotatingHeadline />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 max-w-[520px] text-pretty text-[clamp(1rem,2.2vw,1.375rem)] leading-[1.6] text-black/[0.65] min-[1100px]:mx-0"
            >
              Fahrzeugsuche wie beim Makler — du beschreibst, wir melden uns{" "}
              <span className="font-medium text-[#111111] underline decoration-premium/40 decoration-2 underline-offset-[6px]">
                persönlich
              </span>
              .
            </motion.p>
            <AppStoreButtons />
            <BookingProgressNav active={1} className="!mt-8" />
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Auswahl + Suche (Desktop: zwei Boxen nebeneinander) */}
      <section className="hero-section hero-section--search">
        <HeroInput embedded />
      </section>

      <section className="hero-content-align mt-10 sm:mt-12 lg:mt-14" aria-label="Vorteile">
        <HeroFeaturesAside />
      </section>

      <section
        id="so-gehts"
        className="hero-content-align relative scroll-mt-[5.5rem] surface-card mt-10 overflow-hidden p-8 sm:mt-12 sm:p-10 lg:mt-14 lg:p-14"
      >
        {/* Dezente Bühne: Akzent-Hairline oben, warmer Glow + Punktraster dahinter */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium/45 to-transparent" />
          <div className="absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(232_90_40/0.06),transparent)]" />
          <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(17_17_17/0.05)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <span aria-hidden className="h-px w-7 bg-gradient-to-r from-transparent to-premium/60" />
            So funktioniert’s
            <span aria-hidden className="h-px w-7 bg-gradient-to-l from-transparent to-premium/60" />
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]">
            Kein Marktplatz.{" "}
            <span className="text-premium">Ein klarer Prozess.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Für alle, die Autos mögen — aber keine Zeit für endloses Scrollen haben.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-5xl lg:mt-14">
          {/* Verbindungslinie zwischen den Schritten (nur in den Lücken sichtbar) */}
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[3.25rem] hidden border-t border-dashed border-premium/25 lg:block"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-[#fafafa] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-premium/30 hover:bg-white hover:shadow-premium-sm sm:p-7"
                >
                  {/* Hintergrund-Skizze, unten rechts ausgerichtet */}
                  <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <img
                      src={s.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-[right_bottom] opacity-75 transition duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-100 [mask-image:linear-gradient(120deg,transparent_18%,black_70%)]"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  {/* Ghost-Nummer */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-2 right-3 select-none font-display text-[4.25rem] font-extrabold leading-none tracking-tighter text-[#111111]/[0.05] transition-colors duration-300 group-hover:text-premium/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="relative flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-sm border border-border bg-white text-[#111111] shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(17_17_17/0.04)] transition duration-300 group-hover:border-premium/30 group-hover:text-premium group-hover:shadow-[0_8px_20px_-6px_rgb(232_90_40/0.25)]"
                    aria-hidden
                  >
                    <Icon
                      className="relative size-6 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.35}
                    />
                  </div>
                  <p className="relative mt-5 font-mono text-[10px] font-medium uppercase tabular-nums tracking-[0.18em] text-[#9a9a9a] transition-colors duration-300 group-hover:text-premium/70">
                    Schritt {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="relative mt-1.5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  {/* Akzentlinie am Kartenfuß */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-premium/70 to-premium/20 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 flex flex-col items-center gap-3 lg:mt-14"
        >
          <p className="text-sm text-muted-foreground">Bereit für den nächsten Schritt?</p>
          <Link
            href="/#eingabe"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("eingabe", { updateHash: false });
            }}
            className="group inline-flex h-11 items-center gap-2 rounded-sm bg-cta-navy px-6 text-[13px] font-bold text-white shadow-cta transition duration-200 hover:-translate-y-0.5 hover:bg-cta-navy-hover shadow-cta-hover"
          >
            Suchauftrag starten
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2.25}
            />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
