import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = `req_${crypto.randomUUID().slice(0, 8)}`;
    // Mock persistence hook for future CRM / dealer dashboard
    console.info("[api/request]", id, {
      vehicle: body?.vehicleRequest?.slice?.(0, 200),
      customer: body?.customer,
    });
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
