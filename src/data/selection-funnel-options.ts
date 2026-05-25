export type FunnelOption = {
  label: string;
  icon: string;
  description?: string;
  /** Optionales Markenlogo aus /public/logos */
  logoSrc?: string;
  /** Cache-Version bei Logo-Austausch */
  logoRev?: string;
  /** Größere Darstellung für Fahrzeugtyp-Badges aus /Autotypen */
  logoSize?: "default" | "sm" | "badge" | "badge-lg";
  /** Zusätzliche Klassen für Logo-Feinposition (z. B. translate-y-1) */
  logoImgClassName?: string;
};

export function getLogoUrl(logoSrc?: string, logoRev?: string): string | undefined {
  if (!logoSrc) return undefined;
  return logoRev ? `${logoSrc}?v=${logoRev}` : logoSrc;
}

/** Neutrale Emoji-Icons — keine Markenlogos (rechtlich unkritisch). */
const BRAND_LOGO_REV = "4";

export const brands: FunnelOption[] = [
  { label: "Opel", icon: "🚗", description: "Alltag", logoSrc: "/logos/logo_opel.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Seat",
    icon: "🔥",
    description: "Dynamisch",
    logoSrc: "/logos/logo_seat.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  { label: "Skoda", icon: "🚘", description: "Praktisch", logoSrc: "/logos/logo_skoda.png", logoRev: BRAND_LOGO_REV },
  { label: "VW", icon: "🚐", description: "Bestseller", logoSrc: "/logos/logo_vw.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Renault",
    icon: "🇫🇷",
    description: "Französisch",
    logoSrc: "/logos/logo_renault.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  {
    label: "Suzuki",
    icon: "🛵",
    description: "Kompakt",
    logoSrc: "/logos/logo_suzuki.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  {
    label: "Toyota",
    icon: "🌿",
    description: "Zuverlässig",
    logoSrc: "/logos/logo_toyota.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  {
    label: "Kia",
    icon: "🚙",
    description: "Preis-Leistung",
    logoSrc: "/logos/logo_kia.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  { label: "Fiat", icon: "🚕", description: "Stadt", logoSrc: "/logos/logo_fiat.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Hyundai",
    icon: "🚙",
    description: "Modern",
    logoSrc: "/logos/logo_hyundai.png",
    logoRev: BRAND_LOGO_REV,
    logoImgClassName: "translate-y-1.5",
  },
  { label: "Audi", icon: "🚙", description: "Premium", logoSrc: "/logos/logo_audi.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Peugeot",
    icon: "🦁",
    description: "Stilvoll",
    logoSrc: "/logos/logo_peugot.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  { label: "Dacia", icon: "💰", description: "Günstig", logoSrc: "/logos/logo_dacia.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Citroën",
    icon: "🎨",
    description: "Komfort",
    logoSrc: "/logos/logo_citroen.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  { label: "Nissan", icon: "🚗", description: "Zuverlässig", logoSrc: "/logos/logo_nissan.png", logoRev: BRAND_LOGO_REV },
  { label: "BMW", icon: "🏎️", description: "Sportlich", logoSrc: "/logos/logo_bmw.png", logoRev: BRAND_LOGO_REV },
];

const BODY_BADGE_REV = "10";
const BUDGET_BADGE_REV = "3";

export const bodyTypes: FunnelOption[] = [
  {
    label: "SUV",
    icon: "🚙",
    description: "Hoch & geräumig",
    logoSrc: "/Autotypen/badge_suv.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Jeep",
    icon: "🛻",
    description: "Gelände",
    logoSrc: "/Autotypen/badge_jeep.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Kombi",
    icon: "🚘",
    description: "Viel Platz",
    logoSrc: "/Autotypen/badge_kombi.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Pickup",
    icon: "🛻",
    description: "Pritsche",
    logoSrc: "/Autotypen/badge_pickup.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Limousine",
    icon: "🚘",
    description: "Klassisch",
    logoSrc: "/Autotypen/badge_limousine.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Cabrio",
    icon: "🏎️",
    description: "Offen",
    logoSrc: "/Autotypen/badge_cabrio.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Coupé",
    icon: "🏁",
    description: "Sportlich",
    logoSrc: "/Autotypen/badge_coupe.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Van",
    icon: "🚐",
    description: "Familie",
    logoSrc: "/Autotypen/badge_van.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
];

export const budgets: FunnelOption[] = [
  {
    label: "unter 5.000 €",
    icon: "💶",
    description: "Einstieg",
    logoSrc: "/Autotypen/badge_5k.png",
    logoRev: BUDGET_BADGE_REV,
    logoSize: "badge",
    logoImgClassName: "max-h-[3rem] max-w-[6rem]",
  },
  {
    label: "unter 10.000 €",
    icon: "💰",
    description: "Solide",
    logoSrc: "/Autotypen/badge_10k.png",
    logoRev: BUDGET_BADGE_REV,
    logoSize: "badge",
    logoImgClassName: "max-h-[3rem] max-w-[6rem]",
  },
  {
    label: "unter 15.000 €",
    icon: "💎",
    description: "Mehr Auswahl",
    logoSrc: "/Autotypen/badge_15k.png",
    logoRev: BUDGET_BADGE_REV,
    logoSize: "badge",
    logoImgClassName: "max-h-[3rem] max-w-[6rem]",
  },
];

export const usagePurposes: FunnelOption[] = [
  { label: "Alltag", icon: "🏠", description: "Zuverlässig" },
  { label: "Familie", icon: "👨‍👩‍👧", description: "Platz & Sicherheit" },
  { label: "Langstrecke", icon: "🛣️", description: "Komfort" },
  { label: "Stadtverkehr", icon: "🏙️", description: "Wendig & kompakt" },
  { label: "Erstwagen", icon: "🔑", description: "Einfach & sicher" },
  { label: "Pendeln", icon: "💼", description: "Effizient" },
  { label: "Sportlich fahren", icon: "🏁", description: "Dynamik" },
  { label: "Reisen / Camping", icon: "⛺", description: "Viel Platz" },
  { label: "Handwerk / Transport", icon: "🔧", description: "Robust" },
  { label: "Luxus / Business", icon: "✨", description: "Premium" },
];

export const priorities: FunnelOption[] = [
  { label: "Zuverlässigkeit", icon: "🛡️", description: "Wenig Sorgen" },
  { label: "Niedriger Verbrauch", icon: "⛽", description: "Sparsam" },
  { label: "Viel Platz", icon: "📦", description: "Geräumig" },
  { label: "Günstiger Unterhalt", icon: "🔧", description: "Fair kalkuliert" },
  { label: "Komfort", icon: "🛋️", description: "Angenehm" },
  { label: "Leistung", icon: "⚡", description: "Kraftvoll" },
  { label: "Modernes Design", icon: "✨", description: "Aktuell" },
  { label: "Sicherheit", icon: "🔒", description: "Geschützt" },
  { label: "Hohe Sitzposition", icon: "⬆️", description: "Gute Sicht" },
  { label: "Automatik", icon: "🅰️", description: "Komfortabel" },
  { label: "Wertstabilität", icon: "📈", description: "Guter Wiederverkauf" },
];

export const transmissions: FunnelOption[] = [
  { label: "Automatik", icon: "🅰️", description: "Komfort" },
  { label: "Schaltgetriebe", icon: "⚙️", description: "Klassisch" },
  { label: "Egal", icon: "🤝", description: "Offen" },
];

export const fuelTypes: FunnelOption[] = [
  { label: "Benzin", icon: "⛽", description: "Klassisch" },
  { label: "Diesel", icon: "🛢️", description: "Reichweite" },
  { label: "Hybrid", icon: "🔋", description: "Effizient" },
  { label: "Elektro", icon: "⚡", description: "Emissionsfrei" },
  { label: "Plug-in Hybrid", icon: "🔌", description: "Flexibel" },
  { label: "Egal", icon: "🤝", description: "Offen" },
];

export function findOptionIcon(
  options: FunnelOption[],
  label: string | null,
): string | null {
  if (!label) return null;
  const option = options.find((o) => o.label === label);
  if (!option || option.logoSrc) return null;
  return option.icon;
}

export function findOptionLogo(
  options: FunnelOption[],
  label: string | null,
): string | null {
  if (!label) return null;
  const option = options.find((o) => o.label === label);
  if (!option?.logoSrc) return null;
  return getLogoUrl(option.logoSrc, option.logoRev) ?? null;
}
