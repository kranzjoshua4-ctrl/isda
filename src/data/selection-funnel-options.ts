import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  ArrowUp,
  Briefcase,
  Building2,
  Car,
  CarFront,
  ChevronsDown,
  ChevronsUp,
  CircleGauge,
  Flag,
  Fuel,
  Gauge,
  Gem,
  Home,
  KeyRound,
  Lock,
  Minus,
  Mountain,
  Package,
  Route,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tent,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";

export type FunnelOption = {
  label: string;
  icon: string;
  description?: string;
  logoSrc?: string;
  logoRev?: string;
  logoSize?: "default" | "sm" | "badge" | "badge-lg";
  logoImgClassName?: string;
  lucideIcon?: LucideIcon;
};

export function getLogoUrl(logoSrc?: string, logoRev?: string): string | undefined {
  if (!logoSrc) return undefined;
  return logoRev ? `${logoSrc}?v=${logoRev}` : logoSrc;
}

const BRAND_LOGO_REV = "4";
const BODY_BADGE_REV = "10";

export const brands: FunnelOption[] = [
  { label: "Opel", icon: "", description: "Alltag", logoSrc: "/logos/logo_opel.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Seat",
    icon: "",
    description: "Dynamisch",
    logoSrc: "/logos/logo_seat.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  { label: "Skoda", icon: "", description: "Praktisch", logoSrc: "/logos/logo_skoda.png", logoRev: BRAND_LOGO_REV },
  { label: "VW", icon: "", description: "Bestseller", logoSrc: "/logos/logo_vw.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Renault",
    icon: "",
    description: "Französisch",
    logoSrc: "/logos/logo_renault.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  {
    label: "Suzuki",
    icon: "",
    description: "Kompakt",
    logoSrc: "/logos/logo_suzuki.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  {
    label: "Toyota",
    icon: "",
    description: "Zuverlässig",
    logoSrc: "/logos/logo_toyota.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  {
    label: "Kia",
    icon: "",
    description: "Preis-Leistung",
    logoSrc: "/logos/logo_kia.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  { label: "Fiat", icon: "", description: "Stadt", logoSrc: "/logos/logo_fiat.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Hyundai",
    icon: "",
    description: "Modern",
    logoSrc: "/logos/logo_hyundai.png",
    logoRev: BRAND_LOGO_REV,
    logoImgClassName: "translate-y-1.5",
  },
  { label: "Audi", icon: "", description: "Premium", logoSrc: "/logos/logo_audi.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Peugeot",
    icon: "",
    description: "Stilvoll",
    logoSrc: "/logos/logo_peugot.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  { label: "Dacia", icon: "", description: "Günstig", logoSrc: "/logos/logo_dacia.png", logoRev: BRAND_LOGO_REV },
  {
    label: "Citroën",
    icon: "",
    description: "Komfort",
    logoSrc: "/logos/logo_citroen.png",
    logoRev: BRAND_LOGO_REV,
    logoSize: "sm",
  },
  { label: "Nissan", icon: "", description: "Zuverlässig", logoSrc: "/logos/logo_nissan.png", logoRev: BRAND_LOGO_REV },
  { label: "BMW", icon: "", description: "Sportlich", logoSrc: "/logos/logo_bmw.png", logoRev: BRAND_LOGO_REV },
];

/** Reihe 1: wichtigste Kategorien */
export const bodyTypesTop: FunnelOption[] = [
  {
    label: "Kleinwagen",
    icon: "",
    description: "Kompakt",
    lucideIcon: Car,
  },
  {
    label: "Limousine",
    icon: "",
    description: "Klassisch",
    logoSrc: "/Autotypen/badge_limousine.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Kombi",
    icon: "",
    description: "Viel Platz",
    logoSrc: "/Autotypen/badge_kombi.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Coupé",
    icon: "",
    description: "Sportlich",
    logoSrc: "/Autotypen/badge_coupe.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
];

/** Reihe 2 */
export const bodyTypesMiddle: FunnelOption[] = [
  {
    label: "Kompaktwagen",
    icon: "",
    description: "Alltag",
    lucideIcon: CarFront,
  },
  {
    label: "Nutzfahrzeug",
    icon: "",
    description: "Transport",
    lucideIcon: Truck,
  },
];

/** Reihe 3 */
export const bodyTypesBottom: FunnelOption[] = [
  {
    label: "Pickup",
    icon: "",
    description: "Pritsche",
    logoSrc: "/Autotypen/badge_pickup.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "Jeep",
    icon: "",
    description: "Gelände",
    logoSrc: "/Autotypen/badge_jeep.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
  {
    label: "SUV",
    icon: "",
    description: "Hoch & geräumig",
    logoSrc: "/Autotypen/badge_suv.png",
    logoRev: BODY_BADGE_REV,
    logoSize: "badge",
  },
];

export const bodyTypes: FunnelOption[] = [
  ...bodyTypesTop,
  ...bodyTypesMiddle,
  ...bodyTypesBottom,
];

export const mileageBands: FunnelOption[] = [
  { label: "0–50 TKM", icon: "", description: "Sehr wenig gelaufen", lucideIcon: Gauge },
  { label: "50–100 TKM", icon: "", description: "Geringe Laufleistung", lucideIcon: Gauge },
  { label: "100–150 TKM", icon: "", description: "Mittlere Laufleistung", lucideIcon: Gauge },
  { label: "150–200 TKM", icon: "", description: "Höhere Laufleistung", lucideIcon: Gauge },
  { label: "Über 200 TKM", icon: "", description: "Viel gefahren", lucideIcon: Gauge },
];

export const usagePurposes: FunnelOption[] = [
  { label: "Alltag", icon: "", description: "Zuverlässig", lucideIcon: Home },
  { label: "Familie", icon: "", description: "Platz & Sicherheit", lucideIcon: Users },
  { label: "Langstrecke", icon: "", description: "Komfort", lucideIcon: Route },
  { label: "Stadtverkehr", icon: "", description: "Wendig & kompakt", lucideIcon: Building2 },
  { label: "Erstwagen", icon: "", description: "Einfach & sicher", lucideIcon: KeyRound },
  { label: "Pendeln", icon: "", description: "Effizient", lucideIcon: Briefcase },
  { label: "Sportlich fahren", icon: "", description: "Dynamik", lucideIcon: Flag },
  { label: "Reisen / Camping", icon: "", description: "Viel Platz", lucideIcon: Tent },
  { label: "Handwerk / Transport", icon: "", description: "Robust", lucideIcon: Wrench },
  { label: "Luxus / Business", icon: "", description: "Premium", lucideIcon: Gem },
];

export const priorities: FunnelOption[] = [
  { label: "Zuverlässigkeit", icon: "", description: "Wenig Sorgen", lucideIcon: ShieldCheck },
  { label: "Niedriger Verbrauch", icon: "", description: "Sparsam", lucideIcon: Fuel },
  { label: "Viel Platz", icon: "", description: "Geräumig", lucideIcon: Package },
  { label: "Günstiger Unterhalt", icon: "", description: "Fair kalkuliert", lucideIcon: Wallet },
  { label: "Komfort", icon: "", description: "Angenehm", lucideIcon: Armchair },
  { label: "Leistung", icon: "", description: "Kraftvoll", lucideIcon: Zap },
  { label: "Modernes Design", icon: "", description: "Aktuell", lucideIcon: Sparkles },
  { label: "Sicherheit", icon: "", description: "Geschützt", lucideIcon: Lock },
  { label: "Hohe Sitzposition", icon: "", description: "Gute Sicht", lucideIcon: ArrowUp },
  { label: "Wertstabilität", icon: "", description: "Guter Wiederverkauf", lucideIcon: TrendingUp },
];

export const transmissions: FunnelOption[] = [
  { label: "Automatik", icon: "", description: "Komfort", lucideIcon: CircleGauge },
  { label: "Schaltgetriebe", icon: "", description: "Klassisch", lucideIcon: Settings2 },
  { label: "Egal", icon: "", description: "Offen", lucideIcon: Minus },
];

export const driveTypes: FunnelOption[] = [
  { label: "Frontantrieb", icon: "", description: "Effizient", lucideIcon: ChevronsUp },
  { label: "Heckantrieb", icon: "", description: "Dynamisch", lucideIcon: ChevronsDown },
  { label: "Allrad", icon: "", description: "Grip", lucideIcon: Mountain },
  { label: "Egal", icon: "", description: "Offen", lucideIcon: Minus },
];

export function findOptionIcon(
  options: FunnelOption[],
  label: string | null,
): string | null {
  if (!label) return null;
  const option = options.find((o) => o.label === label);
  if (!option || option.logoSrc || option.lucideIcon) return null;
  return option.icon || null;
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

export function findBrandLogo(brand: string): string | null {
  return findOptionLogo(brands, brand);
}

