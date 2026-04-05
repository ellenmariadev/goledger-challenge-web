type InitialsItem = {
  key: string;
  initials?: string;
  label?: string;
};

export type InitialPreviewProps = {
  items: InitialsItem[];
  maxVisible?: number;
  fallbackInitials?: string;
  variant?: "stacked" | "inline";
};