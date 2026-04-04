import { Text } from "@/shared/ui/Text";
import { Separator } from "@base-ui/react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Separator orientation="vertical" className={styles.separator} />
      <Text variant="body-sm">@ellenmariadev</Text>
    </footer>
  );
};

export default Footer;
