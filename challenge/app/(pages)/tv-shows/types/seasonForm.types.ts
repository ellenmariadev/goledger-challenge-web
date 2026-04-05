export type SeasonFormInitialData = {
  number: number;
  year: number;
  tvShowKey: string;
  tvShowTitle: string;
};

export type SeasonFormOptions =
  | { mode: "create"; tvShowKey: string; tvShowTitle: string }
  | { mode: "edit"; seasonKey: string; initialData: SeasonFormInitialData };