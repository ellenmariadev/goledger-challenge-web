"use client";

import { WatchlistForm } from "@/shared/components/WatchlistForm";
import { useWatchlistForm } from "@/app/(pages)/watchlist/hooks/useWatchlistForm";

export function NewWatchlistForm() {
  const form = useWatchlistForm({ mode: "create" });

  return (
    <WatchlistForm
      {...form}
      formTitle="new watchlist"
      formSubtitle="Create a watchlist and attach TV shows to it."
      submitLabel="save watchlist"
    />
  );
}
