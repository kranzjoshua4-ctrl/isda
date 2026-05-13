import { NextResponse } from "next/server";

import type { PaymentMethodId } from "@/types/concierge";
import { PAYMENT_METHOD_IDS } from "@/types/concierge";

type Body = {
  date?: string;
  slot?: string;
  paymentMethodId?: PaymentMethodId;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body;
    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!body?.date || !body?.slot) {
      return NextResponse.json(
        {
          ok: false,
          error: "Datum und Uhrzeit sind erforderlich.",
        },
        { status: 400 },
      );
    }

    const id = body.paymentMethodId;
    const validMethod =
      typeof id === "string" &&
      (PAYMENT_METHOD_IDS as readonly string[]).includes(id);
    if (!validMethod) {
      return NextResponse.json(
        {
          ok: false,
          error: "Bitte eine gültige Zahlungsmethode auswählen.",
        },
        { status: 400 },
      );
    }

    if (!stripeSecret) {
      return NextResponse.json({
        ok: true,
        mode: "fallback" as const,
        message:
          "Das Zahlungssystem wird aktuell vorbereitet. Dein Termin ist trotzdem reserviert — wir melden uns mit den finalen Zahlungsdetails.",
        mockSessionId: `mock_cs_${crypto.randomUUID().slice(0, 12)}`,
      });
    }

    // Future: Stripe Checkout Session (17,90 EUR, metadata: date, slot, paymentMethodId)
    return NextResponse.json({
      ok: true,
      mode: "live-ready" as const,
      mockSessionId: `prep_cs_${crypto.randomUUID().slice(0, 12)}`,
      message:
        "Stripe ist konfiguriert — hier kann die Checkout Session erstellt werden (Betrag, Währung EUR, Metadata).",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }
}
