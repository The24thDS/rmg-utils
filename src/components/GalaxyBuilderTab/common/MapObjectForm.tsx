import {
  Box,
  Button,
  Group,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { PrimitiveAtom, useAtom } from "jotai";

import { Nebula } from "../../../utils/map/Nebula";
import { System } from "../../../utils/map/System";

type UpdateNebulaPayload = Pick<Nebula, "name" | "x" | "y" | "radius">;
type UpdateSystemPayload = Pick<System, "name" | "x" | "y" | "init">;

const commonValidationRules = {
  name: isNotEmpty("You must provide a name"),
  x: isInRange({ min: -500, max: 500 }, "Value must be between -500 and 500"),
  y: isInRange({ min: -500, max: 500 }, "Value must be between -500 and 500"),
};

const nebulaValidationRules = {
  ...commonValidationRules,
  radius: isInRange({ min: 1, max: 500 }, "Value must be between 1 and 500"),
};

const systemValidationRules = {
  ...commonValidationRules,
};

const updateCommonProperties = <T extends Nebula | System>(
  obj: T,
  data: UpdateNebulaPayload | UpdateSystemPayload
) => {
  obj.name = data.name;
  obj.x = data.x;
  obj.y = data.y;
  return obj;
};

export const MapObjectForm = ({
  atom,
}: {
  atom: PrimitiveAtom<Nebula> | PrimitiveAtom<System>;
}) => {
  const [mapObject, setMapObject] = useAtom(atom);
  const isNebula = mapObject instanceof Nebula;
  const isSystem = mapObject instanceof System;
  const form = useForm({
    initialValues: mapObject,
    validateInputOnBlur: true,
    validate: isNebula ? nebulaValidationRules : systemValidationRules,
  });

  const updateMapObject = (data: UpdateNebulaPayload | UpdateSystemPayload) => {
    if (isNebula) {
      setMapObject((prevObject: Nebula) => {
        const newMapObject = new Nebula(prevObject.toString(), prevObject.id);
        updateCommonProperties(newMapObject, data);
        newMapObject.radius = (data as UpdateNebulaPayload).radius;
        return newMapObject;
      });
    } else {
      setMapObject((prevObject: System) => {
        const newMapObject = new System(prevObject.toString(), prevObject.id);
        updateCommonProperties(newMapObject, data);
        newMapObject.init = (data as UpdateSystemPayload).init;
        return newMapObject;
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(updateMapObject)}
      onReset={form.reset}
    >
      <TextInput label="ID" disabled value={mapObject.id} readOnly />
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
        {isNebula && (
          <NumberInput
            label="Radius"
            {...form.getInputProps("radius")}
            max={500}
            min={1}
          />
        )}
      </Group>
      {isSystem && (
        <TextInput
          label="Initializer"
          {...form.getInputProps("init")}
          mt="md"
        />
      )}
      <Textarea
        label="Line"
        value={mapObject.toString().trim()}
        readOnly
        mt="md"
      />
      <Group gap="xs" mt="lg">
        <Button type="submit">Save</Button>
        <Button variant="subtle" type="reset">
          Revert
        </Button>
      </Group>
    </Box>
  );
};
