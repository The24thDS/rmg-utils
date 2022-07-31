import { Group, Text } from "@mantine/core";

export default function Footer() {
  return (
    <Group position="apart" mt="auto" p="sm">
      <Group></Group>
      <Text color={"dimmed"}>Version: {APP_VERSION}</Text>
    </Group>
  );
}
