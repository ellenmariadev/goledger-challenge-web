"use client";

import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { Play } from "lucide-react";
import styles from "./episodeRow.module.css";

type Episode = {
  key: string;
  code: string;
  title: string;
  rating: number;
};

export function EpisodeRow({
  episode,
  index,
}: {
  episode: Episode;
  index: number;
}) {
  const menuContent = [
    { label: "Edit", onClick: () => console.log("edit", episode.key) },
    { label: "Delete", onClick: () => console.log("delete", episode.key) },
  ];

  return (
    <article className={styles.row}>
      <Text variant="body-sm" className={styles.index}>
        {index}
      </Text>
      <button type="button" className={styles.playButton} aria-label="play">
        <Play size={12} />
      </button>
      <Text variant="body-sm" className={styles.code}>
        {episode.code} - {episode.title}
      </Text>
      <Text variant="body-sm" className={styles.rating}>
        [
        {Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            className={
              i < Math.floor(episode.rating) ? styles.starFilled : styles.star
            }
          >
            ★
          </span>
        ))}
        ] {episode.rating}
      </Text>
      <Menu title={episode.title} content={menuContent} />
    </article>
  );
}
