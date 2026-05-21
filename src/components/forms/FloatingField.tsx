"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

type FloatingFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
};

export function FloatingField({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  className,
}: FloatingFieldProps) {
  const id = useId();
  const filled = value.trim().length > 0;

  return (
    <div className={cn("group relative", className)}>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "peer w-full rounded-none border bg-white/95 px-4 pb-2.5 pt-6 text-[15px] font-medium tracking-tight text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] outline-none transition",
          "border-[rgba(17,17,17,0.1)] placeholder:text-transparent",
          "hover:border-[#111111]/20 focus:border-premium/45 focus:ring-2 focus:ring-premium/15",
        )}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-[15px] transition-all duration-200 ease-out",
          "text-[#6b6b6b] peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-[#111111]",
          filled && "top-3 -translate-y-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111111]",
        )}
      >
        {label}
      </label>
    </div>
  );
}
