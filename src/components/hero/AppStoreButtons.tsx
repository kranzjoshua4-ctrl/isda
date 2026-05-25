"use client";

import { motion } from "framer-motion";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 shrink-0 fill-[#111111]">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 shrink-0">
      <path
        fill="#4285F4"
        d="M3.18 2.23c-.45.26-.73.74-.73 1.3v16.94c0 .56.28 1.04.73 1.3l9.12-9.77-9.12-9.77z"
      />
      <path
        fill="#34A853"
        d="M20.45 10.73 12.27 5.5 3.18 2.23l9.09 9.77 8.18-1.27z"
      />
      <path
        fill="#FBBC04"
        d="M3.18 21.77c.45.26 1.03.26 1.48 0l8.61-4.97-8.09-8.57-9.12 9.77c0 .56.28 1.04.73 1.3l6.39-6.53z"
      />
      <path
        fill="#EA4335"
        d="M20.45 13.27 12.27 18.5l-7.61 3.27 9.09-9.77 6.7 1.27z"
      />
    </svg>
  );
}

type StoreLink = {
  href: string;
  title: string;
  kicker: string;
  label: string;
  icon: "apple" | "google";
};

const STORES: StoreLink[] = [
  {
    href: "#",
    title: "Im App Store laden",
    kicker: "Download On The",
    label: "Apple Store",
    icon: "apple",
  },
  {
    href: "#",
    title: "Bei Google Play laden",
    kicker: "Get It On",
    label: "Google Play",
    icon: "google",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const storeButtonsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.38, staggerChildren: 0.1 },
  },
};

const storeButtonItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease },
  },
};

export function AppStoreButtons() {
  return (
    <motion.div
      className="mt-6 flex flex-wrap items-center justify-center gap-3 min-[1100px]:justify-start"
      variants={storeButtonsContainer}
      initial="hidden"
      animate="show"
    >
      {STORES.map((store) => (
        <motion.a
          key={store.label}
          href={store.href}
          title={store.title}
          className="app-store-btn"
          aria-label={store.title}
          variants={storeButtonItem}
        >
          {store.icon === "apple" ? <AppleIcon /> : <GooglePlayIcon />}
          <span className="flex flex-col items-start justify-center leading-none">
            <span className="text-[9px] font-medium tracking-tight text-[#111111]">
              {store.kicker}
            </span>
            <span className="mt-0.5 text-[13px] font-bold tracking-tight text-[#111111]">
              {store.label}
            </span>
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
