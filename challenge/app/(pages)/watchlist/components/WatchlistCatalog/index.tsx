"use client";

import { WatchlistCard } from "@/shared/components/WatchlistCard";
import { useReadAllTvShows } from "@/shared/hooks/useTvShows";
import { useDeleteWatchlist, useWatchlists } from "@/shared/hooks/useWatchlist";
import { useToast } from "@/shared/providers/Toast";
import { Button } from "@/shared/ui/Button";
import { Loading } from "@/shared/ui/Loading";
import { Text } from "@/shared/ui/Text";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { createSlug } from "@/shared/utils/slug";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import styles from "./watchlistCatalog.module.css";

export function WatchlistCatalog() {
  const router = useRouter();
  const toast = useToast();
  const { data: watchlists = [], isLoading: loadingWatchlists } =
    useWatchlists();
  const { data: allShows = [], isLoading: loadingShows } = useReadAllTvShows();
  const { mutateAsync: deleteWatchlistAsync } = useDeleteWatchlist();

  const WATCHLIST_SLUG_OPTIONS = { fallback: "watchlist" };

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
                `/watchlist/${createSlug(watchlist.title, watchlist["@key"], WATCHLIST_SLUG_OPTIONS)}`
              )
            }
            onEdit={() =>
              router.push(
                `/watchlist/${createSlug(watchlist.title, watchlist["@key"], WATCHLIST_SLUG_OPTIONS)}/edit`
              )
            }
            onDelete={async () => {
              try {
                await deleteWatchlistAsync({ key: watchlist["@key"] });
                toast.add({
                  title: "Watchlist deleted",
                  description: `\"${watchlist.title}\" was deleted successfully.`,
                  type: "success",
                  timeout: 3500,
                });
              } catch (error) {
                toast.add({
                  title: "Delete failed",
                  description: getErrorMessage(error).error,
                  type: "error",
                  priority: "high",
                  timeout: 5000,
                });
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}
