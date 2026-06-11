"use client";

import { cn } from "@/lib/utils";
import { Clock, Search, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    title: "Persönliche Suche",
    body: "Kein Portal-Chaos — deine Anfrage wird gelesen und eingeordnet.",
    icon: Search,
  },
  {
    title: "Sicher & transparent",
    body: "Klarer Prozess, persönlicher Rückruf, keine Lead-Flut.",
    icon: Shield,
  },
  {
    title: "Zeit sparen",
    body: "Du beschreibst einmal — wir melden uns mit passenden Optionen.",
    icon: Clock,
  },
] as const;

const profileTags = ["Vor Ort in Kostheim", "Persönlicher Rückruf", "Keine Lead-Flut"] as const;

export function HeroFeaturesAside() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
      className="surface-card relative overflow-hidden text-left"
    >
      {/* Akzent-Hairline oben — gleiche Handschrift wie #so-gehts */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-premium/45 to-transparent"
      />

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-stretch">
        <div className="relative flex flex-col justify-center p-6 sm:p-7 lg:p-8 lg:pr-6">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]">
            <span aria-hidden className="h-px w-6 bg-gradient-to-r from-premium/60 to-transparent" />
            Warum ichsuchdeinauto.de
          </p>
          <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-[#111111] sm:text-[1.35rem]">
            Suche mit <span className="text-premium">Ansprechpartner</span> — nicht mit
            Algorithmus.
          </h2>

          <ul className="mt-6 space-y-2 sm:mt-7">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.07 * i, ease }}
                  className="group -mx-3 flex gap-4 rounded-sm px-3 py-2.5 transition-colors duration-300 hover:bg-[#fafafa]"
                >
                  <span
                    className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[#111111]/[0.08] bg-gradient-to-b from-white to-[#f6f5f3] text-premium shadow-[0_1px_2px_rgb(17_17_17/0.05),inset_0_1px_0_rgb(255_255_255/0.95)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-premium/35 group-hover:shadow-[0_10px_24px_-8px_rgb(232_90_40/0.4)]"
                    aria-hidden
                  >
                    {/* Dezenter Lichtschein hinter dem Icon */}
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgb(232_90_40/0.12),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon
                      className="relative size-[1.15rem] transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.6}
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-bold tracking-tight text-[#111111]">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6b6b6b]">{f.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease }}
          className={cn(
            "relative flex flex-col justify-end border-t border-[#eaeaea] p-6 sm:p-7 lg:border-t-0 lg:border-l lg:p-8",
            "bg-[linear-gradient(165deg,#fafaf9_0%,#f3f2f0_48%,#ecebea_100%)]",
          )}
        >
          {/* Warmer Glow + Punktraster für Tiefe */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgb(213_78_34/0.08),transparent_55%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgb(17_17_17/0.05)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_75%_60%_at_100%_0%,black,transparent)]"
          />
          {/* Riesiges Ghost-Anführungszeichen hinter dem Zitat */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-2 select-none font-display text-[7rem] font-extrabold leading-none text-premium/[0.09]"
          >
            „
          </span>

          <div className="relative">
            <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-premium">
              <span aria-hidden className="h-px w-6 bg-gradient-to-r from-premium/60 to-transparent" />
              Dein Ansprechpartner
            </p>

            <div className="mt-4 flex items-end gap-4 sm:gap-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.12, ease }}
                className="group relative shrink-0"
              >
                <div
                  className="absolute -inset-1 rounded-sm bg-[linear-gradient(135deg,rgb(232_90_40/0.35),rgb(232_90_40/0.08))] transition duration-300 group-hover:bg-[linear-gradient(135deg,rgb(232_90_40/0.5),rgb(232_90_40/0.14))]"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-sm border border-[#eaeaea] bg-white shadow-[0_8px_28px_rgb(17_17_17/0.08)] transition duration-300 group-hover:shadow-[0_14px_36px_rgb(17_17_17/0.14)]">
                  <Image
                    src="/serkan/serkan.png"
                    alt="Serkan Tekten, Inhaber"
                    width={112}
                    height={140}
                    className="h-[7.5rem] w-[5.75rem] object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-[8.25rem] sm:w-[6.25rem]"
                    sizes="(max-width: 640px) 92px, 100px"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.2, ease }}
                className="min-w-0 pb-0.5"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-[#111111] sm:text-xl">
                  Serkan Tekten
                </h3>
                <p className="mt-1 text-sm font-medium text-[#6b6b6b]">Inhaber · Autoecke Kostheim</p>
              </motion.div>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.28, ease }}
              className="mt-5 border-l-2 border-premium/50 pl-4 text-pretty text-[15px] leading-relaxed text-[#111111]/90 sm:text-base sm:leading-[1.6]"
            >
              „Ich lese jede Anfrage selbst — wie ein Makler, der versteht, was du wirklich
              suchst.“
            </motion.blockquote>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Kurzprofil">
              {profileTags.map((tag, i) => (
                <motion.li
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.34 + 0.07 * i, ease }}
                  className="rounded-sm border border-[#eaeaea] bg-white/80 px-2.5 py-1 text-[11px] font-medium text-[#111111] transition-colors duration-300 hover:border-premium/40 hover:bg-white"
                >
                  {tag}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
