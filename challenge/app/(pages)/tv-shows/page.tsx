import type { Metadata } from "next";
import Catalog from "./components/Catalog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "TV Shows",
  description: "Browse and manage your TV show catalog.",
  alternates: {
    canonical: "/tv-shows",
  },
  openGraph: {
    title: "TV Shows",
    description: "Browse and manage your TV show catalog.",
    url: "/tv-shows",
  },
};

export default function TvShows() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Catalog />
      </main>
    </div>
  );
}
