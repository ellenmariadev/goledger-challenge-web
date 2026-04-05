"use client";

import { useTvShow } from "@/shared/hooks/useTvShows";
import { TvShowTabs } from "../TvShowTabs";
import styles from "./tvShowDetail.module.css";
import { TvShowHeader } from "../TvShowHeader";

export function TvShowDetail({ tvShowKey }: { tvShowKey: string }) {
  const { data: tvShow, isLoading } = useTvShow(tvShowKey);

  if (isLoading || !tvShow) return null;

  return (
    <section className={styles.detail}>
      <TvShowHeader tvShow={tvShow} tvShowKey={tvShowKey} />
      <TvShowTabs tvShowKey={tvShowKey} />
    </section>
  );
}
