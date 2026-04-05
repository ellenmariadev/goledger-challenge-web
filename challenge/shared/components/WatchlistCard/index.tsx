"use client";

import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import styles from "./watchlistCard.module.css";
import { WatchlistCardProps } from "./watchlistCard.types";

export function WatchlistCard({
  watchlist,
  showsByKey,
  onEdit,
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

  return (
    <article className={styles.card} aria-label={watchlist.title}>
      <div className={styles.cardHeader}>
        <Text variant="label" as="h3" className={styles.title}>
          {watchlist.title}
        </Text>
        <Menu title={watchlist.title} content={menuContent} />
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
          {watchlist.tvShows?.length ?? 0} films
        </Text>
      </div>
    </article>
  );
}
