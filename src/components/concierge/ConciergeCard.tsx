"use client";

import { cn } from "@/lib/utils";
import { OPEN_LABEL } from "@/types/concierge";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ConciergeCardProps = {
  label: string;
  value: string;
  delay?: number;
  className?: string;
  icon?: ReactNode;
};

export function ConciergeCard({
  label,
  value,
  delay = 0,
  className,
  icon,
}: ConciergeCardProps) {
  const open = value === OPEN_LABEL;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-none border border-[rgba(148,163,184,0.28)] bg-white/90 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06),0_4px_12px_rgba(15,23,42,0.04)] backdrop-blur-sm transition duration-300",
        "hover:border-[#0a0a0a]/22 hover:shadow-[0_20px_52px_-20px_rgba(15,23,42,0.12),0_8px_22px_rgba(15,23,42,0.06)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-px rounded-none bg-gradient-to-b from-white/80 to-transparent opacity-50" />
      <div className="relative flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
            {label}
          </p>
          {open ? (
            <p className="mt-2 text-[15px] font-normal leading-snug tracking-normal text-[#64748b]">
              Noch offen
            </p>
          ) : (
            <p className="mt-2 line-clamp-4 text-base font-semibold leading-snug tracking-tight text-[#0f172a] sm:text-[1.05rem]">
              {value}
            </p>
          )}
        </div>
        {icon ? (
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-none border border-[rgba(148,163,184,0.35)] bg-[#f8fafc] text-[#0a0a0a] transition",
              "group-hover:border-[#0a0a0a]/25 group-hover:bg-white",
            )}
          >
            <span className="opacity-90 [&>svg]:size-[1.05rem]">{icon}</span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
