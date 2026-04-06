import { AssetReference, SearchResult } from "./api.types";

export type SeasonSearchResult = SearchResult<"seasons"> & {
  number: number;
  year: number;
  tvShow: AssetReference<"tvShows">;
};

export type SeasonAsset = {
  "@assetType": "seasons";
  number: number;
  year: number;
  tvShow: AssetReference<"tvShows">;
};

export type SeasonUpdateAsset = {
  "@assetType": "seasons";
  "@key": string;
  number?: number;
  year?: number;
  tvShow?: AssetReference<"tvShows">;
};

export type CreateSeasonInput = {
  number: number;
  year: number;
  tvShowKey: string;
};

export type UpdateSeasonInput = {
  key: string;
  number?: number;
  year?: number;
  tvShowKey?: string;
};

export type DeleteSeasonInput = {
  key: string;
};

export type DeleteSeasonOptions = {
  onSuccess?: () => void | Promise<void>;
};