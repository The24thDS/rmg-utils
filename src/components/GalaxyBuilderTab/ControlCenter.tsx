import { Center, SegmentedControl, Text, Title } from "@mantine/core";
import { IconArrowsMove, IconEdit, IconNewSection } from "@tabler/icons";
import { useAtom } from "jotai";

import { selectedActionAtom } from "../../store/galaxy.store";
import { ItemForm } from "./ItemForm";

type Action = typeof selectedActionAtom.init;

interface Segment {
  value: Action;
  label: React.ReactNode;
}

const segments: Segment[] = [
  {
    value: "move",
    label: (
      <Center>
        <IconArrowsMove size="1.5rem" />
        <Text ml={10}>Move</Text>
      </Center>
    ),
  },
  {
    value: "add",
    label: (
      <Center>
        <IconNewSection size="1.5rem" />
        <Text ml={10}>Add</Text>
      </Center>
    ),
  },
  {
    value: "edit",
    label: (
      <Center>
        <IconEdit size="1.5rem" />
        <Text ml={10}>Edit</Text>
      </Center>
    ),
  },
];

export const ControlCenter = () => {
  const [action, setAction] = useAtom(selectedActionAtom);

  return (
    <>
      <Title order={3}>Control center</Title>
      <SegmentedControl
        value={action}
        onChange={(v: Action) => setAction(v)}
        data={segments}
        fullWidth
        color="blue"
      />
      {action === "edit" && <ItemForm />}
    </>
  );
};
