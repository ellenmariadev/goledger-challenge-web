"use client";

import { fetchSearchOptions } from "@/services/search";
import MediaCard from "@/shared/components/MediaCard/page";
import Search from "@/shared/components/Search";
import { useDeleteTvShow, useReadAllTvShows } from "@/shared/hooks/useTvShows";
import { TvSearchResult } from "@/shared/types/tvShows.types";
import { AlertDialog } from "@/shared/ui/AlertDialog";
import { Button } from "@/shared/ui/Button";
import { Loading } from "@/shared/ui/Loading";
import { Text } from "@/shared/ui/Text";
import { useToast } from "@/shared/providers/Toast";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import { normalizeString } from "@/shared/utils/normalizeString";
import { createSlug } from "@/shared/utils/slug";
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

const fetchTvShowsOptions = () =>
  fetchSearchOptions<TvSearchResult>({ assetType: "tvShows" });

export default function Catalog() {
  const { data: searchOptions = [], isLoading } = useReadAllTvShows();
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingDelete, setPendingDelete] = useState<{
    key: string;
    title: string;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: deleteTvShow } = useDeleteTvShow();
  const TV_SHOW_SLUG_OPTIONS = { fallback: "tv-shows" };

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

  async function handleDelete() {
    if (!pendingDelete) return;

    try {
      await deleteTvShow({ key: pendingDelete.key });
      setPendingDelete(null);
    } catch (error) {
      setPendingDelete(null);
      toast.add({
        title: "Delete failed",
        description: getErrorMessage(error).error,
        type: "error",
        priority: "high",
        timeout: 5000,
      });
    }
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <section className={styles.catalogArea}>
        <Search
          className={styles.search}
          queryKey={["tv-shows-search"]}
          fetchOptions={fetchTvShowsOptions}
          getOptionLabel={(o) => o.title}
          placeholder="search"
          ariaLabel="search tv shows"
          onValueChange={setSearchTerm}
          onSelect={(o) => setSearchTerm(o.title)}
        />

        <Text variant="label" className={styles.showingText}>
          {rows.flat().length} results
        </Text>

        <Button
          className={styles.newButton}
          variant="secondary"
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
                        router.push(
                          `/tv-shows/${createSlug(tvShow.title, tvShow["@key"], TV_SHOW_SLUG_OPTIONS)}/edit`
                        )
                      }
                      onDelete={() =>
                        setPendingDelete({
                          key: tvShow["@key"],
                          title: tvShow.title,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete TV Show"
        description={`"${pendingDelete?.title}" will be permanently removed.`}
        confirmLabel="delete"
        variant="danger"
        onConfirm={handleDelete}
      />
    </>
  );
}
