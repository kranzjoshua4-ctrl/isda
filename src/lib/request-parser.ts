import type { ExtractedAttributes } from "@/types/concierge";
import { OPEN_LABEL } from "@/types/concierge";

const brands = [
  "Mercedes-Benz",
  "Mercedes",
  "Land Rover",
  "Range Rover",
  "Alfa Romeo",
  "Aston Martin",
  "Rolls-Royce",
  "Rolls Royce",
  "BMW",
  "Audi",
  "Porsche",
  "Volkswagen",
  "VW",
  "Opel",
  "Ford",
  "Toyota",
  "Lexus",
  "Honda",
  "Hyundai",
  "Kia",
  "Volvo",
  "Jaguar",
  "Defender",
  "Mini",
  "Maserati",
  "Ferrari",
  "Lamborghini",
  "Bentley",
  "McLaren",
  "Tesla",
  "Peugeot",
  "Citroën",
  "Renault",
  "Skoda",
  "Škoda",
  "Seat",
  "Cupra",
  "Genesis",
  "Infiniti",
  "Nissan",
  "Mazda",
  "Subaru",
  "Suzuki",
  "Jeep",
  "Dacia",
  "Smart",
];

const bodyWords = [
  "SUV",
  "Offroader",
  "Geländewagen",
  "Touring",
  "Kombi",
  "Avant",
  "T-Modell",
  "Cabrio",
  "Cabriolet",
  "Roadster",
  "Spyder",
  "Coupé",
  "Coupe",
  "Limousine",
  "Sedan",
  "Van",
  "Bus",
  "Multivan",
  "Pickup",
  "Targa",
];

const fuelHints = [
  { label: "Benzin", rx: /\b(benzin|otto|tsi|tfsi|kompressor)\b/i },
  { label: "Diesel", rx: /\b(diesel|tdi|cdi|bluetec)\b/i },
  { label: "Elektro", rx: /\b(elektro|ev\b|battery|batterie)\b/i },
  { label: "Hybrid", rx: /\b(hybrid|phev|plug[- ]?in)\b/i },
];

function extractBudget(text: string): string | null {
  const m1 = text.match(
    /\b(unter|bis|max\.?|maximal|ca\.?|circa|budget)\s*([0-9]{1,3}(?:\.[0-9]{3})*(?:,[0-9]+)?)\s*€?/i
  );
  if (m1?.[1] && m1?.[2]) return `${m1[1]} ${m1[2]} €`.replace(/\s+/g, " ");
  const m2 = text.match(/\b([0-9]{1,3}(?:\.[0-9]{3})+)\s*€/);
  if (m2?.[1]) return `${m2[1]} €`;
  const m3 = text.match(/\b([0-9]{2,3})\s*000\s*€/i);
  if (m3?.[1]) return `${m3[1]}.000 €`;
  return null;
}

function extractKm(text: string): string | null {
  const m1 = text.match(/\b(unter|max\.?|bis)\s*([0-9]{1,3}(?:\.[0-9]{3})*)\s*km/i);
  if (m1?.[2]) return `${m1[2]} km`;
  const m2 = text.match(/\b([0-9]{1,3}(?:\.[0-9]{3})*)\s*km\b/i);
  if (m2?.[1]) return `${m2[1]} km`;
  return null;
}

function findBrand(text: string): string | null {
  for (const b of brands) {
    const re = new RegExp(`\\b${b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) {
      if (b === "VW") return "Volkswagen";
      if (b === "Mercedes") return "Mercedes-Benz";
      return b;
    }
  }
  return null;
}

function findModel(text: string): string | null {
  const known: RegExp[] = [
    /\b(M\d{3,4}[di]?)\b/i,
    /\b(911|718|Taycan|Cayenne|Macan|Panamera)\b/i,
    /\b(Defender\s*(?:90|110|130)|Defender)\b/i,
    /\b(Discovery|Range Rover)\b/i,
    /\b(RS[3-7])\b/i,
    /\b(A[1-8])\b/i,
    /\b(Q[2-8])\b/i,
    /\b(S[1-8])\b/i,
    /\b(e-tron)\b/i,
    /\b(GLE|GLS|GLC|GLA|CLA|CLS|SL)\b/i,
    /\b(AMG\s*GT)\b/i,
    /\b(i[3-7]|iX)\b/i,
    /\b(Z[34])\b/i,
  ];
  for (const rx of known) {
    const m = text.match(rx);
    if (m?.[1]) return m[1].replace(/\s+/g, " ").trim();
  }
  return null;
}

export function parseVehicleRequest(raw: string): ExtractedAttributes {
  const text = raw.trim();
  if (!text) {
    return emptyAttrs();
  }

  const budget = extractBudget(text);
  const km = extractKm(text);

  let karosserie = OPEN_LABEL;
  for (const w of bodyWords) {
    if (new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)) {
      karosserie = w;
      break;
    }
  }

  let kraftstoff = OPEN_LABEL;
  for (const { label, rx } of fuelHints) {
    if (rx.test(text)) {
      kraftstoff = label;
      break;
    }
  }

  let getriebe = OPEN_LABEL;
  if (/\b(automatik|automatic|dsg|steptronic|tiptronic|s\s*tronic|9g-tronic)\b/i.test(text)) {
    getriebe = "Automatik";
  } else if (/\b(manuell|manual|schaltgetriebe|schaltung)\b/i.test(text)) {
    getriebe = "Manuell";
  }

  let marke = findBrand(text) ?? OPEN_LABEL;
  const modell = findModel(text) ?? OPEN_LABEL;
  if (marke === OPEN_LABEL && modell !== OPEN_LABEL) {
    if (/^(911|718|Taycan|Cayenne|Macan|Panamera)$/i.test(modell)) {
      marke = "Porsche";
    }
  }

  const besonderheitenParts: string[] = [];
  if (/\b(selten|rar|klassiker|youngtimer|oldtimer|sammler|unikat|charakter)\b/i.test(text)) {
    besonderheitenParts.push("Charakter / Seltenheit");
  }
  const color = text.match(
    /\b(schwarz|weiß|weiss|grau|blau|rot|grün|gruen|silber|nardo)\b/i
  )?.[1];
  if (color) besonderheitenParts.push(`Farbton: ${color}`);

  return {
    marke,
    modell,
    budget: budget ?? OPEN_LABEL,
    kilometerstand: km ?? OPEN_LABEL,
    karosserieform: karosserie,
    kraftstoff,
    getriebe,
    wuensche:
      text.length > 16
        ? text.slice(0, 200).trim() + (text.length > 200 ? "…" : "")
        : OPEN_LABEL,
    besonderheiten: besonderheitenParts.length ? besonderheitenParts.join(" · ") : OPEN_LABEL,
  };
}

function emptyAttrs(): ExtractedAttributes {
  return {
    marke: OPEN_LABEL,
    modell: OPEN_LABEL,
    budget: OPEN_LABEL,
    kilometerstand: OPEN_LABEL,
    karosserieform: OPEN_LABEL,
    kraftstoff: OPEN_LABEL,
    getriebe: OPEN_LABEL,
    wuensche: OPEN_LABEL,
    besonderheiten: OPEN_LABEL,
  };
}
