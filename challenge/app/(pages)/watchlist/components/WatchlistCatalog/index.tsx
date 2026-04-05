"use client";

import { WatchlistCard } from "@/shared/components/WatchlistCard";
import { useReadAllTvShows } from "@/shared/hooks/useTvShows";
import { useDeleteWatchlist, useWatchlists } from "@/shared/hooks/useWatchlist";
import { Button } from "@/shared/ui/Button";
import { Loading } from "@/shared/ui/Loading";
import { Text } from "@/shared/ui/Text";
import { createWatchlistSlug } from "@/shared/utils/watchlistSlug";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import styles from "./watchlistCatalog.module.css";

export function WatchlistCatalog() {
  const router = useRouter();
  const { data: watchlists = [], isLoading: loadingWatchlists } =
    useWatchlists();
  const { data: allShows = [], isLoading: loadingShows } = useReadAllTvShows();
  const { mutateAsync: deleteWatchlistAsync } = useDeleteWatchlist();

  const showsByKey = useMemo(
    () => new Map(allShows.map((show) => [show["@key"], show])),
    [allShows]
  );

  if (loadingWatchlists || loadingShows) return <Loading />;

  return (
    <section className={styles.catalog}>
      <div className={styles.header}>
        <div>
          <Text as="h1" variant="title-lg" className={styles.title}>
            your watchlist
          </Text>
          <Text variant="body-sm" className={styles.showing}>
            showing {watchlists.length} results
          </Text>
        </div>
        <Button size="xs" onClick={() => router.push("/watchlist/new")}>
          create more +
        </Button>
      </div>

      <div className={styles.list}>
        {watchlists.map((watchlist) => (
          <WatchlistCard
            key={watchlist["@key"]}
            watchlist={watchlist}
            showsByKey={showsByKey}
            onOpen={() =>
              router.push(
                `/watchlist/${createWatchlistSlug(
                  watchlist.title,
                  watchlist["@key"]
                )}`
              )
            }
            onEdit={() =>
              router.push(
                `/watchlist/${createWatchlistSlug(
                  watchlist.title,
                  watchlist["@key"]
                )}/edit`
              )
            }
            onDelete={() => deleteWatchlistAsync({ key: watchlist["@key"] })}
          />
        ))}
      </div>
    </section>
  );
}
