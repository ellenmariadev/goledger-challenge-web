"use client";

import { Select as SelectBase } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import styles from "./select.module.css";
import { SelectProps } from "./select.types";

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "select an option",
  required,
}: SelectProps) {
  return (
    <div className={styles.field}>
      <SelectBase.Root
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue !== null) onChange(nextValue);
        }}
        items={options}
      >
        <SelectBase.Label className={styles.label}>{label}</SelectBase.Label>
        <SelectBase.Trigger className={styles.trigger} aria-required={required}>
          <SelectBase.Value
            className={styles.value}
            placeholder={placeholder}
          />
          <SelectBase.Icon className={styles.icon}>
            <ChevronDown size={12} />
          </SelectBase.Icon>
        </SelectBase.Trigger>

        <SelectBase.Portal>
          <SelectBase.Positioner sideOffset={4} className={styles.positioner}>
            <SelectBase.Popup className={styles.popup}>
              <SelectBase.ScrollUpArrow className={styles.scrollArrow} />
              <SelectBase.List className={styles.list}>
                {options.map(({ label, value }) => (
                  <SelectBase.Item
                    key={value}
                    value={value}
                    className={styles.item}
                  >
                    <SelectBase.ItemIndicator className={styles.itemIndicator}>
                      <Check size={10} />
                    </SelectBase.ItemIndicator>
                    <SelectBase.ItemText className={styles.itemText}>
                      {label}
                    </SelectBase.ItemText>
                  </SelectBase.Item>
                ))}
              </SelectBase.List>
              <SelectBase.ScrollDownArrow className={styles.scrollArrow} />
            </SelectBase.Popup>
          </SelectBase.Positioner>
        </SelectBase.Portal>
      </SelectBase.Root>
    </div>
  );
}
