"use client";

import { readWatchlist } from "@/services/watchlist";
import { WatchlistForm } from "@/shared/components/WatchlistForm";
import type { SelectedTvShow } from "@/shared/types/tvShows.types";
import { useQuery } from "@tanstack/react-query";
import { useWatchlistForm } from "../hooks/useWatchlistForm";
import { useReadTvShows } from "@/shared/hooks/useTvShows";

export function EditWatchlistForm({ watchlistKey }: { watchlistKey: string }) {
  const { data: watchlist, isLoading } = useQuery({
    queryKey: ["watchlist", watchlistKey],
    queryFn: () => readWatchlist(decodeURIComponent(watchlistKey)),
    staleTime: 60_000,
  });

  const tvShowKeys = watchlist?.tvShows.map((s) => s["@key"]) ?? [];
  const { tvShows, isLoading: isLoadingShows } = useReadTvShows(tvShowKeys);

  const allLoaded =
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
