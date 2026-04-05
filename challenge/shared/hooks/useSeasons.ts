import { fetchSearchOptions } from "@/services/search";
import { SEASONS_QUERY_KEY } from "@/shared/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const fetchSeasonsOptions = () =>
  fetchSearchOptions<SeasonSearchResult>({ assetType: "seasons" });

export function useReadAllSeasons() {
  return useQuery({
    queryKey: SEASONS_QUERY_KEY,
    queryFn: fetchSeasonsOptions,
    staleTime: 60_000,
  });
}
