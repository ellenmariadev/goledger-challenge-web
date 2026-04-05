"use client";

import { WatchlistCard } from "@/shared/components/WatchlistCard";
import { useReadAllTvShows } from "@/shared/hooks/useTvShows";
import { useWatchlists } from "@/shared/hooks/useWatchlist";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import styles from "./watchlistCatalog.module.css";
import { Loading } from "@/shared/ui/Loading";

export function WatchlistCatalog() {
  const router = useRouter();
  const { data: watchlists = [], isLoading: loadingWatchlists } =
    useWatchlists();
  const { data: allShows = [], isLoading: loadingShows } = useReadAllTvShows();

  
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
            onEdit={() => router.push(`/watchlist/${watchlist["@key"]}/edit`)}
          />
        ))}
      </div>
    </section>
  );
}
