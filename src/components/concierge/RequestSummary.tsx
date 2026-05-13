"use client";

import type { ExtractedAttributes } from "@/types/concierge";
import { ConciergeCard } from "@/components/concierge/ConciergeCard";
import { Car, Cog, Coins, Droplets, Gauge, Sparkles, Tag } from "lucide-react";
import type { ReactNode } from "react";

const fields: { key: keyof ExtractedAttributes; label: string; icon: ReactNode }[] = [
  { key: "marke", label: "Marke", icon: <Tag className="size-4" /> },
  { key: "modell", label: "Modell", icon: <Car className="size-4" /> },
  { key: "budget", label: "Budget", icon: <Coins className="size-4" /> },
  { key: "kilometerstand", label: "Kilometerstand", icon: <Gauge className="size-4" /> },
  { key: "karosserieform", label: "Karosserieform", icon: <Car className="size-4" /> },
  { key: "kraftstoff", label: "Kraftstoff", icon: <Droplets className="size-4" /> },
  { key: "getriebe", label: "Getriebe", icon: <Cog className="size-4" /> },
  { key: "wuensche", label: "Wünsche", icon: <Sparkles className="size-4" /> },
  { key: "besonderheiten", label: "Besonderheiten", icon: <Sparkles className="size-4" /> },
];

export function RequestSummary({ data }: { data: ExtractedAttributes }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f, i) => (
        <ConciergeCard
          key={f.key}
          label={f.label}
          value={data[f.key]}
          delay={0.06 * i}
          icon={f.icon}
        />
      ))}
    </div>
  );
}
