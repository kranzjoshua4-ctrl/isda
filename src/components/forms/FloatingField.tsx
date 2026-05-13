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
          "peer w-full rounded-xl border bg-white/95 px-4 pb-2.5 pt-6 text-[15px] font-medium tracking-tight text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition",
          "border-[rgba(148,163,184,0.35)] placeholder:text-transparent",
          "hover:border-[#0a0a0a]/25 focus:border-[#0a0a0a]/45 focus:ring-2 focus:ring-black/10",
        )}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-[15px] transition-all duration-200 ease-out",
          "text-[#64748b] peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[#0a0a0a]",
          filled && "top-3 -translate-y-0 text-[11px] font-semibold uppercase tracking-wider text-[#0f172a]",
        )}
      >
        {label}
      </label>
    </div>
  );
}
