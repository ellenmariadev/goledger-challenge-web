"use client";

import { Text } from "@/shared/ui/Text";
import styles from "./seasonList.module.css";
import { SeasonCard } from "../SeasonCard";

const mockSeasons = Array.from({ length: 5 }, (_, i) => ({
  key: `season-${i}`,
  name: `Season ${i + 1} (${2002 + i})`,
  episodeCount: 12,
  episodes: Array.from({ length: 4 }, (_, j) => ({
    key: `ep-${i}-${j}`,
    initials: "ST",
  })),
}));

export function SeasonList({ tvShowKey }: { tvShowKey: string }) {
  return (
    <div className={styles.list}>
      {mockSeasons.map((season) => (
        <SeasonCard key={season.key} season={season} />
      ))}
    </div>
  );
}
