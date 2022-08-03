import { Group, Image, Stack, Tabs, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants";
import rmgLogo from "../../assets/images/rmg_logo.png";

const tabs = [ROUTES.HOME, ROUTES.LIGHT_LOCATORS_GENERATOR];

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
    <Stack>
      <Group>
        <Image src={rmgLogo} height={50} width={50} />
        <Text size="xl" weight={700}>
          RMG Utils for Stellaris
        </Text>
      </Group>
      <Tabs value={selectedTab} variant="outline">
        <Tabs.List>{items}</Tabs.List>
      </Tabs>
    </Stack>
  );
}
