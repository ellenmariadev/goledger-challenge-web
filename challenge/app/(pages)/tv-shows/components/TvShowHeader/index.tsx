"use client";

import { useDeleteTvShow } from "@/shared/hooks/useTvShows";
import { AlertDialog } from "@/shared/ui/AlertDialog";
import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { useToast } from "@/shared/providers/Toast";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TvSearchResult } from "@/shared/types/tvShows.types";
import styles from "./tvShowHeader.module.css";

type TvShowHeaderProps = {
  tvShow: TvSearchResult;
  tvShowKey: string;
};

export function TvShowHeader({ tvShow, tvShowKey }: TvShowHeaderProps) {
  const router = useRouter();
  const toast = useToast();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const { mutateAsync: deleteTvShowAsync } = useDeleteTvShow();

  const menuContent = [
    {
      label: "Edit",
      onClick: () => router.push(`/tv-shows/${tvShowKey}/edit`),
    },
    { label: "Delete", onClick: () => setConfirmDeleteOpen(true) },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Text as="h1" variant="title-lg" className={styles.title}>
          {tvShow.title}
        </Text>
        {tvShow.description && (
          <Text variant="body-sm" className={styles.description}>
            {tvShow.description}
          </Text>
        )}
      </div>
      <Menu title={tvShow.title} content={menuContent} />

      <AlertDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete"
        description={`\"${tvShow.title}\" tv show will be permanently removed.`}
        confirmLabel="delete"
        variant="danger"
        onConfirm={async () => {
          try {
            await deleteTvShowAsync({ key: tvShowKey });
            setConfirmDeleteOpen(false);
            toast.add({
              title: "TV show deleted",
              description: `\"${tvShow.title}\" was deleted successfully.`,
              type: "success",
              timeout: 3500,
            });
            router.push("/tv-shows");
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
    </header>
  );
}
