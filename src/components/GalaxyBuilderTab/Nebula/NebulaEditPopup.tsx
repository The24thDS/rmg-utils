import {
  Button,
  Group,
  MantineProvider,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { Popup } from "react-leaflet";
import { PrimitiveAtom, useAtom } from "jotai";

import { Nebula } from "../../../utils/map/Nebula";

export const NebulaEditPopup = ({
  nebulaAtom,
  closePopup,
}: {
  nebulaAtom: PrimitiveAtom<Nebula>;
  closePopup: () => void;
}) => {
  const [nebula, setNebula] = useAtom(nebulaAtom);
  return (
    <Popup
      pane="popups"
      minWidth={180}
      maxWidth={500}
      interactive
      closeOnClick={false}
    >
      <MantineProvider theme={{ colorScheme: "light" }}>
        <TextInput label="id" disabled defaultValue={nebula.id} />
        <TextInput label="name" defaultValue={nebula.name} />
        <Group spacing="xs" grow>
          <NumberInput
            label="x"
            defaultValue={nebula.x}
            style={{ width: "80px" }}
            max={500}
            min={-500}
          />
          <NumberInput
            label="y"
            defaultValue={nebula.y}
            style={{ width: "80px" }}
            max={500}
            min={-500}
          />
        </Group>
        <Group>
          <Button size="xs" onClick={() => closePopup()}>
            Save
          </Button>
          <Button size="xs" variant="subtle" onClick={() => closePopup()}>
            Cancel
          </Button>
        </Group>
      </MantineProvider>
    </Popup>
  );
};
