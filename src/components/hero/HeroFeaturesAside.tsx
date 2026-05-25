"use client";

import { Clock, Search, Shield } from "lucide-react";
import { CarFront } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Persönliche Suche",
    body: "Kein Portal-Chaos — deine Anfrage wird gelesen und eingeordnet.",
    icon: Search,
  },
  {
    title: "Sicher & transparent",
    body: "Klarer Prozess, persönlicher Rückruf, keine Lead-Flut.",
    icon: Shield,
  },
  {
    title: "Zeit sparen",
    body: "Du beschreibst einmal — wir melden uns mit passenden Optionen.",
    icon: Clock,
  },
] as const;

export function HeroFeaturesAside() {
  return (
    <aside className="surface-card flex flex-col overflow-hidden p-6 sm:p-7">
      <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
        <ul className="space-y-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4"
              >
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-md bg-premium/15 text-premium"
                  aria-hidden
                >
                  <Icon className="size-[1.1rem]" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-bold tracking-tight text-[#111111]">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6b6b6b]">{f.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <div className="relative mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center lg:max-w-none">
          <svg
            className="absolute inset-0 size-full text-[#eaeaea]"
            viewBox="0 0 200 200"
            aria-hidden
          >
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x = 100 + 88 * Math.cos(rad);
              const y = 100 + 88 * Math.sin(rad);
              return <circle key={deg} cx={x} cy={y} r="3" className="fill-premium/70" />;
            })}
          </svg>
          <CarFront
            className="relative size-[min(42%,100px)] text-[#111111]/75"
            strokeWidth={0.9}
            aria-hidden
          />
          <span
            className="absolute -right-1 top-2 size-10 rounded-xl bg-cta-premium shadow-cta-gold"
            aria-hidden
          />
        </div>
      </div>
    </aside>
  );
}
