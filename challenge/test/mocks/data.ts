import type { TvSearchResult } from "@/shared/types/tvShows.types";
import type { WatchlistSearchResult } from "@/shared/types/watchlist.types";
import type { SeasonSearchResult } from "@/shared/types/seasons.types";
import type { EpisodeSearchResult } from "@/shared/types/episodes.types";
import type { SearchResult } from "@/shared/types/api.types";

function withSearchMeta<TAssetType extends string>(
  assetType: TAssetType,
  key: string
): SearchResult<TAssetType> {
  return {
    "@assetType": assetType,
    "@key": key,
    "@lastTouchBy": "test",
    "@lastTx": "0",
    "@lastTxID": "0",
    "@lastUpdated": "1970-01-01T00:00:00.000Z",
  };
}

export const tvShowA: TvSearchResult = {
  ...withSearchMeta("tvShows", "tv-1"),
  title: "Breaking Good",
  description: "A show about testing.",
  recommendedAge: 14,
};

export const tvShowB: TvSearchResult = {
  ...withSearchMeta("tvShows", "tv-2"),
  title: "Better Call Jest",
  description: "Lawyers and assertions.",
  recommendedAge: 16,
};

export const watchlistA: WatchlistSearchResult = {
  ...withSearchMeta("watchlist", "wl-1"),
  title: "My Watchlist",
  description: "Stuff to watch.",
  tvShows: [{ "@assetType": "tvShows", "@key": tvShowA["@key"] }],
};

export const seasonA: SeasonSearchResult = {
  ...withSearchMeta("seasons", "s-1"),
  number: 1,
  year: 2020,
  tvShow: { "@assetType": "tvShows", "@key": tvShowA["@key"] },
};

export const episodeA: EpisodeSearchResult = {
  ...withSearchMeta("episodes", "e-1"),
  title: "Pilot",
  rating: 4,
  episodeNumber: 1,
  releaseDate: "2020-01-01",
  description: "First episode.",
  season: { "@assetType": "seasons", "@key": seasonA["@key"] },
};
