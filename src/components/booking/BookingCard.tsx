"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";

export type BookingCardProps = {
  dateLabel: string;
  slot: string;
  priceLabel?: string;
  /** Kompaktere Darstellung (z. B. Sticky-Sidebar auf /termin) */
  compact?: boolean;
  className?: string;
};

export function BookingCard({
  dateLabel,
  slot,
  priceLabel = "17,90 €",
  compact = false,
  className,
}: BookingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-sm border border-border bg-white shadow-[0_10px_30px_rgb(17_17_17/0.05)]",
        compact ? "p-2.5 md:p-3" : "p-5 sm:p-6",
        className,
      )}
    >
      {compact ? (
        <div className="flex items-stretch gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#9a9a9a]">
              Beratungstermin
            </p>
            <div className="flex items-start gap-1.5">
              <CalendarDays
                className="mt-0.5 size-3 shrink-0 text-premium"
                aria-hidden
              />
              <p className="text-[12px] font-semibold leading-snug tracking-tight text-[#111111]">
                {dateLabel}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-2.5 shrink-0 text-[#9a9a9a]" aria-hidden />
              <p className="font-display text-[13px] font-semibold leading-none tabular-nums text-[#111111]">
                {slot}
              </p>
              <span className="text-[10px] font-medium text-[#9a9a9a]">Uhr</span>
            </div>
          </div>

          <div className="w-px self-stretch bg-border" aria-hidden />

          <div className="flex shrink-0 flex-col items-end justify-center gap-0.5 pr-1.5 text-right">
            <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
              Servicegebühr
            </p>
            <p className="font-display text-[15px] font-semibold tabular-nums leading-none tracking-tight text-[#111111]">
              {priceLabel}
            </p>
            <p className="text-[9px] leading-snug text-[#9a9a9a]">einmalig</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#9a9a9a]">
              Beratungstermin
            </p>

            <div className="mt-3 flex items-start gap-3">
              <span
                className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-premium/10 text-premium"
                aria-hidden
              >
                <CalendarDays className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
                  Datum
                </p>
                <p className="mt-1 text-pretty font-display text-base font-semibold leading-tight tracking-tight text-[#111111] sm:text-lg">
                  {dateLabel}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <span
                className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-[#fafafa] text-[#6b6b6b]"
                aria-hidden
              >
                <Clock className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
                  Uhrzeit
                </p>
                <p className="mt-1 font-display text-base font-semibold tabular-nums leading-tight tracking-tight text-[#111111] sm:text-lg">
                  {slot}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden w-px self-stretch bg-border sm:block" aria-hidden />

          <div className="flex shrink-0 flex-col items-start justify-center rounded-sm border border-border bg-[#fafafa] px-4 py-3 sm:items-end sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-right">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#9a9a9a]">
              Servicegebühr
            </p>
            <p className="mt-1 font-display text-xl font-semibold tabular-nums tracking-tight text-[#111111] sm:text-2xl">
              {priceLabel}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-[#9a9a9a]">
              einmalig nach Bestätigung
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
