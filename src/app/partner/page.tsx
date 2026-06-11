"use client";

import { PartnerForm } from "@/components/partner/PartnerForm";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  Handshake,
  MapPin,
  PhoneForwarded,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
  Users,
} from "lucide-react";
import { useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const trustChips = [
  "Persönlich vorqualifiziert",
  "Keine Massen-Leads",
  "Direkter Kundenkontakt",
  "Deutschlandweit",
] as const;

const trustBarItems = [
  "Digitale Fahrzeuganfragen mit Kontext",
  "Persönlich geprüft",
  "Keine Lead-Flut",
  "Fokus auf passende Händler",
] as const;

const features: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Händlernetzwerk",
    body: "Gebündelte Reichweite mit klarer Qualitätslinse — kuratiert statt anonym verteilt.",
    icon: Users,
  },
  {
    title: "Keine anonymen Klick-Leads",
    body: "Jede Anfrage enthält echte Kaufabsicht statt wahlloser Massenkontakte.",
    icon: ShieldCheck,
  },
  {
    title: "Gezielte Anfragen",
    body: "Kunden mit Budget, Timeline und konkretem Fahrzeugwunsch — nicht nur Klicks.",
    icon: Target,
  },
  {
    title: "Vorqualifiziert statt weitergeleitet",
    body: "Jeder Kontakt wird vorab eingeordnet, bevor Händler verbunden werden.",
    icon: PhoneForwarded,
  },
  {
    title: "Starke Kundschaft",
    body: "Digital affin, entscheidungsbereit — mit Klarheit statt Preis-Tourismus.",
    icon: Sparkles,
  },
];

const processSteps: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Anfrage mit Kontext",
    body: "Marke, Budget, Ausstattung und Timeline — strukturiert statt Formular-Spam.",
    icon: ClipboardCheck,
  },
  {
    title: "Persönlicher Fit-Check",
    body: "Wir prüfen Passung zu deinem Bestand, bevor ein Kontakt entsteht.",
    icon: BadgeCheck,
  },
  {
    title: "Direkter Connect",
    body: "Telefonischer Austausch mit vorbereiteten Kunden — kein Portal-Zwischenlayer.",
    icon: Handshake,
  },
];

const inDemand = ["SUV", "Kombi", "Kleinwagen", "Elektro"] as const;

function SectionLabel({
  children,
  centered,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-premium",
      )}
    >
      <span
        aria-hidden
        className="h-px w-7 bg-gradient-to-r from-transparent to-premium/60"
      />
      {children}
      {centered ? (
        <span
          aria-hidden
          className="h-px w-7 bg-gradient-to-l from-transparent to-premium/60"
        />
      ) : null}
    </p>
  );
}

