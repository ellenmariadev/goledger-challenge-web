import { SearchResult } from "./api.types";

export type TvSearchResult = SearchResult<"tvShows"> & {
  "description": string;
  "recommendedAge": number;
  "title": string;
};

export type TvShowsSearchResponse = {
  metadata: unknown;
  result: TvSearchResult[];
};