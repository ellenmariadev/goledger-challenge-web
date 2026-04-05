"use client";

import React from "react";
import { NumberField as NumberFieldBase } from "@base-ui/react/number-field";
import styles from "./numberField.module.css";

type Props = {
  label: string;
  value?: number;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
};

export default function NumberField({
  label,
  value,
  onValueChange,
  min = 0,
  max,
}: Props) {
  const id = React.useId();

  return (
    <NumberFieldBase.Root
      id={id}
      value={value}
      onValueChange={onValueChange}
      className={styles.field}
      min={min}
      max={max}
    >
      <NumberFieldBase.ScrubArea className={styles.scrubArea}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <NumberFieldBase.ScrubAreaCursor className={styles.scrubAreaCursor}>
          <CursorGrowIcon />
        </NumberFieldBase.ScrubAreaCursor>
      </NumberFieldBase.ScrubArea>

      <NumberFieldBase.Group className={styles.group}>
        <NumberFieldBase.Decrement className={styles.decrement}>
          <MinusIcon />
        </NumberFieldBase.Decrement>
        <NumberFieldBase.Input className={styles.input} />
        <NumberFieldBase.Increment className={styles.increment}>
          <PlusIcon />
        </NumberFieldBase.Increment>
      </NumberFieldBase.Group>
    </NumberFieldBase.Root>
  );
}

function CursorGrowIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="26" height="14" viewBox="0 0 24 14" fill="black" stroke="white" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentcolor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentcolor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 5H10" />
    </svg>
  );
}