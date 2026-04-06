import { TvShowFormOptions } from "@/app/(pages)/tv-shows/types/tvShowForm.types";
import { createTvShow, updateTvShow } from "@/services/tvShow";
import { TV_SHOW_QUERY_KEY, TV_SHOWS_ALL_QUERY_KEY } from "@/shared/constants/queryKey";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function useTvShowForm(options: TvShowFormOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initial = options.mode === "edit" ? options.initialData : undefined;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [recommendedAge, setRecommendedAge] = useState<number>(initial?.recommendedAge ?? 0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { mutateAsync, isPending } = useMutation({
    mutationFn:
      options.mode === "create"
        ? createTvShow
        : (data: Parameters<typeof updateTvShow>[0]) => updateTvShow(data),
    onSuccess: async () => {
      const trimmedTitle = title.trim();
      const trimmedDescription = description.trim();

      if (options.mode === "edit") {
        const tvShowQueryKey = [...TV_SHOW_QUERY_KEY, options.tvShowKey];

        queryClient.setQueryData(TV_SHOWS_ALL_QUERY_KEY, (current: unknown) => {
          if (!Array.isArray(current)) return current;

          return current.map((tvShow) => {
            if (!tvShow || typeof tvShow !== "object") return tvShow;

            const currentTvShow = tvShow as Record<string, unknown>;
            if (currentTvShow["@key"] !== options.tvShowKey) return tvShow;

            return {
              ...currentTvShow,
              title: trimmedTitle,
              description: trimmedDescription,
              recommendedAge,
            };
          });
        });

        queryClient.setQueryData(tvShowQueryKey, (current: unknown) => {
          if (!current || typeof current !== "object") return current;

          const currentTvShow = current as Record<string, unknown>;
          return {
            ...currentTvShow,
            title: trimmedTitle,
            description: trimmedDescription,
            recommendedAge,
          };
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: TV_SHOWS_ALL_QUERY_KEY });
      }

      router.back();
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return setFormErrors({ title: "Title is required." });

    setFormErrors({});

    try {
      if (options.mode === "create") {
        await mutateAsync({
          title: trimmedTitle,
          description: description.trim(),
          recommendedAge,
        });
      } else {
        await mutateAsync({
          key: options.tvShowKey,
          title: trimmedTitle,
          description: description.trim(),
          recommendedAge,
        });
      }
    } catch (error) {
      setFormErrors({ "": getErrorMessage(error).error });
    }
  }

  return {
    title, setTitle,
    description, setDescription,
    recommendedAge, setRecommendedAge,
    formErrors,
    isPending,
    handleSubmit,
    handleCancel: () => router.back(),
  };
}