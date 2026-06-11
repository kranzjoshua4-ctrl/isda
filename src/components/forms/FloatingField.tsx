"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

type FloatingFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  /** Inline-Fehlermeldung (rot) — null/undefined blendet sie aus */
  error?: string | null;
  className?: string;
};

export function FloatingField({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  autoComplete,
  error,
  className,
}: FloatingFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
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
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "peer w-full rounded-none border bg-white/95 px-4 pb-2.5 pt-6 text-[15px] font-medium tracking-tight text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] outline-none transition",
          "placeholder:text-transparent",
          error
            ? "border-red-400/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/12"
            : "border-[rgba(17,17,17,0.1)] hover:border-[#111111]/20 focus:border-premium/45 focus:ring-2 focus:ring-premium/15",
        )}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-[1.8rem] origin-left -translate-y-1/2 text-[15px] transition-all duration-200 ease-out",
          "text-[#6b6b6b] peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-[#111111]",
          filled && "top-3 -translate-y-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111111]",
        )}
      >
        {label}
      </label>
      {error ? (
        <p id={errorId} className="mt-1 text-[11px] font-medium leading-snug text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
