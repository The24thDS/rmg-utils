import { Anchor, Group, NavLink, Text } from "@mantine/core";
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
      <Text size="sm" color={"dimmed"}>
        Version: {APP_VERSION}
      </Text>
    </Group>
  );
}
