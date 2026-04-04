"use client";

import { fetchSearchOptions } from "@/services/search";
import { SearchResult } from "@/shared/types/api.types";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import Tooltip from "@/shared/ui/Tooltip";
import { normalizeString } from "@/shared/utils/normalizeString";
import { Dialog, Separator } from "@base-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ListVideo, Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./watchlistDialog.module.css";

type WatchlistSearchResult = SearchResult<"watchlist"> & {
  description: string;
  title: string;
};

const WatchlistDialog = ({
  title,
  tvShowKey,
}: {
  title: string;
  tvShowKey?: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  function handleNewWatchlist() {
    setIsOpen(false);
    const url = new URL("/watchlist/new", window.location.origin);
    if (tvShowKey) url.searchParams.set("preselect", tvShowKey);
    router.push(url.pathname + url.search);
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
            + New watchlist
          </Button>

          <Separator className={styles.modalSeparator} />

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
                  aria-selected={false}
                  tabIndex={0}
                  className={styles.watchlistItem}
                  onClick={() => console.log("selected", watchlist)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && console.log("selected", watchlist)
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
