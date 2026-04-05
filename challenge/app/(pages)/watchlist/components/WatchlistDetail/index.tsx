"use client";

import { readWatchlist } from "@/services/watchlist";
import MediaCard from "@/shared/components/MediaCard/page";
import { useReadAllTvShows } from "@/shared/hooks/useTvShows";
import { useWatchlists } from "@/shared/hooks/useWatchlist";
import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { findWatchlistBySlug } from "@/shared/utils/watchlistSlug";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import styles from "./watchlistDetail.module.css";

export function WatchlistDetail({ slug }: { slug: string }) {
  const router = useRouter();

  const { data: watchlists = [] } = useWatchlists();
  const { data: allShows = [] } = useReadAllTvShows();

  const matchedWatchlist = useMemo(
    () => findWatchlistBySlug(watchlists, slug),
    [watchlists, slug]
  );

  const { data: watchlist } = useQuery({
    queryKey: ["watchlist", matchedWatchlist?.["@key"]],
    queryFn: () => readWatchlist(matchedWatchlist!["@key"]),
    enabled: !!matchedWatchlist,
    staleTime: 60_000,
  });

  const showsByKey = useMemo(
    () => new Map(allShows.map((show) => [show["@key"], show])),
    [allShows]
  );

  const selectedShows = useMemo(
    () =>
      (watchlist?.tvShows ?? [])
        .map((ref) => showsByKey.get(ref["@key"]))
        .filter((show): show is NonNullable<typeof show> => !!show?.title),
    [watchlist, showsByKey]
  );

  if (!matchedWatchlist || !watchlist) {
    return (
      <Text variant="body-md" className={styles.notFound}>
        watchlist not found.
      </Text>
    );
  }

  return (
    <section className={styles.detail}>
      <header className={styles.header}>
        <div>
          <Text as="h1" variant="title-lg" className={styles.title}>
            {watchlist.title}
          </Text>
          {watchlist.description && (
            <Text variant="body-md" className={styles.description}>
              {watchlist.description}
            </Text>
          )}
        </div>

        <Menu
          title={watchlist.title}
          content={[
            {
              label: "Edit",
              onClick: () => router.push(`/watchlist/${slug}/edit`),
            },
            {
              label: "Delete",
              onClick: () => console.log("delete", matchedWatchlist["@key"]),
            },
          ]}
        />
      </header>

      <div className={styles.grid}>
        {selectedShows.map((show, index) => (
          <div key={show["@key"]} className={styles.gridItem}>
            <MediaCard
              title={show.title}
              recommendedAge={show.recommendedAge}
              watchlist={false}
            />
            <Text variant="body-sm" className={styles.counter}>
              {index + 1}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}
