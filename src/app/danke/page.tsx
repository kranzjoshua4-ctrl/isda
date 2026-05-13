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
          <div className="size-10 animate-spin rounded-full border-2 border-[rgba(15,23,42,0.18)] border-t-[#0a0a0a]" />
          <p className="text-sm text-[#475569]">Buchung wird geladen…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-b from-[rgba(15,23,42,0.06)] via-transparent to-transparent blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-10 flex size-20 items-center justify-center rounded-2xl border border-[rgba(148,163,184,0.32)] bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08),0_6px_18px_rgba(15,23,42,0.06)]"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.15 }}
          className="flex size-11 items-center justify-center rounded-xl bg-cta-navy text-white shadow-cta"
          aria-hidden
        >
          <Check className="size-6" strokeWidth={2.5} />
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-center font-display text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl md:text-[2.65rem]"
      >
        Deine Anfrage ist eingegangen.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.14 }}
        className="mx-auto mt-5 max-w-xl text-center text-pretty text-base leading-relaxed text-[#475569]"
      >
        Wir prüfen jetzt deine Angaben und melden uns persönlich bei dir.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-12 space-y-5"
      >
        <BookingCard dateLabel={dateLabel} slot={booking.slot} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[rgba(148,163,184,0.28)] bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06),0_4px_12px_rgba(15,23,42,0.04)]">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              Zahlungsmethode
            </p>
            <p className="mt-2 text-base font-semibold text-[#0f172a]">{paymentLabel}</p>
            {checkoutSessionId ? (
              <p className="mt-3 font-mono text-[11px] text-[#64748b]">
                Ref. {checkoutSessionId}
              </p>
            ) : null}
          </div>
          <div className="rounded-xl border border-[rgba(148,163,184,0.28)] bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06),0_4px_12px_rgba(15,23,42,0.04)]">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              Rückruf
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#0f172a]">
              <Phone className="size-4 text-[#0a0a0a]" />
              {customer.vorname} {customer.nachname}
            </p>
            <p className="mt-1 text-sm text-[#475569]">{customer.telefon}</p>
            <p className="mt-1 text-xs text-[#64748b]">{customer.email}</p>
            <p className="mt-3 text-xs text-[#64748b]">
              Bevorzugt:{" "}
              <span className="font-medium text-[#0f172a]">{customer.rueckrufzeit}</span>
            </p>
          </div>
        </div>

        {vehicleRequest ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.28)] bg-[rgba(255,255,255,0.9)] p-6 text-left shadow-[0_24px_70px_rgba(15,23,42,0.1),0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12),0_12px_36px_rgba(15,23,42,0.08)] sm:p-8"
          >
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
              Originaltext
            </p>
            <p className="mt-3 text-base leading-relaxed text-[#0f172a] sm:text-[17px]">
              {vehicleRequest}
            </p>
          </motion.section>
        ) : null}

        <p className="text-center text-xs leading-relaxed text-[#64748b]">
          Du erhältst in Kürze eine Bestätigung per E-Mail, sobald unser Team den Slot final
          freigegeben hat.
        </p>

        <div className="flex justify-center pt-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-sm border border-[rgba(148,163,184,0.35)] bg-white px-6 text-sm font-semibold text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-[#0a0a0a]/40 hover:bg-[#f8fafc]"
          >
            Zur Startseite
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
