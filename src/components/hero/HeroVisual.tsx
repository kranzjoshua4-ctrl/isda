"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/** Premium Keyvisual — Audi vorne, Renault subtil im Hintergrund (Desktop). */
export function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-visual__stage" aria-hidden>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="hero-visual__renault-wrap"
        >
          <Image
            src="/Herobilder/hero-1.png"
            alt=""
            width={850}
            height={415}
            className="hero-visual__renault"
            sizes="(min-width: 1100px) 850px, 0px"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="hero-visual__car-wrap"
        >
          <Image
            src="/Herobilder/hero-2.png"
            alt=""
            width={960}
            height={540}
            priority
            className="hero-visual__car"
            sizes="(max-width: 1099px) min(100vw, 730px), 830px"
          />
        </motion.div>
      </div>
    </div>
  );
}
