"use client";
import { Button } from "@/app/components/ui/Button";
import { Text } from "@/app/components/ui/Text";
import { useRouter } from "next/navigation";
import styles from "./main.module.css";

const Main = () => {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <Text variant="body-sm" className={styles.welcome}>
        {"welcome :)"}
      </Text>
      <Text variant="title-xl" className={styles.title}>
        Track what you watch.
        <br />
        {"Discover what's next."}
      </Text>
      <Text variant="body-md" className={styles.subtitle}>
        {"> share your watchlists."}
      </Text>
      <Button
        variant="primary"
        size="md"
        className={styles.button}
        onClick={() => router.push("/tv-shows")}
      >
        get started
      </Button>
      <div className={styles.glow} aria-hidden />
      <div className={styles.glowSecondary} aria-hidden />
    </main>
  );
};

export default Main;
