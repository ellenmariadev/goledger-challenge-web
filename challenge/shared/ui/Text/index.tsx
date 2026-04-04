import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./text.module.css"


type TextVariant = "title-xl" | "title-lg" | "title-md" | "title-sm" | "title-xs" | "title-xxs" | "body-md" | "body-sm" | "body-lg" | "label";

type TextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: TextVariant;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const variantClassName: Record<TextVariant, string> = {
  "title-xl": styles.titleXl,
  "title-lg": styles.titleLg,
  "title-md": styles.titleMd,
  "title-sm": styles.titleSm,
  "title-xs": styles.titleXs,
  "title-xxs": styles.titleXxs,
  "body-md": styles.bodyMd,
  "body-sm": styles.bodySm,
  "body-lg": styles.bodyLg,
  label: styles.label,
};

export function Text<T extends ElementType = "p">({
  as,
  children,
  className,
  variant = "body-md",
  ...props
}: TextProps<T>) {
  const Component = as ?? "p";
  const resolvedClassName = [styles.root, variantClassName[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={resolvedClassName} {...props}>
      {children}
    </Component>
  );
}