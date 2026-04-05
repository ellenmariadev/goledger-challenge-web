import { TvSearchResult } from "@/shared/types/tvShows.types";
import { WatchlistSearchResult } from "@/shared/types/watchlist.types";

export type WatchlistCardProps = {
  watchlist: WatchlistSearchResult;
  showsByKey: Map<string, TvSearchResult>;
  onEdit: () => void;
};