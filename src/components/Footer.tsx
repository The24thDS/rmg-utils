import { Anchor, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

export default function Footer() {
  return (
    <Group position="apart" mt="auto" p="sm">
      <Group>
        <Text size="sm" color="dimmed">
          &copy; {new Date().getFullYear()} Renegades Modding Group
        </Text>
        &bull;
        <Anchor
          component={Link}
          to={ROUTES.PRIVACY.path}
          sx={(theme) => ({ color: theme.colors.dark[0] })}
        >
          {ROUTES.PRIVACY.name}
        </Anchor>
      </Group>
      <Anchor
        size="sm"
        color={"dimmed"}
        href={`https://github.com/The24thDS/rmg-utils/releases/tag/v${APP_VERSION}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Version: {APP_VERSION}
      </Anchor>
    </Group>
  );
}
