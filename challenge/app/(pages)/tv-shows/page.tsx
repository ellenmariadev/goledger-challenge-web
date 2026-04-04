import Catalog from "./components/Catalog";
import styles from "./page.module.css";

export default function TvShows() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Catalog />
      </main>
    </div>
  );
}
