export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRequestOptions<TBody = unknown> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export type FetcherError = {
  status: number;
  message: string;
};

export type AssetReference<T extends string> = {
  "@assetType": T;
  "@key": string;
};

export type SearchQueryPayload = {
  query: {
    selector: Record<string, unknown>;
  };
};

export type SearchResult<TAssetType extends string = string> = {
  "@assetType": TAssetType;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastTxID": string;
  "@lastUpdated": string;
};

export type SearchApiResponse<TItem> = {
  metadata: unknown;
  result: TItem[];
};
