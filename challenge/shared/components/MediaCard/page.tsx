import { Text } from "@/shared/ui/Text";
import { getRatingByRecommendedAge } from "@/shared/utils/rating";
import { PreviewCard } from "@base-ui/react/preview-card";
import { ListVideo, Play } from "lucide-react";
import styles from "./mediaCard.module.css";
import Tooltip from "@/shared/ui/Tooltip";
import Menu from "@/shared/ui/Menu";

const MediaCard = ({
  title,
  recommendedAge,
}: {
  title: string;
  recommendedAge: number;
}) => {
  const rating = getRatingByRecommendedAge(recommendedAge);

  const menuContent = [
    {
      label: "Edit",
      onClick: () => console.log("edit"),
    },
    {
      label: "Delete",
      onClick: () => console.log("delete"),
    },
  ];

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <Text variant="body-sm" className={styles.cardTitle}>
          {title}
        </Text>
        <Menu title={title} content={menuContent} />
      </div>

      <div className={styles.cardBottom}>
        <Tooltip content="Details">
          <button className={styles.iconButton} type="button" aria-label="details">
            <Play size={12} />
          </button>
        </Tooltip>
        <Tooltip content="Add to watchlist">
          <button
            className={styles.iconButton}
            type="button"
            aria-label="open watchlist"
          >
            <ListVideo size={12} />
          </button>
        </Tooltip>

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
