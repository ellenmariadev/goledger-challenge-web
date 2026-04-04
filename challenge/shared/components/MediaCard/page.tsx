"use client";

import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import Tooltip from "@/shared/ui/Tooltip";
import { getRatingByRecommendedAge } from "@/shared/utils/rating";
import { PreviewCard } from "@base-ui/react/preview-card";
import { Play } from "lucide-react";
import WatchlistDialog from "./components/WatchlistDialog";
import styles from "./mediaCard.module.css";

const MediaCard = ({
  title,
  recommendedAge,
  watchlist = true,
}: {
  title: string;
  recommendedAge: number;
  watchlist?: boolean;
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
        <Menu title={title} content={menuContent} />
      </div>

      <div className={styles.cardBottom}>
        <Tooltip content="Details">
          <button
            className={styles.iconButton}
            type="button"
            aria-label="details"
          >
            <Play size={12} />
          </button>
        </Tooltip>

        {watchlist && <WatchlistDialog title={title} />}

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
