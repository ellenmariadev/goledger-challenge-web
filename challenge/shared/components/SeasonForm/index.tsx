"use client";

import { FormLayout } from "@/shared/components/FormLayout";
import { Alert } from "@/shared/ui/Alert";
import { Input } from "@/shared/ui/Input";
import styles from "./seasonForm.module.css";
import type { SeasonFormValues } from "./seasonForm.types";

export function SeasonForm({
  number,
  setNumber,
  year,
  setYear,
  tvShowTitle,
  formErrors,
  isPending,
  handleSubmit,
  handleCancel,
  formTitle = "new season",
  formSubtitle = "Create a season and attach it to a TV show.",
  submitLabel = "save",
}: SeasonFormValues) {
  const currentYear = new Date().getFullYear();

  return (
    <FormLayout
      title={formTitle}
      subtitle={formSubtitle}
      onSubmit={handleSubmit}
      actions={[
        {
          label: "cancel",
          variant: "secondary",
          onClick: handleCancel,
          disabled: isPending,
        },
        {
          label: isPending ? "saving..." : submitLabel,
          type: "submit",
          disabled: isPending,
        },
      ]}
    >
      {Object.values(formErrors).map((error, i) => (
        <Alert key={i} errors={{ form: error }} />
      ))}

      <div className={styles.tvShowInfo}>
        <span className={styles.tvShowBadge}>{tvShowTitle}</span>
      </div>

      <Input
        name="number"
        label="number"
        type="number"
        min={1}
        value={String(number)}
        onChange={(e) => setNumber(Number(e.target.value) || 0)}
        placeholder="write here"
        required
      />

      <Input
        name="year"
        label="year of release"
        type="number"
        min={1900}
        max={currentYear}
        value={String(year)}
        onChange={(e) => setYear(Number(e.target.value) || 0)}
        placeholder="write here"
        required
      />
    </FormLayout>
  );
}
