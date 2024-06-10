import { Text } from "@mantine/core";

import { useCustomDocumentTitle } from "../hooks";

export default function Home() {
  useCustomDocumentTitle("Home");
  return (
    <Text ta="center" size="xl" fw={700}>
      Welcome to RMG's utils for Stellaris. Use the tabs above to navigate.
    </Text>
  );
}
