export type FunnelSelections = {
  brand: string | null;
  bodyType: string | null;
  budget: string | null;
  usage: string[];
  priorities: string[];
  transmission: string | null;
  fuel: string | null;
};

export const EMPTY_FUNNEL_SELECTIONS: FunnelSelections = {
  brand: null,
  bodyType: null,
  budget: null,
  usage: [],
  priorities: [],
  transmission: null,
  fuel: null,
};
