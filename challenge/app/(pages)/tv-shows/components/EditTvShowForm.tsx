"use client";

import { useTvShowForm } from "@/app/(pages)/tv-shows/hooks/useTvShowForm";
import { TvShowForm } from "@/shared/components/TvShowForm";
import { useReadAllTvShows, useTvShow } from "@/shared/hooks/useTvShows";
import { Loading } from "@/shared/ui/Loading";
import { findBySlug } from "@/shared/utils/slug";
import { useMemo } from "react";

export function EditTvShowForm({ tvShowKey }: { tvShowKey: string }) {
  const { data: tvShows = [], isLoading: isLoadingTvShows } =
    useReadAllTvShows();

  const matchedTvShow = useMemo(
    () => findBySlug(tvShows, tvShowKey),
    [tvShows, tvShowKey]
  );

  const matchedTvShowKey = matchedTvShow?.["@key"] ?? tvShowKey;
  const { data: tvShow, isLoading: isLoadingTvShow } =
    useTvShow(matchedTvShowKey);

  if (isLoadingTvShows || isLoadingTvShow) return <Loading />;
  if (!tvShow) return null;

  return (
    <EditTvShowFormInner
      tvShowKey={matchedTvShowKey}
      initialData={{
        title: tvShow.title,
        description: tvShow.description ?? "",
        recommendedAge: tvShow.recommendedAge,
      }}
    />
  );
}

function EditTvShowFormInner({
  tvShowKey,
  initialData,
}: {
  tvShowKey: string;
  initialData: {
    title: string;
    description: string;
    recommendedAge: number;
  };
}) {
  const form = useTvShowForm({ mode: "edit", tvShowKey, initialData });

  return (
    <TvShowForm
      {...form}
      formTitle="edit tv show"
      formSubtitle="Update your tv show details."
      submitLabel="save changes"
    />
  );
}
