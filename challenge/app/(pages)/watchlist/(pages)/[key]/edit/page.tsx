import { EditWatchlistForm } from "@/app/(pages)/watchlist/components/EditWatchlistForm";
import { use } from "react";
import styles from "./page.module.css";

export default function EditWatchlistPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);
  const decodedKey = decodeURIComponent(key);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <EditWatchlistForm watchlistKey={decodedKey} />
      </main>
    </div>
  );
}
