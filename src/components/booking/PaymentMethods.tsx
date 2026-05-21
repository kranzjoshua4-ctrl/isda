"use client";

import { cn } from "@/lib/utils";
import type { PaymentMethodId } from "@/types/concierge";
import { PAYMENT_METHOD_IDS, PAYMENT_METHOD_LABELS } from "@/types/concierge";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { SimpleIcon } from "simple-icons";
import {
  siApplepay,
  siGooglepay,
  siKlarna,
  siPaypal,
  siSepa,
  siVisa,
} from "simple-icons";

function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={cn("size-5 shrink-0 sm:size-6", className)}
      aria-hidden
    >
      <title>{icon.title}</title>
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}

const meta: Record<
  PaymentMethodId,
  {
    icon: SimpleIcon;
    tint: string;
    subtitle: string;
  }
> = {
  paypal: {
    icon: siPaypal,
    tint: "text-[#003087]",
    subtitle: "Schnell & geschützt",
  },
  klarna: {
    icon: siKlarna,
    tint: "text-[#FFA8CD]",
    subtitle: "Später bezahlen oder Raten",
  },
  sepa: {
    icon: siSepa,
    tint: "text-[#0f172a]",
    subtitle: "Bequem per Bankeinzug",
  },
  card: {
    icon: siVisa,
    tint: "text-[#1a1f71]",
    subtitle: "Visa, Mastercard & Amex",
  },
  apple_pay: {
    icon: siApplepay,
    tint: "text-[#0f172a]",
    subtitle: "Wallet auf dem Gerät",
  },
  google_pay: {
    icon: siGooglepay,
    tint: "text-[#5f6368]",
    subtitle: "Google Wallet",
  },
};

export function PaymentMethods({
  value,
  onChange,
  className,
  compact = false,
}: {
  value: PaymentMethodId | null;
  onChange: (id: PaymentMethodId) => void;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn(compact ? "space-y-2" : "space-y-3", className)}>
      <div
        role="radiogroup"
        aria-label="Zahlungsart"
        className={cn("flex min-h-0 flex-col", compact ? "gap-1.5" : "gap-2")}
      >
        {PAYMENT_METHOD_IDS.map((id, i) => {
          const m = meta[id];
          const active = value === id;
          return (
            <motion.button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i, duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onChange(id)}
              className={cn(
                "group relative flex w-full items-center overflow-hidden rounded-none border text-left transition-[transform,border-color,box-shadow,background-color] duration-200 ease-out",
                compact
                  ? "min-h-[38px] gap-2 px-2.5 py-2 sm:gap-2 sm:px-2.5 sm:py-2"
                  : "min-h-[44px] gap-2.5 rounded-none px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-2.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                active
                  ? "border-[#0a0a0a]/45 bg-[rgba(10,10,10,0.06)] shadow-[0_0_0_1px_rgba(10,10,10,0.12),0_6px_18px_-10px_rgba(15,23,42,0.08)]"
                  : "border-[rgba(148,163,184,0.35)] bg-white/90 hover:-translate-y-px hover:border-[#0a0a0a]/30 hover:shadow-[0_6px_20px_-10px_rgba(15,23,42,0.1)]",
              )}
            >
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-none border p-0.5",
                  compact ? "size-8" : "size-9 rounded-none p-1 sm:size-10",
                  active
                    ? "border-[rgba(10,10,10,0.18)] bg-white"
                    : "border-[rgba(148,163,184,0.35)] bg-[#f8fafc]",
                )}
              >
                <BrandIcon
                  icon={m.icon}
                  className={cn(m.tint, compact ? "size-3.5" : "size-4 sm:size-5")}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block font-semibold leading-tight tracking-tight text-[#0f172a]",
                    compact ? "text-[12px]" : "text-[13px]",
                  )}
                >
                  {PAYMENT_METHOD_LABELS[id]}
                </span>
                <span
                  className={cn(
                    "block leading-snug text-[#64748b]",
                    compact ? "mt-0 text-[10px] leading-tight" : "mt-0.5 text-[11px]",
                  )}
                >
                  {m.subtitle}
                </span>
              </span>
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-none border-2 transition-colors duration-200",
                  compact ? "size-4" : "size-5",
                  active
                    ? "border-[#0a0a0a] bg-cta-navy text-white"
                    : "border-[rgba(148,163,184,0.55)] bg-transparent group-hover:border-[#0a0a0a]/35",
                )}
                aria-hidden
              >
                {active ? (
                  <Check className={cn("stroke-[2.5]", compact ? "size-2.5" : "size-3")} />
                ) : null}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
