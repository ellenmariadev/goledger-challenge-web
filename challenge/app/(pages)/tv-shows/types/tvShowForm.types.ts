export type TvShowFormInitialData = {
  title: string;
  description: string;
  recommendedAge: number;
};

export type TvShowFormOptions =
  | { mode: "create" }
  | { mode: "edit"; tvShowKey: string; initialData: TvShowFormInitialData };
