"use client";

import { useDeleteTvShow } from "@/shared/hooks/useTvShows";
import { AlertDialog } from "@/shared/ui/AlertDialog";
import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { useToast } from "@/shared/providers/Toast";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const { mutateAsync: deleteTvShowAsync } = useDeleteTvShow();

  const hasLongDescription =
    tvShow.description && tvShow.description.length > 150;

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
          <div className={styles.descriptionWrapper}>
            <Text
              variant="body-sm"
              className={`${styles.description} ${
                !descriptionExpanded && hasLongDescription
                  ? styles.truncated
                  : ""
              }`}
            >
              {tvShow.description}
            </Text>
            {hasLongDescription && (
              <button
                type="button"
                className={styles.expandButton}
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              >
                {descriptionExpanded ? (
                  <>
                    <span>less</span>
                    <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    <span>more</span>
                    <ChevronDown size={14} />
                  </>
                )}
              </button>
            )}
          </div>
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
