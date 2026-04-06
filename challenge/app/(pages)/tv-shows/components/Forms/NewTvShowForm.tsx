"use client";

import { useTvShowForm } from "@/app/(pages)/tv-shows/hooks/useTvShowForm";
import { TvShowForm } from "@/shared/components/TvShowForm";

export function NewTvShowForm() {
  const form = useTvShowForm({ mode: "create" });

  return (
    <TvShowForm
      {...form}
      formTitle="new tv show"
      formSubtitle="Create a new tv show and add it to your collection."
      submitLabel="save tv show"
    />
  );
}
