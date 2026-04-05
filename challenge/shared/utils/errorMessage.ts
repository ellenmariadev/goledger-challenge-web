import type { FetcherError } from "@/shared/types/api.types";

export function getErrorMessage(error: unknown) {
  const { message } = (error ?? {}) as Partial<FetcherError>;
  return typeof message === "string" ? message : "Something went wrong. Please try again.";
}