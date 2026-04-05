import { fetchSearchOptions } from "@/services/search";
import { WATCHLIST_QUERY_KEY } from "@/shared/constants/queryKey";
import type { WatchlistSearchResult } from "@/shared/types/watchlist.types";
import { useQuery } from "@tanstack/react-query";

const fetchWatchlistOptions = () =>
  fetchSearchOptions<WatchlistSearchResult>({ assetType: "watchlist" });

export function useWatchlists() {
  return useQuery({
    queryKey: WATCHLIST_QUERY_KEY,
    queryFn: fetchWatchlistOptions,
    staleTime: 60_000,
  });
}