"use client";

import { FunnelBudgetSlider } from "@/components/concierge/FunnelBudgetSlider";
import { FunnelContinueButton } from "@/components/concierge/FunnelContinueButton";
import { SelectionOptionCard } from "@/components/concierge/SelectionOptionCard";
import {
  bodyTypes,
  bodyTypesBottom,
  bodyTypesMiddle,
  bodyTypesTop,
  brands,
  driveTypes,
  findBrandLogo,
  findOptionIcon,
  mileageBands,
  priorities,
  transmissions,
  usagePurposes,
  type FunnelOption,
} from "@/data/selection-funnel-options";
import { isFunnelCoreComplete } from "@/lib/build-funnel-search-text";
import { cn } from "@/lib/utils";
import {
  EMPTY_FUNNEL_SELECTIONS,
  FUNNEL_BUDGET_DEFAULT,
  type FunnelSelections,
} from "@/types/funnel";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type StepMode = "single" | "multi" | "custom";

const ALL_STEPS: StepId[] = [1, 2, 3, 4, 5, 6, 7, 8];
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
  { id: 1, title: "Marke auswählen", label: "Marke", options: brands, mode: "multi" },
  { id: 2, title: "Fahrzeugart auswählen", label: "Fahrzeugart", options: bodyTypes, mode: "single" },
  { id: 3, title: "Budget festlegen", label: "Budget", options: [], mode: "custom" },
  { id: 4, title: "Kilometerstand wählen", label: "Laufleistung", options: mileageBands, mode: "single" },
  {
    id: 5,
    title: "Wofür brauchst du das Auto?",
    label: "Nutzung",
    options: usagePurposes,
    mode: "multi",
  },
  {
    id: 6,
    title: "Prioritäten wählen",
    label: "Wichtig",
    options: priorities,
    mode: "multi",
  },
  { id: 7, title: "Getriebe auswählen", label: "Getriebe", options: transmissions, mode: "single" },
  { id: 8, title: "Antrieb auswählen", label: "Antrieb", options: driveTypes, mode: "single" },
];

function isStepComplete(step: StepId, selections: FunnelSelections): boolean {
  switch (step) {
    case 1:
      return selections.brands.length > 0;
    case 2:
      return selections.bodyType != null;
    case 3:
      return selections.budgetMax != null;
    case 4:
      return selections.mileage != null;
    case 5:
      return selections.usage.length > 0;
    case 6:
      return selections.priorities.length > 0;
    case 7:
      return selections.transmission != null;
    case 8:
      return selections.drive != null;
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
      return selections.brands.length > 0 ? selections.brands.join(", ") : null;
    case 2:
      return selections.bodyType;
    case 3:
      return selections.budgetMax != null
        ? `bis ${selections.budgetMax.toLocaleString("de-DE")} €`
        : null;
    case 4:
      return selections.mileage;
    case 5:
      return selections.usage.length > 0 ? selections.usage.join(", ") : null;
    case 6:
      return selections.priorities.length > 0 ? selections.priorities.join(", ") : null;
    case 7:
      return selections.transmission;
    case 8:
      return selections.drive;
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
      return selections.brands.includes(label);
    case 2:
      return selections.bodyType === label;
    case 4:
      return selections.mileage === label;
    case 5:
      return selections.usage.includes(label);
    case 6:
      return selections.priorities.includes(label);
    case 7:
      return selections.transmission === label;
    case 8:
      return selections.drive === label;
    default:
      return false;
  }
}

function multiCountForStep(step: StepId, selections: FunnelSelections): number {
  switch (step) {
    case 1:
      return selections.brands.length;
    case 5:
      return selections.usage.length;
    case 6:
      return selections.priorities.length;
    default:
      return 0;
  }
}

function needsContinueButton(step: (typeof STEPS)[number]): boolean {
  return step.mode === "multi" || step.id === 3;
}

type SelectionFunnelProps = {
  onSelectionChange?: (summary: FunnelSelections) => void;
  onAllCompleteChange?: (complete: boolean) => void;
  onActiveStepChange?: (step: StepId | null) => void;
};

