import { fetchSearchOptions } from "@/services/search";
import { deleteWatchlist } from "@/services/watchlist";
import { WATCHLIST_QUERY_KEY } from "@/shared/constants/queryKey";
import type { DeleteWatchlistOptions, WatchlistSearchResult } from "@/shared/types/watchlist.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchWatchlistOptions = () =>
  fetchSearchOptions<WatchlistSearchResult>({ assetType: "watchlist" });

export function useWatchlists() {
  return useQuery({
    queryKey: WATCHLIST_QUERY_KEY,
    queryFn: fetchWatchlistOptions,
    staleTime: 60_000,
  });
}

export function useDeleteWatchlist(options: DeleteWatchlistOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWatchlist,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: WATCHLIST_QUERY_KEY });
      await options.onSuccess?.(...args);
    },
  });
}