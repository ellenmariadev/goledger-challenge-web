import { Settings } from "lucide-react";
import { Menu as MenuBase } from "@base-ui/react";
import styles from "./menu.module.css";
import { MenuProps } from "./menu.types";

const Menu = ({ title, content }: MenuProps) => {
  return (
    <MenuBase.Root>
      <MenuBase.Trigger
        className={styles.menuTrigger}
        aria-label={`open actions for ${title}`}
      >
        <Settings size={14} />
      </MenuBase.Trigger>
      <MenuBase.Portal>
        <MenuBase.Positioner sideOffset={6} align="end">
          <MenuBase.Popup className={styles.menuPopup}>
            {content.map((item, index) => (
              <MenuBase.Item
                key={index}
                className={styles.menuItem}
                onClick={item.onClick}
              >
                {item.label}
              </MenuBase.Item>
            ))}
          </MenuBase.Popup>
        </MenuBase.Positioner>
      </MenuBase.Portal>
    </MenuBase.Root>
  );
};

export default Menu;
