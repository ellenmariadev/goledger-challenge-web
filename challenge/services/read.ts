import { api } from "@/services/api";

export async function readAsset<T>(assetType: string, key: string) {
  return api<T>(`/query/readAsset`, {
    method: "POST",
    body: {
      key: {
        "@assetType": assetType,
        "@key": key,
      },
    },
  });
}