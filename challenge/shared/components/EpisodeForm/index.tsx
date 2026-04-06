"use client";

import { FormLayout } from "@/shared/components/FormLayout";
import { Alert } from "@/shared/ui/Alert";
import { Input } from "@/shared/ui/Input";
import NumberField from "@/shared/ui/NumberField";
import { Text } from "@/shared/ui/Text";
import styles from "./episodeForm.module.css";
import type { EpisodeFormValues } from "./episodeForm.types";
import { Select } from "@/shared/ui/Select";

export function EpisodeForm({
  tvShowTitle,
  title,
  setTitle,
  releaseDate,
  setReleaseDate,
  description,
  setDescription,
  rating,
  setRating,
  seasonKey,
  setSeasonKey,
  seasonOptions = [],
  formErrors,
  isPending,
  handleSubmit,
  handleCancel,
  formTitle = "new episode",
  formSubtitle = "Create or update episode details.",
  submitLabel = "save",
}: EpisodeFormValues) {
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

      <Text variant="body-sm" className={styles.infoBadge}>
        {tvShowTitle}
      </Text>

      {setSeasonKey && (
        <Select
          label="season"
          value={seasonKey ?? ""}
          onChange={setSeasonKey}
          options={seasonOptions.map((s) => ({ label: s.label, value: s.key }))}
          placeholder="select season"
          required
        />
      )}

      <Input
        name="releaseDate"
        label="release date"
        type="date"
        value={releaseDate}
        onChange={(event) => setReleaseDate(event.target.value)}
        required
      />

      <Input
        name="title"
        label="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="write here"
        required
      />

      <Input
        as="textarea"
        name="description"
        label="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="write here"
        required
      />

      <NumberField
        label="rating"
        value={rating}
        onValueChange={(value) => setRating(Math.trunc(Number(value) || 0))}
        min={0}
        max={5}
      />
    </FormLayout>
  );
}
