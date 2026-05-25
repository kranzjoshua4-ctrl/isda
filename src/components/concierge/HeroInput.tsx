"use client";

import { Button } from "@/components/ui/button";
import { SelectionFunnel } from "@/components/concierge/SelectionFunnel";
import { VoiceInputButton } from "@/components/concierge/VoiceInputButton";
import { buildNaturalSearchText } from "@/lib/build-funnel-search-text";
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/store/concierge-store";
import { MIN_VEHICLE_REQUEST_LENGTH } from "@/types/concierge";
import { EMPTY_FUNNEL_SELECTIONS, type FunnelSelections } from "@/types/funnel";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_VEHICLE_REQUEST_LENGTH = 1000;

const PLACEHOLDERS = [
  "Ein fahrtüchtiger Kleinwagen mit gültigem TÜV und unter 200k Kilometer",
  "Smart ForTwo, Diesel, Cabrio, BJ ab 2005",
  "Opel Corsa zwischen 3.000 - 5.500 Euro",
  "Einen soliden VW, Benziner unter 7.000 Euro",
  "BMW M340i Touring, schwarz, unter 35.000 €",
];

type HeroInputProps = {
  /** Zwei getrennte Boxen nebeneinander — ohne äußere Karten-Hülle */
  embedded?: boolean;
};

