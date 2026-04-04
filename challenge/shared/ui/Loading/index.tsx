import styles from "./loading.module.css";

export function Loading() {
  return (
    <div className={styles.loader}>
      <div className={styles.block + " " + styles.b_1}></div>
      <div className={styles.block + " " + styles.b_2}></div>
      <div className={styles.block + " " + styles.b_3}></div>
      <div className={styles.block + " " + styles.b_4}></div>
      <div className={styles.block + " " + styles.b_5}></div>
      <div className={styles.block + " " + styles.b_6}></div>
      <div className={styles.block + " " + styles.b_7}></div>
      <div className={styles.block + " " + styles.b_8}></div>
    </div>
  );
}
