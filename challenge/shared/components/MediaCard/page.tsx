"use client";

import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import Tooltip from "@/shared/ui/Tooltip";
import { getRatingByRecommendedAge } from "@/shared/utils/rating";
import { PreviewCard } from "@base-ui/react/preview-card";
import { Play, X } from "lucide-react";
import WatchlistDialog from "./components/WatchlistDialog";
import styles from "./mediaCard.module.css";

const MediaCard = ({
  title,
  recommendedAge,
  watchlist = true,
  onRemove,
  tvShowKey,
}: {
  title: string;
  recommendedAge: number;
  watchlist?: boolean;
  onRemove?: () => void;
  tvShowKey?: string;
}) => {
  const rating = getRatingByRecommendedAge(recommendedAge);

  const menuContent = [
    { label: "Edit", onClick: () => console.log("edit") },
    { label: "Delete", onClick: () => console.log("delete") },
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
        ) : (
          <Menu title={title} content={menuContent} />
        )}
      </div>

      <div className={styles.cardBottom}>
        <Tooltip content="Details">
          <div
            className={styles.iconButton}
            role="button"
            tabIndex={0}
            aria-label="details"
          >
            <Play size={12} />
          </div>
        </Tooltip>

        {watchlist && (
          <WatchlistDialog
            title={title}
            tvShowKey={tvShowKey}
            recommendedAge={recommendedAge}
          />
        )}

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
