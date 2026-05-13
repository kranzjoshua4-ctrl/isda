"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const initial = {
  firmenname: "",
  ansprechpartner: "",
  email: "",
  telefon: "",
  standort: "",
  spezialisierung: "",
  nachricht: "",
};

export function PartnerForm({ className }: { className?: string }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const onChange = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("done");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-tech/50 focus:ring-2 focus:ring-tech/15";

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <input required className={field} placeholder="Firmenname" value={form.firmenname} onChange={onChange("firmenname")} />
        <input required className={field} placeholder="Ansprechpartner" value={form.ansprechpartner} onChange={onChange("ansprechpartner")} />
        <input required type="email" className={field} placeholder="E-Mail" value={form.email} onChange={onChange("email")} />
        <input required className={field} placeholder="Telefonnummer" value={form.telefon} onChange={onChange("telefon")} />
        <input required className={field} placeholder="Standort" value={form.standort} onChange={onChange("standort")} />
        <input className={field} placeholder="Spezialisierung" value={form.spezialisierung} onChange={onChange("spezialisierung")} />
      </div>
      <textarea
        className={cn(field, "min-h-[120px] resize-none")}
        placeholder="Nachricht"
        value={form.nachricht}
        onChange={onChange("nachricht")}
      />
      <Button type="submit" disabled={status === "loading"} className="h-10 rounded-lg border-0 bg-cta-navy px-6 font-semibold text-tech-foreground shadow-cta transition hover:-translate-y-px hover:scale-[1.02] hover:bg-cta-navy-hover hover:shadow-cta-hover active:translate-y-0 active:scale-[0.98]">
        {status === "loading" ? "Senden…" : "Kurz vorstellen"}
      </Button>
      {status === "done" ? (
        <p className="text-sm text-muted-foreground">Danke. Wir melden uns diskret bei dir.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-destructive">Das hat nicht geklappt. Bitte später erneut.</p>
      ) : null}
    </form>
  );
}
