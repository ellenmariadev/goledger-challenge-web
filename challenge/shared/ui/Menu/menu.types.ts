
export type MenuContent = {
  label: string;
  onClick: () => void;
}

export type MenuProps = {
  title: string;
  content: MenuContent[];
};