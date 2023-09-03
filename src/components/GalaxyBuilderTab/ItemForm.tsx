import { useAtomValue } from "jotai";
import { Paper, Title } from "@mantine/core";

import { selectedItemAtom } from "../../store/galaxy.store";
import { NebulaForm } from "./Nebula/NebulaForm";

const FORM_MAP = {
  nebula: NebulaForm,
};

export const ItemForm = () => {
  const selectedItem = useAtomValue(selectedItemAtom);
  if (!selectedItem) {
    return (
      <div>
        <h1>Select an item by clicking on it</h1>
      </div>
    );
  }

  const Form = FORM_MAP[selectedItem.type];

  return (
    <Paper shadow="xs" p="xl" withBorder>
      <Title order={4}>Edit selected {selectedItem.type}</Title>
      <Form key={selectedItem.id} atom={selectedItem.atom} />
    </Paper>
  );
};
