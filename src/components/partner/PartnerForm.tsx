"use client";

import { FloatingField } from "@/components/forms/FloatingField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";

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
  const messageId = useId();

  const onChange = (k: keyof typeof initial) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

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

  const messageFilled = form.nachricht.trim().length > 0;

  return (
    <form onSubmit={onSubmit} className={cn("space-y-5 sm:space-y-6", className)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <FloatingField
          label="Firmenname"
          value={form.firmenname}
          onChange={onChange("firmenname")}
          required
          autoComplete="organization"
        />
        <FloatingField
          label="Ansprechpartner"
          value={form.ansprechpartner}
          onChange={onChange("ansprechpartner")}
          required
          autoComplete="name"
        />
        <FloatingField
          label="E-Mail"
          type="email"
          value={form.email}
          onChange={onChange("email")}
          required
          autoComplete="email"
        />
        <FloatingField
          label="Telefonnummer"
          type="tel"
          value={form.telefon}
          onChange={onChange("telefon")}
          required
          autoComplete="tel"
        />
        <FloatingField
          label="Standort"
          value={form.standort}
          onChange={onChange("standort")}
          required
        />
        <FloatingField
          label="Spezialisierung"
          value={form.spezialisierung}
          onChange={onChange("spezialisierung")}
        />
      </div>

      <div className="group relative">
        <textarea
          id={messageId}
          value={form.nachricht}
          onChange={(e) => onChange("nachricht")(e.target.value)}
          className={cn(
            "peer w-full min-h-[140px] resize-none rounded-none border bg-white/95 px-4 pb-3 pt-7 text-[15px] font-medium leading-relaxed tracking-tight text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.04)] outline-none transition",
            "border-[rgba(17,17,17,0.1)] placeholder:text-transparent",
            "hover:border-[#111111]/20 focus:border-premium/45 focus:ring-2 focus:ring-premium/15",
          )}
          placeholder="Nachricht"
        />
        <label
          htmlFor={messageId}
          className={cn(
            "pointer-events-none absolute left-4 top-5 origin-left text-[15px] transition-all duration-200 ease-out",
            "text-[#6b6b6b] peer-focus:top-3 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-[#111111]",
            messageFilled &&
              "top-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111111]",
          )}
        >
          Nachricht
        </label>
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-12 min-w-[200px] rounded-none border-0 bg-cta-navy px-8 text-sm font-bold tracking-tight text-white shadow-[0_4px_18px_rgba(17,17,17,0.16)] transition hover:bg-cta-navy-hover hover:shadow-[0_8px_28px_rgba(17,17,17,0.2)] active:translate-y-0 active:scale-[0.98] disabled:opacity-45"
        >
          {status === "loading" ? "Senden…" : "Kurz vorstellen"}
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-[14rem] sm:text-right">
          Diskret. Kein Vertriebs-Bot.
        </p>
      </div>

      {status === "done" ? (
        <p className="text-sm font-medium text-[#111111]" role="status">
          Danke. Wir melden uns diskret bei dir.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          Das hat nicht geklappt. Bitte später erneut.
        </p>
      ) : null}
    </form>
  );
}
