export type ExtractedAttributes = {
  marke: string;
  modell: string;
  budget: string;
  kilometerstand: string;
  karosserieform: string;
  kraftstoff: string;
  getriebe: string;
  wuensche: string;
  besonderheiten: string;
};

export type CustomerDetails = {
  vorname: string;
  nachname: string;
  telefon: string;
  email: string;
  standort: string;
  rueckrufzeit: string;
};

export const PAYMENT_METHOD_IDS = [
  "paypal",
  "klarna",
  "sepa",
  "card",
  "apple_pay",
  "google_pay",
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHOD_IDS)[number];

export type BookingSelection = {
  date: string;
  slot: string;
  paymentMethodId: PaymentMethodId | null;
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethodId, string> = {
  paypal: "PayPal",
  klarna: "Klarna",
  sepa: "SEPA-Lastschrift",
  card: "Kreditkarte",
  apple_pay: "Apple Pay",
  google_pay: "Google Pay",
};

export const OPEN_LABEL = "Noch offen";

/** Mindestlänge für Freitext / Chips (z. B. „VW“, „BMW“) vor Weiterleitung zur Buchung */
export const MIN_VEHICLE_REQUEST_LENGTH = 2;
