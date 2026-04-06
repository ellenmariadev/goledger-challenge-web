"use client";

import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { useReadAllTvShows, useTvShow } from "@/shared/hooks/useTvShows";
import { Loading } from "@/shared/ui/Loading";
import { findBySlug } from "@/shared/utils/slug";
import { useMemo } from "react";
import { TvShowHeader } from "../TvShowHeader";
import { TvShowTabs } from "../TvShowTabs";
import styles from "./tvShowDetail.module.css";

export function TvShowDetail({ tvShowKey }: { tvShowKey: string }) {
  const { data: tvShows = [], isLoading: isLoadingTvShows } =
    useReadAllTvShows();

  const matchedTvShow = useMemo(
    () => findBySlug(tvShows, tvShowKey),
    [tvShows, tvShowKey]
  );

  const matchedTvShowKey = matchedTvShow?.["@key"] ?? tvShowKey;
  const { data: tvShow, isLoading: isLoadingTvShow } =
    useTvShow(matchedTvShowKey);

  if (isLoadingTvShows || isLoadingTvShow || !tvShow)
    return (
      <BackgroundLayout>
        <Loading />
      </BackgroundLayout>
    );

  return (
    <section className={styles.detail}>
      <TvShowHeader tvShow={tvShow} tvShowKey={matchedTvShowKey} />
      <TvShowTabs tvShowKey={matchedTvShowKey} />
    </section>
  );
}
