import { WatchlistCatalog } from "@/app/(pages)/watchlist/components/WatchlistCatalog";
import styles from "./page.module.css";

export default function WatchlistPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <WatchlistCatalog />
      </main>
    </div>
  );
}
