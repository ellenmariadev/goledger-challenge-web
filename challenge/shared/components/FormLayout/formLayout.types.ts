type FormAction = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export type FormLayoutProps = {
  title: string;
  subtitle?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  actions: FormAction[];
  children: React.ReactNode;
};