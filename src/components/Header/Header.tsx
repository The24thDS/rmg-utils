import { Badge, Group, Stack, Tabs, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants";
import rmgLogo from "../../assets/images/rmg_logo.png";
import ColorSchemeTogle from "./ColorSchemeToggle";

import classes from "./Header.module.css";

const tabs = [
  ROUTES.HOME,
  ROUTES.LIGHT_LOCATORS_GENERATOR,
  ROUTES.TRAITS_BUILDER,
  ROUTES.GALAXY_BUILDER,
  ROUTES.UNUSED_DDS_FINDER,
  ROUTES.OTHER_TOOLS,
];

const isProd = RUNTIME_ENV === "prod";

const BADGE_COLOR_MAP = {
  local: "pink",
  dev: "orange",
  stage: "cyan",
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTab = location.pathname;

  const items = tabs.map(({ name, path }) => (
    <Tabs.Tab
      value={path}
      key={path}
      onClick={() => {
        navigate(path);
      }}
    >
      {name}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Stack style={{ maxWidth: 1500 }} mx="auto">
        <Group justify="space-between" px="sm">
          <Group>
            <img src={rmgLogo} height={50} width={50} alt="RMG logo" />
            <Text size="xl" fw={700}>
              RMG Utils for Stellaris
            </Text>
            {!isProd && (
              <Badge color={BADGE_COLOR_MAP[RUNTIME_ENV]} variant="outline">
                {RUNTIME_ENV}
              </Badge>
            )}
          </Group>
          <ColorSchemeTogle />
        </Group>
        <Tabs
          value={selectedTab}
          styles={(theme) => ({ tab: { fontSize: theme.fontSizes.md } })}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Stack>
    </div>
  );
}
