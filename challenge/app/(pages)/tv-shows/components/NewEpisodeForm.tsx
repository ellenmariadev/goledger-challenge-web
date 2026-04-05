"use client";

import { useEpisodeForm } from "@/app/(pages)/tv-shows/hooks/useEpisodeForm";
import { EpisodeForm } from "@/shared/components/EpisodeForm";
import { useReadAllEpisodes } from "@/shared/hooks/useEpisodes";
import { useReadAllSeasons } from "@/shared/hooks/useSeasons";
import { useTvShow } from "@/shared/hooks/useTvShows";
import { Alert } from "@/shared/ui/Alert";
import { Loading } from "@/shared/ui/Loading";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function NewEpisodeForm() {
  const searchParams = useSearchParams();
  const tvShowKey =
    searchParams.get("tvShowKey") ?? searchParams.get("preselect") ?? "";

  const { data: tvShow, isLoading: isLoadingTvShow } = useTvShow(tvShowKey);
  const { data: seasons = [], isLoading: isLoadingSeasons } =
    useReadAllSeasons();
  const { data: episodes = [], isLoading: isLoadingEpisodes } =
    useReadAllEpisodes();

  const seasonsForShow = useMemo(
    () =>
      seasons
        .filter((season) => season.tvShow?.["@key"] === tvShowKey)
        .sort((a, b) => a.number - b.number)
        .map((season) => ({
          key: season["@key"],
          number: season.number,
          label: `Season ${season.number} (${season.year})`,
        })),
    [seasons, tvShowKey]
  );

  const existingEpisodesBySeason = useMemo(
    () =>
      episodes.reduce<Record<string, number[]>>((acc, episode) => {
        const key = episode.season?.["@key"];
        if (!key) return acc;
        if (!acc[key]) acc[key] = [];
        acc[key].push(episode.episodeNumber);
        return acc;
      }, {}),
    [episodes]
  );

  if (!tvShowKey) {
    return (
      <Alert errors={{ form: "Missing TV show context for this episode." }} />
    );
  }

  if (isLoadingTvShow || isLoadingSeasons || isLoadingEpisodes)
    return <Loading />;

  if (!tvShow) {
    return <Alert errors={{ form: "TV show not found." }} />;
  }

  if (seasonsForShow.length === 0) {
    return (
      <Alert
        errors={{ form: "Create a season first before creating an episode." }}
      />
    );
  }

  return (
    <NewEpisodeFormInner
      tvShowKey={tvShowKey}
      tvShowTitle={tvShow.title}
      seasons={seasonsForShow}
      existingEpisodesBySeason={existingEpisodesBySeason}
    />
  );
}

function NewEpisodeFormInner({
  tvShowKey,
  tvShowTitle,
  seasons,
  existingEpisodesBySeason,
}: {
  tvShowKey: string;
  tvShowTitle: string;
  seasons: { key: string; number: number; label: string }[];
  existingEpisodesBySeason: Record<string, number[]>;
}) {
  const form = useEpisodeForm({
    mode: "create",
    tvShowKey,
    tvShowTitle,
    seasons,
    existingEpisodesBySeason,
  });

  return (
    <EpisodeForm
      {...form}
      formTitle="new/edit episode"
      formSubtitle="Create a new episode for this TV show."
      submitLabel="save"
    />
  );
}
