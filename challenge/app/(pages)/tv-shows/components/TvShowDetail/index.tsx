"use client";

import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { useTvShow } from "@/shared/hooks/useTvShows";
import { Loading } from "@/shared/ui/Loading";
import { TvShowHeader } from "../TvShowHeader";
import { TvShowTabs } from "../TvShowTabs";
import styles from "./tvShowDetail.module.css";

export function TvShowDetail({ tvShowKey }: { tvShowKey: string }) {
  const { data: tvShow, isLoading } = useTvShow(tvShowKey);

  if (isLoading || !tvShow)
    return (
      <BackgroundLayout>
        <Loading />
      </BackgroundLayout>
    );

  return (
    <section className={styles.detail}>
      <TvShowHeader tvShow={tvShow} tvShowKey={tvShowKey} />
      <TvShowTabs tvShowKey={tvShowKey} />
    </section>
  );
}
