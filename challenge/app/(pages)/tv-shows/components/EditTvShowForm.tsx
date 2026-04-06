"use client";

import { useTvShowForm } from "@/app/(pages)/tv-shows/hooks/useTvShowForm";
import { TvShowForm } from "@/shared/components/TvShowForm";
import { useTvShow } from "@/shared/hooks/useTvShows";
import { Loading } from "@/shared/ui/Loading";

export function EditTvShowForm({ tvShowKey }: { tvShowKey: string }) {
  const { data: tvShow, isLoading } = useTvShow(tvShowKey);

  if (isLoading) return <Loading />;
  if (!tvShow) return null;

  return (
    <EditTvShowFormInner
      tvShowKey={tvShowKey}
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
