"use client";

import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import Tooltip from "@/shared/ui/Tooltip";
import { getRatingByRecommendedAge } from "@/shared/utils/rating";
import { PreviewCard } from "@base-ui/react/preview-card";
import { Play, X } from "lucide-react";
import { useRouter } from "next/navigation";
import WatchlistDialog from "./components/WatchlistDialog";
import styles from "./mediaCard.module.css";
import { createSlug } from "@/shared/utils/slug";

const MediaCard = ({
  title,
  recommendedAge,
  watchlist = true,
  onRemove,
  onEdit,
  onDelete,
  tvShowKey,
}: {
  title: string;
  recommendedAge: number;
  watchlist?: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  tvShowKey?: string;
}) => {
  const router = useRouter();
  const rating = getRatingByRecommendedAge(recommendedAge);
  const TV_SHOW_SLUG_OPTIONS = { fallback: "tv-shows" };

  const menuContent = [
    ...(onEdit ? [{ label: "Edit", onClick: onEdit }] : []),
    ...(onDelete ? [{ label: "Delete", onClick: onDelete }] : []),
  ];

  return (
    <article className={styles.card} aria-label={title}>
      <div className={styles.cardTop}>
        <Text variant="body-sm" as="h3" className={styles.cardTitle}>
          {title}
        </Text>
        {onRemove ? (
          <button
            type="button"
            className={styles.removeButton}
            onClick={onRemove}
            aria-label={`remove ${title}`}
          >
            <X size={12} />
          </button>
        ) : menuContent.length > 0 ? (
          <Menu title={title} content={menuContent} />
        ) : null}
      </div>

      <div className={styles.cardBottom}>
        <Tooltip content="Details">
          <button
            type="button"
            className={styles.iconButton}
            aria-label="details"
            disabled={!tvShowKey}
            onClick={() => {
              if (!tvShowKey) return;
              router.push(
                `/tv-shows/${createSlug(title, tvShowKey, TV_SHOW_SLUG_OPTIONS)}`
              );
            }}
          >
            <Play size={12} />
          </button>
        </Tooltip>

        {watchlist && <WatchlistDialog title={title} tvShowKey={tvShowKey} />}

        <PreviewCard.Root>
          <PreviewCard.Trigger
            className={styles.ratingBadge}
            style={{ backgroundColor: rating.color }}
            aria-label={`rating ${rating.code}`}
          >
            {rating.code}
          </PreviewCard.Trigger>

          <PreviewCard.Portal>
            <PreviewCard.Positioner sideOffset={8} side="top">
              <PreviewCard.Popup className={styles.ratingPreviewPopup}>
                <Text variant="label" className={styles.ratingPreviewTitle}>
                  {rating.title}
                </Text>
                <Text
                  variant="body-sm"
                  className={styles.ratingPreviewDescription}
                >
                  {rating.description}
                </Text>
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      </div>
    </article>
  );
};

export default MediaCard;
