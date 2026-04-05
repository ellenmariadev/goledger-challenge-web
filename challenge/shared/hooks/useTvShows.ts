import { fetchSearchOptions } from "@/services/search";
import { TV_SHOWS_ALL_QUERY_KEY } from "@/shared/constants/queryKey";
import type { TvSearchResult } from "@/shared/types/tvShows.types";
import { useQuery } from "@tanstack/react-query";

const fetchTvShowsOptions = () =>
  fetchSearchOptions<TvSearchResult>({ assetType: "tvShows" });

export function useReadAllTvShows() {
  return useQuery({
    queryKey: TV_SHOWS_ALL_QUERY_KEY,
    queryFn: fetchTvShowsOptions,
    staleTime: 60_000,
  });
}