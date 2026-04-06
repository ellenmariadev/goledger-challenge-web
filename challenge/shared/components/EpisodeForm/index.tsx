"use client";

import { FormLayout } from "@/shared/components/FormLayout";
import { Alert } from "@/shared/ui/Alert";
import { Input } from "@/shared/ui/Input";
import NumberField from "@/shared/ui/NumberField";
import { Text } from "@/shared/ui/Text";
import styles from "./episodeForm.module.css";
import type { EpisodeFormValues } from "./episodeForm.types";

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
  episodeNumber,
  seasonKey,
  setSeasonKey,
  seasonLabel,
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

      {setSeasonKey && (
        <label className={styles.field}>
          <Text as="span" variant="label" className={styles.infoLabel}>
            season
          </Text>
          <select
            className={styles.select}
            value={seasonKey}
            onChange={(event) => setSeasonKey(event.target.value)}
            required
          >
            <option value="" disabled>
              select season
            </option>
            {seasonOptions.map((season) => (
              <option key={season.key} value={season.key}>
                {season.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <Text variant="body-sm" className={styles.infoBadge}>
        {tvShowTitle} - Episode {episodeNumber} - {seasonLabel}
      </Text>

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
