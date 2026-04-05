"use client";

import { fetchSearchOptions } from "@/services/search";
import MediaCard from "@/shared/components/MediaCard/page";
import Search from "@/shared/components/Search";
import type {
  SelectedTvShow,
  TvSearchResult,
} from "@/shared/types/tvShows.types";
import { Text } from "@/shared/ui/Text";
import { useMemo } from "react";
import styles from "./tvShowSelect.module.css";
import { TV_SHOWS_QUERY_KEY } from "@/shared/constants/queryKey";

const fetchTvShowsOptions = () =>
  fetchSearchOptions<TvSearchResult>({ assetType: "tvShows" });

export function TvShowSelector({
  selectedShows = [],
  onSelect,
  onRemove,
}: {
  selectedShows: SelectedTvShow[];
  onSelect: (option: TvSearchResult) => void;
  onRemove: (key: string) => void;
}) {
  const selectedShowKeys = useMemo(
    () => new Set(selectedShows.map((s) => s["@key"])),
    [selectedShows]
  );

  function handleSelect(option: TvSearchResult) {
    if (selectedShowKeys.has(option["@key"])) return;
    onSelect(option);
  }

  return (
    <div className={styles.field}>
      <div className={styles.searchRow}>
        <Text as="span" variant="label" className={styles.label}>
          add tv shows
        </Text>
        <Search
          className={styles.search}
          queryKey={TV_SHOWS_QUERY_KEY}
          fetchOptions={fetchTvShowsOptions}
          getOptionLabel={(o) => o.title}
          getOptionKey={(o) => o["@key"]}
          placeholder="search"
          ariaLabel="search tv shows"
          onSelect={handleSelect}
        />
      </div>

      {selectedShows.length > 0 ? (
        <div className={styles.selectedList}>
          {selectedShows.map((show, index) => (
            <section key={show["@key"]} className={styles.selectedItem}>
              <MediaCard
                title={show.title}
                recommendedAge={show.recommendedAge}
                watchlist={false}
                onRemove={() => onRemove(show["@key"])}
              />
              <p className={styles.countNumber}>{index + 1}</p>
            </section>
          ))}
        </div>
      ) : (
        <Text variant="body-sm" className={styles.emptyState}>
          No TV shows selected yet.
        </Text>
      )}
    </div>
  );
}
