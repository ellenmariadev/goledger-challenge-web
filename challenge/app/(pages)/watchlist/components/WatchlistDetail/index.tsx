"use client";

import { readWatchlist } from "@/services/watchlist";
import MediaCard from "@/shared/components/MediaCard/page";
import { useReadAllTvShows } from "@/shared/hooks/useTvShows";
import { useDeleteWatchlist, useWatchlists } from "@/shared/hooks/useWatchlist";
import { AlertDialog } from "@/shared/ui/AlertDialog";
import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { findWatchlistBySlug } from "@/shared/utils/watchlistSlug";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./watchlistDetail.module.css";

export function WatchlistDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  const { mutateAsync: deleteWatchlistAsync } = useDeleteWatchlist();

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
    <>
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
                onClick: () => setConfirmOpen(true),
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
                tvShowKey={show["@key"]}
                watchlist={false}
              />
              <Text variant="body-sm" className={styles.counter}>
                {index + 1}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <AlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete"
        description={`\"${watchlist.title}\" watchlist will be permanently removed.`}
        confirmLabel="delete"
        variant="danger"
        onConfirm={async () => {
          await deleteWatchlistAsync({ key: matchedWatchlist["@key"] });
          setConfirmOpen(false);
          router.push("/watchlist");
        }}
      />
    </>
  );
}
