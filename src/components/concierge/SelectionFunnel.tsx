"use client";

import { SelectionOptionCard } from "@/components/concierge/SelectionOptionCard";
import {
  bodyTypes,
  brands,
  budgets,
  fuelTypes,
  findOptionIcon,
  findOptionLogo,
  priorities,
  transmissions,
  usagePurposes,
  type FunnelOption,
} from "@/data/selection-funnel-options";
import { isFunnelCoreComplete } from "@/lib/build-funnel-search-text";
import { cn } from "@/lib/utils";
import {
  EMPTY_FUNNEL_SELECTIONS,
  type FunnelSelections,
} from "@/types/funnel";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type StepMode = "single" | "multi";

const ALL_STEPS: StepId[] = [1, 2, 3, 4, 5, 6, 7];

/** 2×5 Reihen in der Desktop-Vorschau */
const BRAND_PREVIEW_COUNT = 10;

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

const brandGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.14 },
  },
};

const brandCardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.28, ease: EASE_PREMIUM },
  },
};

const STEPS: {
  id: StepId;
  title: string;
  label: string;
  options: FunnelOption[];
  mode: StepMode;
}[] = [
  { id: 1, title: "Marke auswählen", label: "Marke", options: brands, mode: "single" },
  { id: 2, title: "Fahrzeugart auswählen", label: "Fahrzeugart", options: bodyTypes, mode: "single" },
  { id: 3, title: "Budget festlegen", label: "Budget", options: budgets, mode: "single" },
  {
    id: 4,
    title: "Wofür brauchst du das Auto?",
    label: "Nutzung",
    options: usagePurposes,
    mode: "multi",
  },
  {
    id: 5,
    title: "Prioritäten wählen",
    label: "Wichtig",
    options: priorities,
    mode: "multi",
  },
  { id: 6, title: "Getriebe auswählen", label: "Getriebe", options: transmissions, mode: "single" },
  {
    id: 7,
    title: "Kraftstoff / Antrieb auswählen",
    label: "Antrieb",
    options: fuelTypes,
    mode: "single",
  },
];

function isStepComplete(step: StepId, selections: FunnelSelections): boolean {
  switch (step) {
    case 1:
      return selections.brand != null;
    case 2:
      return selections.bodyType != null;
    case 3:
      return selections.budget != null;
    case 4:
      return selections.usage.length > 0;
    case 5:
      return selections.priorities.length > 0;
    case 6:
      return selections.transmission != null;
    case 7:
      return selections.fuel != null;
    default:
      return false;
  }
}

function canOpenStep(step: StepId, selections: FunnelSelections): boolean {
  if (step === 1) return true;
  return isStepComplete((step - 1) as StepId, selections);
}

function summaryForStep(step: StepId, selections: FunnelSelections): string | null {
  switch (step) {
    case 1:
      return selections.brand;
    case 2:
      return selections.bodyType;
    case 3:
      return selections.budget;
    case 4:
      return selections.usage.length > 0 ? selections.usage.join(", ") : null;
    case 5:
      return selections.priorities.length > 0 ? selections.priorities.join(", ") : null;
    case 6:
      return selections.transmission;
    case 7:
      return selections.fuel;
    default:
      return null;
  }
}

function isSelected(
  step: StepId,
  label: string,
  selections: FunnelSelections,
): boolean {
  switch (step) {
    case 1:
      return selections.brand === label;
    case 2:
      return selections.bodyType === label;
    case 3:
      return selections.budget === label;
    case 4:
      return selections.usage.includes(label);
    case 5:
      return selections.priorities.includes(label);
    case 6:
      return selections.transmission === label;
    case 7:
      return selections.fuel === label;
    default:
      return false;
  }
}

type SelectionFunnelProps = {
  onSelectionChange?: (summary: FunnelSelections) => void;
  onAllCompleteChange?: (complete: boolean) => void;
};

