import { deleteEpisode } from "@/services/episode";
import { fetchSearchOptions } from "@/services/search";
import { EPISODES_QUERY_KEY, SEASONS_QUERY_KEY } from "@/shared/constants/queryKey";
import type { DeleteEpisodeOptions, EpisodeSearchResult } from "@/shared/types/episodes.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchEpisodesOptions = () =>
  fetchSearchOptions<EpisodeSearchResult>({ assetType: "episodes" });

export function useReadAllEpisodes() {
  return useQuery({
    queryKey: EPISODES_QUERY_KEY,
    queryFn: fetchEpisodesOptions,
    staleTime: 60_000,
  });
}

export function useDeleteEpisode(options: DeleteEpisodeOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEpisode,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: EPISODES_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: SEASONS_QUERY_KEY });
      await options.onSuccess?.(...args);
    },
  });
}
