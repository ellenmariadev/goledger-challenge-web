"use client";

import { useReadAllEpisodes } from "@/shared/hooks/useEpisodes";
import { useReadAllSeasons } from "@/shared/hooks/useSeasons";
import { Text } from "@/shared/ui/Text";
import { formatCode } from "@/shared/utils/formatEpisode";
import { EpisodeRow } from "../EpisodeRow";
import styles from "./episodeList.module.css";

export function EpisodeList({ tvShowKey }: { tvShowKey: string }) {
  const { data: episodes = [] } = useReadAllEpisodes();
  const { data: seasons = [] } = useReadAllSeasons();

  const seasonsForShow = seasons.filter(
    (season) => season.tvShow?.["@key"] === tvShowKey
  );
  const seasonNumberByKey = new Map(
    seasonsForShow.map((season) => [season["@key"], season.number])
  );

  const rows = episodes
    .filter((episode) => seasonNumberByKey.has(episode.season?.["@key"]))
    .sort((a, b) => {
      const seasonA = seasonNumberByKey.get(a.season["@key"]) ?? 0;
      const seasonB = seasonNumberByKey.get(b.season["@key"]) ?? 0;
      if (seasonA !== seasonB) return seasonA - seasonB;
      return a.episodeNumber - b.episodeNumber;
    })
    .map((episode) => {
      const seasonNumber = seasonNumberByKey.get(episode.season["@key"]) ?? 0;
      return {
        key: episode["@key"],
        code: formatCode(seasonNumber, episode.episodeNumber),
        title: episode.title,
        rating: episode.rating,
      };
    });

  if (!rows.length) {
    return (
      <div className={styles.list}>
        <Text variant="body-sm" className={styles.emptyState}>
          No episodes found.
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {rows.map((episode, index) => (
        <EpisodeRow key={episode.key} episode={episode} index={index + 1} />
      ))}
    </div>
  );
}
