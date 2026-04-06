"use client";

import { useDeleteEpisode } from "@/shared/hooks/useEpisodes";
import { AlertDialog } from "@/shared/ui/AlertDialog";
import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { useToast } from "@/shared/providers/Toast";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./episodeRow.module.css";

type Episode = {
  key: string;
  code: string;
  title: string;
  rating: number;
};

export function EpisodeRow({
  episode,
  index,
}: {
  episode: Episode;
  index: number;
}) {
  const router = useRouter();
  const toast = useToast();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const { mutateAsync: deleteEpisodeAsync } = useDeleteEpisode();

  const menuContent = [
    {
      label: "Edit",
      onClick: () =>
        router.push(
          `/tv-shows/episode/${encodeURIComponent(episode.key)}/edit`
        ),
    },
    { label: "Delete", onClick: () => setConfirmDeleteOpen(true) },
  ];

  return (
    <article className={styles.row}>
      <Text variant="body-sm" className={styles.index}>
        {index}
      </Text>
      <button type="button" className={styles.playButton} aria-label="play">
        <Play size={12} />
      </button>
      <Text variant="body-sm" className={styles.code}>
        {episode.code} - {episode.title}
      </Text>
      <Text variant="body-sm" className={styles.rating}>
        [
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={
              i < Math.floor(episode.rating) ? styles.starFilled : styles.star
            }
          >
            ★
          </span>
        ))}
        ] {episode.rating}
      </Text>
      <Menu title={episode.title} content={menuContent} />

      <AlertDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete"
        description={`\"${episode.title}\" episode will be permanently removed.`}
        confirmLabel="delete"
        variant="danger"
        onConfirm={async () => {
          try {
            await deleteEpisodeAsync({ key: episode.key });
            setConfirmDeleteOpen(false);
            toast.add({
              title: "Episode deleted",
              description: `\"${episode.title}\" was deleted successfully.`,
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
