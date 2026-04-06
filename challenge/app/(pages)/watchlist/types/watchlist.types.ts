import { SelectedTvShow } from "@/shared/types/tvShows.types";

export type WatchlistFormInitialData = {
  title: string;
  description: string;
  tvShows: SelectedTvShow[];
};

export type WatchlistFormOptions =
  | { mode: "create" }
  | { mode: "edit"; watchlistKey: string; initialData: WatchlistFormInitialData };