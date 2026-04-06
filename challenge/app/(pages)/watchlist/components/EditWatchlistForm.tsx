"use client";

import { readWatchlist } from "@/services/watchlist";
import { WatchlistForm } from "@/shared/components/WatchlistForm";
import { useReadTvShows } from "@/shared/hooks/useTvShows";
import { useWatchlists } from "@/shared/hooks/useWatchlist";
import type { SelectedTvShow } from "@/shared/types/tvShows.types";
import { findBySlug } from "@/shared/utils/slug";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useWatchlistForm } from "../hooks/useWatchlistForm";

export function EditWatchlistForm({
  watchlistSlug,
}: {
  watchlistSlug: string;
}) {
  const { data: watchlists = [], isLoading: isLoadingWatchlists } =
    useWatchlists();

  const matchedWatchlist = useMemo(
    () => findBySlug(watchlists, watchlistSlug),
    [watchlists, watchlistSlug]
  );

  const watchlistKey = matchedWatchlist?.["@key"] ?? watchlistSlug;

  const { data: watchlist, isLoading } = useQuery({
    queryKey: ["watchlist", watchlistKey],
    queryFn: () => readWatchlist(watchlistKey),
    staleTime: 60_000,
    enabled: !!watchlistKey,
  });

  const tvShowKeys = watchlist?.tvShows.map((s) => s["@key"]) ?? [];
  const { tvShows, isLoading: isLoadingShows } = useReadTvShows(tvShowKeys);

  const allLoaded =
    !isLoadingWatchlists &&
    !isLoading &&
    !isLoadingShows &&
    !!watchlist &&
    tvShows.length === tvShowKeys.length;

  if (!allLoaded) return null;

  return (
    <EditWatchlistFormInner
      key={tvShowKeys.join(",")}
      watchlistKey={watchlistKey}
      initialData={{
        title: watchlist.title,
        description: watchlist.description ?? "",
        tvShows: tvShows as SelectedTvShow[],
      }}
    />
  );
}

function EditWatchlistFormInner({
  watchlistKey,
  initialData,
}: {
  watchlistKey: string;
  initialData: {
    title: string;
    description: string;
    tvShows: SelectedTvShow[];
  };
}) {
  const form = useWatchlistForm({ mode: "edit", watchlistKey, initialData });

  return (
    <WatchlistForm
      {...form}
      formTitle="edit watchlist"
      formSubtitle="Update your watchlist details and TV shows."
      submitLabel="save changes"
    />
  );
}
