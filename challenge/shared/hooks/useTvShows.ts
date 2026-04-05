import { fetchSearchOptions } from "@/services/search";
import type { TvSearchResult } from "@/shared/types/tvShows.types";
import { useQuery } from "@tanstack/react-query";

export const TV_SHOWS_QUERY_KEY = ["tv-shows-search"] as const;

const fetchTvShowsOptions = () =>
  fetchSearchOptions<TvSearchResult>({ assetType: "tvShows" });

export function useTvShows() {
  return useQuery({
    queryKey: TV_SHOWS_QUERY_KEY,
    queryFn: fetchTvShowsOptions,
    staleTime: 60_000,
  });
}