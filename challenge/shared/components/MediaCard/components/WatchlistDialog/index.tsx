"use client";

import { fetchSearchOptions } from "@/services/search";
import { readWatchlist, updateWatchlist } from "@/services/watchlist";
import { WATCHLIST_QUERY_KEY } from "@/shared/constants/queryKey";
import { WatchlistSearchResult } from "@/shared/types/watchlist.types";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import Tooltip from "@/shared/ui/Tooltip";
import { normalizeString } from "@/shared/utils/normalizeString";
import { Dialog, Separator } from "@base-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListVideo, Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./watchlistDialog.module.css";

const WatchlistDialog = ({
  title,
  tvShowKey,
}: {
  title: string;
  tvShowKey?: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWatchlistKey, setSelectedWatchlistKey] = useState("");
  const [actionError, setActionError] = useState("");

  const { data: watchlists = [] } = useQuery({
    queryKey: ["watchlist-search"],
    queryFn: () =>
      fetchSearchOptions<WatchlistSearchResult>({ assetType: "watchlist" }),
    staleTime: 60_000,
    enabled: isOpen,
  });

  const filteredWatchlists = useMemo(() => {
    const normalized = normalizeString(searchTerm);
    if (!normalized) return watchlists;
    return watchlists.filter((w) =>
      normalizeString(`${w.title} ${w.description}`).includes(normalized)
    );
  }, [searchTerm, watchlists]);

  const { mutateAsync: addToWatchlistAsync, isPending } = useMutation({
    mutationFn: async (watchlistKey: string) => {
      if (!tvShowKey) return;

      const watchlist = await readWatchlist(watchlistKey);
      const currentKeys = watchlist.tvShows?.map((show) => show["@key"]) ?? [];
      const mergedKeys = Array.from(new Set([...currentKeys, tvShowKey]));

      await updateWatchlist({ key: watchlistKey, tvShowKeys: mergedKeys });

      return { watchlistKey, mergedKeys };
    },
    onSuccess: async ({ watchlistKey, mergedKeys }) => {
      const updatedWatchlist = {
        ...watchlists.find((watchlist) => watchlist["@key"] === watchlistKey),
        tvShows: mergedKeys.map((key) => ({
          "@assetType": "tvShows",
          "@key": key,
        })),
      };

      queryClient.setQueryData(["watchlist", watchlistKey], updatedWatchlist);
      await queryClient.invalidateQueries({ queryKey: WATCHLIST_QUERY_KEY });
      setIsOpen(false);
      setSelectedWatchlistKey("");
      setSearchTerm("");
      setActionError("");
    },
  });

  function handleNewWatchlist() {
    setIsOpen(false);
    const url = new URL("/watchlist/new", window.location.origin);
    if (tvShowKey) url.searchParams.set("preselect", tvShowKey);
    router.push(url.pathname + url.search);
  }

  async function handleConfirmSelection() {
    if (!selectedWatchlistKey || !tvShowKey) return;

    try {
      setActionError("");
      await addToWatchlistAsync(selectedWatchlistKey);
    } catch {
      setActionError("Could not add TV show to watchlist. Please try again.");
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip content="Add to watchlist">
        <Dialog.Trigger
          className={styles.iconButton}
          type="button"
          aria-label="open watchlist"
        >
          <ListVideo size={12} />
        </Dialog.Trigger>
      </Tooltip>

      <Dialog.Portal>
        <Dialog.Backdrop className={styles.modalBackdrop} />
        <Dialog.Popup className={styles.modalPopup}>
          <div className={styles.modalHeader}>
            <Text variant="title-xs" as="h3" className={styles.modalTitle}>
              Add to Watchlist
            </Text>
            <Text variant="body-sm" className={styles.modalSubtitle}>
              Select one of your watchlists for {title}.
            </Text>
          </div>

          <div className={styles.modalSearch}>
            <SearchIcon
              size={14}
              className={styles.modalSearchIcon}
              aria-hidden
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.modalSearchInput}
              placeholder="search watchlist"
              aria-label="search watchlist"
            />
          </div>

          <Button variant="secondary" size="xs" onClick={handleNewWatchlist}>
            + new watchlist
          </Button>

          <Separator className={styles.modalSeparator} />

          {actionError ? (
            <Text variant="body-sm" className={styles.errorText}>
              {actionError}
            </Text>
          ) : null}

          <ul
            className={styles.watchlistList}
            role="listbox"
            aria-label="watchlists"
          >
            {filteredWatchlists.length ? (
              filteredWatchlists.map((watchlist) => (
                <li
                  key={watchlist["@key"]}
                  role="option"
                  aria-selected={selectedWatchlistKey === watchlist["@key"]}
                  tabIndex={0}
                  className={`${styles.watchlistItem} ${
                    selectedWatchlistKey === watchlist["@key"]
                      ? styles.watchlistItemSelected
                      : ""
                  }`}
                  onClick={() => setSelectedWatchlistKey(watchlist["@key"])}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    setSelectedWatchlistKey(watchlist["@key"])
                  }
                >
                  <Text variant="label" className={styles.watchlistTitle}>
                    {watchlist.title}
                  </Text>
                  <Text
                    variant="body-sm"
                    className={styles.watchlistDescription}
                  >
                    {watchlist.description}
                  </Text>
                </li>
              ))
            ) : (
              <Text variant="body-sm" className={styles.emptyWatchlistState}>
                No watchlists found.
              </Text>
            )}
          </ul>

          <div className={styles.modalActions}>
            {selectedWatchlistKey ? (
              <Button
                size="xs"
                onClick={handleConfirmSelection}
                disabled={isPending || !tvShowKey}
              >
                {isPending ? "saving..." : "confirm"}
              </Button>
            ) : null}
            <Dialog.Close className={styles.modalCancelButton}>
              Cancel
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WatchlistDialog;
