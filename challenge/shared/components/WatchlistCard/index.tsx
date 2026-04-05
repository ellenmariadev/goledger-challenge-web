"use client";

import type { TvSearchResult } from "@/shared/types/tvShows.types";
import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { useMemo } from "react";
import styles from "./watchlistCard.module.css";
import { WatchlistCardProps } from "./watchlistCard.types";

export function WatchlistCard({
  watchlist,
  showsByKey,
  onEdit,
  onOpen,
}: WatchlistCardProps) {
  const menuContent = [
    { label: "Edit", onClick: onEdit },
    {
      label: "Delete",
      onClick: () => console.log("delete", watchlist["@key"]),
    },
  ];

  const previewShows = useMemo(
    () =>
      (watchlist.tvShows ?? [])
        .slice(0, 4)
        .map((ref) => showsByKey.get(ref["@key"]))
        .filter((show): show is TvSearchResult => !!show?.title),
    [watchlist.tvShows, showsByKey]
  );

  function handleCardKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  }

  return (
    <article
      className={styles.card}
      aria-label={watchlist.title}
      role="link"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleCardKeyDown}
    >
      <div className={styles.cardHeader}>
        <Text variant="label" as="h3" className={styles.title}>
          {watchlist.title}
        </Text>
        <div
          className={styles.menuContainer}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <Menu title={watchlist.title} content={menuContent} />
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.avatars}>
          {previewShows.length > 0 ? (
            previewShows.map((show) => (
              <div
                key={show["@key"]}
                className={styles.avatar}
                title={show.title}
                aria-label={show.title}
              >
                {show.title.slice(0, 2).toUpperCase()}
              </div>
            ))
          ) : (
            <div className={styles.avatar}>?</div>
          )}
        </div>
        <Text variant="body-sm" className={styles.count}>
          {watchlist.tvShows?.length ?? 0} tv shows
        </Text>
      </div>
    </article>
  );
}
