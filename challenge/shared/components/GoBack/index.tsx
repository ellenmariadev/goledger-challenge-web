import { ChevronLeft } from "lucide-react";
import styles from "./goback.module.css";
import { Text } from "@/shared/ui/Text";

const GoBack = () => {
  return (
    <div
      className={styles.goBack}
      role="button"
      onClick={() => window.history.back()}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          window.history.back();
        }
      }}
    >
      <ChevronLeft className={styles.backButton} />
      <Text variant="label" className={styles.backText}>
        Back
      </Text>
    </div>
  );
};

export default GoBack;
