"use client";

import Menu from "@/shared/ui/Menu";
import { Text } from "@/shared/ui/Text";
import { useRouter } from "next/navigation";
import type { TvShow } from "@/services/tvShow";
import styles from "./tvShowHeader.module.css";

type TvShowHeaderProps = {
  tvShow: TvShow;
  tvShowKey: string;
};

export function TvShowHeader({ tvShow, tvShowKey }: TvShowHeaderProps) {
  const router = useRouter();

  const menuContent = [
    {
      label: "Edit",
      onClick: () => router.push(`/tv-shows/${tvShowKey}/edit`),
    },
    { label: "Delete", onClick: () => console.log("delete", tvShowKey) },
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
    </header>
  );
}
