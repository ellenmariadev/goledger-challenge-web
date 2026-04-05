import type { FormEvent } from "react";

export type TvShowFormValues = {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  recommendedAge: number;
  setRecommendedAge: (v: number) => void;
  formErrors: Record<string, string>;
  isPending: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  formTitle?: string;
  formSubtitle?: string;
  submitLabel?: string;
};