"use client";

import { ConciergeCard } from "@/components/concierge/ConciergeCard";
import type { ExtractedAttributes } from "@/types/concierge";
import {
  Banknote,
  CarFront,
  Cog,
  Fuel,
  LayoutGrid,
  Sparkles,
  Tag,
} from "lucide-react";
import type { ReactNode } from "react";

const rows: {
  key: keyof ExtractedAttributes;
  label: string;
  icon: ReactNode;
}[] = [
  { key: "marke", label: "Marke", icon: <Tag className="size-4" /> },
  { key: "modell", label: "Modell", icon: <CarFront className="size-4" /> },
  { key: "budget", label: "Budget", icon: <Banknote className="size-4" /> },
  {
    key: "karosserieform",
    label: "Karosserie",
    icon: <LayoutGrid className="size-4" />,
  },
  { key: "kraftstoff", label: "Kraftstoff", icon: <Fuel className="size-4" /> },
  { key: "getriebe", label: "Getriebe", icon: <Cog className="size-4" /> },
  {
    key: "besonderheiten",
    label: "Besonderheiten",
    icon: <Sparkles className="size-4" />,
  },
];

export function SmartExtractionChips({ data }: { data: ExtractedAttributes }) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748b]">
          Strukturierte Merkmale
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-[#475569]">
          Automatisch aus deinem Freitext — fehlende Felder klären wir persönlich mit dir.
        </p>
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((f, i) => (
          <ConciergeCard
            key={f.key}
            label={f.label}
            value={data[f.key]}
            delay={0.06 * i + 0.08}
            icon={f.icon}
          />
        ))}
      </div>
    </div>
  );
}
