import { api } from "@/services/api";
import { SearchApiResponse, SearchQueryPayload, ApiRequestOptions } from "@/shared/types/api.types";

export async function search<TResponse>(
  payload: SearchQueryPayload,
  options: Omit<ApiRequestOptions<SearchQueryPayload>, "method" | "body"> = {}
) {
  return api<TResponse, SearchQueryPayload>("/query/search", {
    ...options,
    method: "POST",
    body: payload,
  });
}

export async function fetchSearchOptions<TItem>({
  assetType,
}: {
  assetType: string;
}) {
  const data = await search<SearchApiResponse<TItem>>({
    query: {
      selector: {
        "@assetType": assetType,
      },
    },
  });

  return data.result;
}




