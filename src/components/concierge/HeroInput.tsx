"use client";

import { Button } from "@/components/ui/button";
import { VoiceInputButton } from "@/components/concierge/VoiceInputButton";
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/store/concierge-store";
import { MIN_VEHICLE_REQUEST_LENGTH } from "@/types/concierge";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PLACEHOLDERS = [
  "Ein fahrtüchtiger Kleinwagen mit gültigem TÜV und unter 200k Kilometer",
  "Smart ForTwo, Diesel, Cabrio, BJ ab 2005",
  "Opel Corsa zwischen 3.000 - 5.500 Euro",
  "Einen soliden VW, Benziner unter 7.000 Euro",
  "BMW M340i Touring, schwarz, unter 35.000 €",
];

const BRAND_CHIPS = [
  "BMW",
  "Audi",
  "Opel",
  "VW",
  "Renault",
  "Suzuki",
  "Toyota",
  "Mercedes",
  "Fiat",
  "Hyundai",
  "Seat",
  "Peugeot",
];

const ATTRIBUTE_CHIPS = ["unter 5.000 €", "unter 10.000 €", "unter 20.000 €", "unter 30.000 €"];

const TRENDING = [
  "M340i Touring",
  "Audi Q5",
  "Model 3",
  "Cupra Formentor",
  "Golf GTI",
];

