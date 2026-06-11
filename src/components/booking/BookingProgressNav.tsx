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
        "mt-6 flex w-full max-w-none flex-nowrap items-center justify-start gap-3.5 text-xs font-semibold sm:mt-7 sm:gap-4 sm:text-[13px]",
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
            className="rounded-md bg-premium px-4 py-2 text-white shadow-[0_8px_24px_rgb(232_90_40/0.28)]"
          >
            {label}
          </motion.span>
        ) : isDone ? (
          <Link
            href={s.href}
            className="rounded-md border border-border bg-white px-4 py-2 text-[#6b6b6b] transition hover:border-premium/30 hover:text-[#111111]"
          >
            {label}
          </Link>
        ) : (
          <span className="rounded-md border border-border bg-white px-4 py-2 text-[#9a9a9a]">
            {label}
          </span>
        );

        return (
          <motion.span
            key={s.label}
            variants={segmentVariants}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap"
          >
            {node}
            {i < STEPS.length - 1 ? (
              <motion.span variants={chevronVariants} className="inline-flex">
                <ChevronRight className="size-4 shrink-0 text-premium/70" aria-hidden />
              </motion.span>
            ) : null}
          </motion.span>
        );
      })}
    </motion.nav>
  );
}