function PremiumFeatureCard({
  title,
  body,
  icon: Icon,
  index,
  className,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
  index: number;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.48, delay: 0.05 * index, ease }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm border border-[#111111]/[0.06] bg-white/90 p-7 shadow-premium-sm backdrop-blur-sm transition duration-300",
        "hover:-translate-y-1 hover:border-premium/30 hover:shadow-premium",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-premium/[0.05] before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        className,
      )}
    >
      {/* Ghost-Nummer */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-2 right-3 select-none font-display text-[3.75rem] font-extrabold leading-none tracking-tighter text-[#111111]/[0.04] transition-colors duration-300 group-hover:text-premium/12"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-premium/10 text-premium transition duration-300 group-hover:bg-premium group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgb(232_90_40/0.45)]"
        aria-hidden
      >
        <Icon
          className="relative size-5 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.35}
        />
      </div>
      <h2 className="font-display text-lg font-bold leading-snug tracking-tight text-[#111111] sm:text-[1.125rem]">
        {title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6b6b6b]">{body}</p>
      {/* Akzentlinie am Kartenfuß */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-premium/70 to-premium/20 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </motion.article>
  );
}

export default function PartnerPage() {
  useEffect(() => {
    const scrollIfNeeded = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || (hash !== "so-funktionierts" && hash !== "partner-werden")) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSection(hash, { updateHash: false });
        });
      });
    };
    scrollIfNeeded();
    window.addEventListener("hashchange", scrollIfNeeded);
    return () => window.removeEventListener("hashchange", scrollIfNeeded);
  }, []);

  return (
    <div className="relative overflow-x-clip">
      {/* Page-local depth layers */}
      <div
        aria-hidden
        className="partner-page-top-glow pointer-events-none fixed inset-x-0 top-0 z-[1] h-[min(92vh,880px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[6%] h-[420px] w-[min(70vw,520px)] rounded-full bg-[radial-gradient(circle,rgb(232_90_40/0.06),transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[18%] top-[38%] h-[360px] w-[min(55vw,440px)] rounded-full bg-[radial-gradient(circle,rgb(248_248_247/0.9),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-28 lg:px-8">
        {/* ——— Hero ——— */}
        <section className="relative pt-6 sm:pt-10 lg:pt-14">
          {/* Punktraster hinter dem Hero */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-6 h-[28rem] opacity-60 [background-image:radial-gradient(rgb(17_17_17/0.05)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="relative mx-auto max-w-4xl text-center lg:max-w-5xl"
          >
            <SectionLabel centered>Händlernetzwerk</SectionLabel>

            <h1 className="text-balance-safe mt-5 font-display text-[clamp(2rem,5.8vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#111111]">
              Qualifizierte{" "}
              <span className="text-premium">Gebrauchtwagen-Anfragen</span> statt anonymer
              Portal-Leads.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.14, ease }}
              className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#6b6b6b] sm:text-lg sm:leading-[1.65]"
            >
              Kunden mit konkreter Kaufabsicht, Budget und Kontext — persönlich vorqualifiziert statt
              wahllos verteilt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease }}
              className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button
                type="button"
                onClick={() => scrollToSection("partner-werden")}
                className="group h-12 rounded-sm border-0 bg-cta-navy px-8 text-sm font-bold tracking-tight text-white shadow-cta transition duration-200 hover:-translate-y-0.5 hover:bg-cta-navy-hover shadow-cta-hover"
              >
                Partner werden
                <ArrowRight className="ml-1 size-4 opacity-90 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => scrollToSection("so-funktionierts")}
                className="h-12 rounded-sm border-[#111111]/12 bg-white/80 px-8 text-sm font-semibold text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] backdrop-blur-sm transition hover:border-premium/30 hover:bg-white"
              >
                So funktioniert&apos;s
              </Button>
            </motion.div>

            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-left sm:gap-x-8">
              {trustChips.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.32 + 0.06 * i, ease }}
                  className="flex items-center gap-2 text-[13px] font-medium tracking-tight text-[#111111]/85"
                >
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-premium/10 text-premium"
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ——— Trust bar ——— */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mx-auto mt-14 max-w-5xl sm:mt-16"
          aria-label="Vertrauensmerkmale"
        >
          <div className="relative overflow-hidden rounded-sm border border-[#111111]/[0.06] bg-white/70 px-4 py-4 shadow-[0_1px_0_rgb(255_255_255/0.9)_inset,0_8px_32px_-12px_rgba(17,17,17,0.08)] backdrop-blur-md sm:px-6">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium/35 to-transparent"
            />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f8f8f7] to-transparent sm:w-20" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f8f8f7] to-transparent sm:w-20" />
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-between sm:gap-x-4">
              {trustBarItems.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] text-[#6b6b6b] sm:text-[10px] sm:tracking-[0.18em]"
                >
                  {i > 0 ? (
                    <span aria-hidden className="hidden size-1 rounded-full bg-premium/50 sm:block" />
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ——— Features ——— */}
        <section className="relative mt-24 sm:mt-28 lg:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel centered>Warum Partner werden</SectionLabel>
            <h2 className="text-balance-safe mt-4 font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-tight tracking-tight text-[#111111]">
              Qualität vor Quantität — für Händler, die{" "}
              <span className="text-premium">Abschlüsse</span> wollen, nicht Klicks.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#6b6b6b] sm:text-base">
              Partner für moderne Gebrauchtwagen-Sourcing-Anfragen — mit Vermittlung statt
              Leadverkauf.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.slice(0, 3).map((c, i) => (
              <PremiumFeatureCard key={c.title} {...c} index={i} />
            ))}
            <div className="grid gap-5 sm:col-span-2 sm:grid-cols-2 lg:col-span-3 lg:mx-auto lg:max-w-[calc(66.666%-0.625rem)]">
              {features.slice(3).map((c, i) => (
                <PremiumFeatureCard key={c.title} {...c} index={i + 3} />
              ))}
            </div>
          </div>
        </section>

        {/* ——— So funktioniert's ——— */}
        <section
          id="so-funktionierts"
          className="scroll-mt-[5.5rem] relative mt-28 border-t border-[#111111]/[0.06] pt-28 sm:mt-32 sm:pt-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium/40 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgb(248_248_247/0.85),transparent)]"
          />

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-[6.5rem]">
              <SectionLabel>So funktioniert&apos;s</SectionLabel>
              <h2 className="text-balance-safe mt-4 font-display text-[clamp(1.5rem,3.5vw,2.35rem)] font-bold leading-tight tracking-tight text-[#111111]">
                Kuratierter Weg vom Wunschauto zum Händlerkontakt.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#6b6b6b] sm:text-base">
                Digitale Anfragen mit Kontext — statt anonymer Lead-Flut aus dem Portal. Jeder Schritt
                ist auf Passung ausgelegt, nicht auf Volumen.
              </p>
              <div className="mt-8 hidden items-center gap-3 rounded-sm border border-premium/15 bg-gradient-to-br from-premium/[0.05] to-transparent p-5 lg:flex">
                <Building2 className="size-5 shrink-0 text-premium" strokeWidth={1.35} />
                <p className="text-sm leading-relaxed text-[#6b6b6b]">
                  <span className="font-semibold text-[#111111]">Exklusives Netzwerk:</span> Wir
                  vermitteln hochwertige Fahrzeuganfragen an ausgewählte Händler — persönlich, nicht
                  automatisiert.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Vertikale Verbindungslinie zwischen den Schritten */}
              <div
                aria-hidden
                className="absolute bottom-10 left-[3.25rem] top-10 hidden border-l border-dashed border-premium/25 sm:block"
              />
              <ol className="relative space-y-4">
                {processSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.li
                      key={step.title}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: 0.06 * i, ease }}
                      className="group relative flex gap-5 overflow-hidden rounded-sm border border-[#111111]/[0.06] bg-white/85 p-6 shadow-premium-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-premium/30 hover:shadow-premium sm:gap-6 sm:p-7"
                    >
                      {/* Ghost-Nummer */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-2 right-3 select-none font-display text-[3.75rem] font-extrabold leading-none tracking-tighter text-[#111111]/[0.04] transition-colors duration-300 group-hover:text-premium/12"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative flex flex-col items-center gap-2">
                        <span className="font-mono text-[11px] font-medium tabular-nums tracking-wide text-[#9a9a9a] transition-colors duration-300 group-hover:text-premium/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div
                          className="flex size-12 items-center justify-center rounded-sm bg-premium/10 text-premium transition duration-300 group-hover:bg-premium group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgb(232_90_40/0.45)]"
                          aria-hidden
                        >
                          <Icon
                            className="size-5 transition-transform duration-300 group-hover:scale-110"
                            strokeWidth={1.35}
                          />
                        </div>
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="font-display text-lg font-semibold tracking-tight text-[#111111]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">{step.body}</p>
                      </div>
                      {/* Akzentlinie am Kartenfuß */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-premium/70 to-premium/20 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      />
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* ——— Application form ——— */}
        <section
          id="partner-werden"
          className="scroll-mt-[5.5rem] relative mt-28 sm:mt-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium/30 to-transparent"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
            className="grid gap-8 pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10"
          >
            <div className="relative overflow-hidden rounded-sm border border-[#111111]/[0.06] bg-white/92 p-6 shadow-premium backdrop-blur-sm sm:p-9 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(232_90_40/0.07),transparent_70%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium/40 to-transparent"
              />

              <SectionLabel>Trusted Partner Application</SectionLabel>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-[#111111]">
                Kurz vorstellen
              </h2>
              <p className="mt-2 text-sm font-medium text-[#111111]/90">
                Wir prüfen jede Händleranfrage persönlich.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                Wir lesen jede Nachricht — kein Vertriebs-Bot.
              </p>
              <PartnerForm className="relative mt-8" />
            </div>

            <aside className="flex flex-col gap-5 lg:pt-2">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                className="rounded-sm border border-[#111111]/[0.06] bg-[#f8f8f7]/90 p-6 shadow-premium-sm backdrop-blur-sm sm:p-7"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b6b6b]">
                  Aktuell besonders gefragt
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {inDemand.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm border border-[#111111]/[0.08] bg-white px-3 py-1.5 text-sm font-medium tracking-tight text-[#111111] transition-colors duration-300 hover:border-premium/40"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-[#6b6b6b]">
                  Spezialisierung hilft uns, Anfragen passgenau zuzuordnen — ohne starre Kategorien.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.18, ease }}
                className="rounded-sm border border-premium/15 bg-gradient-to-br from-premium/[0.06] to-transparent p-6 sm:p-7"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-premium" strokeWidth={1.35} />
                  <div>
                    <p className="font-display text-base font-semibold tracking-tight text-[#111111]">
                      Deutschlandweit
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                      Standort und Spezialisierung bestimmen die Zuordnung — nicht ein anonymes
                      Portal-Ranking.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="flex items-center gap-3 rounded-sm border border-[#111111]/[0.06] bg-white/80 p-5 lg:hidden">
                <Building2 className="size-5 shrink-0 text-premium" strokeWidth={1.35} />
                <p className="text-sm leading-relaxed text-[#6b6b6b]">
                  <span className="font-semibold text-[#111111]">Exklusives Netzwerk</span> — persönliche
                  Vermittlung statt Lead-Flut.
                </p>
              </div>
            </aside>
          </motion.div>
        </section>
      </div>

      {/* Mobile sticky CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 p-4 md:hidden">
        <div className="pointer-events-auto mx-auto max-w-md">
          <Button
            type="button"
            onClick={() => scrollToSection("partner-werden")}
            className="h-12 w-full rounded-sm border-0 bg-cta-navy text-sm font-bold text-white shadow-cta backdrop-blur-sm"
          >
            Partner werden
          </Button>
        </div>
      </div>
    </div>
  );
}
