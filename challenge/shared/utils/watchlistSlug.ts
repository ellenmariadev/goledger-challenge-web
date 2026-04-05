import type { WatchlistSearchResult } from "@/shared/types/watchlist.types";

function normalizeSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 56);
}

function shortHash(value: string): string {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }

  return (hash >>> 0).toString(36).slice(0, 6);
}

export function createWatchlistSlug(title: string, key: string): string {
  const titleSegment = normalizeSegment(title) || "watchlist";
  return `${titleSegment}-${shortHash(key)}`;
}

export function findWatchlistBySlug(
  watchlists: WatchlistSearchResult[],
  slug: string
): WatchlistSearchResult | undefined {
  return watchlists.find(
    (watchlist) => createWatchlistSlug(watchlist.title, watchlist["@key"]) === slug
  );
}
