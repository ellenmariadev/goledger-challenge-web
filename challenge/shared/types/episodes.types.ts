import { AssetReference, SearchResult } from "./api.types";

export type EpisodeSearchResult = SearchResult<"episodes"> & {
  episodeNumber: number;
  rating: number;
  season: AssetReference<"seasons">;
  title: string;
};