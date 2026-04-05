import type { FormEvent } from "react";

export type EpisodeFormSeasonOption = {
  key: string;
  label: string;
};

export type EpisodeFormValues = {
  tvShowTitle: string;
  title: string;
  setTitle: (value: string) => void;
  releaseDate: string;
  setReleaseDate: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  rating: number;
  setRating: (value: number) => void;
  episodeNumber: number;
  seasonKey: string;
  setSeasonKey?: (value: string) => void;
  seasonLabel?: string;
  seasonOptions?: EpisodeFormSeasonOption[];
  formErrors: Record<string, string>;
  isPending: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  formTitle?: string;
  formSubtitle?: string;
  submitLabel?: string;
};