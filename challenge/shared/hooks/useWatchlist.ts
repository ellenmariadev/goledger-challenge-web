import { fetchSearchOptions } from "@/services/search";
import type { WatchlistSearchResult } from "@/shared/types/watchlist.types";
import { useQuery } from "@tanstack/react-query";

export const WATCHLIST_QUERY_KEY = ["watchlist-search"] as const;

const fetchWatchlistOptions = () =>
  fetchSearchOptions<WatchlistSearchResult>({ assetType: "watchlist" });

export function useWatchlists() {
  return useQuery({
    queryKey: WATCHLIST_QUERY_KEY,
    queryFn: fetchWatchlistOptions,
    staleTime: 60_000,
  });
}