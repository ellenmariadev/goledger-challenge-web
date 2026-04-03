import { Button as BaseButton } from "@base-ui/react/button";
import * as React from "react";
import styles from "./button.module.css";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg" | "xs";

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
};

const sizeClass: Record<Size, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const composedClassName = [
    styles.base,
    variantClass[variant],
    sizeClass[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <BaseButton
      className={composedClassName}
      type={type}
      {...props}
    >
      {props.children}
    </BaseButton>
  );
}
