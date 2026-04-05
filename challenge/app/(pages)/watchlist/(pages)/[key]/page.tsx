import { WatchlistDetail } from "@/app/(pages)/watchlist/components/WatchlistDetail";
import { Loading } from "@/shared/ui/Loading";
import { Suspense, use } from "react";
import styles from "./page.module.css";

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
