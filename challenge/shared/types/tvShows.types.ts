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

export type TvShowAsset = {
  "@assetType": "tvShows";
  title: string;
  description?: string;
  recommendedAge: number;
};

export type CreateTvShowInput = {
  title: string;
  description?: string;
  recommendedAge: number;
};


export type SelectedTvShow = Pick<TvSearchResult, "@key" | "title" | "recommendedAge">