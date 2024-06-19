import { Anchor, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { ROUTES } from "../constants";

import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <Group justify="space-between" mt="auto" p="sm">
      <Group>
        <Text size="sm" c="dimmed">
          &copy; {new Date().getFullYear()} Renegades Modding Group
        </Text>
        &bull;
        <Anchor
          className={classes.link}
          component={Link}
          to={ROUTES.PRIVACY.path}
        >
          {ROUTES.PRIVACY.name}
        </Anchor>
        &bull;
        <Anchor
          className={classes.link}
          href="https://steamcommunity.com/workshop/filedetails/?id=2469745470"
          target="_blank"
        >
          RMG's mods collection
        </Anchor>
        &bull;
        <Anchor
          className={classes.link}
          href="https://discord.gg/4xfQ78sPpm"
          target="_blank"
        >
          RMG's discord server
        </Anchor>
      </Group>
      <Anchor
        size="sm"
        c="dimmed"
        href={`https://github.com/The24thDS/rmg-utils/releases/tag/v${APP_VERSION}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Version: {APP_VERSION}
      </Anchor>
    </Group>
  );
}
