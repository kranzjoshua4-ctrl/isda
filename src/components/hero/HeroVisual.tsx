"use client";

import { motion } from "framer-motion";
import { CarFront } from "lucide-react";

/** Rein dekoratives Hero-Visual — keine Interaktion, keine Logik. */
export function HeroVisual() {
  return (
    <div
      aria-hidden
      className="relative mx-auto flex h-full w-full max-w-md items-center justify-center lg:max-w-none"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-[min(52vh,420px)] w-[min(90%,380px)] -rotate-[14deg] rounded-none bg-gradient-to-br from-[#e8c547]/50 via-[#c9a227]/35 to-[#f8f8f7]/20"
          style={{ clipPath: "polygon(8% 0%, 100% 4%, 92% 100%, 0% 96%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] flex flex-col items-center"
      >
        <div className="relative flex h-[min(38vh,320px)] w-[min(85vw,360px)] items-end justify-center rounded-none border border-[#111111]/[0.06] bg-gradient-to-b from-[#f8f8f7] to-[#f2f2f2] p-8 shadow-premium sm:w-[360px]">
          <motion.div
            className="absolute -right-4 top-8 size-16 rounded-none bg-cta-premium shadow-cta-gold"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <CarFront
            className="relative size-[min(42vw,180px)] text-[#111111]/85 drop-shadow-[0_20px_40px_rgba(17,17,17,0.12)]"
            strokeWidth={0.85}
          />
          <motion.div
            className="absolute bottom-6 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-full bg-[#111111]/[0.08] blur-md"
            animate={{ scaleX: [1, 1.06, 1], opacity: [0.5, 0.35, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
