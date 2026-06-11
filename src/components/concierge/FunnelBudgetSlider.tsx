"use client";

import {
  FUNNEL_BUDGET_MAX,
  FUNNEL_BUDGET_MIN,
  FUNNEL_BUDGET_STEP,
} from "@/types/funnel";
import { cn } from "@/lib/utils";
import { useId } from "react";

type FunnelBudgetSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

function formatBudget(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function FunnelBudgetSlider({ value, onChange }: FunnelBudgetSliderProps) {
  const id = useId();
  const listId = `${id}-ticks`;
  const pct =
    ((value - FUNNEL_BUDGET_MIN) / (FUNNEL_BUDGET_MAX - FUNNEL_BUDGET_MIN)) * 100;

  return (
    <div className="relative overflow-hidden rounded-sm border border-border bg-[#fafafa] px-4 py-5 sm:px-5 sm:py-6">
      {/* Akzent-Hairline oben */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium/35 to-transparent"
      />
      <p className="text-center font-display text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-tight text-[#111111]">
        Budget: bis{" "}
        <span className="tabular-nums text-premium">{formatBudget(value)}</span>
      </p>
      <p className="mt-1.5 text-center text-[12px] text-[#9a9a9a] sm:text-[13px]">
        Ziehe den Regler — Schritte à {FUNNEL_BUDGET_STEP.toLocaleString("de-DE")} €
      </p>

      <div className="relative mt-9">
        <div className="relative px-2.5">
          <div
            className="pointer-events-none absolute top-1/2 right-2.5 left-2.5 h-1.5 -translate-y-1/2 rounded-full bg-[#e8e8e8] shadow-[inset_0_1px_2px_rgb(17_17_17/0.06)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/2 left-2.5 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-premium/80 to-premium transition-[width] duration-150 ease-out"
            style={{ width: `calc(${pct}% * (100% - 1.25rem) / 100)` }}
            aria-hidden
          />
          {/* Tick-Punkte auf der Schiene (0 / 5k / 10k / 15k) */}
          <div
            className="pointer-events-none absolute inset-x-2.5 top-1/2 -translate-y-1/2"
            aria-hidden
          >
            {[0, 33.334, 66.667, 100].map((tick) => (
              <span
                key={tick}
                className={cn(
                  "absolute top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150",
                  pct >= tick ? "bg-white/85" : "bg-[#cfcfcf]",
                )}
                style={{ left: `${tick}%` }}
              />
            ))}
          </div>
          <div
            className="pointer-events-none absolute -top-8 left-2.5 right-2.5"
            aria-hidden
          >
            <div
              className="absolute rounded-sm border border-[#eeeeee] bg-white px-2.5 py-1 text-[11px] font-bold tabular-nums tracking-tight text-[#111111] shadow-[0_8px_22px_rgba(17,17,17,0.1)] transition-[left] duration-150 ease-out"
              style={{
                left: `${pct}%`,
                transform: "translateX(-50%)",
              }}
            >
              {formatBudget(value)}
              {/* Pfeilspitze zum Thumb */}
              <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#eeeeee] bg-white" />
            </div>
          </div>
          <input
            id={id}
            type="range"
            min={FUNNEL_BUDGET_MIN}
            max={FUNNEL_BUDGET_MAX}
            step={FUNNEL_BUDGET_STEP}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label="Maximales Budget in Euro"
            aria-valuemin={FUNNEL_BUDGET_MIN}
            aria-valuemax={FUNNEL_BUDGET_MAX}
            aria-valuenow={value}
            aria-valuetext={formatBudget(value)}
            list={listId}
            className={cn(
              "funnel-budget-range relative z-[1] block w-full cursor-pointer appearance-none bg-transparent",
              "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#111111]",
              "[&::-webkit-slider-thumb]:shadow-[0_4px_14px_rgb(17_17_17_/_18%)]",
              "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150",
              "hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-110",
              "active:[&::-webkit-slider-thumb]:shadow-[0_4px_16px_rgb(232_90_40_/_35%)]",
              "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2",
              "[&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#111111]",
              "[&::-moz-range-thumb]:shadow-[0_4px_14px_rgb(17_17_17_/_18%)]",
            )}
          />
          <datalist id={listId}>
            <option value={0} />
            <option value={5000} />
            <option value={10000} />
            <option value={15000} />
          </datalist>
        </div>
      </div>

      <div className="mt-3.5 flex justify-between text-[11px] font-medium tabular-nums text-[#9a9a9a]">
        <span>{formatBudget(FUNNEL_BUDGET_MIN)}</span>
        <span>5.000 €</span>
        <span>10.000 €</span>
        <span className="font-semibold text-[#6b6b6b]">{formatBudget(FUNNEL_BUDGET_MAX)}</span>
      </div>

      {/* Standard-Reset entfernt (gewünscht) */}
    </div>
  );
}
