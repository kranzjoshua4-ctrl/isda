"use client";

import { getLogoUrl, type FunnelOption } from "@/data/selection-funnel-options";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SelectionOptionCardProps = {
  option: FunnelOption;
  selected: boolean;
  onSelect: () => void;
};

function isVehicleBadge(logoSize?: FunnelOption["logoSize"]) {
  return logoSize === "badge" || logoSize === "badge-lg";
}

export function SelectionOptionCard({
  option,
  selected,
  onSelect,
}: SelectionOptionCardProps) {
  const isBrandLogo = Boolean(option.logoSrc) && !isVehicleBadge(option.logoSize);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={option.label}
      className={cn(
        "group/card flex w-full flex-col items-center justify-center text-center transition-[background-color,border-color,box-shadow,transform] duration-250 ease-out",
        isBrandLogo
          ? "min-h-[3.75rem] gap-1 rounded-sm border bg-white px-1.5 py-2.5 shadow-[0_2px_8px_rgba(17,17,17,0.04)] lg:min-h-[3.5rem] lg:px-2 lg:py-2"
          : "min-h-[5rem] gap-0.5 rounded-sm border px-2.5 py-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium/35 focus-visible:ring-offset-2",
        selected
          ? option.logoSrc
            ? "border-premium/40 bg-white ring-2 ring-premium/20 shadow-[0_8px_24px_-8px_rgba(232,90,40,0.22)]"
            : "border-premium bg-cta-navy text-white shadow-cta"
          : isBrandLogo
            ? "border-[#eeeeee] hover:border-premium/30 hover:shadow-[0_6px_16px_-8px_rgba(17,17,17,0.1)]"
            : "border-border bg-[#f8f8f7] text-[#111111] hover:border-premium/30 hover:bg-white",
      )}
    >
      {option.logoSrc ? (
        <span
          className={cn(
            "relative flex w-full shrink-0 items-center justify-center leading-[0]",
            isVehicleBadge(option.logoSize)
              ? option.logoSize === "badge-lg"
                ? "h-[5.5rem] max-w-[10.5rem]"
                : "h-[4.75rem] max-w-[9rem]"
              : "mx-auto flex h-9 w-full max-w-[5rem] items-center justify-center",
          )}
          aria-hidden
        >
          <img
            src={getLogoUrl(option.logoSrc, option.logoRev)}
            alt=""
            width={400}
            height={240}
            className={cn(
              "mx-auto block object-contain object-center transition-transform duration-250 ease-out",
              isVehicleBadge(option.logoSize)
                ? option.logoImgClassName
                  ? "h-auto w-auto max-h-[3rem] max-w-[6rem]"
                  : "h-full w-full"
                : "h-9 w-auto max-w-[4.75rem]",
              !selected && "group-hover/card:scale-105",
              option.logoImgClassName,
            )}
            loading="lazy"
            decoding="async"
          />
        </span>
      ) : (
        <span
          className={cn(
            "text-[1.5rem] leading-[0.85] transition-transform duration-250 ease-out",
            !selected && "group-hover/card:scale-110",
          )}
          aria-hidden
        >
          {option.icon}
        </span>
      )}
      <span
        className={cn(
          "shrink-0 text-[11px] font-semibold leading-tight tracking-tight",
          selected && !option.logoSrc ? "text-white" : "text-[#111111]",
          isBrandLogo && "sr-only",
        )}
      >
        {option.label}
      </span>
    </motion.button>
  );
}
