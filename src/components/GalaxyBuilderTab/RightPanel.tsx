import { Code, Paper, Title, Text, Divider } from "@mantine/core";
import { useAtomValue } from "jotai";

import { NebulaForm } from "./Nebula/NebulaForm";

import { selectedActionAtom, selectedItemAtom } from "../../store/galaxy.store";

const FORM_MAP = {
  nebula: NebulaForm,
};

export const RightPanel = () => {
  const selectedAction = useAtomValue(selectedActionAtom);
  const selectedItem = useAtomValue(selectedItemAtom);

  const Form = FORM_MAP[selectedItem?.type ?? "nebula"];

  // TODO: add text in case the galaxy is empty
  return (
    <Paper shadow="xs" p="xl" withBorder>
      <Title order={3}>Selected mode: {selectedAction.toUpperCase()}</Title>
      <Title order={6}>
        Selected item: <Code>{selectedItem?.id ?? "none"}</Code>
      </Title>
      <Divider my="md" />
      {selectedAction === "move" && (
        <Text>
          Use your mouse to drag the {selectedItem?.type} around the map.
        </Text>
      )}
      {selectedAction === "edit" && selectedItem && (
        <Form key={selectedItem.id} atom={selectedItem.atom} />
      )}
    </Paper>
  );
};
