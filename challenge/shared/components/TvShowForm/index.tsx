"use client";

import { FormLayout } from "@/shared/components/FormLayout";
import { Alert } from "@/shared/ui/Alert";
import { Input } from "@/shared/ui/Input";
import NumberField from "@/shared/ui/NumberField";
import type { TvShowFormValues } from "./tvShowForm.types";

export function TvShowForm({
  title,
  setTitle,
  description,
  setDescription,
  recommendedAge,
  setRecommendedAge,
  formErrors,
  isPending,
  handleSubmit,
  handleCancel,
  formTitle = "new tv show",
  formSubtitle,
  submitLabel = "save tv show",
}: TvShowFormValues) {
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
      {Object.values(formErrors).length > 0 && <Alert errors={formErrors} />}

      <Input
        name="title"
        label="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="write here"
        maxLength={120}
        required
      />
      <Input
        as="textarea"
        name="description"
        label="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="write here"
      />
      <NumberField
        label="recommended age"
        value={recommendedAge}
        onValueChange={(val) => setRecommendedAge(val ?? 0)}
        min={0}
        max={99}
      />
    </FormLayout>
  );
}
