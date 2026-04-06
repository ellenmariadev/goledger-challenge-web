import { api } from "@/services/api";
import { deleteAsset } from "@/services/delete";
import type {
  CreateSeasonInput,
  DeleteSeasonInput,
  SeasonAsset,
  SeasonUpdateAsset,
  UpdateSeasonInput,
} from "@/shared/types/seasons.types";

export async function createSeason({ number, year, tvShowKey }: CreateSeasonInput) {
  return api<unknown, { asset: SeasonAsset[] }>("/invoke/createAsset", {
    method: "POST",
    body: {
      asset: [
        {
          "@assetType": "seasons",
          number,
          year,
          tvShow: {
            "@assetType": "tvShows",
            "@key": tvShowKey,
          },
        },
      ],
    },
  });
}

export async function updateSeason({ key, number, year, tvShowKey }: UpdateSeasonInput) {
  const update: SeasonUpdateAsset = {
    "@assetType": "seasons",
    "@key": key,
    ...(number !== undefined && { number }),
    ...(year !== undefined && { year }),
    ...(tvShowKey !== undefined && {
      tvShow: {
        "@assetType": "tvShows",
        "@key": tvShowKey,
      },
    }),
  };

  return api<unknown, { update: SeasonUpdateAsset }>("/invoke/updateAsset", {
    method: "PUT",
    body: { update },
  });
}

export async function deleteSeason({ key }: DeleteSeasonInput) {
  return deleteAsset("seasons", key);
}