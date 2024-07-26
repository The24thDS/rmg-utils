import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { PrimitiveAtom, useAtom } from "jotai";

import { Nebula } from "../../../utils/map/Nebula";

type UpdateNebulaPayload = Pick<Nebula, "name" | "x" | "y" | "radius">;

export const NebulaForm = ({ atom }: { atom: PrimitiveAtom<Nebula> }) => {
  const [nebula, setNebula] = useAtom(atom);
  const form = useForm({
    initialValues: nebula,
    validateInputOnBlur: true,
    validate: {
      name: isNotEmpty("You must provide a name"),
      x: isInRange(
        { min: -500, max: 500 },
        "Value must be between -500 and 500"
      ),
      y: isInRange(
        { min: -500, max: 500 },
        "Value must be between -500 and 500"
      ),
      radius: isInRange(
        { min: 1, max: 500 },
        "Value must be between 1 and 500"
      ),
    },
  });

  const updateNebula = ({ name, x, y, radius }: UpdateNebulaPayload) => {
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
    <Box
      component="form"
      onSubmit={form.onSubmit(updateNebula)}
      onReset={form.reset}
    >
      <TextInput label="ID" disabled value={nebula.id} readOnly />
      <TextInput mt="md" label="Name" {...form.getInputProps("name")} />
      <Group gap="xs" mt="md" align="start" grow>
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
      <Group gap="xs" mt="lg">
        <Button type="submit">Save</Button>
        <Button variant="subtle" type="reset">
          Revert
        </Button>
      </Group>
    </Box>
  );
};
