export type InputBaseProps = {
  label: string;
  name: string;
  hint?: string;
};

export type TInputProps = InputBaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & { as?: "input" };

export type TextareaProps = InputBaseProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & { as: "textarea" };

export type InputProps = TInputProps | TextareaProps;

