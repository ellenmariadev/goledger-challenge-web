"use client";

import { useSeasonForm } from "@/app/(pages)/tv-shows/hooks/useSeasonForm";
import { useTvShow } from "@/shared/hooks/useTvShows";
import { Alert } from "@/shared/ui/Alert";
import { Loading } from "@/shared/ui/Loading";
import { useSearchParams } from "next/navigation";
import { SeasonForm } from "@/shared/components/SeasonForm";

export function NewSeasonForm() {
  const searchParams = useSearchParams();
  const tvShowKey =
    searchParams.get("tvShowKey") ?? searchParams.get("preselect") ?? "";
  const { data: tvShow, isLoading } = useTvShow(tvShowKey);

  if (!tvShowKey) {
    return (
      <Alert errors={{ form: "Missing TV show context for this season." }} />
    );
  }

  if (isLoading) return <Loading />;

  if (!tvShow) {
    return <Alert errors={{ form: "TV show not found." }} />;
  }

  return (
    <NewSeasonFormInner tvShowKey={tvShowKey} tvShowTitle={tvShow.title} />
  );
}

function NewSeasonFormInner({
  tvShowKey,
  tvShowTitle,
}: {
  tvShowKey: string;
  tvShowTitle: string;
}) {
  const form = useSeasonForm({ mode: "create", tvShowKey, tvShowTitle });

  return (
    <SeasonForm
      {...form}
      formTitle="new season"
      formSubtitle="Create a season and link it to a TV show."
      submitLabel="save"
    />
  );
}
