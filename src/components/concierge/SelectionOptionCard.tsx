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
          ? "min-h-[6.25rem] gap-2 rounded-sm border bg-white px-1.5 py-3 shadow-[0_2px_8px_rgba(17,17,17,0.04)] lg:min-h-[6rem] lg:px-2 lg:py-3"
          : "min-h-[4.75rem] gap-1.5 rounded-sm border px-2.5 py-2.5 sm:min-h-[5rem]",
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
                ? "h-[4.75rem] max-w-[9.25rem]"
                : "h-[4.1rem] max-w-[8rem]"
              : "mx-auto flex h-[3.25rem] w-full max-w-[7rem] items-center justify-center",
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
                  ? "h-auto w-auto max-h-[2.6rem] max-w-[5.4rem]"
                  : "h-full w-full"
                : option.logoSize === "sm"
                  ? "h-[2.5rem] w-auto max-w-[5.25rem]"
                  : "h-[3.25rem] w-auto max-w-[6.5rem]",
              !selected && "group-hover/card:scale-105",
              option.logoImgClassName,
            )}
            loading="lazy"
            decoding="async"
          />
        </span>
      ) : option.lucideIcon ? (
        <option.lucideIcon
          className={cn(
            "mx-auto block size-[1.25rem] transition-[transform,color] duration-250 ease-out",
            selected ? "text-white" : "text-[#4a4a4a] group-hover/card:scale-105",
          )}
          strokeWidth={1.65}
          aria-hidden
        />
      ) : option.icon ? (
        <span
          className={cn(
            "text-[1.5rem] leading-[0.85] transition-transform duration-250 ease-out",
            !selected && "group-hover/card:scale-110",
          )}
          aria-hidden
        >
          {option.icon}
        </span>
      ) : null}
      <span
        className={cn(
          "shrink-0 leading-tight tracking-tight",
          isBrandLogo
            ? "text-[12.5px] font-semibold text-[#111111]"
            : "text-[11px] font-semibold",
          selected && !option.logoSrc ? "text-white" : "text-[#111111]",
        )}
      >
        {option.label}
      </span>
    </motion.button>
  );
}
