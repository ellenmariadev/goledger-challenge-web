"use client";

import type { TvSearchResult } from "@/shared/types/tvShows.types";
import { InitialsPreview } from "@/shared/components/InitialsPreview";
import { AlertDialog } from "@/shared/ui/AlertDialog";
import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { useMemo, useState } from "react";
import styles from "./watchlistCard.module.css";
import { WatchlistCardProps } from "./watchlistCard.types";

export function WatchlistCard({
  watchlist,
  showsByKey,
  onEdit,
  onOpen,
  onDelete,
}: WatchlistCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const menuContent = [
    { label: "Edit", onClick: onEdit },
    { label: "Delete", onClick: () => setConfirmOpen(true) },
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
    <>
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
          <InitialsPreview
            items={previewShows.map((show) => ({
              key: show["@key"],
              label: show.title,
            }))}
            variant="stacked"
          />
          <Text variant="body-sm" className={styles.count}>
            {watchlist.tvShows?.length ?? 0} tv shows
          </Text>
        </div>
      </article>
      <AlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete"
        description={`"${watchlist.title}" watchlist will be permanently removed.`}
        confirmLabel="delete"
        variant="danger"
        onConfirm={async () => {
          await onDelete();
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
