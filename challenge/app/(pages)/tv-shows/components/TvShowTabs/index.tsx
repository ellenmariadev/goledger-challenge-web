"use client";

import { useState } from "react";
import { EpisodeList } from "../EpisodeList";
import { SeasonList } from "../SeasonList";
import styles from "./tvShowTabs.module.css";
import { Button } from "@/shared/ui/Button";
import { useRouter } from "next/navigation";

export function TvShowTabs({ tvShowKey }: { tvShowKey: string }) {
  const [activeTab, setActiveTab] = useState<"seasons" | "episodes">("seasons");
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${activeTab === "seasons" ? styles.active : ""}`}
            onClick={() => setActiveTab("seasons")}
          >
            seasons
          </button>
          <button
            type="button"
            className={`${styles.tab} ${activeTab === "episodes" ? styles.active : ""}`}
            onClick={() => setActiveTab("episodes")}
          >
            episodes
          </button>
        </div>

        <Button
          className={styles.addButton}
          size="xs"
          onClick={() =>
            router.push(
              activeTab === "seasons"
                ? `/tv-shows/season/new?tvShowKey=${encodeURIComponent(tvShowKey)}`
                : `/tv-shows/episode/new?tvShowKey=${encodeURIComponent(tvShowKey)}`
            )
          }
        >
          {activeTab === "seasons" ? "new season +" : "new episode +"}
        </Button>
      </div>

      <div className={styles.content}>
        {activeTab === "seasons" ? (
          <SeasonList tvShowKey={tvShowKey} />
        ) : (
          <EpisodeList tvShowKey={tvShowKey} />
        )}
      </div>
    </div>
  );
}
