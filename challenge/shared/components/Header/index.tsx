"use client";

import { Text } from "@/shared/ui/Text";
import { Tabs } from "@base-ui/react";
import { usePathname, useRouter } from "next/navigation";
import GoBack from "../GoBack";
import { HEADER_TABS } from "./constants";
import styles from "./header.module.css";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab =
    HEADER_TABS.find(({ value }) => value !== "/" && pathname.startsWith(value))
      ?.value ?? "/";

  return (
    <header className={styles.header}>
      {pathname !== "/" ? <GoBack /> : <span />}

      <Tabs.Root value={activeTab}>
        <Tabs.List className={styles.tabsList} aria-label="Primary navigation">
          {HEADER_TABS.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              className={styles.tab}
              value={tab.value}
              onClick={() => router.push(tab.value)}
            >
              <Text variant="label">{tab.label}</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </header>
  );
};

export default Header;
