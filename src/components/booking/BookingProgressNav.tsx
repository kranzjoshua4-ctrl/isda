"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Step = {
  label: string;
  href: string;
};

const STEPS: Step[] = [
  { label: "Anfrage", href: "/#eingabe" },
  { label: "Termin", href: "/termin" },
  { label: "Rückruf", href: "/termin#kontakt" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
};

const segmentVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const chevronVariants = {
  hidden: { opacity: 0, x: -4 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export type BookingProgressNavProps = {
  active: 1 | 2 | 3;
  className?: string;
};

export function BookingProgressNav({ active, className }: BookingProgressNavProps) {
  return (
    <motion.nav
      aria-label="Buchungsfortschritt"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold sm:mt-7 sm:text-xs",
        className,
      )}
    >
      {STEPS.map((s, i) => {
        const stepNumber = (i + 1) as 1 | 2 | 3;
        const isActive = stepNumber === active;
        const isDone = stepNumber < active;
        const label = `${stepNumber} ${s.label}`;

        const node = isActive ? (
          <motion.span
            aria-current="step"
            initial={{ boxShadow: "0 4px 14px -6px rgba(0,0,0,0)" }}
            animate={{
              boxShadow: [
                "0 4px 14px -6px rgba(0,0,0,0)",
                "0 10px 28px -8px rgba(0,0,0,0.55)",
                "0 4px 14px -6px rgba(0,0,0,0.45)",
              ],
            }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className="rounded-full bg-cta-navy px-3 py-1.5 text-white"
          >
            {label}
          </motion.span>
        ) : isDone ? (
          <Link
            href={s.href}
            className="rounded-full border border-[rgba(148,163,184,0.35)] bg-[#eef0f3] px-3 py-1.5 text-[#475569] transition duration-200 hover:border-[#0a0a0a]/40 hover:bg-[#e4e6ea] hover:text-[#0a0a0a]"
          >
            {label}
          </Link>
        ) : (
          <span className="rounded-full border border-[rgba(148,163,184,0.28)] bg-[#eef0f3] px-3 py-1.5 text-[#64748b]">
            {label}
          </span>
        );

        return (
          <motion.span
            key={s.label}
            variants={segmentVariants}
            className="flex items-center gap-1.5 will-change-transform"
          >
            {node}
            {i < STEPS.length - 1 ? (
              <motion.span variants={chevronVariants} className="inline-flex">
                <ChevronRight className="size-3.5 shrink-0 text-[#94a3b8]" aria-hidden />
              </motion.span>
            ) : null}
          </motion.span>
        );
      })}
    </motion.nav>
  );
}
