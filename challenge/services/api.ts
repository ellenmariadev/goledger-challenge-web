import { FetcherError, ApiRequestOptions } from "@/shared/types/api.types";

const BASE_URL = "/api";

export async function api<TResponse, TBody = unknown>(
  endpoint: string,
  { method = "GET", body, headers, cache, next }: ApiRequestOptions<TBody> = {}
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache,
    next,
  });

  if (!response.ok) {
    const error: FetcherError = {
      status: response.status,
      message: await response.text(),
    };
    throw error;
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

