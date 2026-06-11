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
import { hasAnyFunnelSelection } from "@/types/funnel";
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()/-]{5,}$/;

const EASE = [0.22, 1, 0.36, 1] as const;

const cardShell =
  "rounded-sm border border-border bg-white p-6 shadow-[0_10px_30px_rgb(17_17_17/0.05)] md:p-8";

export default function TerminPage() {
  const router = useRouter();
  const hydrated = useConciergeHydration();
  const vehicleRequest = useConciergeStore((s) => s.vehicleRequest);
  const setVehicleRequest = useConciergeStore((s) => s.setVehicleRequest);
  const extracted = useConciergeStore((s) => s.extracted);
  const funnelSelections = useConciergeStore((s) => s.funnelSelections);
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
  const [touched, setTouched] = useState<{ email: boolean; telefon: boolean }>({
    email: false,
    telefon: false,
  });

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

  const emailValid = EMAIL_RE.test(customer.email.trim());
  const phoneValid = PHONE_RE.test(customer.telefon.trim());
  const emailError =
    touched.email && customer.email.trim() && !emailValid
      ? "Bitte eine gültige E-Mail-Adresse angeben."
      : null;
  const phoneError =
    touched.telefon && customer.telefon.trim() && !phoneValid
      ? "Bitte eine gültige Telefonnummer angeben."
      : null;

  const customerFilled = useMemo(() => {
    return Boolean(
      customer.vorname.trim() &&
        customer.nachname.trim() &&
        customer.telefon.trim() &&
        customer.email.trim() &&
        customer.standort.trim() &&
        customer.rueckrufzeit.trim(),
    );
  }, [customer]);

  const customerValid = customerFilled && emailValid && phoneValid;

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
    if (!selectedDate || !slot || !selectedPaymentMethod || !customerValid) {
      setTouched({ email: true, telefon: true });
      setCheckoutError(
        !customerFilled
          ? "Bitte alle Kontaktfelder ausfüllen."
          : !emailValid || !phoneValid
            ? "Bitte E-Mail-Adresse und Telefonnummer prüfen."
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
        body: JSON.stringify({ vehicleRequest, extracted, funnelSelections, customer }),
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
    !customerValid ||
    checkoutState === "loading";

  // Strukturierte Zusammenfassung aus dem Funnel — Parser nur als Fallback
  const funnelChips = useMemo(() => {
    if (!hasAnyFunnelSelection(funnelSelections)) return [];
    const chips: { label: string; value: string }[] = [];
    if (funnelSelections.brands.length > 0) {
      chips.push({
        label: funnelSelections.brands.length > 1 ? "Marken" : "Marke",
        value: funnelSelections.brands.join(", "),
      });
    }
    if (funnelSelections.bodyType) {
      chips.push({ label: "Fahrzeugart", value: funnelSelections.bodyType });
    }
    if (funnelSelections.budgetMax != null) {
      chips.push({
        label: "Budget",
        value: `bis ${funnelSelections.budgetMax.toLocaleString("de-DE")} €`,
      });
    }
    if (funnelSelections.mileage) {
      chips.push({ label: "Laufleistung", value: funnelSelections.mileage });
    }
    if (funnelSelections.transmission && funnelSelections.transmission !== "Egal") {
      chips.push({ label: "Getriebe", value: funnelSelections.transmission });
    }
    if (funnelSelections.drive && funnelSelections.drive !== "Egal") {
      chips.push({ label: "Antrieb", value: funnelSelections.drive });
    }
    if (funnelSelections.usage.length > 0) {
      chips.push({ label: "Nutzung", value: funnelSelections.usage.join(", ") });
    }
    if (funnelSelections.priorities.length > 0) {
      chips.push({ label: "Wichtig", value: funnelSelections.priorities.join(", ") });
    }
    return chips;
  }, [funnelSelections]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-2 border-[#eaeaea] border-t-[#111111]" />
      </div>
    );
  }

  const parserChips = SUMMARY_FIELDS.map((f) => ({
    label: f.label,
    value: extracted[f.key],
  })).filter((c) => c.value && c.value !== OPEN_LABEL);

  const summaryChips = funnelChips.length > 0 ? funnelChips : parserChips;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
          Termin &amp; Zahlung
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-[#6b6b6b] sm:text-[15px] sm:leading-relaxed">
          Wähle deinen Beratungstermin und bestätige die Servicegebühr von 17,90 €.
        </p>

        <BookingProgressNav active={2} />
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
        className="mx-auto mt-7 max-w-3xl"
        aria-label="Zusammenfassung deiner Anfrage"
      >
        <div className="rounded-sm border border-border bg-white p-4 shadow-[0_10px_30px_rgb(17_17_17/0.05)] sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a9a9a]">
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
                    className="w-full resize-none rounded-sm border border-border bg-white px-3 py-2 text-[13px] leading-relaxed text-[#111111] outline-none transition focus:border-premium/40 focus:ring-2 focus:ring-premium/12 sm:text-sm"
                  />
                  <p className="mt-1 text-[10px] leading-snug text-[#9a9a9a]">
                    Mindestens {MIN_VEHICLE_REQUEST_LENGTH} Zeichen. Speichern aktualisiert die Merkmale
                    automatisch.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={saveEditRequest}
                      disabled={requestDraft.trim().length < MIN_VEHICLE_REQUEST_LENGTH}
                      className="inline-flex items-center gap-1 rounded-sm bg-[#111111] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Check className="size-3" />
                      Speichern
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditRequest}
                      className="inline-flex items-center gap-1 rounded-sm border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-[#6b6b6b] transition hover:border-[#111111]/30 hover:bg-[#fafafa] hover:text-[#111111]"
                    >
                      <X className="size-3" />
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={startEditRequest}
                  className="mt-1.5 w-full cursor-text rounded-sm text-left text-pretty text-[13px] leading-relaxed text-[#111111] transition hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium/30 sm:text-sm"
                  aria-label="Wagenbeschreibung bearbeiten"
                >
                  {vehicleRequest}
                </button>
              )}
            </div>
            {!editingRequest && (
              <button
                type="button"
                onClick={startEditRequest}
                className="inline-flex shrink-0 items-center gap-1 rounded-sm border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-[#111111] transition hover:border-premium/30 hover:bg-[#fafafa]"
              >
                <Pencil className="size-3" />
                Bearbeiten
              </button>
            )}
          </div>

          {!editingRequest && summaryChips.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
              {summaryChips.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1 rounded-sm border border-border bg-[#fafafa] px-2.5 py-0.5 text-[11px] leading-snug text-[#111111]"
                >
                  <span className="font-semibold text-[#6b6b6b]">{c.label}:</span>
                  <span className="font-semibold">{c.value}</span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </motion.section>

      <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
        {/* Linke Spalte: Termin + Uhrzeit */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="flex flex-col gap-6 lg:gap-8"
        >
          <section className={cardShell}>
            <div className="mb-6 border-b border-border pb-5">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#111111] md:text-[1.35rem]">
                1. Termin wählen
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                Wähle einen freien Beratungstag innerhalb der nächsten 14 Tage.
              </p>
            </div>
            <PremiumCalendar selected={selectedDate} onSelect={setPickedDate} />
          </section>

          <section className={cardShell}>
            <div className="mb-5 border-b border-border pb-5">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#111111] md:text-[1.35rem]">
                2. Uhrzeit wählen
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                Alle Zeiten sind verfügbare Rückrufslots.
              </p>
            </div>

            {!selectedDate ? (
              <p className="mb-4 rounded-sm border border-border bg-[#fafafa] px-3 py-2.5 text-[13px] leading-snug text-[#6b6b6b]">
                Bitte zuerst einen Tag auswählen.
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
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
                    className={`min-h-11 min-w-[4.5rem] rounded-sm border px-4 py-2.5 text-sm font-semibold tracking-tight transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                      active
                        ? "border-transparent bg-cta-navy text-white shadow-cta"
                        : "border-border bg-white text-[#111111] hover:scale-[1.02] hover:border-premium/30 hover:bg-[#fafafa] active:scale-[0.99]"
                    }`}
                  >
                    {t}
                  </motion.button>
                );
              })}
            </div>
          </section>

          <section id="kontakt" className={`${cardShell} scroll-mt-28`}>
            <div className="mb-5 border-b border-border pb-5">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#111111] md:text-[1.35rem]">
                3. Kontaktdaten für den Rückruf
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                Keine Massenmails — nur ein persönlicher Ansprechpartner für deine Fahrzeugsuche.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
                type="tel"
                value={customer.telefon}
                onChange={(v) => setCustomer({ telefon: v })}
                onBlur={() => setTouched((t) => ({ ...t, telefon: true }))}
                error={phoneError}
                required
                autoComplete="tel"
              />
              <FloatingField
                label="E-Mail"
                type="email"
                value={customer.email}
                onChange={(v) => setCustomer({ email: v })}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                error={emailError}
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
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className={cardShell}>
            <div className="mb-5 border-b border-border pb-5">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#111111] md:text-[1.35rem]">
                4. Buchung
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                Übersicht deiner Auswahl und Zahlung.
              </p>
            </div>

            {selectedDate && slot ? (
              <div className="mt-2">
                <BookingCard dateLabel={dateLabel} slot={slot} compact />
              </div>
            ) : selectedDate && !slot ? (
              <div className="mt-2 rounded-sm border border-border bg-[#fafafa] px-2.5 py-3">
                <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
                  Gewählter Tag
                </p>
                <p className="mt-0.5 text-[11px] font-semibold leading-snug text-[#111111]">
                  {dateLabel}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#6b6b6b]">
                  Bitte noch eine Uhrzeit auswählen.
                </p>
                <div className="mx-auto mt-2 max-w-[160px] border-t border-border pt-2 text-center">
                  <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
                    Servicegebühr
                  </p>
                  <p className="mt-0.5 font-display text-base font-semibold tabular-nums text-[#111111]">
                    17,90 €
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-2 rounded-sm border border-dashed border-[#d8d8d8] bg-[#fafafa] px-2.5 py-4 text-center">
                <p className="text-[11px] leading-relaxed text-[#6b6b6b]">
                  Wähle links Tag und Uhrzeit aus.
                </p>
                <div className="mx-auto mt-2 max-w-[160px] border-t border-border pt-2">
                  <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
                    Servicegebühr
                  </p>
                  <p className="mt-0.5 font-display text-base font-semibold tabular-nums text-[#111111]">
                    17,90 €
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 border-t border-border pt-4">
              <h3 className="text-sm font-semibold tracking-tight text-[#111111] md:text-[15px]">
                Zahlungsart wählen
              </h3>
              <p className="mt-0.5 text-[11px] leading-snug text-[#6b6b6b]">
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
                className="mt-2 rounded-sm border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] leading-relaxed text-red-900"
              >
                {checkoutError}
              </p>
            ) : null}

            <div className="mt-4 space-y-1.5">
              <MagneticButton
                type="button"
                disabled={ctaDisabled}
                onClick={onCheckout}
                className="group relative flex h-10 w-full items-center justify-center overflow-hidden rounded-sm border-0 bg-cta-navy px-3 text-[12px] font-semibold text-white shadow-cta transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-cta-navy-hover hover:shadow-cta-hover active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[0.42] disabled:saturate-[0.65] disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:scale-100"
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

              <p className="text-center text-[9px] leading-relaxed text-[#9a9a9a]">
                Mit dem Klick akzeptierst du die{" "}
                <Link
                  href="/datenschutz"
                  className="font-medium text-[#111111] underline decoration-[#d8d8d8] underline-offset-2 transition hover:decoration-premium/60"
                >
                  Datenschutz- und Zahlungsbedingungen
                </Link>
                .
              </p>
            </div>

            <div className="mt-3 flex justify-center border-t border-border pt-3">
              <Link
                href="/#eingabe"
                className="text-[11px] font-medium text-[#9a9a9a] transition duration-200 hover:text-[#111111]"
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
