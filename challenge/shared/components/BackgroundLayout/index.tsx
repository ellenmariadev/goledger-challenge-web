import styles from "./backgroundLayout.module.css";

const BackgroundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default BackgroundLayout;