export function HeroInput({ embedded = false }: HeroInputProps) {
  const router = useRouter();
  const setVehicleRequest = useConciergeStore((s) => s.setVehicleRequest);
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ix, setIx] = useState(0);
  const [focused, setFocused] = useState(false);
  const [funnelComplete, setFunnelComplete] = useState(false);
  const [funnelSelections, setFunnelSelections] =
    useState<FunnelSelections>(EMPTY_FUNNEL_SELECTIONS);
  const lastFunnelTextRef = useRef("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    ta.style.height = "0px";
    const minHeight = embedded
      ? window.matchMedia("(min-width: 1024px)").matches
        ? 120
        : window.matchMedia("(min-width: 640px)").matches
          ? 112
          : 104
      : 96;
    const maxHeight = embedded ? 520 : 320;
    const contentHeight = ta.scrollHeight;
    const next = Math.min(Math.max(contentHeight, minHeight), maxHeight);
    ta.style.height = `${next}px`;
    ta.style.overflowY = contentHeight > maxHeight ? "auto" : "hidden";
  }, [embedded]);

  const scheduleResizeTextarea = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resizeTextarea);
    });
  }, [resizeTextarea]);

  useEffect(() => {
    scheduleResizeTextarea();
  }, [value, funnelSelections, funnelComplete, scheduleResizeTextarea]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const ro = new ResizeObserver(() => scheduleResizeTextarea());
    ro.observe(ta);
    return () => ro.disconnect();
  }, [scheduleResizeTextarea]);

  useEffect(() => {
    const onResize = () => scheduleResizeTextarea();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scheduleResizeTextarea]);

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

  const syncFunnelToText = useCallback((selections: FunnelSelections) => {
    setFunnelSelections(selections);
    const funnelText = buildNaturalSearchText(selections);
    const previous = lastFunnelTextRef.current;

    setValue((prev) => {
      const trimmed = prev.trim();
      let rest = trimmed;

      if (previous && trimmed.startsWith(previous)) {
        rest = trimmed.slice(previous.length).trim();
        if (rest.startsWith(",")) rest = rest.slice(1).trim();
      }

      lastFunnelTextRef.current = funnelText;
      if (!funnelText) return rest;
      return rest ? `${funnelText} ${rest}` : funnelText;
    });
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resizeTextarea());
      });
    });
  }, [resizeTextarea]);

  const trimmed = value.trim();
  const hasTyped = trimmed.length > 0;
  const ready = trimmed.length >= MIN_VEHICLE_REQUEST_LENGTH;
  const charCount = value.length;

  const selectionChips = [
    funnelSelections.brand,
    funnelSelections.bodyType,
    funnelSelections.budget,
    ...funnelSelections.usage,
    ...funnelSelections.priorities,
    funnelSelections.transmission,
    funnelSelections.fuel,
  ].filter((chip) => chip && chip !== "Egal") as string[];

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

  const searchPanel = (
    <div className={cn("flex flex-col", embedded && "h-full min-h-0")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span
            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-[#111111] bg-[#111111] text-white"
            aria-hidden
          >
            <Search className="size-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-base font-bold tracking-tight text-[#111111] sm:text-[17px]">
              Deine Suche
            </h2>
            <p className="mt-0.5 text-[12px] leading-snug text-[#6b6b6b] sm:text-[13px]">
              Beschreibe hier, wonach du suchst.
            </p>
          </div>
        </div>
        <p
          className="shrink-0 pt-1 font-mono text-[11px] tabular-nums text-[#9a9a9a] sm:text-xs"
          aria-live="polite"
        >
          <span className={charCount > MAX_VEHICLE_REQUEST_LENGTH * 0.9 ? "text-[#111111]" : ""}>
            {charCount}
          </span>
          {" / "}
          {MAX_VEHICLE_REQUEST_LENGTH}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {funnelComplete ? (
          <motion.p
            key="funnel-hint"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-[11px] font-semibold leading-snug text-[#111111]/75 sm:text-xs"
          >
            Perfekt — du kannst deine Suche jetzt noch genauer beschreiben.
          </motion.p>
        ) : null}
      </AnimatePresence>

      <label className="sr-only" htmlFor="vehicle-request">
        Wunschfahrzeug beschreiben
      </label>
      <div
        className={cn(
          "mt-2 w-full",
          embedded && "lg:mt-3 lg:flex lg:flex-1 lg:flex-col lg:justify-start lg:min-h-0",
        )}
      >
        <div className="relative w-full rounded-sm">
          <textarea
            ref={textareaRef}
            id="vehicle-request"
            name="vehicle-request"
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX_VEHICLE_REQUEST_LENGTH))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={MAX_VEHICLE_REQUEST_LENGTH}
            rows={1}
            className={cn(
              "block w-full resize-none overflow-hidden rounded-sm border border-[#eaeaea] bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-[#111111] outline-none transition-[height,border-color,box-shadow] duration-200 ease-out",
              "placeholder:text-transparent focus:border-premium/40 focus:ring-2 focus:ring-premium/12",
            )}
          />
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm px-3.5 py-2.5 text-[15px] leading-relaxed text-[#9a9a9a]"
            aria-hidden
          >
            <AnimatePresence initial={false}>
              {!value && !focused ? (
                <motion.span
                  key={ix}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="block max-w-full text-pretty"
                >
                  {placeholder}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {selectionChips.length > 0 ? (
        <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Ausgewählte Kriterien">
          {selectionChips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-1 rounded-sm border border-[#eaeaea] bg-[#fafafa] px-2 py-1 text-[11px] font-medium leading-tight text-[#111111]"
            >
              <Check className="size-3 shrink-0 text-premium" strokeWidth={2.5} aria-hidden />
              {chip}
            </li>
          ))}
        </ul>
      ) : null}

      <div
        className={cn(
          "mt-3 flex flex-wrap items-center gap-2.5",
          embedded ? "justify-center" : "justify-end",
        )}
      >
        <VoiceInputButton
          onTranscript={(t) => {
            setValue(t.slice(0, MAX_VEHICLE_REQUEST_LENGTH));
          }}
        />
        <Button
          type="submit"
          disabled={submitting || !ready}
          className={cn(
            "group/btn relative h-10 min-w-[12.5rem] overflow-hidden rounded-sm border-0 bg-cta-navy px-6 text-sm font-bold text-white shadow-cta transition duration-250 ease-out hover:bg-cta-navy-hover active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 disabled:hover:bg-cta-navy disabled:hover:translate-y-0",
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
  );

  return (
    <form
      id="eingabe"
      onSubmit={onSubmit}
      className="mx-auto w-full scroll-mt-28 sm:scroll-mt-32"
    >
      {embedded ? (
        <div className="hero-search-split">
          <div className="surface-card hero-search-split__funnel flex h-full flex-col p-4 sm:p-5 lg:p-6">
            <SelectionFunnel
              onSelectionChange={syncFunnelToText}
              onAllCompleteChange={setFunnelComplete}
            />
          </div>
          <div className="surface-card hero-search-split__search flex h-full flex-col p-4 sm:p-5 lg:p-6">
            {searchPanel}
          </div>
        </div>
      ) : (
        <div className="group/input relative">
          <div
            className={cn(
              "relative flex flex-col overflow-hidden rounded-none border p-4 shadow-premium-float transition-[box-shadow,border-color] duration-300 ease-out sm:p-5",
              "glass-card",
              focused
                ? "glow-ring border-premium/30"
                : "border-border hover:border-premium/25",
            )}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-[#f8f8f7]/40" />
            <div className="relative flex flex-col">
              <SelectionFunnel
                onSelectionChange={syncFunnelToText}
                onAllCompleteChange={setFunnelComplete}
              />
              <div className="mt-4 flex flex-col">{searchPanel}</div>
            </div>
          </div>
        </div>
      )}
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
