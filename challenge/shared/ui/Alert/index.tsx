import { AlertTriangle } from "lucide-react";
import { Text } from "@/shared/ui/Text";
import styles from "./alert.module.css";
import { AlertProps } from "./alert.types";

export function Alert({ errors, title = "Something went wrong" }: AlertProps) {
  const messages = Object.values(errors).filter(Boolean);
  if (!messages.length) return null;

  return (
    <div className={styles.alert} role="alert" aria-live="polite">
      <div className={styles.iconWrapper} aria-hidden>
        <AlertTriangle size={12} />
      </div>
      <div className={styles.content}>
        <Text variant="label" className={styles.title}>{title}</Text>
        <div className={styles.messages}>
          {messages.map((error, i) => (
            <Text key={i} variant="body-sm" className={styles.message}>
              {error}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
}