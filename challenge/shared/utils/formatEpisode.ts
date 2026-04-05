export function formatCode(seasonNumber: number, episodeNumber: number): string {
  const s = String(seasonNumber).padStart(2, "0");
  const e = String(episodeNumber).padStart(2, "0");
  return `EP${e}S${s}`;
}