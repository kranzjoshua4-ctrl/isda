"use client";

import { Button } from "@/components/ui/button";
import { SelectionFunnel } from "@/components/concierge/SelectionFunnel";
import { VoiceInputButton } from "@/components/concierge/VoiceInputButton";
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/store/concierge-store";
import { MIN_VEHICLE_REQUEST_LENGTH } from "@/types/concierge";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const PLACEHOLDERS = [
  "Ein fahrtüchtiger Kleinwagen mit gültigem TÜV und unter 200k Kilometer",
  "Smart ForTwo, Diesel, Cabrio, BJ ab 2005",
  "Opel Corsa zwischen 3.000 - 5.500 Euro",
  "Einen soliden VW, Benziner unter 7.000 Euro",
  "BMW M340i Touring, schwarz, unter 35.000 €",
];

export function HeroInput() {
  const router = useRouter();
  const setVehicleRequest = useConciergeStore((s) => s.setVehicleRequest);
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ix, setIx] = useState(0);
  const [focused, setFocused] = useState(false);
  const [funnelComplete, setFunnelComplete] = useState(false);
  const lastFunnelTextRef = useRef("");

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

  const syncFunnelToText = useCallback(
    (selections: {
      brand: string | null;
      bodyType: string | null;
      budget: string | null;
    }) => {
      const parts = [selections.brand, selections.bodyType, selections.budget].filter(
        Boolean,
      ) as string[];
      const funnelText = parts.join(" ");
      const previous = lastFunnelTextRef.current;

      setValue((prev) => {
        const trimmed = prev.trim();
        let rest = trimmed;

        if (previous && trimmed.startsWith(previous)) {
          rest = trimmed.slice(previous.length).trim();
        }

        lastFunnelTextRef.current = funnelText;
        if (!funnelText) return rest;
        return rest ? `${funnelText} ${rest}` : funnelText;
      });
    },
    [],
  );

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
      className="mx-auto w-full scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="group/input relative">
        <div
          className={cn(
            "relative overflow-hidden rounded-none border p-4 shadow-premium-float transition-[box-shadow,border-color] duration-300 ease-out sm:p-5",
            "glass-card",
            focused
              ? "glow-ring border-premium/30"
              : "border-[#111111]/[0.08] hover:border-[#111111]/[0.12]",
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-[#f8f8f7]/40" />

          <div className="relative flex flex-col">
            <SelectionFunnel
              onSelectionChange={syncFunnelToText}
              onAllCompleteChange={setFunnelComplete}
            />

            <AnimatePresence initial={false}>
              {funnelComplete ? (
                <motion.div
                  key="funnel-hint"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[3.25rem] items-center justify-center py-4"
                >
                  <p className="px-0.5 text-center text-[11px] font-semibold leading-snug text-[#111111]/75 sm:text-xs">
                    Perfekt — du kannst deine Suche jetzt noch genauer beschreiben.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <label className="sr-only" htmlFor="vehicle-request">
              Wunschfahrzeug beschreiben
            </label>
            <div className={cn("relative", !funnelComplete && "mt-4")}>
              <textarea
                id="vehicle-request"
                name="vehicle-request"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                rows={4}
                className={cn(
                  "w-full resize-none rounded-none border border-[#eaeaea] bg-white/90 px-4 py-3.5 text-[15px] leading-snug text-[#111111] outline-none transition duration-200 ease-out",
                  "placeholder:text-transparent focus:border-premium/40 focus:ring-2 focus:ring-premium/12",
                )}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-3 text-[15px] leading-snug text-[#9a9a9a]">
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

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 pt-0.5 sm:justify-start">
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
                  "group/btn relative h-12 min-w-[14rem] overflow-hidden rounded-none border-0 bg-[#262626] px-8 text-sm font-bold text-white shadow-[0_4px_14px_rgba(17,17,17,0.18)] transition duration-250 ease-out hover:bg-[#1a1a1a] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 disabled:hover:bg-[#262626] disabled:hover:translate-y-0",
                  hasTyped && "hover:-translate-y-0.5",
                )}
              >
                <span className="relative z-10 inline-flex items-center gap-2 text-sm">
                  {submitting ? (
                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : null}
                  {submitting ? "Wird gesendet…" : "Termin vereinbaren"}
                  {!submitting ? (
                    <ArrowRight className="size-4 transition group-hover/btn:translate-x-0.5" />
                  ) : null}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] text-[#9a9a9a] lg:text-left">
        Mit dem Fortfahren stimmst du unseren{" "}
        <Link
          href="/datenschutz"
          className="font-medium text-[#6b6b6b] underline decoration-[#eaeaea] underline-offset-2 transition hover:text-[#111111] hover:decoration-premium/50"
        >
          Datenschutzhinweisen
        </Link>{" "}
        zu.
      </p>
    </form>
  );
}
