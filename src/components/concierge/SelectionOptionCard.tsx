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
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={option.label}
      className={cn(
        "group/card flex min-h-[5rem] w-full flex-col items-center justify-center rounded-none border px-2.5 text-center transition-[background-color,border-color,box-shadow] duration-250 ease-out",
        option.logoSrc
          ? option.logoSize === "badge"
            ? "gap-0.5 py-2"
            : "gap-0.5 py-2"
          : "gap-0.5 py-2.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium/35 focus-visible:ring-offset-2",
        selected
          ? option.logoSrc
            ? "border-premium bg-white text-[#111111] shadow-[0_10px_28px_-10px_rgba(201,162,39,0.28)] ring-2 ring-premium/25"
            : "border-[#111111] bg-[#111111] text-white shadow-[0_10px_28px_-10px_rgba(17,17,17,0.45)]"
          : "border-[#eaeaea] bg-[#f8f8f7] text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] hover:border-premium/35 hover:bg-white hover:shadow-[0_10px_24px_-12px_rgba(17,17,17,0.12)]",
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
              : "h-11 max-w-[5.25rem]",
          )}
          aria-hidden
        >
          {/* natives img: Logos werden oft ausgetauscht — kein Next-Image-Cache */}
          <img
            src={getLogoUrl(option.logoSrc, option.logoRev)}
            alt=""
            width={400}
            height={240}
            className={cn(
              "block object-contain object-center [image-rendering:-webkit-optimize-contrast] transition-transform duration-250 ease-out will-change-transform backface-hidden",
              isVehicleBadge(option.logoSize)
                ? option.logoImgClassName
                  ? "h-auto w-auto"
                  : "h-full w-full"
                : option.logoSize === "sm"
                  ? "max-h-9 max-w-[4.25rem] w-auto"
                  : "max-h-11 max-w-[5.25rem] w-auto",
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
            "text-[1.5rem] leading-[0.85] transition-transform duration-250 ease-out will-change-transform backface-hidden",
            !selected && "group-hover/card:scale-110",
            selected && "drop-shadow-sm",
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
        )}
      >
        {option.label}
      </span>
    </motion.button>
  );
}
