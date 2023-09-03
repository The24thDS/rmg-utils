import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import { PrimitiveAtom, useAtom } from "jotai";

import { Nebula } from "../../../utils/map/Nebula";
import { useForm } from "@mantine/form";

interface IUpdateNebula {
  name: string;
  x: number;
  y: number;
  radius: number;
}

export const NebulaForm = ({ atom }: { atom: PrimitiveAtom<Nebula> }) => {
  const [nebula, setNebula] = useAtom(atom);
  const form = useForm({
    initialValues: nebula,
  });

  const updateNebula = ({ name, x, y, radius }: IUpdateNebula) => {
    setNebula((prevNebula) => {
      const newNebula = new Nebula(prevNebula.toString(), prevNebula.id);
      newNebula.name = name;
      newNebula.x = x;
      newNebula.y = y;
      newNebula.radius = radius;
      return newNebula;
    });
  };

  return (
    <form onSubmit={form.onSubmit(updateNebula)}>
      <TextInput label="ID" disabled defaultValue={nebula.id} />
      <TextInput label="Name" {...form.getInputProps("name")} />
      <Group spacing="xs" grow>
        <NumberInput
          label="X position"
          {...form.getInputProps("x")}
          max={500}
          min={-500}
        />
        <NumberInput
          label="Y position"
          {...form.getInputProps("y")}
          max={500}
          min={-500}
        />
        <NumberInput
          label="Radius"
          {...form.getInputProps("radius")}
          max={500}
          min={1}
        />
      </Group>
      <Group spacing="xs" mt="sm">
        <Button type="submit">Save</Button>
        <Button variant="subtle" type="reset">
          Revert
        </Button>
      </Group>
    </form>
  );
};
