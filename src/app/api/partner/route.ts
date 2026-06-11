import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()/-]{5,}$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const firmenname = asTrimmedString(body.firmenname);
    const ansprechpartner = asTrimmedString(body.ansprechpartner);
    const email = asTrimmedString(body.email);
    const telefon = asTrimmedString(body.telefon);

    if (!firmenname || !ansprechpartner) {
      return NextResponse.json(
        { ok: false, error: "Firmenname und Ansprechpartner sind erforderlich." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Bitte eine gültige E-Mail-Adresse angeben." },
        { status: 400 },
      );
    }
    if (!PHONE_RE.test(telefon)) {
      return NextResponse.json(
        { ok: false, error: "Bitte eine gültige Telefonnummer angeben." },
        { status: 400 },
      );
    }

    const id = `partner_${crypto.randomUUID().slice(0, 8)}`;
    console.info("[api/partner]", id, {
      firmenname,
      ansprechpartner,
      email,
      telefon,
      standort: asTrimmedString(body.standort),
      spezialisierung: asTrimmedString(body.spezialisierung),
      nachricht: asTrimmedString(body.nachricht).slice(0, 500),
    });
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }
}
