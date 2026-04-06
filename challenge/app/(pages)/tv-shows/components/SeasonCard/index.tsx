"use client";

import { InitialsPreview } from "@/shared/components/InitialsPreview";
import { useDeleteSeason } from "@/shared/hooks/useSeasons";
import { AlertDialog } from "@/shared/ui/AlertDialog";
import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { useToast } from "@/shared/providers/Toast";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./seasonCard.module.css";

type Season = {
  key: string;
  name: string;
  episodeCount: number;
  episodes: { key: string; label: string }[];
};

export function SeasonCard({ season }: { season: Season }) {
  const router = useRouter();
  const toast = useToast();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const { mutateAsync: deleteSeasonAsync } = useDeleteSeason();

  const menuContent = [
    {
      label: "Edit",
      onClick: () =>
        router.push(`/tv-shows/season/${encodeURIComponent(season.key)}/edit`),
    },
    { label: "Delete", onClick: () => setConfirmDeleteOpen(true) },
  ];

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <Text variant="label" className={styles.name}>
          {season.name}
        </Text>
        <Menu title={season.name} content={menuContent} />
      </div>
      <div className={styles.cardBody}>
        <InitialsPreview
          items={season.episodes.map((episode) => ({
            key: episode.key,
            label: episode.label,
          }))}
          variant="inline"
        />
        <Text variant="body-sm" className={styles.count}>
          {season.episodeCount} episodes
        </Text>
      </div>

      <AlertDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete"
        description={`\"${season.name}\" season will be permanently removed.`}
        confirmLabel="delete"
        variant="danger"
        onConfirm={async () => {
          try {
            await deleteSeasonAsync({ key: season.key });
            setConfirmDeleteOpen(false);
            toast.add({
              title: "Season deleted",
              description: `\"${season.name}\" was deleted successfully.`,
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
    </article>
  );
}
