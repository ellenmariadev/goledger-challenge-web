"use client";

import { FormLayout } from "@/shared/components/FormLayout";
import { TvShowSelector } from "@/shared/components/TvShowSelect";
import { Alert } from "@/shared/ui/Alert";
import { Input } from "@/shared/ui/Input";
import { WatchlistFormValues } from "./watchlistForm.types";

export function WatchlistForm({
  title,
  setTitle,
  description,
  setDescription,
  selectedShows,
  formErrors,
  isPending,
  handleSelect,
  handleRemoveShow,
  handleSubmit,
  handleCancel,
  submitLabel = "save watchlist",
  formTitle = "new watchlist",
  formSubtitle = "Create a watchlist and attach TV shows to it.",
}: WatchlistFormValues) {
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
      <Input
        name="title"
        label="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. 10 Favorite Horror Movies"
        maxLength={120}
        required
      />
      <Input
        as="textarea"
        name="description"
        label="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="e.g. A collection of my favorite horror movies to watch during Halloween."
        maxLength={600}
      />
      <TvShowSelector
        selectedShows={selectedShows}
        onSelect={handleSelect}
        onRemove={handleRemoveShow}
      />
    </FormLayout>
  );
}
