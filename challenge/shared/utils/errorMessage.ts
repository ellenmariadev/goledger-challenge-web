import type { FetcherError } from "@/shared/types/api.types";

export function getErrorMessage(error: unknown): { error: string } {
  const { message } = (error ?? {}) as Partial<FetcherError>;

  if (typeof message === "string") {
    try {
      const parsedMessage = JSON.parse(message) as { error?: unknown };

      if (typeof parsedMessage.error === "string" && parsedMessage.error) {
        return { error: parsedMessage.error };
      }
    } catch { }

    return { error: message };
  }

  return { error: "Something went wrong. Please try again." };
}