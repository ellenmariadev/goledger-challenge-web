import type { FormEvent } from "react";

export type SeasonFormValues = {
  number: number;
  setNumber: (value: number) => void;
  year: number;
  setYear: (value: number) => void;
  tvShowTitle: string;
  formErrors: Record<string, string>;
  isPending: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  formTitle?: string;
  formSubtitle?: string;
  submitLabel?: string;
};