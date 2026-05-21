"use client";

import { PartnerPortalLogin } from "@/components/partner/PartnerPortalLogin";
import Link from "next/link";

export default function PartnerPortalPage() {
  return (
    <div className="relative mx-auto flex min-h-[calc(100dvh-4.25rem)] max-w-lg flex-col justify-center px-5 py-16 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[30%] top-[10%] h-[320px] w-[min(70vw,400px)] rounded-full bg-[radial-gradient(circle,rgb(201_162_39/0.08),transparent_68%)] blur-3xl"
      />

      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-premium">
        Partner Portal
      </p>
      <h1 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-tight tracking-tight text-[#111111]">
        Anmeldung für Händler
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b] sm:text-base">
        Zugang für registrierte Partner — Anfragen, Status und Vermittlung an einem Ort. Das CMS-Login
        wird hier angebunden, sobald es live ist.
      </p>

      <PartnerPortalLogin className="mt-10" />

      <p className="mt-8 text-center text-sm text-[#6b6b6b]">
        Noch kein Partner?{" "}
        <Link
          href="/partner"
          className="font-medium text-[#111111] underline decoration-[#eaeaea] underline-offset-4 transition hover:decoration-premium/50"
        >
          Partner werden
        </Link>
      </p>
    </div>
  );
}
