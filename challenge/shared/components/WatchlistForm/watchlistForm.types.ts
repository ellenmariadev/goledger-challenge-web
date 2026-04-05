export type WatchlistFormValues = {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  selectedShows: SelectedTvShow[];
  formErrors: Record<string, string>;
  isPending: boolean;
  handleSelect: (option: TvSearchResult) => void;
  handleRemoveShow: (key: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  title: string;
  submitLabel?: string;
  formTitle?: string;
  formSubtitle?: string;
};