export type FunnelSelections = {
  brands: string[];
  bodyType: string | null;
  budgetMax: number | null;
  mileage: string | null;
  usage: string[];
  priorities: string[];
  transmission: string | null;
  drive: string | null;
};

export const EMPTY_FUNNEL_SELECTIONS: FunnelSelections = {
  brands: [],
  bodyType: null,
  budgetMax: null,
  mileage: null,
  usage: [],
  priorities: [],
  transmission: null,
  drive: null,
};

export function hasAnyFunnelSelection(s: FunnelSelections): boolean {
  return (
    s.brands.length > 0 ||
    s.bodyType != null ||
    s.budgetMax != null ||
    s.mileage != null ||
    s.usage.length > 0 ||
    s.priorities.length > 0 ||
    s.transmission != null ||
    s.drive != null
  );
}

export const FUNNEL_BUDGET_MIN = 0;
export const FUNNEL_BUDGET_MAX = 15_000;
export const FUNNEL_BUDGET_STEP = 500;
export const FUNNEL_BUDGET_DEFAULT = 8_000;
