import type { EpisodeFormOptions } from "@/app/(pages)/tv-shows/types/episodeForm.types";
import { createEpisode, updateEpisode } from "@/services/episode";
import { EPISODES_QUERY_KEY } from "@/shared/constants/queryKey";
import { useToast } from "@/shared/providers/Toast";
import type { CreateEpisodeInput, UpdateEpisodeInput } from "@/shared/types/episodes.types";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";

function toDateInputValue(value: string): string {
  if (!value) return "";
  return value.slice(0, 10);
}

function toIsoDate(value: string): string {
  return new Date(`${value}T00:00:00.000Z`).toISOString();
}

export function useEpisodeForm(options: EpisodeFormOptions) {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const initial = options.mode === "edit" ? options.initialData : undefined;

  const [seasonKey, setSeasonKey] = useState(
    options.mode === "create"
      ? options.seasons[0]?.key ?? ""
      : options.initialData.seasonKey
  );
  const [title, setTitle] = useState(initial?.title ?? "");
  const [releaseDate, setReleaseDate] = useState(
    initial?.releaseDate ? toDateInputValue(initial.releaseDate) : ""
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [rating, setRating] = useState(initial?.rating ?? 0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const episodeNumber = useMemo(() => {
    if (options.mode === "edit") return options.initialData.episodeNumber;
    if (!seasonKey) return 1;

    const episodes = options.existingEpisodesBySeason[seasonKey] ?? [];
    if (!episodes.length) return 1;
    return Math.max(...episodes) + 1;
  }, [options, seasonKey]);

  const seasonLabel = useMemo(() => {
    if (options.mode === "edit") return options.initialData.seasonLabel;
    return options.seasons.find((season) => season.key === seasonKey)?.label ?? "";
  }, [options, seasonKey]);

  const tvShowTitle =
    options.mode === "create" ? options.tvShowTitle : options.initialData.tvShowTitle;

  const mutationFn = (data: CreateEpisodeInput | UpdateEpisodeInput) =>
    options.mode === "create"
      ? createEpisode(data as CreateEpisodeInput)
      : updateEpisode(data as UpdateEpisodeInput);

  const { mutateAsync, isPending } = useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: EPISODES_QUERY_KEY });
      toast.add({
        title: options.mode === "create" ? "Episode created" : "Episode updated",
        description:
          options.mode === "create"
            ? "The episode was created successfully."
            : "The episode was updated successfully.",
        type: "success",
        timeout: 3500,
      });
      router.back();
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const normalizedRating = Math.max(0, Number.isFinite(rating) ? rating : 0);

    if (options.mode === "create" && !seasonKey) {
      setFormErrors({ season: "Season is required." });
      return;
    }

    if (!releaseDate) {
      setFormErrors({ releaseDate: "Release date is required." });
      return;
    }

    if (!trimmedTitle) {
      setFormErrors({ title: "Title is required." });
      return;
    }

    if (!trimmedDescription) {
      setFormErrors({ description: "Description is required." });
      return;
    }

    if (!Number.isInteger(episodeNumber) || episodeNumber < 1) {
      setFormErrors({ episodeNumber: "Invalid episode number." });
      return;
    }

    setFormErrors({});

    try {
      if (options.mode === "create") {
        await mutateAsync({
          seasonKey,
          episodeNumber,
          title: trimmedTitle,
          releaseDate: toIsoDate(releaseDate),
          description: trimmedDescription,
          rating: normalizedRating,
        });
      } else {
        await mutateAsync({
          key: options.episodeKey,
          title: trimmedTitle,
          releaseDate: toIsoDate(releaseDate),
          description: trimmedDescription,
          rating: normalizedRating,
        });
      }
    } catch (error) {
      const message = getErrorMessage(error).error;
      setFormErrors({ "": message });
      toast.add({
        title: options.mode === "create" ? "Create failed" : "Update failed",
        description: message,
        type: "error",
        priority: "high",
        timeout: 5000,
      });
    }
  }

  return {
    tvShowTitle,
    title,
    setTitle,
    releaseDate,
    setReleaseDate,
    description,
    setDescription,
    rating,
    setRating,
    episodeNumber,
    seasonKey,
    setSeasonKey: options.mode === "create" ? setSeasonKey : undefined,
    seasonLabel: options.mode === "edit" ? seasonLabel : undefined,
    seasonOptions:
      options.mode === "create"
        ? options.seasons.map((season) => ({ key: season.key, label: season.label }))
        : [],
    formErrors,
    isPending,
    handleSubmit,
    handleCancel: () => router.back(),
  };
}