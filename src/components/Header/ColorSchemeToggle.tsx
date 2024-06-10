import { useMantineColorScheme, ActionIcon, Group } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

import classes from "./ColorSchemeToggle.module.css";

export default function ColorSchemeTogle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" my="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        className={classes.icon}
      >
        {colorScheme === "dark" ? (
          <IconSun size={18} />
        ) : (
          <IconMoonStars size={18} />
        )}
      </ActionIcon>
    </Group>
  );
}
