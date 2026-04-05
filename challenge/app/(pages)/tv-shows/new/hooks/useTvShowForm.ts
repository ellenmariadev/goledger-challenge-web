import { createTvShow } from "@/services/tvShow";
import { TV_SHOWS_QUERY_KEY } from "@/shared/constants/queryKey";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function useTvShowForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recommendedAge, setRecommendedAge] = useState<number | "">("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTvShow,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TV_SHOWS_QUERY_KEY });
      router.push("/tv-shows");
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return setFormErrors({ title: "Title is required." });
    if (recommendedAge === "") return setFormErrors({ recommendedAge: "Recommended age is required." });

    setFormErrors({});

    try {
      await mutateAsync({
        title: trimmedTitle,
        description: description.trim(),
        recommendedAge: Number(recommendedAge),
      });
    } catch (error) {
      getErrorMessage(error);
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