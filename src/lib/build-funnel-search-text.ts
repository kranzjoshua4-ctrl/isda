import type { FunnelSelections } from "@/types/funnel";

function joinList(items: string[], conjunction = "und"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items.at(-1)!}`;
}

function formatBudget(budget: string): string {
  return budget.replace(/^unter\s+/i, "bis ");
}

const PRIORITY_PHRASES: Record<string, string> = {
  Zuverlässigkeit: "Zuverlässigkeit",
  "Niedriger Verbrauch": "niedrigen Verbrauch",
  "Viel Platz": "viel Platz",
  "Günstiger Unterhalt": "günstigen Unterhalt",
  Komfort: "Komfort",
  Leistung: "Leistung",
  "Modernes Design": "modernes Design",
  Sicherheit: "Sicherheit",
  "Hohe Sitzposition": "hohe Sitzposition",
  Automatik: "Automatik",
  Wertstabilität: "Wertstabilität",
};

const USAGE_PHRASES: Record<string, string> = {
  Alltag: "den Alltag",
  Familie: "die Familie",
  Langstrecke: "Langstrecken",
  Stadtverkehr: "Stadtverkehr",
  Erstwagen: "dein Erstwagen",
  Pendeln: "Pendeln",
  "Sportlich fahren": "sportliches Fahren",
  "Reisen / Camping": "Reisen und Camping",
  "Handwerk / Transport": "Handwerk und Transport",
  "Luxus / Business": "Luxus und Business",
};

function formatUsage(items: string[]): string {
  const mapped = items.map((u) => USAGE_PHRASES[u] ?? u.toLowerCase());
  return joinList(mapped);
}

function formatPriorities(items: string[]): string {
  const mapped = items.map((p) => PRIORITY_PHRASES[p] ?? p.toLowerCase());
  return joinList(mapped);
}

function formatFuel(fuel: string): string {
  if (fuel === "Egal") return "";
  if (fuel === "Plug-in Hybrid") return "Plug-in-Hybrid-Antrieb";
  if (fuel === "Elektro") return "Elektro-Antrieb";
  return `${fuel}-Antrieb`;
}

function formatTransmission(transmission: string): string {
  if (transmission === "Egal") return "";
  return transmission;
}

/** Natürlicher Suchtext für die rechte Box — kein rohes Filterdump. */
export function buildNaturalSearchText(selections: FunnelSelections): string {
  const { brand, bodyType, budget, usage, priorities, transmission, fuel } = selections;
  const segments: string[] = [];

  const vehicleParts = [brand, bodyType].filter(Boolean) as string[];
  if (vehicleParts.length > 0) {
    let lead = vehicleParts.join(" ");
    if (budget) {
      lead = `${lead} ${formatBudget(budget)}`;
    }
    segments.push(lead);
  } else if (budget) {
    segments.push(formatBudget(budget));
  }

  if (usage.length > 0) {
    segments.push(`ideal für ${formatUsage(usage)}`);
  }

  const transmissionPhrase = transmission ? formatTransmission(transmission) : "";
  const fuelPhrase = fuel ? formatFuel(fuel) : "";

  if (transmissionPhrase && fuelPhrase) {
    segments.push(`mit ${transmissionPhrase}, ${fuelPhrase}`);
  } else if (transmissionPhrase) {
    segments.push(`mit ${transmissionPhrase}`);
  } else if (fuelPhrase) {
    segments.push(`mit ${fuelPhrase}`);
  }

  if (priorities.length > 0) {
    segments.push(`Fokus auf ${formatPriorities(priorities)}`);
  }

  if (segments.length === 0) return "";

  const [first, ...rest] = segments;
  if (rest.length === 0) return `${first}.`;
  return `${first}, ${rest.join(", ")}.`;
}

export function isFunnelCoreComplete(selections: FunnelSelections): boolean {
  return (
    selections.brand != null &&
    selections.bodyType != null &&
    selections.budget != null &&
    selections.usage.length > 0 &&
    selections.priorities.length > 0 &&
    selections.transmission != null &&
    selections.fuel != null
  );
}
