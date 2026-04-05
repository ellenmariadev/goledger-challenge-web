"use client";

import { EpisodeRow } from "../EpisodeRow";
import styles from "./episodeList.module.css";

const mockEpisodes = Array.from({ length: 6 }, (_, i) => ({
  key: `ep-${i}`,
  code: "EP01S01",
  title: `Episode 0${i + 1}`,
  rating: 9.5,
}));

export function EpisodeList({ tvShowKey }: { tvShowKey: string }) {
  return (
    <div className={styles.list}>
      {mockEpisodes.map((episode, index) => (
        <EpisodeRow key={episode.key} episode={episode} index={index + 1} />
      ))}
    </div>
  );
}
