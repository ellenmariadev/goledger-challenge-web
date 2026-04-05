"use client";

import { useReadAllEpisodes } from "@/shared/hooks/useEpisodes";
import { useReadAllSeasons } from "@/shared/hooks/useSeasons";
import { Text } from "@/shared/ui/Text";
import { SeasonCard } from "../SeasonCard";
import styles from "./seasonList.module.css";

export function SeasonList({ tvShowKey }: { tvShowKey: string }) {
  const { data: seasons = [] } = useReadAllSeasons();
  const { data: episodes = [] } = useReadAllEpisodes();

  const seasonsForShow = seasons
    .filter((season) => season.tvShow?.["@key"] === tvShowKey)
    .sort((a, b) => a.number - b.number);

  const seasonCards = seasonsForShow.map((season) => {
    const seasonEpisodes = episodes
      .filter((episode) => episode.season?.["@key"] === season["@key"])
      .sort((a, b) => a.episodeNumber - b.episodeNumber);

    return {
      key: season["@key"],
      name: `Season ${season.number} (${season.year})`,
      episodeCount: seasonEpisodes.length,
      episodes: seasonEpisodes.slice(0, 4).map((episode) => ({
        key: episode["@key"],
        label: episode.title,
      })),
    };
  });

  if (!seasonCards.length) {
    return (
      <div className={styles.list}>
        <Text variant="body-sm" className={styles.emptyState}>
          No seasons found.
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {seasonCards.map((season) => (
        <SeasonCard key={season.key} season={season} />
      ))}
    </div>
  );
}
