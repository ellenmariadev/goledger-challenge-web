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

type SlugOptions = {
  fallback?: string;
  maxLength?: number;
};

export function createSlug(
  title: string,
  key: string,
  { fallback = "item", maxLength = 56 }: SlugOptions = {}
): string {
  const segment = normalizeSegment(title).slice(0, maxLength) || fallback;
  return `${segment}-${shortHash(key)}`;
}

export function findBySlug<T extends { "@key": string; title: string }>(
  items: T[] | undefined,
  slug: string,
  options?: SlugOptions
): T | undefined {
  if (!Array.isArray(items) || !slug) return undefined;

  return items.find((item) => createSlug(item.title, item["@key"], options) === slug);
}