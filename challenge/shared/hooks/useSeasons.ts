import { deleteSeason } from "@/services/season";
import { fetchSearchOptions } from "@/services/search";
import { EPISODES_QUERY_KEY, SEASONS_QUERY_KEY } from "@/shared/constants/queryKey";
import type { DeleteSeasonOptions, SeasonSearchResult } from "@/shared/types/seasons.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchSeasonsOptions = () =>
  fetchSearchOptions<SeasonSearchResult>({ assetType: "seasons" });

export function useReadAllSeasons() {
  return useQuery({
    queryKey: SEASONS_QUERY_KEY,
    queryFn: fetchSeasonsOptions,
    staleTime: 60_000,
  });
}

export function useDeleteSeason(options: DeleteSeasonOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSeason,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SEASONS_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: EPISODES_QUERY_KEY });
      await options.onSuccess?.();
    },
  });
}
