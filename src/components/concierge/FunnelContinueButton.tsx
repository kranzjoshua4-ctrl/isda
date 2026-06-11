"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type FunnelContinueButtonProps = {
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

export function FunnelContinueButton({
  disabled = false,
  onClick,
  className,
}: FunnelContinueButtonProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 -mx-0.5 bg-gradient-to-t from-white from-55% to-transparent pt-3 pb-0.5 sm:static sm:bg-none sm:pt-2.5 sm:pb-0",
        className,
      )}
    >
      <button
        type="button"
        aria-disabled={disabled}
        onClick={() => {
          if (disabled) return;
          onClick();
        }}
        className={cn(
          "group flex w-full min-h-[2.75rem] items-center justify-center gap-2 rounded-sm px-4 text-[12.5px] font-bold tracking-tight transition duration-250 ease-out sm:min-h-[3rem] sm:px-5 sm:text-[13px]",
          disabled
            ? "cursor-not-allowed bg-[#e8e8e8] text-[#9a9a9a] shadow-none"
            : "bg-cta-navy text-white shadow-cta hover:bg-cta-navy-hover hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgb(232_90_40_/_28%)] active:translate-y-0 active:scale-[0.99]",
        )}
      >
        Weiter
        <ArrowRight
          className={cn(
            "size-4 transition-transform duration-250",
            !disabled && "group-hover:translate-x-0.5",
          )}
          strokeWidth={2.25}
          aria-hidden
        />
      </button>
    </div>
  );
}
