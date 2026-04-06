"use client";

import { useSeasonForm } from "@/app/(pages)/tv-shows/hooks/useSeasonForm";
import { SeasonForm } from "@/shared/components/SeasonForm";
import { useReadAllSeasons } from "@/shared/hooks/useSeasons";
import { useTvShow } from "@/shared/hooks/useTvShows";
import { Loading } from "@/shared/ui/Loading";
import { useMemo } from "react";

export function EditSeasonForm({ seasonKey }: { seasonKey: string }) {
  const { data: seasons = [], isLoading: isLoadingSeasons } =
    useReadAllSeasons();

  const season = useMemo(
    () => seasons.find((item) => item["@key"] === seasonKey),
    [seasons, seasonKey]
  );
  const linkedTvShowKey = season?.tvShow?.["@key"] ?? "";
  const { data: linkedTvShow, isLoading: isLoadingTvShow } =
    useTvShow(linkedTvShowKey);

  const isLoading = isLoadingSeasons || isLoadingTvShow;
  if (isLoading) return <Loading />;

  if (!season || !linkedTvShow) return null;

  return (
    <EditSeasonFormInner
      seasonKey={seasonKey}
      initialData={{
        number: season.number,
        year: season.year,
        tvShowKey: linkedTvShowKey,
        tvShowTitle: linkedTvShow.title,
      }}
    />
  );
}

function EditSeasonFormInner({
  seasonKey,
  initialData,
}: {
  seasonKey: string;
  initialData: {
    number: number;
    year: number;
    tvShowKey: string;
    tvShowTitle: string;
  };
}) {
  const form = useSeasonForm({ mode: "edit", seasonKey, initialData });

  return (
    <SeasonForm
      {...form}
      formTitle="edit season"
      formSubtitle="Update season details for this TV show."
      submitLabel="save"
    />
  );
}
