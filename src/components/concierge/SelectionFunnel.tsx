"use client";

import { SelectionOptionCard } from "@/components/concierge/SelectionOptionCard";
import {
  bodyTypes,
  brands,
  budgets,
  findOptionIcon,
  findOptionLogo,
  type FunnelOption,
} from "@/data/selection-funnel-options";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type StepId = 1 | 2 | 3;

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/** Dezentes Stagger beim ersten Öffnen der Marken-Auswahl (Startseite). */
const brandGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.14 },
  },
};

const brandCardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: EASE_PREMIUM },
  },
};

const STEPS: {
  id: StepId;
  title: string;
  label: string;
  options: FunnelOption[];
}[] = [
  { id: 1, title: "Marke auswählen", label: "Marke", options: brands },
  { id: 2, title: "Fahrzeugart auswählen", label: "Fahrzeugart", options: bodyTypes },
  { id: 3, title: "Budget festlegen", label: "Budget", options: budgets },
];

function selectionForStep(
  step: StepId,
  brand: string | null,
  body: string | null,
  budget: string | null,
): string | null {
  if (step === 1) return brand;
  if (step === 2) return body;
  return budget;
}

type SelectionFunnelProps = {
  onSelectionChange?: (summary: {
    brand: string | null;
    bodyType: string | null;
    budget: string | null;
  }) => void;
  onAllCompleteChange?: (complete: boolean) => void;
};

export function SelectionFunnel({
  onSelectionChange,
  onAllCompleteChange,
}: SelectionFunnelProps) {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<StepId | null>(1);
  const onSelectionChangeRef = useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;
  const panelRefs = useRef<Record<StepId, HTMLDivElement | null>>({
    1: null,
    2: null,
    3: null,
  });
  const [panelHeights, setPanelHeights] = useState<Record<StepId, number>>({
    1: 0,
    2: 0,
    3: 0,
  });

  const measurePanel = useCallback((step: StepId) => {
    const el = panelRefs.current[step];
    if (!el) return;
    setPanelHeights((h) => ({ ...h, [step]: el.scrollHeight }));
  }, []);

  useEffect(() => {
    ([1, 2, 3] as StepId[]).forEach(measurePanel);
  }, [activeStep, selectedBrand, selectedBodyType, selectedBudget, measurePanel]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      ([1, 2, 3] as StepId[]).forEach(measurePanel);
    });
    ([1, 2, 3] as StepId[]).forEach((step) => {
      const el = panelRefs.current[step];
      if (el) ro.observe(el);
    });
    return () => ro.disconnect();
  }, [measurePanel]);

  useEffect(() => {
    onSelectionChangeRef.current?.({
      brand: selectedBrand,
      bodyType: selectedBodyType,
      budget: selectedBudget,
    });
  }, [selectedBrand, selectedBodyType, selectedBudget]);

  const allComplete =
    selectedBrand != null &&
    selectedBodyType != null &&
    selectedBudget != null;

  useEffect(() => {
    onAllCompleteChange?.(allComplete);
  }, [allComplete, onAllCompleteChange]);

  const handleSelect = (step: StepId, value: string) => {
    if (step === 1) setSelectedBrand(value);
    else if (step === 2) setSelectedBodyType(value);
    else setSelectedBudget(value);

    if (step < 3) {
      setActiveStep((step + 1) as StepId);
    } else {
      setActiveStep(null);
    }
  };

  const handleStepHeaderClick = (step: StepId) => {
    if (activeStep === step) {
      setActiveStep(null);
      return;
    }

    const canOpen =
      step === 1 ||
      (step === 2 && selectedBrand != null) ||
      (step === 3 && selectedBodyType != null);
    if (!canOpen) return;
    setActiveStep(step);
  };

  return (
    <motion.div
      layout
      className="flex flex-col gap-1.5"
      transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
    >
      {STEPS.map((step) => {
        const selected = selectionForStep(
          step.id,
          selectedBrand,
          selectedBodyType,
          selectedBudget,
        );
        const selectedIcon = findOptionIcon(step.options, selected);
        const selectedLogo = findOptionLogo(step.options, selected);
        const isOpen = activeStep === step.id;
        const isComplete = selected != null;
        const isActive = isOpen;
        const canOpen =
          step.id === 1 ||
          (step.id === 2 && selectedBrand != null) ||
          (step.id === 3 && selectedBodyType != null);

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
                "flex w-full items-center gap-2 rounded-none border px-3 py-2 text-left transition-[background-color,box-shadow,border-color,transform] duration-300",
                isActive
                  ? "border-[#111111]/10 bg-[#111111] text-white shadow-[0_8px_24px_-8px_rgba(17,17,17,0.35)]"
                  : isComplete
                    ? "border-[#eaeaea] bg-white text-[#111111] shadow-[0_1px_3px_rgba(17,17,17,0.05)] hover:border-premium/30 hover:bg-[#fafafa]"
                    : "border-[#eaeaea] bg-[#f8f8f7] text-[#6b6b6b] shadow-[0_1px_2px_rgba(17,17,17,0.03)]",
                !canOpen && !isComplete && "cursor-default opacity-70",
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-none text-[10px] font-bold",
                  isActive
                    ? "bg-premium/20 text-[#f0cc5a]"
                    : isComplete
                      ? "bg-[#111111]/[0.06] text-[#111111]"
                      : "bg-[#eaeaea] text-[#9a9a9a]",
                )}
              >
                {step.id}
              </span>
              <span className="min-w-0 flex-1 truncate">
                {isComplete && !isOpen ? (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold">
                    <span className={isActive ? "text-white/70" : "text-[#9a9a9a]"}>
                      {step.label}:
                    </span>
                    {selectedLogo ? (
                      <img
                        src={selectedLogo}
                        alt=""
                        width={28}
                        height={18}
                        className="h-4 w-auto object-contain"
                      />
                    ) : selectedIcon ? (
                      <span className="text-sm leading-none" aria-hidden>
                        {selectedIcon}
                      </span>
                    ) : null}
                    <span className={isActive ? "text-white" : "text-[#111111]"}>
                      {selected}
                    </span>
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-[12px] font-semibold",
                      isActive ? "text-white" : "text-[#111111]",
                    )}
                  >
                    {step.title}
                  </span>
                )}
              </span>
              <ChevronDown
                className={cn(
                  "size-3.5 shrink-0 transition-transform duration-300",
                  isOpen ? "rotate-180" : "rotate-0",
                  isActive ? "text-white/70" : "text-[#9a9a9a]",
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
                      className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4"
                    >
                      {step.options.map((option) =>
                        step.id === 1 && !reduceMotion ? (
                          <motion.div
                            key={option.label}
                            variants={brandCardVariants}
                            className="min-w-0"
                          >
                            <SelectionOptionCard
                              option={option}
                              selected={selected === option.label}
                              onSelect={() => handleSelect(step.id, option.label)}
                            />
                          </motion.div>
                        ) : (
                          <SelectionOptionCard
                            key={option.label}
                            option={option}
                            selected={selected === option.label}
                            onSelect={() => handleSelect(step.id, option.label)}
                          />
                        ),
                      )}
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
