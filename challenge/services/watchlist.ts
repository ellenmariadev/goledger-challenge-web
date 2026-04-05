import { api } from "@/services/api";
import { deleteAsset } from "@/services/delete";
import type {
  CreateWatchlistInput,
  DeleteWatchlistInput,
  ReadWatchlistResponse,
  UpdateWatchlistInput,
  WatchlistAsset,
  WatchlistUpdateAsset,
} from "@/shared/types/watchlist.types";

export async function createWatchlist({ title, description, tvShowKeys }: CreateWatchlistInput) {
  return api<unknown, { asset: WatchlistAsset[] }>("/invoke/createAsset", {
    method: "POST",
    body: {
      asset: [
        {
          "@assetType": "watchlist",
          title,
          description,
          tvShows: tvShowKeys.map((key) => ({ "@assetType": "tvShows", "@key": key })),
        },
      ],
    },
  });
}

export async function updateWatchlist({ key, title, description, tvShowKeys }: UpdateWatchlistInput) {
  const update: WatchlistUpdateAsset = {
    "@assetType": "watchlist",
    "@key": key,
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(tvShowKeys !== undefined && {
      tvShows: tvShowKeys.map((k) => ({ "@assetType": "tvShows", "@key": k })),
    }),
  };

  return api<unknown, { update: WatchlistUpdateAsset }>("/invoke/updateAsset", {
    method: "PUT",
    body: { update },
  });
}

export async function readWatchlist(key: string) {
  return api<ReadWatchlistResponse>(`/query/readAsset`, {
    method: "POST",
    body: {
      key: {
        "@assetType": "watchlist",
        "@key": key,
      },
    },
  });
}

export async function deleteWatchlist({ key }: DeleteWatchlistInput) {
  return deleteAsset("watchlist", key);
}
