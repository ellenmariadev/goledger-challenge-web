import { WatchlistDetail } from "@/app/(pages)/watchlist/components/WatchlistDetail";
import { Loading } from "@/shared/ui/Loading";
import type { Metadata } from "next";
import { Suspense, use } from "react";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const decodedKey = decodeURIComponent(key);
  const canonical = `/watchlist/${encodeURIComponent(decodedKey)}`;

  return {
    title: `Watchlist ${decodedKey}`,
    description: "Watchlist details and included TV shows.",
    alternates: {
      canonical,
    },
    openGraph: {
      title: `Watchlist ${decodedKey}`,
      description: "Watchlist details and included TV shows.",
      url: canonical,
    },
  };
}

export default function WatchlistDetailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);
  const slug = decodeURIComponent(key);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback={<Loading />}>
          <WatchlistDetail slug={slug} />
        </Suspense>
      </main>
    </div>
  );
}
