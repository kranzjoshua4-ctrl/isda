"use client";

import { Button } from "@/components/ui/button";
import { SelectionFunnel } from "@/components/concierge/SelectionFunnel";
import { buildNaturalSearchText } from "@/lib/build-funnel-search-text";
import { cn } from "@/lib/utils";
import { useConciergeHydration } from "@/hooks/use-concierge-hydration";
import { useConciergeStore } from "@/store/concierge-store";
import { MIN_VEHICLE_REQUEST_LENGTH } from "@/types/concierge";
import {
  EMPTY_FUNNEL_SELECTIONS,
  hasAnyFunnelSelection,
  type FunnelSelections,
} from "@/types/funnel";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
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

const LAYOUT_EASE = [0.22, 1, 0.36, 1] as const;
function splitLayoutTransition(collapsed: boolean, reduced: boolean | null) {
  if (reduced) return { layout: { duration: 0 } };
  if (collapsed) {
    return { layout: { duration: 0.5, ease: LAYOUT_EASE } };
  }
  return {
    layout: {
      type: "spring" as const,
      stiffness: 68,
      damping: 19,
      mass: 0.95,
    },
  };
}

export function HeroInput({ embedded = false }: HeroInputProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const hydrated = useConciergeHydration();
  const setVehicleRequest = useConciergeStore((s) => s.setVehicleRequest);
  const setStoredFunnelSelections = useConciergeStore((s) => s.setFunnelSelections);
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ix, setIx] = useState(0);
  const [focused, setFocused] = useState(false);
  const [funnelComplete, setFunnelComplete] = useState(false);
  const [funnelActiveStep, setFunnelActiveStep] = useState<number | null>(1);
  const funnelCollapsed = funnelComplete && funnelActiveStep === null;
  const wasCollapsedRef = useRef(false);
  const [isExpandingLayout, setIsExpandingLayout] = useState(false);

  useEffect(() => {
    if (wasCollapsedRef.current && !funnelCollapsed) {
      setIsExpandingLayout(true);
      const timer = window.setTimeout(() => setIsExpandingLayout(false), 920);
      wasCollapsedRef.current = funnelCollapsed;
      return () => window.clearTimeout(timer);
    }
    wasCollapsedRef.current = funnelCollapsed;
  }, [funnelCollapsed]);
  const [funnelSelections, setFunnelSelections] =
    useState<FunnelSelections>(EMPTY_FUNNEL_SELECTIONS);
  const lastFunnelTextRef = useRef("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Bestehende Anfrage aus dem Store vorbefüllen (z. B. nach „Zurück" von /termin).
  // „State während des Renderns anpassen"-Pattern statt setState im Effect.
  const [didHydrateText, setDidHydrateText] = useState(false);
  if (hydrated && !didHydrateText) {
    setDidHydrateText(true);
    const stored = useConciergeStore.getState().vehicleRequest;
    if (stored && !value.trim()) {
      setValue(stored);
    }
  }

  const embeddedMinHeight = useCallback(() => {
    if (!embedded) return 104;
    if (window.matchMedia("(min-width: 1024px)").matches) return 156;
    if (window.matchMedia("(min-width: 640px)").matches) return 144;
    return 128;
  }, [embedded]);

  const resizeTextarea = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    const minHeight = embeddedMinHeight();
    const maxHeight = embedded ? 520 : 320;
    ta.style.height = "auto";
    const contentHeight = ta.scrollHeight;
    const next = Math.min(Math.max(contentHeight, minHeight), maxHeight);
    ta.style.height = `${next}px`;
    ta.style.overflowY = contentHeight > maxHeight ? "auto" : "hidden";
  }, [embedded, embeddedMinHeight]);

  const scheduleResizeTextarea = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resizeTextarea);
    });
  }, [resizeTextarea]);

  useEffect(() => {
    scheduleResizeTextarea();
  }, [value, funnelSelections, funnelComplete, scheduleResizeTextarea]);

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
    ...funnelSelections.brands,
    funnelSelections.bodyType,
    funnelSelections.budgetMax != null
      ? `bis ${funnelSelections.budgetMax.toLocaleString("de-DE")} €`
      : null,
    funnelSelections.mileage,
    ...funnelSelections.usage,
    ...funnelSelections.priorities,
    funnelSelections.transmission,
    funnelSelections.drive,
  ].filter((chip) => chip && chip !== "Egal") as string[];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = trimmed;
    if (text.length < MIN_VEHICLE_REQUEST_LENGTH || submitting) return;
    setVehicleRequest(text);
    if (hasAnyFunnelSelection(funnelSelections)) {
      setStoredFunnelSelections(funnelSelections);
    }
    setSubmitting(true);
    queueMicrotask(() => {
      router.push("/termin");
    });
  };

  const searchPanel = (
    <div
      className={cn("flex flex-col", embedded ? "gap-4 sm:gap-5" : "gap-3.5")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-[#111111] bg-[#111111] text-white"
            aria-hidden
          >
            <Search className="size-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 space-y-1">
            <h2 className="font-display text-base font-bold tracking-tight text-[#111111] sm:text-[17px]">
              Deine Suche
            </h2>
            <p className="text-[12px] leading-relaxed text-[#6b6b6b] sm:text-[13px]">
              Beschreibe hier, wonach du suchst.
            </p>
          </div>
        </div>
        <p
          className="shrink-0 pt-0.5 font-mono text-[11px] tabular-nums text-[#9a9a9a] sm:text-xs"
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
            className="text-[11px] font-semibold leading-relaxed text-[#111111]/75 sm:text-xs"
          >
            Perfekt — du kannst deine Suche jetzt noch genauer beschreiben.
          </motion.p>
        ) : null}
      </AnimatePresence>

      <label className="sr-only" htmlFor="vehicle-request">
        Wunschfahrzeug beschreiben
      </label>
      <div className="w-full">
        <div className="relative w-full overflow-visible rounded-sm">
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
              "block w-full resize-none overflow-hidden rounded-sm border border-border bg-muted px-4 py-3.5 text-[15px] leading-[1.55] text-[#111111] outline-none transition-[border-color,box-shadow] duration-200 ease-out",
              "placeholder:text-transparent focus:border-premium/40 focus:ring-2 focus:ring-premium/12",
            )}
          />
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm px-4 py-3.5 text-[15px] leading-[1.55] text-[#9a9a9a]"
            aria-hidden
          >
            <AnimatePresence initial={false} mode="wait">
              {!value && !focused ? (
                <motion.span
                  key={ix}
                  layout={false}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
        <ul className="flex flex-wrap gap-2" aria-label="Ausgewählte Kriterien">
          {selectionChips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#eaeaea] bg-[#fafafa] px-2.5 py-1.5 text-[11px] font-medium leading-snug text-[#111111]"
            >
              <Check className="size-3 shrink-0 text-premium" strokeWidth={2.5} aria-hidden />
              {chip}
            </li>
          ))}
        </ul>
      ) : null}

      <div className={cn(embedded ? "mt-0.5" : "flex justify-end")}>
        <Button
          type="submit"
          disabled={submitting || !ready}
          className={cn(
            "group/btn relative h-11 overflow-hidden rounded-sm border-0 bg-cta-navy px-6 text-sm font-bold text-white shadow-cta transition duration-250 ease-out hover:bg-cta-navy-hover active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 disabled:hover:bg-cta-navy disabled:hover:translate-y-0",
            embedded ? "w-full min-w-0" : "min-w-[12.5rem]",
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
        <LayoutGroup id="hero-search-split">
          <motion.div
            layout
            layoutDependency={funnelCollapsed}
            data-split-state={funnelCollapsed ? "collapsed" : "expanded"}
            className={cn(
              "hero-search-split",
              funnelCollapsed && "hero-search-split--complete",
              isExpandingLayout && "hero-search-split--expanding",
            )}
            transition={splitLayoutTransition(funnelCollapsed, reduceMotion)}
          >
            <motion.div
              layout
              layoutDependency={funnelCollapsed}
              className="surface-card hero-search-split__funnel flex h-full min-w-0 flex-col overflow-hidden p-5 sm:p-6 lg:p-7"
              transition={splitLayoutTransition(funnelCollapsed, reduceMotion)}
              style={{ transformOrigin: "left center" }}
            >
              <SelectionFunnel
                onSelectionChange={syncFunnelToText}
                onAllCompleteChange={setFunnelComplete}
                onActiveStepChange={setFunnelActiveStep}
              />
            </motion.div>
            <motion.div
              layout
              layoutDependency={funnelCollapsed}
              className="surface-card hero-search-split__search flex h-auto self-start min-w-0 flex-col p-5 sm:p-6 lg:p-7"
              transition={
                reduceMotion
                  ? { layout: { duration: 0 } }
                  : funnelCollapsed
                    ? { layout: { duration: 0.5, ease: LAYOUT_EASE } }
                    : {
                        layout: {
                          type: "spring",
                          stiffness: 62,
                          damping: 18,
                          mass: 1,
                          delay: 0.045,
                        },
                      }
              }
              style={{ transformOrigin: "center center" }}
            >
              {searchPanel}
            </motion.div>
          </motion.div>
        </LayoutGroup>
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
                onActiveStepChange={setFunnelActiveStep}
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
