"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const WEEKDAYS_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export type PremiumCalendarProps = {
  selected: Date | null;
  onSelect: (d: Date) => void;
  className?: string;
};

const monthFmt = new Intl.DateTimeFormat("de-DE", { month: "short" });
const fullDateFmt = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function PremiumCalendar({ selected, onSelect, className }: PremiumCalendarProps) {
  const today = startOfDay(new Date());
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i));

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {days.map((d, i) => {
          const active = Boolean(selected && sameDay(d, selected));
          const isToday = sameDay(d, today);
          return (
            <motion.button
              key={d.toISOString()}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * i, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onSelect(d)}
              aria-pressed={active}
              aria-label={`${fullDateFmt.format(d)}${isToday ? " (heute)" : ""}`}
              className={cn(
                "group relative flex min-h-[4.25rem] flex-col items-center justify-center rounded-sm border px-1.5 py-2.5 text-center transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                active
                  ? "border-transparent bg-cta-navy text-white shadow-cta"
                  : "border-border bg-[#fafafa] hover:-translate-y-0.5 hover:border-premium/30 hover:bg-white hover:shadow-[0_8px_24px_-10px_rgb(17_17_17/0.12)] active:translate-y-0",
              )}
            >
              {isToday && !active ? (
                <span className="absolute left-1 top-1 rounded bg-premium/10 px-1 py-px text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-premium">
                  Heute
                </span>
              ) : null}
              {isToday && active ? (
                <span className="absolute left-1 top-1 rounded bg-white/15 px-1 py-px text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-white/90">
                  Heute
                </span>
              ) : null}
              <span
                className={cn(
                  "text-[0.6rem] font-semibold uppercase tracking-[0.14em]",
                  active ? "text-white/85" : "text-[#9a9a9a]",
                )}
              >
                {WEEKDAYS_SHORT[d.getDay()]}
              </span>
              <span
                className={cn(
                  "mt-0.5 text-lg font-semibold tabular-nums leading-none tracking-tight",
                  active ? "text-white" : "text-[#111111]",
                )}
              >
                {d.getDate()}
              </span>
              <span
                className={cn(
                  "mt-0.5 text-[0.65rem] capitalize leading-tight",
                  active ? "text-white/80" : "text-[#9a9a9a]",
                )}
              >
                {monthFmt.format(d)} {d.getFullYear()}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
