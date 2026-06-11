"use client";

import { BookingCard } from "@/components/booking/BookingCard";
import { useConciergeHydration } from "@/hooks/use-concierge-hydration";
import { useConciergeStore } from "@/store/concierge-store";
import { PAYMENT_METHOD_LABELS } from "@/types/concierge";
import { motion } from "framer-motion";
import { Check, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function DankePage() {
  const router = useRouter();
  const hydrated = useConciergeHydration();
  const booking = useConciergeStore((s) => s.booking);
  const customer = useConciergeStore((s) => s.customer);
  const vehicleRequest = useConciergeStore((s) => s.vehicleRequest);
  const checkoutSessionId = useConciergeStore((s) => s.checkoutSessionId);

  useEffect(() => {
    if (!hydrated) return;
    if (!booking) router.replace("/termin");
  }, [hydrated, booking, router]);

  const dateLabel = useMemo(() => {
    if (!booking?.date) return "";
    return new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(booking.date));
  }, [booking]);

  const paymentLabel = useMemo(() => {
    const id = booking?.paymentMethodId;
    if (!id) return "—";
    return PAYMENT_METHOD_LABELS[id];
  }, [booking]);

  if (!hydrated || !booking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="size-10 animate-spin rounded-full border-2 border-border border-t-[#111111]" />
          <p className="text-sm text-[#6b6b6b]">Buchung wird geladen…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-b from-[rgba(17,17,17,0.04)] via-transparent to-transparent blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-10 flex size-20 items-center justify-center rounded-sm border border-border bg-white shadow-[0_10px_30px_rgb(17_17_17/0.05)]"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.15 }}
          className="flex size-11 items-center justify-center rounded-sm bg-premium text-white shadow-[0_8px_24px_rgb(17_17_17/0.12)]"
          aria-hidden
        >
          <Check className="size-6" strokeWidth={2.5} />
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-center font-display text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-[2.65rem]"
      >
        Deine Anfrage ist eingegangen.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.14 }}
        className="mx-auto mt-5 max-w-xl text-center text-pretty text-base leading-relaxed text-[#6b6b6b]"
      >
        Wir prüfen jetzt deine Angaben und melden uns persönlich bei dir.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-12 space-y-6"
      >
        <BookingCard dateLabel={dateLabel} slot={booking.slot} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-sm border border-border bg-white p-6 shadow-[0_10px_30px_rgb(17_17_17/0.05)]">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
              Zahlungsmethode
            </p>
            <p className="mt-2 text-base font-semibold text-[#111111]">{paymentLabel}</p>
            {checkoutSessionId ? (
              <p className="mt-3 font-mono text-[11px] text-[#9a9a9a]">
                Ref. {checkoutSessionId}
              </p>
            ) : null}
          </div>
          <div className="rounded-sm border border-border bg-white p-6 shadow-[0_10px_30px_rgb(17_17_17/0.05)]">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
              Rückruf
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#111111]">
              <Phone className="size-4 text-premium" />
              {customer.vorname} {customer.nachname}
            </p>
            <p className="mt-1 text-sm text-[#6b6b6b]">{customer.telefon}</p>
            <p className="mt-1 text-xs text-[#9a9a9a]">{customer.email}</p>
            <p className="mt-3 text-xs text-[#9a9a9a]">
              Bevorzugt:{" "}
              <span className="font-medium text-[#111111]">{customer.rueckrufzeit}</span>
            </p>
          </div>
        </div>

        {vehicleRequest ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden rounded-sm border border-border bg-white p-6 text-left shadow-[0_10px_30px_rgb(17_17_17/0.05)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgb(17_17_17/0.08)] sm:p-8"
          >
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#9a9a9a]">
              Originaltext
            </p>
            <p className="mt-3 text-base leading-relaxed text-[#111111] sm:text-[17px]">
              {vehicleRequest}
            </p>
          </motion.section>
        ) : null}

        <p className="text-center text-xs leading-relaxed text-[#9a9a9a]">
          Du erhältst in Kürze eine Bestätigung per E-Mail, sobald unser Team den Slot final
          freigegeben hat.
        </p>

        <div className="flex justify-center pt-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-sm border border-border bg-white px-6 text-sm font-semibold text-[#111111] shadow-[0_1px_2px_rgb(17_17_17/0.04)] transition hover:border-[#111111]/30 hover:bg-[#fafafa]"
          >
            Zur Startseite
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
