import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import styles from "./seasonCard.module.css";

type Season = {
  key: string;
  name: string;
  episodeCount: number;
  episodes: { key: string; initials: string }[];
};

export function SeasonCard({ season }: { season: Season }) {
  const menuContent = [
    { label: "Edit", onClick: () => console.log("edit", season.key) },
    { label: "Delete", onClick: () => console.log("delete", season.key) },
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
        <div className={styles.avatars}>
          {season.episodes.map((ep) => (
            <div key={ep.key} className={styles.avatar}>
              {ep.initials}
            </div>
          ))}
        </div>
        <Text variant="body-sm" className={styles.count}>
          {season.episodeCount} episodes
        </Text>
      </div>
    </article>
  );
}
