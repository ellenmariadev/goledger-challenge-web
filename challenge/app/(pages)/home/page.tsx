import type { Metadata } from "next";
import Main from "./components/Main";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Manage TV shows, seasons, episodes, and watchlists.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className={styles.page}>
      <Main />
    </div>
  );
}
