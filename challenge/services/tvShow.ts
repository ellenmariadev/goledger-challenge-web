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

export async function updateTvShow({ key, title, description, recommendedAge }: UpdateTvShowInput) {
  return api<unknown, { update: object }>("/invoke/updateAsset", {
    method: "PUT",
    body: {
      update: {
        "@assetType": "tvShows",
        "@key": key,
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(recommendedAge !== undefined && { recommendedAge }),
      },
    },
  });
}