import { QueryKey } from "@tanstack/react-query";

export type SearchProps<TOption> = {
  queryKey: QueryKey;
  fetchOptions: () => Promise<readonly TOption[]>;
  getOptionLabel: (option: TOption) => string;
  getOptionKey?: (option: TOption, index: number) => string;
  placeholder?: string;
  ariaLabel?: string;
  defaultValue?: string;
  className?: string;
  minLength?: number;
  emptyLabel?: string;
  onValueChange?: (value: string) => void;
  onSelect?: (option: TOption) => void;
};