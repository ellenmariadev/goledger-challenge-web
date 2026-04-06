import type { SeasonFormOptions } from "@/app/(pages)/tv-shows/types/seasonForm.types";
import { createSeason, updateSeason } from "@/services/season";
import { SEASONS_QUERY_KEY } from "@/shared/constants/queryKey";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function useSeasonForm(options: SeasonFormOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentYear = new Date().getFullYear();

  const initial = options.mode === "edit" ? options.initialData : undefined;
  const tvShowKey = options.mode === "create" ? options.tvShowKey : initial.tvShowKey;
  const tvShowTitle = options.mode === "create" ? options.tvShowTitle : initial.tvShowTitle;

  const [number, setNumber] = useState(initial?.number ?? 1);
  const [year, setYear] = useState(initial?.year ?? new Date().getFullYear());
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { mutateAsync, isPending } = useMutation({
    mutationFn:
      options.mode === "create"
        ? createSeason
        : (data: Parameters<typeof updateSeason>[0]) => updateSeason(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SEASONS_QUERY_KEY });
      router.back();
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!Number.isInteger(number) || number < 1) {
      setFormErrors({ number: "Season number must be greater than 0." });
      return;
    }

    if (!Number.isInteger(year) || year < 1900 || year > currentYear) {
      setFormErrors({ year: "Please provide a valid release year." });
      return;
    }

    if (!tvShowKey) {
      setFormErrors({ tvShow: "TV show is required." });
      return;
    }

    setFormErrors({});

    try {
      if (options.mode === "create") {
        await mutateAsync({
          number,
          year,
          tvShowKey,
        });
      } else {
        await mutateAsync({
          key: options.seasonKey,
          number,
          year,
          tvShowKey,
        });
      }
    } catch (error) {
      setFormErrors({ "": getErrorMessage(error).error });
    }
  }

  return {
    number,
    setNumber,
    year,
    setYear,
    tvShowTitle,
    formErrors,
    isPending,
    handleSubmit,
    handleCancel: () => router.back(),
  };
}