import styles from "./initialsPreview.module.css";
import { InitialPreviewProps } from "./initialsPreview.types";

function toInitials(value?: string) {
  if (!value) return "";

  return (
    value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || ""
  );
}

export function InitialsPreview({
  items,
  maxVisible = 4,
  fallbackInitials = "?",
  variant = "inline",
}: InitialPreviewProps) {
  const visibleItems = items.slice(0, maxVisible);

  if (!visibleItems.length) {
    return (
      <div className={`${styles.root} ${styles[variant]}`}>
        <span className={styles.badge}>{fallbackInitials}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.root} ${styles[variant]}`}>
      {visibleItems.map((item) => {
        const initials =
          item.initials || toInitials(item.label) || fallbackInitials;

        return (
          <span
            key={item.key}
            className={styles.badge}
            title={item.label}
            aria-label={item.label ?? initials}
          >
            {initials}
          </span>
        );
      })}
    </div>
  );
}
