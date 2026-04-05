import { fetchSearchOptions } from "@/services/search";
import { EPISODES_QUERY_KEY } from "@/shared/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const fetchEpisodesOptions = () =>
  fetchSearchOptions<EpisodeSearchResult>({ assetType: "episodes" });

export function useReadAllEpisodes() {
  return useQuery({
    queryKey: EPISODES_QUERY_KEY,
    queryFn: fetchEpisodesOptions,
    staleTime: 60_000,
  });
}
