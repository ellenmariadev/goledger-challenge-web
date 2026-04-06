import { WatchlistFormOptions } from "@/app/(pages)/watchlist/types/watchlist.types";
import { createWatchlist, updateWatchlist } from "@/services/watchlist";
import { WATCHLIST_QUERY_KEY } from "@/shared/constants/queryKey";
import { useReadAllTvShows } from "@/shared/hooks/useTvShows";
import { useToast } from "@/shared/providers/Toast";
import type { SelectedTvShow, TvSearchResult } from "@/shared/types/tvShows.types";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";

export function useWatchlistForm(options: WatchlistFormOptions) {
  const { data: allShows = [] } = useReadAllTvShows();
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const preselectKey = options.mode === "create" ? searchParams.get("preselect") : null;

  const initial = options.mode === "edit" ? options.initialData : undefined;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [manualShows, setManualShows] = useState<SelectedTvShow[]>(
    initial?.tvShows ?? []
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const selectedShows = useMemo(() => {
    if (options.mode === "edit") return manualShows;
    if (!preselectKey) return manualShows;
    const preselected = allShows.find((s) => s["@key"] === preselectKey);
    if (!preselected || manualShows.some((s) => s["@key"] === preselectKey)) return manualShows;
    return [preselected, ...manualShows];
  }, [options.mode, preselectKey, allShows, manualShows]);

  function handleSelect(option: TvSearchResult) {
    setManualShows((current) => [...current, option]);
  }

  function handleRemoveShow(showKey: string) {
    if (options.mode === "create" && showKey === preselectKey) {
      router.replace("/watchlist/new");
      return;
    }
    setManualShows((current) => current.filter((s) => s["@key"] !== showKey));
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn:
      options.mode === "create"
        ? createWatchlist
        : (data: Parameters<typeof updateWatchlist>[0]) => updateWatchlist(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: WATCHLIST_QUERY_KEY });

      if (options.mode === "edit") {
        await queryClient.invalidateQueries({ queryKey: ["watchlist", options.watchlistKey] });
      }
      toast.add({
        title: options.mode === "create" ? "Watchlist created" : "Watchlist updated",
        description:
          options.mode === "create"
            ? "The watchlist was created successfully."
            : "The watchlist was updated successfully.",
        type: "success",
        timeout: 3500,
      });
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
          tvShowKeys: selectedShows.map((s) => s["@key"]),
        });
      } else {
        await mutateAsync({
          key: options.watchlistKey,
          title: trimmedTitle,
          description: description.trim(),
          tvShowKeys: selectedShows.map((s) => s["@key"]),
        });
      }
    } catch (error) {
      const message = getErrorMessage(error).error;
      setFormErrors({
        "": message,
      });
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
    title, setTitle,
    description, setDescription,
    selectedShows,
    formErrors,
    isPending,
    handleSelect,
    handleRemoveShow,
    handleSubmit,
    handleCancel: () => router.back(),
  };
}