"use client";

import { FloatingField } from "@/components/forms/FloatingField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type PartnerPortalLoginProps = {
  className?: string;
};

/**
 * Platzhalter für späteres CMS-/Partner-Login.
 * API-Anbindung: POST an konfigurierte Auth-URL (z. B. env PARTNER_PORTAL_AUTH_URL).
 */
export function PartnerPortalLogin({ className }: PartnerPortalLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "pending">("idle");
  const [notice, setNotice] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("pending");
    setNotice(null);

    // Vorbereitet für CMS-Auth — bis dahin freundlicher Hinweis
    window.setTimeout(() => {
      setStatus("idle");
      setNotice(
        "Das Partner-Login wird in Kürze freigeschaltet. Bei Fragen: kontakt@ichsuchdeinauto.de",
      );
    }, 400);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-none border border-[#111111]/[0.06] bg-white/92 p-6 shadow-tech backdrop-blur-sm sm:p-8",
        className,
      )}
    >
      <div className="space-y-4">
        <FloatingField
          label="E-Mail"
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
        />
        <FloatingField
          label="Passwort"
          type="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="current-password"
        />
      </div>

      <Button
        type="submit"
        disabled={status === "pending"}
        className="mt-6 h-12 w-full rounded-none border-0 bg-cta-navy text-sm font-bold tracking-tight text-white shadow-[0_4px_18px_rgba(17,17,17,0.16)] transition hover:bg-cta-navy-hover disabled:opacity-50"
      >
        {status === "pending" ? "Wird geprüft…" : "Anmelden"}
      </Button>

      {notice ? (
        <p className="mt-4 text-sm leading-relaxed text-[#6b6b6b]" role="status">
          {notice}
        </p>
      ) : null}

      <p className="mt-5 text-xs leading-relaxed text-[#9a9a9a]">
        Nur für freigeschaltete Händlerpartner. Zugangsdaten erhältst du nach Onboarding.
      </p>
    </form>
  );
}
