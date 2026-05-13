"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useRef } from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className,
  type = "button",
  disabled,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.2 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.2 });

  const transform = useMotionTemplate`translate(${x}px, ${y}px)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.12);
    y.set(dy * 0.12);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(className)}
    >
      {children}
    </motion.button>
  );
}
