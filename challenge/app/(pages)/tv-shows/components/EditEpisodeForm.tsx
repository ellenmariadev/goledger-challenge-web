"use client";

import { useEpisodeForm } from "@/app/(pages)/tv-shows/hooks/useEpisodeForm";
import { EpisodeForm } from "@/shared/components/EpisodeForm";
import { useReadAllEpisodes } from "@/shared/hooks/useEpisodes";
import { useReadAllSeasons } from "@/shared/hooks/useSeasons";
import { useTvShow } from "@/shared/hooks/useTvShows";
import { Loading } from "@/shared/ui/Loading";
import { useMemo } from "react";

export function EditEpisodeForm({ episodeKey }: { episodeKey: string }) {
  const { data: episodes = [], isLoading: isLoadingEpisodes } =
    useReadAllEpisodes();
  const { data: seasons = [], isLoading: isLoadingSeasons } =
    useReadAllSeasons();

  const episode = useMemo(
    () => episodes.find((item) => item["@key"] === episodeKey),
    [episodes, episodeKey]
  );

  const linkedSeason = useMemo(
    () =>
      seasons.find((season) => season["@key"] === episode?.season?.["@key"]),
    [seasons, episode]
  );

  const tvShowKey = linkedSeason?.tvShow?.["@key"] ?? "";
  const { data: linkedTvShow, isLoading: isLoadingTvShow } =
    useTvShow(tvShowKey);

  const initialData = useMemo(
    () => ({
      title: episode?.title ?? "",
      releaseDate: episode?.releaseDate ?? "",
      description: episode?.description ?? "",
      rating: episode?.rating ?? 0,
      episodeNumber: episode?.episodeNumber ?? 1,
      seasonKey: linkedSeason?.["@key"] ?? "",
      seasonLabel: linkedSeason
        ? `Season ${linkedSeason.number} (${linkedSeason.year})`
        : "",
      tvShowKey,
      tvShowTitle: linkedTvShow?.title ?? "",
    }),
    [episode, linkedSeason, linkedTvShow, tvShowKey]
  );

  const form = useEpisodeForm({
    mode: "edit",
    episodeKey,
    initialData,
  });

  if (isLoadingEpisodes || isLoadingSeasons || isLoadingTvShow)
    return <Loading />;
  if (!episode || !linkedSeason || !linkedTvShow) return null;

  return (
    <EpisodeForm
      {...form}
      formTitle="new/edit episode"
      formSubtitle="Update episode details for this season."
      submitLabel="save"
    />
  );
}