export function SelectionFunnel({
  onSelectionChange,
  onAllCompleteChange,
  onActiveStepChange,
}: SelectionFunnelProps) {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [selections, setSelections] = useState<FunnelSelections>(EMPTY_FUNNEL_SELECTIONS);
  const [activeStep, setActiveStep] = useState<StepId | null>(1);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const onSelectionChangeRef = useRef(onSelectionChange);
  useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange;
  });
  const panelRefs = useRef<Partial<Record<StepId, HTMLDivElement | null>>>({});
  const [panelHeights, setPanelHeights] = useState<Record<StepId, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  });

  const measurePanel = useCallback((step: StepId) => {
    const el = panelRefs.current[step];
    if (!el) return;
    setPanelHeights((h) => ({ ...h, [step]: el.scrollHeight }));
  }, []);

  // Vor dem Paint messen, damit die Höhen-Animation nicht mit 0 startet
  useLayoutEffect(() => {
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

  useEffect(() => {
    onActiveStepChange?.(activeStep);
  }, [activeStep, onActiveStepChange]);

  // Beim Öffnen des Budget-Schritts den Standardwert setzen (event-getrieben statt Effect)
  const openStep = (step: StepId | null) => {
    if (step === 3) {
      setSelections((prev) =>
        prev.budgetMax == null ? { ...prev, budgetMax: FUNNEL_BUDGET_DEFAULT } : prev,
      );
    }
    setActiveStep(step);
  };

  const advanceFromStep = (step: StepId) => {
    if (step < 8) {
      openStep((step + 1) as StepId);
    } else {
      openStep(null);
    }
  };

  const handleSingleSelect = (step: StepId, value: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (step === 2) next.bodyType = value;
      else if (step === 4) next.mileage = value;
      else if (step === 7) next.transmission = value;
      else if (step === 8) next.drive = value;
      return next;
    });
    advanceFromStep(step);
  };

  const handleMultiToggle = (step: StepId, value: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (step === 1) {
        const set = new Set(prev.brands);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        next.brands = [...set];
      } else if (step === 5) {
        const set = new Set(prev.usage);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        next.usage = [...set];
      } else if (step === 6) {
        const set = new Set(prev.priorities);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        next.priorities = [...set];
      }
      return next;
    });
  };

  const removeBrand = (brand: string) => {
    setSelections((prev) => ({
      ...prev,
      brands: prev.brands.filter((b) => b !== brand),
    }));
  };

  const handleStepHeaderClick = (step: StepId) => {
    if (activeStep === step) {
      openStep(null);
      return;
    }
    if (!canOpenStep(step, selections) && !isStepComplete(step, selections)) return;
    openStep(step);
  };

  const renderOptionCard = (
    stepDef: (typeof STEPS)[number],
    option: FunnelOption,
    animated = false,
  ) => {
    const card = (
      <SelectionOptionCard
        option={option}
        selected={isSelected(stepDef.id, option.label, selections)}
        onSelect={() =>
          stepDef.mode === "multi"
            ? handleMultiToggle(stepDef.id, option.label)
            : handleSingleSelect(stepDef.id, option.label)
        }
      />
    );

    if (animated && stepDef.id === 1 && !reduceMotion) {
      return (
        <motion.div key={option.label} variants={brandCardVariants} className="min-w-0 w-full">
          {card}
        </motion.div>
      );
    }

    return <div key={option.label} className="min-w-0 w-full">{card}</div>;
  };

  const renderBodyTypeGrid = (step: (typeof STEPS)[number]) => (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {bodyTypesTop.map((option) => renderOptionCard(step, option))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {bodyTypesMiddle.map((option) => renderOptionCard(step, option))}
        {/* Platzhalter: hält gleiche Card-Breite in der 4er-Reihe */}
        <div className="hidden sm:block" aria-hidden />
        <div className="hidden sm:block" aria-hidden />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
        {bodyTypesBottom.map((option) => renderOptionCard(step, option))}
      </div>
    </div>
  );

  const renderOptionsGrid = (step: (typeof STEPS)[number]) => {
    const gridClass =
      step.id === 1
        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        : step.id === 4
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          : step.id === 7 || step.id === 8
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";

    const options =
      step.id === 1 && !showAllBrands
        ? step.options.slice(0, BRAND_PREVIEW_COUNT)
        : step.options;

    return (
      <motion.div
        key={`open-${step.id}`}
        initial={
          step.id === 1 && !reduceMotion ? "hidden" : { opacity: 0, y: -6 }
        }
        animate={
          step.id === 1 && !reduceMotion ? "visible" : { opacity: 1, y: 0 }
        }
        exit={{ opacity: 0, y: -4 }}
        transition={{
          duration: step.id === 1 ? 0.32 : 0.28,
          ease: EASE_PREMIUM,
        }}
        variants={step.id === 1 && !reduceMotion ? brandGridVariants : undefined}
        className={cn("grid gap-2", gridClass)}
      >
        {options.map((option) =>
          renderOptionCard(step, option, step.id === 1),
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      layout
      className="flex flex-col gap-1.5"
      transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
    >
      {STEPS.map((step) => {
        const selected = summaryForStep(step.id, selections);
        const singleLabel = step.mode === "single" ? selected : null;
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
        const multiCount = multiCountForStep(step.id, selections);
        const budgetValue = selections.budgetMax ?? FUNNEL_BUDGET_DEFAULT;

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
                "flex w-full items-center gap-2.5 rounded-md border px-3.5 py-3 text-left transition-[background-color,box-shadow,border-color] duration-300",
                isActive
                  ? "border-border bg-white text-[#111111] shadow-premium-sm"
                  : isComplete
                    ? "border-border bg-white text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] hover:border-premium/25"
                    : "border-transparent bg-muted text-[#6b6b6b]",
                !canOpen && !isComplete && "cursor-default opacity-70",
              )}
            >
              <motion.span
                layout
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-sm text-[11px] font-bold",
                  isComplete
                    ? "bg-premium text-white"
                    : isActive
                      ? "bg-[#111111] text-white"
                      : "bg-[#e8e8e8] text-[#9a9a9a]",
                )}
                transition={{ duration: 0.32, ease: EASE_PREMIUM }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isComplete ? (
                    <motion.span
                      key={`check-${step.id}`}
                      className="flex items-center justify-center"
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.35, rotate: -48 }
                      }
                      animate={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 1, scale: 1, rotate: 0 }
                      }
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.6, rotate: 24 }
                      }
                      transition={{ duration: 0.38, ease: EASE_PREMIUM }}
                    >
                      <Check className="size-4" strokeWidth={2.5} aria-hidden />
                    </motion.span>
                  ) : (
                    <motion.span
                      key={`num-${step.id}`}
                      className="tabular-nums leading-none"
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.22, ease: EASE_PREMIUM }}
                    >
                      {step.id}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <span className="min-w-0 flex-1">
                {isComplete && !isOpen ? (
                  step.id === 1 ? (
                    <span className="inline-flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] font-semibold sm:text-sm">
                      <span className="shrink-0 text-[#9a9a9a]">{step.label}:</span>
                      {selections.brands.map((brand) => {
                        const logo = findBrandLogo(brand);
                        return (
                          <span key={brand} className="inline-flex items-center gap-1">
                            {logo ? (
                              <img
                                src={logo}
                                alt=""
                                width={28}
                                height={18}
                                className="h-4 w-auto shrink-0 object-contain"
                              />
                            ) : null}
                            <span className="text-[#111111]">{brand}</span>
                          </span>
                        );
                      })}
                    </span>
                  ) : (
                    <span className="inline-flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[13px] font-semibold sm:text-sm">
                      <span className="shrink-0 text-[#9a9a9a]">{step.label}:</span>
                      {displayIcon ? (
                        <span className="text-sm leading-none" aria-hidden>
                          {displayIcon}
                        </span>
                      ) : null}
                      <span className="text-[#111111]">{selected}</span>
                    </span>
                  )
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
                className="pt-2 pb-1"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key={`panel-${step.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex flex-col gap-2.5"
                    >
                      {step.id === 1 && selections.brands.length > 0 ? (
                        <ul
                          className="flex flex-wrap gap-2"
                          aria-label="Ausgewählte Marken"
                        >
                          {selections.brands.map((brand) => (
                            <li key={brand}>
                              <button
                                type="button"
                                onClick={() => removeBrand(brand)}
                                className="inline-flex min-h-[2rem] items-center gap-1.5 rounded-sm border border-[#3a3a3a] bg-[#4a4a4a] px-2.5 py-1 text-[12px] font-semibold text-white transition hover:border-[#2a2a2a] hover:bg-[#3a3a3a]"
                              >
                                {brand}
                                <X className="size-3 text-white/70" strokeWidth={2.25} aria-hidden />
                                <span className="sr-only">entfernen</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {step.id === 2 ? (
                        renderBodyTypeGrid(step)
                      ) : step.id === 3 ? (
                        <FunnelBudgetSlider
                          value={budgetValue}
                          onChange={(budgetMax) =>
                            setSelections((prev) => ({ ...prev, budgetMax }))
                          }
                        />
                      ) : step.id === 4 ? (
                        <>
                          <div className="rounded-sm border border-border bg-[#fafafa] px-4 py-3">
                            <div className="flex items-center justify-between text-[11px] font-semibold tabular-nums text-[#9a9a9a]">
                              <span>0 km</span>
                              <span>50k</span>
                              <span>100k</span>
                              <span>150k</span>
                              <span>200k+</span>
                            </div>
                            <div className="mt-2 grid grid-cols-5 gap-0.5" aria-hidden>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={cn(
                                    "h-1 rounded-full bg-[#e8e8e8]",
                                    selections.mileage && step.options[i]
                                      ? selections.mileage === step.options[i]!.label
                                        ? "bg-premium"
                                        : ""
                                      : "",
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          {renderOptionsGrid(step)}
                        </>
                      ) : (
                        renderOptionsGrid(step)
                      )}

                      {step.id === 1 &&
                      !showAllBrands &&
                      step.options.length > BRAND_PREVIEW_COUNT ? (
                        <button
                          type="button"
                          onClick={() => setShowAllBrands(true)}
                          className="flex w-full items-center justify-center gap-1.5 rounded-sm border border-dashed border-[#e0e0e0] bg-[#fafafa] py-2.5 text-[12px] font-semibold text-[#6b6b6b] transition hover:border-premium/30 hover:text-[#111111]"
                        >
                          Mehr anzeigen
                          <ChevronDown className="size-3.5" />
                        </button>
                      ) : null}

                      {needsContinueButton(step) ? (
                        <FunnelContinueButton
                          disabled={
                            step.id === 3
                              ? selections.budgetMax == null
                              : multiCount === 0
                          }
                          onClick={() => advanceFromStep(step.id)}
                        />
                      ) : null}
                    </motion.div>
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
