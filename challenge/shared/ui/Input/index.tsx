import { Field } from "@base-ui/react/field";
import styles from "./input.module.css";
import { InputProps } from "./input.types";

const FieldControl = Field.Control as unknown as React.ComponentType<any>;

export function Input({
  label,
  name,
  hint,
  required,
  as: Tag = "input",
  ...props
}: InputProps) {
  const normalizedRequired = required ? true : undefined;

  return (
    <Field.Root name={name} className={styles.field}>
      <Field.Label className={styles.label}>{label}</Field.Label>

      {Tag === "textarea" ? (
        <FieldControl
          render={<textarea />}
          className={`${styles.control} ${styles.textarea}`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          required={normalizedRequired}
        />
      ) : (
        <FieldControl
          required={normalizedRequired}
          className={styles.control}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {hint && (
        <Field.Description className={styles.hint}>{hint}</Field.Description>
      )}

      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
