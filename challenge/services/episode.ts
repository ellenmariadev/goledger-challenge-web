import { api } from "@/services/api";
import { deleteAsset } from "@/services/delete";
import type {
  CreateEpisodeInput,
  DeleteEpisodeInput,
  EpisodeAsset,
  EpisodeUpdateAsset,
  UpdateEpisodeInput,
} from "@/shared/types/episodes.types";

export async function createEpisode({
  seasonKey,
  episodeNumber,
  title,
  releaseDate,
  description,
  rating,
}: CreateEpisodeInput) {
  return api<unknown, { asset: EpisodeAsset[] }>("/invoke/createAsset", {
    method: "POST",
    body: {
      asset: [
        {
          "@assetType": "episodes",
          season: {
            "@assetType": "seasons",
            "@key": seasonKey,
          },
          episodeNumber,
          title,
          releaseDate,
          description,
          ...(rating !== undefined ? { rating } : {}),
        },
      ],
    },
  });
}

export async function updateEpisode({
  key,
  title,
  releaseDate,
  description,
  rating,
}: UpdateEpisodeInput) {
  const update: EpisodeUpdateAsset = {
    "@assetType": "episodes",
    "@key": key,
    ...(title !== undefined && { title }),
    ...(releaseDate !== undefined && { releaseDate }),
    ...(description !== undefined && { description }),
    ...(rating !== undefined && { rating }),
  };

  return api<unknown, { update: EpisodeUpdateAsset }>("/invoke/updateAsset", {
    method: "PUT",
    body: { update },
  });
}

export async function deleteEpisode({ key }: DeleteEpisodeInput) {
  return deleteAsset("episodes", key);
}