import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = `partner_${crypto.randomUUID().slice(0, 8)}`;
    console.info("[api/partner]", id, body);
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
