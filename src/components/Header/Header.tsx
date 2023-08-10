import {
  Badge,
  createStyles,
  Group,
  Image,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants";
import rmgLogo from "../../assets/images/rmg_logo.png";
import ColorSchemeTogle from "./ColorSchemeToggle";

const tabs = [
  ROUTES.HOME,
  ROUTES.LIGHT_LOCATORS_GENERATOR,
  ROUTES.TRAITS_BUILDER,
  ROUTES.OTHER_TOOLS,
];

const isProd = ENVIRONMENT === "production";

const BADGE_COLOR_MAP = {
  local: "pink",
  dev: "orange",
  stage: "cyan",
};

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    boxShadow: `0 -2px ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    } inset`,
  },
}));

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { classes } = useStyles();
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
      <Stack sx={{ maxWidth: 1500 }} mx="auto">
        <Group position="apart" px="sm">
          <Group>
            <Image src={rmgLogo} height={50} width={50} />
            <Text size="xl" weight={700}>
              RMG Utils for Stellaris
            </Text>
            {!isProd && (
              <Badge color={BADGE_COLOR_MAP[ENVIRONMENT]} variant="outline">
                {ENVIRONMENT}
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
