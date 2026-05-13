"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect } from "react";

export function AmbientCursorGlow() {
  const x = useSpring(0, { stiffness: 180, damping: 28, mass: 0.35 });
  const y = useSpring(0, { stiffness: 180, damping: 28, mass: 0.35 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  const background = useMotionTemplate`radial-gradient(380px circle at ${x}px ${y}px, rgba(31, 78, 121, 0.055), transparent 65%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-80 mix-blend-normal"
      style={{ background }}
    />
  );
}
