import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import styles from "./formLayout.module.css";
import { FormLayoutProps } from "./formLayout.types";

export function FormLayout({
  title,
  subtitle,
  onSubmit,
  actions,
  children,
}: FormLayoutProps) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <Text as="h1" variant="title-lg">
            {title}
          </Text>
          {subtitle && (
            <Text variant="body-sm" className={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </header>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {children}

          <div className={styles.actions}>
            {actions.map((action) => (
              <Button
                key={action.label}
                type={action.type ?? "button"}
                variant={action.variant ?? "primary"}
                size="xs"
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </form>
      </main>
    </div>
  );
}
