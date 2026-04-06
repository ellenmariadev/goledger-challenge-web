export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
};
