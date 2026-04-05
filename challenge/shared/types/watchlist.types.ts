import { AssetReference, SearchResult } from "./api.types";

export type WatchlistSearchResult = SearchResult<"watchlist"> & {
  description: string;
  title: string;
};

export type WatchlistAsset = {
  "@assetType": "watchlist";
  title: string;
  description: string;
  tvShows: AssetReference<"tvShows">[];
};

export type CreateWatchlistInput = {
  title: string;
  description: string;
  tvShowKeys: string[];
};

export type UpdateWatchlistInput = {
  key: string;
  title?: string;
  description?: string;
  tvShowKeys?: string[];
};

export type DeleteWatchlistInput = {
  key: string;
};

export type WatchlistUpdateAsset = {
  "@assetType": "watchlist";
  "@key": string;
  title?: string;
  description?: string;
  tvShows?: AssetReference<"tvShows">[];
};

export type ReadWatchlistResponse = WatchlistSearchResult & {
  tvShows: AssetReference<"tvShows">[];
};

export type DeleteWatchlistOptions = {
  onSuccess?: () => void | Promise<void>;
};