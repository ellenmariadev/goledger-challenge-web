"use client";

import { fetchSearchOptions } from "@/services/search";
import MediaCard from "@/shared/components/MediaCard/page";
import Search from "@/shared/components/Search";
import { useReadAllTvShows } from "@/shared/hooks/useTvShows";
import { TvSearchResult } from "@/shared/types/tvShows.types";
import { Button } from "@/shared/ui/Button";
import { Loading } from "@/shared/ui/Loading";
import { Text } from "@/shared/ui/Text";
import { normalizeString } from "@/shared/utils/normalizeString";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

const ROW_HEIGHT = 280;

function useColumnCount(ref: React.RefObject<HTMLDivElement>) {
  const [cols, setCols] = useState(4);

  useMemo(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const observer = new ResizeObserver(
      ([
        {
          contentRect: { width },
        },
      ]) => {
        setCols(width <= 592 ? 1 : width <= 832 ? 2 : width <= 1152 ? 3 : 4);
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cols;
}

export default function Catalog() {
  const { data: searchOptions = [], isLoading } = useReadAllTvShows();
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchTvShowsOptions = () =>
    fetchSearchOptions<TvSearchResult>({ assetType: "tvShows" });

  const columnCount = useColumnCount(scrollRef);

  const rows = useMemo(() => {
    const normalized = normalizeString(searchTerm);
    const filtered = normalized
      ? searchOptions.filter((o) =>
          normalizeString(o.title).includes(normalized)
        )
      : searchOptions;

    const result: TvSearchResult[][] = [];
    for (let i = 0; i < filtered.length; i += columnCount)
      result.push(filtered.slice(i, i + columnCount));
    return result;
  }, [searchTerm, searchOptions, columnCount]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 3,
  });

  if (isLoading) return <Loading />;

  return (
    <section className={styles.catalogArea}>
      <Search
        className={styles.search}
        queryKey={["tv-shows-search"]}
        fetchOptions={fetchTvShowsOptions}
        getOptionLabel={(option) => option.title}
        placeholder="search"
        ariaLabel="search tv shows"
        onValueChange={setSearchTerm}
        onSelect={(option) => setSearchTerm(option.title)}
      />

      <Text variant="label" className={styles.showingText}>
        {rows.flat().length} results
      </Text>

      <Button
        className={styles.newButton}
        variant={"secondary"}
        size="xs"
        onClick={() => router.push("/tv-shows/new")}
      >
        + new tv show
      </Button>

      <div ref={scrollRef} className={styles.scrollContainer}>
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className={styles.showsGrid}>
                {rows[virtualRow.index].map((tvShow) => (
                  <MediaCard
                    key={tvShow["@key"]}
                    title={tvShow.title}
                    recommendedAge={tvShow.recommendedAge}
                    tvShowKey={tvShow["@key"]}
                    onEdit={() =>
                      router.push(`/watchlist/${tvShow["@key"]}/edit`)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