export function SelectionFunnel({
  onSelectionChange,
  onAllCompleteChange,
}: SelectionFunnelProps) {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [selections, setSelections] = useState<FunnelSelections>(EMPTY_FUNNEL_SELECTIONS);
  const [activeStep, setActiveStep] = useState<StepId | null>(1);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const onSelectionChangeRef = useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;
  const panelRefs = useRef<Partial<Record<StepId, HTMLDivElement | null>>>({});
  const [panelHeights, setPanelHeights] = useState<Record<StepId, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const measurePanel = useCallback((step: StepId) => {
    const el = panelRefs.current[step];
    if (!el) return;
    setPanelHeights((h) => ({ ...h, [step]: el.scrollHeight }));
  }, []);

  useEffect(() => {
    ALL_STEPS.forEach(measurePanel);
  }, [activeStep, selections, showAllBrands, measurePanel]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      ALL_STEPS.forEach(measurePanel);
    });
    ALL_STEPS.forEach((step) => {
      const el = panelRefs.current[step];
      if (el) ro.observe(el);
    });
    return () => ro.disconnect();
  }, [measurePanel]);

  useEffect(() => {
    onSelectionChangeRef.current?.(selections);
  }, [selections]);

  const allComplete = isFunnelCoreComplete(selections);

  useEffect(() => {
    onAllCompleteChange?.(allComplete);
  }, [allComplete, onAllCompleteChange]);

  const advanceFromStep = (step: StepId) => {
    if (step < 7) {
      setActiveStep((step + 1) as StepId);
    } else {
      setActiveStep(null);
    }
  };

  const handleSingleSelect = (step: StepId, value: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (step === 1) next.brand = value;
      else if (step === 2) next.bodyType = value;
      else if (step === 3) next.budget = value;
      else if (step === 6) next.transmission = value;
      else if (step === 7) next.fuel = value;
      return next;
    });
    advanceFromStep(step);
  };

  const handleMultiToggle = (step: StepId, value: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (step === 4) {
        const set = new Set(prev.usage);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        next.usage = [...set];
      } else if (step === 5) {
        const set = new Set(prev.priorities);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        next.priorities = [...set];
      }
      return next;
    });
  };

  const handleStepHeaderClick = (step: StepId) => {
    if (activeStep === step) {
      setActiveStep(null);
      return;
    }
    if (!canOpenStep(step, selections) && !isStepComplete(step, selections)) return;
    setActiveStep(step);
  };

  return (
    <motion.div
      layout
      className="flex flex-col gap-1"
      transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
    >
      {STEPS.map((step) => {
        const selected = summaryForStep(step.id, selections);
        const singleLabel = step.mode === "single" ? selected : null;
        const selectedLogo =
          step.id === 1 ? findOptionLogo(step.options, selections.brand) : null;
        const displayIcon =
          step.id === 1
            ? null
            : step.mode === "single" && singleLabel
              ? findOptionIcon(step.options, singleLabel)
              : null;

        const isOpen = activeStep === step.id;
        const isComplete = isStepComplete(step.id, selections);
        const isActive = isOpen;
        const canOpen = canOpenStep(step.id, selections) || isComplete;

        const multiCount =
          step.id === 4
            ? selections.usage.length
            : step.id === 5
              ? selections.priorities.length
              : 0;

        return (
          <motion.div key={step.id} layout className="flex flex-col">
            <button
              type="button"
              id={`${baseId}-step-${step.id}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-panel-${step.id}`}
              disabled={!canOpen && !isComplete}
              onClick={() => handleStepHeaderClick(step.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md border px-3 py-2.5 text-left transition-[background-color,box-shadow,border-color] duration-300",
                isActive
                  ? "border-border bg-white text-[#111111] shadow-premium-sm"
                  : isComplete
                    ? "border-border bg-white text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] hover:border-premium/25"
                    : "border-transparent bg-muted text-[#6b6b6b]",
                !canOpen && !isComplete && "cursor-default opacity-70",
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-sm text-[11px] font-bold",
                  isComplete
                    ? "bg-premium text-white"
                    : isActive
                      ? "bg-[#111111] text-white"
                      : "bg-[#e8e8e8] text-[#9a9a9a]",
                )}
              >
                {isComplete ? (
                  <Check className="size-4" strokeWidth={2.5} aria-hidden />
                ) : (
                  step.id
                )}
              </span>
              <span className="min-w-0 flex-1">
                {isComplete && !isOpen ? (
                  <span className="inline-flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[13px] font-semibold sm:text-sm">
                    <span className="shrink-0 text-[#9a9a9a]">{step.label}:</span>
                    {selectedLogo ? (
                      <img
                        src={selectedLogo}
                        alt=""
                        width={28}
                        height={18}
                        className="h-4 w-auto shrink-0 object-contain"
                      />
                    ) : displayIcon ? (
                      <span className="text-sm leading-none" aria-hidden>
                        {displayIcon}
                      </span>
                    ) : null}
                    <span className="text-[#111111]">{selected}</span>
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-[#111111]">{step.title}</span>
                )}
              </span>
              <ChevronDown
                className={cn(
                  "size-3.5 shrink-0 transition-transform duration-300",
                  isOpen ? "rotate-180" : "rotate-0",
                  "text-[#9a9a9a]",
                )}
              />
            </button>

            <motion.div
              id={`${baseId}-panel-${step.id}`}
              role="region"
              aria-labelledby={`${baseId}-step-${step.id}`}
              initial={false}
              animate={{
                height: isOpen ? panelHeights[step.id] : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
              }}
              className="overflow-hidden"
            >
              <div
                ref={(el) => {
                  panelRefs.current[step.id] = el;
                }}
                className="pt-1.5 pb-0.5"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <>
                      <motion.div
                        key={`open-${step.id}`}
                        initial={
                          step.id === 1 && !reduceMotion
                            ? "hidden"
                            : { opacity: 0, y: -6 }
                        }
                        animate={
                          step.id === 1 && !reduceMotion
                            ? "visible"
                            : { opacity: 1, y: 0 }
                        }
                        exit={{ opacity: 0, y: -4 }}
                        transition={{
                          duration: step.id === 1 ? 0.32 : 0.28,
                          ease: EASE_PREMIUM,
                        }}
                        variants={step.id === 1 && !reduceMotion ? brandGridVariants : undefined}
                        className={cn(
                          "grid gap-2",
                          step.id === 1
                            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                            : step.id <= 3
                              ? "grid-cols-2 sm:grid-cols-3"
                              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
                        )}
                      >
                        {(step.id === 1 && !showAllBrands
                          ? step.options.slice(0, BRAND_PREVIEW_COUNT)
                          : step.options
                        ).map((option) =>
                          step.id === 1 && !reduceMotion ? (
                            <motion.div
                              key={option.label}
                              variants={brandCardVariants}
                              className="min-w-0 w-full"
                            >
                              <SelectionOptionCard
                                option={option}
                                selected={isSelected(step.id, option.label, selections)}
                                onSelect={() => handleSingleSelect(step.id, option.label)}
                              />
                            </motion.div>
                          ) : (
                            <SelectionOptionCard
                              key={option.label}
                              option={option}
                              selected={isSelected(step.id, option.label, selections)}
                              onSelect={() =>
                                step.mode === "multi"
                                  ? handleMultiToggle(step.id, option.label)
                                  : handleSingleSelect(step.id, option.label)
                              }
                            />
                          ),
                        )}
                      </motion.div>
                      {step.id === 1 &&
                      !showAllBrands &&
                      step.options.length > BRAND_PREVIEW_COUNT ? (
                        <button
                          type="button"
                          onClick={() => setShowAllBrands(true)}
                          className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-sm border border-dashed border-[#e0e0e0] bg-[#fafafa] py-2 text-[12px] font-semibold text-[#6b6b6b] transition hover:border-premium/30 hover:text-[#111111]"
                        >
                          Mehr anzeigen
                          <ChevronDown className="size-3.5" />
                        </button>
                      ) : null}
                      {step.mode === "multi" ? (
                        <button
                          type="button"
                          disabled={multiCount === 0}
                          onClick={() => advanceFromStep(step.id)}
                          className={cn(
                            "mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-sm border border-dashed py-2 text-[12px] font-semibold transition",
                            multiCount > 0
                              ? "border-premium/35 bg-premium/5 text-[#111111] hover:border-premium/50"
                              : "cursor-not-allowed border-[#e0e0e0] bg-[#fafafa] text-[#9a9a9a] opacity-70",
                          )}
                        >
                          Weiter
                          <ChevronDown className="size-3.5 -rotate-90" />
                        </button>
                      ) : null}
                    </>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
