import { Text } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";

export function Home() {
  useDocumentTitle("RMG Utils for Stellaris - Home");
  return (
    <Text align="center" size="xl" weight={700}>
      Welcome to RMG's utils for Stellaris. Use the tabs above to navigate.
    </Text>
  );
}
