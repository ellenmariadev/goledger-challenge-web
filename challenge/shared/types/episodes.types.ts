import { AssetReference, SearchResult } from "./api.types";

export type EpisodeSearchResult = SearchResult<"episodes"> & {
  episodeNumber: number;
  releaseDate: string;
  description: string;
  rating: number;
  season: AssetReference<"seasons">;
  title: string;
};

export type EpisodeAsset = {
  "@assetType": "episodes";
  season: AssetReference<"seasons">;
  episodeNumber: number;
  title: string;
  releaseDate: string;
  description: string;
  rating?: number;
};

export type EpisodeUpdateAsset = {
  "@assetType": "episodes";
  "@key": string;
  title?: string;
  releaseDate?: string;
  description?: string;
  rating?: number;
};

export type CreateEpisodeInput = {
  seasonKey: string;
  episodeNumber: number;
  title: string;
  releaseDate: string;
  description: string;
  rating?: number;
};

export type UpdateEpisodeInput = {
  key: string;
  title?: string;
  releaseDate?: string;
  description?: string;
  rating?: number;
};