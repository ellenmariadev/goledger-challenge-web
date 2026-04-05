import { SearchResult } from "../types/api.types";

export type SeasonSearchResult = SearchResult<"seasons"> & {
  number: number;
  tvShow: AssetReference<"tvShows">;
};