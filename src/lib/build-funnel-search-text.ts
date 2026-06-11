import type { FunnelSelections } from "@/types/funnel";

function joinList(items: string[], conjunction = "und"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items.at(-1)!}`;
}

function formatBudgetMax(max: number): string {
  return `bis ${max.toLocaleString("de-DE")} €`;
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

function formatTransmission(transmission: string): string {
  if (transmission === "Egal") return "";
  return transmission;
}

function formatDrive(drive: string): string {
  if (drive === "Egal") return "";
  return drive;
}

const MILEAGE_PHRASES: Record<string, string> = {
  "0–50 TKM": "mit max. 50.000 km",
  "50–100 TKM": "mit 50.000–100.000 km",
  "100–150 TKM": "mit 100.000–150.000 km",
  "150–200 TKM": "mit 150.000–200.000 km",
  "Über 200 TKM": "mit über 200.000 km",
};

function formatMileage(mileage: string): string {
  return MILEAGE_PHRASES[mileage] ?? `mit ${mileage}`;
}

/** Natürlicher Suchtext für die rechte Box — kein rohes Filterdump. */
export function buildNaturalSearchText(selections: FunnelSelections): string {
  const { brands, bodyType, budgetMax, mileage, usage, priorities, transmission, drive } =
    selections;
  const segments: string[] = [];

  const brandPhrase = brands.length > 0 ? joinList(brands, "oder") : "";
  const vehicleParts = [brandPhrase, bodyType].filter(Boolean);
  if (vehicleParts.length > 0) {
    let lead = vehicleParts.join(" ");
    if (budgetMax != null) {
      lead = `${lead} ${formatBudgetMax(budgetMax)}`;
    }
    segments.push(lead);
  } else if (budgetMax != null) {
    segments.push(formatBudgetMax(budgetMax));
  }

  if (mileage) {
    segments.push(formatMileage(mileage));
  }

  if (usage.length > 0) {
    segments.push(`ideal für ${formatUsage(usage)}`);
  }

  const transmissionPhrase = transmission ? formatTransmission(transmission) : "";
  const drivePhrase = drive ? formatDrive(drive) : "";

  if (transmissionPhrase && drivePhrase) {
    segments.push(`mit ${transmissionPhrase}, ${drivePhrase}`);
  } else if (transmissionPhrase) {
    segments.push(`mit ${transmissionPhrase}`);
  } else if (drivePhrase) {
    segments.push(`mit ${drivePhrase}`);
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
    selections.brands.length > 0 &&
    selections.bodyType != null &&
    selections.budgetMax != null &&
    selections.mileage != null &&
    selections.usage.length > 0 &&
    selections.priorities.length > 0 &&
    selections.transmission != null &&
    selections.drive != null
  );
}
