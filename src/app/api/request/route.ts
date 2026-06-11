import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      vehicleRequest?: unknown;
      customer?: { email?: unknown; telefon?: unknown };
    };

    const vehicleRequest =
      typeof body?.vehicleRequest === "string" ? body.vehicleRequest.trim() : "";
    if (vehicleRequest.length < 2 || vehicleRequest.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Ungültige Fahrzeuganfrage." },
        { status: 400 },
      );
    }

    const email = typeof body?.customer?.email === "string" ? body.customer.email.trim() : "";
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Ungültige E-Mail-Adresse." },
        { status: 400 },
      );
    }

    const id = `req_${crypto.randomUUID().slice(0, 8)}`;
    // Mock persistence hook for future CRM / dealer dashboard
    console.info("[api/request]", id, {
      vehicle: vehicleRequest.slice(0, 200),
      customer: body?.customer,
    });
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }
}
