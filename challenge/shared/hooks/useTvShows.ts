import { readAsset } from "@/services/read";
import { fetchSearchOptions } from "@/services/search";
import { TV_SHOW_QUERY_KEY, TV_SHOWS_ALL_QUERY_KEY } from "@/shared/constants/queryKey";
import type { TvSearchResult } from "@/shared/types/tvShows.types";
import { useQueries, useQuery } from "@tanstack/react-query";

const fetchTvShowsOptions = () =>
  fetchSearchOptions<TvSearchResult>({ assetType: "tvShows" });

export function useReadAllTvShows() {
  return useQuery({
    queryKey: TV_SHOWS_ALL_QUERY_KEY,
    queryFn: fetchTvShowsOptions,
    staleTime: 60_000,
  });
}

const readTvShow = (key: string) =>
  readAsset<TvSearchResult>("tvShows", key);

export function useReadTvShows(keys: string[]) {
  const results = useQueries({
    queries: keys.map((key) => ({
      queryKey: [...TV_SHOW_QUERY_KEY, key],
      queryFn: () => readTvShow(key),
      staleTime: 60_000,
      enabled: keys.length > 0,
    })),
  });

  return {
    tvShows: results
      .map((result) => result.data)
      .filter((show): show is TvSearchResult => !!show),
    isLoading: results.some((result) => result.isLoading),
    isError: results.some((result) => result.isError),
    isFetching: results.some((result) => result.isFetching),
  };
}