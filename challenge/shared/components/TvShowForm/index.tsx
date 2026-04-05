"use client";

import { useTvShowForm } from "@/app/(pages)/tv-shows/new/hooks/useTvShowForm";
import { FormLayout } from "@/shared/components/FormLayout";
import { Alert } from "@/shared/ui/Alert";
import { Input } from "@/shared/ui/Input";
import NumberField from "@/shared/ui/NumberField";

export function TvShowForm() {
  const {
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
  } = useTvShowForm();

  return (
    <FormLayout
      title="new tv show"
      subtitle="Fill in the details for your new tv show"
      onSubmit={handleSubmit}
      actions={[
        {
          label: "cancel",
          variant: "secondary",
          onClick: handleCancel,
          disabled: isPending,
        },
        {
          label: isPending ? "saving..." : "save",
          type: "submit",
          disabled: isPending,
        },
      ]}
    >
      {Object.values(formErrors).map((error, i) => (
        <Alert key={i} errors={{ form: error }} />
      ))}
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
        required
      />

      <NumberField
        name="recommendedAge"
        label="recommended age"
        value={recommendedAge === "" ? 0 : recommendedAge}
        onValueChange={(val) => setRecommendedAge(val ?? 0)}
        min={0}
        max={99}
        required
      />
    </FormLayout>
  );
}
