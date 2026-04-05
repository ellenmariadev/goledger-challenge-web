import { api } from "@/services/api";
import { CreateTvShowInput, TvShowAsset } from "@/shared/types/tvShows.types";

export async function createTvShow({ title, description, recommendedAge }: CreateTvShowInput) {
  return api<unknown, { asset: TvShowAsset[] }>("/invoke/createAsset", {
    method: "POST",
    body: {
      asset: [
        {
          "@assetType": "tvShows",
          title,
          ...(description && { description }),
          recommendedAge,
        },
      ],
    },
  });
}