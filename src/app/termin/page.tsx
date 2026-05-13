"use client";

import { BookingCard } from "@/components/booking/BookingCard";
import { BookingProgressNav } from "@/components/booking/BookingProgressNav";
import { PaymentMethods } from "@/components/booking/PaymentMethods";
import { PremiumCalendar } from "@/components/booking/PremiumCalendar";
import { FloatingField } from "@/components/forms/FloatingField";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useConciergeHydration } from "@/hooks/use-concierge-hydration";
import { useConciergeStore } from "@/store/concierge-store";
import {
  OPEN_LABEL,
  type ExtractedAttributes,
  MIN_VEHICLE_REQUEST_LENGTH,
  type PaymentMethodId,
} from "@/types/concierge";
import { motion } from "framer-motion";
import { ArrowRight, Check, Pencil, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const SUMMARY_FIELDS: { key: keyof ExtractedAttributes; label: string }[] = [
  { key: "marke", label: "Marke" },
  { key: "modell", label: "Modell" },
  { key: "budget", label: "Budget" },
  { key: "kilometerstand", label: "Kilometer" },
  { key: "karosserieform", label: "Karosserie" },
  { key: "kraftstoff", label: "Kraftstoff" },
  { key: "getriebe", label: "Getriebe" },
  { key: "besonderheiten", label: "Besonderheiten" },
];

const SLOTS = ["09:00", "10:30", "12:00", "14:30", "16:00", "18:30"];

const cardShell =
  "rounded-3xl border border-[rgba(148,163,184,0.28)] bg-[rgba(255,255,255,0.86)] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1),0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8";

export default function TerminPage() {
  const router = useRouter();
  const hydrated = useConciergeHydration();
  const vehicleRequest = useConciergeStore((s) => s.vehicleRequest);
  const setVehicleRequest = useConciergeStore((s) => s.setVehicleRequest);
  const extracted = useConciergeStore((s) => s.extracted);
  const customer = useConciergeStore((s) => s.customer);
  const setCustomer = useConciergeStore((s) => s.setCustomer);
  const booking = useConciergeStore((s) => s.booking);
  const setBooking = useConciergeStore((s) => s.setBooking);
  const setCheckoutSessionId = useConciergeStore((s) => s.setCheckoutSessionId);
  const selectedPaymentMethod = useConciergeStore((s) => s.selectedPaymentMethod);
  const setSelectedPaymentMethod = useConciergeStore((s) => s.setSelectedPaymentMethod);
  const refreshExtraction = useConciergeStore((s) => s.refreshExtraction);

  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedSlot, setPickedSlot] = useState<string | null>(null);
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading">("idle");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [editingRequest, setEditingRequest] = useState(false);
  const [requestDraft, setRequestDraft] = useState("");

  const startEditRequest = () => {
    setRequestDraft(vehicleRequest);
    setEditingRequest(true);
  };
  const cancelEditRequest = () => {
    setEditingRequest(false);
    setRequestDraft("");
  };
  const saveEditRequest = () => {
    const text = requestDraft.trim();
    if (text.length < MIN_VEHICLE_REQUEST_LENGTH) return;
    setVehicleRequest(text);
    setEditingRequest(false);
    setRequestDraft("");
  };

  const selectedDate = useMemo(
    () => pickedDate ?? (booking?.date ? new Date(booking.date) : null),
    [pickedDate, booking],
  );
  const slot = pickedSlot ?? booking?.slot ?? null;

  useEffect(() => {
    if (!hydrated) return;
    if (!vehicleRequest || vehicleRequest.trim().length < MIN_VEHICLE_REQUEST_LENGTH) {
      router.replace("/");
    }
  }, [hydrated, vehicleRequest, router]);

  useEffect(() => {
    if (!hydrated) return;
    if (!vehicleRequest?.trim() || vehicleRequest.trim().length < MIN_VEHICLE_REQUEST_LENGTH) return;
    refreshExtraction();
  }, [hydrated, vehicleRequest, refreshExtraction]);

  const customerFilled = useMemo(() => {
    return (
      customer.vorname.trim() &&
      customer.nachname.trim() &&
      customer.telefon.trim() &&
      customer.email.trim() &&
      customer.standort.trim() &&
      customer.rueckrufzeit.trim()
    );
  }, [customer]);

  const dateLabel = useMemo(() => {
    if (!selectedDate) return "Datum wählen";
    return new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(selectedDate);
  }, [selectedDate]);

  const onCheckout = async () => {
    if (!selectedDate || !slot || !selectedPaymentMethod || !customerFilled) {
      setCheckoutError(
        !customerFilled
          ? "Bitte alle Kontaktfelder ausfüllen."
          : "Bitte Datum, Uhrzeit und Zahlungsmethode wählen.",
      );
      return;
    }
    setCheckoutState("loading");
    setCheckoutError(null);
    try {
      await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleRequest, extracted, customer }),
      }).catch(() => {});

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          slot,
          paymentMethodId: selectedPaymentMethod,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        mode?: string;
        message?: string;
        mockSessionId?: string;
        error?: string;
      };
      if (!res.ok || !data?.ok) {
        setCheckoutError(
          data?.error ?? "Die Buchung konnte nicht vorbereitet werden. Bitte erneut versuchen.",
        );
        setCheckoutState("idle");
        return;
      }
      setBooking({
        date: selectedDate.toISOString(),
        slot,
        paymentMethodId: selectedPaymentMethod,
      });
      if (data.mockSessionId) setCheckoutSessionId(data.mockSessionId);
      router.push("/danke");
    } catch {
      setCheckoutError("Netzwerkfehler. Bitte kurz warten und erneut versuchen.");
      setCheckoutState("idle");
    }
  };

  const ctaDisabled =
    !selectedDate ||
    !slot ||
    !selectedPaymentMethod ||
    !customerFilled ||
    checkoutState === "loading";

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-2 border-[rgba(15,23,42,0.18)] border-t-[#0a0a0a]" />
      </div>
    );
  }

  const summaryChips = SUMMARY_FIELDS.map((f) => ({
    label: f.label,
    value: extracted[f.key],
  })).filter((c) => c.value && c.value !== OPEN_LABEL);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl">
          Termin &amp; Zahlung
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-[#475569] sm:text-[15px] sm:leading-relaxed">
          Wähle deinen Beratungstermin und bestätige die Servicegebühr von 17,90 €.
        </p>

        <BookingProgressNav active={2} />
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-6 max-w-3xl"
        aria-label="Zusammenfassung deiner Anfrage"
      >
        <div className="rounded-2xl border border-[rgba(148,163,184,0.28)] bg-[rgba(255,255,255,0.86)] p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08),0_6px_18px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                Deine Anfrage
              </p>
              {editingRequest ? (
                <div className="mt-1.5">
                  <label className="sr-only" htmlFor="edit-vehicle-request">
                    Wagenbeschreibung bearbeiten
                  </label>
                  <textarea
                    id="edit-vehicle-request"
                    value={requestDraft}
                    onChange={(e) => setRequestDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        e.preventDefault();
                        cancelEditRequest();
                      }
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        saveEditRequest();
                      }
                    }}
                    rows={3}
                    autoFocus
                    className="w-full resize-none rounded-md border border-[rgba(100,116,139,0.32)] bg-white px-3 py-2 text-[13px] leading-relaxed text-[#0f172a] outline-none transition focus:border-[rgba(31,78,121,0.45)] focus:ring-2 focus:ring-[rgba(31,78,121,0.12)] sm:text-sm"
                  />
                  <p className="mt-1 text-[10px] leading-snug text-[#64748b]">
                    Mindestens {MIN_VEHICLE_REQUEST_LENGTH} Zeichen. Speichern aktualisiert die Merkmale
                    automatisch.
                  </p>
                </div>
              ) : (
                <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-[#0f172a] sm:text-sm">
                  {vehicleRequest}
                </p>
              )}
            </div>
            {editingRequest ? (
              <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row">
                <button
                  type="button"
                  onClick={saveEditRequest}
                  disabled={requestDraft.trim().length < MIN_VEHICLE_REQUEST_LENGTH}
                  className="inline-flex items-center gap-1 rounded-full bg-[#0a0a0a] px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_4px_14px_-6px_rgba(0,0,0,0.45)] transition hover:bg-[#171717] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check className="size-3" />
                  Speichern
                </button>
                <button
                  type="button"
                  onClick={cancelEditRequest}
                  className="inline-flex items-center gap-1 rounded-full border border-[rgba(148,163,184,0.35)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#475569] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-[#0a0a0a]/40 hover:bg-[#f8fafc] hover:text-[#0f172a]"
                >
                  <X className="size-3" />
                  Abbrechen
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startEditRequest}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[rgba(148,163,184,0.35)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-[#0a0a0a]/40 hover:bg-[#f8fafc]"
              >
                <Pencil className="size-3" />
                Bearbeiten
              </button>
            )}
          </div>

          {!editingRequest && summaryChips.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[rgba(148,163,184,0.2)] pt-3">
              {summaryChips.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1 rounded-full border border-[rgba(148,163,184,0.32)] bg-[#f8fafc] px-2.5 py-0.5 text-[11px] leading-snug text-[#0f172a]"
                >
                  <span className="font-semibold text-[#475569]">{c.label}:</span>
                  <span className="font-semibold">{c.value}</span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </motion.section>

      <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
        {/* Linke Spalte: Termin + Uhrzeit */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:gap-8"
        >
          <section className={cardShell}>
            <div className="mb-6 border-b border-[rgba(148,163,184,0.22)] pb-5">
              <h2 className="text-xl font-semibold tracking-tight text-[#0f172a] md:text-[1.35rem]">
                1. Termin wählen
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                Wähle einen freien Beratungstag innerhalb der nächsten 14 Tage.
              </p>
            </div>
            <PremiumCalendar selected={selectedDate} onSelect={setPickedDate} />
          </section>

          <section className={cardShell}>
            <div className="mb-5 border-b border-[rgba(148,163,184,0.22)] pb-5">
              <h2 className="text-xl font-semibold tracking-tight text-[#0f172a] md:text-[1.35rem]">
                2. Uhrzeit wählen
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                Alle Zeiten sind verfügbare Rückrufslots.
              </p>
            </div>

            {!selectedDate ? (
              <p className="mb-4 rounded-xl border border-[rgba(148,163,184,0.35)] bg-[#f8fafc] px-3 py-2.5 text-[13px] leading-snug text-[#475569]">
                Bitte zuerst einen Tag auswählen.
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2.5">
              {SLOTS.map((t, i) => {
                const active = slot === t;
                return (
                  <motion.button
                    key={t}
                    type="button"
                    aria-pressed={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.02 * i, duration: 0.2 }}
                    onClick={() => setPickedSlot(t)}
                    className={`min-h-11 min-w-[4.5rem] rounded-xl border px-4 py-2.5 text-sm font-semibold tracking-tight transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                      active
                        ? "border-transparent bg-cta-navy text-white shadow-[0_8px_22px_-8px_rgba(0,0,0,0.42)]"
                        : "border-[rgba(148,163,184,0.35)] bg-white text-[#0f172a] hover:scale-[1.02] hover:border-[#0a0a0a]/35 hover:bg-[#f8fafc] hover:shadow-[0_6px_18px_-10px_rgba(15,23,42,0.1)] active:scale-[0.99]"
                    }`}
                  >
                    {t}
                  </motion.button>
                );
              })}
            </div>
          </section>

          <section id="kontakt" className={`${cardShell} scroll-mt-28`}>
            <div className="mb-5 border-b border-[rgba(148,163,184,0.22)] pb-5">
              <h2 className="text-xl font-semibold tracking-tight text-[#0f172a] md:text-[1.35rem]">
                3. Kontaktdaten für den Rückruf
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                Keine Massenmails — nur ein persönlicher Ansprechpartner für deine Fahrzeugsuche.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FloatingField
                label="Vorname"
                value={customer.vorname}
                onChange={(v) => setCustomer({ vorname: v })}
                required
                autoComplete="given-name"
              />
              <FloatingField
                label="Nachname"
                value={customer.nachname}
                onChange={(v) => setCustomer({ nachname: v })}
                required
                autoComplete="family-name"
              />
              <FloatingField
                label="Telefonnummer"
                value={customer.telefon}
                onChange={(v) => setCustomer({ telefon: v })}
                required
                autoComplete="tel"
              />
              <FloatingField
                label="E-Mail"
                type="email"
                value={customer.email}
                onChange={(v) => setCustomer({ email: v })}
                required
                autoComplete="email"
              />
              <FloatingField
                label="Wohnort / PLZ"
                value={customer.standort}
                onChange={(v) => setCustomer({ standort: v })}
                required
                autoComplete="postal-code"
              />
              <FloatingField
                label="Bevorzugte Rückrufzeit"
                value={customer.rueckrufzeit}
                onChange={(v) => setCustomer({ rueckrufzeit: v })}
                required
                autoComplete="off"
              />
            </div>
          </section>
        </motion.div>

        {/* Rechte Spalte: Summary + Zahlung + CTA */}
        <motion.aside
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className={cardShell}>
            <div className="mb-5 border-b border-[rgba(148,163,184,0.22)] pb-5">
              <h2 className="text-xl font-semibold tracking-tight text-[#0f172a] md:text-[1.35rem]">
                4. Buchung
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                Übersicht deiner Auswahl und Zahlung.
              </p>
            </div>

            {selectedDate && slot ? (
              <div className="mt-2">
                <BookingCard dateLabel={dateLabel} slot={slot} compact />
              </div>
            ) : selectedDate && !slot ? (
              <div className="mt-2 rounded-lg border border-[rgba(148,163,184,0.35)] bg-[#fafbfc] px-2.5 py-3">
                <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
                  Gewählter Tag
                </p>
                <p className="mt-0.5 text-[11px] font-semibold leading-snug text-[#0f172a]">
                  {dateLabel}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#475569]">
                  Bitte noch eine Uhrzeit auswählen.
                </p>
                <div className="mx-auto mt-2 max-w-[160px] border-t border-[rgba(148,163,184,0.25)] pt-2 text-center">
                  <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
                    Servicegebühr
                  </p>
                  <p className="mt-0.5 font-display text-base font-semibold tabular-nums text-[#0f172a]">
                    17,90 €
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-2 rounded-lg border border-dashed border-[rgba(148,163,184,0.45)] bg-[#fafbfc] px-2.5 py-4 text-center">
                <p className="text-[11px] leading-relaxed text-[#475569]">
                  Wähle links Tag und Uhrzeit aus.
                </p>
                <div className="mx-auto mt-2 max-w-[160px] border-t border-[rgba(148,163,184,0.25)] pt-2">
                  <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
                    Servicegebühr
                  </p>
                  <p className="mt-0.5 font-display text-base font-semibold tabular-nums text-[#0f172a]">
                    17,90 €
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 border-t border-[rgba(148,163,184,0.22)] pt-4">
              <h3 className="text-sm font-semibold tracking-tight text-[#0f172a] md:text-[15px]">
                Zahlungsart wählen
              </h3>
              <p className="mt-0.5 text-[11px] leading-snug text-[#475569]">
                Sicher bezahlen — Buchung nach Bestätigung.
              </p>
              <PaymentMethods
                value={selectedPaymentMethod}
                onChange={(id: PaymentMethodId) => setSelectedPaymentMethod(id)}
                className="mt-2"
                compact
              />
            </div>

            {checkoutError ? (
              <p
                role="alert"
                className="mt-2 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] leading-relaxed text-red-900"
              >
                {checkoutError}
              </p>
            ) : null}

            <div className="mt-4 space-y-1.5">
              <MagneticButton
                type="button"
                disabled={ctaDisabled}
                onClick={onCheckout}
                className="group relative flex h-10 w-full items-center justify-center overflow-hidden rounded-lg border-0 bg-cta-navy px-3 text-[12px] font-semibold text-tech-foreground shadow-cta transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-cta-navy-hover hover:shadow-cta-hover active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[0.42] disabled:saturate-[0.65] disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:scale-100"
              >
                <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/12 to-transparent transition duration-700 group-hover:translate-x-[100%] group-disabled:hidden" />
                <span className="relative z-10 inline-flex items-center justify-center gap-1.5 text-center">
                  {checkoutState === "loading" ? (
                    <span className="size-3.5 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  ) : null}
                  <span className="leading-snug">
                    {checkoutState === "loading"
                      ? "Wird gebucht…"
                      : "Buchen – 17,90 €"}
                  </span>
                  {checkoutState !== "loading" ? (
                    <ArrowRight className="size-3.5 shrink-0 transition group-hover:translate-x-0.5" />
                  ) : null}
                </span>
              </MagneticButton>

              <p className="text-center text-[9px] leading-relaxed text-[#64748b]">
                Mit dem Klick akzeptierst du die{" "}
                <Link
                  href="/datenschutz"
                  className="font-medium text-[#0a0a0a] underline decoration-[rgba(15,23,42,0.3)] underline-offset-2 transition hover:decoration-[#0a0a0a]"
                >
                  Datenschutz- und Zahlungsbedingungen
                </Link>
                .
              </p>
            </div>

            <div className="mt-3 flex justify-center border-t border-[rgba(148,163,184,0.18)] pt-3">
              <Link
                href="/#eingabe"
                className="text-[11px] font-medium text-[#64748b] transition duration-200 hover:text-[#0f172a]"
              >
                Zurück
              </Link>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
