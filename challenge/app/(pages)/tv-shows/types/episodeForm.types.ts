export type EpisodeSeasonOption = {
  key: string;
  label: string;
  number: number;
};

export type EpisodeFormInitialData = {
  title: string;
  releaseDate: string;
  description: string;
  rating: number;
  episodeNumber: number;
  seasonKey: string;
  seasonLabel: string;
  tvShowKey: string;
  tvShowTitle: string;
};

export type EpisodeFormOptions =
  | {
    mode: "create";
    tvShowKey: string;
    tvShowTitle: string;
    seasons: EpisodeSeasonOption[];
    existingEpisodesBySeason: Record<string, number[]>;
  }
  | {
    mode: "edit";
    episodeKey: string;
    initialData: EpisodeFormInitialData;
  };