export function HeroInput() {
  const router = useRouter();
  const setVehicleRequest = useConciergeStore((s) => s.setVehicleRequest);
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ix, setIx] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (PLACEHOLDERS.length <= 1) return;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setIx((i) => (i + 1) % PLACEHOLDERS.length);
      timer = window.setTimeout(tick, 3000);
    };
    let timer = window.setTimeout(tick, 3000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const placeholder = PLACEHOLDERS[ix] ?? PLACEHOLDERS[0];

  const append = useCallback((chunk: string) => {
    setValue((prev) => {
      const t = prev.trim();
      if (!t) return chunk;
      if (t.toLowerCase().includes(chunk.toLowerCase())) return t;
      return `${t} ${chunk}`;
    });
  }, []);

  const trimmed = value.trim();
  const hasTyped = trimmed.length > 0;
  const ready = trimmed.length >= MIN_VEHICLE_REQUEST_LENGTH;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = trimmed;
    if (text.length < MIN_VEHICLE_REQUEST_LENGTH || submitting) return;
    setVehicleRequest(text);
    setSubmitting(true);
    queueMicrotask(() => {
      router.push("/termin");
    });
  };

  return (
    <form
      id="eingabe"
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-2xl scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="group/input relative">
        <div
          className={cn(
            "pointer-events-none absolute -inset-[1px] overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300",
            "group-hover/input:opacity-100 group-focus-within/input:opacity-100",
          )}
          aria-hidden
        >
          <div className="absolute -inset-[60%] animate-spin-slow bg-[conic-gradient(from_0deg,rgba(31,78,121,0.42),rgba(15,23,42,0.22),rgba(31,78,121,0.42),rgba(100,116,139,0.28))]" />
        </div>

        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 bg-[rgb(253_254_255/0.96)] p-3 shadow-[0_28px_70px_rgba(15,23,42,0.14),0_2px_6px_rgba(15,23,42,0.06)] transition-[box-shadow,transform,border-color] duration-200 glow-hover sm:p-4",
            focused
              ? "glow-ring border-[#0a0a0a]/55"
              : "border-[#0a0a0a]/25",
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/55 via-transparent to-[rgb(241_245_249/0.35)]" />

          <div className="relative flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {BRAND_CHIPS.map((c) => (
                  <motion.button
                    key={c}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => append(c)}
                    className="rounded-full border border-[rgba(148,163,184,0.45)] bg-gradient-to-b from-white to-[#eef3f8] px-2.5 py-1 text-[11px] font-semibold text-[#1f2937] shadow-[0_1px_2px_rgba(15,23,42/0.05)] transition hover:border-[rgba(31,78,121,0.32)] hover:from-white hover:to-[#e8eef5] hover:shadow-[0_4px_14px_-4px_rgba(15,23,42/0.1)]"
                  >
                    {c}
                  </motion.button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {ATTRIBUTE_CHIPS.map((c) => (
                  <motion.button
                    key={c}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => append(c)}
                    className="rounded-full border border-[rgba(148,163,184,0.45)] bg-gradient-to-b from-white to-[#eef3f8] px-2.5 py-1 text-[11px] font-semibold text-[#1f2937] shadow-[0_1px_2px_rgba(15,23,42/0.05)] transition hover:border-[rgba(31,78,121,0.32)] hover:from-white hover:to-[#e8eef5] hover:shadow-[0_4px_14px_-4px_rgba(15,23,42/0.1)]"
                  >
                    {c}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pl-0.5">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Beliebt
              </span>
              {TRENDING.map((t) => (
                <motion.button
                  key={t}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => append(t)}
                  className="rounded-md border border-transparent px-2 py-0.5 text-[11px] font-medium text-[#64748b] underline decoration-slate-300/90 decoration-dotted underline-offset-2 transition hover:border-[rgba(100,116,139,0.25)] hover:bg-[rgb(241_245_249/0.85)] hover:text-[#1f2937] hover:no-underline"
                >
                  {t}
                </motion.button>
              ))}
            </div>

            <label className="sr-only" htmlFor="vehicle-request">
              Wunschfahrzeug beschreiben
            </label>
            <div className="relative">
              <textarea
                id="vehicle-request"
                name="vehicle-request"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                rows={4}
                className={cn(
                  "w-full resize-none rounded-md border border-[rgba(100,116,139,0.28)] bg-[rgb(241_245_249/0.82)] px-4 py-3.5 text-[15px] leading-snug text-[#1f2937] outline-none transition",
                  "placeholder:text-transparent focus:border-[rgba(31,78,121,0.45)] focus:ring-2 focus:ring-[rgba(31,78,121,0.12)]",
                )}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-3 text-[15px] leading-snug text-[#7b8794]">
                <AnimatePresence initial={false}>
                  {!value && !focused ? (
                    <motion.span
                      key={ix}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6, position: "absolute" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="block max-w-[95%] text-balance text-center"
                    >
                      {placeholder}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <div className="-mt-1 flex flex-wrap items-center justify-center gap-2.5 pt-1.5">
              <VoiceInputButton
                onTranscript={(t) => {
                  setValue(t);
                }}
              />
              <Button
                type="submit"
                size="lg"
                disabled={submitting || !ready}
                className={cn(
                  "group/btn relative h-10 min-w-[12.5rem] overflow-hidden rounded-md border-0 px-6 font-semibold shadow-cta transition hover:-translate-y-px hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:scale-100",
                  hasTyped
                    ? "bg-[#0a0a0a] text-white shadow-[0_8px_22px_-8px_rgba(0,0,0,0.35)] hover:bg-[#171717] hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.42)] disabled:opacity-100 disabled:saturate-100 disabled:brightness-[0.88] disabled:shadow-[0_4px_14px_-8px_rgba(0,0,0,0.25)]"
                    : "bg-cta-navy text-tech-foreground shadow-cta hover:bg-cta-navy-hover hover:shadow-cta-hover disabled:opacity-60",
                )}
              >
                <span className="relative z-10 inline-flex items-center gap-2 text-sm">
                  {submitting ? (
                    <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  ) : null}
                  {submitting ? "Wird gesendet…" : "Termin vereinbaren"}
                  {!submitting ? (
                    <ArrowRight className="size-4 transition group-hover/btn:translate-x-0.5" />
                  ) : null}
                </span>
                <span className="pointer-events-none absolute inset-0 bg-white/[0.05] opacity-0 transition group-hover/btn:opacity-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Mit dem Fortfahren stimmst du unseren{" "}
        <Link
          href="/datenschutz"
          className="font-medium text-foreground/80 underline decoration-border underline-offset-2 hover:text-tech"
        >
          Datenschutzhinweisen
        </Link>{" "}
        zu.
      </p>
    </form>
  );
}
